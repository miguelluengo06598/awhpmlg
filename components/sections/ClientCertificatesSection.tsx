'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { colors, spacing, typography } from '@/lib/design-system'
import { supabase } from '@/lib/supabaseClient'
import { filterCertificates } from '@/lib/searchCertificates'
import { CertificateRenewalSection } from './CertificateRenewalSection'

interface Certificate {
  id: string
  certification_type: 'IDM' | 'BDM' | 'BCM'
  certification_code: string
  full_name: string
  issue_date: string
  expiry_date: string | null
  status: string
  exam_score?: number
  renewal_price: number | null
  can_renew: boolean
}

const certNames: Record<string, string> = {
  IDM: 'Information Delivery Manager',
  BDM: 'BIM Design Manager',
  BCM: 'BIM Construction Manager',
}

const certColors: Record<string, string> = {
  IDM: colors.primary.idm,
  BDM: colors.primary.bdm,
  BCM: colors.primary.bcm,
}

export function ClientCertificatesSection({ userId }: { userId: string }) {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const searchParams = useSearchParams()
  const renewalStatus = searchParams.get('renewal')

  const filteredCerts = useMemo(() => filterCertificates(certs, search), [certs, search])

  useEffect(() => {
    let cancelled = false
    supabase
      .from('certificates')
      .select('id, certification_type, certification_code, full_name, issue_date, expiry_date, status, exam_score, renewal_price, can_renew')
      .eq('user_id', userId)
      .in('status', ['active', 'expired'])
      .order('issue_date', { ascending: false })
      .then(({ data }) => {
        if (!cancelled) {
          setCerts((data as Certificate[]) ?? [])
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [userId])

  if (loading) {
    return (
      <section style={{ padding: `${spacing['2xl']} ${spacing.lg}` }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <p style={{ fontFamily: typography.family.body, fontSize: '1rem', color: colors.neutral[500] }}>
            Cargando tus certificaciones...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section style={{ padding: `${spacing['2xl']} ${spacing.lg}`, backgroundColor: colors.neutral[50], minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: spacing['2xl'] }}>
        <h1 style={{ fontFamily: typography.family.title, fontSize: '2.5rem', fontWeight: 700, color: colors.neutral[800], marginBottom: spacing.md, letterSpacing: '-0.5px' }}>
          Mis Certificaciones
        </h1>
        <p style={{ fontFamily: typography.family.body, fontSize: '1.1rem', color: colors.neutral[600], maxWidth: '600px', lineHeight: '1.6', marginBottom: spacing.xl }}>
          Aquí puedes ver todas tus certificaciones activas, su estado de validez y opciones para renovarlas.
        </p>

        {/* Search */}
        {certs.length > 0 && (
          <div style={{ position: 'relative', maxWidth: '420px' }}>
            <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: colors.neutral[400], pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por código (IDM-2026-1445) o nombre…"
              style={{
                width: '100%',
                paddingLeft: 36,
                paddingRight: search ? 36 : 12,
                paddingTop: 10,
                paddingBottom: 10,
                fontSize: '0.9rem',
                fontFamily: typography.family.body,
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 10,
                outline: 'none',
                backgroundColor: colors.neutral.white,
                color: colors.neutral[800],
                boxSizing: 'border-box',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: colors.neutral[400], display: 'flex' }}
              >
                <X style={{ width: 14, height: 14 }} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Renewal status banners */}
      {renewalStatus === 'success' && (
        <div style={{
          padding: spacing.lg,
          backgroundColor: colors.semantic.success + '15',
          border: `1px solid ${colors.semantic.success}`,
          borderRadius: '12px',
          marginBottom: spacing.xl,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
          animation: 'slideDown 0.4s ease-out',
        }}>
          <span style={{ fontSize: '1.5rem' }}>✅</span>
          <div>
            <p style={{ fontFamily: typography.family.title, fontWeight: 600, color: colors.semantic.success, margin: `0 0 ${spacing.xs}` }}>
              ¡Renovación completada!
            </p>
            <p style={{ fontFamily: typography.family.body, fontSize: '0.9rem', color: colors.semantic.success, margin: 0 }}>
              Tu certificado es válido 2 años más a partir de hoy.
            </p>
          </div>
        </div>
      )}

      {renewalStatus === 'canceled' && (
        <div style={{
          padding: spacing.lg,
          backgroundColor: colors.semantic.warning + '15',
          border: `1px solid ${colors.semantic.warning}`,
          borderRadius: '12px',
          marginBottom: spacing.xl,
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
        }}>
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <div>
            <p style={{ fontFamily: typography.family.title, fontWeight: 600, color: colors.semantic.warning, margin: `0 0 ${spacing.xs}` }}>
              Renovación cancelada
            </p>
            <p style={{ fontFamily: typography.family.body, fontSize: '0.9rem', color: colors.semantic.warning, margin: 0 }}>
              Puedes intentar nuevamente cuando lo desees.
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      {certs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: `${spacing['3xl']} ${spacing.lg}`,
          backgroundColor: colors.neutral.white,
          borderRadius: '16px',
          border: `1px dashed ${colors.neutral[300]}`,
        }}>
          <div style={{ fontSize: '3rem', marginBottom: spacing.lg }}>📚</div>
          <h2 style={{ fontFamily: typography.family.title, fontSize: '1.5rem', fontWeight: 600, color: colors.neutral[700], marginBottom: spacing.md }}>
            No tienes certificaciones aún
          </h2>
          <p style={{ fontFamily: typography.family.body, color: colors.neutral[600], maxWidth: '400px', margin: `0 auto ${spacing.lg}` }}>
            Completa el proceso de certificación para obtener tu credencial oficial.
          </p>
          <Link
            href="/dashboard/client/applications"
            style={{
              display: 'inline-block',
              padding: `${spacing.md} ${spacing.lg}`,
              backgroundColor: colors.primary.idm,
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Solicitar certificación
          </Link>
        </div>
      ) : filteredCerts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: `${spacing['2xl']} ${spacing.lg}`, backgroundColor: colors.neutral.white, borderRadius: '16px', border: `1px solid ${colors.neutral[200]}` }}>
          <p style={{ fontFamily: typography.family.body, color: colors.neutral[500], marginBottom: spacing.md }}>
            Sin resultados para <strong>&ldquo;{search}&rdquo;</strong>
          </p>
          <button
            onClick={() => setSearch('')}
            style={{ fontFamily: typography.family.body, fontSize: '0.875rem', color: colors.primary.idm, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: spacing.xl }}>
          {filteredCerts.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}

function CertificateCard({ cert }: { cert: Certificate }) {
  const certColor = certColors[cert.certification_type] ?? colors.primary.idm

  const daysUntilExpiry = cert.expiry_date
    ? Math.ceil((new Date(cert.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  const isExpiringSoon = daysUntilExpiry !== null && daysUntilExpiry < 90 && daysUntilExpiry > 0
  const isExpired      = daysUntilExpiry !== null && daysUntilExpiry <= 0

  const statusColor = isExpired ? colors.semantic.danger : isExpiringSoon ? colors.semantic.warning : colors.semantic.success
  const statusLabel = isExpired ? '❌ Expirado' : isExpiringSoon ? '⚠️ Próximo' : '✅ Activo'

  return (
    <div
      style={{
        backgroundColor: colors.neutral.white,
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${colors.neutral[200]}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Card header */}
      <div style={{
        padding: spacing.lg,
        backgroundColor: certColor + '10',
        borderLeft: `4px solid ${certColor}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <div>
          <p style={{ fontFamily: typography.family.title, fontSize: '0.85rem', fontWeight: 600, color: certColor, textTransform: 'uppercase', letterSpacing: '0.5px', margin: `0 0 ${spacing.sm}` }}>
            {cert.certification_type}
          </p>
          <h3 style={{ fontFamily: typography.family.title, fontSize: '1.3rem', fontWeight: 700, color: colors.neutral[800], margin: 0 }}>
            {certNames[cert.certification_type] ?? cert.certification_type}
          </h3>
        </div>
        <div style={{
          padding: `${spacing.sm} ${spacing.md}`,
          borderRadius: '8px',
          backgroundColor: statusColor + '15',
          color: statusColor,
          fontFamily: typography.family.title,
          fontSize: '0.75rem',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}>
          {statusLabel}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: spacing.lg, flex: 1 }}>
        {/* Code */}
        <div style={{ marginBottom: spacing.lg }}>
          <p style={{ fontFamily: typography.family.title, fontSize: '0.75rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.sm}` }}>
            Código
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '1.1rem', fontWeight: 700, color: colors.neutral[800], margin: 0, letterSpacing: '1px' }}>
            {cert.certification_code}
          </p>
        </div>

        {/* Name + issue date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg, paddingBottom: spacing.lg, borderBottom: `1px solid ${colors.neutral[200]}`, marginBottom: spacing.lg }}>
          <div>
            <p style={{ fontFamily: typography.family.title, fontSize: '0.75rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.sm}` }}>
              Emitido a
            </p>
            <p style={{ fontFamily: typography.family.body, fontSize: '0.95rem', fontWeight: 500, color: colors.neutral[800], margin: 0 }}>
              {cert.full_name}
            </p>
          </div>
          <div>
            <p style={{ fontFamily: typography.family.title, fontSize: '0.75rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.sm}` }}>
              Emitido
            </p>
            <p style={{ fontFamily: typography.family.body, fontSize: '0.95rem', fontWeight: 500, color: colors.neutral[800], margin: 0 }}>
              {new Date(cert.issue_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Expiry */}
        {cert.expiry_date && (
          <div style={{
            padding: spacing.md,
            backgroundColor: statusColor + '08',
            borderRadius: '8px',
            border: `1px solid ${statusColor}20`,
            marginBottom: spacing.lg,
          }}>
            <p style={{ fontFamily: typography.family.title, fontSize: '0.75rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.sm}` }}>
              {isExpired ? 'Expiró el' : 'Válido hasta'}
            </p>
            <p style={{ fontFamily: typography.family.title, fontSize: '1.1rem', fontWeight: 700, color: statusColor, margin: 0 }}>
              {new Date(cert.expiry_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            {daysUntilExpiry !== null && daysUntilExpiry > 0 && (
              <p style={{ fontFamily: typography.family.body, fontSize: '0.85rem', color: colors.neutral[600], margin: `${spacing.sm} 0 0` }}>
                {daysUntilExpiry} días restantes
              </p>
            )}
          </div>
        )}

        {/* Renewal section embedded */}
        <CertificateRenewalSection certificate={cert} />

        {/* Score */}
        {cert.exam_score && (
          <div style={{ marginTop: spacing.lg }}>
            <p style={{ fontFamily: typography.family.title, fontSize: '0.75rem', fontWeight: 600, color: colors.neutral[500], textTransform: 'uppercase', letterSpacing: '0.3px', margin: `0 0 ${spacing.sm}` }}>
              Puntuación
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: spacing.sm }}>
              <p style={{ fontFamily: typography.family.title, fontSize: '1.8rem', fontWeight: 700, color: certColor, margin: 0 }}>
                {cert.exam_score}
              </p>
              <p style={{ fontFamily: typography.family.body, fontSize: '0.9rem', color: colors.neutral[600], margin: 0 }}>
                / 100
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div style={{ padding: spacing.lg, borderTop: `1px solid ${colors.neutral[200]}`, display: 'flex', gap: spacing.md }}>
        <Link
          href={`/verify-certificate/${cert.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            padding: `${spacing.md} ${spacing.lg}`,
            backgroundColor: certColor + '15',
            color: certColor,
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            textAlign: 'center',
            border: `1px solid ${certColor}30`,
            transition: 'background-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = certColor
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = certColor + '15'
            e.currentTarget.style.color = certColor
          }}
        >
          📱 Ver Certificado
        </Link>

        <button
          onClick={() => {
            const url = `/verify-certificate/${cert.id}`
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL || 'https://aecomi.tech'}${url}`)
            alert('Link copiado al portapapeles')
          }}
          style={{
            padding: `${spacing.md} ${spacing.lg}`,
            backgroundColor: colors.neutral[100],
            color: colors.neutral[700],
            border: `1px solid ${colors.neutral[300]}`,
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.neutral[200] }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = colors.neutral[100] }}
        >
          📋
        </button>
      </div>
    </div>
  )
}
