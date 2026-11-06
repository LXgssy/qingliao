import { Image } from '@mantine/core'
import type { ModelProvider } from '@shared/types'
import { useProviders } from '@/hooks/useProviders'
import CustomProviderIcon from '../CustomProviderIcon'
import ProviderIcon from './ProviderIcon'

// 轻聊：内置提供方一律使用自绘标；仅自定义提供方支持用户上传的 iconUrl
export default function ProviderImageIcon(props: {
  className?: string
  size?: number
  provider: ModelProvider | string
  providerName?: string
}) {
  const { className, size = 24, provider, providerName } = props

  const { providers } = useProviders()
  const providerInfo = providers.find((p) => p.id === provider)

  if (providerInfo?.isCustom) {
    return providerInfo.iconUrl ? (
      <Image w={size} h={size} src={providerInfo.iconUrl} alt={providerInfo.name} />
    ) : (
      <CustomProviderIcon providerId={providerInfo.id} providerName={providerInfo.name} size={size} />
    )
  }

  return <ProviderIcon provider={provider} size={size} className={className} />
}
