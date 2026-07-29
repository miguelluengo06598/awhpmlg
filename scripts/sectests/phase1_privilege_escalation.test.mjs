// ═══════════════════════════════════════════════════════════════════════════════
// TEST DE EXPLOTACIÓN — FASE 1: escalada de privilegios a admin
// ═══════════════════════════════════════════════════════════════════════════════
// Ejecuta las TRES escaladas reales contra el proyecto de STAGING configurado en
// .env.test y verifica que ahora FALLAN. Antes de aplicar migration_002 estos
// tests deben quedar en ROJO (demuestran la vuln); después, en VERDE.
//
//   node scripts/sectests/phase1_privilege_escalation.test.mjs
//
// Crea usuarios efímeros con prefijo `sectest+...@` y los elimina al terminar.
// ⚠️  Apúntalo SOLO a un proyecto no productivo.
// ═══════════════════════════════════════════════════════════════════════════════
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'node:crypto'
import { env } from './_env.mjs'

const admin = createClient(env.url, env.service, { auth: { persistSession: false } })

const created = [] // ids de auth.users a limpiar
const results = []
function record(name, passed, detail) {
  results.push({ name, passed, detail })
  console.log(`  ${passed ? '✅ PASS' : '❌ FAIL'} — ${name}`)
  if (detail) console.log(`         ${detail}`)
}

function testEmail() {
  return `sectest+${Date.now()}_${Math.floor(Math.random() * 1e6)}@sectest.example.com`
}
const PASSWORD = 'S3ctest!' + randomUUID()

async function makeConfirmedUser(meta = {}) {
  const email = testEmail()
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password: PASSWORD,
    email_confirm: true,
    user_metadata: meta,
  })
  if (error) throw new Error(`createUser falló: ${error.message}`)
  created.push(data.user.id)
  return { id: data.user.id, email }
}

async function profileRole(id) {
  const { data, error } = await admin.from('users').select('role, is_active').eq('id', id).single()
  if (error) throw new Error(`lectura de perfil falló: ${error.message}`)
  return data
}

// ── #1 — signUp con role=admin en user_metadata no debe producir un admin ──────
async function test1_signupRoleInjection() {
  // Simula exactamente lo que haría un atacante desde el navegador.
  const { id } = await makeConfirmedUser({ role: 'admin', first_name: 'Mal', last_name: 'Actor' })
  // El trigger AFTER INSERT ya habrá creado la fila en public.users.
  const prof = await profileRole(id)
  record(
    '#1 signUp con user_metadata.role=admin → perfil queda como client',
    prof.role === 'client',
    `role resultante = "${prof.role}" (esperado "client")`,
  )
}

// ── #2 — un usuario autenticado no puede auto-promocionarse vía UPDATE ─────────
async function test2_selfUpdateRole() {
  const { id, email } = await makeConfirmedUser()
  const asUser = createClient(env.url, env.anon, { auth: { persistSession: false } })
  const { error: signInErr } = await asUser.auth.signInWithPassword({ email, password: PASSWORD })
  if (signInErr) throw new Error(`signIn falló: ${signInErr.message}`)

  // Intento de escalada: cambiar mi propia fila a admin.
  const { error: updErr } = await asUser.from('users').update({ role: 'admin', is_active: true }).eq('id', id)

  // Verificación autoritativa con service_role (bypass RLS).
  const prof = await profileRole(id)
  const blocked = prof.role === 'client'
  record(
    '#2 UPDATE role=admin sobre la propia fila → rechazado / sin efecto',
    blocked,
    blocked
      ? `role sigue "client"${updErr ? ` (update devolvió error: ${updErr.code ?? updErr.message})` : ' (update silenciosamente sin efecto por column-grant)'}`
      : `⚠️ role escaló a "${prof.role}"`,
  )
  await asUser.auth.signOut()
}

