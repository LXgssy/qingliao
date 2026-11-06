import { createBadge, createIcon, letterBadge } from './factory'

// 轻聊自绘图标 · 提供方与模型品牌标
// 全部为原创字母标 / 几何图形，不使用任何第三方商标图形或 emoji

/** 轻聊品牌标：渐变圆盘 + 白色对话气泡 */
export const MarkQingliao = createBadge(
  'MarkQingliao',
  'transparent',
  <>
    <defs>
      <linearGradient id="ql-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3b82f6" />
        <stop offset="1" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="11" fill="url(#ql-grad)" />
    <path
      d="M7.2 8.2h9.6a1.7 1.7 0 0 1 1.7 1.7v5a1.7 1.7 0 0 1-1.7 1.7h-5.1L8 19.4v-2.8h-.8a1.7 1.7 0 0 1-1.7-1.7v-5a1.7 1.7 0 0 1 1.7-1.7z"
      fill="#ffffff"
    />
    <circle cx="9.4" cy="12.4" r="1.05" fill="url(#ql-grad)" />
    <circle cx="12.6" cy="12.4" r="1.05" fill="url(#ql-grad)" />
  </>,
  { noPlate: true }
)

// ---------- 模型提供方（provider id → 自绘标） ----------
const P = (id: string, bg: string, text: string, fontSize?: number) => [id, bg, text, fontSize] as const

const PROVIDER_LETTERS = [
  P('openai', '#10a37f', 'OA'),
  P('openai-responses', '#0d9488', 'OA'),
  P('azure-openai', '#0078d4', 'AZ'),
  P('claude', '#d97757', 'CL'),
  P('google', '#4285f4', 'GO'),
  P('gemini', '#4285f4', 'GE'),
  P('deepseek', '#4d6bfe', 'DS'),
  P('qwen', '#615ced', 'QW'),
  P('moonshot', '#16b3a0', 'MS'),
  P('kimi', '#16b3a0', 'KI'),
  P('zhipu', '#3b6dff', 'ZP'),
  P('glm', '#3b6dff', 'GL'),
  P('doubao', '#3b6dff', 'DB'),
  P('minimax', '#f23f5d', 'MM'),
  P('baichuan', '#f79c43', 'BC'),
  P('xai', '#111827', 'XA'),
  P('groq', '#f55036', 'GQ'),
  P('mistral', '#fa520f', 'MI'),
  P('ollama', '#111827', 'OL'),
  P('groq-cloud', '#f55036', 'GQ'),
  P('siliconflow', '#7c3aed', 'SF'),
  P('volcengine', '#1664ff', 'VE'),
  P('hunyuan', '#0052d9', 'HY'),
  P('mimo', '#ff6900', 'MO'),
  P('longcat', '#ff5722', 'LC'),
  P('stepfun', '#0046ff', 'ST'),
  P('yi', '#0c8f44', 'YI'),
  P('cohere', '#39594d', 'CO'),
  P('meta', '#0668e1', 'MT'),
  P('perplexity', '#20808d', 'PX'),
  P('openrouter', '#6467f2', 'OR'),
  P('github-copilot', '#111827', 'GH'),
  P('bedrock', '#ff9900', 'BR'),
  P('vercel', '#111827', 'VC'),
  P('opencode', '#0f766e', 'OC'),
  P('lmstudio', '#5b6470', 'LM'),
  P('custom', '#64748b', '自'),
  P('chatboxai', '#4f8cff', '轻'),
].map(([id, bg, text, fs]) => ({ id, mark: letterBadge('prov-' + id, bg, text, { fontSize: fs }) }))

export const PROVIDER_MARKS: Record<string, ReturnType<typeof letterBadge>> = Object.fromEntries(
  PROVIDER_LETTERS.map((x) => [x.id, x.mark])
)

/** 兜底标：取提供方名首字母 */
export function fallbackProviderMark(name: string) {
  const ch = (name || '?').trim().charAt(0).toUpperCase() || '?'
  return letterBadge('prov-fb-' + ch, '#64748b', ch)
}

