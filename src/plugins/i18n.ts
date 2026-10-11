import { createI18n } from 'vue-i18n'
import pt from '@/locales/pt.json'
import en from '@/locales/en.json'

const i18n = createI18n({
  legacy: false, // Usar API de Composição
  locale: localStorage.getItem('@techgamer:locale') || 'pt',
  fallbackLocale: 'en',
  messages: {
    pt,
    en,
  },
})

export default i18n
export { i18n }
