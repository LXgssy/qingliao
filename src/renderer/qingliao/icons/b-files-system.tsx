import { createIcon } from './factory'

// 轻聊自绘图标 · B 批：文件 / 文件夹 / 编辑 / 系统 / 安全
// 全部为原创基础几何绘制

const FILE_BODY = <path d="M6 3.5h8L19 8.5v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
const FILE_FOLD = <path d="M14 3.5v5h5" />

export const IconFile = createIcon(
  'File',
  <>
    {FILE_BODY}
    {FILE_FOLD}
  </>
)

export const IconFileText = createIcon(
  'FileText',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <path d="M8.5 12.5h7" />
    <path d="M8.5 16h5" />
  </>
)

export const IconFileDownload = createIcon(
  'FileDownload',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <path d="M12 11v6" />
    <path d="M9.5 14.5L12 17l2.5-2.5" />
  </>
)

export const IconFileImport = createIcon(
  'FileImport',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <path d="M9 14h6" />
    <path d="M12.5 11.5L15 14l-2.5 2.5" />
  </>
)

export const IconFileMinus = createIcon(
  'FileMinus',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <path d="M9 14.5h6" />
  </>
)

export const IconFilePencil = createIcon(
  'FilePencil',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <path d="M9.5 16.5l4.5-4.5 1.8 1.8-4.5 4.5-2.2.4.4-2.2z" />
  </>
)

export const IconFileSearch = createIcon(
  'FileSearch',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <circle cx="11.5" cy="13" r="2.6" />
    <path d="M13.5 15l2.5 2.5" />
  </>
)

export const IconFileZip = createIcon(
  'FileZip',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <path d="M11 6.5h1.5" />
    <path d="M11 9h1.5" />
    <path d="M11 11.5h1.5" />
    <path d="M10.8 14h2l.4 3h-2.8l.4-3z" />
  </>
)

export const IconFileTypeCsv = createIcon(
  'FileTypeCsv',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      CSV
    </text>
  </>
)

export const IconFileTypeHtml = createIcon(
  'FileTypeHtml',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      HTML
    </text>
  </>
)

export const IconFileTypeSql = createIcon(
  'FileTypeSql',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      SQL
    </text>
  </>
)

export const IconFileTypeSvg = createIcon(
  'FileTypeSvg',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      SVG
    </text>
  </>
)

export const IconFileTypeTxt = createIcon(
  'FileTypeTxt',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      TXT
    </text>
  </>
)

export const IconFileTypeXml = createIcon(
  'FileTypeXml',
  <>
    {FILE_BODY}
    {FILE_FOLD}
    <text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight={700} fill="currentColor" stroke="none" fontFamily="system-ui">
      XML
    </text>
  </>
)

export const IconJson = createIcon(
  'Json',
  <>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M9.5 8.5c-1.5 0-1.5 1.6-1.5 2.3 0 .8-.4 1.2-1.5 1.2 1.1 0 1.5.4 1.5 1.2 0 .7 0 2.3 1.5 2.3" />
    <path d="M14.5 8.5c1.5 0 1.5 1.6 1.5 2.3 0 .8.4 1.2 1.5 1.2-1.1 0-1.5.4-1.5 1.2 0 .7 0 2.3-1.5 2.3" />
  </>
)

const FOLDER_BODY = <path d="M3.5 6.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11z" />

export const IconFolder = createIcon('Folder', FOLDER_BODY)

export const IconFolderOpen = createIcon(
  'FolderOpen',
  <>
    <path d="M3.5 8a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2V19h-14a3 3 0 0 1-3-3V8z" />
    <path d="M5 19l2.2-6h16l-2.4 6.4a1.6 1.6 0 0 1-1.5 1.1" />
  </>
)

export const IconFolderPlus = createIcon(
  'FolderPlus',
  <>
    {FOLDER_BODY}
    <path d="M12 11.5v5" />
    <path d="M9.5 14h5" />
  </>
)

export const IconFolderOff = createIcon(
  'FolderOff',
  <>
    <path d="M3.5 6.5a2 2 0 0 1 2-2h4l2 2.5h7a2 2 0 0 1 2 2v8.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2v-11z" />
    <path d="M4 4l16 16" />
  </>
)

