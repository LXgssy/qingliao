import { createRequire } from 'node:module'
import fs from 'node:fs'
import path, { resolve } from 'node:path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type ElectronViteConfig, externalizeDepsPlugin } from 'electron-vite'
import type { Plugin } from 'vite'
import packageJson from './release/app/package.json'
createRequire(import.meta.url)('./scripts/build-mobile-work-worker.cjs').buildWorkModeWorker()

/**
 * 轻聊：精确别名 shim —— 把第三方图标库整体替换为自绘图标体系，
 * 并把大桶依赖（mantine/mui 等）指向 tree-shakable shim，避免构建内存爆炸。
 */
export function exactAliasShims(): Plugin {
  const muiShimDir = resolve(__dirname, 'src/renderer/shims/mui')
  const genDir = resolve(__dirname, 'src/renderer/shims/gen')
  const genShims: Record<string, string> = {
    '@mantine/core': resolve(genDir, 'mantine-core.ts'),
    '@mantine/hooks': resolve(genDir, 'mantine-hooks.ts'),
    '@mui/material': resolve(genDir, 'mui-material.ts'),
    lodash: resolve(genDir, 'lodash.ts'),
    'lodash-es': resolve(genDir, 'lodash.ts'),
    'date-fns': resolve(genDir, 'date-fns.ts'),
  }
  return {
    name: 'ql-exact-alias-shims',
    enforce: 'pre',
    resolveId(source) {
      if (source === '@tabler/icons-react') return resolve(__dirname, 'src/renderer/shims/qingliao-tabler.tsx')
      if (source === 'lucide-react') return resolve(__dirname, 'src/renderer/shims/qingliao-lucide.tsx')
      if (source === '@sentry/react' || source === '@sentry/browser') {
        return resolve(__dirname, 'src/renderer/shims/qingliao-sentry.tsx')
      }
      if (source.startsWith('@mui/icons-material/')) {
        const name = source.slice('@mui/icons-material/'.length)
        const shim = resolve(muiShimDir, `${name}.tsx`)
        if (fs.existsSync(shim)) return shim
      }
      // 精确匹配（不影响 lodash/xxx、date-fns/locale 等子路径）
      if (genShims[source] && fs.existsSync(genShims[source])) return genShims[source]
      return null
    },
  }
}
/**
 * 轻聊：node_modules 预压缩 —— rollup 解析前用 esbuild 压缩第三方代码，
 * 缩小 AST 内存（构建机只有 ~3GB，否则 rendering 阶段被内核 OOM）。
 */
async function preMinifyNodeModules(): Promise<Plugin> {
  const esbuild = await import('esbuild')
  return {
    name: 'ql-pre-minify-node-modules',
    enforce: 'post',
    transform(code, id) {
      const clean = id.split('?')[0]
      if (!/\.(js|mjs|cjs|ts|tsx|jsx)$/.test(clean)) return null
      if (clean.includes('.d.ts')) return null
      if (code.length < 2048) return null // 小文件不值得
      try {
        const out = esbuild.transformSync(code, {
          minifyWhitespace: true,
          minifySyntax: true,
          minifyIdentifiers: false,
          legalComments: 'none',
          target: 'es2020',
          loader: clean.endsWith('.tsx') || clean.endsWith('.ts') ? 'ts' : 'js',
          jsx: 'automatic',
        })
        if (out.code && out.code.length < code.length) return { code: out.code, map: null }
      } catch {}
      return null
    },
  }
}

/**
 * Vite plugin to inject <base href="/"> for web builds
 * This ensures relative paths resolve correctly for SPA routes like /session/xxx
 */
export function injectBaseTag(): Plugin {
  return {
    name: 'inject-base-tag',
    transformIndexHtml() {
      return [
        {
          tag: 'base',
          attrs: { href: '/' },
          injectTo: 'head-prepend', // Inject at the beginning of <head>
        },
      ]
    },
  }
}

