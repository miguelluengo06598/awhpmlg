'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { AnimatedCard, Card, Badge, Button } from '@/components/ui'
import { colors, spacing, typography } from '@/lib/design-system'
import { ClientCertificatesSection } from '@/components/sections/ClientCertificatesSection'

interface Stats {
  totalApplications: number
  certifiedApplications: number
  totalDocuments: number
}

interface MyApp {
  id: string
  status: string
  submitted_at: string
  certifications_catalog: { display_name: string } | null
}

const QUICK_ACTIONS = [
  { label: 'Nueva solicitud',    href: '/dashboard/client/apply-certification' },
  { label: 'Mis documentos',     href: '/dashboard/client/documents' },
  { label: 'Mis pagos',          href: '/dashboard/client/payments' },
  { label: 'Configuración',      href: '/dashboard/client/settings' },
]

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [stats, setStats] = useState<Stats>({ totalApplications: 0, certifiedApplications: 0, totalDocuments: 0 })
  const [recentApps, setRecentApps] = useState<MyApp[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState('')

  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role === 'admin') { router.replace('/dashboard/admin'); return }
  }, [user, authLoading, router])

  const loadData = useCallback(async () => {
    if (!user || user.role === 'admin') return
    setDataLoading(true)
    setDataError('')

    try {
      const [totalRes, certRes, appsRes, allAppIdsRes] = await Promise.all([
        supabase.from('certifications_applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('certifications_applications').select('*', { count: 'exact', head: true }).eq('user_id', user.id).eq('status', 'certified'),
        supabase.from('certifications_applications')
          .select(`id, status, submitted_at, certifications_catalog ( display_name )`)
          .eq('user_id', user.id)
          .order('submitted_at', { ascending: false })
          .limit(5),
        supabase.from('certifications_applications').select('id').eq('user_id', user.id),
      ])

      // Count documents across all user applications to avoid RLS issues
      let docCount = 0
      const allAppIds = (allAppIdsRes.data || []).map((a: any) => a.id)
      if (allAppIds.length > 0) {
        const { count } = await supabase.from('documents').select('*', { count: 'exact', head: true }).in('application_id', allAppIds).is('deleted_at', null)
        docCount = count ?? 0
      }

      setStats({
        totalApplications: totalRes.count ?? 0,
        certifiedApplications: certRes.count ?? 0,
        totalDocuments: docCount,
      })
      setRecentApps((appsRes.data as unknown as MyApp[]) || [])
    } catch (err: any) {
      setDataError(err.message || 'Error desconocido')
    } finally {
      setDataLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user && user.role !== 'admin') loadData()
  }, [authLoading, user, loadData])

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
  if (!user || user.role === 'admin') return null

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

  const statCards = [
    { label: 'Mis solicitudes',         value: stats.totalApplications,     variant: 'info'    as const },
    { label: 'Certificaciones activas', value: stats.certifiedApplications,  variant: 'success' as const },
    { label: 'Documentos subidos',      value: stats.totalDocuments,         variant: 'default' as const },
  ]

  return (
    <div style={{ padding: spacing.lg }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: spacing.xl }}>
        <h1 style={{ fontFamily: typography.family.title, fontSize: '2rem', fontWeight: 700, color: colors.neutral[800], margin: `0 0 ${spacing.xs}` }}>
          Mi Dashboard
        </h1>
        <p style={{ color: colors.neutral[500], fontSize: '0.9rem' }}>
          Bienvenido, <strong>{user.email}</strong>
        </p>
      </motion.div>

      {/* Error banner */}
      {dataError && (
        <div style={{ display: 'flex', gap: spacing.sm, padding: spacing.md, backgroundColor: colors.semantic.danger + '1A', border: `1px solid ${colors.semantic.danger}33`, borderRadius: 8, marginBottom: spacing.lg }}>
          <AlertCircle style={{ width: 20, height: 20, color: colors.semantic.danger, flexShrink: 0 }} />
          <span style={{ color: colors.semantic.danger, fontSize: '0.9rem' }}>{dataError}</span>
        </div>
      )}

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacing.lg, marginBottom: spacing.xl }}>
        {statCards.map((card, i) => (
          <AnimatedCard key={card.label} variant={card.variant} padding="lg" delay={i * 80}>
            <p style={{ color: colors.neutral[500], fontSize: '0.85rem', margin: `0 0 ${spacing.sm}` }}>{card.label}</p>
            <p style={{
              fontFamily: typography.family.title, fontSize: '2rem', fontWeight: 800, margin: 0,
              color: card.variant === 'info' ? colors.semantic.info : card.variant === 'success' ? colors.semantic.success : colors.neutral[800],
            }}>
              {dataLoading
                ? <span style={{ display: 'inline-block', width: 48, height: 28, background: colors.neutral[200], borderRadius: 4 }} />
                : card.value}
            </p>
          </AnimatedCard>
        ))}
      </div>

      {/* Certificates */}
      <ClientCertificatesSection userId={user.id} />

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: spacing.md, flexWrap: 'wrap', marginBottom: spacing.xl }}>
        {QUICK_ACTIONS.map((a) => (
          <Button key={a.href} variant={a.href.includes('apply') ? 'primary' : 'outline'} size="md" onClick={() => router.push(a.href)}>
            {a.label}
          </Button>
        ))}
      </div>

      {/* Recent applications */}
      <Card variant="default" padding="lg">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg }}>
          <h2 style={{ fontFamily: typography.family.title, fontSize: '1.25rem', fontWeight: 700, color: colors.neutral[800], margin: 0 }}>
            Mis solicitudes
          </h2>
          <Link href="/dashboard/client/applications" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: colors.primary.idm, fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            Ver todas <ArrowRight style={{ width: 14, height: 14 }} />
          </Link>
        </div>

        {dataLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: `${spacing['2xl']} 0` }}>
            <Loader2 style={{ width: 28, height: 28, color: colors.primary.idm, animation: 'spin 1s linear infinite' }} />
          </div>
        ) : recentApps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: `${spacing.xl} 0` }}>
            <p style={{ color: colors.neutral[500], marginBottom: spacing.md }}>No has creado ninguna solicitud aún</p>
            <Button variant="primary" onClick={() => router.push('/dashboard/client/apply-certification')}>
              Solicitar certificación
            </Button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.neutral[200]}` }}>
                  {['Certificación', 'Estado', 'Fecha', ''].map((h, i) => (
                    <th key={i} style={{ padding: `${spacing.sm} ${spacing.md}`, textAlign: 'left', fontWeight: 700, fontSize: '0.85rem', color: colors.neutral[600] }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app, idx) => (
                  <tr key={app.id}
                    style={{ borderBottom: `1px solid ${colors.neutral[100]}`, backgroundColor: idx % 2 === 1 ? colors.neutral[50] : 'transparent' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.primary.idm + '0D' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = idx % 2 === 1 ? colors.neutral[50] : 'transparent' }}
                  >
                    <td style={{ padding: `${spacing.sm} ${spacing.md}`, fontWeight: 600, color: colors.neutral[800], fontSize: '0.9rem' }}>
                      {app.certifications_catalog?.display_name ?? '—'}
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}` }}>
                      <Badge status={app.status} size="sm" />
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}`, color: colors.neutral[500], fontSize: '0.875rem' }}>
                      {formatDate(app.submitted_at)}
                    </td>
                    <td style={{ padding: `${spacing.sm} ${spacing.md}`, textAlign: 'right' }}>
                      <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/client/applications/${app.id}`)}>
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

    </div>
  )
}
