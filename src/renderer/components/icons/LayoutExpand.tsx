import * as React from 'react'

// 轻聊原创侧栏展开
function LayoutExpand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.5 4v16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M13.5 12h4M16 9.5l1.8 2.5-1.8 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default React.memo(LayoutExpand)
