// 轻聊：纯本地应用，无登录系统、无付费许可体系。
// 此卡片在原版用于展示「登录 Chatbox AI / 领取免费套餐 / 购买套餐」等入口，
// 轻聊中一律不再渲染，避免任何登录残留出现在主页与生成图片页。
export function ChatboxWelcomeCard(_props: {
  mode: 'none' | 'login' | 'no-license' | 'expired-license'
  pageName: string
  className?: string
}) {
  return null
}
