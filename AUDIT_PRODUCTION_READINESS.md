# AECMI — Informe de Auditoría Pre-Producción

**Fecha:** 2026-05-29  
**Rama:** `main`  
**Auditor:** Revisión automática (Claude Code) + verificación manual pendiente

---

## Leyenda

| Símbolo | Significado |
|---------|-------------|
| ✅ | Verificado — confirmado directamente desde el código fuente |
| ⚠️ | Advertencia — existe pero necesita atención antes de producción |
| ❌ | Falla — problema real que debe resolverse |
| 🔲 | No verificable desde el código — requiere comprobación manual externa |

---

## 1. TypeScript y Calidad de Código

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 1.1 | Cero errores TypeScript en fuentes | ✅ | Solo hay errores en `.next/` (caché obsoleto — se limpian con `next build`) |
| 1.2 | Sin `dangerouslySetInnerHTML` | ✅ | Ninguna ocurrencia en toda la base de código |
| 1.3 | Sin `eval()` ni `innerHTML` directo | ✅ | Ninguna ocurrencia encontrada |
| 1.4 | Páginas de debug eliminadas | ✅ | `app/debug/auth-test/` y `app/debug/solicitud-test/` eliminadas via `git rm` |
| 1.5 | `console.log` en `lib/supabaseClient.ts` | ⚠️ | Líneas 33–35 — solo se ejecutan en `process.env.NODE_ENV === 'development'` y en el cliente; inofensivo en producción |
| 1.6 | `SupabaseTest.tsx` con volcado masivo de logs | ⚠️ | Componente de diagnóstico — no está referenciado en ninguna ruta pública; sin impacto en prod |

---

## 2. Seguridad

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 2.1 | Cabeceras de seguridad HTTP | ✅ | Configuradas en `next.config.js`: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy` |
| 2.2 | `X-Powered-By` eliminado | ✅ | `poweredByHeader: false` en `next.config.js` |
| 2.3 | Content-Security-Policy (CSP) | ✅ | Añadida en `next.config.js` — restringe fuentes de scripts, estilos, imágenes, fuentes y conexiones |
| 2.4 | HSTS (`Strict-Transport-Security`) | ✅ | `max-age=63072000; includeSubDomains; preload` configurado en `next.config.js` |
| 2.5 | `.env.local` excluido de git | ✅ | `.gitignore` incluye `.env*`; `git log` confirma que nunca fue committed |
| 2.6 | `SUPABASE_SERVICE_ROLE_KEY` nunca expuesto al cliente | ✅ | Solo referenciado en scripts de seed y comentarios — nunca en código cliente |
| 2.7 | Sin inyección SQL (client-side) | ✅ | Todas las queries usan el SDK de Supabase con parámetros tipados |
| 2.8 | RLS en Supabase | 🔲 | Verificar en Supabase Dashboard → Authentication → Policies para todas las tablas |
| 2.9 | Rate limiting en rutas API | ✅ | `lib/rateLimit.ts` implementado; aplicado en `/api/contact` (5 req/hora por IP) |
| 2.10 | Validación de entrada en `/api/contact` | ✅ | `validateContactForm()` en `route.ts` — campos, longitudes y formato email |
| 2.11 | Validación de formato QR en `/api/certificate` | ✅ | `validateQRCode()` invocado antes de consultar la BD |
| 2.12 | Restricción de `remotePatterns` en imágenes | ✅ | Solo `*.supabase.co` permitido |

---

## 3. Funcionalidad

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 3.1 | `/api/contact` conectado a Supabase | ✅ | Guarda en tabla `contact_messages` + envía emails de confirmación y notificación via Resend |
| 3.2 | `/api/contact` envía emails | ✅ | Email de confirmación al usuario + notificación a `info@aecmi.com` via `RESEND_API_KEY` |
| 3.3 | `/api/certificate/[qrCode]` con datos reales | ✅ | Consulta tabla `certificates` en Supabase; elimina mock data |
| 3.4 | `/about/formacion` → `/formacion` redirect | ✅ | `redirect('/formacion')` en `app/about/formacion/page.tsx` |
| 3.5 | Guías y Estándares eliminado | ✅ | Archivos de página y componente borrados; referencias de navegación eliminadas |
| 3.6 | Sección de socios académicos oculta | ✅ | `SHOW_ACADEMIC_PARTNERS = false` en `FormationPage.tsx` |
| 3.7 | PDF de responsabilidades (IDM/BDM/BCM) | ✅ | `ResponsibilitiesPDFSection` integrado; genera PDF via jsPDF |

---

## 4. Rendimiento

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 4.1 | Compresión Gzip habilitada | ✅ | `compress: true` en `next.config.js` |
| 4.2 | Optimización de imágenes | ✅ | `unoptimized: false` — Next.js Image Optimization activo |
| 4.3 | Core Web Vitals medidos | 🔲 | Ejecutar Lighthouse o PageSpeed Insights en producción |
| 4.4 | Bundle size verificado | 🔲 | Ejecutar `ANALYZE=true next build` con `@next/bundle-analyzer` |
| 4.5 | Pruebas de carga | 🔲 | No realizadas — ejecutar con k6 o similar antes de lanzamiento público |

---

## 5. Infraestructura y Despliegue

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 5.1 | Variables de entorno en Vercel Dashboard | 🔲 | Añadir: `RESEND_API_KEY`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` |
| 5.2 | Sin sección `env` en `vercel.json` | ✅ | `vercel.json` no existe en el repo |
| 5.3 | Dominio personalizado configurado | 🔲 | Verificar en Vercel → Settings → Domains |
| 5.4 | SSL/TLS activo | 🔲 | Verificar que Vercel haya emitido certificado para el dominio |
| 5.5 | Preview deployments en ramas no-main | 🔲 | Confirmar en Vercel que PR deployments están activos |