/**
 * Vite plugin to inject window.chatbox_release_date for web builds
 */
export function injectReleaseDate(): Plugin {
  const releaseDate = new Date().toISOString().slice(0, 10)
  return {
    name: 'inject-release-date',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          children: `window.chatbox_release_date="${releaseDate}";`,
          injectTo: 'head-prepend',
        },
      ]
    },
  }
}

/**
 * Vite plugin to inject platform-appropriate viewport meta content.
 * Desktop builds omit `height=device-height` and `viewport-fit=cover` which trigger
 * Chromium's Virtual Keyboard API on macOS, causing an empty bottom margin on input focus.
 * See: https://github.com/chatboxai/chatbox/issues/2023
 */
export function injectViewportContent(isDesktop: boolean): Plugin {
  const content = isDesktop
    ? 'width=device-width, initial-scale=1, user-scalable=no'
    : 'height=device-height, width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover'
  return {
    name: 'inject-viewport-content',
    transformIndexHtml(html) {
      return html.replace('%VIEWPORT_CONTENT%', content)
    },
  }
}

/**
 * Vite plugin to replace dvh units with vh units
 * This replaces the webpack string-replace-loader functionality
 */
export function dvhToVh(): Plugin {
  return {
    name: 'dvh-to-vh',
    transform(code, id) {
      if (id.endsWith('.css') || id.endsWith('.scss') || id.endsWith('.sass')) {
        return {
          code: code.replace(/(\d+)dvh/g, '$1vh'),
          map: null,
        }
      }
      return null
    },
  }
}

const electronViteBuildTargets = ['main', 'preload', 'renderer'] as const
type ElectronViteBuildTarget = (typeof electronViteBuildTargets)[number]

// Desktop production builds select one target per process so V8 can release the
// main/preload heaps before the much larger renderer bundle starts.
export function shouldBuildElectronViteTarget(
  target: ElectronViteBuildTarget,
  requestedTarget: string | undefined
): boolean {
  if (!requestedTarget) {
    return true
  }

  const resolvedTarget = electronViteBuildTargets.find((candidate) => candidate === requestedTarget)
  if (!resolvedTarget) {
    throw new Error(
      `Invalid CHATBOX_ELECTRON_VITE_TARGET "${requestedTarget}". Expected one of: ${electronViteBuildTargets.join(', ')}.`
    )
  }

  return resolvedTarget === target
}

// The index signature keeps `process.env` assignable (weak-type check).
export function getRendererDevServerConfig(env: {
  [key: string]: string | undefined
  CHATBOX_QA?: string
  DEV_PORT?: string
}): {
  port: number
  strictPort: boolean
} {
  const isQa = env.CHATBOX_QA === '1'
  if (isQa) {
    const port = env.DEV_PORT && /^\d+$/.test(env.DEV_PORT) ? Number(env.DEV_PORT) : Number.NaN
    if (!Number.isInteger(port) || port < 1 || port > 65_535) {
      throw new Error('CHATBOX_QA=1 requires DEV_PORT with a port between 1 and 65535')
    }
    return { port, strictPort: true }
  }

  return {
    port: Number(env.DEV_PORT) || 1212,
    strictPort: false,
  }
}

const inferredRelease = process.env.SENTRY_RELEASE || packageJson.version
const inferredDist = process.env.SENTRY_DIST || undefined

process.env.SENTRY_RELEASE = inferredRelease
if (inferredDist) {
  process.env.SENTRY_DIST = inferredDist
}

