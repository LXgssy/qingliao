import * as React from 'react'

// 轻聊原创小红书标：红盘白 R
function BrandRedNote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#ff2442" />
      <path d="M8 16.5v-9h4.2a2.8 2.8 0 0 1 0 5.6H9.6m2.8 0l3 3.4" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

export default React.memo(BrandRedNote)
