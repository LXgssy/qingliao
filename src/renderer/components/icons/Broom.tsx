import * as React from 'react'

// 轻聊原创扫帚（清理）
function Broom(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14.5 3.5l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.5 6.5L9 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 15l-1.5 4.5L3 15l4.5-1.5L9 15z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11 13l-3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(Broom)
