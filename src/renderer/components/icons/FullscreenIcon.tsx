import { MouseEventHandler } from 'react'

// 轻聊原创全屏图标
export default function FullscreenIcon(props: { className?: string; onClick?: MouseEventHandler<SVGSVGElement> }) {
  const { className, onClick } = props
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.7}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4l5 5M20 4l-5 5M20 20l-5-5M4 20l5-5" opacity="0.55" />
    </svg>
  )
}
