'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { colors, spacing, typography } from '@/lib/design-system'
import { supabase } from '@/lib/supabaseClient'

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

  const daysLeft = certificate.expiry_date
    ? Math.ceil((new Date(certificate.expiry_date).getTime() - Date.now()) / 86_400_000)
    : null

  const isExpired     = daysLeft !== null && daysLeft < 0
  const isExpiringSoon = daysLeft !== null && daysLeft >= 0 && daysLeft < 90
  const isActive       = daysLeft === null || daysLeft >= 90

  const accentColor = isExpired ? colors.semantic.danger : isExpiringSoon ? colors.semantic.warning : colors.semantic.success
  const bgColor     = accentColor + '14'

  const handleRenew = async () => {
    setError('')
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setError('Sesión expirada. Recarga la página.'); return }

      const res = await fetch('/api/certificates/renew', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ certificateId: certificate.id }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Error iniciando renovación.'); return }

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (!certificate.expiry_date) return null

  return (
    <div style={{ marginTop: spacing.md, padding: spacing.md, backgroundColor: bgColor, border: `1px solid ${accentColor}44`, borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: spacing.md, flexWrap: 'wrap' }}>
        <div>
          <p style={{ fontFamily: typography.family.body, fontSize: '0.85rem', fontWeight: 700, color: accentColor, margin: `0 0 ${spacing.xs}` }}>
            {isExpired
              ? '❌ Certificado vencido'
              : isExpiringSoon
              ? `⚠️ Vence en ${daysLeft} días`
              : `✅ Válido ${daysLeft} días más`}
          </p>
          <p style={{ fontFamily: typography.family.body, fontSize: '0.78rem', color: colors.neutral[600], margin: 0 }}>
            Vence: {new Date(certificate.expiry_date).toLocaleDateString('es-ES')}
            {certificate.can_renew && certificate.renewal_price != null && (
              <span> · Renovación: <strong>€{certificate.renewal_price.toFixed(2)}</strong> / 2 años</span>
            )}
          </p>
        </div>

        {certificate.can_renew && (isExpired || isExpiringSoon) && (
          <Button variant="primary" size="sm" loading={loading} onClick={handleRenew}>
            Renovar
          </Button>
        )}
      </div>

      {error && (
        <p style={{ fontFamily: typography.family.body, fontSize: '0.8rem', color: colors.semantic.danger, margin: `${spacing.sm} 0 0`, fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  )
}
