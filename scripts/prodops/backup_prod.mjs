// PASO 1 — Backup lógico (solo lectura) de las tablas a modificar en producción:
// estructura de columnas, constraints, políticas RLS, grants, defs de funciones/
// triggers relevantes y conteo de filas. Guarda un .json y un .sql de reversión
// parcial en prod_backups/. NO modifica nada.
//   node scripts/prodops/backup_prod.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { newProdClient, PROD_REF } from '../sectests/_db_prod.mjs'

const TABLES = ['users', 'certificates', 'certificate_renewals']
const c = newProdClient()
await c.connect()

console.log(`\n🗄️  Backup de PRODUCCIÓN (ref: ${PROD_REF})\n`)
const snap = { ref: PROD_REF, takenAt: new Date().toISOString(), tables: {} }

for (const t of TABLES) {
  const reg = (await c.query(`SELECT to_regclass($1) AS r`, ['public.' + t])).rows[0].r
  if (!reg) { snap.tables[t] = { exists: false }; console.log(`  ${t}: NO existe`); continue }
  const columns = (await c.query(
    `SELECT column_name, data_type, is_nullable, column_default
     FROM information_schema.columns
     WHERE table_schema='public' AND table_name=$1 ORDER BY ordinal_position`, [t])).rows
  const rls = (await c.query(`SELECT relrowsecurity FROM pg_class WHERE oid=$1::regclass`, ['public.' + t])).rows[0].relrowsecurity
  const policies = (await c.query(
    `SELECT policyname, cmd, roles::text, qual, with_check FROM pg_policies WHERE tablename=$1`, [t])).rows
  const grants = (await c.query(
    `SELECT grantee, privilege_type FROM information_schema.role_table_grants
     WHERE table_schema='public' AND table_name=$1 AND grantee IN ('anon','authenticated','service_role')
     ORDER BY grantee, privilege_type`, [t])).rows
  const colGrants = (await c.query(
    `SELECT grantee, column_name, privilege_type FROM information_schema.column_privileges
     WHERE table_schema='public' AND table_name=$1 AND grantee IN ('anon','authenticated')
       AND privilege_type='UPDATE' ORDER BY grantee, column_name`, [t])).rows
  const count = (await c.query(`SELECT count(*)::int n FROM public.${t}`)).rows[0].n
  snap.tables[t] = { exists: true, rls, count, columns, policies, grants, colGrants }
  console.log(`  ${t}: ${count} filas | RLS=${rls} | ${columns.length} columnas | ${policies.length} políticas`)
}

// Definiciones de funciones/triggers que migration_002 sustituye (para revertir).
const funcs = {}
for (const fn of ['handle_new_user', 'is_admin', 'enforce_user_self_update']) {
  const r = await c.query(`SELECT pg_get_functiondef(p.oid) d FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.proname=$1`, [fn]).catch(() => ({ rows: [] }))
  funcs[fn] = r.rows[0]?.d ?? null
}
snap.functions = funcs
const trigs = (await c.query(
  `SELECT tgname, pg_get_triggerdef(t.oid) d FROM pg_trigger t
   WHERE tgrelid='public.users'::regclass AND NOT tgisinternal`)).rows
snap.triggers_users = trigs

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'prod_backups')
mkdirSync(outDir, { recursive: true })
const stamp = new Date().toISOString().replace(/[:.]/g, '-')
const file = join(outDir, `prod_backup_${PROD_REF}_${stamp}.json`)
writeFileSync(file, JSON.stringify(snap, null, 2))
console.log(`\n✅ Backup guardado en: ${file}\n`)
await c.end()
