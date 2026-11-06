// 轻聊：模型品牌标全部来自自绘图标体系（原创字母标/几何标）
import { MODEL_BRAND_MARKS, PROVIDER_MARKS, type IconType } from '@/qingliao/icons'
import { type ModelBrand, matchModelBrand } from '@shared/utils/model-logo-patterns'
import type { ReactElement } from 'react'

/**
 * 品牌检测逻辑在 @shared/utils/model-logo-patterns（与原生端共享）；
 * 此映射把每个品牌绑定到自绘标。
 */
const BRAND_ICONS: Record<ModelBrand, IconType> = {
  openai: MODEL_BRAND_MARKS.gpt,
  claude: MODEL_BRAND_MARKS.claude,
  gemini: MODEL_BRAND_MARKS.gemini,
  deepseek: MODEL_BRAND_MARKS.deepseek,
  qwen: MODEL_BRAND_MARKS.qwen,
  meta: MODEL_BRAND_MARKS.llama,
  mistral: MODEL_BRAND_MARKS.mistral,
  moonshot: MODEL_BRAND_MARKS.moonshot,
  kimi: MODEL_BRAND_MARKS.kimi,
  chatglm: MODEL_BRAND_MARKS.glm,
  zhipu: MODEL_BRAND_MARKS.glm,
  doubao: MODEL_BRAND_MARKS.doubao,
  baichuan: MODEL_BRAND_MARKS.baichuan,
  yi: MODEL_BRAND_MARKS.yi,
  hunyuan: MODEL_BRAND_MARKS.hunyuan,
  minimax: MODEL_BRAND_MARKS.minimax,
  stepfun: MODEL_BRAND_MARKS.step,
  cohere: MODEL_BRAND_MARKS.command,
  grok: MODEL_BRAND_MARKS.grok,
  perplexity: PROVIDER_MARKS.perplexity,
  xiaomi: PROVIDER_MARKS.mimo,
  longcat: PROVIDER_MARKS.longcat,
}

export function getModelLogoConfig(modelId: string): { icon: IconType } | undefined {
  const brand = matchModelBrand(modelId)
  return brand ? { icon: BRAND_ICONS[brand] } : undefined
}

export function renderModelIcon(modelId: string, size: number = 16, _isDarkMode: boolean = false): ReactElement | undefined {
  const config = getModelLogoConfig(modelId)
  if (!config) return undefined
  const { icon: Icon } = config
  return <Icon size={size} />
}

// 保留按模型名直接匹配的能力（供其他场景使用）
export { modelBrandMarkFor }
