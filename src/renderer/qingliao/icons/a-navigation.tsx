import { createIcon } from './factory'

// 轻聊自绘图标 · A 批：箭头 / 导航 / 状态 / 播放控制 / 加载
// 全部为原创基础几何绘制

export const IconArrowLeft = createIcon(
  'ArrowLeft',
  <>
    <path d="M19 12H5" />
    <path d="M11 6l-6 6 6 6" />
  </>
)

export const IconArrowRight = createIcon(
  'ArrowRight',
  <>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </>
)

export const IconArrowUp = createIcon(
  'ArrowUp',
  <>
    <path d="M12 19V5" />
    <path d="M6 11l6-6 6 6" />
  </>
)

export const IconArrowDown = createIcon(
  'ArrowDown',
  <>
    <path d="M12 5v14" />
    <path d="M6 13l6 6 6-6" />
  </>
)

export const IconArrowUpRight = createIcon(
  'ArrowUpRight',
  <>
    <path d="M7 17L17 7" />
    <path d="M9 7h8v8" />
  </>
)

export const IconArrowBackUp = createIcon(
  'ArrowBackUp',
  <>
    <path d="M9 14L4 9l5-5" />
    <path d="M4 9h10a6 6 0 0 1 6 6v0a6 6 0 0 1-6 6h-3" />
  </>
)

export const IconArrowBarToUp = createIcon(
  'ArrowBarToUp',
  <>
    <path d="M12 20V7" />
    <path d="M7 12l5-5 5 5" />
    <path d="M5 4h14" />
  </>
)

export const IconChevronLeft = createIcon('ChevronLeft', <path d="M15 6l-6 6 6 6" />)
export const IconChevronRight = createIcon('ChevronRight', <path d="M9 6l6 6-6 6" />)
export const IconChevronUp = createIcon('ChevronUp', <path d="M6 15l6-6 6 6" />)
export const IconChevronDown = createIcon('ChevronDown', <path d="M6 9l6 6 6-6" />)
export const IconChevronsUp = createIcon(
  'ChevronsUp',
  <>
    <path d="M6 14l6-6 6 6" />
    <path d="M6 19l6-6 6 6" />
  </>
)
export const IconChevronsDown = createIcon(
  'ChevronsDown',
  <>
    <path d="M6 10l6 6 6-6" />
    <path d="M6 5l6 6 6-6" />
  </>
)

export const IconSelector = createIcon(
  'Selector',
  <>
    <path d="M8 9l4-4 4 4" />
    <path d="M8 15l4 4 4-4" />
  </>
)

export const IconArrowsMaximize = createIcon(
  'ArrowsMaximize',
  <>
    <path d="M4 9V4h5" />
    <path d="M20 9V4h-5" />
    <path d="M4 15v5h5" />
    <path d="M20 15v5h-5" />
  </>
)

export const IconArrowsMinimize = createIcon(
  'ArrowsMinimize',
  <>
    <path d="M9 4v5H4" />
    <path d="M15 4v5h5" />
    <path d="M9 20v-5H4" />
    <path d="M15 20v-5h5" />
  </>
)

export const IconArrowsMoveVertical = createIcon(
  'ArrowsMoveVertical',
  <>
    <path d="M12 3v18" />
    <path d="M8 7l4-4 4 4" />
    <path d="M8 17l4 4 4-4" />
  </>
)

export const IconMaximize = createIcon(
  'Maximize',
  <>
    <path d="M4 8V4h4" />
    <path d="M16 4h4v4" />
    <path d="M20 16v4h-4" />
    <path d="M8 20H4v-4" />
  </>
)

export const IconMenu2 = createIcon(
  'Menu2',
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h10" />
  </>
)

export const IconGripVertical = createIcon(
  'GripVertical',
  <>
    <circle cx="9" cy="6" r="1" fill="currentColor" />
    <circle cx="9" cy="12" r="1" fill="currentColor" />
    <circle cx="9" cy="18" r="1" fill="currentColor" />
    <circle cx="15" cy="6" r="1" fill="currentColor" />
    <circle cx="15" cy="12" r="1" fill="currentColor" />
    <circle cx="15" cy="18" r="1" fill="currentColor" />
  </>
)

export const IconDots = createIcon(
  'Dots',
  <>
    <circle cx="5" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="19" cy="12" r="1" fill="currentColor" />
  </>
)

export const IconDotsVertical = createIcon(
  'DotsVertical',
  <>
    <circle cx="12" cy="5" r="1" fill="currentColor" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
  </>
)

export const IconX = createIcon(
  'X',
  <>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </>
)

export const IconPlus = createIcon(
  'Plus',
  <>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </>
)

