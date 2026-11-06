import React from 'react'

// 轻聊自绘图标体系 —— 工厂与公共类型
// 全部图标均为原创几何绘制，不使用任何第三方图标库

export type IconProps = {
  size?: string | number
  stroke?: number
  color?: string
  className?: string
  style?: React.CSSProperties
  viewBox?: string
} & Omit<React.SVGProps<SVGSVGElement>, 'stroke' | 'color' | 'viewBox'>

export type IconType = React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>

export const ICON_VIEWBOX = '0 0 24 24'

function normalizeSize(size: string | number | undefined): string | number {
  return size ?? 24
}

/**
 * 描边图标工厂：24x24 视窗，继承 currentColor
 */
export function createIcon(name: string, node: React.ReactNode, opts: { filled?: boolean } = {}): IconType {
  const { filled = false } = opts
  const IconComponent = React.forwardRef<SVGSVGElement, IconProps>(function QlIcon(props, ref) {
    const { size = 24, stroke = 2, color, className, style, ...rest } = props
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={ICON_VIEWBOX}
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? 'none' : 'currentColor'}
        strokeWidth={filled ? 0 : stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={{ color, ...style }}
        {...rest}
      >
        {node}
      </svg>
    )
  })
  IconComponent.displayName = `QlIcon(${name})`
  return IconComponent
}

/**
 * 彩色徽章工厂：圆角方盘 + 自定义内容（字母或几何图形）
 * opts.fg 默认白色；opts.noPlate 时不再绘制底盘（内容自带配色）
 */
export function createBadge(
  name: string,
  bg: string,
  inner: React.ReactNode,
  opts: { fg?: string; noPlate?: boolean } = {}
): IconType {
  const { noPlate = false } = opts
  const Badge = React.forwardRef<SVGSVGElement, IconProps>(function QlBadge(props, ref) {
    const { size = 24, className, style, color, ...rest } = props
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={ICON_VIEWBOX}
        className={className}
        style={{ color, ...style }}
        {...rest}
      >
        {!noPlate && <rect x="1" y="1" width="22" height="22" rx="6" fill={bg} />}
        {inner}
      </svg>
    )
  })
  Badge.displayName = `QlBadge(${name})`
  void noPlate
  return Badge
}

/**
 * 字母徽章：圆角方盘 + 居中粗体字母
 */
export function letterBadge(
  name: string,
  bg: string,
  text: string,
  opts: { fg?: string; fontSize?: number } = {}
): IconType {
  const { fg = '#ffffff', fontSize = 11 } = opts
  const node = (
    <text
      x="12"
      y="12.4"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={fontSize}
      fontWeight={700}
      fontFamily="'Segoe UI', system-ui, -apple-system, sans-serif"
      fill={fg}
      letterSpacing={text.length > 2 ? '-0.5' : undefined}
    >
      {text}
    </text>
  )
  return createBadge(name, bg, node, { fg })
}
