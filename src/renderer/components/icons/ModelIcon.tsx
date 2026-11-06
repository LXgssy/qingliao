import { type ModelProvider, ModelProviderEnum } from '@shared/types'
import { modelBrandMarkFor, fallbackProviderMark } from '@/qingliao/icons'
import { renderModelIcon } from '@/utils/modelLogo'
import ProviderIcon from './ProviderIcon'

interface ModelIconProps {
  modelId: string
  providerId?: ModelProvider | string
  size?: number
  className?: string
}

/**
 * 显示模型专属图标，回退到提供方图标。
 * 全部使用轻聊自绘标：
 * 1. 模型品牌标（按 modelId 匹配）
 * 2. 提供方标（若提供 providerId）
 * 3. 首字母徽章（最终兜底）
 */
export function ModelIcon({ modelId, providerId, size = 16, className }: ModelIconProps) {
  const icon = renderModelIcon(modelId, size)

  if (icon) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
    )
  }

  if (providerId === ModelProviderEnum.ChatboxAI && modelId.startsWith('chatboxai-')) {
    return <ProviderIcon provider={providerId} size={size} className={className} />
  }

  if (providerId) {
    return <ProviderIcon provider={providerId} size={size} className={className} />
  }

  // 最终兜底：模型名首字母徽章
  const Fallback = modelBrandMarkFor(modelId) ?? fallbackProviderMark(modelId)
  return <Fallback className={className} size={size} />
}