---

## 6. Base de Datos (Supabase)

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 6.1 | Tabla `contact_messages` creada | 🔲 | Ejecutar SQL de TAREA 1.2 en Supabase SQL Editor |
| 6.2 | Tabla `certificates` creada | 🔲 | Ejecutar SQL de TAREA 2.1 en Supabase SQL Editor |
| 6.3 | RLS activo en todas las tablas | 🔲 | Supabase Dashboard → Table Editor → candado verde en cada tabla |
| 6.4 | Backups automáticos habilitados | 🔲 | Supabase Dashboard → Settings → Backups (requiere plan Pro) |
| 6.5 | Point-in-Time Recovery | 🔲 | Solo disponible en plan Pro+ |
| 6.6 | Pool de conexiones configurado | 🔲 | Supabase → Settings → Database → Connection Pooling |

---

## 7. Monitoreo y Observabilidad

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 7.1 | Tracking de errores (Sentry) | ✅ | `@sentry/nextjs` instalado; `sentry.client.config.ts` y `sentry.server.config.ts` creados. **Pendiente:** añadir DSN en Vercel |
| 7.2 | Monitor de uptime | 🔲 | Configurar UptimeRobot, Better Uptime o Vercel Checks |
| 7.3 | Analytics de uso | 🔲 | Considerar Vercel Analytics (`@vercel/analytics`) o PostHog |
| 7.4 | Alertas por errores 5xx | 🔲 | Configurar en Vercel → Settings → Notifications |

---

## 8. Accesibilidad y SEO

| # | Ítem | Estado | Notas |
|---|------|--------|-------|
| 8.1 | Metadata en páginas principales | ✅ | `export const metadata` presente en páginas de certificación y formación |
| 8.2 | Atributos `alt` en imágenes | 🔲 | Verificar con axe DevTools o Lighthouse |
| 8.3 | Navegación por teclado | 🔲 | Verificar foco visible en menús y formularios |
| 8.4 | Contraste WCAG AA | 🔲 | Verificar con herramienta de contraste en texto sobre gradientes oscuros |

---

## Resumen Ejecutivo

### Bloqueantes resueltos ✅

1. ~~`/api/contact` era un stub~~ → Guarda en Supabase + envía emails via Resend
2. ~~`/api/certificate` usaba mock data~~ → Consulta tabla `certificates` real en Supabase
3. ~~Sin rate limiting~~ → `lib/rateLimit.ts` implementado, aplicado en `/api/contact`
4. ~~Sin CSP ni HSTS~~ → Cabeceras añadidas en `next.config.js`

### Pendientes obligatorios antes de launch (requieren acción manual)

5. **Crear tablas en Supabase** — ejecutar SQL de TAREA 1.2 (contact_messages) y TAREA 2.1 (certificates)
6. **Configurar variables en Vercel** — `RESEND_API_KEY`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_DSN`, `SENTRY_AUTH_TOKEN`
7. **Verificar RLS** en todas las tablas de Supabase

### Pendientes post-lanzamiento

8. Core Web Vitals con Lighthouse en URL de producción
9. Habilitar backups en Supabase (plan Pro)
10. Configurar monitor de uptime (UptimeRobot o similar)
11. Añadir Vercel Analytics

---

*Actualizado el 2026-05-29. Los ítems 🔲 requieren verificación en sistemas externos.*
