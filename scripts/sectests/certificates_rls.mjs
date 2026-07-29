// Verifica el aislamiento RLS de public.certificates (migration_003).
//   node scripts/sectests/certificates_rls.mjs
import { randomUUID } from 'node:crypto'
import { newClient } from './_db.mjs'

const c = newClient()
const results = []
const check = (n, ok, d) => { results.push({ ok }); console.log(`  ${ok ? '✅ PASS' : '❌ FAIL'} — ${n}${d ? ' | ' + d : ''}`) }
const email = (t) => `sectest_cert_${t}_${Date.now()}_${Math.floor(Math.random() * 1e5)}@sectest.example.com`

async function mkUser(admin = false) {
  const id = randomUUID()
  await c.query(`INSERT INTO auth.users (id, email) VALUES ($1,$2)`, [id, email('u')])
  if (admin) await c.query(`UPDATE public.users SET role='admin' WHERE id=$1`, [id]) // vía owner (bypass)
  return id
}
async function mkCert(userId) {
  const id = randomUUID()
  await c.query(
    `INSERT INTO public.certificates (id, certification_type, certification_code, full_name, email, user_id)
     VALUES ($1,'IDM',$2,'Test User',$3,$4)`,
    [id, `IDM-2026-${randomUUID().slice(0, 8).toUpperCase()}`, email('c'), userId])
  return id
}
// SELECT count(*) sobre certificates bajo un rol/identidad dados.
async function countAs(role, sub) {
  await c.query('BEGIN')
  try {
    if (sub) await c.query(`SELECT set_config('request.jwt.claim.sub',$1,true)`, [sub])
    await c.query(`SET LOCAL role ${role}`)
    const r = await c.query(`SELECT count(*)::int n FROM public.certificates`)
    await c.query('COMMIT')
    return r.rows[0].n
  } catch (e) { await c.query('ROLLBACK'); return `ERR:${e.code}` }
}

async function main() {
  await c.connect()
  console.log('\n🔒 RLS de certificates (migration_003)\n')
  const A = await mkUser(), B = await mkUser(), ADM = await mkUser(true)
  await mkCert(A); await mkCert(B) // 1 cert de A, 1 de B

  const asA = await countAs('authenticated', A)
  check('usuario A ve SOLO su certificado', asA === 1, `ve ${asA}`)

  const asAnon = await countAs('anon', null)
  check('anon no ve ningún certificado', asAnon === 0, `ve ${asAnon}`)

  const asAdmin = await countAs('authenticated', ADM)
  check('admin ve todos (>=2)', typeof asAdmin === 'number' && asAdmin >= 2, `ve ${asAdmin}`)

  const asSvc = await countAs('service_role', null)
  check('service_role (API) ve todos (>=2)', typeof asSvc === 'number' && asSvc >= 2, `ve ${asSvc}`)

  // Un usuario NO puede ver el certificado de otro por id directo
  const bCert = (await c.query(`SELECT id FROM public.certificates WHERE user_id=$1`, [B])).rows[0].id
  await c.query('BEGIN')
  await c.query(`SELECT set_config('request.jwt.claim.sub',$1,true)`, [A])
  await c.query('SET LOCAL role authenticated')
  const cross = (await c.query(`SELECT count(*)::int n FROM public.certificates WHERE id=$1`, [bCert])).rows[0].n
  await c.query('COMMIT')
  check('usuario A NO puede leer el certificado de B por id', cross === 0, `ve ${cross}`)

  // limpieza
  await c.query(`DELETE FROM auth.users WHERE id = ANY($1::uuid[])`, [[A, B, ADM]])
  await c.query(`DELETE FROM public.certificates WHERE email LIKE 'sectest_cert_%'`)

  await c.end()
  const failed = results.filter(r => !r.ok)
  console.log(`\n──────── ${results.length - failed.length}/${results.length} PASS ────────\n`)
  process.exit(failed.length ? 1 : 0)
}
main()