export const IconFolderCog = createIcon(
  'FolderCog',
  <>
    {FOLDER_BODY}
    <circle cx="12" cy="14" r="1.8" />
    <path d="M12 10.8v1.2M12 16v1.2M15 14h-1.2M10.2 14H9M14.1 11.9l-.9.9M10.8 15.2l-.9.9M14.1 16.1l-.9-.9M10.8 12.8l-.9-.9" strokeWidth="1.4" />
  </>
)

export const IconFolderSearch = createIcon(
  'FolderSearch',
  <>
    {FOLDER_BODY}
    <circle cx="11.5" cy="13.5" r="2.4" />
    <path d="M13.4 15.4l2.4 2.4" />
  </>
)

export const IconFolderShare = createIcon(
  'FolderShare',
  <>
    {FOLDER_BODY}
    <circle cx="9.5" cy="13.5" r="1.3" />
    <circle cx="14.8" cy="12" r="1.3" />
    <circle cx="14.8" cy="16.5" r="1.3" />
    <path d="M10.7 12.8l2.8-1.1M10.7 14.4l2.8 1.4" strokeWidth="1.4" />
  </>
)

export const IconCopy = createIcon(
  'Copy',
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5.5 14.5H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 2 2v.5" />
  </>
)

export const IconEdit = createIcon(
  'Edit',
  <>
    <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M13.5 8l3 3" />
  </>
)

export const IconPencil = createIcon(
  'Pencil',
  <>
    <path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
    <path d="M14.5 7l3 3" />
  </>
)

export const IconWriting = createIcon(
  'Writing',
  <>
    <path d="M4 20h16" />
    <path d="M6 16l1-4 8.5-8.5a2 2 0 0 1 3 3L10 15l-4 1z" />
  </>
)

export const IconDownload = createIcon(
  'Download',
  <>
    <path d="M12 4v11" />
    <path d="M7 11l5 5 5-5" />
    <path d="M4 19.5h16" />
  </>
)

export const IconUpload = createIcon(
  'Upload',
  <>
    <path d="M12 15.5V4.5" />
    <path d="M7 9l5-5 5 5" />
    <path d="M4 19.5h16" />
  </>
)

export const IconDeviceFloppy = createIcon(
  'DeviceFloppy',
  <>
    <path d="M5 3.5h11L20.5 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2z" />
    <path d="M8 3.5V8h6V3.5" />
    <rect x="7.5" y="12.5" width="9" height="7.5" rx="1" />
  </>
)

export const IconDeviceDesktop = createIcon(
  'DeviceDesktop',
  <>
    <rect x="3" y="4.5" width="18" height="12" rx="2" />
    <path d="M9 20h6" />
    <path d="M12 16.5V20" />
  </>
)

export const IconDeviceMobile = createIcon(
  'DeviceMobile',
  <>
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M10.8 17.8h2.4" />
  </>
)

export const IconPhoto = createIcon(
  'Photo',
  <>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M5 18l4.5-4.5 2.5 2.5 3-3L20.5 17" />
  </>
)

export const IconPhotoOff = createIcon(
  'PhotoOff',
  <>
    <path d="M3.5 4.5h17v15h-17z" />
    <path d="M3.5 19.5l6-6 2.5 2.5 3-3 5.5 5.5" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M4 4l16 16" />
  </>
)

export const IconPhotoPlus = createIcon(
  'PhotoPlus',
  <>
    <path d="M14 4.5H5.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V12" />
    <path d="M5 18l4.5-4.5 2.5 2.5 3-3L20.5 17" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="M18.5 3v5" />
    <path d="M16 5.5h5" />
  </>
)

export const IconPaperclip = createIcon(
  'Paperclip',
  <path d="M16.5 7.5l-7.1 7.1a2 2 0 0 0 2.8 2.8l7.5-7.4a4 4 0 0 0-5.7-5.7l-7.8 7.8a6 6 0 0 0 8.5 8.5l5.3-5.3" />
)

export const IconLock = createIcon(
  'Lock',
  <>
    <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </>
)

