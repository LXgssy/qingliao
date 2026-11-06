import * as React from 'react'

// 轻聊原创 Git 图形：分支节点图（非任何现有商标）
function BrandGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="6" cy="6" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="6" cy="18" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="18" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 8.2v7.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 6.8c4 .4 7.4 1.2 8.6 2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16.6 12c-1.6 2-5.4 3.4-8.6 3.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

export default React.memo(BrandGithub)
