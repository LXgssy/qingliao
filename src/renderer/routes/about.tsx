import { Stack, Text, Title, Anchor, Divider, Box, Group } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'
import Page from '@/components/layout/Page'
import useVersion from '@/hooks/useVersion'
import { MarkQingliao } from '@/qingliao/icons'

const REPO_URL = 'https://github.com/LXgssy/qingliao'
const UPSTREAM_URL = 'https://github.com/chatboxai/chatbox'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
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
          {/^\d/.test(version.version || '') ? `v${version.version}` : ''}
        </Text>
        <Text size="sm" c="dimmed" ta="center" lh={1.8}>
          开箱即用的纯静态中文 AI 聊天客户端，所有数据仅保存在你的浏览器中。
        </Text>

        <Divider w="100%" />

        <Stack gap="md" w="100%">
          <AboutRow
            label={'GitHub 仓库'}
            value="LXgssy/qingliao"
            href={REPO_URL}
          />
          <AboutRow
            label={'上游项目'}
            value="Chatbox (GPL-3.0)"
            href={UPSTREAM_URL}
          />
          <AboutRow label={'开源协议'} value="GPL-3.0" href={UPSTREAM_URL} />
          <AboutRow label={'数据存储'} value={'浏览器本地存储，绝不上传'} />
        </Stack>

        <Divider w="100%" />

        <Group gap={4} pb={32}>
          <Text size="xs" c="dimmed" ta="center">
            基于开源项目 Chatbox (GPL-3.0) 重构的纯网页版。
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
