import { CHATBOX_BUILD_PLATFORM } from '@/variables'

/**
 * 轻聊 web 版专用：浏览器受同源策略限制，必应等不带
 * Access-Control-Allow-Origin 响应头的站点无法直接 fetch，
 * 需要经公共 CORS 代理回退链抓取。
 * 桌面端（Electron）与移动端不受此限制，保持直连。
 */

const PROXY_BUILDERS: Array<(url: string) => string> = [
  (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  (url) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`,
  // allorigins 的 JSON 包装通道（返回 { contents }），与 raw 通道互为镜像备选
  (url) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
  (url) => `https://api.cors.lol/?url=${encodeURIComponent(url)}`,
  (url) => `https://cors.eu.org/${url}`,
]

const ATTEMPT_TIMEOUT_MS = 10_000
const TOTAL_DEADLINE_MS = 36_000

/** 记住上一次成功的代理（本页会话内），下次优先尝试，显著减少等待 */
let preferredProxyIndex = -1
try {
  preferredProxyIndex = Number(sessionStorage.getItem('qingliao-proxy-preferred') ?? '-1')
  if (!Number.isInteger(preferredProxyIndex) || preferredProxyIndex < 0 || preferredProxyIndex >= PROXY_BUILDERS.length) {
    preferredProxyIndex = -1
  }
} catch {
  preferredProxyIndex = -1
}

function rememberPreferredProxy(index: number) {
  preferredProxyIndex = index
  try {
    sessionStorage.setItem('qingliao-proxy-preferred', String(index))
  } catch {}
}

function combineSignals(signal: AbortSignal | undefined, timeoutMs: number): AbortSignal | undefined {
  const timeoutSignal =
    typeof AbortSignal !== 'undefined' && typeof (AbortSignal as { timeout?: unknown }).timeout === 'function'
      ? (AbortSignal as unknown as { timeout: (ms: number) => AbortSignal }).timeout(timeoutMs)
      : undefined
  if (signal && timeoutSignal && typeof (AbortSignal as { any?: unknown }).any === 'function') {
    return (AbortSignal as unknown as { any: (signals: AbortSignal[]) => AbortSignal }).any([signal, timeoutSignal])
  }
  return signal ?? timeoutSignal
}

export function isWebBuild(): boolean {
  return CHATBOX_BUILD_PLATFORM === 'web'
}

/** 该请求是否需要走代理链：web 构建 + GET + 期望拿到响应体（text/json） */
export function shouldProxyInWeb(
  options: { method?: string; responseType?: string },
): boolean {
  if (!isWebBuild()) return false
  const method = (options.method ?? 'GET').toUpperCase()
  if (method !== 'GET') return false
  if (options.responseType && options.responseType !== 'text' && options.responseType !== 'json') return false
  return true
}

/** 把 ofetch 风格的 query 参数拼到 URL 上（代理链需要完整 URL） */
export function buildUrlWithQuery(url: string, query?: Record<string, unknown>): string {
  if (!query || Object.keys(query).length === 0) return url
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue
    params.append(key, String(value))
  }
  const qs = params.toString()
  if (!qs) return url
  return `${url}${url.includes('?') ? '&' : '?'}${qs}`
}

/** 把 ofetch 的 HeadersInit 归一为普通对象（浏览器 fetch 可直接使用） */
export function normalizeHeaders(headers: unknown): Record<string, string> {
  if (!headers) return {}
  const result: Record<string, string> = {}
  try {
    new Headers(headers as HeadersInit).forEach((value, key) => {
      result[key] = value
    })
  } catch {}
  return result
}

/**
 * 依次尝试公共 CORS 代理，返回首个成功的响应文本。
 * 成功标准：HTTP 2xx 且响应体长度 > 200（过滤代理自身的短错误页）。
 * 全部失败时抛出带各通道失败原因的聚合错误。
 */
export async function fetchTextViaProxies(
  url: string,
  init: { headers?: Record<string, string>; signal?: AbortSignal } = {},
): Promise<string> {
  const deadline = Date.now() + TOTAL_DEADLINE_MS
  // 上次成功的代理优先
  const order = [...PROXY_BUILDERS.keys()]
  if (preferredProxyIndex > 0 && preferredProxyIndex < order.length) {
    order.splice(preferredProxyIndex, 1)
    order.unshift(preferredProxyIndex)
  }
  const problems: string[] = []

  for (const index of order) {
    if (Date.now() > deadline) break
    if (init.signal?.aborted) break
    const proxyUrl = PROXY_BUILDERS[index](url)
    try {
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          ...(init.headers ?? {}),
        },
        signal: combineSignals(init.signal, ATTEMPT_TIMEOUT_MS),
      })
      if (!response.ok) {
        problems.push(`${new URL(proxyUrl).host}: HTTP ${response.status}`)
        continue
      }
      const text = await response.text()
      if (text.length < 200) {
        problems.push(`${new URL(proxyUrl).host}: 响应过短(${text.length})`)
        continue
      }
      if (proxyUrl.includes('allorigins.win/get')) {
        try {
          const wrapped = JSON.parse(text) as { contents?: string }
          if (typeof wrapped.contents === 'string' && wrapped.contents.length > 200) {
            rememberPreferredProxy(index)
            return wrapped.contents
          }
        } catch {}
        problems.push('allorigins/get: 包装解析失败')
        continue
      }
      rememberPreferredProxy(index)
      return text
    } catch (err) {
      if (init.signal?.aborted) break
      problems.push(`${new URL(proxyUrl).host}: ${err instanceof Error ? err.message : String(err)}`)
    }
  }
  throw new Error(problems.length > 0 ? `所有代理通道均失败：${problems.join('；')}` : '所有代理通道均不可用')
}
