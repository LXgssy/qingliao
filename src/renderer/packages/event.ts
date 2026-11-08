import type { AnalyticsEventParams } from '@shared/analytics'

// 轻聊：纯本地应用，不上报任何遥测事件。
// 原版此函数会把事件转发到 Google Analytics（window.gtag）；
// 在 gtag 脚本被墙或被剥离时（window.gtag 不存在）会抛
// "window.gtag is not a function"，并在模态框 useEffect 中
// 直接炸掉整个应用（表现为「对话设置」等弹窗打开后整页空白）。
// 这里彻底改为 no-op，保证任何调用点都安全。
export function trackingEvent(_name: string, _params: AnalyticsEventParams = {}) {
  return
}
