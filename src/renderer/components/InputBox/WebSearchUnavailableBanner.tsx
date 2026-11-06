// 轻聊：所有搜索提供方均免登录，无需显示“需要登录”横幅
type BannerProps = { sessionId: string; errorCount: number; latestHasError: boolean | undefined }

export function WebSearchUnavailableBanner(_props: BannerProps) {
  return null
}
