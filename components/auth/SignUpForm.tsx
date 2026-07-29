'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  Globe,
  Users,
  Briefcase,
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { supabase } from '@/lib/supabaseClient'
import { setAuthHint } from '@/lib/authHint'
import AuthLayout from './AuthLayout'

interface FormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  password?: string
  confirmPassword?: string
  acceptTerms?: string
}

// Cadenas de traducción del formulario (t.authForm); solo cambian los textos.
type AF = Record<string, string>

const mapAuthError = (msg: string, af: AF): string => {
  const map: Record<string, string> = {
    'User already registered': af.errUserExists,
    'Weak password': af.errWeakPassword,
    'Invalid email': af.errInvalidEmail,
    'Rate limit exceeded': af.errRateLimit,
    'Signup disabled': af.errSignupDisabled,
    'Email address not authorized': af.errEmailNotAuthorized,
  }
  return map[msg] || msg
}

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const getPasswordStrength = (password: string, af: AF): { score: number; label: string; color: string } => {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  const map = [
    { label: af.strengthVeryWeak, color: 'bg-red-500' },
    { label: af.strengthWeak, color: 'bg-orange-500' },
    { label: af.strengthMedium, color: 'bg-yellow-500' },
    { label: af.strengthStrong, color: 'bg-emerald-500' },
    { label: af.strengthVeryStrong, color: 'bg-green-600' },
  ]
  return { score, label: map[score].label, color: map[score].color }
}

const validateField = (name: keyof FormData, value: string | boolean, formData: FormData, af: AF): string | undefined => {
  switch (name) {
    case 'fullName':
      if (!value) return af.vNameRequired
      if (typeof value === 'string' && value.trim().length < 3) return af.vNameMin
      return undefined
    case 'email':
      if (!value) return af.vEmailRequired
      if (typeof value === 'string' && !validateEmail(value)) return af.vEmailInvalid
      return undefined
    case 'phone':
      if (typeof value === 'string' && value.trim().length > 0 && !/^[\d\s\+\-\(\)]{7,}$/.test(value)) {
        return af.vPhoneInvalid
      }
      return undefined
    case 'password':
      if (!value) return af.vPasswordRequired
      if (typeof value === 'string') {
        if (value.length < 10) return af.vPasswordMin
        if (!/[A-Z]/.test(value)) return af.vPasswordUpper
        if (!/[a-z]/.test(value)) return af.vPasswordLower
        if (!/\d/.test(value)) return af.vPasswordDigit
        if (!/[^A-Za-z0-9]/.test(value)) return af.vPasswordSymbol
      }
      return undefined
    case 'confirmPassword':
      if (!value) return af.vConfirmRequired
      if (typeof value === 'string' && value !== formData.password) return af.vConfirmMismatch
      return undefined
    case 'acceptTerms':
      if (!value) return af.vTermsRequired
      return undefined
    default:
      return undefined
  }
}