export const IconShieldLock = createIcon(
  'ShieldLock',
  <>
    <path d="M12 3l7.5 2.8v5.4c0 4.5-3.2 8-7.5 9.8-4.3-1.8-7.5-5.3-7.5-9.8V5.8L12 3z" />
    <rect x="9.2" y="10.6" width="5.6" height="4.6" rx="1" />
    <path d="M10.4 10.6V9.4a1.6 1.6 0 0 1 3.2 0v1.2" />
  </>
)

export const IconServer = createIcon(
  'Server',
  <>
    <rect x="3.5" y="4" width="17" height="7" rx="2" />
    <rect x="3.5" y="13" width="17" height="7" rx="2" />
    <circle cx="7.2" cy="7.5" r="0.6" fill="currentColor" />
    <circle cx="7.2" cy="16.5" r="0.6" fill="currentColor" />
  </>
)

export const IconDatabase = createIcon(
  'Database',
  <>
    <ellipse cx="12" cy="5.5" rx="8" ry="2.8" />
    <path d="M4 5.5v13c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8v-13" />
    <path d="M4 12c0 1.5 3.6 2.8 8 2.8s8-1.3 8-2.8" />
  </>
)

export const IconPackage = createIcon(
  'Package',
  <>
    <path d="M12 3l8.5 4.5v9L12 21l-8.5-4.5v-9L12 3z" />
    <path d="M3.5 7.5L12 12l8.5-4.5" />
    <path d="M12 12v9" />
    <path d="M7.5 5.2l8.5 4.5" />
  </>
)

export const IconHome = createIcon(
  'Home',
  <>
    <path d="M4 10.5L12 3.5l8 7" />
    <path d="M6 9.5V20h12V9.5" />
    <path d="M10 20v-6h4v6" />
  </>
)

export const IconBrowser = createIcon(
  'Browser',
  <>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M3 9h18" />
    <circle cx="6.3" cy="6.8" r="0.7" fill="currentColor" />
    <circle cx="9" cy="6.8" r="0.7" fill="currentColor" />
  </>
)

const GEAR = (cx: number, cy: number, r: number) => (
  <>
    <circle cx={cx} cy={cy} r={r} />
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * Math.PI) / 4
      const x1 = cx + Math.cos(a) * (r + 1.4)
      const y1 = cy + Math.sin(a) * (r + 1.4)
      const x2 = cx + Math.cos(a) * (r + 2.9)
      const y2 = cy + Math.sin(a) * (r + 2.9)
      return <path key={i} d={`M${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}`} strokeWidth="2" />
    })}
  </>
)

export const IconSettings = createIcon('Settings', GEAR(12, 12, 5.4))
export const IconSettings2 = createIcon(
  'Settings2',
  <>
    {GEAR(12, 12, 5.4)}
    <circle cx="12" cy="12" r="1.8" />
  </>
)
export const IconSettingsFilled = createIcon(
  'SettingsFilled',
  <>
    {GEAR(12, 12, 5.4)}
    <circle cx="12" cy="12" r="2.4" fill="currentColor" />
  </>
)

export const IconTool = createIcon(
  'Tool',
  <path d="M14.5 3.5a5 5 0 0 0-4.6 6.9L3.5 16.8a2 2 0 0 0 0 2.8l.9.9a2 2 0 0 0 2.8 0l6.4-6.4a5 5 0 0 0 6.9-4.6c0-.6-.1-1.2-.3-1.8l-3.2 3.2-2.8-.7-.7-2.8 3.2-3.2c-.6-.2-1.2-.3-2.2-.3z" />
)

export const IconHammer = createIcon(
  'Hammer',
  <>
    <path d="M13 5.5l5.5 5.5" />
    <path d="M11.5 7L15 3.5l5.5 5.5L17 12.5 11.5 7z" />
    <path d="M11.5 7L4 14.5l2.5 2.5L14 9.5" />
  </>
)

