'use client'

import { useEffect, useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { colors, spacing, typography } from '@/lib/design-system'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'
import { filterCertificates } from '@/lib/searchCertificates'

interface IssuedCertificate {
  id: string
  certification_type: string
  certification_code: string
  full_name: string
  email: string
  organization?: string
  issue_date: string
  expiry_date?: string
  status: string
  user_id?: string | null
  qr_code: string
  created_at: string
}

type FilterType = 'all' | 'assigned' | 'pending'

const certColors: Record<string, string> = {
  IDM: colors.primary.idm,
  BDM: colors.primary.bdm,
  BCM: colors.primary.bcm,
}

export function AdminIssuedCertificatesSection({ refreshKey }: { refreshKey?: number }) {
  const [certificates, setCertificates] = useState<IssuedCertificate[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const res = await fetchWithTimeout('/api/admin/certificates', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        }, 10_000)
        if (!res.ok) return
        const json = await res.json()
        setCertificates(json.certificates ?? [])
      } catch (err) {
        console.error('Error fetching issued certificates:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [refreshKey])

  const filtered = useMemo(() => {
    const byStatus = certificates.filter((c) => {
      if (filter === 'assigned') return !!c.user_id
      if (filter === 'pending') return !c.user_id
      return true
    })
    return filterCertificates(byStatus, search)
  }, [certificates, filter, search])

  const assignedCount = certificates.filter((c) => !!c.user_id).length
  const pendingCount = certificates.filter((c) => !c.user_id).length

  return (
    <section
      style={{
        padding: spacing.xl,
        backgroundColor: colors.neutral[50],
        borderRadius: '16px',
        marginTop: spacing['2xl'],
        border: `1px solid ${colors.neutral[200]}`,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: spacing.xl }}>
        <h2
          style={{
            fontFamily: typography.family.title,
            fontSize: '1.4rem',
            fontWeight: 700,
            color: colors.neutral[800],
            marginBottom: spacing.lg,
          }}
        >
          Certificados Emitidos
        </h2>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <StatCard label="Total Emitidos" value={certificates.length} color={colors.primary.idm} />
          <StatCard label="Asignados a Usuario" value={assignedCount} color={colors.primary.bdm} />
          <StatCard label="Sin Usuario" value={pendingCount} color={colors.primary.bcm} />
        </div>

        {/* Filtros + búsqueda */}
        <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', alignItems: 'center' }}>
          {(['all', 'assigned', 'pending'] as const).map((f) => (
            <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>
              {f === 'all' ? 'Todos' : f === 'assigned' ? 'Asignados' : 'Pendientes'}
            </FilterButton>
          ))}

          <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 340 }}>
            <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: colors.neutral[400], pointerEvents: 'none' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Código o nombre…"
              style={{
                width: '100%',
                paddingLeft: 30,
                paddingRight: search ? 28 : 10,
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: '0.875rem',
                fontFamily: typography.family.body,
                border: `1px solid ${colors.neutral[300]}`,
                borderRadius: 8,
                outline: 'none',
                backgroundColor: colors.neutral.white,
                color: colors.neutral[700],
                boxSizing: 'border-box',
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: colors.neutral[400], display: 'flex' }}
              >
                <X style={{ width: 12, height: 12 }} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lista */}
      {loading ? (
        <p style={{ fontFamily: typography.family.body, color: colors.neutral[500] }}>
          Cargando certificados...
        </p>
      ) : filtered.length === 0 ? (
        <div
          style={{
            padding: spacing.xl,
            textAlign: 'center',
            backgroundColor: colors.neutral.white,
            borderRadius: '12px',
            border: `1px dashed ${colors.neutral[300]}`,
          }}
        >
          <p style={{ fontFamily: typography.family.body, color: colors.neutral[500], margin: `0 0 ${spacing.md}` }}>
            {search ? `Sin resultados para "${search}"` : 'No hay certificados para mostrar'}
          </p>
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ fontFamily: typography.family.body, fontSize: '0.875rem', color: colors.primary.idm, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: spacing.lg,
          }}
        >
          {filtered.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>
      )}
    </section>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div
      style={{
        padding: spacing.lg,
        backgroundColor: colors.neutral.white,
        borderRadius: '12px',
        border: `1px solid ${colors.neutral[200]}`,
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: typography.family.body,
          fontSize: '0.8rem',
          fontWeight: 600,
          color: colors.neutral[600],
          textTransform: 'uppercase',
          margin: `0 0 ${spacing.sm}`,
          letterSpacing: '0.04em',
        }}
      >
        {label}
      </p>
      <p style={{ fontFamily: typography.family.title, fontSize: '2rem', fontWeight: 700, color, margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: `${spacing.sm} ${spacing.md}`,
        backgroundColor: active ? colors.primary.idm : colors.neutral.white,
        color: active ? 'white' : colors.neutral[700],
        border: `1px solid ${active ? colors.primary.idm : colors.neutral[300]}`,
        borderRadius: '8px',
        fontFamily: typography.family.body,
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {children}
    </button>
  )
}

