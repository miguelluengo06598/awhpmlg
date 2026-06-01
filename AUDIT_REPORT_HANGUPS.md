# AUDITORÍA DE COLGAMIENTOS

Fecha: 2026-06-01  
Rama: main

---

## Problemas Encontrados

### 1. Queries Lentas

| Archivo | Línea | Query | Problema |
|---|---|---|---|
| `app/dashboard/admin/page.tsx` | 62 | `payments.select('amount').eq('status','completed')` | **Sin `.limit()`** — descarga TODOS los pagos para sumarlos en JS |
| `app/dashboard/admin/applications/page.tsx` | 81–89 | `certifications_applications.select(...)` | Sin `.limit()` — descarga TODAS las solicitudes; filtrado 100% en cliente |
| `app/dashboard/admin/users/page.tsx` | 62–65 | `users.select(...)` | Sin `.limit()` — descarga TODOS los usuarios; filtrado 100% en cliente |
| `app/dashboard/admin/messages/page.tsx` | 53–56 | `contact_messages.select(...)` | Sin `.limit()` — descarga TODOS los mensajes |
| `app/dashboard/client/page.tsx` | 69 | `documents.select('*', {count:'exact',...})` | 4ª query **secuencial** que debería estar dentro del `Promise.all` de la línea 55 |

### 2. Renders Innecesarios / Race Conditions

| Archivo | Línea | Problema |
|---|---|---|
| `components/sections/ClientCertificatesSection.tsx` | 41–52 | `useEffect` con query de Supabase **sin AbortController**. Si el componente se desmonta antes de resolver (navegación rápida), el callback `.then()` intenta actualizar estado de componente desmontado |
| `components/sections/AdminIssuedCertificatesSection.tsx` | 35–56 | Dependencia en `[refreshKey]`: cada vez que `certRefreshKey` cambia en el padre, el componente vuelve a hacer 3 round-trips (getSession + fetch API + auth interna) |

### 3. Operaciones Sin Timeout / Sin Try-Catch

| Archivo | Línea | Operación | Problema |
|---|---|---|---|
| `hooks/useAuth.ts` | 65–86 | `onAuthStateChange` callback | **⚠️ CRÍTICO**: query a `users` en líneas 73–76 **sin try-catch**. Si falla, `setLoading(false)` nunca se llama → spinner infinito en TODOS los dashboards |
| `hooks/useAuth.ts` | 26–45 | `checkAuth()` | Dos round-trips **secuenciales**: primero `getSession()`, luego `from('users').select(...)`. Cada login/refresh bloquea el render hasta que completan los dos |
| `app/api/certificates/renew/route.ts` | 16 | `createRenewalPaymentSession(...)` | Llama a Stripe API **sin timeout**. Si Stripe no responde, el cliente espera hasta el límite de la función serverless |
| `app/api/admin/certificates/route.ts` | 39 | `createCertificate(...)` | Crea certificado + QR **sin timeout**. Múltiples inserts + generación de imagen |
| `app/dashboard/admin/applications/[id]/page.tsx` | 205–214 | `downloadDoc` | Genera URL firmada de Supabase Storage **sin try-catch externo** (solo `if (error)` inline) |
| `components/sections/CertificationApplyForm.tsx` | 257–274 | Uploads de documentos | Loop de subidas de archivos **secuencial**, sin `Promise.all`, sin timeout por archivo |
| `app/verify-certificate/[id]/page.tsx` | 53 | `fetch('/api/verify-certificate/...')` | Fetch **sin AbortController ni timeout** — si el servidor no responde, la página queda cargando |

### 4. API Routes Con Problemas

| Ruta | Problema | Queries a BD |
|---|---|---|
| `GET /api/admin/certificates` | 1 query directa con `.limit(100)` — correcto, pero filtra solo por `issued_by_admin = user.id` (cada admin solo ve los suyos) | 2 (auth + certificates) |
| `POST /api/admin/certificates` | Llama `createCertificate` que hace múltiples inserts + genera QR; sin timeout global | 3+ |
| `POST /api/certificates/renew` | Llama Stripe API externa sin timeout; si Stripe tarda, el botón queda bloqueado | 2+ Stripe |
| `POST /api/assign-certificates` | Sin timeout; `assignCertificatesToUser` puede hacer N queries | 2+ |
| `POST /api/contact` | Bien estructurada: rate-limit, try-catch, `Promise.allSettled` para emails | 1 |
| `POST /api/webhooks/stripe` | Sin timeout en `handleStripeWebhook` | variable |

