import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { assignCertificatesToUser } from '@/lib/certificateService'

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No autenticado.' }, { status: 401 })

    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Sesión inválida.' }, { status: 401 })

    const count = await assignCertificatesToUser(user.email!, user.id)
    return NextResponse.json({ assigned: count })
  } catch (error) {
    console.error('[/api/assign-certificates]', error)
    return NextResponse.json({ error: 'Error asignando certificados.' }, { status: 500 })
  }
}
