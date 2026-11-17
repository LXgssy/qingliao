import type { SearchResult } from '@shared/types'
import { getSearchAcceptLanguage } from './accept-language'
import WebSearch from './base'

/**
 * 轻聊：必应搜索的三道防线
 * 1) 必应网页 SERP（#b_results>li.b_algo，与原版解析一致）
 * 2) 必应 RSS（format=rss，结构化通道，几乎不被机器人墙拦截）
 * 3) DuckDuckGo lite（跨引擎兜底）
 * web 端以上请求全部经 base 的公共代理回退链发出（浏览器 CORS 限制）。
 */
export class BingSearch extends WebSearch {
  async search(query: string, signal?: AbortSignal): Promise<SearchResult> {
    const failures: string[] = []

    // 1) 必应网页 SERP
    try {
      const html = await this.fetchSerp(query, signal)
      const items = this.extractItems(html)
      if (items.length > 0) return { items }
      failures.push('必应网页版：0 条结果')
    } catch (err) {
      failures.push(`必应网页版：${this.describe(err)}`)
    }

    if (signal?.aborted) throw new Error('搜索已取消')

    // 2) 必应 RSS
    try {
      const xml = await this.fetchRss(query, signal)
      const items = this.extractRssItems(xml)
      if (items.length > 0) return { items }
      failures.push('必应 RSS：0 条结果')
    } catch (err) {
      failures.push(`必应 RSS：${this.describe(err)}`)
    }

    if (signal?.aborted) throw new Error('搜索已取消')

    // 3) DuckDuckGo lite
    try {
      const html = await this.fetchDuckDuckGoLite(query, signal)
      const items = this.extractDuckDuckGoItems(html)
      if (items.length > 0) return { items }
      failures.push('DuckDuckGo：0 条结果')
    } catch (err) {
      failures.push(`DuckDuckGo：${this.describe(err)}`)
    }

    throw new Error(
      `联网搜索失败，必应网页版、必应 RSS、DuckDuckGo 三条通道均不可用（${failures.join('；')}）。` +
        '当前网络可能限制了搜索通道，请在「设置 → 联网搜索」中更换搜索提供方（如 Tavily / Bocha / SearXNG），或稍后重试。',
    )
  }

  private describe(err: unknown): string {
    const message = err instanceof Error ? err.message : String(err)
    return message.length > 160 ? `${message.slice(0, 160)}…` : message
  }

  private async fetchSerp(query: string, signal?: AbortSignal) {
    const html = await this.fetch('https://www.bing.com/search', {
      method: 'GET',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': getSearchAcceptLanguage(),
      },
      query: { q: query },
      responseType: 'text',
      signal,
    })
    return html as string
  }

  private async fetchRss(query: string, signal?: AbortSignal) {
    const xml = await this.fetch('https://www.bing.com/search', {
      method: 'GET',
      headers: {
        Accept: 'application/rss+xml,application/xml,text/xml,*/*;q=0.8',
        'Accept-Language': getSearchAcceptLanguage(),
      },
      query: { q: query, format: 'rss' },
      responseType: 'text',
      signal,
    })
    return xml as string
  }

  private async fetchDuckDuckGoLite(query: string, signal?: AbortSignal) {
    const html = await this.fetch('https://lite.duckduckgo.com/lite/', {
      method: 'GET',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': getSearchAcceptLanguage(),
      },
      query: { q: query },
      responseType: 'text',
      signal,
    })
    return html as string
  }

  private extractItems(html: string) {
    const dom = new DOMParser().parseFromString(html, 'text/html')
    const nodes = dom.querySelectorAll('#b_results>li.b_algo')
    return Array.from(nodes)
      .slice(0, 10)
      .map((node) => {
        const nodeA = node.querySelector('h2>a') || node.querySelector('a.tilk')
        if (!nodeA) return null
        const rawLink = nodeA.getAttribute('href')
        if (!rawLink) return null
        const link = this.unwrapBingRedirectLink(rawLink)
        const title = nodeA.getAttribute('aria-label') || nodeA.textContent || ''
        if (!title) return null
        const nodeAbstract = node.querySelector('p[class^="b_lineclamp"]') || node.querySelector('.b_caption p')
        const snippet = nodeAbstract?.textContent || ''
        return { title, link, snippet }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }

  /**
   * 必应网页版 SERP 现在把结果链接包成 https://www.bing.com/ck/a?...&u=a1<base64url> 跳转链，
   * 还原成真实目标链接（还原失败时保留原链接）。
   */
  private unwrapBingRedirectLink(href: string): string {
    try {
      if (!href.includes('bing.com/ck/')) return href
      let u = ''
      try {
        u = new URL(href).searchParams.get('u') ?? ''
      } catch {
        const m = href.match(/[?&]u=([^&]+)/)
        u = m ? m[1] : ''
      }
      if (u.startsWith('a1')) u = u.slice(2)
      if (!u) return href
      const padded = u + '='.repeat((4 - (u.length % 4)) % 4)
      const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'))
      return decoded.startsWith('http') ? decoded : href
    } catch {
      return href
    }
  }

  private extractRssItems(xml: string) {
    // 代理链可能引入 BOM/前导空白，严格 XML 解析器会因声明前的字符抛 parsererror
    const cleaned = xml.trim()
    const dom = new DOMParser().parseFromString(cleaned, 'text/xml')
    const nodes = dom.querySelectorAll('item')
    if (nodes.length > 0) {
      return this.mapRssItems(nodes)
    }
    if (!dom.querySelector('parsererror')) return []
    // 兜底：按 <item> 标签手工切分（应对被代理污染的 XML）
    const manual = cleaned.match(/<item>[\s\S]*?<\/item>/g) ?? []
    const wrapper = `<root>${manual.join('')}</root>`
    const retry = new DOMParser().parseFromString(wrapper, 'text/xml')
    return this.mapRssItems(retry.querySelectorAll('item'))
  }

  private mapRssItems(nodes: Iterable<Element>) {
    return Array.from(nodes)
      .slice(0, 10)
      .map((node) => {
        const link = node.querySelector('link')?.textContent?.trim() || ''
        const title = node.querySelector('title')?.textContent?.trim() || ''
        if (!link || !title) return null
        const snippet = node.querySelector('description')?.textContent?.trim() || ''
        return { title, link, snippet }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }

  private extractDuckDuckGoItems(html: string) {
    const dom = new DOMParser().parseFromString(html, 'text/html')
    const anchors = Array.from(dom.querySelectorAll('a.result-link, a.result__a'))
    return Array.from(anchors)
      .slice(0, 10)
      .map((nodeA) => {
        const rawLink = nodeA.getAttribute('href') || ''
        const link = this.unwrapDuckDuckGoLink(rawLink)
        const title = nodeA.textContent?.trim() || ''
        if (!link || !title) return null
        const row = nodeA.closest('tr')?.nextElementSibling
        const snippet =
          row?.querySelector('.result-snippet')?.textContent?.trim() ||
          nodeA.closest('.result')?.querySelector('.result__snippet')?.textContent?.trim() ||
          ''
        return { title, link, snippet }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
  }

  /** DDG 常把结果包成 //duckduckgo.com/l/?uddg=<编码后的真实链接>，解开它 */
  private unwrapDuckDuckGoLink(href: string): string {
    try {
      if (href.includes('uddg=')) {
        const uddg = new URLSearchParams(href.split('?')[1] ?? '').get('uddg')
        if (uddg) return decodeURIComponent(uddg)
      }
      if (href.startsWith('//')) return `https:${href}`
      return href
    } catch {
      return href
    }
  }
}
