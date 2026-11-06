import * as React from 'react'

// 轻聊原创 Loading 动效：三点波浪
function Loading(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg height="1em" viewBox="0 0 52 24" {...props}>
      {[8, 26, 44].map((cx, i) => (
        <circle key={cx} cx={cx} cy={12} r={3} fill="currentColor">
          <animate
            attributeName="cy"
            values="12;6;12"
            keyTimes="0;0.3;1"
            dur="1.2s"
            begin={`${i * 0.18}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.35;1;0.35"
            keyTimes="0;0.3;1"
            dur="1.2s"
            begin={`${i * 0.18}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </svg>
  )
}

export default React.memo(Loading)
