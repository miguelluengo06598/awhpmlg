import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { assignCertificatesToUser } from '@/lib/certificateService'

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No autenticado.' }, { status: 401 })

    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Sesión inválida.' }, { status: 401 })

    // Prueba de propiedad: solo un email VERIFICADO puede reclamar los certificados
    // emitidos a esa dirección. Sin esto, cualquiera que se registre con el email de
    // otra persona (si la confirmación global estuviera desactivada) heredaría sus
    // certificados. Comprobamos explícitamente aquí, sin depender de la config global.
    if (!user.email_confirmed_at) {
      return NextResponse.json(
        { error: 'Debes verificar tu email antes de reclamar certificados.' },
        { status: 403 }
      )
    }
    if (!user.email) {
      return NextResponse.json({ error: 'La cuenta no tiene email.' }, { status: 400 })
    }

    const count = await assignCertificatesToUser(user.email, user.id)
    return NextResponse.json({ assigned: count })
  } catch (error) {
    console.error('[/api/assign-certificates]', error)
    return NextResponse.json({ error: 'Error asignando certificados.' }, { status: 500 })
  }
}
