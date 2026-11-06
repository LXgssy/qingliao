import * as React from 'react'

// 轻聊原创咖啡杯（Java）
function Java(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M5 10h11v5.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 15.5V10z" stroke="#dc7633" strokeWidth="1.7" />
      <path d="M16 11.5h1.6a2.4 2.4 0 0 1 0 4.8H16" stroke="#dc7633" strokeWidth="1.7" />
      <path d="M8.5 7c0-1.2 1.4-1.4 1.4-2.6M12 7c0-1.2 1.4-1.4 1.4-2.6" stroke="#e67e22" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default React.memo(Java)
