'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { localeFromPath } from '@/lib/locale'

/**
 * Sincroniza el atributo <html lang> con el idioma de la ruta (cliente),
 * sin forzar render dinámico del layout. El idioma se deriva del pathname
 * (ya validado por la whitelist en localeFromPath).
 */
export function LocaleSync() {
  const pathname = usePathname() ?? '/'
  useEffect(() => {
    document.documentElement.lang = localeFromPath(pathname)
  }, [pathname])
  return null
}
