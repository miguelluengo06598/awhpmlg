'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { colors, spacing, typography } from '@/lib/design-system'
import { getCertificationName } from '@/lib/qrGenerator'

interface Certificate {
  id: string
  certification_type: 'IDM' | 'BDM' | 'BCM'
  certification_code: string
  full_name: string
  issue_date: string
  expiry_date: string | null
  status: string
}

const certColors: Record<string, string> = {
  IDM: colors.primary.idm,
  BDM: colors.primary.bdm,
  BCM: colors.primary.bcm,
}

export function ClientCertificatesSection({ userId }: { userId: string }) {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('certificates')
      .select('id, certification_type, certification_code, full_name, issue_date, expiry_date, status')
      .eq('user_id', userId)
      .in('status', ['active', 'expired'])
      .order('issue_date', { ascending: false })
      .then(({ data }) => {
        setCerts((data as Certificate[]) ?? [])
        setLoading(false)
      })
  }, [userId])

  if (loading) return null

  return (
    <div style={{ marginBottom: spacing.xl }}>
      <h2 style={{ fontFamily: typography.family.title, fontSize: '1.25rem', fontWeight: 700, color: colors.neutral[800], marginBottom: spacing.lg }}>
        Mis Certificaciones
      </h2>

      {certs.length === 0 ? (
        <div style={{ padding: spacing.xl, backgroundColor: colors.neutral[50], borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontFamily: typography.family.body, color: colors.neutral[500], margin: 0 }}>
            No tienes certificaciones emitidas aún.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: spacing.lg }}>
          {certs.map((cert) => {
            const accentColor = certColors[cert.certification_type] ?? colors.primary.idm
            const isActive = cert.status === 'active'
            return (
              <div
                key={cert.id}
                style={{ backgroundColor: colors.neutral.white, border: `1px solid ${colors.neutral[200]}`, borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div style={{ height: 6, backgroundColor: accentColor }} />
                <div style={{ padding: spacing.lg }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md }}>
                    <span style={{ fontFamily: typography.family.title, fontSize: '1.1rem', fontWeight: 800, color: accentColor }}>
                      {cert.certification_type}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: `2px ${spacing.sm}`, borderRadius: 999, backgroundColor: isActive ? '#dcfce7' : '#fee2e2', color: isActive ? '#15803d' : '#dc2626' }}>
                      {isActive ? 'Activa' : 'Vencida'}
                    </span>
                  </div>

                  <p style={{ fontFamily: typography.family.body, fontSize: '0.9rem', color: colors.neutral[700], margin: `0 0 ${spacing.xs}`, fontWeight: 600 }}>
                    {getCertificationName(cert.certification_type)}
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: colors.neutral[500], margin: `0 0 ${spacing.md}` }}>
                    {cert.certification_code}
                  </p>
                  <p style={{ fontFamily: typography.family.body, fontSize: '0.8rem', color: colors.neutral[500], margin: `0 0 ${spacing.lg}` }}>
                    Emitido: {new Date(cert.issue_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    {cert.expiry_date && ` · Vence: ${new Date(cert.expiry_date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                  </p>

                  <Link
                    href={`/verify-certificate/${cert.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: `${spacing.sm} ${spacing.md}`, backgroundColor: accentColor, color: 'white', borderRadius: 8, textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600 }}
                  >
                    Ver certificado
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
