import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabaseServer'
import { validateQRCode } from '@/lib/qrGenerator'
import { rateLimit, getClientIp } from '@/lib/rateLimit'

const CERT_NAMES: Record<string, string> = {
  IDM: 'Information Delivery Manager',
  BDM: 'BIM Design Manager',
  BCM: 'BIM Construction Manager',
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ qrCode: string }> }
) {
  const ip = getClientIp(req)
  if (!(await rateLimit(`cert-verify:${ip}`, 60, 60_000))) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const { qrCode } = await params
    const normalized = qrCode.trim().toUpperCase()

    if (!normalized || !validateQRCode(normalized)) {
      return NextResponse.json({ error: 'Código de certificado inválido. Ejemplo: IDM-2026-1445' }, { status: 400 })
    }

    // Verificación pública: consulta server-side con service_role (la tabla tiene
    // RLS activada). Se devuelven solo campos no sensibles (sin organization ni
    // exam_score, que son PII).
    const svc = createServiceClient()
    const { data: cert, error } = await svc
      .from('certificates')
      .select(
        'id, certification_type, certification_code, full_name, issue_date, expiry_date, status'
      )
      .eq('certification_code', normalized)
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
        issueDate: cert.issue_date,
        expiryDate: cert.expiry_date ?? null,
        status: certStatus,
        isActive: certStatus === 'active',
      },
    })
  } catch (error) {
    console.error('[/api/certificate] Error:', error)
    return NextResponse.json({ error: 'Error verificando certificado.' }, { status: 500 })
  }
}
