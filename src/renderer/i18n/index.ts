import { translationResources } from '@chatbox/i18n'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { authErrorOverrides } from './auth-error-overrides'
import changelogZhHans from './changelogs/changelog_zh_Hans'

i18n.use(initReactI18next).init({
  resources: {
    'zh-Hans': {
      translation: { ...translationResources['zh-Hans'].translation, ...authErrorOverrides['zh-Hans'] },
    },
  },
  lng: 'zh-Hans',
  fallbackLng: 'zh-Hans',

  interpolation: {
    escapeValue: false,
  },

  detection: {
    caches: [],
  },
})

export default i18n

export function changelog() {
  return changelogZhHans
}