export const IconMinus = createIcon('Minus', <path d="M5 12h14" />)

export const IconCheck = createIcon('Check', <path d="M5 12.5l4.5 4.5L19 7.5" />)

export const IconCircleCheck = createIcon(
  'CircleCheck',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.5 2.5 5-5.5" />
  </>
)

export const IconCircleCheckFilled = createIcon(
  'CircleCheckFilled',
  <>
    <circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none" />
    <path d="M8.5 12.5l2.5 2.5 5-5.5" fill="none" stroke="var(--ql-badge-fg, #ffffff)" strokeWidth="2" />
  </>,
  { filled: false }
)

export const IconCircleX = createIcon(
  'CircleX',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 9l6 6" />
    <path d="M15 9l-6 6" />
  </>
)

export const IconCircleXFilled = createIcon(
  'CircleXFilled',
  <>
    <circle cx="12" cy="12" r="9.5" fill="currentColor" stroke="none" />
    <path d="M9 9l6 6M15 9l-6 6" fill="none" stroke="var(--ql-badge-fg, #ffffff)" strokeWidth="2" />
  </>
)

export const IconCirclePlus = createIcon(
  'CirclePlus',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8" />
    <path d="M8 12h8" />
  </>
)

export const IconCircleMinus = createIcon(
  'CircleMinus',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12h8" />
  </>
)

export const IconCircleOff = createIcon(
  'CircleOff',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.8 5.8l12.4 12.4" />
  </>
)

export const IconAlertCircle = createIcon(
  'AlertCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V13" />
    <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
  </>
)

export const IconExclamationCircle = createIcon(
  'ExclamationCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V13" />
    <circle cx="12" cy="16.5" r="0.5" fill="currentColor" />
  </>
)

export const IconAlertTriangle = createIcon(
  'AlertTriangle',
  <>
    <path d="M12 3.5L22 20H2L12 3.5z" />
    <path d="M12 10v4.5" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </>
)

export const IconAlertHexagon = createIcon(
  'AlertHexagon',
  <>
    <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1l8-4.6z" />
    <path d="M12 8.5V13" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </>
)

export const IconInfoCircle = createIcon(
  'InfoCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="8" r="0.5" fill="currentColor" />
    <path d="M12 11.5V17" />
  </>
)

export const IconHelp = createIcon(
  'Help',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.7.3-.9.8-.9 1.7" />
    <circle cx="12" cy="16.8" r="0.5" fill="currentColor" />
  </>
)

export const IconHelpCircle = createIcon(
  'HelpCircle',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.7.3-.9.8-.9 1.7" />
    <circle cx="12" cy="16.8" r="0.5" fill="currentColor" />
  </>
)

export const IconPlayerPlay = createIcon('PlayerPlay', <path d="M7 4.5l13 7.5-13 7.5v-15z" />)
export const IconPlayerPlayFilled = createIcon(
  'PlayerPlayFilled',
  <path d="M7 4.5l13 7.5-13 7.5v-15z" />,
  { filled: true }
)
export const IconPlayerPause = createIcon(
  'PlayerPause',
  <>
    <path d="M8 4.5v15" />
    <path d="M16 4.5v15" />
  </>
)
export const IconPlayerStopFilled = createIcon('PlayerStopFilled', <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" />, {
  filled: true,
})
export const IconPlayerSkipForward = createIcon(
  'PlayerSkipForward',
  <>
    <path d="M5 5l10 7-10 7V5z" />
    <path d="M19 5v14" />
  </>
)

export const IconLoader = createIcon(
  'Loader',
  <>
    <path d="M12 3v3.5" />
    <path d="M16.2 5.2l-1.7 3" />
    <path d="M19.5 9.5l-3 1.7" />
    <path d="M21 15h-3.5" />
    <path d="M6.5 15H3" />
    <path d="M4.5 9.5l3 1.7" />
    <path d="M7.8 5.2l1.7 3" />
  </>
)

export const IconLoader2 = createIcon(
  'Loader2',
  <>
    <path d="M12 3a9 9 0 1 0 9 9" />
  </>
)

export const IconRefresh = createIcon(
  'Refresh',
  <>
    <path d="M20 11a8 8 0 0 0-14.9-3" />
    <path d="M4 5v4h4" />
    <path d="M4 13a8 8 0 0 0 14.9 3" />
    <path d="M20 19v-4h-4" />
  </>
)

export const IconReload = createIcon(
  'Reload',
  <>
    <path d="M20 11a8 8 0 0 0-14.9-3" />
    <path d="M4 5v4h4" />
    <path d="M4 13a8 8 0 0 0 14.9 3" />
    <path d="M20 19v-4h-4" />
  </>
)

