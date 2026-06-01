import QRCode from 'qrcode'
import { supabase } from './supabaseClient'
import { createServiceClient } from './supabaseServer'
import { getCertificationName } from './qrGenerator'

export interface CreateCertificateInput {
  certification_type: 'IDM' | 'BDM' | 'BCM'
  email: string
  full_name: string
  organization?: string
  exam_score?: number
  expiry_date?: string
  issued_by_admin_id: string
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://aecomi.com'

function generateCertificationCode(type: string): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${type}-${year}-${random}`
}

async function buildQRImage(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    margin: 1,
    width: 300,
    color: { dark: '#000000', light: '#FFFFFF' },
  })
}

export async function createCertificate(input: CreateCertificateInput) {
  const id = crypto.randomUUID()
  const certification_code = generateCertificationCode(input.certification_type)
  const verificationUrl = `${APP_URL}/verify-certificate/${id}`
  const qrImageBase64 = await buildQRImage(verificationUrl)

  const svc = createServiceClient()
  const { data: cert, error } = await svc
    .from('certificates')
    .insert({
      id,
      certification_type: input.certification_type,
      email: input.email.toLowerCase().trim(),
      full_name: input.full_name.trim(),
      certification_code,
      qr_code: verificationUrl,
      qr_data: qrImageBase64,
      organization: input.organization?.trim() || null,
      exam_score: input.exam_score ?? null,
      expiry_date: input.expiry_date || null,
      issued_by_admin: input.issued_by_admin_id,
      status: 'active',
    })
    .select('id, qr_code, qr_data, certification_code')
    .single()

  if (error) throw error
  return cert as { id: string; qr_code: string; qr_data: string; certification_code: string }
}

export async function getCertificate(certificateId: string) {
  const svc = createServiceClient()
  const { data: cert, error } = await svc
    .from('certificates')
    .select('id, certification_type, certification_code, full_name, organization, email, issue_date, expiry_date, exam_score, status, qr_data, user_id')
    .eq('id', certificateId)
    .single()

  if (error || !cert) throw new Error('Certificate not found')

  const today = new Date().toISOString().split('T')[0]
  const status =
    cert.status === 'revoked'
      ? 'revoked'
      : cert.expiry_date && cert.expiry_date < today
      ? 'expired'
      : cert.status ?? 'active'

  return { ...cert, status, isValid: status === 'active' }
}

export async function getCertificatesByEmail(email: string) {
  const svc = createServiceClient()
  const { data, error } = await svc
    .from('certificates')
    .select('id, certification_type, certification_code')
    .eq('email', email.toLowerCase().trim())
    .eq('status', 'active')
    .is('user_id', null)

  if (error) throw error
  return data ?? []
}

export async function assignCertificatesToUser(email: string, userId: string) {
  const pending = await getCertificatesByEmail(email)
  if (pending.length === 0) return 0

  const svc = createServiceClient()
  const { error } = await svc
    .from('certificates')
    .update({ user_id: userId })
    .in('id', pending.map((c) => c.id))

  if (error) throw error
  return pending.length
}

export { getCertificationName }
