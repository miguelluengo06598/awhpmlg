'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail, Loader2, AlertCircle, RefreshCw,
  CheckCheck, ChevronDown, ChevronUp, X,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'

interface Message {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  is_read: boolean
  replied_at: string | null
  created_at: string
}

const FILTER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'unread', label: 'No leídos' },
  { value: 'read', label: 'Leídos' },
  { value: 'replied', label: 'Respondidos' },
]

export default function AdminMessagesPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  const [allMessages, setAllMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)

  // Auth guard
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  const fetchMessages = useCallback(async () => {
    if (!user || user.role !== 'admin') return
    setLoading(true)
    setError('')
    try {
      const { data, error: dbError } = await supabase
        .from('contact_messages')
        .select('id, name, email, subject, message, is_read, replied_at, created_at')
        .order('created_at', { ascending: false })
        .limit(500)

      if (dbError) throw new Error(dbError.message)
      setAllMessages((data as Message[]) || [])
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') fetchMessages()
  }, [authLoading, user, fetchMessages])

  const markRead = async (id: string) => {
    setUpdating(id)
    const { error: updateError } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setAllMessages((prev) => prev.map((m) => m.id === id ? { ...m, is_read: true } : m))
    }
    setUpdating(null)
  }

  const filtered = useMemo(() => {
    return allMessages.filter((m) => {
      if (filter === 'unread') return !m.is_read
      if (filter === 'read') return m.is_read && !m.replied_at
      if (filter === 'replied') return !!m.replied_at
      return true
    })
  }, [allMessages, filter])

  const unreadCount = useMemo(() => allMessages.filter((m) => !m.is_read).length, [allMessages])

  if (authLoading) return <div className="min-h-[40vh] flex items-center justify-center"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
  if (!user || user.role !== 'admin') return null

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark flex items-center gap-3">
            Mensajes de contacto
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {loading ? 'Cargando...' : `${filtered.length} de ${allMessages.length} mensajes`}
          </p>
        </div>
        <button onClick={fetchMessages} disabled={loading} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 self-start">
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
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              filter === opt.value
                ? 'bg-white text-pmi-dark shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {opt.label}
            {opt.value === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Message list */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 text-pmi-blue animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Mail className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 font-medium">{allMessages.length === 0 ? 'No hay mensajes todavía' : 'Sin mensajes para el filtro seleccionado'}</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {filtered.map((msg) => {
              const isExpanded = expanded === msg.id
              return (
                <li key={msg.id} className={`transition-colors ${!msg.is_read ? 'bg-blue-50/30' : ''}`}>
                  {/* Header row */}
                  <div
                    className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/60"
                    onClick={() => setExpanded(isExpanded ? null : msg.id)}
                  >
                    {/* Unread dot */}
                    <div className="mt-1.5 shrink-0">
                      {!msg.is_read
                        ? <div className="w-2 h-2 rounded-full bg-blue-500" />
                        : <div className="w-2 h-2 rounded-full bg-transparent" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-semibold ${!msg.is_read ? 'text-pmi-dark' : 'text-gray-700'}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-400">{msg.email}</span>
                        {msg.replied_at && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            Respondido
                          </span>
                        )}
                      </div>
                      <p className={`text-sm mt-0.5 ${!msg.is_read ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                        {msg.subject || '(Sin asunto)'}
                      </p>
                      {!isExpanded && (
                        <p className="text-xs text-gray-400 mt-0.5 truncate">{msg.message}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-xs text-gray-400 hidden sm:block">{formatDate(msg.created_at)}</span>
                      {isExpanded
                        ? <ChevronUp className="w-4 h-4 text-gray-400" />
                        : <ChevronDown className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                  </div>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div className="px-5 pb-5 ml-6">
                      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
                        {msg.message}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
                        <div className="flex-1" />
                        {!msg.is_read && (
                          <button
                            onClick={() => markRead(msg.id)}
                            disabled={updating === msg.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                          >
                            {updating === msg.id
                              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : <CheckCheck className="w-3.5 h-3.5" />}
                            Marcar leído
                          </button>
                        )}
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Tu mensaje en AECOMI')}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-pmi-dark hover:bg-pmi-blue rounded-lg transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" /> Responder por email
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
