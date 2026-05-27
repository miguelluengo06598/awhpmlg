import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Faltan variables de entorno: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedUsers() {
  try {
    console.log('Creando usuarios de prueba...\n')

    // USUARIO ADMIN
    const adminUser = {
      email: 'admin@aecmi.com',
      password: 'Admin@123456',
      email_confirm: true,
    }

    console.log('Creando usuario admin...')
    const { data: adminData, error: adminError } = await supabase.auth.admin.createUser(adminUser)

    if (adminError) {
      console.error('✗ Error creando admin en auth:', adminError.message)
    } else {
      console.log('✓ Admin creado en Auth:', adminData.user.id)

      const { error: adminTableError } = await supabase
        .from('users')
        .insert({
          id: adminData.user.id,
          email: 'admin@aecmi.com',
          first_name: 'Admin',
          last_name: 'AECMI',
          phone: '+34666000000',
          role: 'admin',
          is_active: true,
        })

      if (adminTableError) {
        console.error('✗ Error creando admin en tabla users:', adminTableError.message)
      } else {
        console.log('✓ Admin creado en tabla users\n')
      }
    }

    // USUARIO CLIENT
    const clientUser = {
      email: 'usuario@aecmi.com',
      password: 'Cliente@123456',
      email_confirm: true,
    }

    console.log('Creando usuario client...')
    const { data: clientData, error: clientError } = await supabase.auth.admin.createUser(clientUser)

    if (clientError) {
      console.error('✗ Error creando client en auth:', clientError.message)
    } else {
      console.log('✓ Client creado en Auth:', clientData.user.id)

      const { error: clientTableError } = await supabase
        .from('users')
        .insert({
          id: clientData.user.id,
          email: 'usuario@aecmi.com',
          first_name: 'Juan',
          last_name: 'García',
          phone: '+34666111111',
          role: 'client',
          is_active: true,
        })

      if (clientTableError) {
        console.error('✗ Error creando client en tabla users:', clientTableError.message)
      } else {
        console.log('✓ Client creado en tabla users\n')
      }
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ Usuarios de prueba creados!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    console.log('ADMIN:')
    console.log('  Email:    admin@aecmi.com')
    console.log('  Password: Admin@123456')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('CLIENT:')
    console.log('  Email:    usuario@aecmi.com')
    console.log('  Password: Cliente@123456')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

  } catch (error) {
    console.error('Error inesperado:', error.message)
    process.exit(1)
  }
}

seedUsers()