export default function SignUpForm() {
  const { t, getLink } = useTranslation()
  const a = t.auth
  const af = t.authForm

  const [formData, setFormData] = useState<FormData>({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({
    fullName: false, email: false, phone: false, password: false, confirmPassword: false, acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const strength = getPasswordStrength(formData.password, af)

  const updateField = useCallback((name: keyof FormData, value: string | boolean) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value }
      const error = validateField(name, value, next, af)
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }))
      if (name === 'password' && next.confirmPassword) {
        const confirmError = validateField('confirmPassword', next.confirmPassword, next, af)
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: confirmError }))
      }
      return next
    })
  }, [])

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name], formData, af)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const validateAll = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true
    ;(Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key], formData, af)
      if (error) { newErrors[key] = error; isValid = false }
    })
    setErrors(newErrors)
    setTouched({ fullName: true, email: true, phone: true, password: true, confirmPassword: true, acceptTerms: true })
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setStatusMessage('')
    if (!validateAll()) {
      setSubmitStatus('error')
      setStatusMessage(af.correctErrors)
      return
    }
    setIsSubmitting(true)

    try {
      // Separar nombre y apellido
      const nameParts = formData.fullName.trim().split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: formData.phone || undefined,
            role: 'client',
          },
        },
      })

      if (authError) {
        console.error('Error de registro:', authError.message)
        const friendly = mapAuthError(authError.message, af)
        setSubmitStatus('error')
        setStatusMessage(friendly)
        setIsSubmitting(false)
        return
      }

      if (authData?.user) {
        // Si el trigger handle_new_user no funcionó (por ejemplo, en local), crear manualmente
        if (authData.user.identities && authData.user.identities.length === 0) {
          // Usuario ya existe
          setSubmitStatus('error')
          setStatusMessage(af.emailAlreadyRegistered)
          setIsSubmitting(false)
          return
        }

        // Asignar certificados pendientes que coincidan con este email (server-side)
        try {
          const session = (await supabase.auth.getSession()).data.session
          if (session) {
            // If email confirmation is disabled, a session exists immediately — set the hint cookie
            setAuthHint()
            await fetch('/api/assign-certificates', {
              method: 'POST',
              headers: { Authorization: `Bearer ${session.access_token}` },
            })
          }
        } catch {
          // No bloquear el registro si falla la asignación
        }

        setSubmitStatus('success')
        setStatusMessage(af.accountCreated)
        setFormData({ fullName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false })
        setTouched({ fullName: false, email: false, phone: false, password: false, confirmPassword: false, acceptTerms: false })
      } else {
        setSubmitStatus('error')
        setStatusMessage(af.registrationFailed)
      }
    } catch (error: any) {
      console.error('❌ Error inesperado en registro:', error)
      setSubmitStatus('error')
      setStatusMessage(error?.message || af.errGeneric)
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputBase = 'w-full pl-11 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all bg-white'
  const inputNormal = 'border-gray-200 focus:ring-blue-100 focus:border-[#0066CC]'
  const inputError = 'border-red-300 focus:ring-red-100 focus:border-red-400 bg-red-50/30'

  const benefits = [
    { icon: Award, title: af.suBenefit1Title, description: af.suBenefit1Desc },
    { icon: Briefcase, title: af.suBenefit2Title, description: af.suBenefit2Desc },
    { icon: Users, title: af.suBenefit3Title, description: af.suBenefit3Desc },
    { icon: Globe, title: af.suBenefit4Title, description: af.suBenefit4Desc },
  ]

  return (
    <AuthLayout
      leftTitle={af.signUpLeftTitle}
      leftDescription={af.signUpLeftDescription}
      benefits={benefits}
      authType="signup"
    >
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-pmi-dark tracking-tight">{a.signUp_title}</h2>
          <p className="text-sm text-gray-400 mt-1.5">
            {af.signUpSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Nombre completo */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
              {a.signUp_name} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text" id="fullName" name="fullName" value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                placeholder={a.signUp_name}
                className={`${inputBase} ${touched.fullName && errors.fullName ? inputError : inputNormal}`}
              />
            </div>
            <AnimatePresence>
              {touched.fullName && errors.fullName && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
              {a.signIn_email} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email" id="email" name="email" value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="tu@email.com"
                className={`${inputBase} ${touched.email && errors.email ? inputError : inputNormal}`}
              />
            </div>
            <AnimatePresence>
              {touched.email && errors.email && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
              {af.phone} <span className="text-gray-400 font-normal">({af.optional})</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel" id="phone" name="phone" value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                onBlur={() => handleBlur('phone')}
                placeholder="+34 600 000 000"
                className={`${inputBase} ${touched.phone && errors.phone ? inputError : inputNormal}`}
              />
            </div>
            <AnimatePresence>
              {touched.phone && errors.phone && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
              {a.signUp_password} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                placeholder={af.createPassword}
                className={`${inputBase} pr-11 ${touched.password && errors.password ? inputError : inputNormal}`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password strength */}
            {formData.password.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-gray-500">{af.strengthLabel}</span>
                  <span className="text-xs font-medium text-gray-700">{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(strength.score / 4) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className={`h-full ${strength.color}`}
                  />
                </div>
              </div>
            )}

            <AnimatePresence>
              {touched.password && errors.password && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
              {af.confirmPasswordLabel} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword" value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                onBlur={() => handleBlur('confirmPassword')}
                placeholder={af.repeatPassword}
                className={`${inputBase} pr-11 ${touched.confirmPassword && errors.confirmPassword ? inputError : inputNormal}`}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" tabIndex={-1}>
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <AnimatePresence>
              {touched.confirmPassword && errors.confirmPassword && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.confirmPassword}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Términos */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox" id="acceptTerms" checked={formData.acceptTerms}
                  onChange={(e) => updateField('acceptTerms', e.target.checked)}
                  onBlur={() => handleBlur('acceptTerms')}
                  className="peer sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                  formData.acceptTerms ? 'bg-[#0066CC] border-[#0066CC]' : touched.acceptTerms && errors.acceptTerms ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white group-hover:border-[#0066CC]'
                }`}>
                  <CheckCircle2 className={`w-3.5 h-3.5 text-white ${formData.acceptTerms ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              </div>
              <span className="text-sm text-gray-700 leading-snug">
                {af.acceptThe}
                <Link href={getLink('/legal/terminos')} className="text-[#0066CC] font-medium hover:underline">{af.termsLink}</Link>
                {' '}{af.andThe}
                <Link href={getLink('/legal/privacidad')} className="text-[#0066CC] font-medium hover:underline">{af.privacyLink}</Link>
                {' '}<span className="text-red-500">*</span>
              </span>
            </label>
            <AnimatePresence>
              {touched.acceptTerms && errors.acceptTerms && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="flex items-center gap-1.5 mt-1.5 text-xs text-red-600">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.acceptTerms}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <button
            type="submit" disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0066CC] text-white font-semibold rounded-xl hover:bg-[#0052a3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {af.creatingAccount}</>
            ) : (
              <>{a.signUp_submit} <ArrowRight className="w-4 h-4" /></>
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
            {a.signUp_hasAccount}{' '}
            <Link href={getLink('/auth/signin')} className="text-[#0066CC] font-semibold hover:underline">
              {a.signUp_signInLink}
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
