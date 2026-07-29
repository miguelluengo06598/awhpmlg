// Aleatoriedad criptográficamente segura, isomórfica (server y navegador).
// Usa la Web Crypto API (crypto.getRandomValues), disponible en Node 19+ y en
// todos los navegadores modernos. NO usar Math.random() para identificadores que
// deban ser impredecibles (códigos de certificado, tokens, etc.).

// Alfabeto sin minúsculas para evitar ambigüedad al transcribir códigos.
const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // 36 símbolos

/**
 * Cadena alfanumérica en mayúsculas de longitud `length`, con muestreo por
 * rechazo para eliminar el sesgo de módulo (distribución uniforme real).
 */
export function randomAlphanumeric(length: number): string {
  if (length <= 0) return ''
  const chars = ALPHANUMERIC
  const max = 256 - (256 % chars.length) // descarta bytes >= max (evita sesgo)
  const out: string[] = []
  const buf = new Uint8Array(1)
  while (out.length < length) {
    crypto.getRandomValues(buf)
    if (buf[0] < max) out.push(chars[buf[0] % chars.length])
  }
  return out.join('')
}
