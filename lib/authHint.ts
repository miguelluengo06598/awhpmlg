// Cookie "hint" de autenticación usada por el proxy/middleware para decisiones de
// enrutado rápidas. NO autoriza nada por sí sola (la comprobación real la hacen
// DashboardShell y RLS). Se marca Secure en HTTPS; en http://localhost se omite
// Secure para no perder la cookie en desarrollo.

const NAME = 'aecomi-auth'

function secureAttr(): string {
  return typeof window !== 'undefined' && window.location.protocol === 'https:'
    ? ' Secure;'
    : ''
}

export function setAuthHint(): void {
  document.cookie = `${NAME}=1; path=/; max-age=604800; SameSite=Lax;${secureAttr()}`
}

export function clearAuthHint(): void {
  document.cookie = `${NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;${secureAttr()}`
}
