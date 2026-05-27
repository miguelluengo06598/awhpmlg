'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Loader2, AlertCircle, FileText, Award,
  Clock, CheckCircle2, XCircle, Calendar, Download,
  RefreshCw, Info,
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
  certificate_url: string | null
  certifications_catalog: {
    display_name: string
    fee: number
    currency: string
    exam_duration_minutes: number
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

// ─── Status banner config ─────────────────────────────────────────────────────

function getStatusBanner(app: ApplicationDetail): {
  icon: React.ReactNode
  title: string
  body: string
  bg: string
  border: string
} {
  const examStr = app.exam_date
    ? new Date(app.exam_date).toLocaleDateString('es-ES', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  const maps: Record<string, ReturnType<typeof getStatusBanner>> = {
    pending: {
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      title: 'Tu solicitud está siendo revisada',
      body: 'Hemos recibido tu solicitud. El equipo AECMI la revisará en los próximos días laborables y recibirás una notificación con el resultado.',
      bg: 'bg-orange-50', border: 'border-orange-100',
    },
    in_review: {
      icon: <Info className="w-5 h-5 text-blue-500" />,
      title: 'Tu solicitud está en revisión activa',
      body: 'El equipo AECMI está evaluando tu candidatura y documentación. Te contactaremos pronto.',
      bg: 'bg-blue-50', border: 'border-blue-100',
    },
    approved: {
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      title: '¡Solicitud aprobada!',
      body: 'Tu candidatura ha sido aprobada. El siguiente paso es inscribirte al examen. Nos pondremos en contacto para programar la fecha.',
      bg: 'bg-green-50', border: 'border-green-100',
    },
    rejected: {
      icon: <XCircle className="w-5 h-5 text-red-500" />,
      title: 'Solicitud rechazada',
      body: app.notes
        ? `Motivo: ${app.notes}`
        : 'Tu solicitud no ha sido aprobada en esta ocasión. Contacta con AECMI para más información.',
      bg: 'bg-red-50', border: 'border-red-100',
    },
    exam_scheduled: {
      icon: <Calendar className="w-5 h-5 text-violet-600" />,
      title: `Tu examen está programado`,
      body: examStr
        ? `Fecha: ${examStr}. Duración: ${app.certifications_catalog?.exam_duration_minutes ?? 90} minutos. Prepárate revisando los requisitos de la certificación.`
        : 'Tu examen ha sido programado. Recibirás los detalles por email.',
      bg: 'bg-violet-50', border: 'border-violet-100',
    },
    exam_passed: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      title: '¡Has superado el examen!',
      body: 'Enhorabuena. Tu certificado está siendo emitido. Te notificaremos cuando esté disponible para descargar.',
      bg: 'bg-emerald-50', border: 'border-emerald-100',
    },
    certified: {
      icon: <Award className="w-5 h-5 text-teal-600" />,
      title: '¡Certificado emitido!',
      body: 'Tu certificación AECMI está disponible. Puedes descargarlo a continuación.',
      bg: 'bg-teal-50', border: 'border-teal-100',
    },
  }

  return maps[app.status] ?? {
    icon: <Info className="w-5 h-5 text-gray-500" />,
    title: `Estado: ${app.status}`,
    body: 'Contacta con AECMI para más información sobre tu solicitud.',
    bg: 'bg-gray-50', border: 'border-gray-200',
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ClientApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { user, loading: authLoading } = useAuth()

  const [app, setApp] = useState<ApplicationDetail | null>(null)
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloadError, setDownloadError] = useState('')

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (authLoading) return
    if (!user) { router.replace('/auth/signin'); return }
    if (user.role === 'admin') { router.replace('/dashboard/admin'); return }
  }, [user, authLoading, router])

  // ── Load data ───────────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!user || !id) return
    setLoading(true)
    setError('')

    try {
      const [appRes, docsRes] = await Promise.all([
        supabase
          .from('certifications_applications')
          .select(`
            id, status, submitted_at, updated_at, reviewed_at, exam_date,
            notes, years_of_experience, professional_experience, education_details,
            certificate_url,
            certifications_catalog ( display_name, fee, currency, exam_duration_minutes )
          `)
          .eq('id', id)
          .eq('user_id', user.id)   // security: only own data
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
    if (!authLoading && user && user.role !== 'admin') loadData()
  }, [authLoading, user, loadData])

  // ── Download ────────────────────────────────────────────────────────────────
  const downloadDoc = async (doc: Document) => {
    setDownloadError('')
    const { data, error } = await supabase.storage
      .from('application-documents')
      .createSignedUrl(doc.file_path, 60)

    if (error || !data) {
      setDownloadError('No se pudo generar el enlace de descarga. Inténtalo de nuevo.')
      return
    }
    window.open(data.signedUrl, '_blank')
  }

  // ── Guards ──────────────────────────────────────────────────────────────────
  if (authLoading || loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
      </div>
    )
  }
  if (!user || user.role === 'admin') return null

  if (error) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/client/applications"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pmi-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a mis solicitudes
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
  const banner = getStatusBanner(app)

  const formatDate = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })
      : '—'

  const formatBytes = (n: number | null) => {
    if (!n) return ''
    if (n < 1024) return `${n} B`
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
    return `${(n / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-8 max-w-3xl">

      {/* Back + header */}
      <div>
        <Link
          href="/dashboard/client/applications"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-pmi-dark transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a mis solicitudes
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-pmi-dark">
              {app.certifications_catalog?.display_name ?? 'Solicitud'}
            </h1>
            <p className="text-sm text-gray-400 mt-1 font-mono">{app.id}</p>
          </div>
          <div className="flex items-center gap-2">
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

      {/* Download error */}
      {downloadError && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {downloadError}
        </div>
      )}

      {/* A) ESTADO / PRÓXIMOS PASOS */}
      <section className={`rounded-2xl border p-6 ${banner.bg} ${banner.border}`}>
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5">{banner.icon}</div>
          <div>
            <h2 className="text-base font-bold text-pmi-dark mb-1">{banner.title}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{banner.body}</p>
          </div>
        </div>

        {/* Certificate download if certified */}
        {app.status === 'certified' && app.certificate_url && (
          <a
            href={app.certificate_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-xl hover:bg-teal-700 transition-colors"
          >
            <Download className="w-4 h-4" /> Descargar certificado
          </a>
        )}
      </section>

      {/* Info row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <InfoCard label="Fecha solicitud"   value={formatDate(app.submitted_at)} />
        <InfoCard label="Última actualiz."  value={formatDate(app.updated_at)} />
        {app.exam_date && (
          <InfoCard label="Fecha examen" value={formatDate(app.exam_date)} highlight />
        )}
        {app.years_of_experience != null && (
          <InfoCard label="Años experiencia" value={`${app.years_of_experience} años`} />
        )}
      </div>

      {/* B) MI INFORMACIÓN */}
      {(app.professional_experience || app.education_details) && (
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          <h2 className="text-base font-bold text-pmi-dark flex items-center gap-2">
            <FileText className="w-4 h-4 text-pmi-blue" /> Mi información
          </h2>

          {app.professional_experience && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Experiencia profesional
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {app.professional_experience}
              </div>
            </div>
          )}

          {app.education_details && (
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Educación
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {app.education_details}
              </div>
            </div>
          )}
        </section>
      )}

      {/* C) MIS DOCUMENTOS */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-pmi-dark mb-5 flex items-center gap-2">
          <FileText className="w-4 h-4 text-pmi-blue" /> Mis documentos
          <span className="ml-auto text-xs font-normal text-gray-400">
            {docs.length} archivo{docs.length !== 1 ? 's' : ''}
          </span>
        </h2>

        {docs.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">No hay documentos adjuntos a esta solicitud.</p>
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
                <Button variant="outline" size="sm" onClick={() => downloadDoc(doc)}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Descargar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* D) Rejection notes (shown separately if rejected and notes exist) */}
      {app.status === 'rejected' && app.notes && (
        <section className="bg-red-50 border border-red-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-red-800 mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> Motivo del rechazo
          </h2>
          <p className="text-sm text-red-700 leading-relaxed whitespace-pre-wrap">{app.notes}</p>
        </section>
      )}

    </div>
  )
}

// ─── Sub-component ────────────────────────────────────────────────────────────

function InfoCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'bg-violet-50 border border-violet-100' : 'bg-gray-50'}`}>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${highlight ? 'text-violet-500' : 'text-gray-400'}`}>
        {label}
      </p>
      <p className={`text-sm font-semibold ${highlight ? 'text-violet-800' : 'text-pmi-dark'}`}>
        {value}
      </p>
    </div>
  )
}
