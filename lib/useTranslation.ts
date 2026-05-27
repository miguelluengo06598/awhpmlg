'use client'

import { usePathname } from 'next/navigation'
import { translations } from './translations'

export function useTranslation(locale?: 'es' | 'en') {
  const pathname = usePathname()
  const currentLang = locale ?? (pathname?.startsWith('/en') ? 'en' : 'es')
  const t = translations[currentLang]

  function getLink(path: string) {
    if (path.startsWith('/en')) return path
    return currentLang === 'en' ? `/en${path}` : path
  }

  function isActive(path: string) {
    if (path === '/') {
      return pathname === '/' || pathname === '/en'
    }
    return pathname?.startsWith(currentLang === 'en' ? `/en${path}` : path)
  }

  return { currentLang, t, getLink, isActive }
}
