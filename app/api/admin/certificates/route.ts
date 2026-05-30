import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { createServiceClient } from '@/lib/supabaseServer'
import { createCertificate } from '@/lib/certificateService'

async function requireAdmin(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) return { user: null, error: NextResponse.json({ error: 'No autenticado.' }, { status: 401 }) }

  const { data: { user } } = await supabase.auth.getUser(token)
  if (!user) return { user: null, error: NextResponse.json({ error: 'No autenticado.' }, { status: 401 }) }

  // Use service client to bypass RLS when reading the role
  const svc = createServiceClient()
  const { data: row } = await svc.from('users').select('role').eq('id', user.id).single()
  if (row?.role !== 'admin') return { user: null, error: NextResponse.json({ error: 'No autorizado.' }, { status: 403 }) }

  return { user, error: null }
}

export async function POST(req: NextRequest) {
  try {
    const { user, error: authError } = await requireAdmin(req)
    if (authError) return authError

    const body = await req.json()
    const { certification_type, email, full_name, organization, exam_score, expiry_date } = body

    if (!['IDM', 'BDM', 'BCM'].includes(certification_type)) {
      return NextResponse.json({ error: 'Tipo de certificación inválido.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
    }
    if (!full_name?.trim()) {
      return NextResponse.json({ error: 'Nombre requerido.' }, { status: 400 })
    }

    const cert = await createCertificate({
      certification_type,
      email,
      full_name,
      organization,
      exam_score: exam_score ? Number(exam_score) : undefined,
      expiry_date: expiry_date || undefined,
      issued_by_admin_id: user!.id,
    })

    return NextResponse.json({
      success: true,
      certificate: cert,
      shareUrl: cert.qr_code,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    const code = (error as { code?: string }).code
    console.error('[/api/admin/certificates] POST error:', msg, '| code:', code, '| full:', error)
    return NextResponse.json(
      { error: msg || 'Error creando el certificado.', code },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { user, error: authError } = await requireAdmin(req)
    if (authError) return authError

    const { data, error } = await supabase
      .from('certificates')
      .select('id, certification_type, certification_code, full_name, email, organization, issue_date, expiry_date, status, user_id, qr_code, created_at')
      .eq('issued_by_admin', user!.id)
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) throw error
    return NextResponse.json({ certificates: data ?? [] })
  } catch (error) {
    console.error('[/api/admin/certificates] GET:', error)
    return NextResponse.json({ error: 'Error obteniendo certificados.' }, { status: 500 })
  }
}
