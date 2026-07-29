'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Award,
  ShieldCheck,
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { supabase } from '@/lib/supabaseClient'
import { setAuthHint } from '@/lib/authHint'
import AuthLayout from './AuthLayout'

const ERROR_MESSAGES: Record<string, string> = {
  'Invalid login credentials': 'Email o contraseña incorrectos',
  'Email not confirmed': 'Email no confirmado. Revisa tu bandeja de entrada',
  'User not found': 'El usuario no existe',
  'Invalid email': 'Email inválido',
  'Invalid password': 'Contraseña incorrecta',
  'Weak password': 'Contraseña muy débil',
  'User already exists': 'El usuario ya existe',
  'Rate limit exceeded': 'Demasiados intentos. Espera unos minutos',
  'Database error': 'Error de base de datos. Inténtalo más tarde',
}

export default function SignInForm() {
  const { t, getLink, currentLang } = useTranslation()
  const a = t.auth
  const router = useRouter()
  const searchParams = useSearchParams()
  const isEn = currentLang === 'en'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}
    if (!email.trim()) newErrors.email = isEn ? 'Email is required' : 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = isEn ? 'Enter a valid email' : 'Introduce un email válido'
    if (!password) newErrors.password = isEn ? 'Password is required' : 'La contraseña es obligatoria'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setStatusMessage('')
    if (!validate()) return
    setIsSubmitting(true)

    const trimmedEmail = email.trim().toLowerCase()
    const trimmedPassword = password.trim()

    try {
      // === MÉTODO 1: Login con Supabase Auth ===
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      })

      if (!authError && authData?.user && authData?.session) {
        // Obtener rol desde public.users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role, first_name, last_name')
          .eq('id', authData.user.id)
          .single()

        if (userError || !userData) {
          // Usuario en auth.users pero NO en public.users
          console.error('❌ Usuario no encontrado en public.users')
          console.error('   ➡️  Ejecuta supabase_auth_setup.sql en Supabase SQL Editor')
          setSubmitStatus('error')
          setStatusMessage(
            isEn
              ? 'Account not configured. Contact the administrator or run the DB setup SQL.'
              : 'Cuenta no configurada. Contacta al administrador o ejecuta el SQL de configuración (supabase_auth_setup.sql).'
          )
          setIsSubmitting(false)
          return
        }

        const role = userData.role as 'admin' | 'client'
        const name = userData.first_name && userData.last_name
          ? `${userData.first_name} ${userData.last_name}`
          : (authData.user.email || 'Usuario')

        // Set a hint cookie so the proxy can redirect instantly on next visit
        setAuthHint()

        // Redirect to the originally-requested page (from proxy ?next=) or default dashboard
        const next = searchParams.get('next')
        const defaultDashboard = role === 'admin' ? '/dashboard/admin' : '/dashboard/client'
        const destination = (next?.startsWith('/dashboard') ? next : null) ?? defaultDashboard

        setSubmitStatus('success')
        setStatusMessage(`${isEn ? 'Welcome' : 'Bienvenido'}, ${name}! ${isEn ? 'Redirecting...' : 'Redirigiendo...'}`)
        setTimeout(() => { router.push(destination) }, 800)
        return
      }

      // === ERROR ===
      if (authError) {
        console.error('❌ Error de login Supabase:', {
          message: authError.message,
          status: authError.status,
        })
        let friendly = ERROR_MESSAGES[authError.message] || authError.message
        // Errores de red/CORS específicos
        if (authError.message === 'Failed to fetch' || authError.message.includes('fetch')) {
          friendly = isEn
            ? 'Cannot connect to server. Check your connection or Supabase configuration.'
            : 'No se puede conectar con el servidor. Verifica tu conexión o la configuración de Supabase.'
        }
        if (authError.message === 'NetworkError when attempting to fetch resource.' || authError.message.includes('NetworkError')) {
          friendly = isEn
            ? 'Network error. Check your internet connection.'
            : 'Error de red. Verifica tu conexión a internet.'
        }
        setSubmitStatus('error')
        setStatusMessage(friendly)
        setIsSubmitting(false)
        return
      }

      console.error('❌ Credenciales inválidas')
      setSubmitStatus('error')
      setStatusMessage(isEn ? 'Invalid credentials. Please check your email and password.' : 'Credenciales inválidas. Verifica tu email y contraseña.')
    } catch (err: any) {
      console.error('❌ Error inesperado en login:', err)
      setSubmitStatus('error')
      setStatusMessage(err?.message || (isEn ? 'An unexpected error occurred.' : 'Ha ocurrido un error inesperado.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase = 'w-full pl-11 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all bg-white'
  const inputNormal = 'border-gray-200 focus:ring-blue-100 focus:border-[#0066CC]'
  const inputError = 'border-red-300 focus:ring-red-100 focus:border-red-400 bg-red-50/30'

  const benefits = isEn
    ? [
        { icon: FileText, title: 'My Applications', description: 'Track the status of your certification requests in real time.' },
        { icon: Award, title: 'My Certifications', description: 'Download credentials and manage your renewals.' },
        { icon: ShieldCheck, title: 'Documents', description: 'Upload and organize your CV, certificates, and portfolio.' },
      ]
    : [
        { icon: FileText, title: 'Mis Solicitudes', description: 'Consulta el estado de tus solicitudes de certificación en tiempo real.' },
        { icon: Award, title: 'Mis Certificaciones', description: 'Descarga credenciales y gestiona tus renovaciones.' },
        { icon: ShieldCheck, title: 'Documentos', description: 'Sube y organiza tu CV, certificados y portfolio.' },
      ]

  return (
    <AuthLayout
      leftTitle={isEn ? 'Welcome Back' : 'Bienvenido de Vuelta'}
      leftDescription={isEn ? 'Access your account and manage your BIM certifications from one place.' : 'Accede a tu cuenta y gestiona tus certificaciones BIM desde un solo lugar.'}
      benefits={benefits}
      authType="signin"
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-pmi-dark tracking-tight">{a.signIn_title}</h2>
          <p className="text-sm text-gray-400 mt-1.5">
            {isEn ? 'Enter your credentials to continue.' : 'Introduce tus credenciales para continuar.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              {a.signIn_email} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email" id="email" name="email" value={email} autoFocus
                onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors((p) => ({ ...p, email: undefined })) }}
                placeholder="tu@email.com"
                className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
              />
            </div>
            <AnimatePresence>
              {errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              {a.signIn_password} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'} id="password" name="password" value={password}
                onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors((p) => ({ ...p, password: undefined })) }}
                placeholder={isEn ? 'Your password' : 'Tu contraseña'}
                className={`${inputBase} pr-11 ${errors.password ? inputError : inputNormal}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <AnimatePresence>
              {errors.password && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Opciones */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <div className="relative flex items-center">
                <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="peer sr-only" />
                <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${rememberMe ? 'bg-[#0066CC] border-[#0066CC]' : 'border-gray-300 bg-white group-hover:border-[#0066CC]'}`}>
                  <CheckCircle2 className={`w-3 h-3 text-white ${rememberMe ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
              <span className="text-sm text-gray-700">{isEn ? 'Remember me' : 'Recuérdame'}</span>
            </label>
            <Link href={getLink('/auth/reset-password')} className="text-sm text-gray-500 hover:text-[#0066CC] transition-colors">
              {isEn ? 'Forgot your password?' : '¿Olvidaste tu contraseña?'}
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0066CC] text-white font-semibold rounded-xl hover:bg-[#0052a3] focus:outline-none focus:ring-2 focus:ring-[#0066CC]/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md text-[0.95rem]"
          >
            {isSubmitting ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {isEn ? 'Verifying...' : 'Verificando...'}</>
            ) : (
              <>{a.signIn_submit} <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <AnimatePresence mode="wait">
            {submitStatus !== 'idle' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className={`flex items-start gap-3 p-4 rounded-xl text-sm ${submitStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
                {submitStatus === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                <span>{statusMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            {a.signIn_noAccount}{' '}
            <Link href={getLink('/auth/signup')} className="text-[#0066CC] font-semibold hover:underline">
              {a.signIn_signUpLink}
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
