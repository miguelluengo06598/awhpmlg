// Helper de conexión Postgres directa para aplicar DDL y correr tests SQL.
// Lee DATABASE_URL de .env.test (proyecto STAGING desechable).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pg from 'pg'

const here = dirname(fileURLToPath(import.meta.url))
const envPath = join(here, '..', '..', '.env.test')

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

const env = parseEnv(readFileSync(envPath, 'utf8'))
export const DATABASE_URL = env.DATABASE_URL
if (!DATABASE_URL) {
  console.error('❌ Falta DATABASE_URL en .env.test')
  process.exit(2)
}

export function newClient() {
  return new pg.Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
}
