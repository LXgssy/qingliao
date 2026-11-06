import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

// 轻聊：无账号系统，旧「Chatbox AI」页面已下线，重定向到模型提供方页
export const Route = createFileRoute('/settings/chatbox-ai')({ component: RouteComponent })

export function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate({ to: '/settings/provider', replace: true })
  }, [navigate])
  return null
}
