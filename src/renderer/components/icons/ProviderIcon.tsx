import { type ModelProvider, ModelProviderEnum } from '@shared/types'
import { PROVIDER_MARKS, fallbackProviderMark } from '@/qingliao/icons'

// 轻聊：提供方图标全部使用自绘标（原创字母标），无第三方商标图形
export default function ProviderIcon(props: { className?: string; size?: number; provider: ModelProvider | string }) {
  const { className, size = 24, provider } = props

  const id = String(provider || '').toLowerCase()
  const Mark = PROVIDER_MARKS[id]
  if (Mark) {
    return <Mark className={className} size={size} />
  }

  // 语义别名归并
  const aliases: Record<string, string> = {
    [ModelProviderEnum.QwenPortal]: 'qwen',
    [ModelProviderEnum.MoonshotCN]: 'moonshot',
    [ModelProviderEnum.MiniMaxCN]: 'minimax',
    [ModelProviderEnum.ZhipuGLMCodingPlan]: 'zhipu',
    [ModelProviderEnum.OpenAIResponses]: 'openai',
    [ModelProviderEnum.Azure]: 'azure-openai',
    [ModelProviderEnum.OpenCodeGo]: 'opencode',
    [ModelProviderEnum.OpenCodeZen]: 'opencode',
    [ModelProviderEnum.VercelAIGateway]: 'vercel',
    chatboxai: 'chatboxai',
  }
  const aliased = aliases[id]
  const AliasedMark = aliased ? PROVIDER_MARKS[aliased] : undefined
  if (AliasedMark) {
    return <AliasedMark className={className} size={size} />
  }

  const Fallback = fallbackProviderMark(id)
  return <Fallback className={className} size={size} />
}
