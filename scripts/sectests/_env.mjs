// Carga variables desde .env.test (proyecto Supabase de STAGING/DEV, nunca producción).
// Uso: import { env } from './_env.mjs'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const envPath = join(here, '..', '..', '.env.test')

function parseEnv(text) {
  const out = {}
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let val = line.slice(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    out[key] = val
  }
  return out
}

let parsed
try {
  parsed = parseEnv(readFileSync(envPath, 'utf8'))
} catch {
  console.error('\n❌ No se encontró .env.test en la raíz del proyecto.')
  console.error('   Crea .env.test con las claves de tu proyecto de STAGING/DEV:')
  console.error('     NEXT_PUBLIC_SUPABASE_URL=https://<staging-ref>.supabase.co')
  console.error('     NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>')
  console.error('     SUPABASE_SERVICE_ROLE_KEY=<service role key>')
  console.error('   ⚠️  NO uses las claves de producción aquí.\n')
  process.exit(2)
}

const url = parsed.NEXT_PUBLIC_SUPABASE_URL
const anon = parsed.NEXT_PUBLIC_SUPABASE_ANON_KEY
const service = parsed.SUPABASE_SERVICE_ROLE_KEY

if (!url || !anon || !service) {
  console.error('\n❌ .env.test incompleto. Faltan una o más de:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY\n')
  process.exit(2)
}

export const env = { url, anon, service }
