// 轻聊：无登录系统、无付费墙。许可证相关操作全部本地化，不请求任何远程服务。
import { licenseActivationSettings, licenseDeactivationSettings } from '@shared/services/license-activation'
import type { ChatboxAILicenseDetail } from '@shared/types'
import { settingsStore } from './settingsStore'

const LOCAL_LICENSE_DETAIL = {
  name: '轻聊本地版',
} as unknown as ChatboxAILicenseDetail

export function reconcileLoginLicenseState(): boolean {
  return false
}

export function initLoginLicenseStateReconciliation(): () => void {
  return () => {}
}

/**
 * 轻聊：跳过远程校验，始终视为已验证
 */
export function useAutoValidate(): boolean {
  return true
}

/**
 * 取消激活：仅清理本地状态，不请求远程
 */
export async function deactivate(_clearLoginState = true) {
  settingsStore.setState((settings) => licenseDeactivationSettings(settings))
}

/**
 * 激活许可证：轻聊为本地版本，任意输入直接本地生效，不联网验证
 */
export async function activate(
  licenseKey: string,
  method: 'login' | 'manual' = 'manual',
  options?: { pageName?: string; accountEmail?: string }
) {
  const key = licenseKey.trim()
  if (!key) {
    return { valid: false as const, error: 'invalid_license_key' }
  }
  const current = settingsStore.getState()
  settingsStore.setState(
    licenseActivationSettings(
      current,
      { licenseKey: key, instanceId: 'qingliao-local', detail: LOCAL_LICENSE_DETAIL },
      method,
      options?.accountEmail
    )
  )
  return { valid: true as const, licenseKey: key, instanceId: 'qingliao-local', detail: LOCAL_LICENSE_DETAIL }
}
