// 轻聊：纯本地应用，不向远程上报崩溃数据。
// 原版此模块会初始化 Sentry（sentry.midway.run）；
// 轻聊保留 initSentry 导出与启动时序（内部做一次设置水合），
// 但不再安装任何远程上报器。
import { initSettingsStore } from '@/stores/settingsStore'

let sentryInitPromise: Promise<boolean> | undefined

async function initializeSentry(): Promise<boolean> {
  try {
    // 保留设置水合调用以维持启动时序（幂等、有缓存），随后直接返回。
    await initSettingsStore()
    return false
  } catch (e) {
    console.error('Failed to initialize telemetry guard:', e)
    return false
  }
}

export function initSentry(): Promise<boolean> {
  sentryInitPromise ??= initializeSentry()
  return sentryInitPromise
}
