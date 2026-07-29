// Conexión a PRODUCCIÓN. Lee PROD_DATABASE_URL de .env.production (gitignored).
// Guardaraíl: aborta si el ref coincide con el de STAGING (ycqtzbrnvjetgzscpugo)
// para no ejecutar operaciones "de prod" contra staging por un pegado erróneo.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pg from 'pg'

const STAGING_REF = 'ycqtzbrnvjetgzscpugo'
const here = dirname(fileURLToPath(import.meta.url))
const envPath = join(here, '..', '..', '.env.production')

function parseEnv(text) {
  const out = {}
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    out[line.slice(0, eq).trim()] = line.slice(eq + 1).trim()
  }
  return out
}

let url
try {
  url = parseEnv(readFileSync(envPath, 'utf8')).PROD_DATABASE_URL
} catch {
  console.error('❌ No existe .env.production. Añade una línea:\n   PROD_DATABASE_URL=postgresql://...')
  process.exit(2)
}
if (!url) { console.error('❌ Falta PROD_DATABASE_URL en .env.production'); process.exit(2) }

const refMatch = url.match(/postgres\.([a-z0-9]+):/) || url.match(/\/\/([a-z0-9]+)\./)
export const PROD_REF = refMatch ? refMatch[1] : '(desconocido)'

if (PROD_REF === STAGING_REF) {
  console.error(`❌ ABORTO: PROD_DATABASE_URL apunta al ref de STAGING (${STAGING_REF}). Corrige .env.production.`)
  process.exit(3)
}

export function newProdClient() {
  return new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } })
}
