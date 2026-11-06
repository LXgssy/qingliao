import { Flex, Image } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { SettingRow, SettingsPage, SettingsSection } from '@/components/settings/SettingsLayout'
import useVersion from '@/hooks/useVersion'
import iconPNG from '@/static/icon.png'

export const Route = createFileRoute('/settings/about')({
  component: RouteComponent,
})

export function RouteComponent() {
  const { t } = useTranslation()
  const version = useVersion()
  const hasVersion = /\d/.test(version.version)

  return (
    <SettingsPage title={t('About')} description={t('Version information.')}>
      <SettingsSection>
        <SettingRow
          id="version"
          label={
            <Flex align="center" gap="sm">
              <Image src={iconPNG} w={32} h={32} radius="md" />
              <span>轻聊{hasVersion ? ` ${version.version}` : ''}</span>
            </Flex>
          }
          control={undefined}
        />
        <SettingRow
          id="about-qingliao"
          label={t('About Qingliao')}
          description={t(
            'Qingliao is a static web app. Revisit this site to use the latest version; no in-app updates needed.'
          )}
        />
      </SettingsSection>
    </SettingsPage>
  )
}
