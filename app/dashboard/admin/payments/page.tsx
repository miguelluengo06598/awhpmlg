'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  CreditCard, Loader2, AlertCircle, RefreshCw, CheckCircle2, X,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

interface Payment {
  id: string
  amount: number
  currency: string
  method: string
  status: string
  transaction_id: string | null
  paid_at: string | null
  created_at: string
  users: { first_name: string; last_name: string; email: string } | null
  certifications_applications: {
    certifications_catalog: { display_name: string } | null
  } | null
}

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending:   { label: 'Pendiente',  color: 'bg-orange-50 text-orange-700 border-orange-200' },
  completed: { label: 'Completado', color: 'bg-green-50 text-green-700 border-green-100' },
  failed:    { label: 'Fallido',    color: 'bg-red-50 text-red-700 border-red-100' },
  refunded:  { label: 'Devuelto',   color: 'bg-gray-100 text-gray-700 border-gray-200' },
}

const STATUS_OPTIONS = [
  { value: '', label: 'Todos los estados' },
  { value: 'pending',   label: 'Pendiente' },
  { value: 'completed', label: 'Completado' },
  { value: 'failed',    label: 'Fallido' },
  { value: 'refunded',  label: 'Devuelto' },
]

export default function AdminPaymentsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [allPayments, setAllPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState('')

  // Auth guard
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  const fetchPayments = useCallback(async () => {
    if (!user || user.role !== 'admin') return
    setLoading(true)
    setError('')
    try {
      const { data, error: dbError } = await supabase
        .from('payments')
        .select(`
          id, amount, currency, method, status, transaction_id, paid_at, created_at,
          users ( first_name, last_name, email ),
          certifications_applications (
            certifications_catalog ( display_name )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(500)

      if (dbError) throw new Error(dbError.message)
      setAllPayments((data as unknown as Payment[]) || [])
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') fetchPayments()
  }, [authLoading, user, fetchPayments])

  const markCompleted = async (id: string) => {
    setUpdating(id)
    const { error: updateError } = await supabase
      .from('payments')
      .update({ status: 'completed', paid_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setAllPayments((prev) =>
        prev.map((p) => p.id === id ? { ...p, status: 'completed', paid_at: new Date().toISOString() } : p)
      )
    }
    setUpdating(null)
  }

  const filtered = useMemo(
    () => allPayments.filter((p) => !statusFilter || p.status === statusFilter),
    [allPayments, statusFilter]
  )

  // Total revenue from completed payments in current filter
  const totalRevenue = useMemo(
    () => filtered.filter((p) => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    [filtered]
  )

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
  if (!user || user.role !== 'admin') return null

  const formatDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'

  const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency }).format(amount)

  const userName = (p: Payment) =>
    p.users ? `${p.users.first_name || ''} ${p.users.last_name || ''}`.trim() || p.users.email : '—'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">Pagos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Cargando...' : `${filtered.length} registros · Ingresos completados: ${formatAmount(totalRevenue, 'EUR')}`}
          </p>
        </div>
        <button onClick={fetchPayments} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 self-start">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualizar
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div><strong>Error:</strong> {error}</div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-3">
        <select
          value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue bg-white text-gray-700"
        >
          {STATUS_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        {statusFilter && (
          <button onClick={() => setStatusFilter('')} className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-3.5 h-3.5" /> Limpiar
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <CreditCard className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">{allPayments.length === 0 ? 'No hay pagos registrados' : 'Sin resultados para el filtro seleccionado'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Usuario</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden md:table-cell">Certificación</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Monto</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden sm:table-cell">Método</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Estado</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden lg:table-cell">Fecha</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((p) => {
                  const s = STATUS_MAP[p.status] ?? { label: p.status, color: 'bg-gray-100 text-gray-700 border-gray-200' }
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-medium text-pmi-dark">{userName(p)}</div>
                        <div className="text-xs text-gray-400">{p.users?.email ?? ''}</div>
                      </td>
                      <td className="px-5 py-4 text-gray-700 hidden md:table-cell">
                        {p.certifications_applications?.certifications_catalog?.display_name ?? '—'}
                      </td>
                      <td className="px-5 py-4 font-semibold text-pmi-dark">
                        {formatAmount(p.amount, p.currency)}
                      </td>
                      <td className="px-5 py-4 text-gray-500 hidden sm:table-cell capitalize">{p.method}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${s.color}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-500 hidden lg:table-cell">
                        {formatDate(p.paid_at ?? p.created_at)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {updating === p.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-auto" />
                        ) : p.status === 'pending' ? (
                          <button
                            onClick={() => markCompleted(p.id)}
                            title="Marcar como completado"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
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
