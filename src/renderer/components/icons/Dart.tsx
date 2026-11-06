import * as React from 'react'

// 轻聊原创飞镖标（蓝色几何）
function Dart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 3.5L18.5 16V8.5L12.5 2.5a2 2 0 0 0-2.8 0L6 3.5z" fill="#0175C2" />
      <path d="M6 20.5L18.5 8V15.5l-6 6a2 2 0 0 1-2.8 0L6 20.5z" fill="#13B9FD" opacity="0.85" />
      <path d="M6 3.5v17" stroke="#0175C2" strokeWidth="1.6" />
    </svg>
  )
}

export default React.memo(Dart)
