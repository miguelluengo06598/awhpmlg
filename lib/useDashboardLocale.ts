'use client'

import { useCallback, useEffect, useState } from 'react'
import { type Locale, coerceLocale, LOCALE_COOKIE } from './locale'

function readCookieLocale(): Locale {
  if (typeof document === 'undefined') return 'es'
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${LOCALE_COOKIE}=([^;]+)`))
  return coerceLocale(m?.[1] ? decodeURIComponent(m[1]) : undefined)
}

/**
 * Idioma del panel (dashboard) basado en la cookie NEXT_LOCALE — el dashboard no
 * tiene prefijo de idioma en la URL. `setLocale` persiste la elección en la misma
 * cookie que usa el sitio público (whitelist validada; SameSite=Lax; Secure en https).
 */
export function useDashboardLocale() {
  const [locale, setLocaleState] = useState<Locale>('es')

  useEffect(() => {
    setLocaleState(readCookieLocale())
  }, [])

  const setLocale = useCallback((next: Locale) => {
    const secure =
      typeof window !== 'undefined' && window.location.protocol === 'https:' ? ' Secure;' : ''
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax;${secure}`
    setLocaleState(next)
  }, [])

  return { locale, setLocale }
}
