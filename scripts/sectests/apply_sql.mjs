// Aplica un archivo .sql a la BD de staging. Uso: node apply_sql.mjs <ruta>
import { readFileSync } from 'node:fs'
import { newClient } from './_db.mjs'

const file = process.argv[2]
if (!file) { console.error('Uso: node apply_sql.mjs <archivo.sql>'); process.exit(2) }

const sql = readFileSync(file, 'utf8')
const c = newClient()
await c.connect()
try {
  await c.query(sql)
  console.log(`✅ Aplicado: ${file}`)
} catch (e) {
  console.error(`❌ Error aplicando ${file}:`)
  console.error('  ', e.message)
  if (e.position) console.error('   posición:', e.position)
  process.exitCode = 1
} finally {
  await c.end()
}
