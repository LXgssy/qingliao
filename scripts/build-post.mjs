#!/usr/bin/env node
/**
 * 轻聊构建后处理：
 * 1. 用 esbuild 以 charset=utf8 二次压缩全部产物 JS（vite 的 esbuild 默认转义非 ASCII，中文体积膨胀）
 * 2. 落盘 sw.js（轻聊 Service Worker）
 * 3. 体积体检：>4.2MB 的文件告警（热铁盒单文件上限约 4MB+）
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const DIST = 'release/app/dist/renderer'

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

// 1) esbuild 二次压缩（保留更小的版本）
const jsFiles = walk(DIST).filter((f) => /\.(js|mjs)$/.test(f) && !f.endsWith('.min.js'))
console.log(`esbuild 二次压缩 ${jsFiles.length} 个文件...`)
for (const f of jsFiles) {
  const before = fs.statSync(f).size
  const tmp = f + '.tmp'
  try {
    execFileSync(
      'npx',
      ['esbuild', f, '--minify', '--charset=utf8', `--outfile=${tmp}`],
      { stdio: 'pipe', shell: process.platform === 'win32' }
    )
    const after = fs.statSync(tmp).size
    if (after <= before) fs.renameSync(tmp, f)
    else fs.rmSync(tmp, { force: true })
  } catch (e) {
    fs.rmSync(tmp, { force: true })
    console.warn('  跳过', f, String(e).slice(0, 80))
  }
}

// 2) sw.js
fs.copyFileSync('scripts/qingliao-sw.js', path.join(DIST, 'sw.js'))
console.log('sw.js 已落盘')

// 3) 体积体检
let over = 0
for (const f of walk(DIST)) {
  const s = fs.statSync(f).size
  if (s > 4.2 * 1024 * 1024) {
    console.warn(`  ⚠ 超限 ${(s / 1048576).toFixed(2)}MB: ${f}`)
    over++
  }
}
console.log(over ? `${over} 个文件超限` : '全部文件 ≤4.2MB ✓')
