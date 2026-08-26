// Aplica migration_004 (eliminar política SELECT pública de certificates) de forma
// AUTO-VERIFICANTE contra producción, con rollback automático si algo falla:
//   1. Comprueba que la política permisiva existe.
//   2. fetch al endpoint público por código (baseline) usando un cert real.
//   3. DROP de la política.
//   4. fetch de nuevo: si sigue funcionando -> el código service_role está vivo (OK).
//                      si falla          -> RECREA la política (rollback) y aborta.
//   5. Verifica por DB (solo lectura) que anon ya no ve certificados.
//
//   node scripts/prodops/apply_migration_004_safe.mjs https://www.aecmi.es
import { newProdClient, PROD_REF } from '../sectests/_db_prod.mjs'

const domain = (process.argv[2] || '').replace(/\/+$/, '')
if (!/^https?:\/\//.test(domain)) {
  console.error('Uso: node scripts/prodops/apply_migration_004_safe.mjs <https://tu-dominio>')
  process.exit(2)
}

const POLICY = 'Anyone can view certificate by qr_code'
const DROP_SQL = `DROP POLICY IF EXISTS "${POLICY}" ON public.certificates;`
const RECREATE_SQL = `CREATE POLICY "${POLICY}" ON public.certificates FOR SELECT USING (true);`

const c = newProdClient()
await c.connect()
console.log(`\n🔐 migration_004 auto-verificante (PROD ${PROD_REF}) vía ${domain}\n`)

async function verifyEndpoint(code) {
  const url = `${domain}/api/certificate/${encodeURIComponent(code)}?_=${Date.now()}`
  try {
    const r = await fetch(url, { cache: 'no-store', headers: { 'cache-control': 'no-cache' } })
    const body = await r.json().catch(() => ({}))
    return { ok: r.ok && !!body?.certificate, status: r.status, body }
  } catch (e) {
    return { ok: false, status: 0, error: e.message }
  }
}

try {
  // 1. ¿existe la política?
  const exists = (await c.query(
    `SELECT 1 FROM pg_policies WHERE tablename='certificates' AND policyname=$1`, [POLICY])).rowCount === 1
  if (!exists) {
    console.log('ℹ️  La política permisiva ya no existe. Nada que hacer (¿ya aplicado?).')
    process.exit(0)
  }

  // cert real para probar el endpoint
  const code = (await c.query(
    `SELECT certification_code FROM public.certificates WHERE status='active' LIMIT 1`)).rows[0]?.certification_code
  if (!code) { console.error('❌ No hay certificados activos para probar el endpoint.'); process.exit(1) }
  console.log('Certificado de prueba:', code)

  // 2. baseline
  const before = await verifyEndpoint(code)
  console.log(`Baseline (con política): ${before.ok ? '✅ endpoint OK' : '⚠️ endpoint NO responde'} [status ${before.status}]`)
  if (!before.ok) {
    console.error('❌ El endpoint no funciona ni con la política. Aborta sin tocar nada (revisa el deploy).')
    process.exit(1)
  }

  // 3. DROP
  console.log('→ Eliminando la política permisiva...')
  await c.query(DROP_SQL)

  // pequeña espera para propagación a la capa serverless
  await new Promise((r) => setTimeout(r, 2500))

  // 4. re-verificar
  const after = await verifyEndpoint(code)
  if (!after.ok) {
    console.error(`❌ El endpoint FALLA tras el drop [status ${after.status}] → el código service_role NO está vivo.`)
    console.error('→ ROLLBACK: recreando la política...')
    await c.query(RECREATE_SQL)
    console.error('✅ Política recreada. Producción intacta. Revisa/redeploy y reintenta.')
    process.exit(1)
  }
  console.log('✅ El endpoint SIGUE funcionando tras el drop → verificación pública usa service_role.')

  // 5. anon ya no ve nada (solo lectura)
  await c.query('BEGIN')
  let anonSees
  try {
    await c.query('SET LOCAL role anon')
    anonSees = (await c.query('SELECT count(*)::int n FROM public.certificates')).rows[0].n
  } finally { await c.query('ROLLBACK') }
  console.log(`Anónimo ve certificados ahora: ${anonSees} ${anonSees === 0 ? '✅ (exposición cerrada)' : '⚠️'}`)

  console.log(anonSees === 0
    ? '\n🎉 #4/#14 CERRADA: anon no ve nada, verificación pública OK.\n'
    : '\n⚠️ anon aún ve filas; revisa si quedan otras políticas permisivas.\n')
} finally {
  await c.end()
}