// ---------- 模型品牌（按模型名/系列匹配） ----------
const B = (id: string, bg: string, text: string, fontSize?: number) => ({ id, bg, text, fontSize })

const MODEL_BRAND_LIST = [
  B('gpt', '#10a37f', 'GPT', 9),
  B('o1', '#0d9488', 'O1'),
  B('o3', '#0d9488', 'O3'),
  B('o4', '#0d9488', 'O4'),
  B('claude', '#d97757', 'CL'),
  B('gemini', '#4285f4', 'GE'),
  B('deepseek', '#4d6bfe', 'DS'),
  B('qwen', '#615ced', 'QW'),
  B('qwq', '#615ced', 'QW'),
  B('kimi', '#16b3a0', 'KI'),
  B('moonshot', '#16b3a0', 'MS'),
  B('glm', '#3b6dff', 'GL'),
  B('doubao', '#3b6dff', 'DB'),
  B('minimax', '#f23f5d', 'MM'),
  B('abab', '#f23f5d', 'AB'),
  B('baichuan', '#f79c43', 'BC'),
  B('llama', '#0668e1', 'LL'),
  B('mistral', '#fa520f', 'MI'),
  B('mixtral', '#fa520f', 'MX'),
  B('grok', '#111827', 'GK'),
  B('command', '#39594d', 'CM'),
  B('yi', '#0c8f44', 'YI'),
  B('hunyuan', '#0052d9', 'HY'),
  B('moonshot-v', '#16b3a0', 'MS'),
  B('ernie', '#2932e1', 'ER'),
  B('spark', '#4285f4', 'SP'),
  B('phi', '#0078d4', 'PH'),
  B('nova', '#ff9900', 'NV'),
  B('step', '#0046ff', 'ST'),
  B('xavier', '#0f766e', 'XV'),
]

export const MODEL_BRAND_MARKS: Record<string, ReturnType<typeof letterBadge>> = {}
for (const b of MODEL_BRAND_LIST) {
  MODEL_BRAND_MARKS[b.id] = letterBadge('brand-' + b.id, b.bg, b.text, { fontSize: b.fontSize })
}

/** 按模型名匹配品牌标（依次做子串匹配） */
export function modelBrandMarkFor(modelId: string): ReturnType<typeof letterBadge> | undefined {
  const m = (modelId || '').toLowerCase()
  for (const b of MODEL_BRAND_LIST) {
    if (m.includes(b.id)) return MODEL_BRAND_MARKS[b.id]
  }
  return undefined
}

// ---------- 常用几何提供方标（非字母，更易识别的几个大厂） ----------
/** OpenAI 风格六瓣结（原创简化几何） */
export const MarkOpenAI = createIcon(
  'MarkOpenAI',
  <>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 3.5v17M4.8 7.8l14.4 8.4M4.8 16.2l14.4-8.4" />
  </>
)

/** Claude 风格星芒（原创） */
export const MarkClaude = createIcon(
  'MarkClaude',
  <>
    {Array.from({ length: 10 }).map((_, i) => {
      const a = (i * Math.PI) / 5
      const x = 12 + Math.cos(a) * 9
      const y = 12 + Math.sin(a) * 9
      return <path key={i} d={`M12 12L${x.toFixed(2)} ${y.toFixed(2)}`} strokeWidth="2.4" />
    })}
  </>
)

/** Gemini 风格四角星（原创） */
export const MarkGemini = createIcon('MarkGemini', <path d="M12 2.5c.8 5.2 4.3 8.7 9.5 9.5-5.2.8-8.7 4.3-9.5 9.5-.8-5.2-4.3-8.7-9.5-9.5 5.2-.8 8.7-4.3 9.5-9.5z" />)

/** DeepSeek 风格鲸波（原创弧线） */
export const MarkDeepSeek = createIcon(
  'MarkDeepSeek',
  <>
    <path d="M3 14c3-6 8-8.5 12.5-6.5 3 1.3 4.7 4 5.5 6.5-2.5-1.5-5-2-7.5-1" />
    <path d="M6 17.5c4 1.8 9 1.5 13-1.5" />
    <circle cx="15.5" cy="9.5" r="0.9" fill="currentColor" />
  </>
)
