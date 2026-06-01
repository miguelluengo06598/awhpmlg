'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FileText, Eye, Loader2, RefreshCw, AlertCircle,
  Search, ChevronLeft, ChevronRight, X,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { Badge, Button } from '@/components/ui'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Application {
  id: string
  status: string
  submitted_at: string
  years_of_experience: number | null
  users: { first_name: string; last_name: string; email: string } | null
  certifications_catalog: { display_name: string } | null
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending:        { label: 'Pendiente',       color: 'bg-orange-50 text-orange-700 border-orange-200' },
  in_review:      { label: 'En revisión',     color: 'bg-blue-50 text-blue-700 border-blue-100' },
  approved:       { label: 'Aprobado',        color: 'bg-green-50 text-green-700 border-green-100' },
  rejected:       { label: 'Rechazado',       color: 'bg-red-50 text-red-700 border-red-100' },
  exam_scheduled: { label: 'Examen prog.',    color: 'bg-violet-50 text-violet-700 border-violet-100' },
  exam_passed:    { label: 'Examen superado', color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  certified:      { label: 'Certificado',     color: 'bg-teal-50 text-teal-700 border-teal-100' },
}

const STATUS_OPTIONS = [
  { value: '', label: 'Todos los estados' },
  { value: 'pending',        label: 'Pendiente' },
  { value: 'in_review',      label: 'En revisión' },
  { value: 'approved',       label: 'Aprobado' },
  { value: 'exam_scheduled', label: 'Examen programado' },
  { value: 'exam_passed',    label: 'Examen superado' },
  { value: 'certified',      label: 'Certificado' },
  { value: 'rejected',       label: 'Rechazado' },
]

const PAGE_SIZE = 15

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminApplicationsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [allApplications, setAllApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Filters
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // Pagination
  const [page, setPage] = useState(1)

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchApplications = useCallback(async () => {
    if (!user || user.role !== 'admin') return
    setLoading(true)
    setError('')

    try {
      const { data, error: dbError } = await supabase
        .from('certifications_applications')
        .select(`
          id, status, submitted_at, years_of_experience,
          users!user_id ( first_name, last_name, email ),
          certifications_catalog ( display_name )
        `)
        .order('submitted_at', { ascending: false })
        .limit(500)

      if (dbError) throw new Error(dbError.message)

      const rows = (data as unknown as Application[]) || []
      setAllApplications(rows)
    } catch (err: any) {
      const msg = err.message || 'Error desconocido'
      console.error('AdminApplications:', msg)
      setError(msg)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') fetchApplications()
  }, [authLoading, user, fetchApplications])

  // Reset page when filters change
  useEffect(() => { setPage(1) }, [search, statusFilter])

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allApplications.filter((app) => {
      const name = `${app.users?.first_name ?? ''} ${app.users?.last_name ?? ''}`.toLowerCase()
      const email = (app.users?.email ?? '').toLowerCase()
      const matchesSearch = !q || name.includes(q) || email.includes(q)
      const matchesStatus = !statusFilter || app.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [allApplications, search, statusFilter])

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
      </div>
    )
  }
  if (!user || user.role !== 'admin') return null

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const fullName = (app: Application) =>
    `${app.users?.first_name ?? ''} ${app.users?.last_name ?? ''}`.trim() || app.users?.email || '—'

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">Solicitudes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Cargando...'
              : `${filtered.length} de ${allApplications.length} solicitudes`}
          </p>
        </div>
        <button
          onClick={fetchApplications}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 self-start"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div><strong>Error:</strong> {error}</div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o email..."
            className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue bg-white text-gray-700"
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <FileText className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">
              {allApplications.length === 0
                ? 'No hay solicitudes todavía'
                : 'Sin resultados para los filtros aplicados'}
            </p>
            {(search || statusFilter) && (
              <button
                onClick={() => { setSearch(''); setStatusFilter('') }}
                className="mt-3 text-sm text-pmi-blue hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Solicitante</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden md:table-cell">Email</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Certificación</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Estado</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden lg:table-cell">Exp.</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden sm:table-cell">Fecha</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((app) => {
                  const s = STATUS_MAP[app.status] ?? {
                    label: app.status,
                    color: 'bg-gray-100 text-gray-700 border-gray-200',
                  }
                  return (
                    <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Name */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-pmi-dark">{fullName(app)}</div>
                        <div className="text-xs text-gray-400 md:hidden">{app.users?.email ?? ''}</div>
                      </td>

                      {/* Email — hidden on small screens (shown inline above) */}
                      <td className="px-5 py-4 text-gray-500 hidden md:table-cell">
                        {app.users?.email ?? '—'}
                      </td>

                      {/* Certification */}
                      <td className="px-5 py-4 text-gray-700 max-w-[160px]">
                        <span className="line-clamp-2 leading-snug">
                          {app.certifications_catalog?.display_name ?? '—'}
                        </span>
                      </td>

                      {/* Status badge */}
                      <td className="px-5 py-4">
                        <Badge status={app.status} size="sm" />
                      </td>

                      {/* Experience */}
                      <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">
                        {app.years_of_experience != null ? `${app.years_of_experience} años` : '—'}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap hidden sm:table-cell">
                        {formatDate(app.submitted_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/admin/applications/${app.id}`)}>
                          <Eye className="w-3.5 h-3.5" /> Ver
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-gray-500">
            Página {page} de {totalPages} · {filtered.length} resultados
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers — show up to 5 around current */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce<(number | '…')[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('…')
                acc.push(p)
                return acc
              }, [])
              .map((p, i) =>
                p === '…' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === p
                        ? 'bg-pmi-dark text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
