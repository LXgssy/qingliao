import * as React from 'react'

// 轻聊原创机器人头
function Robot(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="4.5" y="8" width="15" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8V4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="3.5" r="1.1" fill="currentColor" />
      <circle cx="9" cy="12.6" r="1.2" fill="currentColor" />
      <circle cx="15" cy="12.6" r="1.2" fill="currentColor" />
      <path d="M9.5 15.8c1.5 1.1 3.5 1.1 5 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M2.5 12v3.5M21.5 12v3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(Robot)
