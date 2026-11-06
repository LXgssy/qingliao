import * as React from 'react'

// 轻聊：Sentry 替代 stub —— 无遥测，仅保留 API 兼容（本地 console 输出）
export function init(..._args: unknown[]) {}
export function captureException(err: unknown) {
  console.error('[qingliao]', err)
}
export function captureMessage(..._args: unknown[]) {}
export function withScope(_cb: (scope: unknown) => void) {}
export function configureScope(_cb: unknown) {}
export function addBreadcrumb(..._args: unknown[]) {}
export function setUser(..._args: unknown[]) {}
export function setTag(..._args: unknown[]) {}
export function setExtra(..._args: unknown[]) {}
export function setContext(..._args: unknown[]) {}
export function showReportDialog(..._args: unknown[]) {}
export function browserTracingIntegration(..._args: unknown[]) {
  return {}
}
export function reactRouterV6BrowserTracingIntegration(..._args: unknown[]) {
  return {}
}
export function flush(..._args: unknown[]) {
  return Promise.resolve(true)
}
export function close(..._args: unknown[]) {
  return Promise.resolve(true)
}
export function getCurrentHub() {
  return { getClient: () => null }
}
export const SDK_VERSION = 'qingliao-local'

export class ErrorBoundary extends React.Component<Record<string, unknown>, { err: Error | null }> {
  state = { err: null as Error | null }

  static getDerivedStateFromError(err: Error) {
    return { err }
  }

  componentDidCatch(err: Error) {
    console.error('[qingliao] 组件错误:', err)
  }

  render() {
    if (this.state.err) {
      const fallback = this.props.fallback as React.ReactNode
      return fallback ?? null
    }
    return (this.props.children as React.ReactNode) ?? null
  }
}

export function withErrorBoundary<P extends { children?: React.ReactNode }>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return (props: P) =>
    React.createElement(
      ErrorBoundary,
      null,
      React.createElement(Component, props)
    )
}