const appChunkMap: Record<string, string> = (() => {
  try {
    return JSON.parse(fs.readFileSync(resolve(__dirname, 'src/renderer/shims/gen/app-chunks.json'), 'utf8'))
  } catch {
    return {}
  }
})()

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  const isWeb = process.env.CHATBOX_BUILD_PLATFORM === 'web'
  const isMobile = process.env.CHATBOX_BUILD_TARGET === 'mobile_app'
  const isDesktop = !isWeb && !isMobile
  const requestedTarget = process.env.CHATBOX_ELECTRON_VITE_TARGET
  const rendererDevServer = getRendererDevServerConfig(process.env)

  const config: ElectronViteConfig = {
    main: {
      plugins: [externalizeDepsPlugin()],
      build: {
        outDir: isProduction ? 'release/app/dist/main' : undefined,
        lib: {
          entry: resolve(__dirname, 'src/main/main.ts'),
        },
        sourcemap: isProduction ? 'hidden' : true,
        minify: isProduction,
        rollupOptions: {
          external: Object.keys(packageJson.dependencies || {}),
          output: {
            entryFileNames: '[name].js',
            inlineDynamicImports: true,
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src/renderer'),
          '@shared': path.resolve(__dirname, './src/shared'),
          'src/shared': path.resolve(__dirname, './src/shared'),
        },
      },
      define: {
        'process.type': '"browser"',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.CHATBOX_BUILD_TARGET': JSON.stringify(process.env.CHATBOX_BUILD_TARGET || 'unknown'),
        'process.env.CHATBOX_BUILD_PLATFORM': JSON.stringify(process.env.CHATBOX_BUILD_PLATFORM || 'unknown'),
        'process.env.CHATBOX_BUILD_CHANNEL': JSON.stringify(process.env.CHATBOX_BUILD_CHANNEL || 'unknown'),
        'process.env.USE_LOCAL_API': JSON.stringify(process.env.USE_LOCAL_API || ''),
        'process.env.USE_BETA_API': JSON.stringify(process.env.USE_BETA_API || ''),
        'process.env.USE_NEWDB_API': JSON.stringify(process.env.USE_NEWDB_API || ''),
        'process.env.USE_LOCAL_CHATBOX': JSON.stringify(process.env.USE_LOCAL_CHATBOX || ''),
        'process.env.USE_BETA_CHATBOX': JSON.stringify(process.env.USE_BETA_CHATBOX || ''),
        'process.env.CHATBOX_SKIP_GUIDE': JSON.stringify(process.env.CHATBOX_SKIP_GUIDE || ''),
        'process.env.CHATBOX_START_PAGE': JSON.stringify(process.env.CHATBOX_START_PAGE || ''),
      },
    },
    preload: {
      plugins: [],
      build: {
        outDir: isProduction ? 'release/app/dist/preload' : undefined,
        lib: {
          entry: resolve(__dirname, 'src/preload/index.ts'),
        },
        sourcemap: isProduction ? 'hidden' : true,
        minify: isProduction,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src/renderer'),
          '@shared': path.resolve(__dirname, './src/shared'),
          'src/shared': path.resolve(__dirname, './src/shared'),
        },
      },
    },
    renderer: {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src/renderer'),
          '@shared': path.resolve(__dirname, 'src/shared'),
        },
      },
      plugins: [
        TanStackRouterVite({
          target: 'react',
          autoCodeSplitting: true,
          routesDirectory: './src/renderer/routes',
          generatedRouteTree: './src/renderer/routeTree.gen.ts',
        }),
        react({}),
        dvhToVh(),
        injectViewportContent(isDesktop),
        preMinifyNodeModules(),
{
          name: 'ql-entry-attrib',
          generateBundle(_o, bundle) {
            try {
              for (const [name, f] of Object.entries(bundle)) {
                if (f.type !== 'chunk') continue
                const rendered = f.code.length
                const byDir = {}
                let total = 0
                for (const mid of Object.keys(f.modules)) {
                  let s = 0
                  try { s = fs.statSync(mid.split('?')[0]).size } catch { s = 0 }
                  let dir = 'other'
                  const m = mid.match(/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?((?:@[^/]+\/)?[^/]+)\//)
                  if (mid.includes('chatbox-src/src/renderer/')) dir = 'app:' + mid.split('src/renderer/')[1].split('/')[0]
                  else if (mid.includes('chatbox-src/src/shared/')) dir = 'app:shared'
                  else if (mid.includes('chatbox-src/packages/')) dir = 'app:' + mid.split('packages/')[1].split('/')[0]
                  else if (m) dir = 'dep:' + m[1]
                  byDir[dir] = (byDir[dir] || 0) + s
                  total += s
                }
                if (rendered > 1024 * 1024) {
                  const rows = Object.entries(byDir).sort((a, b) => b[1] - a[1]).slice(0, 25)
                  fs.writeFileSync('/tmp/ql-attrib-' + name.replace(/\//g, '_') + '.txt', `chunk=${name} rendered=${(rendered / 1048576).toFixed(2)}MB sources=${(total / 1048576).toFixed(2)}MB\n` + rows.map(([k, v]) => `${(v / 1048576).toFixed(2)}MB\t${k}`).join('\n'))
                }
              }
            } catch (e) {
              fs.writeFileSync('/tmp/ql-attrib.err', String(e))
            }
          },
        },
        exactAliasShims(),
        isWeb ? injectBaseTag() : undefined,
        injectReleaseDate(),
      ].filter(Boolean),
      build: {
        outDir: isProduction ? 'release/app/dist/renderer' : undefined,
        target: 'es2020', // Avoid static initialization blocks for browser compatibility
        sourcemap: false, // 轻聊：不生成 sourcemap（省体积与内存）
        reportCompressedSize: false,
        minify: false, // 轻聊：rollup 不压缩（省内存），由 scripts/build-post.mjs 用 esbuild CLI 逐文件压缩
        rollupOptions: {
          output: {
            entryFileNames: 'js/[name].[hash].js',
            chunkFileNames: 'js/[name].[hash].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                return 'styles/[name].[hash][extname]'
              }
              if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
                return 'fonts/[name].[hash][extname]'
              }
              if (/\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(assetInfo.name || '')) {
                return 'images/[name].[hash][extname]'
              }
              return 'assets/[name].[hash][extname]'
            },
            hoistTransitiveImports: false,
            // 轻聊分桶：仅语义桶；其余（含应用源码）交给 rollup 默认分块，避免跨桶循环依赖
            manualChunks(id) {
              const normalizedId = id.split(path.sep).join('/')
              // 应用源码交给 rollup 默认分块（任何手工分桶都会引发跨桶 TDZ）
              const pm =
                normalizedId.match(/\/node_modules\/\.pnpm\/[^/]+\/node_modules\/((?:@[^/]+\/)?[^/]+)\//) ||
                normalizedId.match(/\/node_modules\/((?:@[^/]+\/)?[^/]+)\//)
              if (!pm) {
                // 应用源码分层桶：shared+core 互引成团，单独成桶（其运行时依赖仅 vendors）
                if (normalizedId.includes('/src/shared/') || normalizedId.includes('/packages/chatbox-core/')) {
                  return 'app-core'
                }
                return undefined
              }
              const pkg = pm[1].toLowerCase()
              // 语法高亮：langs/themes 按需动态加载；shiki 核心 + textmate 单独成桶
              if (pkg.startsWith('@shikijs/langs') || pkg.startsWith('@shikijs/themes') || pkg.startsWith('@faker-js/')) return undefined
              if (pkg.startsWith('shiki') || pkg.startsWith('@shikijs/')) return 'vendor-shiki'
              if (pkg === 'zod') return 'vendor-zod'
              if (pkg === 'react' || pkg === 'react-dom' || pkg === 'scheduler') return 'vendor-react-dom'
              if (
                pkg.startsWith('@mantine/') ||
                pkg.startsWith('@mui/') ||
                pkg === 'clsx' ||
                pkg.startsWith('@emotion/')
              )
                return 'vendor-ui'
              if (pkg === 'ai' || pkg.startsWith('@ai-sdk/')) return 'vendor-ai'
              if (pkg === 'katex') return 'vendor-katex'
              if (pkg === 'lodash') return 'vendor-lodash'
              if (pkg.startsWith('d3') || pkg === 'recharts' || pkg.startsWith('victory-vendor')) return 'vendor-charts'
              if (pkg === '@noble/hashes' || pkg === 'gpt-tokenizer' || pkg === 'js-tiktoken') return 'vendor-tokenizer'
              if (pkg === 'mermaid' || pkg.startsWith('@mermaid-js/')) return 'vendor-mermaid'
              if (pkg === 'cytoscape' || pkg === 'dagre' || pkg === 'dagre-d3-es') return 'vendor-diagrams'
              if (pkg.startsWith('marked') || pkg === 'markdown-it' || pkg === 'dompurify' || pkg === 'highlight.js')
                return 'vendor-markdown'
              if (pkg.startsWith('@modelcontextprotocol/')) return 'vendor-mcp'
              if (
                pkg === 'photoswipe' ||
                pkg === '@openrouter/ai-sdk-provider' ||
                pkg.startsWith('@dnd-kit/') ||
                pkg === 'react-zoom-pan-pinch' ||
                pkg.startsWith('micromark') ||
                pkg === 'react-virtuoso' ||
                pkg === 'i18next' ||
                pkg === 'react-i18next'
              )
                return 'vendor-misc'
              return undefined
            },
          },
        },
      },
      css: {
        modules: {
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        postcss: './postcss.config.cjs',
      },
      server: {
        port: rendererDevServer.port,
        strictPort: rendererDevServer.strictPort,
        watch: {
          // The root .env is a 1Password-managed FIFO in local development. Vite
          // treats env file changes as a full server restart, which can interrupt
          // dependency scanning during startup and print noisy dep-scan failures.
          ignored: ['**/.env', '**/.env.*'],
        },
      },
      define: {
        'process.type': '"renderer"',
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.CHATBOX_BUILD_TARGET': JSON.stringify(process.env.CHATBOX_BUILD_TARGET || 'unknown'),
        'process.env.CHATBOX_BUILD_PLATFORM': JSON.stringify(process.env.CHATBOX_BUILD_PLATFORM || 'unknown'),
        'process.env.CHATBOX_BUILD_CHANNEL': JSON.stringify(process.env.CHATBOX_BUILD_CHANNEL || 'unknown'),
        'process.env.CHATBOX_BUILD_VERSION': JSON.stringify(process.env.VERSION_NUMBER || ''),
        'process.env.USE_LOCAL_API': JSON.stringify(process.env.USE_LOCAL_API || ''),
        'process.env.USE_BETA_API': JSON.stringify(process.env.USE_BETA_API || ''),
        'process.env.USE_NEWDB_API': JSON.stringify(process.env.USE_NEWDB_API || ''),
        'process.env.USE_LOCAL_CHATBOX': JSON.stringify(process.env.USE_LOCAL_CHATBOX || ''),
        'process.env.USE_BETA_CHATBOX': JSON.stringify(process.env.USE_BETA_CHATBOX || ''),
        'process.env.CHATBOX_SKIP_GUIDE': JSON.stringify(process.env.CHATBOX_SKIP_GUIDE || ''),
        'process.env.CHATBOX_START_PAGE': JSON.stringify(process.env.CHATBOX_START_PAGE || ''),
      },
      optimizeDeps: {
        // Force a fresh dep optimization on dev startup. This avoids stale .vite
        // cache artifacts that intermittently break MUI internals after branch or
        // dependency changes with runtime errors like "createTheme_default is not a function".
        force: true,
        include: ['mermaid'],
        esbuildOptions: {
          target: 'es2015',
        },
      },
    },
  }

  if (!requestedTarget) {
    return config
  }
  if (shouldBuildElectronViteTarget('main', requestedTarget)) {
    return { main: config.main }
  }
  if (shouldBuildElectronViteTarget('preload', requestedTarget)) {
    return { preload: config.preload }
  }
  return { renderer: config.renderer }
})
