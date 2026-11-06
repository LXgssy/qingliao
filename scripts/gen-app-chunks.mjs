#!/usr/bin/env node
/**
 * 轻聊 · 应用源码 SCC 分桶
 *
 * 原理：把 src/renderer + packages 的静态导入图按 Tarjan 强连通分量（SCC）凝聚。
 * 桶 = SCC 的并集。由于 SCC 凝聚图是 DAG，跨桶循环依赖在数学上不可能存在，
 * 从根本上消除 rollup 循环 chunk 导致的运行时 TDZ 崩溃。
 *
 * 产物: src/renderer/shims/gen/app-chunks.json  (模块路径 → chunk 名)
 *       由 electron.vite.config.ts 中的 ql-app-chunks 插件消费。
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const R = path.join(ROOT, 'src/renderer')
const SHARED = path.join(ROOT, 'src/shared')
const PKGS = path.join(ROOT, 'packages')

// ---------- 收集应用源码模块 ----------
const exts = ['.ts', '.tsx', '.js', '.jsx', '.mjs']
const modules = new Map() // absPath → Set<absPath>（静态导入）

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'shims' || e.name === 'qingliao') continue
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (exts.includes(path.extname(e.name)) && !e.name.endsWith('.test.ts') && !e.name.endsWith('.test.tsx') && !e.name.endsWith('.d.ts')) out.push(p)
  }
  return out
}
for (const dir of [R, SHARED, PKGS]) for (const f of walk(dir)) modules.set(f, new Set())

// ---------- 解析导入 ----------
function resolveImport(fromFile, spec) {
  let base = null
  if (spec.startsWith('@/')) base = path.join(ROOT, 'src/renderer', spec.slice(2))
  else if (spec.startsWith('@shared/')) base = path.join(ROOT, 'src/shared', spec.slice(8))
  else if (spec.startsWith('@chatbox/')) {
    const pkg = spec.slice(9)
    const map = { i18n: 'chatbox-i18n', core: 'chatbox-core', react: 'chatbox-react' }
    if (!map[pkg]) return null
    base = path.join(PKGS, map[pkg], 'src')
    // 包导入指向其 src/index
    for (const cand of exts.map((e) => path.join(base, 'index' + e))) {
      if (fs.existsSync(cand)) return cand
    }
    return null
  } else if (spec.startsWith('.')) base = path.resolve(path.dirname(fromFile), spec)
  else return null // 第三方
  if (base.startsWith(R) || base.startsWith(SHARED) || base.startsWith(PKGS)) {
    for (const cand of [base, ...exts.map((e) => base + e), ...exts.map((e) => path.join(base, 'index' + e))]) {
      if (fs.existsSync(cand) && fs.statSync(cand).isFile() && modules.has(cand)) return cand
    }
  }
  return null
}

const reStaticImport = /import\s+(?:type\s+)?(?:[\w*{},\s]+)\s+from\s*['"]([^'"]+)['"]/g
const reSideEffect = /import\s*['"]([^'".][^'"]*)['"]/g
const reReExport = /export\s*(?:\{|\*)[^'"]*from\s*['"]([^'"]+)['"]/g
const reDynamic = /import\(\s*['"]([^'"]+)['"]\s*\)/g
for (const [file, deps] of modules) {
  const src = fs.readFileSync(file, 'utf8')
  for (const re of [reStaticImport, reSideEffect, reReExport, reDynamic]) {
    for (const m of src.matchAll(re)) {
      const spec = m[1]
      if (!spec) continue
      if (spec.startsWith('@tabler') || spec.startsWith('lucide')) continue // 已被 shim 替换
      const target = resolveImport(file, spec)
      if (target && target !== file) deps.add(target)
    }
  }
}

// ---------- Tarjan SCC（迭代式，避免深递归爆栈） ----------
const index = new Map()
const low = new Map()
const onStack = new Set()
const stack = []
const sccs = []
let counter = 0

const graphEdges = [...modules.entries()]
for (const [v] of graphEdges) {
  if (index.has(v)) continue
  // 迭代 Tarjan
  const work = [[v, 0]]
  while (work.length) {
    const top = work[work.length - 1]
    const node = top[0]
    let pi = top[1]
    if (pi === 0) {
      index.set(node, counter)
      low.set(node, counter)
      counter++
      stack.push(node)
      onStack.add(node)
    }
    const deps = modules.get(node)
    let advanced = false
    while (pi < deps.size) {
      const dep = [...deps][pi]
      pi++
      top[1] = pi
      if (!modules.has(dep)) continue
      if (!index.has(dep)) {
        work.push([dep, 0])
        advanced = true
        break
      } else if (onStack.has(dep)) {
        low.set(node, Math.min(low.get(node), index.get(dep)))
      }
    }
    if (advanced) continue
    if (low.get(node) === index.get(node)) {
      const comp = []
      let w
      do {
        w = stack.pop()
        onStack.delete(w)
        comp.push(w)
      } while (w !== node)
      sccs.push(comp)
    }
    work.pop()
    if (work.length) {
      const parent = work[work.length - 1][0]
      low.set(parent, Math.min(low.get(parent), low.get(node)))
    }
  }
}

// ---------- SCC → 桶 ----------
// 大 SCC（>=8 个模块）独占命名桶；小 SCC 按代表路径哈希并入 app-g0..5
const moduleToChunk = new Map()
const BIG = 8
let bigIdx = 0
for (const comp of sccs) {
  if (comp.length >= BIG) {
    const name = 'app-scc' + bigIdx++
    for (const m of comp) moduleToChunk.set(m, name)
  } else {
    const rep = comp.slice().sort()[0]
    let h = 0
    for (let i = 0; i < rep.length; i++) h = (h * 31 + rep.charCodeAt(i)) >>> 0
    const name = 'app-g' + (h % 6)
    for (const m of comp) moduleToChunk.set(m, name)
  }
}

const out = {}
for (const [m, name] of moduleToChunk) out[m] = name
const outPath = path.join(ROOT, 'src/renderer/shims/gen/app-chunks.json')
fs.mkdirSync(path.dirname(outPath), { recursive: true })
fs.writeFileSync(outPath, JSON.stringify(out))
const bigSizes = [...moduleToChunk.keys()].length
console.log(`模块 ${bigSizes}，SCC ${sccs.length}，大 SCC 桶 ${bigIdx} 个`)
const sizes = {}
for (const name of Object.values(out)) sizes[name] = (sizes[name] || 0) + 1
console.log(Object.entries(sizes).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}:${v}`).join(' '))
console.log('->', path.relative(ROOT, outPath))
