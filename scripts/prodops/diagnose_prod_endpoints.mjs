// Diagnóstico SOLO LECTURA del fallo de verificación en producción.
//   node scripts/prodops/diagnose_prod_endpoints.mjs https://aecomi.org
import { newProdClient, PROD_REF } from '../sectests/_db_prod.mjs'

const domain = (process.argv[2] || 'https://aecomi.org').replace(/\/+$/, '')
const CODE = 'IDM-2026-4636'
const ID = '48acfa6d-4c00-4a0c-b92b-7b5cff246266'

const c = newProdClient()
await c.connect()
console.log(`\n🩺 Diagnóstico — BD operada: ${PROD_REF} | dominio: ${domain}\n`)

// 1) ¿Existen los certs en la BD que operé?
const byCode = (await c.query(`SELECT id, certification_code, status, user_id FROM public.certificates WHERE certification_code=$1`, [CODE])).rows
const byId = (await c.query(`SELECT id, certification_code, status FROM public.certificates WHERE id=$1`, [ID])).rows
console.log('1) En la BD', PROD_REF + ':')
console.log('   por código', CODE, '→', byCode.length ? JSON.stringify(byCode[0]) : 'NO EXISTE')
console.log('   por id    ', ID, '→', byId.length ? JSON.stringify(byId[0]) : 'NO EXISTE')

// 2) ¿Qué proyecto Supabase usa el FRONTEND de ese dominio? (NEXT_PUBLIC_SUPABASE_URL va en el bundle)
async function findSupabaseRef(url, depth = 0) {
  try {
    const r = await fetch(url, { cache: 'no-store' })
    const html = await r.text()
    const m = html.match(/https:\/\/([a-z0-9]{15,})\.supabase\.co/)
    if (m) return { ref: m[1], from: url }
    if (depth === 0) {
      const chunks = [...html.matchAll(/\/_next\/static\/[^"']+\.js/g)].map(x => x[0]).slice(0, 12)
      for (const ch of chunks) {
        const found = await findSupabaseRef(domain + ch, 1)
        if (found) return found
      }
    }
  } catch (e) { return { error: e.message } }
  return null
}
console.log('\n2) Proyecto Supabase del frontend de', domain + ':')
const feRef = await findSupabaseRef(domain)
if (feRef?.ref) {
  console.log('   ref detectado:', feRef.ref, '(en', feRef.from + ')')
  console.log('   ¿coincide con la BD operada?', feRef.ref === PROD_REF ? '✅ SÍ' : `❌ NO — la BD real del sitio es ${feRef.ref}, NO ${PROD_REF}`)
} else {
  console.log('   no se pudo detectar el ref en el bundle', feRef?.error ? '(' + feRef.error + ')' : '')
}

// 3) Respuestas crudas de los endpoints
async function hit(path) {
  try {
    const r = await fetch(`${domain}${path}?_=${Date.now()}`, { cache: 'no-store' })
    const t = await r.text()
    return `[${r.status}] ${t.slice(0, 180)}`
  } catch (e) { return 'ERROR ' + e.message }
}
console.log('\n3) Endpoints en vivo:')
console.log('   /api/certificate/' + CODE, '→', await hit('/api/certificate/' + CODE))
console.log('   /api/verify-certificate/' + ID, '→', await hit('/api/verify-certificate/' + ID))
console.log('   /api/health', '→', await hit('/api/health'))

await c.end()
