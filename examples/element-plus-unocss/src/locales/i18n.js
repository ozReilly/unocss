import { createI18n } from 'vue-i18n'
import enLocale from './en.json'
import usLocal from './zh-CN.json'
import zhHk from './zh-HK.json'

const messages = {
  en: { ...enLocale },
  zh: { ...usLocal },
  zht: { ...zhHk }
}
const i18n = createI18n({
  locale: localStorage.getItem('lang') || 'zh',
  messages
})

export default i18n
