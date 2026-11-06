import { useComputedColorScheme } from '@mantine/core'
import * as React from 'react'

// 轻聊原创首页空状态插画：对话气泡 + 光点
function HomepageIcon(props: React.SVGProps<SVGSVGElement>) {
  const colorScheme = useComputedColorScheme()
  const isDark = colorScheme === 'dark'
  const fillColor = isDark ? '#3a4a5a' : '#EDF0F2'
  const strokeColor = isDark ? '#5d7185' : '#899AA9'
  const accent = isDark ? '#4f8cff' : '#4f8cff'

  return (
    <svg width={96} height={94} viewBox="0 0 96 94" fill="none" {...props}>
      {/* 大气泡 */}
      <path
        d="M20 14h56a10 10 0 0 1 10 10v26a10 10 0 0 1-10 10H40l-14 12V60h-6a10 10 0 0 1-10-10V24a10 10 0 0 1 10-10z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* 气泡内文字线 */}
      <rect x="24" y="26" width="42" height="4" rx="2" fill={strokeColor} opacity="0.55" />
      <rect x="24" y="36" width="30" height="4" rx="2" fill={strokeColor} opacity="0.4" />
      {/* 小气泡 */}
      <path
        d="M62 52h14a7 7 0 0 1 7 7v8a7 7 0 0 1-7 7h-2v8l-8-8h-4a7 7 0 0 1-7-7v-1"
        fill={isDark ? '#2c3a49' : '#ffffff'}
        stroke={strokeColor}
        strokeWidth="2"
      />
      {/* 光点 */}
      <circle cx="14" cy="70" r="3" fill={accent} opacity="0.6" />
      <circle cx="84" cy="24" r="2.4" fill={accent} opacity="0.45" />
      <circle cx="78" cy="80" r="2" fill={accent} opacity="0.35" />
      {/* 轻聊标点 */}
      <circle cx="47" cy="47" r="4.5" fill={accent} opacity="0.9" />
    </svg>
  )
}

export default React.memo(HomepageIcon)
