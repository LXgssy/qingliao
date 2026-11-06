import { createIcon } from './factory'

// 轻聊自绘图标 · C 批：聊天 / 世界 / 机器人 / 用户 / 布局
// 全部为原创基础几何绘制

export const IconMessages = createIcon(
  'Messages',
  <>
    <path d="M8.5 4.5h11a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H18v3.5L13.5 15H8.5A1.5 1.5 0 0 1 7 13.5v-7.5a1.5 1.5 0 0 1 1.5-1.5z" />
    <path d="M7 8H4.5A1.5 1.5 0 0 0 3 9.5V17a1.5 1.5 0 0 0 1.5 1.5H6v3l4-3h4.5" />
  </>
)

export const IconMessageCircle = createIcon(
  'MessageCircle',
  <path d="M12 3.5a8.5 8.5 0 0 1 0 17c-1.4 0-2.7-.3-3.9-.9L3.5 20.5l.9-4.4A8.5 8.5 0 0 1 12 3.5z" />
)

export const IconMessageCircle2Filled = createIcon(
  'MessageCircle2Filled',
  <path d="M12 3.5a8.5 8.5 0 0 1 0 17c-1.4 0-2.7-.3-3.9-.9L3.5 20.5l.9-4.4A8.5 8.5 0 0 1 12 3.5z" />,
  { filled: true }
)

export const IconMessagePlus = createIcon(
  'MessagePlus',
  <>
    <path d="M20 11.5v3a1.5 1.5 0 0 1-1.5 1.5H17v3.5L12.5 16H5.5A1.5 1.5 0 0 1 4 14.5v-7A1.5 1.5 0 0 1 5.5 6H13" />
    <path d="M17 3v6" />
    <path d="M14 6h6" />
  </>
)

export const IconMessageReport = createIcon(
  'MessageReport',
  <>
    <path d="M20 11.5v3a1.5 1.5 0 0 1-1.5 1.5H17v3.5L12.5 16H5.5A1.5 1.5 0 0 1 4 14.5v-7A1.5 1.5 0 0 1 5.5 6H13" />
    <path d="M17 3.5v4.5" />
    <circle cx="17" cy="10.5" r="0.6" fill="currentColor" />
  </>
)

export const IconMessageChatbot = createIcon(
  'MessageChatbot',
  <>
    <path d="M5.5 5h13A1.5 1.5 0 0 1 20 6.5v8a1.5 1.5 0 0 1-1.5 1.5H17v3.5L12.5 16H5.5A1.5 1.5 0 0 1 4 14.5v-8A1.5 1.5 0 0 1 5.5 5z" />
    <circle cx="9.2" cy="10.5" r="1" fill="currentColor" />
    <circle cx="14.8" cy="10.5" r="1" fill="currentColor" />
    <path d="M9.5 13.2c1.5 1 3.5 1 5 0" />
  </>
)

export const IconRobot = createIcon(
  'Robot',
  <>
    <rect x="4.5" y="8" width="15" height="11" rx="2.5" />
    <path d="M12 8V4.5" />
    <circle cx="12" cy="3.5" r="1" />
    <circle cx="9" cy="12.8" r="1.1" fill="currentColor" />
    <circle cx="15" cy="12.8" r="1.1" fill="currentColor" />
    <path d="M9.5 16h5" />
    <path d="M2.5 11.5v4M21.5 11.5v4" />
  </>
)

export const IconRobotFace = createIcon(
  'RobotFace',
  <>
    <rect x="4" y="6.5" width="16" height="13" rx="3.5" />
    <path d="M12 6.5V3.5" />
    <circle cx="12" cy="2.6" r="0.9" />
    <circle cx="9" cy="11.5" r="1.2" fill="currentColor" />
    <circle cx="15" cy="11.5" r="1.2" fill="currentColor" />
    <path d="M9 15.5c1.8 1.4 4.2 1.4 6 0" />
  </>
)

export const IconBrain = createIcon(
  'Brain',
  <>
    <path d="M9.5 3.5A3 3 0 0 0 6.6 7 3 3 0 0 0 4 10c0 .9.4 1.7 1 2.3-.6.6-1 1.4-1 2.2a3 3 0 0 0 2.6 3A3 3 0 0 0 9.5 20.5c1.1 0 2-.5 2.5-1.3V4.8c-.5-.8-1.4-1.3-2.5-1.3z" />
    <path d="M14.5 3.5A3 3 0 0 1 17.4 7 3 3 0 0 1 20 10c0 .9-.4 1.7-1 2.3.6.6 1 1.4 1 2.2a3 3 0 0 1-2.6 3 3 3 0 0 1-2.9 3c-1.1 0-2-.5-2.5-1.3V4.8c.5-.8 1.4-1.3 2.5-1.3z" />
  </>
)

