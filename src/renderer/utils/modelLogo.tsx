// 轻聊：模型品牌标 —— 官方厂商标志优先（矢量内嵌），无官方图形时回退自绘字母标
import { MODEL_BRAND_MARKS, type IconType } from '@/qingliao/icons'
import { BrandLogo } from '@/qingliao/icons/brand-logos'
import { type ModelBrand, matchModelBrand } from '@shared/utils/model-logo-patterns'
import type { ReactElement } from 'react'

/**
 * 品牌检测逻辑在 @shared/utils/model-logo-patterns（与原生端共享）；
 * 此映射把每个品牌绑定到官方标志（brand-logos），缺失时用自绘标。
 */
const BRAND_LOGO_KEYS: Partial<Record<ModelBrand, string>> = {
  openai: 'openai',
  claude: 'claude',
  gemini: 'gemini',
  deepseek: 'deepseek',
  qwen: 'qwen',
  meta: 'meta',
  mistral: 'mistral',
  moonshot: 'moonshot',
  kimi: 'kimi',
  chatglm: 'chatglm',
  zhipu: 'zhipu',
  doubao: 'doubao',
  baichuan: 'baichuan',
  hunyuan: 'hunyuan',
  minimax: 'minimax',
  stepfun: 'stepfun',
  cohere: 'cohere',
  grok: 'grok',
  perplexity: 'perplexity',
  xiaomi: 'xiaomi',
  longcat: 'longcat',
}

const BRAND_FALLBACK_ICONS: Partial<Record<ModelBrand, IconType>> = {
  yi: MODEL_BRAND_MARKS.yi,
}

export function getModelLogoConfig(modelId: string): { icon: IconType } | { logoKey: string } | undefined {
  const brand = matchModelBrand(modelId)
  if (!brand) return undefined
  const logoKey = BRAND_LOGO_KEYS[brand]
  if (logoKey) return { logoKey }
  const icon = BRAND_FALLBACK_ICONS[brand]
  return icon ? { icon } : undefined
}

export function renderModelIcon(modelId: string, size: number = 16, _isDarkMode: boolean = false): ReactElement | undefined {
  const config = getModelLogoConfig(modelId)
  if (!config) return undefined
  if ('logoKey' in config) return <BrandLogo id={config.logoKey} size={size} />
  const { icon: Icon } = config
  return <Icon size={size} />
}

// 保留按模型名直接匹配的能力（供其他场景使用）
export { modelBrandMarkFor } from '@/qingliao/icons'
