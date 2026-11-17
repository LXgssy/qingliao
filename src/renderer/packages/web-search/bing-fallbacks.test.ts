// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { BingSearch } from '@/packages/web-search/bing'

/**
 * 轻聊：必应搜索三通道（SERP → RSS → DuckDuckGo lite）与链接还原的单测。
 * fixture 结构取自真实必应返回样本。
 */

function makeBing(fetchImpl: (url: string, options: { query?: Record<string, unknown> }) => Promise<unknown>) {
  const bing = new BingSearch()
  vi.spyOn(bing, 'fetch' as never).mockImplementation(fetchImpl as never)
  return bing
}

function bingRedirect(target: string): string {
  const b64 = btoa(target).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  return `https://www.bing.com/ck/a?!&&p=deadbeef&u=a1${b64}&ntb=1`
}

const SERP_HTML = (link: string) => `
<html><body><div id="b_results">
<li class="b_algo">
  <h2><a href="${link}" aria-label="轻聊官方站点">轻聊官方站点</a></h2>
  <div class="b_caption"><p class="b_lineclamp4">一个纯本地中文聊天应用</p></div>
</li>
<li class="b_algo">
  <h2><a href="${bingRedirect('https://docs.example.com/guide')}">使用指南</a></h2>
  <div class="b_caption"><p class="b_lineclamp3">快速上手指南</p></div>
</li>
</div></body></html>`

const RSS_XML = `
<?xml version="1.0" encoding="utf-8"?><rss version="2.0"><channel><title>Bing: 测试</title>
<item><title>RSS 结果一</title><link>https://example.com/rss1</link><description>来自 RSS 的描述</description></item>
<item><title>RSS 结果二</title><link>https://example.com/rss2</link><description>第二条</description></item>
</channel></rss>`

const DDG_HTML = `
<html><body><table>
<tr><td><a rel="nofollow" href="//duckduckgo.com/l/?uddg=https%3A%2F%2Fddg.example.com%2F1&amp;rut=abc" class="result-link">DDG 第一条</a></td></tr>
<tr><td class="result-snippet">DDG 摘要内容</td></tr>
</table></body></html>`

beforeEach(() => {
  sessionStorage.removeItem('qingliao-proxy-preferred')
})

describe('BingSearch 三通道回退', () => {
  it('通道1：SERP 有结果时直接返回，并还原 ck/a 跳转链接', async () => {
    const fetchMock = vi.fn(async (_url: string, options: { query?: Record<string, unknown> }) => {
      expect(options.query?.format).toBeUndefined() // SERP 请求不带 format=rss
      return SERP_HTML(bingRedirect('https://qingliao.example.com'))
    })
    const bing = makeBing(fetchMock)
    const result = await bing.search('测试')
    expect(result.items).toHaveLength(2)
    expect(result.items[0].link).toBe('https://qingliao.example.com') // 已还原真实链接
    expect(result.items[1].link).toBe('https://docs.example.com/guide')
    expect(result.items[0].snippet).toContain('纯本地中文聊天应用')
    expect(fetchMock).toHaveBeenCalledTimes(1) // 通道1成功则不再尝试后续通道
  })

  it('通道2：SERP 0 条结果时回退必应 RSS', async () => {
    const calls: string[] = []
    const bing = makeBing(async (_url, options) => {
      calls.push(String(options.query?.format ?? 'serp'))
      if (options.query?.format === 'rss') return RSS_XML
      return '<html><body><div id="b_results">无结果占位</div></body></html>'
    })
    const result = await bing.search('测试')
    expect(result.items).toHaveLength(2)
    expect(result.items[0].link).toBe('https://example.com/rss1')
    expect(calls).toEqual(['serp', 'rss'])
  })

  it('通道3：前两条通道都失败时回退 DuckDuckGo lite，并解开 uddg 链接', async () => {
    const bing = makeBing(async (url, options) => {
      if (String(url).includes('duckduckgo')) return DDG_HTML
      if (options.query?.format === 'rss') throw new Error('RSS 不可用')
      return '<html></html>' // 必应 SERP 0 条结果
    })
    const result = await bing.search('测试')
    expect(result.items).toHaveLength(1)
    expect(result.items[0].link).toBe('https://ddg.example.com/1')
    expect(result.items[0].snippet).toContain('DDG 摘要内容')
  })

  it('全部通道失败时抛出中文提示，包含三条通道的失败原因', async () => {
    const bing = makeBing(async () => {
      throw new Error('网络被拦截')
    })
    await expect(bing.search('测试')).rejects.toThrow(/联网搜索失败/)
    await expect(bing.search('测试2')).rejects.toThrow(/必应网页版/)
  })

  it('非必应 ck 域名的链接不做还原处理', async () => {
    const bing = makeBing(async () => SERP_HTML('https://direct.example.com/plain'))
    const result = await bing.search('测试')
    expect(result.items[0].link).toBe('https://direct.example.com/plain')
  })
})
