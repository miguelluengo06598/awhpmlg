'use client'

import { useState, useRef } from 'react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Handshake,
  CalendarDays,
  MessageSquare,
  Headphones,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'

const GRID_BG: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.45 },
}

export default function ContactPage() {
  const { t, getLink, currentLang } = useTranslation()
  const c = t.contact

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Etiqueta 3-idiomas para textos que no están en el objeto translations.
  const L = (es: string, en: string, pt: string) =>
    currentLang === 'es' ? es : currentLang === 'en' ? en : pt

  const asuntos = [
    L('Información sobre certificaciones', 'Information about certifications', 'Informações sobre certificações'),
    L('Solicitud de formación', 'Training request', 'Solicitação de formação'),
    L('Colaboración institucional', 'Institutional collaboration', 'Colaboração institucional'),
    L('Acreditación académica', 'Academic accreditation', 'Acreditação acadêmica'),
    L('Eventos', 'Events', 'Eventos'),
    L('Otro', 'Other', 'Outro'),
  ]

  const infoContacto = [
    { icon: Mail, label: c.info_email, value: 'info@aecomi.com', href: 'mailto:info@aecomi.com' },
    { icon: Phone, label: c.info_phone, value: '+34 XXX XXX XXX', href: 'tel:+34000000000' },
    { icon: MapPin, label: c.info_location, value: L('Madrid, España', 'Madrid, Spain', 'Madri, Espanha'), href: '#' },
    { icon: Clock, label: c.info_hours, value: c.info_hours_value, href: '#' },
  ]

  const areasInteres = [
    { icon: Award, title: c.area_certifications, description: c.area_certifications_desc },
    { icon: BookOpen, title: c.area_training, description: c.area_training_desc },
    { icon: Handshake, title: c.area_collaboration, description: c.area_collaboration_desc },
    { icon: CalendarDays, title: c.area_events, description: c.area_events_desc },
  ]

  const compromisoPuntos = [
    {
      icon: Headphones,
      title: L('Respuestas ágiles', 'Quick Responses', 'Respostas ágeis'),
      description: L(
        'Garantizamos tiempos de respuesta cortos para todas las consultas.',
        'We guarantee short response times for all inquiries.',
        'Garantimos tempos de resposta curtos para todas as dúvidas.',
      ),
    },
    {
      icon: Users,
      title: L('Acompañamiento continuo', 'Continuous Support', 'Acompanhamento contínuo'),
      description: L(
        'Te acompañamos durante todo el proceso de certificación y registro.',
        'We accompany you throughout the certification and registration process.',
        'Acompanhamos você durante todo o processo de certificação e cadastro.',
      ),
    },
    {
      icon: MessageSquare,
      title: L('Comunicación cercana', 'Close Communication', 'Comunicação próxima'),
      description: L(
        'Mantenemos una comunicación directa y personalizada con cada miembro.',
        'We maintain direct and personalized communication with each member.',
        'Mantemos uma comunicação direta e personalizada com cada membro.',
      ),
    },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      fullName: formData.get('fullName')?.toString().trim() || '',
      email: formData.get('email')?.toString().trim() || '',
      phone: formData.get('phone')?.toString().trim() || '',
      subject: formData.get('subject')?.toString() || '',
      message: formData.get('message')?.toString().trim() || '',
      createdAt: new Date().toISOString(),
    }

    if (!payload.fullName || !payload.email || !payload.subject || !payload.message) {
      setSubmitStatus('error')
      setStatusMessage(c.form_error_required)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Error')
      setSubmitStatus('success')
      setStatusMessage(c.form_success)
      formRef.current?.reset()
    } catch (error) {
      setSubmitStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-[-200px] right-[-150px] w-[700px] h-[700px] rounded-full bg-pmi-blue/[0.07] blur-3xl pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-cyan uppercase bg-white/[0.06] rounded-full mb-8 border border-white/[0.08]">
              {c.hero_badge}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              {c.hero_title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              {c.hero_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== INTRO + QUICK CARDS ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {c.intro_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {c.intro_title}
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
              {c.intro_desc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Award, title: c.area_certifications, desc: c.area_certifications_desc },
              { icon: BookOpen, title: c.area_training, desc: c.area_training_desc },
              { icon: Handshake, title: c.area_collaboration, desc: c.area_collaboration_desc },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group p-7 rounded-2xl bg-pmi-cream border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pmi-blue to-pmi-cyan mb-4 shadow-sm">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FORM + INFO ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white p-7 md:p-9 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-pmi-dark mb-1">{c.form_title}</h3>
                <p className="text-sm text-gray-500 mb-8">{c.form_subtitle}</p>

                <form id="contactForm" ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {c.form_name} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        placeholder={c.form_name}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {c.form_email} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder={c.form_email}
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue transition-all bg-gray-50/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {c.form_phone} <span className="text-gray-400 font-normal">{c.form_phone_optional}</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue transition-all bg-gray-50/50"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                        {c.form_subject} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        defaultValue=""
                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue transition-all bg-gray-50/50 appearance-none"
                      >
                        <option value="" disabled>{c.form_subject_placeholder}</option>
                        {asuntos.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      {c.form_message} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder={c.form_message}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pmi-blue/20 focus:border-pmi-blue transition-all bg-gray-50/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-pmi-dark text-white font-medium rounded-xl hover:bg-pmi-purple transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {c.form_sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {c.form_submit}
                      </>
                    )}
                  </button>

                  <AnimatePresence mode="wait">
                    {submitStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`flex items-start gap-3 p-4 rounded-xl text-sm ${
                          submitStatus === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-100'
                            : 'bg-red-50 text-red-800 border border-red-100'
                        }`}
                      >
                        {submitStatus === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        )}
                        <span>{statusMessage}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>

            {/* Info de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              <h3 className="text-xl font-bold text-pmi-dark mb-5">{c.info_title}</h3>
              {infoContacto.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-pmi-dark rounded-xl shrink-0 group-hover:bg-pmi-purple transition-colors">
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-pmi-dark">{item.label}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== ÁREAS DE INTERÉS ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {c.areas_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {c.areas_title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areasInteres.map((item, index) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group p-7 rounded-2xl bg-pmi-cream border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pmi-blue to-pmi-cyan mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMPROMISO ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {c.commitment_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {c.commitment_title}
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-3xl mx-auto leading-relaxed">
              {c.commitment_desc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {compromisoPuntos.map((item, index) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 bg-pmi-dark rounded-xl mb-4 shadow-sm group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pmi-blue/[0.06] blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              {c.footer_cta_title}
            </h2>
            <p className="mt-5 text-base text-white/50 leading-relaxed">
              {c.footer_cta_desc}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contactForm"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-pmi-cream transition-all shadow-lg text-[15px]"
              >
                {c.footer_cta_primary}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href={getLink('/certifications')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl border border-white/20 hover:bg-white/5 transition-all text-[15px]"
              >
                {c.footer_cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
