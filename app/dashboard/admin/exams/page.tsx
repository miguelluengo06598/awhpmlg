'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, Loader2, AlertCircle, RefreshCw, Eye, X } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

interface ExamRow {
  id: string
  status: string
  exam_date: string
  users: { first_name: string; last_name: string; email: string } | null
  certifications_catalog: { display_name: string } | null
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  exam_scheduled: { label: 'Programado',      color: 'bg-violet-50 text-violet-700 border-violet-100' },
  exam_passed:    { label: 'Superado',         color: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  certified:      { label: 'Certificado',      color: 'bg-teal-50 text-teal-700 border-teal-100' },
}

const FILTER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'upcoming', label: 'Próximos' },
  { value: 'past', label: 'Pasados' },
]

export default function AdminExamsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [allExams, setAllExams] = useState<ExamRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('upcoming')

  // Auth guard
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  const fetchExams = useCallback(async () => {
    if (!user || user.role !== 'admin') return
    setLoading(true)
    setError('')
    try {
      const { data, error: dbError } = await supabase
        .from('certifications_applications')
        .select(`
          id, status, exam_date,
          users!user_id ( first_name, last_name, email ),
          certifications_catalog ( display_name )
        `)
        .not('exam_date', 'is', null)
        .in('status', ['exam_scheduled', 'exam_passed', 'certified'])
        .order('exam_date', { ascending: true })

      if (dbError) throw new Error(dbError.message)
      setAllExams((data as unknown as ExamRow[]) || [])
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') fetchExams()
  }, [authLoading, user, fetchExams])

  const now = new Date()
  const filtered = useMemo(() => {
    return allExams.filter((e) => {
      const d = new Date(e.exam_date)
      if (filter === 'upcoming') return d >= now
      if (filter === 'past') return d < now
      return true
    })
  }, [allExams, filter])

  const upcomingCount = useMemo(() => allExams.filter((e) => new Date(e.exam_date) >= now).length, [allExams])

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
  if (!user || user.role !== 'admin') return null

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

  const userName = (e: ExamRow) =>
    e.users ? `${e.users.first_name || ''} ${e.users.last_name || ''}`.trim() || e.users.email : '—'

  const isUpcoming = (iso: string) => new Date(iso) >= now

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">Exámenes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Cargando...' : `${upcomingCount} próximos · ${allExams.length} total`}
          </p>
        </div>
        <button onClick={fetchExams} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 self-start">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualizar
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div><strong>Error:</strong> {error}</div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {FILTER_OPTIONS.map((opt) => (
          <button key={opt.value} onClick={() => setFilter(opt.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${filter === opt.value ? 'bg-white text-pmi-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CalendarDays className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">
              {allExams.length === 0 ? 'No hay exámenes programados' : 'Sin exámenes para el filtro seleccionado'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Candidato</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden md:table-cell">Certificación</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Fecha y hora</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Estado</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((ex) => {
                  const s = STATUS_MAP[ex.status] ?? { label: ex.status, color: 'bg-gray-100 text-gray-700 border-gray-200' }
                  const upcoming = isUpcoming(ex.exam_date)
                  return (
                    <tr key={ex.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-pmi-dark">{userName(ex)}</div>
                        <div className="text-xs text-gray-400">{ex.users?.email ?? ''}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-700 hidden md:table-cell">
                        {ex.certifications_catalog?.display_name ?? '—'}
                      </td>
                      <td className="px-5 py-4">
                        <div className={`flex items-center gap-2 font-medium ${upcoming ? 'text-violet-700' : 'text-gray-500'}`}>
                          <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                          {formatDate(ex.exam_date)}
                        </div>
                        <div className="text-xs text-gray-400 ml-5">{formatTime(ex.exam_date)}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${s.color}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/dashboard/admin/applications/${ex.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-pmi-blue bg-pmi-blue/5 hover:bg-pmi-blue/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver solicitud
                        </Link>
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