export const IconTrash = createIcon(
  'Trash',
  <>
    <path d="M4.5 6.5h15" />
    <path d="M9 6.5V4.8a1.3 1.3 0 0 1 1.3-1.3h3.4A1.3 1.3 0 0 1 15 4.8v1.7" />
    <path d="M6.5 6.5l1 13a1.5 1.5 0 0 0 1.5 1.4h6a1.5 1.5 0 0 0 1.5-1.4l1-13" />
    <path d="M10 10.5v6.5" />
    <path d="M14 10.5v6.5" />
  </>
)

export const IconExternalLink = createIcon(
  'ExternalLink',
  <>
    <path d="M11 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
    <path d="M13.5 4.5H20V11" />
    <path d="M10.5 13.5L20 4" />
  </>
)

export const IconEye = createIcon(
  'Eye',
  <>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </>
)

export const IconSearch = createIcon(
  'Search',
  <>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21" />
  </>
)

export const IconScan = createIcon(
  'Scan',
  <>
    <path d="M4 8V6a2 2 0 0 1 2-2h2" />
    <path d="M16 4h2a2 2 0 0 1 2 2v2" />
    <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
    <path d="M8 20H6a2 2 0 0 1-2-2v-2" />
    <path d="M4 12h16" />
  </>
)

export const IconListSearch = createIcon(
  'ListSearch',
  <>
    <path d="M4 6h12" />
    <path d="M4 12h6" />
    <path d="M4 18h5" />
    <circle cx="15" cy="15.5" r="3.2" />
    <path d="M17.5 18l2.7 2.7" />
  </>
)

export const IconListDetails = createIcon(
  'ListDetails',
  <>
    <rect x="3.5" y="4.5" width="5" height="5" rx="1" />
    <rect x="3.5" y="13.5" width="5" height="5" rx="1" />
    <path d="M12 5.5h8" />
    <path d="M12 9h5" />
    <path d="M12 14.5h8" />
    <path d="M12 18h5" />
  </>
)

export const IconListTree = createIcon(
  'ListTree',
  <>
    <path d="M6 4v13a2 2 0 0 0 2 2h2" />
    <circle cx="4.8" cy="4" r="1.2" fill="currentColor" stroke="none" />
    <rect x="12" y="8.5" width="8" height="4.5" rx="1" />
    <rect x="12" y="16.5" width="8" height="4.5" rx="1" />
    <path d="M6 10.8h3.5" />
  </>
)

export const IconNotes = createIcon(
  'Notes',
  <>
    <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
    <path d="M8.5 8h7" />
    <path d="M8.5 12h7" />
    <path d="M8.5 16h4" />
  </>
)

export const IconBook = createIcon(
  'Book',
  <>
    <path d="M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17H7.5A2.5 2.5 0 0 0 5 21.5v-17z" />
    <path d="M5 19a2.5 2.5 0 0 1 2.5-2.5H19" />
  </>
)

export const IconVocabulary = createIcon(
  'Vocabulary',
  <>
    <path d="M3.5 5.5h6.5a2 2 0 0 1 2 2V20a2.5 2.5 0 0 0-2.5-2.5H3.5v-12z" />
    <path d="M20.5 5.5H14a2 2 0 0 0-2 2V20a2.5 2.5 0 0 1 2.5-2.5h6v-12z" />
    <path d="M6.5 9h1.5M6 12h2.5" strokeWidth="1.4" />
    <path d="M16 9h1.5M15.5 12H18" strokeWidth="1.4" />
  </>
)

export const IconId = createIcon(
  'Id',
  <>
    <rect x="3" y="5" width="18" height="14.5" rx="2" />
    <circle cx="9" cy="11" r="2.2" />
    <path d="M5.8 17c.6-1.8 1.8-2.7 3.2-2.7s2.6.9 3.2 2.7" />
    <path d="M15 9.5h4" />
    <path d="M15 13h4" />
  </>
)

export const IconCategory = createIcon(
  'Category',
  <>
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.6" />
    <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.6" />
    <rect x="13" y="13" width="7.5" height="7.5" rx="1.6" />
  </>
)

export const IconSquares = createIcon(
  'Squares',
  <>
    <rect x="4" y="4" width="6.8" height="6.8" rx="1.4" />
    <rect x="13.2" y="4" width="6.8" height="6.8" rx="1.4" />
    <rect x="4" y="13.2" width="6.8" height="6.8" rx="1.4" />
    <rect x="13.2" y="13.2" width="6.8" height="6.8" rx="1.4" />
  </>
)

