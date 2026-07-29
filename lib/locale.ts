// ─────────────────────────────────────────────────────────────────────────────
// Núcleo i18n: whitelist cerrada de idiomas + resolución de idioma por
// cookie / geolocalización (cabecera nativa de Vercel) / Accept-Language.
//
// SEGURIDAD: el idioma SIEMPRE se valida contra LOCALES antes de usarse. Nunca se
// interpola un valor crudo de URL/cookie/header en un path de importación ni en
// una consulta. Las traducciones se importan estáticamente y se indexan por una
// clave ya validada (ver useTranslation), por lo que no hay path traversal.
// ─────────────────────────────────────────────────────────────────────────────

export const LOCALES = ['es', 'en', 'pt'] as const
export type Locale = (typeof LOCALES)[number]

// Idioma del path "sin prefijo" (raíz). El sitio sirve español en la raíz.
export const DEFAULT_LOCALE: Locale = 'es'

// Nombre de la cookie de preferencia (solo guarda el código de idioma).
export const LOCALE_COOKIE = 'NEXT_LOCALE'

/** Type guard: ¿es un código de idioma soportado? (whitelist cerrada) */
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value)
}

/** Devuelve un Locale válido SIEMPRE (coacciona cualquier entrada al fallback). */
export function coerceLocale(value: unknown, fallback: Locale = DEFAULT_LOCALE): Locale {
  return isLocale(value) ? value : fallback
}

// ── País (ISO 3166-1 alpha-2) → idioma ───────────────────────────────────────
const PT_COUNTRIES = new Set(['PT', 'BR'])
// España + países hispanohablantes de Latinoamérica.
const ES_COUNTRIES = new Set([
  'ES', 'MX', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO',
  'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ',
])

/**
 * Mapea un código de país a idioma. Portugal/Brasil → pt; España y Latinoamérica
 * hispanohablante → es; cualquier otro país conocido → en (resto del mundo).
 * Devuelve null solo si no hay país (para poder caer a Accept-Language).
 */
export function countryToLocale(country?: string | null): Locale | null {
  if (!country) return null
  const c = country.trim().toUpperCase()
  if (!c) return null
  if (PT_COUNTRIES.has(c)) return 'pt'
  if (ES_COUNTRIES.has(c)) return 'es'
  return 'en'
}

/** Primer idioma soportado según el header Accept-Language (ordenado por q). */
export function acceptLanguageToLocale(header?: string | null): Locale | null {
  if (!header) return null
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=')
      return { base: (tag || '').toLowerCase().split('-')[0], q: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { base } of ranked) {
    if (isLocale(base)) return base
  }
  return null
}

/**
 * Resolución de idioma con prioridad:
 *   1) cookie (elección manual previa) — siempre gana.
 *   2) país (x-vercel-ip-country).
 *   3) Accept-Language.
 *   4) DEFAULT_LOCALE.
 */
export function resolveLocale(opts: {
  cookie?: string | null
  country?: string | null
  acceptLanguage?: string | null
}): Locale {
  if (isLocale(opts.cookie)) return opts.cookie
  const byCountry = countryToLocale(opts.country)
  if (byCountry) return byCountry
  const byLang = acceptLanguageToLocale(opts.acceptLanguage)
  if (byLang) return byLang
  return DEFAULT_LOCALE
}

// ── Helpers de rutas (prefijo /en, /pt; español en la raíz) ───────────────────
/** Idioma implícito en un pathname (por su prefijo). */
export function localeFromPath(pathname: string): Locale {
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/pt' || pathname.startsWith('/pt/')) return 'pt'
  return 'es'
}

/** Quita el prefijo de idioma de un pathname (deja la ruta "española/raíz"). */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/pt') return '/'
  if (pathname.startsWith('/en/') || pathname.startsWith('/pt/')) return pathname.slice(3)
  return pathname
}

/** Construye la ruta para un idioma dado (es → sin prefijo; en/pt → /en|/pt). */
export function localizePath(path: string, locale: Locale): string {
  const clean = stripLocalePrefix(path)
  if (locale === 'es') return clean
  return clean === '/' ? `/${locale}` : `/${locale}${clean}`
}