export const IconWorld = createIcon(
  'World',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5h17M3.5 14.5h17" />
    <path d="M12 3c-2.5 2.3-3.8 5.4-3.8 9s1.3 6.7 3.8 9c2.5-2.3 3.8-5.4 3.8-9S14.5 5.3 12 3z" />
  </>
)

export const IconWorldOff = createIcon(
  'WorldOff',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5h17M3.5 14.5h17" />
    <path d="M12 3c-2.5 2.3-3.8 5.4-3.8 9s1.3 6.7 3.8 9c2.5-2.3 3.8-5.4 3.8-9S14.5 5.3 12 3z" />
    <path d="M4.5 4.5l15 15" />
  </>
)

export const IconWorldUpload = createIcon(
  'WorldUpload',
  <>
    <circle cx="10.5" cy="12" r="8" />
    <path d="M2.5 9.5h16M2.5 14.5h9" />
    <path d="M10.5 4c-2.2 2.1-3.4 5-3.4 8s1.2 5.9 3.4 8c2.2-2.1 3.4-5 3.4-8" />
    <path d="M18.5 21v-6.5" />
    <path d="M16 16.5l2.5-2.5 2.5 2.5" />
  </>
)

export const IconWorldWww = createIcon(
  'WorldWww',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5h17M3.5 14.5h17" />
    <path d="M12 3c-2.5 2.3-3.8 5.4-3.8 9s1.3 6.7 3.8 9c2.5-2.3 3.8-5.4 3.8-9S14.5 5.3 12 3z" />
    <path d="M9.5 12h5" strokeWidth="1.4" />
  </>
)

export const IconLanguage = createIcon(
  'Language',
  <>
    <path d="M3 5.5h9" />
    <path d="M7.5 3.5v2" />
    <path d="M10 5.5c-.8 3.5-3 6.5-6.5 8.5" />
    <path d="M4.5 8.5c1.5 2.5 3.5 4.2 6 5" />
    <path d="M12.5 20.5l4-9.5 4 9.5" />
    <path d="M14 17.5h5" />
  </>
)

export const IconUser = createIcon(
  'User',
  <>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" />
  </>
)

export const IconUserCheck = createIcon(
  'UserCheck',
  <>
    <circle cx="10" cy="8" r="3.6" />
    <path d="M3.5 20.5c.9-3.7 3.5-5.6 6.5-5.6 1.4 0 2.7.4 3.8 1.2" />
    <path d="M14.5 17.5l2.2 2.2 4-4.5" />
  </>
)

export const IconLogin = createIcon(
  'Login',
  <>
    <path d="M13 4.5h4A1.5 1.5 0 0 1 18.5 6v12a1.5 1.5 0 0 1-1.5 1.5h-4" />
    <path d="M10 8.5L13.5 12 10 15.5" />
    <path d="M13.5 12H4" />
  </>
)

export const IconLogout = createIcon(
  'Logout',
  <>
    <path d="M11 4.5H7A1.5 1.5 0 0 0 5.5 6v12A1.5 1.5 0 0 0 7 19.5h4" />
    <path d="M15 8.5L18.5 12 15 15.5" />
    <path d="M18.5 12H9" />
  </>
)

export const IconMoon = createIcon('Moon', <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />)

export const IconSun = createIcon(
  'Sun',
  <>
    <circle cx="12" cy="12" r="4.2" />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4
      const x1 = 12 + Math.cos(a) * 6.3
      const y1 = 12 + Math.sin(a) * 6.3
      const x2 = 12 + Math.cos(a) * 8.3
      const y2 = 12 + Math.sin(a) * 8.3
      return <path key={i} d={`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`} />
    })}
  </>
)

export const IconBulb = createIcon(
  'Bulb',
  <>
    <path d="M9 17.5c0-2-1.2-3-2-4.2A6 6 0 1 1 18 10c0 1.6-.8 2.4-1.6 3.3-.8 1-1.4 2.2-1.4 4.2" />
    <path d="M9 17.5h6" />
    <path d="M10 20.5h4" />
  </>
)

export const IconSparkles = createIcon(
  'Sparkles',
  <>
    <path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4z" />
    <path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
    <path d="M5 3.5l.6 1.4L7 5.5l-1.4.6L5 7.5l-.6-1.4L3 5.5l1.4-.6L5 3.5z" />
  </>
)

export const IconWand = createIcon(
  'Wand',
  <>
    <path d="M4 20L15 9" />
    <path d="M15 9l-1.5-1.5" strokeWidth="2.4" />
    <path d="M17.5 3.5v3M16 5h3" />
    <path d="M20.5 10.5v2.4M19.3 11.7h2.4" strokeWidth="1.4" />
    <path d="M13 3.5l.6 1.4 1.4.6-1.4.6L13 7.5l-.6-1.4-1.4-.6 1.4-.6L13 3.5z" strokeWidth="1.2" />
  </>
)

