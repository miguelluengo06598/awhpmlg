# Pendiente — requiere decisión y verificación en navegador

Dos hallazgos son refactors arquitectónicos de **alto riesgo de romper la
autenticación / el rendimiento en producción** y **no son verificables sin un
entorno funcional + navegador**. No los he aplicado a ciegas para no marcar como
"arreglado" algo sin poder confirmarlo (y para no romper producción). Aquí está el
plan para hacerlos como pieza de trabajo dedicada.

---

## #12 — Sesión en `localStorage` → DESPRIORIZADO (decisión 2026-07-29)

### Hallazgo que cambió la decisión
`@supabase/ssr` usa `DEFAULT_COOKIE_OPTIONS.httpOnly = false` **por diseño**: el
`createBrowserClient` necesita leer la cookie por `document.cookie` para mantener la
sesión reactiva en el cliente. Es decir, el patrón estándar mueve la sesión de
`localStorage` a cookies **pero siguen siendo legibles por JavaScript** → un XSS
puede robar el token igual. **No cumple el objetivo de #12.**

Cookies `httpOnly` de verdad exigen mover TODA la auth al servidor (login/signup
como Route Handlers/Server Actions), con lo que el cliente pierde el acceso directo
a `supabase.auth`. Esta app es intensivamente client-side (queries con RLS desde
componentes cliente), así que eso implica **re-arquitecturar el acceso a datos** —
es un proyecto, no un "fix".

### Decisión
**Despriorizado.** El riesgo residual (token en `localStorage`) se **acepta** porque
la superficie de XSS ya está endurecida en las Fases 3-5:
- CSP sin `'unsafe-eval'` en producción.
- Salidas escapadas (`escape-html` en emails); cero `dangerouslySetInnerHTML`,
  `innerHTML`, `eval` en todo el código.
- Cabeceras de seguridad (X-Frame-Options DENY, nosniff, etc.).

### Si en el futuro se prioriza httpOnly real (Opción A)
Re-arquitectura a auth server-side: login/signup como Route Handlers que setean
cookies `httpOnly`; acceso a datos vía server components/route handlers en vez de
`supabase` cliente; middleware para refrescar sesión. Alto esfuerzo y riesgo;
requiere verificación en navegador. No usar el patrón `@supabase/ssr` por defecto
(no es httpOnly).

---

## #13 (parte nonces) — CSP estricta sin `unsafe-inline`

### Ya aplicado (seguro)
- `'unsafe-eval'` eliminado en producción (solo queda en dev). Ver `next.config.js`.

### Por qué NO se migró a nonces todavía
Según la guía oficial de Next 16 (`node_modules/.../content-security-policy.md`):

- **Los nonces fuerzan render dinámico de TODAS las páginas**: se pierde la
  generación estática, ISR y el cacheo en CDN. Este sitio tiene muchas páginas de
  marketing estáticas → impacto directo en rendimiento y coste.
- **`style-src 'nonce-...'` sin `'unsafe-inline'` rompe los estilos inline** de
  React (`style={{}}`) y de **framer-motion**, usados masivamente en el proyecto.
  Requeriría además `style-src-attr` y una revisión cuidadosa.

### Plan propuesto (si se prioriza cumplimiento estricto)
1. Mover el CSP de `next.config.js` al middleware (`proxy.ts`) y generar un nonce
   por request (patrón oficial: header `x-nonce` + `Content-Security-Policy`).
2. `script-src 'self' 'nonce-<n>' 'strict-dynamic'`.
3. Resolver los estilos inline: o `style-src-attr 'unsafe-inline'` (compromiso), o
   migrar los `style={{}}` a clases; evaluar framer-motion.
4. Forzar dinámico donde haga falta (`await connection()`), aceptando el coste.
5. **Verificar en navegador**: cero violaciones CSP en consola en todas las rutas.

> Alternativa: SRI experimental (`experimental.sri`) mantiene el estático pero es
> experimental y no cubre los estilos inline.
