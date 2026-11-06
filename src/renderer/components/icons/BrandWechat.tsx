import * as React from 'react'

// 轻聊原创微信风格标：绿盘白双气泡（通用聊天图形）
function BrandWechat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#07c160" />
      <path d="M9.2 5.8c-2.9 0-5.2 1.9-5.2 4.2 0 1.3.8 2.5 2 3.3l-.5 1.9 2.1-1.1c.5.1 1 .2 1.6.2h.3a3.8 3.8 0 0 1-.2-1.2c0-2.3 2.3-4.1 5.1-4.1h.3c-.5-1.9-2.7-3.2-5.5-3.2z" fill="#fff" />
      <path d="M15.6 10.2c-2.3 0-4.2 1.5-4.2 3.4s1.9 3.4 4.2 3.4c.4 0 .9-.1 1.3-.2l1.8.9-.4-1.6c1-.7 1.6-1.7 1.6-2.5-.1-1.9-1.9-3.4-4.3-3.4z" fill="#fff" opacity="0.9" />
    </svg>
  )
}

export default React.memo(BrandWechat)