function CertificateCard({ cert }: { cert: IssuedCertificate }) {
  const [copied, setCopied] = useState(false)
  const certColor = certColors[cert.certification_type] ?? colors.neutral[400]
  const isAssigned = !!cert.user_id

  const copyLink = () => {
    navigator.clipboard.writeText(cert.qr_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        backgroundColor: colors.neutral.white,
        borderRadius: '12px',
        border: `1px solid ${colors.neutral[200]}`,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: spacing.lg,
          backgroundColor: certColor + '12',
          borderLeft: `4px solid ${certColor}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: spacing.md,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: typography.family.title,
              fontSize: '0.75rem',
              fontWeight: 700,
              color: certColor,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              margin: `0 0 ${spacing.xs}`,
            }}
          >
            {cert.certification_type}
          </p>
          <h3
            style={{
              fontFamily: typography.family.title,
              fontSize: '1rem',
              fontWeight: 700,
              color: colors.neutral[800],
              margin: 0,
            }}
          >
            {cert.full_name}
          </h3>
        </div>
        <span
          style={{
            padding: `4px 10px`,
            backgroundColor: isAssigned ? colors.semantic.success + '18' : colors.semantic.warning + '18',
            color: isAssigned ? colors.semantic.success : colors.semantic.warning,
            borderRadius: '6px',
            fontFamily: typography.family.body,
            fontSize: '0.75rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {isAssigned ? '✅ Asignado' : '⏳ Pendiente'}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: spacing.lg }}>
        {/* Código */}
        <Row label="Código">
          <code style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 700, color: colors.neutral[800] }}>
            {cert.certification_code}
          </code>
        </Row>

        {/* Email */}
        <Row label="Email">
          <span style={{ fontFamily: typography.family.body, fontSize: '0.875rem', color: colors.neutral[700] }}>
            {cert.email}
          </span>
        </Row>

        {/* Fechas */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing.lg,
            paddingTop: spacing.lg,
            borderTop: `1px solid ${colors.neutral[200]}`,
            marginTop: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <div>
            <p style={sublabelStyle}>Emitido</p>
            <p style={valueStyle}>{formatDate(cert.issue_date)}</p>
          </div>
          <div>
            <p style={sublabelStyle}>Vencimiento</p>
            <p style={valueStyle}>{cert.expiry_date ? formatDate(cert.expiry_date) : 'Indefinido'}</p>
          </div>
        </div>

        {/* Acciones */}
        <div style={{ display: 'flex', gap: spacing.sm }}>
          <a
            href={cert.qr_code}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: certColor + '14',
              color: certColor,
              borderRadius: '6px',
              textDecoration: 'none',
              fontFamily: typography.family.body,
              fontWeight: 600,
              fontSize: '0.85rem',
              textAlign: 'center',
              border: `1px solid ${certColor}30`,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = certColor
              el.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.backgroundColor = certColor + '14'
              el.style.color = certColor
            }}
          >
            Verificar
          </a>
          <button
            onClick={copyLink}
            title="Copiar link"
            style={{
              padding: `${spacing.sm} ${spacing.md}`,
              backgroundColor: copied ? colors.semantic.success + '14' : colors.neutral[100],
              color: copied ? colors.semantic.success : colors.neutral[700],
              border: `1px solid ${copied ? colors.semantic.success + '40' : colors.neutral[300]}`,
              borderRadius: '6px',
              fontFamily: typography.family.body,
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? '✓ Copiado' : '📋 Copiar'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: spacing.md }}>
      <p style={sublabelStyle}>{label}</p>
      {children}
    </div>
  )
}

const sublabelStyle: React.CSSProperties = {
  fontFamily: typography.family.body,
  fontSize: '0.72rem',
  fontWeight: 600,
  color: colors.neutral[500],
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  margin: `0 0 4px`,
}

const valueStyle: React.CSSProperties = {
  fontFamily: typography.family.body,
  fontSize: '0.875rem',
  color: colors.neutral[700],
  margin: 0,
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}
