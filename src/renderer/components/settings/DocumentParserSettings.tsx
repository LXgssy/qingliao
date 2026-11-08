import type { DocumentParserType } from '@shared/types/settings'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { AdaptiveSelect } from '@/components/AdaptiveSelect'
import { CheckedFieldRow } from '@/components/settings/CheckedFieldRow'
import { SettingRow, SettingsSection } from '@/components/settings/SettingsLayout'
import platform from '@/platform'
import { getPlatformDefaultDocumentParser, useSettingsStore } from '@/stores/settingsStore'

const ALL_PARSER_OPTIONS: {
  value: DocumentParserType
  label: string
  desktopOnly?: boolean
}[] = [
  { value: 'local', label: '本地解析' },
  { value: 'chatbox-ai', label: '轻聊AI（本地优先）' },
  { value: 'mineru', label: 'MinerU', desktopOnly: true }, // 仅桌面端（需要 IPC）
]

const PARSER_DESCRIPTIONS: Record<DocumentParserType, string> = {
  none: '仅支持纯文本文件（.txt、.md、.json、代码文件等）。PDF 与 Office 文件请选择本地解析或轻聊AI。',
  local: '使用内置文档解析，支持常见文件类型。完全本地处理，免费使用。',
  'chatbox-ai': '优先本地解析；若本地不支持该格式，会提示改用其它解析器。轻聊不提供云端解析。',
  mineru: '第三方云端解析服务，支持 PDF 与大部分 Office 文件。需要 API Token。',
}

/** Parser choice and its credentials, as one settings section. */
export function DocumentParserSettings() {
  const { t } = useTranslation()

  const extension = useSettingsStore((state) => state.extension)
  const setSettings = useSettingsStore((state) => state.setSettings)

  const documentParser = extension?.documentParser
  const mineruToken = documentParser?.mineru?.apiToken || ''

  const parserOptions = useMemo(() => {
    const isDesktop = platform.type === 'desktop'
    return ALL_PARSER_OPTIONS.filter((opt) => {
      if (opt.desktopOnly && !isDesktop) return false
      // 轻聊：web 端也开放本地解析（内置 pdfjs/文档解析已随包提供）
      return true
    })
  }, [])

  const storedParserType = documentParser?.type || getPlatformDefaultDocumentParser().type
  const currentParserType = storedParserType === 'none' ? getPlatformDefaultDocumentParser().type : storedParserType

  return (
    <SettingsSection title={t('Parser')}>
      <SettingRow
        id="parser-type"
        label={t('Parser Type')}
        description={
          currentParserType === 'local' && platform.type === 'mobile'
            ? t(
                '先本地解析文本、DOCX、XLSX、PPTX 文件（Office 文件最大 10 MB）；若本地不支持将提示改用其它解析器。'
              )
            : t(PARSER_DESCRIPTIONS[currentParserType])
        }
        controlLayout="block"
        control={(fieldId) => (
          <AdaptiveSelect
            id={fieldId}
            comboboxProps={{ withinPortal: true, withArrow: true }}
            aria-label={t('Parser Type') ?? undefined}
            data={parserOptions.map((opt) => ({
              value: opt.value,
              label: t(opt.label),
            }))}
            value={currentParserType}
            onChange={(value) => {
              if (!value) return
              setSettings({
                extension: { ...extension, documentParser: { ...documentParser, type: value as DocumentParserType } },
              })
            }}
          />
        )}
      />
      {currentParserType === 'mineru' && (
        <CheckedFieldRow
          id="mineru-api-token"
          label={t('MinerU API Token')}
          secret
          value={mineruToken}
          onChange={(apiToken) =>
            setSettings({
              extension: {
                ...extension,
                documentParser: { ...documentParser, type: documentParser?.type || 'mineru', mineru: { apiToken } },
              },
            })
          }
          check={async (token) => {
            const result = await platform.getKnowledgeBaseController().testMineruConnection(token)
            if (!result.success) throw new Error('MinerU rejected the token')
          }}
          failureMessage={t('API key invalid!')}
          getKeyUrl="https://mineru.net/apiManage"
          getKeyLabel={t('Get API Token') ?? undefined}
        />
      )}
    </SettingsSection>
  )
}

export default DocumentParserSettings
