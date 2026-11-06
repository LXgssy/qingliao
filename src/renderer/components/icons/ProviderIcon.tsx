import { type ModelProvider, ModelProviderEnum } from '@shared/types'
import { PROVIDER_MARKS, fallbackProviderMark } from '@/qingliao/icons'
import { BrandLogo, hasBrandLogo } from '@/qingliao/icons/brand-logos'
import { getProviderIconSrc } from '@/utils/providerIconSrc'

/**
 * 轻聊：提供方图标
 * 1. 官方厂商标志（内嵌矢量，与官方 logo 一致）
 * 2. 本地打包的官方图标图片（上游 PNG 资源）
 * 3. 自绘字母徽章兜底
 */
export default function ProviderIcon(props: { className?: string; size?: number; provider: ModelProvider | string }) {
  const { className, size = 24, provider } = props

  const id = String(provider || '').toLowerCase()

  // 语义别名归并
  const aliases: Record<string, string> = {
    [ModelProviderEnum.QwenPortal]: 'qwen',
    [ModelProviderEnum.MoonshotCN]: 'moonshot',
    [ModelProviderEnum.MiniMaxCN]: 'minimax',
    [ModelProviderEnum.ZhipuGLMCodingPlan]: 'chatglm-6b',
    [ModelProviderEnum.OpenAIResponses]: 'openai',
    [ModelProviderEnum.Azure]: 'azure',
    [ModelProviderEnum.OpenCodeGo]: 'opencode',
    [ModelProviderEnum.OpenCodeZen]: 'opencode',
    [ModelProviderEnum.VercelAIGateway]: 'vercel',
    chatboxai: 'chatbox-ai',
  }
  const normalized = aliases[id] ?? id

  // 1) 官方厂商标志（矢量）
  const brandKey = PROVIDER_BRAND_KEYS[normalized] ?? PROVIDER_BRAND_KEYS[id]
  if (brandKey && hasBrandLogo(brandKey)) {
    return <BrandLogo id={brandKey} size={size} className={className} />
  }

  // 2) 官方图标图片（本地 PNG）
  const src = getProviderIconSrc(normalized) ?? getProviderIconSrc(id)
  if (src) {
    return (
      <img
        src={src}
        width={size}
        height={size}
        alt=""
        className={className}
        style={{ objectFit: 'contain' }}
        draggable={false}
      />
    )
  }

  // 3) 自绘字母徽章兜底
  const Mark = PROVIDER_MARKS[normalized] ?? PROVIDER_MARKS[id]
  if (Mark) {
    return <Mark className={className} size={size} />
  }
  const Fallback = fallbackProviderMark(id)
  return <Fallback className={className} size={size} />
}

/** 提供方 id → 官方品牌标志 key */
const PROVIDER_BRAND_KEYS: Record<string, string> = {
  openai: 'openai',
  'openai-responses': 'openai',
  'azure-openai': 'azure',
  azure: 'azure',
  'chatglm-6b': 'chatglm',
  'zhipu-glm-coding-plan': 'chatglm',
  zhipu: 'zhipu',
  claude: 'claude',
  anthropic: 'claude',
  gemini: 'gemini',
  google: 'google',
  qwen: 'qwen',
  'qwen-portal': 'qwen',
  'alibaba-cloud': 'alibabacloud',
  minimax: 'minimax',
  'minimax-cn': 'minimax',
  moonshot: 'moonshot',
  'moonshot-cn': 'moonshot',
  kimi: 'kimi',
  doubao: 'doubao',
  ollama: 'ollama',
  groq: 'groq',
  'groq-cloud': 'groq',
  deepseek: 'deepseek',
  siliconflow: 'siliconflow',
  'silicon-cloud': 'siliconflow',
  volcengine: 'volcengine',
  'mistral-ai': 'mistral',
  mistral: 'mistral',
  'lm-studio': 'lmstudio',
  lmstudio: 'lmstudio',
  perplexity: 'perplexity',
  xai: 'xai',
  grok: 'grok',
  openrouter: 'openrouter',
  bedrock: 'bedrock',
  vercel: 'vercel',
  'vercel-ai-gateway': 'vercel',
  'tencent-hunyuan': 'hunyuan',
  hunyuan: 'hunyuan',
  'xiaomi-mimo': 'xiaomi',
  xiaomi: 'xiaomi',
  mimo: 'xiaomi',
  longcat: 'longcat',
  'github-copilot': 'copilot',
  copilot: 'copilot',
  together: 'together',
  cohere: 'cohere',
  baichuan: 'baichuan',
  stepfun: 'stepfun',
  'step-function': 'stepfun',
  spark: 'spark',
  meta: 'meta',
  llama: 'meta',
  opencode: 'opencode',
}
