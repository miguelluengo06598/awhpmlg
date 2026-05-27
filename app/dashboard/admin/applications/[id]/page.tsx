'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, AlertCircle, User, Building2, Phone,
  Globe, FileText, Calendar, CheckCircle2, XCircle, Clock,
  Download, ExternalLink, Award, RefreshCw,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/hooks/useAuth'
import { Badge, Button } from '@/components/ui'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApplicationDetail {
  id: string
  status: string
  submitted_at: string
  updated_at: string
  reviewed_at: string | null
  exam_date: string | null
  notes: string | null
  years_of_experience: number | null
  professional_experience: string | null
  education_details: string | null
  users: {
    first_name: string
    last_name: string
    email: string
    phone: string | null
    company: string | null
    country: string | null
  } | null
  certifications_catalog: {
    display_name: string
    fee: number
    currency: string
  } | null
}

interface Document {
  id: string
  document_type: string
  file_name: string
  file_path: string
  file_size: number | null
  status: string
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

const DOC_TYPE_LABELS: Record<string, string> = {
  cv:           'CV / Currículum',
  portfolio:    'Portafolio',
  id_document:  'Documento de identidad',
  payment_proof:'Justificante de pago',
  education:    'Certificado de estudios',
  experience:   'Carta de experiencia',
  other:        'Otros',
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { user, loading: authLoading } = useAuth()

  const [app, setApp] = useState<ApplicationDetail | null>(null)
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Action states
  const [actionLoading, setActionLoading] = useState(false)
  const [actionError, setActionError] = useState('')

  // Rejection flow
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [rejectReason, setRejectReason] = useState('')

  // Exam scheduling flow
  const [showExamForm, setShowExamForm] = useState(false)
  const [examDate, setExamDate] = useState('')

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role !== 'admin') { router.replace('/dashboard/client'); return }
  }, [user, authLoading, router])

  // ── Load data ───────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!user || user.role !== 'admin' || !id) return
    setLoading(true)
    setError('')

    try {
      const [appRes, docsRes] = await Promise.all([
        supabase
          .from('certifications_applications')
          .select(`
            id, status, submitted_at, updated_at, reviewed_at, exam_date, notes,
            years_of_experience, professional_experience, education_details,
            users!user_id ( first_name, last_name, email, phone, company, country ),
            certifications_catalog ( display_name, fee, currency )
          `)
          .eq('id', id)
          .single(),

        supabase
          .from('documents')
          .select('id, document_type, file_name, file_path, file_size, status')
          .eq('application_id', id)
          .is('deleted_at', null)
          .order('created_at', { ascending: true }),
      ])

      if (appRes.error) {
        if (appRes.error.code === 'PGRST116') {
          setError('Solicitud no encontrada.')
        } else {
          throw new Error(appRes.error.message)
        }
        return
      }

      setApp(appRes.data as unknown as ApplicationDetail)
      setDocs((docsRes.data as unknown as Document[]) || [])
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [user, id])

  useEffect(() => {
    if (!authLoading && user?.role === 'admin') loadData()
  }, [authLoading, user, loadData])

  // ── Actions ─────────────────────────────────────────────────────────────────
  const updateStatus = async (newStatus: string, extra: Record<string, any> = {}) => {
    if (!app) return
    setActionLoading(true)
    setActionError('')

    const payload: Record<string, any> = {
      status: newStatus,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user!.id,
      ...extra,
    }

    const { error: updateError } = await supabase
      .from('certifications_applications')
      .update(payload)
      .eq('id', app.id)

    if (updateError) {
      setActionError(updateError.message)
    } else {
      setApp((prev) => prev ? { ...prev, ...payload } : prev)
      setShowRejectForm(false)
      setShowExamForm(false)
      setRejectReason('')
      setExamDate('')
    }
    setActionLoading(false)
  }

  const handleApprove = () => updateStatus('approved')

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setActionError('El motivo de rechazo es obligatorio.')
      return
    }
    updateStatus('rejected', { notes: rejectReason.trim() })
  }

  const handleScheduleExam = () => {
    if (!examDate) {
      setActionError('Debes seleccionar una fecha para el examen.')
      return
    }
    updateStatus('exam_scheduled', { exam_date: new Date(examDate).toISOString() })
  }

  // ── Download helper ─────────────────────────────────────────────────────────
  const downloadDoc = async (doc: Document) => {
    const { data, error } = await supabase.storage
      .from('application-documents')
      .createSignedUrl(doc.file_path, 60)

    if (error || !data) {
      setActionError('No se pudo generar el enlace de descarga.')
      return
    }
    window.open(data.signedUrl, '_blank')
  }

  const formatBytes = (n: number | null) => {
    if (!n) return ''
    if (n < 1024) return `${n} B`
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
    return `${(n / (1024 * 1024)).toFixed(1)} MB`
  }

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
      </div>
    )
  }
  if (!user || user.role !== 'admin') return null

  if (error) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard/admin/applications" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pmi-dark transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver a solicitudes
        </Link>
        <div className="flex items-start gap-3 p-5 rounded-2xl bg-red-50 border border-red-100 text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    )
  }

  if (!app) return null

  const s = STATUS_MAP[app.status] ?? { label: app.status, color: 'bg-gray-100 text-gray-700 border-gray-200' }
  const fullName = `${app.users?.first_name ?? ''} ${app.users?.last_name ?? ''}`.trim() || app.users?.email || '—'
  const formatDate = (iso: string | null) =>
    iso ? new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) : '—'
  const canApprove  = ['pending', 'in_review'].includes(app.status)
  const canReject   = ['pending', 'in_review', 'approved'].includes(app.status)
  const canSchedule = app.status === 'approved'

  return (
    <div className="space-y-8 max-w-4xl">

      {/* Back + header */}
      <div>
        <Link
          href="/dashboard/admin/applications"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pmi-dark transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a solicitudes
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-pmi-dark">{fullName}</h1>
            <p className="text-sm text-gray-500 mt-1 font-mono">{app.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge status={app.status} />
            <button
              onClick={loadData}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Recargar"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action error */}
      {actionError && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          {actionError}
          <button onClick={() => setActionError('')} className="ml-auto text-red-500 hover:text-red-700">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Left column (2/3) ─────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* A) DATOS DEL SOLICITANTE */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-pmi-dark mb-5 flex items-center gap-2">
              <User className="w-4 h-4 text-pmi-blue" /> Datos del solicitante
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <InfoRow label="Nombre completo"   value={fullName} />
              <InfoRow label="Email"             value={app.users?.email ?? '—'} />
              <InfoRow label="Teléfono"          value={app.users?.phone ?? '—'} icon={<Phone className="w-3.5 h-3.5 text-gray-400" />} />
              <InfoRow label="Empresa"           value={app.users?.company ?? '—'} icon={<Building2 className="w-3.5 h-3.5 text-gray-400" />} />
              <InfoRow label="País"              value={app.users?.country ?? '—'} icon={<Globe className="w-3.5 h-3.5 text-gray-400" />} />
              <InfoRow label="Años de experiencia" value={app.years_of_experience != null ? `${app.years_of_experience} años` : '—'} />
            </dl>
          </section>

          {/* B) INFORMACIÓN SOLICITUD */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-pmi-dark mb-5 flex items-center gap-2">
              <Award className="w-4 h-4 text-pmi-blue" /> Información de la solicitud
            </h2>

            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-6">
              <InfoRow label="Certificación"    value={app.certifications_catalog?.display_name ?? '—'} />
              <InfoRow label="Fecha de solicitud" value={formatDate(app.submitted_at)} />
              {app.reviewed_at && (
                <InfoRow label="Fecha de revisión" value={formatDate(app.reviewed_at)} />
              )}
              {app.exam_date && (
                <InfoRow label="Fecha examen" value={formatDate(app.exam_date)} icon={<Calendar className="w-3.5 h-3.5 text-violet-500" />} />
              )}
              {app.certifications_catalog?.fee && (
                <InfoRow
                  label="Tarifa"
                  value={`${app.certifications_catalog.fee.toLocaleString('es-ES')} ${app.certifications_catalog.currency}`}
                />
              )}
            </dl>

            {app.professional_experience && (
              <div className="mb-5">
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Experiencia profesional</dt>
                <dd className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {app.professional_experience}
                </dd>
              </div>
            )}

            {app.education_details && (
              <div className="mb-5">
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Educación</dt>
                <dd className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {app.education_details}
                </dd>
              </div>
            )}

            {app.notes && (
              <div>
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  {app.status === 'rejected' ? 'Motivo de rechazo' : 'Notas'}
                </dt>
                <dd className={`rounded-xl p-4 text-sm whitespace-pre-wrap leading-relaxed ${app.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'}`}>
                  {app.notes}
                </dd>
              </div>
            )}
          </section>

          {/* C) DOCUMENTOS */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-bold text-pmi-dark mb-5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-pmi-blue" /> Documentos
              <span className="ml-auto text-xs font-normal text-gray-400">{docs.length} archivo{docs.length !== 1 ? 's' : ''}</span>
            </h2>

            {docs.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">No hay documentos adjuntos.</p>
            ) : (
              <ul className="space-y-2">
                {docs.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-pmi-blue" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-pmi-dark truncate">{doc.file_name}</p>
                        <p className="text-xs text-gray-400">
                          {DOC_TYPE_LABELS[doc.document_type] ?? doc.document_type}
                          {doc.file_size ? ` · ${formatBytes(doc.file_size)}` : ''}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadDoc(doc)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-pmi-blue bg-pmi-blue/5 hover:bg-pmi-blue/10 rounded-lg transition-colors shrink-0 ml-3"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* ── Right column (1/3) — Actions ──────────────────────────────────── */}
        <div className="space-y-4">
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-6">
            <h2 className="text-base font-bold text-pmi-dark mb-5">Acciones</h2>

            <div className="space-y-3">

              {/* APROBAR */}
              {canApprove && !showRejectForm && !showExamForm && (
                <Button variant="success" size="md" fullWidth onClick={handleApprove} disabled={actionLoading} loading={actionLoading}
                  icon={!actionLoading ? <CheckCircle2 className="w-4 h-4" /> : undefined}
                >
                  Aprobar solicitud
                </Button>
              )}

              {/* PROGRAMAR EXAMEN */}
              {canSchedule && !showRejectForm && (
                <>
                  {!showExamForm ? (
                    <button
                      onClick={() => setShowExamForm(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition-colors"
                    >
                      <Clock className="w-4 h-4" />
                      Programar examen
                    </button>
                  ) : (
                    <div className="space-y-3 p-4 bg-violet-50 border border-violet-100 rounded-xl">
                      <p className="text-sm font-semibold text-violet-800">Fecha del examen</p>
                      <input
                        type="datetime-local"
                        value={examDate}
                        onChange={(e) => setExamDate(e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-300 bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleScheduleExam}
                          disabled={actionLoading || !examDate}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 disabled:opacity-50 transition-colors"
                        >
                          {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                          Confirmar
                        </button>
                        <button
                          onClick={() => { setShowExamForm(false); setExamDate('') }}
                          className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* RECHAZAR */}
              {canReject && !showExamForm && (
                <>
                  {!showRejectForm ? (
                    <Button variant="danger" size="md" fullWidth onClick={() => setShowRejectForm(true)}
                      icon={<XCircle className="w-4 h-4" />}
                    >
                      Rechazar solicitud
                    </Button>
                  ) : (
                    <div className="space-y-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                      <p className="text-sm font-semibold text-red-800">Motivo del rechazo</p>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        rows={3}
                        placeholder="Describe el motivo..."
                        className="w-full px-3 py-2 text-sm rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 resize-none bg-white"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleReject}
                          disabled={actionLoading || !rejectReason.trim()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                        >
                          {actionLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                          Confirmar rechazo
                        </button>
                        <button
                          onClick={() => { setShowRejectForm(false); setRejectReason('') }}
                          className="px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* No actions available */}
              {!canApprove && !canReject && !canSchedule && (
                <p className="text-sm text-gray-400 text-center py-4">
                  No hay acciones disponibles para el estado actual.
                </p>
              )}
            </div>

            {/* Timeline */}
            <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Historial</p>
              <TimelineItem
                icon={<FileText className="w-3 h-3" />}
                label="Solicitud enviada"
                date={formatDate(app.submitted_at)}
                color="bg-gray-400"
              />
              {app.reviewed_at && (
                <TimelineItem
                  icon={<CheckCircle2 className="w-3 h-3" />}
                  label={`Revisada · ${s.label}`}
                  date={formatDate(app.reviewed_at)}
                  color={app.status === 'rejected' ? 'bg-red-500' : 'bg-green-500'}
                />
              )}
              {app.exam_date && (
                <TimelineItem
                  icon={<Calendar className="w-3 h-3" />}
                  label="Examen programado"
                  date={formatDate(app.exam_date)}
                  color="bg-violet-500"
                />
              )}
            </div>

            {/* External link */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <Link
                href="/dashboard/admin/applications"
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-pmi-blue transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> Ver todas las solicitudes
              </Link>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon?: React.ReactNode
}) {
  return (
    <div>
      <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</dt>
      <dd className="flex items-center gap-1.5 text-sm font-medium text-pmi-dark">
        {icon}
        {value}
      </dd>
    </div>
  )
}

function TimelineItem({
  icon,
  label,
  date,
  color,
}: {
  icon: React.ReactNode
  label: string
  date: string
  color: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-5 h-5 rounded-full ${color} flex items-center justify-center text-white shrink-0 mt-0.5`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-gray-700">{label}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
  )
}
