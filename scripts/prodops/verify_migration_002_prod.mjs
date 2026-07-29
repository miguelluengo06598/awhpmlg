// Verificación de migration_002 en PROD: state assertions (solo lectura) + prueba
// de escalada y de edición de perfil sobre un usuario REAL existente, SIEMPRE
// dentro de transacciones con ROLLBACK (no persiste ningún cambio).
import { newProdClient, PROD_REF } from '../sectests/_db_prod.mjs'

const c = newProdClient()
const results = []
const check = (n, ok, d) => { results.push({ ok }); console.log(`  ${ok ? '✅ PASS' : '❌ FAIL'} — ${n}${d ? ' | ' + d : ''}`) }

await c.connect()
console.log(`\n🔎 Verificación migration_002 en PROD (ref ${PROD_REF})\n`)

// --- State assertions (solo lectura) ---
const pol = await c.query(`SELECT policyname, cmd FROM pg_policies WHERE tablename='users'`)
check('política "users: trigger inserta" eliminada', !pol.rows.some(r => r.policyname === 'users: trigger inserta'))
check('sin política INSERT en users', pol.rows.filter(r => r.cmd === 'INSERT').length === 0)

const expected = ['bio', 'company', 'country', 'first_name', 'last_name', 'phone', 'profile_picture_url']
const authCols = (await c.query(
  `SELECT column_name FROM information_schema.column_privileges
   WHERE table_schema='public' AND table_name='users' AND grantee='authenticated'
     AND privilege_type='UPDATE' ORDER BY column_name`)).rows.map(r => r.column_name)
check('authenticated UPDATE solo columnas de perfil', JSON.stringify(authCols) === JSON.stringify(expected), `[${authCols.join(', ')}]`)
check('role/is_active NO actualizables por authenticated', !authCols.includes('role') && !authCols.includes('is_active'))

const anonCols = (await c.query(
  `SELECT column_name FROM information_schema.column_privileges
   WHERE table_schema='public' AND table_name='users' AND grantee='anon' AND privilege_type='UPDATE'`)).rows
check('anon sin UPDATE en users', anonCols.length === 0, `cols=${anonCols.length}`)

check('trigger guard presente', (await c.query(`SELECT 1 FROM pg_trigger WHERE tgrelid='public.users'::regclass AND tgname='trg_users_guard_self_update'`)).rowCount === 1)
check('función enforce_user_self_update presente', (await c.query(`SELECT 1 FROM pg_proc WHERE proname='enforce_user_self_update'`)).rowCount === 1)
const src = (await c.query(`SELECT pg_get_functiondef('public.handle_new_user'::regproc) d`)).rows[0].d
check('handle_new_user NO lee role de metadata', !src.includes("raw_user_meta_data->>'role'"))
check('handle_new_user fuerza client + guard ON CONFLICT', src.includes("'client'") && /role\s*=\s*'client'/.test(src))

// --- Pruebas dinámicas sobre un usuario REAL (ROLLBACK garantizado) ---
const victim = (await c.query(`SELECT id, first_name FROM public.users WHERE role <> 'admin' AND id IS NOT NULL LIMIT 1`)).rows[0]
if (!victim) {
  check('usuario no-admin de prueba disponible', false, 'no hay usuarios no-admin')
} else {
  // (a) Escalada: no debe poder auto-promocionarse
  let escalated = null, escErr = null
  await c.query('BEGIN')
  try {
    await c.query(`SELECT set_config('request.jwt.claim.sub',$1,true)`, [victim.id])
    await c.query('SET LOCAL role authenticated')
    await c.query(`UPDATE public.users SET role='admin' WHERE id=$1`, [victim.id])
    escalated = true
  } catch (e) { escErr = e.code }
  finally { await c.query('ROLLBACK') }
  check('usuario real NO puede auto-promocionarse a admin', escalated === null, escErr ? `rechazado ${escErr}` : '⚠️ escaló')

  // (b) Edición de perfil: sí debe poder (columna permitida)
  let profOk = false, profErr = null
  await c.query('BEGIN')
  try {
    await c.query(`SELECT set_config('request.jwt.claim.sub',$1,true)`, [victim.id])
    await c.query('SET LOCAL role authenticated')
    const r = await c.query(`UPDATE public.users SET first_name=first_name WHERE id=$1`, [victim.id])
    profOk = r.rowCount === 1
  } catch (e) { profErr = e.message }
  finally { await c.query('ROLLBACK') }
  check('usuario real SÍ puede editar su perfil (first_name)', profOk, profErr ?? 'ok (rolled back)')
}

await c.end()
const failed = results.filter(r => !r.ok)
console.log(`\n──────── ${results.length - failed.length}/${results.length} PASS ────────\n`)
process.exit(failed.length ? 1 : 0)
