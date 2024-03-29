import { useTranslation } from 'react-i18next'

// config
import { LANGS, defaultLang } from '@/config'

export default function useLocales() {
  const { i18n, t: translate } = useTranslation()
  const langStorage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : ''
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || defaultLang

  const handleChangeLanguage = (newlang) => {
    i18n.changeLanguage(newlang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    currentLang,
    LANGS,
  }
}
