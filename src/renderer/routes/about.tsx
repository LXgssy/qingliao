import { Stack, Text, Title, Anchor, Divider, Box, Group } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import Page from '@/components/layout/Page'
import useVersion from '@/hooks/useVersion'
import { MarkQingliao } from '@/qingliao/icons'

const REPO_URL = 'https://github.com/LXgssy/qingliao'
const UPSTREAM_URL = 'https://github.com/chatboxai/chatbox'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const version = useVersion()

  return (
    <Page>
      <Stack align="center" gap="lg" pt={48} px={16} maw={560} mx="auto">
        <Box mt={24}>
          <MarkQingliao size={96} />
        </Box>
        <Title order={3} ta="center" mt={4}>
          轻聊
        </Title>
        <Text size="sm" c="dimmed" ta="center">
          {/^\d/.test(version.version) ? `v${version.version}` : version.version}
        </Text>
        <Text size="sm" c="dimmed" ta="center" lh={1.8}>
          {t('A pure static Chinese AI chat client that works out of the box, with all data stored only in your browser.')}
        </Text>

        <Divider w="100%" />

        <Stack gap="md" w="100%">
          <AboutRow
            label={t('GitHub Repository')}
            value="LXgssy/qingliao"
            href={REPO_URL}
          />
          <AboutRow
            label={t('Upstream Project')}
            value="Chatbox (GPL-3.0)"
            href={UPSTREAM_URL}
          />
          <AboutRow label={t('Open Source License')} value="GPL-3.0" href={UPSTREAM_URL} />
          <AboutRow label={t('Data Storage')} value={t('Browser local storage, never uploaded')} />
        </Stack>

        <Divider w="100%" />

        <Group gap={4} pb={32}>
          <Text size="xs" c="dimmed" ta="center">
            {t('Based on the open-source project Chatbox, redesigned and rebuilt for the web.')}
          </Text>
        </Group>
      </Stack>
    </Page>
  )
}

function AboutRow({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  return (
    <Group justify="space-between" w="100%" gap="md">
      <Text size="sm" c="dimmed" style={{ flexShrink: 0 }}>
        {label}
      </Text>
      {href ? (
        <Anchor href={href} target="_blank" rel="noreferrer" size="sm" truncate maw="60%">
          {value}
        </Anchor>
      ) : (
        <Text size="sm" truncate maw="60%">
          {value}
        </Text>
      )}
    </Group>
  )
}
