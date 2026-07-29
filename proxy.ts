import { NextRequest, NextResponse } from 'next/server'
import {
  LOCALE_COOKIE,
  resolveLocale,
  localeFromPath,
  stripLocalePrefix,
  localizePath,
} from '@/lib/locale'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  // 'aecomi-auth' is a hint cookie set on login and cleared on logout.
  const isAuthenticated = req.cookies.has('aecomi-auth')

  const locale = localeFromPath(pathname)          // idioma implícito por prefijo
  const barePath = stripLocalePrefix(pathname)      // ruta sin /en|/pt

  // ── Auth (respeta el prefijo de idioma en la ruta) ──────────────────────────
  if (isAuthenticated && (barePath === '/auth/signin' || barePath === '/auth/signup')) {
    return NextResponse.redirect(new URL('/dashboard/client', req.url))
  }
  if (!isAuthenticated && barePath.startsWith('/dashboard')) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/signin'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  // ── Detección de idioma (solo en rutas "raíz" sin prefijo explícito) ─────────
  // El dashboard y las páginas de auth se quedan en español (no se auto-redirigen).
  // Toda la detección ocurre en el servidor, antes de renderizar; solo se usa la
  // cabecera nativa de Vercel (x-vercel-ip-country), sin servicios de terceros.
  if (locale === 'es' && !barePath.startsWith('/dashboard') && !barePath.startsWith('/auth')) {
    const target = resolveLocale({
      cookie: req.cookies.get(LOCALE_COOKIE)?.value,      // 1) elección manual previa
      country: req.headers.get('x-vercel-ip-country'),    // 2) geolocalización nativa
      acceptLanguage: req.headers.get('accept-language'), // 3) respaldo del navegador
    })
    if (target !== 'es') {
      const url = req.nextUrl.clone()
      url.pathname = localizePath(pathname, target)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Ejecuta el middleware en todas las páginas excepto API, assets de Next y
  // archivos con extensión (para no interferir con estáticos ni con las rutas API).
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
