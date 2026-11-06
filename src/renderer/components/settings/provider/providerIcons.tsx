import ProviderIcon from '@/components/icons/ProviderIcon'

export const FEATURED_PROVIDER_IDS: string[] = [
  'openai',
  'claude',
  'gemini',
  'siliconflow',
  'deepseek',
  'xiaomi-mimo',
  'minimax',
  'chatglm-6b',
  'openrouter',
  'ollama',
]

/** 轻聊：提供方图标统一走 ProviderIcon（官方矢量标志 → 本地 PNG → 自绘字母标） */
export function ProviderIconImage({ providerId, size = 32 }: { providerId: string; size?: number }) {
  return <ProviderIcon provider={providerId} size={size} />
}
