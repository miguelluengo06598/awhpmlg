import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function deleteTestUsers() {
  try {
    console.log('Buscando usuarios de prueba...\n')

    // Obtener usuarios por email para conseguir sus IDs
    const { data: adminList } = await supabase
      .from('users')
      .select('id, email')
      .in('email', ['admin@aecmi.com', 'usuario@aecmi.com'])

    if (!adminList || adminList.length === 0) {
      console.log('No se encontraron usuarios de prueba en la tabla users.')
      return
    }

    for (const user of adminList) {
      console.log(`Eliminando ${user.email} (ID: ${user.id})...`)

      // Eliminar de Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(user.id)
      if (authError) {
        console.error(`✗ Error eliminando de auth (${user.email}):`, authError.message)
      } else {
        console.log(`✓ Eliminado de Auth: ${user.email}`)
      }

      // Eliminar de tabla users
      const { error: tableError } = await supabase.from('users').delete().eq('id', user.id)
      if (tableError) {
        console.error(`✗ Error eliminando de tabla users (${user.email}):`, tableError.message)
      } else {
        console.log(`✓ Eliminado de tabla users: ${user.email}`)
      }
    }

    console.log('\n✅ Usuarios de prueba eliminados exitosamente.')

  } catch (error) {
    console.error('Error inesperado:', error.message)
    process.exit(1)
  }
}

deleteTestUsers()
