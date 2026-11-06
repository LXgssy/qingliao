// 轻聊自绘图标体系 · 总出口
// 用法：import { IconX, MarkQingliao } from '@/qingliao/icons'

export * from './factory'
export * from './a-navigation'
export * from './b-files-system'
export * from './c-chat-world'
export * from './d-brands'
export * from './providers'

import type { IconProps } from './factory'

/** 与 @tabler/icons-react 的 Icon 类型兼容，供既有组件类型标注使用 */
export type Icon = (props: IconProps) => any
export type TablerIcon = Icon
export type { IconProps }