---

## Recomendaciones

### Fix 1 — useAuth: añadir try-catch en `onAuthStateChange`
```typescript
// hooks/useAuth.ts:65
supabase.auth.onAuthStateChange(async (event, session) => {
  if (!session) { setUser(null); setLoading(false); return }
  try {
    const { data: userData } = await supabase
      .from('users').select('id, email, role').eq('id', session.user.id).single()
    setUser({ id: session.user.id, email: session.user.email, role: userData?.role })
  } catch (err) {
    console.error('onAuthStateChange error:', err)
    setUser(null)
  } finally {
    setLoading(false)  // ← SIEMPRE ejecutar
  }
})
```

### Fix 2 — Admin dashboard: calcular revenue en servidor
```typescript
// app/dashboard/admin/page.tsx:62 — reemplazar con RPC o agregar SUM en Supabase
// Opción A: RPC en Supabase: select sum(amount) from payments where status = 'completed'
// Opción B: añadir .limit(1000) como parche temporal
supabase.from('payments').select('amount').eq('status', 'completed').limit(1000)
```

### Fix 3 — Mover 4ª query de documentos al Promise.all
```typescript
// app/dashboard/client/page.tsx:55 — añadir la query de documentos al array
const [totalRes, certRes, appsRes, docRes] = await Promise.all([
  supabase.from('certifications_applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
  supabase.from('certifications_applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'certified'),
  supabase.from('certifications_applications').select(`id, status, submitted_at, ...`).eq('user_id', user.id).order(...).limit(5),
  supabase.from('documents').select('*', { count: 'exact', head: true }).eq('user_id', user.id).is('deleted_at', null),
])
// Eliminar las líneas 67-71 y usar docRes.count directamente
```

### Fix 4 — Añadir AbortController a ClientCertificatesSection
```typescript
// components/sections/ClientCertificatesSection.tsx:41
useEffect(() => {
  let cancelled = false
  supabase.from('certificates').select(...).eq('user_id', userId)...
    .then(({ data }) => {
      if (!cancelled) { setCerts(data ?? []); setLoading(false) }
    })
  return () => { cancelled = true }
}, [userId])
```

### Fix 5 — Paralelizar uploads de documentos en CertificationApplyForm
```typescript
// components/CertificationApplyForm.tsx:257
// Reemplazar el loop secuencial con Promise.all
await Promise.all(pendingUploads.map(doc => supabase.storage.from(...).upload(...)))
```

### Fix 6 — Añadir timeout a fetch calls de API
```typescript
// Patrón para cualquier fetch sin timeout:
const controller = new AbortController()
const timeoutId = setTimeout(() => controller.abort(), 10_000)
const res = await fetch('/api/...', { signal: controller.signal })
clearTimeout(timeoutId)
```

---

## Prioridad

### CRÍTICO (cuelga la app completamente):
- **`hooks/useAuth.ts:73-76`** — `onAuthStateChange` sin try-catch → spinner infinito si la query a `users` falla. Afecta TODOS los dashboards.

### ALTO (degrada con el volumen de datos):
- **`app/dashboard/admin/page.tsx:62`** — Revenue query sin `.limit()` descarga todos los pagos
- **`app/dashboard/admin/applications/page.tsx:81`** — Sin límite, filtrado en cliente
- **`app/dashboard/admin/users/page.tsx:62`** — Sin límite, filtrado en cliente
- **`app/dashboard/admin/messages/page.tsx:53`** — Sin límite

### MEDIO (latencia perceptible):
- **`hooks/useAuth.ts:26-45`** — Dos round-trips secuenciales en cada carga de página
- **`app/dashboard/client/page.tsx:69`** — 4ª query secuencial que debería ir en `Promise.all`
- **`components/sections/CertificationApplyForm.tsx:257`** — Uploads secuenciales en vez de paralelos
- **`components/sections/ClientCertificatesSection.tsx:41`** — Sin cleanup en useEffect

### BAJO (edge cases / timeouts externos):
- **`app/api/certificates/renew/route.ts`** — Sin timeout en llamada a Stripe
- **`app/api/admin/certificates/route.ts`** — Sin timeout en `createCertificate`
- **`app/verify-certificate/[id]/page.tsx:53`** — fetch sin AbortController
- **`components/sections/AdminIssuedCertificatesSection.tsx`** — 3 round-trips para cargar certificados emitidos