export const IconRotateCw = createIcon(
  'RotateCw',
  <>
    <path d="M20 11a8 8 0 1 0-2.3 6.3" />
    <path d="M20 5v6h-6" />
  </>
)

export const IconRestore = createIcon(
  'Restore',
  <>
    <path d="M3.5 8a9 9 0 1 1-.5 4" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3.5 2" />
  </>
)

export const IconHistory = createIcon(
  'History',
  <>
    <path d="M3.5 12a9 9 0 1 0 3-6.7" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l3.5 2" />
  </>
)

export const IconClock = createIcon(
  'Clock',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </>
)

export const IconClockHour3 = createIcon(
  'ClockHour3',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5h4" />
  </>
)

export const IconClockHour4 = createIcon(
  'ClockHour4',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </>
)

export const Icon24Hours = createIcon(
  'Icon24Hours',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 9.5a2 2 0 1 1 3.4 1.4L8 14h4.5" />
    <path d="M15.5 8.5v7" />
  </>
)

export const IconBolt = createIcon('Bolt', <path d="M13 3L5 13.5h5L11 21l8-10.5h-5L13 3z" />)

export const IconStar = createIcon(
  'Star',
  <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />
)

export const IconStarFilled = createIcon(
  'StarFilled',
  <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />,
  { filled: true }
)

export const IconThumbUpFilled = createIcon(
  'ThumbUpFilled',
  <path d="M7 10.5v9H4.5a1.5 1.5 0 0 1-1.5-1.5v-6a1.5 1.5 0 0 1 1.5-1.5H7zm2 9h7.6a2.5 2.5 0 0 0 2.4-1.8l1.8-6A2.5 2.5 0 0 0 18.4 8.5H14l.8-3.6A1.8 1.8 0 0 0 11.5 3.3L9 8.2v11.3z" />,
  { filled: true }
)

export const IconQuoteFilled = createIcon(
  'QuoteFilled',
  <path d="M5 6h5a2 2 0 0 1 2 2v5a4 4 0 0 1-4 4H6.5a.5.5 0 0 1 0-1H8a3 3 0 0 0 2-.8V14a1.5 1.5 0 0 1-1.5-1.5V12A2 2 0 0 1 7 8H5a2 2 0 0 1 0-2zm10 0h5a2 2 0 0 1 2 2v5a4 4 0 0 1-4 4h-1.5a.5.5 0 0 1 0-1H18a3 3 0 0 0 2-.8V14a1.5 1.5 0 0 1-1.5-1.5V12A2 2 0 0 1 17 8h-2a2 2 0 0 1 0-2z" />,
  { filled: true }
)

export const IconSortDescending = createIcon(
  'SortDescending',
  <>
    <path d="M4 6h9" />
    <path d="M4 12h6" />
    <path d="M4 18h4" />
    <path d="M17 5v13" />
    <path d="M14 15l3 3 3-3" />
  </>
)

export const IconSwitch = createIcon(
  'Switch',
  <>
    <rect x="3" y="8" width="18" height="8" rx="4" />
    <circle cx="15.5" cy="12" r="2.2" fill="currentColor" stroke="none" />
  </>
)

export const IconSwitch3 = createIcon(
  'Switch3',
  <>
    <path d="M4 7h12" />
    <path d="M13 4l3 3-3 3" />
    <path d="M20 17H8" />
    <path d="M11 14l-3 3 3 3" />
  </>
)

export const IconTextWrap = createIcon(
  'TextWrap',
  <>
    <path d="M4 6h16" />
    <path d="M4 12h13a3 3 0 1 1 0 6h-3" />
    <path d="M12 15.5L9.5 18l2.5 2.5" />
    <path d="M4 18h3" />
  </>
)

export const IconTextWrapDisabled = createIcon(
  'TextWrapDisabled',
  <>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
    <path d="M4 4l16 16" />
  </>
)

export const IconAlignRight = createIcon(
  'AlignRight',
  <>
    <path d="M6 6h12" />
    <path d="M10 12h8" />
    <path d="M4 18h14" />
  </>
)

export const IconFold = createIcon(
  'Fold',
  <>
    <path d="M12 4v4" />
    <path d="M9 6.5L12 9l3-2.5" transform="translate(0,-1)" />
    <path d="M12 20v-4" />
    <path d="M9 17.5l3-2.5 3 2.5" transform="translate(0,1)" />
    <path d="M4 12h16" />
  </>
)

export const IconBrightnessAuto = createIcon(
  'BrightnessAuto',
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M9.5 15.5L12 8.5l2.5 7" />
    <path d="M10.3 13.2h3.4" />
  </>
)
