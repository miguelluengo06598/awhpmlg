'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  FileText, Plus, Eye, Loader2, AlertCircle,
  RefreshCw, Clock, CheckCircle2, X,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { Badge, Button } from '@/components/ui'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Application {
  id: string
  status: string
  submitted_at: string
  exam_date: string | null
  certifications_catalog: { display_name: string } | null
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; color: string; nextStep: string }> = {
  pending:        { label: 'Pendiente',       color: 'bg-orange-50 text-orange-700 border-orange-200',    nextStep: 'El equipo revisará tu solicitud' },
  in_review:      { label: 'En revisión',     color: 'bg-blue-50 text-blue-700 border-blue-100',          nextStep: 'Revisión en curso, te avisaremos' },
  approved:       { label: 'Aprobado',        color: 'bg-green-50 text-green-700 border-green-100',       nextStep: 'Pendiente de programar examen' },
  rejected:       { label: 'Rechazado',       color: 'bg-red-50 text-red-700 border-red-100',             nextStep: 'Contacta con AECMI para más info' },
  exam_scheduled: { label: 'Examen prog.',    color: 'bg-violet-50 text-violet-700 border-violet-100',    nextStep: 'Prepárate para el examen' },
  exam_passed:    { label: 'Examen superado', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', nextStep: 'Certificado en proceso de emisión' },
  certified:      { label: 'Certificado',     color: 'bg-teal-50 text-teal-700 border-teal-100',          nextStep: 'Certificación emitida' },
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientApplicationsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [allApplications, setAllApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role === 'admin') { router.replace('/dashboard/admin'); return }
  }, [user, authLoading, router])

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchApplications = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError('')

    try {
      const { data, error: dbError } = await supabase
        .from('certifications_applications')
        .select(`
          id, status, submitted_at, exam_date,
          certifications_catalog ( display_name )
        `)
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false })

      if (dbError) throw new Error(dbError.message)
      setAllApplications((data as unknown as Application[]) || [])
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user && user.role !== 'admin') fetchApplications()
  }, [authLoading, user, fetchApplications])

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filtered = useMemo(
    () => allApplications.filter((a) => !statusFilter || a.status === statusFilter),
    [allApplications, statusFilter]
  )

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
      </div>
    )
  }
  if (!user || user.role === 'admin') return null

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">Mis Solicitudes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading
              ? 'Cargando...'
              : `${filtered.length} de ${allApplications.length} solicitud${allApplications.length !== 1 ? 'es' : ''}`}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start">
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="p-2.5 text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            title="Actualizar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            href="/dashboard/client/apply-certification"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" /> Nueva solicitud
          </Link>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div><strong>Error:</strong> {error}</div>
        </div>
      )}

      {/* Filter */}
      {!loading && allApplications.length > 0 && (
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue bg-white text-gray-700"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {statusFilter && (
            <button
              onClick={() => setStatusFilter('')}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Limpiar
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
          </div>
        ) : allApplications.length === 0 ? (
          /* ── Empty state — no applications at all ── */
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-700 font-semibold mb-1">No has creado ninguna solicitud</p>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Comienza el proceso de certificación BIM enviando tu primera solicitud.
            </p>
            <Link
              href="/dashboard/client/apply-certification"
              className="inline-flex items-center gap-2 px-5 py-3 bg-pmi-dark text-white text-sm font-semibold rounded-xl hover:bg-pmi-blue transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Solicitar certificación
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          /* ── Empty state — filter returned nothing ── */
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <FileText className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm font-medium">Sin resultados para el filtro seleccionado</p>
            <button
              onClick={() => setStatusFilter('')}
              className="mt-3 text-sm text-pmi-blue hover:underline"
            >
              Ver todas mis solicitudes
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Certificación</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Estado</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden sm:table-cell">Fecha</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden md:table-cell">Próximo paso</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((app) => {
                  const s = STATUS_MAP[app.status] ?? {
                    label: app.status,
                    color: 'bg-gray-100 text-gray-700 border-gray-200',
                    nextStep: '',
                  }

                  return (
                    <tr key={app.id} className="hover:bg-gray-50/60 transition-colors">

                      {/* Certification + exam date if scheduled */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-pmi-dark">
                          {app.certifications_catalog?.display_name ?? '—'}
                        </div>
                        {app.exam_date && app.status === 'exam_scheduled' && (
                          <div className="flex items-center gap-1 text-xs text-violet-600 mt-0.5">
                            <Clock className="w-3 h-3" />
                            Examen: {formatDate(app.exam_date)}
                          </div>
                        )}
                        {app.status === 'certified' && (
                          <div className="flex items-center gap-1 text-xs text-teal-600 mt-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Certificado emitido
                          </div>
                        )}
                      </td>

                      {/* Status badge */}
                      <td className="px-5 py-4">
                        <Badge status={app.status} size="sm" />
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 text-gray-500 whitespace-nowrap hidden sm:table-cell">
                        {formatDate(app.submitted_at)}
                      </td>

                      {/* Next step */}
                      <td className="px-5 py-4 text-gray-400 text-xs hidden md:table-cell max-w-[180px]">
                        {s.nextStep}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/dashboard/client/applications/${app.id}`)}>
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

    </div>
  )
}
