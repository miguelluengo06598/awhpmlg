const store = new Map<string, number[]>()

export function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60 * 60 * 1000
): boolean {
  const now = Date.now()
  const attempts = (store.get(identifier) ?? []).filter((t) => now - t < windowMs)

  if (attempts.length >= limit) return false

  attempts.push(now)
  store.set(identifier, attempts)
  return true
}
