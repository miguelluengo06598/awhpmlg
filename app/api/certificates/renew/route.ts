import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { createRenewalPaymentSession } from '@/lib/renewalService'

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) return NextResponse.json({ error: 'No autenticado.' }, { status: 401 })

    const { data: { user } } = await supabase.auth.getUser(token)
    if (!user) return NextResponse.json({ error: 'Sesión inválida.' }, { status: 401 })

    const { certificateId } = await req.json()
    if (!certificateId) return NextResponse.json({ error: 'certificateId requerido.' }, { status: 400 })

    const result = await createRenewalPaymentSession(certificateId, user.email!, user.id)

    return NextResponse.json({ sessionId: result.sessionId, url: result.url })
  } catch (error) {
    console.error('[/api/certificates/renew]', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 400 })
  }
}
