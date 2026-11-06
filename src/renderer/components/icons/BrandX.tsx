import * as React from 'react'

// 轻聊原创 X 标：黑盘白叉
function BrandX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#111827" />
      <path d="M7 7l10 10M17 7L7 17" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(BrandX)
