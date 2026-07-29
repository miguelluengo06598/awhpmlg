'use client'

import { usePathname } from 'next/navigation'
import { translations } from './translations'
import { type Locale, localeFromPath, localizePath, stripLocalePrefix } from './locale'

export function useTranslation(locale?: Locale) {
  const pathname = usePathname() ?? '/'
  // Idioma validado (whitelist): del prefijo del path o del override recibido.
  const currentLang: Locale = locale ?? localeFromPath(pathname)
  // Indexación por clave ya validada → sin interpolación de valores crudos.
  const t = translations[currentLang]

  function getLink(path: string) {
    return localizePath(path, currentLang)
  }

  function isActive(path: string) {
    const here = stripLocalePrefix(pathname)
    if (path === '/') return here === '/'
    return here.startsWith(path)
  }

  return { currentLang, t, getLink, isActive }
}
