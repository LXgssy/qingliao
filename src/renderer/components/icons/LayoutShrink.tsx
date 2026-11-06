import * as React from 'react'

// 轻聊原创侧栏收起
function LayoutShrink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 4v16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M17.5 12h-4M13 9.5l-1.8 2.5 1.8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(2.2 0)" />
    </svg>
  )
}

export default React.memo(LayoutShrink)
