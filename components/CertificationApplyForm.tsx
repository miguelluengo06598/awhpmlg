'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  Briefcase,
  GraduationCap,
  FileText,
  Upload,
  Eye,
  Trash2,
  Loader2,
  Shield,
  Send,
  ClipboardCheck,
  FolderOpen,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { uploadApplicationDocument } from '@/lib/storageClient'
import FileUpload from '@/components/FileUpload'
import CertificationSelector from '@/components/CertificationSelector'
import { useTranslation } from '@/lib/useTranslation'

interface Props {
  certificationType?: string
  certificationName?: string
  locale?: 'es' | 'en'
  onBack?: () => void
}

interface FormData {
  fullName: string
  email: string
  phone: string
  company: string
  country: string
  yearsOfExperience: number
  professionalExperience: string
  educationDetails: string
}

interface UploadedDoc {
  type: string
  path: string
  url: string
  fileName: string
}

const REQUIRED_DOCS = [
  { type: 'cv' as const, label: 'CV / Currículum', labelEn: 'CV / Resume', required: true },
  { type: 'education' as const, label: 'Certificado de Estudios', labelEn: 'Education Certificate', required: true },
  { type: 'experience' as const, label: 'Carta de Experiencia', labelEn: 'Experience Letter', required: true },
  { type: 'portfolio' as const, label: 'Portafolio / Proyectos', labelEn: 'Portfolio / Projects', required: false },
  { type: 'other' as const, label: 'Otros Documentos', labelEn: 'Other Documents', required: false },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CertificationApplyForm({ certificationType, certificationName, locale = 'es', onBack }: Props) {
  const router = useRouter()
  const { t, getLink } = useTranslation(locale)
  const isEn = locale === 'en'

  // Estado local para certificación seleccionada (cuando no viene por prop)
  const [selectedCert, setSelectedCert] = useState<{ type: string; name: string } | null>(null)

  const effectiveType = certificationType || selectedCert?.type || ''
  const effectiveName = certificationName || selectedCert?.name || ''

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [applicationId, setApplicationId] = useState('')
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [authChecked, setAuthChecked] = useState(false)

  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', company: '', country: '',
    yearsOfExperience: 3, professionalExperience: '', educationDetails: '',
  })

  const [docs, setDocs] = useState<UploadedDoc[]>([])
  const [agree, setAgree] = useState(false)

  // Cargar datos del usuario autenticado
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser()

        if (authError) {
          console.error('Error de auth:', authError)
          setAuthChecked(true)
          return
        }

        const user = authData?.user
        if (!user) {
          setAuthChecked(true)
          return
        }
        setCurrentUser(user)

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('first_name, last_name, email, phone, company, country')
          .eq('id', user.id)
          .single()

        if (userError) {
          console.error('Error cargando datos de usuario:', userError)
        }

        if (userData) {
          setForm((prev) => ({
            ...prev,
            fullName: `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
            email: userData.email || user.email || '',
            phone: userData.phone || '',
            company: userData.company || '',
            country: userData.country || '',
          }))
        }
      } catch (err) {
        console.error('Error cargando usuario:', err)
      } finally {
        setAuthChecked(true)
      }
    }
    loadUser()
  }, [])

  const updateForm = useCallback((field: keyof FormData, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleDocSuccess = (docType: string, path: string, url: string) => {
    const fileName = path.split('/').pop() || 'document'
    setDocs((prev) => {
      const filtered = prev.filter((d) => d.type !== docType)
      return [...filtered, { type: docType, path, url, fileName }]
    })
    setError('')
  }

  const handleDocRemove = (docType: string) => {
    setDocs((prev) => prev.filter((d) => d.type !== docType))
  }

  const validateStep1 = () => {
    if (!form.fullName.trim()) return isEn ? 'Full name is required' : 'El nombre completo es obligatorio'
    if (!form.email.trim()) return isEn ? 'Email is required' : 'El email es obligatorio'
    if (form.yearsOfExperience < 0) return isEn ? 'Invalid experience' : 'Experiencia inválida'
    if (!form.professionalExperience.trim()) return isEn ? 'Professional experience is required' : 'La experiencia profesional es obligatoria'
    if (!form.educationDetails.trim()) return isEn ? 'Education details are required' : 'Los detalles de educación son obligatorios'
    return ''
  }

  const validateStep2 = () => {
    const missing = REQUIRED_DOCS
      .filter((d) => d.required)
      .filter((d) => !docs.find((ud) => ud.type === d.type))
    if (missing.length > 0) {
      return isEn
        ? `Required documents missing: ${missing.map((d) => (isEn ? d.labelEn : d.label)).join(', ')}`
        : `Documentos requeridos faltantes: ${missing.map((d) => d.label).join(', ')}`
    }
    return ''
  }

  const nextStep = () => {
    setError('')
    if (step === 1) {
      const err = validateStep1()
      if (err) { setError(err); return }
    }
    if (step === 2) {
      const err = validateStep2()
      if (err) { setError(err); return }
    }
    setStep((s) => Math.min(4, s + 1))
  }

  const prevStep = () => setStep((s) => Math.max(1, s - 1))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      // 1. Verificar sesión
      const { data: authData } = await supabase.auth.getUser()
      const user = authData?.user
      if (!user) {
        setError(isEn ? 'You must be logged in to apply' : 'Debes estar logueado para solicitar')
        setLoading(false)
        return
      }

      // 2. Obtener certification_id del catálogo
      const { data: certData, error: certError } = await supabase
        .from('certifications_catalog')
        .select('id')
        .eq('name', effectiveType)
        .single()

      if (certError || !certData) {
        setError(isEn ? 'Certification not found' : 'Certificación no encontrada')
        setLoading(false)
        return
      }

      // 3. Crear solicitud en certifications_applications
      const { data: appData, error: appError } = await supabase
        .from('certifications_applications')
        .insert({
          user_id: user.id,
          certification_id: certData.id,
          status: 'pending',
          professional_experience: form.professionalExperience,
          education_details: form.educationDetails,
          years_of_experience: form.yearsOfExperience,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (appError || !appData) {
        console.error('Error creando solicitud:', appError)
        setError(isEn ? 'Error creating application' : 'Error al crear la solicitud')
        setLoading(false)
        return
      }

      const newAppId = appData.id
      setApplicationId(newAppId)

      // 4. Re-subir documentos a la carpeta correcta de la aplicación
      const finalDocs: UploadedDoc[] = []
      for (const doc of docs) {
        try {
          const { data: blob } = await supabase.storage
            .from('application-documents')
            .download(doc.path)

          if (!blob) continue

          const file = new File([blob], doc.fileName, { type: blob.type || 'application/pdf' })

          const { path: newPath, url: newUrl } = await uploadApplicationDocument(
            newAppId,
            file,
            doc.type as any
          )

          finalDocs.push({ type: doc.type, path: newPath, url: newUrl, fileName: doc.fileName })

          // Eliminar documento temporal
          await supabase.storage.from('application-documents').remove([doc.path])
        } catch (err) {
          console.error('Error migrando documento:', err)
          finalDocs.push(doc)
        }
      }

      // 5. Guardar registros en tabla documents
      if (finalDocs.length > 0) {
        const inserts = finalDocs.map((d) => ({
          application_id: newAppId,
          uploaded_by: user.id,
          file_name: d.fileName,
          file_path: d.path,
          document_type: d.type,
        }))

        const { error: docInsertError } = await supabase.from('documents').insert(inserts)
        if (docInsertError) {
          console.error('Error guardando documentos en tabla:', docInsertError)
        }
      }

      // 6. Éxito
      setSuccess(true)
      setStep(4)
      setTimeout(() => {
        router.push(getLink('/dashboard/client/applications'))
      }, 3000)
    } catch (err: any) {
      console.error('Error en submit:', err)
      setError(err.message || (isEn ? 'Unexpected error' : 'Error inesperado'))
    } finally {
      setLoading(false)
    }
  }

  // ─── PANTALLA: SELECCIONAR CERTIFICACIÓN ───
  if (!effectiveType) {
    return (
      <CertificationSelector
        locale={locale}
        onSelect={(type, name) => setSelectedCert({ type, name })}
      />
    )
  }

  // ─── PANTALLA: REQUIERE LOGIN ───
  if (authChecked && !currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-pmi-dark mb-3">
            {isEn ? 'Login Required' : 'Inicio de Sesión Requerido'}
          </h2>
          <p className="text-gray-600 mb-6">
            {isEn
              ? 'You must be logged in to apply for a certification. Please sign in or create an account to continue.'
              : 'Debes estar logueado para solicitar una certificación. Inicia sesión o crea una cuenta para continuar.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(getLink('/auth/signin'))}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-blue transition-colors"
            >
              {isEn ? 'Sign In' : 'Iniciar Sesión'}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push(getLink('/auth/signup'))}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              {isEn ? 'Create Account' : 'Crear Cuenta'}
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // ─── PASO 4: ÉXITO ───
  if (success || step === 4) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto px-6"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-pmi-dark mb-3">
            {isEn ? 'Application Submitted Successfully!' : '¡Solicitud Enviada Exitosamente!'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isEn ? 'Your application for' : 'Tu solicitud de'} <strong>{effectiveName}</strong> {isEn ? 'has been received.' : 'ha sido recibida.'}
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 inline-block">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              {isEn ? 'Application ID' : 'Número de Solicitud'}
            </p>
            <p className="text-sm font-mono font-bold text-pmi-dark">{applicationId || '---'}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6 max-w-md mx-auto">
            {isEn
              ? 'You will receive an email confirmation. You can track your application status in your dashboard.'
              : 'Recibirás un email de confirmación. Puedes seguir el estado de tu solicitud en tu dashboard.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push(getLink('/dashboard/client/applications'))}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-blue transition-colors"
            >
              {isEn ? 'Go to My Applications' : 'Ir a Mis Solicitudes'}
              <ArrowRight className="w-4 h-4" />
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEn ? 'Back to Certifications' : 'Volver a Certificaciones'}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                s < step
                  ? 'bg-green-500 text-white'
                  : s === step
                    ? 'bg-pmi-dark text-white'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                s <= step ? 'text-pmi-dark' : 'text-gray-400'
              }`}
            >
              {s === 1 ? (isEn ? 'Personal Info' : 'Datos Personales')
                : s === 2 ? (isEn ? 'Documents' : 'Documentos')
                : (isEn ? 'Review' : 'Revisión')}
            </span>
            {s < 3 && <div className={`w-8 h-0.5 sm:w-12 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ─── PASO 1: DATOS PERSONALES ─── */}
        {step === 1 && (
          <motion.div key="step1" variants={fadeIn} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-pmi-dark mb-1 flex items-center gap-2">
                <User className="w-5 h-5 text-pmi-blue" />
                {isEn ? 'Personal Information' : 'Información Personal'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{isEn ? 'Complete your profile information' : 'Completa la información de tu perfil'}</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Full Name' : 'Nombre Completo'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text" value={form.fullName}
                      onChange={(e) => updateForm('fullName', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
                      placeholder="Juan García"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email" value={form.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue bg-gray-50"
                      placeholder="juan@email.com"
                      readOnly={!!currentUser}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{isEn ? 'Phone' : 'Teléfono'}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel" value={form.phone}
                      onChange={(e) => updateForm('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
                      placeholder="+34 600 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{isEn ? 'Company' : 'Empresa'}</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text" value={form.company}
                      onChange={(e) => updateForm('company', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
                      placeholder="BuildTech Solutions"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{isEn ? 'Country' : 'País'}</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text" value={form.country}
                      onChange={(e) => updateForm('country', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
                      placeholder="España"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {isEn ? 'Years of Experience' : 'Años de Experiencia'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number" min={0} max={50} value={form.yearsOfExperience}
                      onChange={(e) => updateForm('yearsOfExperience', parseInt(e.target.value) || 0)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isEn ? 'Professional Experience' : 'Experiencia Profesional'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.professionalExperience}
                  onChange={(e) => updateForm('professionalExperience', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue resize-none"
                  placeholder={isEn ? 'Describe your professional experience in BIM...' : 'Describe tu experiencia profesional en BIM...'}
                />
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {isEn ? 'Education' : 'Educación'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.educationDetails}
                  onChange={(e) => updateForm('educationDetails', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue resize-none"
                  placeholder={isEn ? 'Describe your academic background and relevant courses...' : 'Describe tu formación académica y cursos relevantes...'}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PASO 2: DOCUMENTOS ─── */}
        {step === 2 && (
          <motion.div key="step2" variants={fadeIn} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-pmi-dark mb-1 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-pmi-blue" />
                {isEn ? 'Required Documents' : 'Documentos Requeridos'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {isEn ? 'Upload the required documents for your application.' : 'Sube los documentos requeridos para tu solicitud.'}
              </p>

              <div className="space-y-6">
                {REQUIRED_DOCS.map((doc) => {
                  const uploaded = docs.find((ud) => ud.type === doc.type)
                  const docLabel = isEn ? doc.labelEn : doc.label
                  return (
                    <div key={doc.type} className="border border-gray-100 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold text-sm text-pmi-dark">{docLabel}</span>
                          {doc.required && <span className="text-xs text-red-500 font-medium">*</span>}
                          {uploaded && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" /> {isEn ? 'Uploaded' : 'Subido'}
                            </span>
                          )}
                        </div>
                      </div>

                      {!uploaded ? (
                        <FileUpload
                          applicationId="temp"
                          documentType={doc.type}
                          label={docLabel}
                          onSuccess={(path, url) => handleDocSuccess(doc.type, path, url)}
                          onError={(err) => setError(err)}
                        />
                      ) : (
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                              <FileText className="w-4 h-4 text-pmi-blue" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-pmi-dark">{uploaded.fileName}</p>
                              <p className="text-xs text-gray-400">{docLabel}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <a
                              href={uploaded.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                              title={isEn ? 'View' : 'Ver'}
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => handleDocRemove(doc.type)}
                              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                              title={isEn ? 'Replace' : 'Reemplazar'}
                            >
                              <Upload className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDocRemove(doc.type)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={isEn ? 'Remove' : 'Eliminar'}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PASO 3: RESUMEN ─── */}
        {step === 3 && (
          <motion.div key="step3" variants={fadeIn} initial="hidden" animate="visible" exit={{ opacity: 0, x: -20 }}>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
              <h2 className="text-xl font-bold text-pmi-dark mb-1 flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-pmi-blue" />
                {isEn ? 'Review & Submit' : 'Revisar y Enviar'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {isEn ? 'Review your information before submitting.' : 'Revisa tu información antes de enviar.'}
              </p>

              {/* Personal Info Summary */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{isEn ? 'Personal Info' : 'Datos Personales'}</h3>
                  <button onClick={() => setStep(1)} className="text-xs text-pmi-blue font-medium hover:underline">
                    {isEn ? 'Edit' : 'Editar'}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">{isEn ? 'Name' : 'Nombre'}:</span> <span className="font-medium text-pmi-dark">{form.fullName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Email:</span> <span className="font-medium text-pmi-dark">{form.email}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{isEn ? 'Phone' : 'Teléfono'}:</span> <span className="font-medium text-pmi-dark">{form.phone || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{isEn ? 'Company' : 'Empresa'}:</span> <span className="font-medium text-pmi-dark">{form.company || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{isEn ? 'Country' : 'País'}:</span> <span className="font-medium text-pmi-dark">{form.country || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">{isEn ? 'Experience' : 'Experiencia'}:</span> <span className="font-medium text-pmi-dark">{form.yearsOfExperience} {isEn ? 'years' : 'años'}</span></div>
                </div>
              </div>

              {/* Documents Summary */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">{isEn ? 'Documents' : 'Documentos'}</h3>
                  <button onClick={() => setStep(2)} className="text-xs text-pmi-blue font-medium hover:underline">
                    {isEn ? 'Edit' : 'Editar'}
                  </button>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {REQUIRED_DOCS.map((doc) => {
                    const uploaded = docs.find((ud) => ud.type === doc.type)
                    const docLabel = isEn ? doc.labelEn : doc.label
                    return (
                      <div key={doc.type} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{docLabel}</span>
                        {uploaded ? (
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {isEn ? 'Uploaded' : 'Subido'}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">{isEn ? 'Not uploaded' : 'No subido'}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-pmi-blue focus:ring-pmi-blue"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {isEn
                    ? 'I confirm that all information provided is truthful and accurate. I understand that providing false information may result in the rejection of my application.'
                    : 'Confirmo que toda la información proporcionada es veraz y correcta. Entiendo que proporcionar información falsa puede resultar en el rechazo de mi solicitud.'}
                  <span className="text-red-500"> *</span>
                </span>
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-800"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={prevStep}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? 'Back' : 'Atrás'}
          </button>
        ) : onBack ? (
          <button
            onClick={onBack}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4" />
            {isEn ? 'Back to Certifications' : 'Volver a Certificaciones'}
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            onClick={nextStep}
            disabled={loading || (step === 1 ? validateStep1() !== '' : step === 2 ? validateStep2() !== '' : false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-pmi-dark text-white font-medium rounded-xl hover:bg-pmi-blue transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isEn ? 'Next' : 'Siguiente'}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!agree || loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-pmi-dark text-white font-medium rounded-xl hover:bg-pmi-blue transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> {isEn ? 'Sending...' : 'Enviando...'}</>
            ) : (
              <><Send className="w-4 h-4" /> {isEn ? 'Submit Application' : 'Enviar Solicitud'}</>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
