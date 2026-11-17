import { describe, expect, it } from 'vitest'
import { getWebSearchConfigurationIssue } from './configuration-issue'

describe('getWebSearchConfigurationIssue', () => {
  it('requires no sign-in for built-in providers (轻聊：无登录门槛)', () => {
    expect(getWebSearchConfigurationIssue({ provider: 'build-in' })).toBeNull()
    expect(getWebSearchConfigurationIssue({ provider: 'bing' })).toBeNull()
  })

  it('reports missing third-party provider configuration', () => {
    expect(getWebSearchConfigurationIssue({ provider: 'tavily' })).toBe('tavily-api-key')
    expect(getWebSearchConfigurationIssue({ provider: 'bocha' })).toBe('bocha-api-key')
    expect(getWebSearchConfigurationIssue({ provider: 'querit' })).toBe('querit-api-key')
    expect(getWebSearchConfigurationIssue({ provider: 'searxng', searxngBaseUrl: '  ' })).toBe('searxng-instance')
  })
})