export const IconSquare = createIcon('Square', <rect x="4.5" y="4.5" width="15" height="15" rx="2" />)

export const IconStack2 = createIcon(
  'Stack2',
  <>
    <path d="M4 8.5L12 4.5l8 4-8 4-8-4z" />
    <path d="M4 13.5l8 4 8-4" />
  </>
)

export const IconAspectRatio = createIcon(
  'AspectRatio',
  <>
    <rect x="3.5" y="5" width="17" height="14" rx="2" />
    <path d="M7 10v4" />
    <path d="M7 14h4" />
    <path d="M17 14v-4" />
    <path d="M17 10h-4" />
  </>
)

export const IconTerminal = createIcon(
  'Terminal',
  <>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <path d="M7 9l3 3-3 3" />
    <path d="M12.5 15H17" />
  </>
)

export const IconCode = createIcon(
  'Code',
  <>
    <path d="M8.5 7L4 12l4.5 5" />
    <path d="M15.5 7L20 12l-4.5 5" />
    <path d="M13 5l-2.5 14" />
  </>
)

export const IconKeyboard = createIcon(
  'Keyboard',
  <>
    <rect x="2.5" y="6" width="19" height="12" rx="2" />
    <path d="M6 10h.01M9.5 10h.01M13 10h.01M16.5 10h.01M18 10h.01" strokeWidth="2.2" />
    <path d="M7 14.5h10" />
  </>
)

export const IconPlug = createIcon(
  'Plug',
  <>
    <path d="M9 3v5" />
    <path d="M15 3v5" />
    <path d="M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0V8z" />
    <path d="M12 17v4" />
  </>
)

export const IconBug = createIcon(
  'Bug',
  <>
    <rect x="8" y="7.5" width="8" height="11" rx="4" />
    <path d="M9 7.5a3 3 0 0 1 6 0" />
    <path d="M3.5 12.5H8M16 12.5h4.5" />
    <path d="M5 6.5L8 9M19 6.5L16 9M5 19l3-2.5M19 19l-3-2.5" />
  </>
)

export const IconBriefcase = createIcon(
  'Briefcase',
  <>
    <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
    <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
    <path d="M3 12.5h18" />
  </>
)

export const IconGift = createIcon(
  'Gift',
  <>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v7a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-7" />
    <path d="M12 8v12.5" />
    <path d="M12 8s-4.5.3-4.5-2.2C7.5 4.2 9 3.5 10 4.2c1.2.8 2 3.8 2 3.8z" />
    <path d="M12 8s4.5.3 4.5-2.2C16.5 4.2 15 3.5 14 4.2c-1.2.8-2 3.8-2 3.8z" />
  </>
)

export const IconDiscount2 = createIcon(
  'Discount2',
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 15l6-6" />
    <circle cx="9.2" cy="9.2" r="0.8" fill="currentColor" />
    <circle cx="14.8" cy="14.8" r="0.8" fill="currentColor" />
  </>
)

export const IconPalette = createIcon(
  'Palette',
  <>
    <path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.8 2-1.7 0-.8-.6-1.3-.6-2.1 0-1 .8-1.7 2-1.7h2.3c1.6 0 2.8-1.3 2.8-3A8.5 8.5 0 0 0 12 3.5z" />
    <circle cx="7.8" cy="10.2" r="0.8" fill="currentColor" />
    <circle cx="12" cy="7.8" r="0.8" fill="currentColor" />
    <circle cx="16.2" cy="10.2" r="0.8" fill="currentColor" />
  </>
)

export const IconVolume = createIcon(
  'Volume',
  <>
    <path d="M4 9.5h3l4.5-4v13L7 14.5H4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5z" />
    <path d="M15.5 9a4.2 4.2 0 0 1 0 6" />
    <path d="M18 6.5a8 8 0 0 1 0 11" />
  </>
)

export const IconMicrophone = createIcon(
  'Microphone',
  <>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
    <path d="M12 18v3" />
  </>
)
