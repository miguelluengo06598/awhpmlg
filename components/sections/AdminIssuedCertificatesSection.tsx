'use client'

import { useEffect, useState, useMemo } from 'react'
import { Search, X, ArrowUpDown } from 'lucide-react'
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
type SortType = 'recent' | 'code' | 'name'

const TYPE_COLORS: Record<string, string> = {
  IDM: colors.primary.idm,
  BDM: colors.primary.bdm,
  BCM: colors.primary.bcm,
}

export function AdminIssuedCertificatesSection({ refreshKey }: { refreshKey?: number }) {
  const [certificates, setCertificates] = useState<IssuedCertificate[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortType>('recent')

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

  const displayCerts = useMemo(() => {
    const byStatus = certificates.filter((c) => {
      if (filter === 'assigned') return !!c.user_id
      if (filter === 'pending') return !c.user_id
      return true
    })
    const searched = filterCertificates(byStatus, search)
    return [...searched].sort((a, b) => {
      if (sortBy === 'code') return a.certification_code.localeCompare(b.certification_code)
      if (sortBy === 'name') return a.full_name.localeCompare(b.full_name)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }, [certificates, filter, search, sortBy])

  const assignedCount = certificates.filter((c) => !!c.user_id).length
  const pendingCount = certificates.filter((c) => !c.user_id).length

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <section style={{
      padding: spacing.xl,
      backgroundColor: colors.neutral[50],
      borderRadius: '16px',
      marginTop: spacing['2xl'],
      border: `1px solid ${colors.neutral[200]}`,
    }}>
      {/* Header */}
      <h2 style={{
        fontFamily: typography.family.title,
        fontSize: '1.4rem',
        fontWeight: 700,
        color: colors.neutral[800],
        marginBottom: spacing.xl,
      }}>
        Certificados Emitidos
      </h2>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: spacing.lg,
        marginBottom: spacing.xl,
      }}>
        <StatCard label="Total Emitidos"       value={certificates.length} color={colors.primary.idm} />
        <StatCard label="Asignados a Usuario"  value={assignedCount}       color={colors.primary.bdm} />
        <StatCard label="Sin Usuario"          value={pendingCount}         color={colors.primary.bcm} />
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', alignItems: 'center', marginBottom: spacing.xl }}>
        {/* Status filters */}
        {(['all', 'assigned', 'pending'] as const).map((f) => (
          <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>
            {f === 'all' ? 'Todos' : f === 'assigned' ? 'Asignados' : 'Pendientes'}
          </FilterButton>
        ))}

        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 340 }}>
          <Search style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, color: colors.neutral[400], pointerEvents: 'none' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Código, nombre o email…"
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

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ArrowUpDown style={{ width: 14, height: 14, color: colors.neutral[400] }} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            style={{
              padding: '8px 10px',
              fontSize: '0.875rem',
              fontFamily: typography.family.body,
              border: `1px solid ${colors.neutral[300]}`,
              borderRadius: 8,
              outline: 'none',
              backgroundColor: colors.neutral.white,
              color: colors.neutral[700],
              cursor: 'pointer',
            }}
          >
            <option value="recent">Más recientes</option>
            <option value="code">Código A–Z</option>
            <option value="name">Nombre A–Z</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p style={{ fontFamily: typography.family.body, color: colors.neutral[500] }}>
          Cargando certificados...
        </p>
      ) : displayCerts.length === 0 ? (
        <div style={{
          padding: spacing.xl,
          textAlign: 'center',
          backgroundColor: colors.neutral.white,
          borderRadius: '12px',
          border: `1px dashed ${colors.neutral[300]}`,
        }}>
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
        <div style={{ backgroundColor: colors.neutral.white, borderRadius: '12px', border: `1px solid ${colors.neutral[200]}`, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: colors.neutral[100], borderBottom: `2px solid ${colors.neutral[200]}` }}>
                  {['Código', 'Tipo', 'Nombre', 'Email', 'Emitido', 'Vencimiento', 'Estado', ''].map((h, i) => (
                    <th key={i} style={{
                      padding: `${spacing.md} ${spacing.lg}`,
                      textAlign: 'left',
                      fontFamily: typography.family.title,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: colors.neutral[600],
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayCerts.map((cert, idx) => {
                  const typeColor = TYPE_COLORS[cert.certification_type] ?? colors.neutral[400]
                  const isAssigned = !!cert.user_id
                  return (
                    <tr
                      key={cert.id}
                      style={{
                        borderBottom: `1px solid ${colors.neutral[100]}`,
                        backgroundColor: idx % 2 === 0 ? colors.neutral.white : colors.neutral[50],
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = colors.primary.idm + '08' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLTableRowElement).style.backgroundColor = idx % 2 === 0 ? colors.neutral.white : colors.neutral[50] }}
                    >
                      {/* Code */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}`, whiteSpace: 'nowrap' }}>
                        <code style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 700, color: typeColor, letterSpacing: '0.5px' }}>
                          {cert.certification_code}
                        </code>
                      </td>

                      {/* Type */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}` }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '2px 8px',
                          borderRadius: 4,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: typeColor + '18',
                          color: typeColor,
                        }}>
                          {cert.certification_type}
                        </span>
                      </td>

                      {/* Name */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}`, fontFamily: typography.family.body, fontSize: '0.9rem', fontWeight: 600, color: colors.neutral[800], whiteSpace: 'nowrap' }}>
                        {cert.full_name}
                      </td>

                      {/* Email */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}` }}>
                        <a href={`mailto:${cert.email}`} style={{ fontFamily: typography.family.body, fontSize: '0.875rem', color: colors.primary.idm, textDecoration: 'none' }}>
                          {cert.email}
                        </a>
                      </td>

                      {/* Issue date */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}`, fontFamily: typography.family.body, fontSize: '0.875rem', color: colors.neutral[600], whiteSpace: 'nowrap' }}>
                        {fmt(cert.issue_date)}
                      </td>

                      {/* Expiry */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}`, fontFamily: typography.family.body, fontSize: '0.875rem', color: colors.neutral[600], whiteSpace: 'nowrap' }}>
                        {cert.expiry_date ? fmt(cert.expiry_date) : '—'}
                      </td>

                      {/* Status */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}` }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '3px 9px',
                          borderRadius: 4,
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          backgroundColor: isAssigned ? colors.semantic.success + '18' : colors.semantic.warning + '18',
                          color: isAssigned ? colors.semantic.success : colors.semantic.warning,
                        }}>
                          {isAssigned ? '✅ Asignado' : '⏳ Pendiente'}
                        </span>
                      </td>

                      {/* Action */}
                      <td style={{ padding: `${spacing.sm} ${spacing.lg}`, textAlign: 'right' }}>
                        <a
                          href={cert.qr_code}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'inline-block',
                            padding: '5px 12px',
                            borderRadius: 6,
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            backgroundColor: typeColor + '14',
                            color: typeColor,
                            textDecoration: 'none',
                            border: `1px solid ${typeColor}30`,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          Ver QR
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer row count */}
          <div style={{
            padding: `${spacing.sm} ${spacing.lg}`,
            borderTop: `1px solid ${colors.neutral[100]}`,
            backgroundColor: colors.neutral[50],
            fontFamily: typography.family.body,
            fontSize: '0.8rem',
            color: colors.neutral[500],
          }}>
            {displayCerts.length} de {certificates.length} certificado{certificates.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </section>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      padding: spacing.lg,
      backgroundColor: colors.neutral.white,
      borderRadius: '12px',
      border: `1px solid ${colors.neutral[200]}`,
      textAlign: 'center',
    }}>
      <p style={{ fontFamily: typography.family.body, fontSize: '0.8rem', fontWeight: 600, color: colors.neutral[600], textTransform: 'uppercase', margin: `0 0 ${spacing.sm}`, letterSpacing: '0.04em' }}>
        {label}
      </p>
      <p style={{ fontFamily: typography.family.title, fontSize: '2rem', fontWeight: 700, color, margin: 0 }}>
        {value}
      </p>
    </div>
  )
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
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
