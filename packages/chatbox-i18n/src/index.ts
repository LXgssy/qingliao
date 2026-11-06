// 轻聊：仅打包简体中文语言资源
import zhHans from './locales/zh-Hans/translation.json'

export type TranslationKey = keyof typeof zhHans
export { type I18nLanguage, languageNameMap, languages, supportedLanguages } from './languages'

export const translationResources = {
  'zh-Hans': { translation: zhHans },
} as const
