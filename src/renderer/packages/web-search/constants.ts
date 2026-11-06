export const WEB_SEARCH_PROVIDERS = [
  { value: 'bing', label: 'Bing Search' },
  { value: 'tavily', label: 'Tavily' },
  { value: 'bocha', label: 'BoCha' },
  { value: 'querit', label: 'Querit' },
  { value: 'searxng', label: 'SearXNG' },
] as const

// 兼容旧配置里可能存在的 'build-in'（运行时会回退到 Bing）
export type WebSearchProviderValue = (typeof WEB_SEARCH_PROVIDERS)[number]['value'] | 'build-in'