export const IconPinned = createIcon(
  'Pinned',
  <>
    <path d="M9 4.5h6l-.7 5 2.7 3H7l2.7-3-.7-5z" />
    <path d="M12 12.5V20" />
  </>
)

export const IconPinnedFilled = createIcon(
  'PinnedFilled',
  <>
    <path d="M9 4.5h6l-.7 5 2.7 3H7l2.7-3-.7-5z" fill="currentColor" stroke="none" />
    <path d="M12 12.5V20" />
  </>
)

export const IconShare = createIcon(
  'Share',
  <>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="17.5" cy="5.5" r="2.5" />
    <circle cx="17.5" cy="18.5" r="2.5" />
    <path d="M8.3 10.8l7-4M8.3 13.2l7 4" />
  </>
)

export const IconReplace = createIcon(
  'Replace',
  <>
    <path d="M4 7h12" />
    <path d="M13 4l3 3-3 3" />
    <path d="M20 17H8" />
    <path d="M11 14l-3 3 3 3" />
  </>
)

export const IconArchive = createIcon(
  'Archive',
  <>
    <rect x="3.5" y="4" width="17" height="5" rx="1.2" />
    <path d="M5.5 9v9.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V9" />
    <path d="M10 13h4" />
  </>
)

export const IconArchiveOff = createIcon(
  'ArchiveOff',
  <>
    <rect x="3.5" y="4" width="17" height="5" rx="1.2" />
    <path d="M5.5 9v9.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V9" />
    <path d="M4 4l16 16" />
  </>
)

export const IconAdjustmentsHorizontal = createIcon(
  'AdjustmentsHorizontal',
  <>
    <path d="M4 7h9M17.5 7H20" />
    <circle cx="15.2" cy="7" r="2.2" />
    <path d="M4 16.5h2.5M11 16.5H20" />
    <circle cx="8.8" cy="16.5" r="2.2" />
  </>
)

export const IconLayoutSidebarLeftCollapse = createIcon(
  'LayoutSidebarLeftCollapse',
  <>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M9.5 4v16" />
    <path d="M14.5 10l-2 2 2 2" />
  </>
)

export const IconLayoutSidebarLeftExpand = createIcon(
  'LayoutSidebarLeftExpand',
  <>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M9.5 4v16" />
    <path d="M12.5 10l2 2-2 2" />
  </>
)

export const IconLayoutSidebarRight = createIcon(
  'LayoutSidebarRight',
  <>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M14.5 4v16" />
  </>
)

export const IconCircleDottedLetterM = createIcon(
  'CircleDottedLetterM',
  <>
    <circle cx="12" cy="12" r="9" strokeDasharray="2.2 2.9" strokeWidth="1.6" />
    <text x="12" y="12.6" textAnchor="middle" dominantBaseline="central" fontSize="9.5" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      M
    </text>
  </>
)

export const IconSquareRoundedPlusFilled = createIcon(
  'SquareRoundedPlusFilled',
  <>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="currentColor" stroke="none" />
    <path d="M12 7.5v9M7.5 12h9" stroke="var(--ql-badge-fg, #ffffff)" strokeWidth="2" fill="none" />
  </>
)

export const IconChartBarStacked = createIcon(
  'ChartBarStacked',
  <>
    <path d="M4 20V4" strokeWidth="1.6" />
    <path d="M4 20h16" strokeWidth="1.6" />
    <rect x="7" y="10" width="3" height="7" />
    <rect x="11.5" y="6.5" width="3" height="10.5" />
    <rect x="16" y="12.5" width="3" height="4.5" />
  </>
)

export const IconLink2 = createIcon(
  'Link2',
  <>
    <path d="M8.5 12h7" />
    <path d="M9 8.5H7a3.5 3.5 0 0 0 0 7h2" />
    <path d="M15 8.5h2a3.5 3.5 0 0 1 0 7h-2" />
  </>
)

export const IconScanSearch = createIcon(
  'ScanSearch',
  <>
    <path d="M4 8V6a2 2 0 0 1 2-2h2" />
    <path d="M16 4h2a2 2 0 0 1 2 2v2" />
    <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
    <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
    <circle cx="11.5" cy="11.5" r="3.4" />
    <path d="M14.2 14.2l2.6 2.6" />
  </>
)

// ---------- lucide-react 名称映射（复用自绘图标） ----------
export { IconAlertCircle as AlertCircle, IconChartBarStacked, IconCircleCheck as CheckCircle }
export { IconChevronDown as LucideChevronDown, IconChevronUp as LucideChevronUp, IconEye as LucideEye }
export { IconFileText as LucideFileText, IconLink2, IconLoader as LucideLoader, IconLoader2 as LucideLoader2 }
export { IconPlus as PlusIcon, IconRotateCw, IconScanSearch, IconSearch as LucideSearch }
export { IconTrash as Trash2, IconX as LucideX }
