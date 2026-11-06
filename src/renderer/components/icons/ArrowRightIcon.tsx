import { MouseEventHandler } from 'react'

// 轻聊原创右箭头
export default function ArrowRightIcon(props: { className?: string; onClick?: MouseEventHandler<SVGSVGElement> }) {
  const { className, onClick } = props
  return (
    <svg
      className={className}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.8}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.5l6.5 6.5L9 18.5" />
    </svg>
  )
}