// ── #3a — un usuario autenticado no puede INSERT una fila admin arbitraria ─────
async function test3a_directInsert() {
  const { email } = await makeConfirmedUser()
  const asUser = createClient(env.url, env.anon, { auth: { persistSession: false } })
  const { error: signInErr } = await asUser.auth.signInWithPassword({ email, password: PASSWORD })
  if (signInErr) throw new Error(`signIn falló: ${signInErr.message}`)

  const fakeId = randomUUID()
  const { error: insErr } = await asUser
    .from('users')
    .insert({ id: fakeId, email: `sectest+inj_${Date.now()}@sectest.example.com`, role: 'admin' })

  // Debe fallar por RLS. Confirmamos además que la fila no existe.
  const { data: leaked } = await admin.from('users').select('id').eq('id', fakeId).maybeSingle()
  const blocked = !!insErr && !leaked
  record(
    '#3a INSERT directo de fila con role=admin → rechazado por RLS',
    blocked,
    insErr ? `insert rechazado (${insErr.code ?? insErr.message})` : '⚠️ el INSERT fue aceptado',
  )
  if (leaked) await admin.from('users').delete().eq('id', fakeId)
  await asUser.auth.signOut()
}

// ── #3b — placeholder admin no puede ser secuestrado registrándose con su email ─
async function test3b_placeholderHijack() {
  // Simula un placeholder admin sembrado en public.users SIN cuenta auth.
  const placeholderEmail = `sectest+ph_${Date.now()}@sectest.example.com`
  const placeholderId = randomUUID()
  const { error: seedErr } = await admin
    .from('users')
    .insert({ id: placeholderId, email: placeholderEmail, role: 'admin', first_name: 'Ghost', last_name: 'Admin' })
  if (seedErr) {
    record('#3b placeholder-hijack (setup)', false, `no se pudo sembrar placeholder: ${seedErr.message}`)
    return
  }

  // El atacante se registra con el email del placeholder.
  const { data: signUp, error: suErr } = await admin.auth.admin.createUser({
    email: placeholderEmail,
    password: PASSWORD,
    email_confirm: true,
  })
  if (suErr) {
    // Aceptable: si el email colisiona el registro puede rechazarse. No hay secuestro.
    record('#3b registro con email de placeholder admin → no hereda admin', true, `registro rechazado (${suErr.message})`)
    await admin.from('users').delete().eq('id', placeholderId)
    return
  }
  created.push(signUp.user.id)

  // ¿La cuenta del atacante quedó vinculada a un perfil admin?
  const { data: attackerProfile } = await admin
    .from('users').select('id, role').eq('id', signUp.user.id).maybeSingle()
  // El placeholder no debe haber sido secuestrado (sigue con su id original).
  const { data: placeholderStill } = await admin
    .from('users').select('id, role').eq('id', placeholderId).maybeSingle()

  const attackerIsAdmin = attackerProfile?.role === 'admin'
  const hijacked = !placeholderStill // el placeholder desapareció = fue secuestrado
  const passed = !attackerIsAdmin && !hijacked
  record(
    '#3b registro con email de placeholder admin → no hereda admin',
    passed,
    passed
      ? 'la cuenta nueva no obtuvo role=admin y el placeholder no fue secuestrado'
      : `⚠️ attackerRole=${attackerProfile?.role ?? 'none'} hijacked=${hijacked}`,
  )
  await admin.from('users').delete().eq('id', placeholderId)
}

async function cleanup() {
  for (const id of created) {
    try { await admin.auth.admin.deleteUser(id) } catch { /* best effort */ }
  }
  // Barrido por si quedaron filas sectest huérfanas en public.users.
  await admin.from('users').delete().like('email', 'sectest+%@sectest.example.com')
}

async function main() {
  console.log('\n🔒 FASE 1 — tests de escalada de privilegios (proyecto:', env.url + ')\n')
  try {
    await test1_signupRoleInjection()
    await test2_selfUpdateRole()
    await test3a_directInsert()
    await test3b_placeholderHijack()
  } catch (e) {
    console.error('\n💥 Error inesperado durante los tests:', e.message)
    record('ejecución completa sin errores de infraestructura', false, e.message)
  } finally {
    await cleanup()
  }

  const failed = results.filter((r) => !r.passed)
  console.log(`\n──────── ${results.length - failed.length}/${results.length} PASS ────────`)
  if (failed.length) {
    console.log('\n❌ FASE 1 NO superada. Aplica database_migrations/migration_002_fix_privilege_escalation.sql')
    console.log('   en el SQL Editor de Supabase y vuelve a ejecutar.\n')
    process.exit(1)
  }
  console.log('\n✅ FASE 1 superada: las tres vías de escalada están cerradas.\n')
  process.exit(0)
}

main()
