// Aplica un .sql a PRODUCCIÓN (con guardaraíl anti-staging). Uso:
//   node scripts/prodops/apply_sql_prod.mjs <archivo.sql>
import { readFileSync } from 'node:fs'
import { newProdClient, PROD_REF } from '../sectests/_db_prod.mjs'

const file = process.argv[2]
if (!file) { console.error('Uso: apply_sql_prod.mjs <archivo.sql>'); process.exit(2) }

const sql = readFileSync(file, 'utf8')
const c = newProdClient()
await c.connect()
console.log(`Aplicando ${file} en PROD (ref ${PROD_REF})...`)
try {
  await c.query(sql)
  console.log('✅ Aplicado.')
} catch (e) {
  console.error('❌ Error:', e.message, e.position ? `(pos ${e.position})` : '')
  process.exitCode = 1
} finally {
  await c.end()
}
