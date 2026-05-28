'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { AnimatedCard, Card, Badge, Button } from '@/components/ui'
import { colors, spacing, typography } from '@/lib/design-system'
import { AdminCreateCertificateSection } from '@/components/sections/AdminCreateCertificateSection'

interface Stats {
  pendingApplications: number
  certifiedApplications: number
  activeUsers: number
  totalRevenue: number
}

interface RecentApp {
  id: string
  status: string
  submitted_at: string
  users: { first_name: string; last_name: string; email: string } | null
  certifications_catalog: { display_name: string } | null
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [stats, setStats] = useState<Stats>({
    pendingApplications: 0,
    certifiedApplications: 0,
    activeUsers: 0,
    totalRevenue: 0,
  })
  const [recentApps, setRecentApps] = useState<RecentApp[]>([])
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsError, setStatsError] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  const loadStats = useCallback(async () => {
    if (!user || user.role !== 'admin') return
    setStatsLoading(true)
    setStatsError('')

    try {
      const [pendingRes, certifiedRes, usersRes, revenueRes, recentRes] = await Promise.all([
        supabase.from('certifications_applications').select('*', { count: 'exact', head: true }).in('status', ['pending', 'in_review']),
        supabase.from('certifications_applications').select('*', { count: 'exact', head: true }).eq('status', 'certified'),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('payments').select('amount').eq('status', 'completed'),
        supabase.from('certifications_applications')
          .select(`id, status, submitted_at, users!user_id ( first_name, last_name, email ), certifications_catalog ( display_name )`)
          .in('status', ['pending', 'in_review'])
          .order('submitted_at', { ascending: false })
          .limit(5),
      ])

      const errors = [pendingRes, certifiedRes, usersRes, revenueRes, recentRes].map((r) => r.error?.message).filter(Boolean)
      if (errors.length) { setStatsError(errors.join(' | ')); }

      const revenue = (revenueRes.data || []).reduce((sum: number, row: { amount: number }) => sum + (row.amount ?? 0), 0)

      setStats({
        pendingApplications: pendingRes.count ?? 0,
        certifiedApplications: certifiedRes.count ?? 0,
        activeUsers: usersRes.count ?? 0,
        totalRevenue: revenue,
      })
      setRecentApps((recentRes.data as unknown as RecentApp[]) || [])
    } catch (err: any) {
      setStatsError(err.message || 'Error desconocido')
    } finally {
      setStatsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') loadStats()
  }, [authLoading, user, loadStats])

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
  if (!user || user.role !== 'admin') return null

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  const fullName = (app: RecentApp) =>
    `${app.users?.first_name ?? ''} ${app.users?.last_name ?? ''}`.trim() || app.users?.email || '—'

  const statCards = [
    { label: 'Solicitudes pendientes',  value: stats.pendingApplications,              variant: 'info'    as const },
    { label: 'Certificaciones emitidas', value: stats.certifiedApplications,            variant: 'success' as const },
    { label: 'Usuarios activos',         value: stats.activeUsers,                      variant: 'default' as const },
    { label: 'Ingresos totales',         value: formatCurrency(stats.totalRevenue),     variant: 'warning' as const },
  ]

  return (
    <div style={{ padding: spacing.lg }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: spacing.xl }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: spacing.md }}>
          <div>
            <h1 style={{ fontFamily: typography.family.title, fontSize: '2rem', fontWeight: 700, color: colors.neutral[800], margin: 0 }}>
              Panel de Administración
            </h1>
            <p style={{ color: colors.neutral[500], marginTop: spacing.xs, fontSize: '0.9rem' }}>
              Conectado como <strong>{user.email}</strong>
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={loadStats} disabled={statsLoading}
            icon={<RefreshCw style={{ width: 14, height: 14, ...(statsLoading ? { animation: 'spin 1s linear infinite' } : {}) }} />}
          >
            Actualizar
          </Button>
        </div>
      </motion.div>

      {/* Error banner */}
      {statsError && (
        <div style={{ display: 'flex', gap: spacing.sm, padding: spacing.md, backgroundColor: colors.semantic.danger + '1A', border: `1px solid ${colors.semantic.danger}33`, borderRadius: 8, marginBottom: spacing.lg }}>
          <AlertCircle style={{ width: 20, height: 20, color: colors.semantic.danger, flexShrink: 0 }} />
          <span style={{ color: colors.semantic.danger, fontSize: '0.9rem' }}>{statsError}</span>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: spacing.lg, marginBottom: spacing.xl }}>
        {statCards.map((card, i) => (
          <AnimatedCard key={card.label} variant={card.variant} padding="lg" delay={i * 80}>
            <p style={{ color: colors.neutral[500], fontSize: '0.85rem', margin: `0 0 ${spacing.sm}` }}>{card.label}</p>
            <p style={{ fontFamily: typography.family.title, fontSize: '2rem', fontWeight: 800, margin: 0,
              color: card.variant === 'info' ? colors.semantic.info : card.variant === 'success' ? colors.semantic.success : card.variant === 'warning' ? colors.semantic.warning : colors.neutral[800],
            }}>
              {statsLoading ? <span style={{ display: 'inline-block', width: 60, height: 28, background: colors.neutral[200], borderRadius: 4 }} /> : card.value}
            </p>
          </AnimatedCard>
        ))}
      </div>

      {/* Recent applications */}
      <Card variant="default" padding="lg">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg }}>
          <h2 style={{ fontFamily: typography.family.title, fontSize: '1.25rem', fontWeight: 700, color: colors.neutral[800], margin: 0 }}>
            Solicitudes pendientes
          </h2>
          <Link href="/dashboard/admin/applications" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: colors.primary.idm, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            Ver todas <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {statsLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: `${spacing['2xl']} 0` }}>
            <Loader2 style={{ width: 28, height: 28, color: colors.primary.idm, animation: 'spin 1s linear infinite' }} />
          </div>
        ) : recentApps.length === 0 ? (
          <p style={{ color: colors.neutral[500], textAlign: 'center', padding: `${spacing.xl} 0` }}>No hay solicitudes pendientes</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.neutral[200]}` }}>
                  {['Solicitante', 'Certificación', 'Estado', 'Fecha', ''].map((h, i) => (
                    <th key={i} style={{ padding: `${spacing.sm} ${spacing.md}`, textAlign: 'left', fontWeight: 700, fontSize: '0.85rem', color: colors.neutral[600] }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app, idx) => (
                  <tr key={app.id} style={{ borderBottom: `1px solid ${colors.neutral[100]}`, backgroundColor: idx % 2 === 1 ? colors.neutral[50] : 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary.idm + '0D' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = idx % 2 === 1 ? colors.neutral[50] : 'transparent' }}
                  >
                    <td style={{ padding: `${spacing.sm} ${spacing.md}` }}>
                      <div style={{ fontWeight: 600, color: colors.neutral[800], fontSize: '0.9rem' }}>{fullName(app)}</div>
                      <div style={{ fontSize: '0.75rem', color: colors.neutral[500] }}>{app.users?.email ?? ''}</div>
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}`, color: colors.neutral[700], fontSize: '0.9rem' }}>
                      {app.certifications_catalog?.display_name ?? '—'}
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}` }}>
                      <Badge status={app.status} size="sm" />
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}`, color: colors.neutral[500], fontSize: '0.875rem' }}>
                      {formatDate(app.submitted_at)}
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}`, textAlign: 'right' }}>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/admin/applications/${app.id}`)}>
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <AdminCreateCertificateSection />

    </div>
  )
}
