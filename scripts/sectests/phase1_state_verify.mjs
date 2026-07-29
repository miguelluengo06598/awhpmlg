// Verificación de ESTADO de migration_002 + vector anónimo. Confirma que el
// esquema quedó exactamente como se diseñó (no solo que los exploits fallan).
//   node scripts/sectests/phase1_state_verify.mjs
import { randomUUID } from 'node:crypto'
import { newClient } from './_db.mjs'

const c = newClient()
const results = []
const check = (n, ok, d) => { results.push({ n, ok }); console.log(`  ${ok ? '✅ PASS' : '❌ FAIL'} — ${n}${d ? ' | ' + d : ''}`) }

async function main() {
  await c.connect()
  console.log('\n🔎 Verificación de estado (migration_002)\n')

  // 1. Política INSERT abierta eliminada
  const pol = await c.query(`SELECT policyname, cmd FROM pg_policies WHERE tablename='users'`)
  const hasOpenInsert = pol.rows.some(r => r.policyname === 'users: trigger inserta')
  const insertPolicies = pol.rows.filter(r => r.cmd === 'INSERT')
  check('política "users: trigger inserta" eliminada', !hasOpenInsert)
  check('no hay ninguna política INSERT permisiva en users', insertPolicies.length === 0,
    `policies INSERT = ${insertPolicies.length}`)

  // 2. Column-grants de UPDATE para authenticated
  const expected = ['bio', 'company', 'country', 'first_name', 'last_name', 'phone', 'profile_picture_url']
  const authCols = (await c.query(
    `SELECT column_name FROM information_schema.column_privileges
     WHERE table_schema='public' AND table_name='users' AND grantee='authenticated'
       AND privilege_type='UPDATE' ORDER BY column_name`)).rows.map(r => r.column_name)
  const setEq = JSON.stringify(authCols) === JSON.stringify(expected)
  check('authenticated: UPDATE solo en columnas de perfil', setEq, `[${authCols.join(', ')}]`)
  check('authenticated: role/is_active NO actualizables',
    !authCols.includes('role') && !authCols.includes('is_active'))

  // 3. anon sin UPDATE
  const anonCols = (await c.query(
    `SELECT column_name FROM information_schema.column_privileges
     WHERE table_schema='public' AND table_name='users' AND grantee='anon'
       AND privilege_type='UPDATE'`)).rows.map(r => r.column_name)
  check('anon: sin privilegios de UPDATE en users', anonCols.length === 0, `cols=${anonCols.length}`)

  // 4. Trigger guard + función
  const tg = await c.query(
    `SELECT 1 FROM pg_trigger WHERE tgrelid='public.users'::regclass AND tgname='trg_users_guard_self_update'`)
  check('trigger trg_users_guard_self_update presente', tg.rowCount === 1)
  const fn = await c.query(`SELECT 1 FROM pg_proc WHERE proname='enforce_user_self_update'`)
  check('función enforce_user_self_update presente', fn.rowCount === 1)

  // 5. Trigger handle_new_user endurecido
  const src = (await c.query(`SELECT pg_get_functiondef('public.handle_new_user'::regproc) AS d`)).rows[0].d
  check('handle_new_user NO lee role de metadata', !src.includes("raw_user_meta_data->>'role'"))
  check('handle_new_user fuerza client + guard ON CONFLICT',
    src.includes("'client'") && /role\s*=\s*'client'/.test(src))

  // 6. VECTOR ANÓNIMO — un usuario NO autenticado no puede insertar ni escalar
  async function asAnon(sql, params = []) {
    await c.query('BEGIN')
    try { await c.query('SET LOCAL role anon'); const r = await c.query(sql, params); await c.query('COMMIT'); return { ok: true, rowCount: r.rowCount } }
    catch (e) { await c.query('ROLLBACK'); return { ok: false, code: e.code } }
  }
  const anonIns = await asAnon(`INSERT INTO public.users (id, email, role) VALUES ($1,$2,'admin')`,
    [randomUUID(), `sectest_anon_${Date.now()}@sectest.example.com`])
  check('anon: INSERT en users rechazado', !anonIns.ok, anonIns.code ? `code ${anonIns.code}` : '')
  const anonUpd = await asAnon(`UPDATE public.users SET role='admin' WHERE role='client'`)
  check('anon: UPDATE de role rechazado', !anonUpd.ok || anonUpd.rowCount === 0,
    anonUpd.ok ? `filas=${anonUpd.rowCount}` : `code ${anonUpd.code}`)

  await c.end()
  const failed = results.filter(r => !r.ok)
  console.log(`\n──────── ${results.length - failed.length}/${results.length} PASS ────────\n`)
  process.exit(failed.length ? 1 : 0)
}
main()
