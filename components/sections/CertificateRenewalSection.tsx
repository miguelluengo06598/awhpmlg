'use client'

import { useState } from 'react'
import { colors, spacing, typography } from '@/lib/design-system'
import { supabase } from '@/lib/supabaseClient'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'

interface RenewableCert {
  id: string
  certification_type: string
  certification_code: string
  expiry_date: string | null
  renewal_price: number | null
  can_renew: boolean
}

export function CertificateRenewalSection({ certificate }: { certificate: RenewableCert }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!certificate.expiry_date || !certificate.can_renew || certificate.renewal_price == null) return null

  const daysLeft = Math.ceil(
    (new Date(certificate.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  const isExpired      = daysLeft < 0
  const isExpiringSoon = daysLeft >= 0 && daysLeft < 90

  if (!isExpired && !isExpiringSoon) return null

  const certColor = {
    IDM: colors.primary.idm,
    BDM: colors.primary.bdm,
    BCM: colors.primary.bcm,
  }[certificate.certification_type] ?? colors.neutral[400]

  const accentColor = isExpired ? colors.semantic.danger : colors.semantic.warning

  const handleRenew = async () => {
    setError('')
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setError('Sesión expirada. Recarga la página.'); setLoading(false); return }

      const res = await fetchWithTimeout('/api/certificates/renew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ certificateId: certificate.id }),
      }, 15_000)

      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Error iniciando renovación.'); setLoading(false); return }

      window.location.href = data.url
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: spacing.lg,
      backgroundColor: accentColor + '08',
      borderRadius: '12px',
      border: `1px solid ${accentColor}30`,
      marginTop: spacing.lg,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing.lg, flexWrap: 'wrap' }}>
        {/* Info */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, marginBottom: spacing.md }}>
            <span style={{ fontSize: '1.25rem' }}>{isExpired ? '❌' : '⚠️'}</span>
            <h4 style={{ fontFamily: typography.family.title, fontSize: '1rem', fontWeight: 700, color: accentColor, margin: 0 }}>
              {isExpired ? 'Certificado expirado' : `Vence en ${daysLeft} días`}
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.md }}>
            <div>
              <p style={{ fontFamily: typography.family.title, fontSize: '0.72rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.xs}` }}>
                Válido hasta
              </p>
              <p style={{ fontFamily: typography.family.body, fontSize: '0.9rem', fontWeight: 600, color: colors.neutral[800], margin: 0 }}>
                {new Date(certificate.expiry_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p style={{ fontFamily: typography.family.title, fontSize: '0.72rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.xs}` }}>
                Renovación · 2 años
              </p>
              <p style={{ fontFamily: typography.family.title, fontSize: '1.25rem', fontWeight: 700, color: certColor, margin: 0 }}>
                €{certificate.renewal_price.toFixed(2)}
              </p>
            </div>
          </div>

          {error && (
            <p style={{ fontFamily: typography.family.body, fontSize: '0.85rem', color: colors.semantic.danger, fontWeight: 500, margin: `${spacing.md} 0 0` }}>
              {error}
            </p>
          )}
        </div>

        {/* Renew button */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.sm }}>
          <button
            onClick={handleRenew}
            disabled={loading}
            style={{
              padding: `${spacing.md} ${spacing.lg}`,
              backgroundColor: certColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontFamily: typography.family.title,
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${certColor}40`
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            {loading ? '⏳ Procesando...' : '🔄 Renovar ahora'}
          </button>
          <p style={{ fontFamily: typography.family.body, fontSize: '0.75rem', color: colors.neutral[500], margin: 0, textAlign: 'center' }}>
            Pago seguro vía Stripe
          </p>
        </div>
      </div>
    </div>
  )
}
