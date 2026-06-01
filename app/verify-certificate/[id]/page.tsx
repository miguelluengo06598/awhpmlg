'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { colors, spacing, typography } from '@/lib/design-system'

interface CertificateResponse {
  valid: boolean
  certificate?: {
    fullName: string
    certificationCode: string
    certificationType: string
    certificationName: string
    organization?: string
    issueDate: string
    expiryDate?: string
    examScore?: number
    status: string
    isActive: boolean
    qrImage?: string
  }
  error?: string
}

const certColors: Record<string, string> = {
  IDM: colors.primary.idm,
  BDM: colors.primary.bdm,
  BCM: colors.primary.bcm,
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: spacing.lg }}>
      <p style={{ fontFamily: typography.family.title, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', color: colors.neutral[500], marginBottom: spacing.xs, textTransform: 'uppercase' }}>
        {label}
      </p>
      <p style={{ fontFamily: typography.family.body, fontSize: '1rem', color: colors.neutral[800], fontWeight: 600, margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

export default function VerifyCertificatePage() {
  const params = useParams()
  const [result, setResult] = useState<CertificateResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10_000)

    fetch(`/api/verify-certificate/${params.id}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data: CertificateResponse) => setResult(data))
      .catch((err) => {
        if (err.name === 'AbortError') {
          setResult({ valid: false, error: 'La verificación tardó demasiado. Inténtalo de nuevo.' })
        } else {
          setResult({ valid: false, error: 'Error verificando el certificado.' })
        }
      })
      .finally(() => {
        clearTimeout(timeoutId)
        setLoading(false)
      })

    return () => { clearTimeout(timeoutId); controller.abort() }
  }, [params.id])

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: colors.neutral[50],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  }

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={{ fontFamily: typography.family.body, fontSize: '1rem', color: colors.neutral[500] }}>
          Verificando certificado...
        </p>
      </div>
    )
  }

  if (!result?.valid || !result.certificate) {
    return (
      <div style={containerStyle}>
        <div style={{ maxWidth: 520, width: '100%', backgroundColor: colors.neutral.white, padding: spacing['2xl'], borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: spacing.lg }}>❌</div>
          <h1 style={{ fontFamily: typography.family.title, fontSize: '1.6rem', fontWeight: 700, color: colors.semantic.danger, marginBottom: spacing.md }}>
            Certificado no válido
          </h1>
          <p style={{ fontFamily: typography.family.body, color: colors.neutral[600] }}>
            {result?.error ?? 'Este certificado no existe o ha sido revocado.'}
          </p>
        </div>
      </div>
    )
  }

  const cert = result.certificate
  const accentColor = certColors[cert.certificationType] ?? colors.primary.idm

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: 580, width: '100%', backgroundColor: colors.neutral.white, borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}>

        {/* Header band */}
        <div style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`, padding: `${spacing.xl} ${spacing['2xl']}`, color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
            <span style={{ fontSize: '2rem' }}>✅</span>
            <div>
              <p style={{ fontFamily: typography.family.title, fontSize: '0.8rem', fontWeight: 600, opacity: 0.8, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Certificado verificado
              </p>
              <h1 style={{ fontFamily: typography.family.title, fontSize: '1.4rem', fontWeight: 800, margin: `${spacing.xs} 0 0` }}>
                {cert.certificationName}
              </h1>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: spacing['2xl'] }}>
          <Field label="Certificado a" value={cert.fullName} />
          {cert.organization && <Field label="Organización" value={cert.organization} />}
          <Field label="Código de certificación" value={cert.certificationCode} />
          <Field label="Fecha de emisión" value={formatDate(cert.issueDate)} />
          {cert.expiryDate && <Field label="Válido hasta" value={formatDate(cert.expiryDate)} />}
          {cert.examScore != null && <Field label="Puntuación del examen" value={`${cert.examScore}/100`} />}

          {/* Status badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: spacing.sm, padding: `${spacing.sm} ${spacing.md}`, borderRadius: 999, backgroundColor: cert.isActive ? '#ecfdf5' : '#fef2f2', border: `1px solid ${cert.isActive ? '#bbf7d0' : '#fecaca'}`, marginBottom: spacing.xl }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: cert.isActive ? '#22c55e' : '#ef4444', display: 'inline-block' }} />
            <span style={{ fontFamily: typography.family.body, fontSize: '0.875rem', fontWeight: 600, color: cert.isActive ? '#15803d' : '#dc2626' }}>
              {cert.isActive ? 'Certificación activa' : 'Certificación ' + cert.status}
            </span>
          </div>

          {/* QR image */}
          {cert.qrImage && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.sm, padding: spacing.lg, backgroundColor: colors.neutral[50], borderRadius: 12 }}>
              <Image src={cert.qrImage} alt="QR de verificación" width={160} height={160} style={{ borderRadius: 8 }} />
              <p style={{ fontFamily: typography.family.body, fontSize: '0.75rem', color: colors.neutral[500], margin: 0, textAlign: 'center' }}>
                Escanea el QR para verificar este certificado
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: `${spacing.md} ${spacing['2xl']}`, borderTop: `1px solid ${colors.neutral[100]}`, textAlign: 'center' }}>
          <p style={{ fontFamily: typography.family.body, fontSize: '0.8rem', color: colors.neutral[400], margin: 0 }}>
            Certificado emitido por <strong>AECMI</strong> · aecmi.com
          </p>
        </div>
      </div>
    </div>
  )
}
