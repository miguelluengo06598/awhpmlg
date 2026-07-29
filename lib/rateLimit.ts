import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// ─────────────────────────────────────────────────────────────────────────────
// Rate limiting distribuido (Upstash Redis) con fallback en memoria para dev.
//
// En serverless (Vercel) cada instancia tiene su propia memoria y se recicla en
// cada cold start, por lo que un Map local NO es un límite real. Cuando
// UPSTASH_REDIS_REST_URL / _TOKEN están configuradas, el límite es distribuido y
// persistente. Si no lo están, se usa memoria y se avisa una vez (solo válido
// para desarrollo local).
// ─────────────────────────────────────────────────────────────────────────────

const limiters = new Map<string, Ratelimit>()

function upstashLimiter(limit: number, windowMs: number): Ratelimit | null {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  const key = `${limit}:${windowMs}`
  let limiter = limiters.get(key)
  if (!limiter) {
    limiter = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(limit, `${windowMs} ms`),
      prefix: 'aecmi-rl',
      analytics: false,
    })
    limiters.set(key, limiter)
  }
  return limiter
}

// ── Fallback en memoria ──────────────────────────────────────────────────────
const memStore = new Map<string, number[]>()
let warned = false

function memoryLimit(identifier: string, limit: number, windowMs: number): boolean {
  if (!warned && process.env.NODE_ENV === 'production') {
    console.warn(
      '[rateLimit] ⚠️ Upstash no configurado; usando límite EN MEMORIA no distribuido. ' +
      'Configura UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN en producción.'
    )
    warned = true
  }
  const now = Date.now()
  const attempts = (memStore.get(identifier) ?? []).filter((t) => now - t < windowMs)
  if (attempts.length >= limit) {
    memStore.set(identifier, attempts)
    return false
  }
  attempts.push(now)
  memStore.set(identifier, attempts)
  // Poda oportunista para evitar crecimiento ilimitado del Map.
  if (memStore.size > 10_000) {
    for (const [k, v] of memStore) {
      if (v.every((t) => now - t >= windowMs)) memStore.delete(k)
    }
  }
  return true
}

/**
 * Devuelve `true` si la petición está DENTRO del límite, `false` si se excede.
 * Es asíncrono porque Upstash requiere una llamada de red.
 */
export async function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60 * 60 * 1000
): Promise<boolean> {
  const limiter = upstashLimiter(limit, windowMs)
  if (limiter) {
    try {
      const { success } = await limiter.limit(identifier)
      return success
    } catch (err) {
      // Si Redis falla, no bloqueamos el servicio; caemos a memoria.
      console.error('[rateLimit] Upstash error, fallback a memoria:', err)
      return memoryLimit(identifier, limit, windowMs)
    }
  }
  return memoryLimit(identifier, limit, windowMs)
}

/**
 * Deriva la IP del cliente de forma resistente a falsificación.
 *
 * `x-forwarded-for` puede ser falsificado por el cliente prependando valores, así
 * que NO usamos su primer elemento. Preferimos `x-real-ip` (lo fija la plataforma
 * —Vercel— con la IP de conexión real) y, en su defecto, el ÚLTIMO valor de XFF,
 * que es el que añade el proxy de confianza más cercano al servidor.
 *
 * Asunción: despliegue detrás de un único proxy de confianza (Vercel). Si hay
 * más saltos, ajusta el índice según la topología real.
 */
export function getClientIp(req: Request): string {
  const realIp = req.headers.get('x-real-ip')
  if (realIp?.trim()) return realIp.trim()

  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    const parts = xff.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length) return parts[parts.length - 1]
  }
  return 'unknown'
}
