'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Users, Loader2, AlertCircle, RefreshCw,
  Search, X, CheckCircle2, Ban,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

interface UserRow {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  company: string | null
  country: string | null
  role: string
  is_active: boolean
  created_at: string
}

const ROLE_COLORS: Record<string, string> = {
  admin:  'bg-red-100 text-red-800 border-red-200',
  staff:  'bg-blue-100 text-blue-800 border-blue-200',
  client: 'bg-gray-100 text-gray-700 border-gray-200',
}

const ROLE_OPTIONS = [
  { value: '', label: 'Todos los roles' },
  { value: 'admin',  label: 'Admin' },
  { value: 'staff',  label: 'Staff' },
  { value: 'client', label: 'Client' },
]

export default function AdminUsersPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [allUsers, setAllUsers] = useState<UserRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')

  // Auth guard
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  const fetchUsers = useCallback(async () => {
    if (!user || user.role !== 'admin') return
    setLoading(true)
    setError('')
    try {
      const { data, error: dbError } = await supabase
        .from('users')
        .select('id, first_name, last_name, email, phone, company, country, role, is_active, created_at')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(500)

      if (dbError) throw new Error(dbError.message)
      setAllUsers((data as UserRow[]) || [])
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') fetchUsers()
  }, [authLoading, user, fetchUsers])

  const toggleActive = async (uid: string, current: boolean) => {
    setUpdating(uid)
    const { error: updateError } = await supabase
      .from('users')
      .update({ is_active: !current })
      .eq('id', uid)

    if (updateError) {
      setError(updateError.message)
    } else {
      setAllUsers((prev) => prev.map((u) => u.id === uid ? { ...u, is_active: !current } : u))
    }
    setUpdating(null)
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return allUsers.filter((u) => {
      const name = `${u.first_name} ${u.last_name}`.toLowerCase()
      const matchSearch = !q || name.includes(q) || u.email.toLowerCase().includes(q) || (u.company ?? '').toLowerCase().includes(q)
      const matchRole = !roleFilter || u.role === roleFilter
      return matchSearch && matchRole
    })
  }, [allUsers, search, roleFilter])

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
  if (!user || user.role !== 'admin') return null

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const initials = (u: UserRow) =>
    `${u.first_name?.[0] ?? ''}${u.last_name?.[0] ?? ''}`.toUpperCase() || u.email[0].toUpperCase()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">Usuarios</h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Cargando...' : `${filtered.length} de ${allUsers.length} usuarios`}
          </p>
        </div>
        <button onClick={fetchUsers} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 self-start">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Actualizar
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div><strong>Error:</strong> {error}</div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Nombre, email o empresa..."
            className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <select
          value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue bg-white text-gray-700"
        >
          {ROLE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">{allUsers.length === 0 ? 'No hay usuarios registrados' : 'Sin resultados para los filtros aplicados'}</p>
            {(search || roleFilter) && <button onClick={() => { setSearch(''); setRoleFilter('') }} className="mt-3 text-sm text-pmi-blue hover:underline">Limpiar filtros</button>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Usuario</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden md:table-cell">Empresa</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden lg:table-cell">País</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Rol</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5 hidden sm:table-cell">Registro</th>
                  <th className="text-left font-semibold text-gray-600 px-5 py-3.5">Estado</th>
                  <th className="text-right font-semibold text-gray-600 px-5 py-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-pmi-dark/10 flex items-center justify-center text-xs font-bold text-pmi-dark shrink-0">
                          {initials(u)}
                        </div>
                        <div>
                          <div className="font-medium text-pmi-dark">
                            {`${u.first_name} ${u.last_name}`.trim() || '—'}
                          </div>
                          <div className="text-xs text-gray-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600 hidden md:table-cell">{u.company || '—'}</td>
                    <td className="px-5 py-4 text-gray-600 hidden lg:table-cell">{u.country || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${ROLE_COLORS[u.role] ?? 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 hidden sm:table-cell">{formatDate(u.created_at)}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-medium ${u.is_active ? 'text-green-600' : 'text-gray-400'}`}>
                        {u.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      {updating === u.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-gray-400 ml-auto" />
                      ) : (
                        <button
                          onClick={() => toggleActive(u.id, u.is_active)}
                          disabled={u.id === user.id}
                          title={u.is_active ? 'Desactivar' : 'Activar'}
                          className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${u.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'}`}
                        >
                          {u.is_active ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
