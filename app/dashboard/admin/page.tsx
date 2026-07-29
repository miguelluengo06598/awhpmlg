'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Loader2, AlertCircle, RefreshCw, Clock, Award, Users, Wallet } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { Badge, Button } from '@/components/ui'
import { MetricCard } from '@/components/admin/ui/MetricCard'
import { useDashboardLocale } from '@/lib/useDashboardLocale'
import { translations } from '@/lib/translations'
import { AdminCreateCertificateSection } from '@/components/sections/AdminCreateCertificateSection'
import { AdminIssuedCertificatesSection } from '@/components/sections/AdminIssuedCertificatesSection'

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
  const { locale } = useDashboardLocale()
  const d = translations[locale].admin.dashboard

  const [certRefreshKey, setCertRefreshKey] = useState(0)

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
        supabase.from('payments').select('amount').eq('status', 'completed').limit(10000),
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
      setStatsError(err.message || d.unknownError)
    } finally {
      setStatsLoading(false)
    }
  }, [user, d.unknownError])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') loadStats()
  }, [authLoading, user, loadStats])

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /></div>
  if (!user || user.role !== 'admin') return null

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
  const fullName = (app: RecentApp) =>
    `${app.users?.first_name ?? ''} ${app.users?.last_name ?? ''}`.trim() || app.users?.email || '—'

  const statCards = [
    { label: d.statPending,   value: stats.pendingApplications,          icon: Clock,  accent: 'cyan'   as const },
    { label: d.statCertified, value: stats.certifiedApplications,        icon: Award,  accent: 'indigo' as const },
    { label: d.statUsers,     value: stats.activeUsers,                  icon: Users,  accent: 'violet' as const },
    { label: d.statRevenue,   value: formatCurrency(stats.totalRevenue), icon: Wallet, accent: 'amber'  as const },
  ]

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{d.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {d.connectedAs} <strong className="text-slate-700">{user.email}</strong>
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadStats}
          disabled={statsLoading}
          icon={<RefreshCw style={{ width: 14, height: 14, ...(statsLoading ? { animation: 'spin 1s linear infinite' } : {}) }} />}
        >
          {d.refresh}
        </Button>
      </motion.div>

      {/* Error banner */}
      {statsError && (
        <div className="mb-6 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <span className="text-sm text-red-700">{statsError}</span>
        </div>
      )}

      {/* Stat cards */}
      <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((c, i) => (
          <MetricCard key={c.label} title={c.label} value={c.value} icon={c.icon} accent={c.accent} delay={i * 80} loading={statsLoading} />
        ))}
      </div>

      {/* Recent applications */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-slate-900">{d.recentTitle}</h2>
          <Link href="/dashboard/admin/applications" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-700">
            {d.viewAll} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {statsLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-7 w-7 animate-spin text-cyan-500" />
          </div>
        ) : recentApps.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">{d.noRecent}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  {[d.colApplicant, d.colCertification, d.colStatus, d.colDate, ''].map((h, i) => (
                    <th key={i} className="px-4 py-2.5 text-left text-[13px] font-semibold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentApps.map((app, idx) => (
                  <tr key={app.id} className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${idx % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold text-slate-800">{fullName(app)}</div>
                      <div className="text-xs text-slate-500">{app.users?.email ?? ''}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{app.certifications_catalog?.display_name ?? '—'}</td>
                    <td className="px-4 py-3"><Badge status={app.status} size="sm" /></td>
                    <td className="px-4 py-3 text-sm text-slate-500">{formatDate(app.submitted_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/admin/applications/${app.id}`)}>
                        {d.view}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdminCreateCertificateSection onCreated={() => setCertRefreshKey((k) => k + 1)} />

      <AdminIssuedCertificatesSection refreshKey={certRefreshKey} />

    </div>
  )
}
