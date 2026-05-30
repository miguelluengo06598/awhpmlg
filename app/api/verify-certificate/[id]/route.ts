import { NextRequest, NextResponse } from 'next/server'
import { getCertificate, getCertificationName } from '@/lib/certificateService'
import { rateLimit } from '@/lib/rateLimit'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
  if (!rateLimit(`cert-id:${ip}`, 60, 60_000)) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const { id } = await params
    if (!id?.trim()) {
      return NextResponse.json({ error: 'ID de certificado requerido.' }, { status: 400 })
    }

    const cert = await getCertificate(id.trim())

    return NextResponse.json({
      valid: cert.isValid,
      certificate: {
        fullName: cert.full_name,
        certificationCode: cert.certification_code,
        certificationType: cert.certification_type,
        certificationName: getCertificationName(cert.certification_type as 'IDM' | 'BDM' | 'BCM'),
        organization: cert.organization ?? null,
        issueDate: cert.issue_date,
        expiryDate: cert.expiry_date ?? null,
        examScore: cert.exam_score ?? null,
        status: cert.status,
        isActive: cert.isValid,
        qrImage: cert.qr_data,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Certificado no encontrado.' }, { status: 404 })
  }
}
