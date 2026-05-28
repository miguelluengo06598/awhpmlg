import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { validateQRCode } from '@/lib/qrGenerator'

const CERT_NAMES: Record<string, string> = {
  IDM: 'Information Delivery Manager',
  BDM: 'BIM Design Manager',
  BCM: 'BIM Construction Manager',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ qrCode: string }> }
) {
  try {
    const { qrCode } = await params

    if (!qrCode || !validateQRCode(qrCode)) {
      return NextResponse.json({ error: 'Código QR inválido.' }, { status: 400 })
    }

    const { data: cert, error } = await supabase
      .from('certificates')
      .select(
        'id, certification_type, certification_code, full_name, organization, issue_date, expiry_date, exam_score, status'
      )
      .eq('qr_code', qrCode)
      .single()

    if (error || !cert) {
      return NextResponse.json({ error: 'Certificado no encontrado.' }, { status: 404 })
    }

    const today = new Date().toISOString().split('T')[0]
    const certStatus =
      cert.status === 'revoked'
        ? 'revoked'
        : cert.expiry_date && cert.expiry_date < today
        ? 'expired'
        : cert.status ?? 'active'

    return NextResponse.json({
      valid: certStatus === 'active',
      certificate: {
        fullName: cert.full_name,
        certificationCode: cert.certification_code,
        certificationType: cert.certification_type,
        certificationName: CERT_NAMES[cert.certification_type] ?? cert.certification_type,
        organization: cert.organization ?? null,
        issueDate: cert.issue_date,
        expiryDate: cert.expiry_date ?? null,
        examScore: cert.exam_score ?? null,
        status: certStatus,
        isActive: certStatus === 'active',
      },
    })
  } catch (error) {
    console.error('[/api/certificate] Error:', error)
    return NextResponse.json({ error: 'Error verificando certificado.' }, { status: 500 })
  }
}
