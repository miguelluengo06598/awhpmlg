'use client'

import { useState, useRef } from 'react'
import React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, ArrowRight, ArrowUpRight,
  Award, BookOpen, Handshake, CalendarDays, MessageSquare, Headphones, Users,
} from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { reveal, BLUEPRINT, RevealWords, Magnetic, Marquee, Eyebrow } from '@/components/ui/motion-kit'

export default function ContactPage() {
  const { t, getLink, currentLang } = useTranslation()
  const c = t.contact
  const reduce = useReducedMotion()

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
    { icon: Phone, label: c.info_phone, value: '+34 646 799 005', href: 'tel:+34646799005' },
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

  const fieldClass =
    'w-full border-0 border-b border-pmi-dark/25 bg-transparent px-0 py-3 text-base text-pmi-dark placeholder:text-pmi-dark/35 transition-colors focus:border-pmi-orange focus:outline-none focus:ring-0'
  const labelClass = 'block text-[10px] font-semibold uppercase tracking-[0.2em] text-pmi-dark/55'

  return (
    <>
      {/* ═══ 1. HERO ═══ */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full border border-pmi-cyan/20"
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-20 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-pmi-orange/30"
          animate={reduce ? undefined : { scale: [1.05, 1, 1.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow dark>{c.hero_badge}</Eyebrow>
          </motion.div>
          <h1 className="mt-8 max-w-4xl font-display text-[48px] font-semibold leading-[1.0] tracking-[-0.035em] sm:text-7xl lg:text-[104px]">
            <RevealWords text={c.hero_title} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/60"
          >
            {c.hero_subtitle}
          </motion.p>
          <motion.a
            href="mailto:info@aecomi.com"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="group mt-10 inline-flex items-center gap-3 border-b-2 border-pmi-orange pb-1 font-display text-2xl font-medium transition-colors hover:text-pmi-orange sm:text-4xl"
          >
            info@aecomi.com
            <ArrowUpRight className="h-7 w-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </motion.a>
        </div>
      </section>

      <Marquee items={[L('Certificaciones', 'Certifications', 'Certificações'), L('Formación', 'Training', 'Formação'), L('Colaboración', 'Collaboration', 'Colaboração'), L('Eventos', 'Events', 'Eventos'), 'BIM']} />

      {/* ═══ 2. FORMULARIO + DATOS ═══ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-7">
            <Eyebrow>{c.intro_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{c.form_title}</h2>
            <p className="mt-4 max-w-lg text-base text-pmi-dark/60">{c.form_subtitle}</p>

            <form id="contactForm" ref={formRef} onSubmit={handleSubmit} className="mt-12 space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className={labelClass}>{c.form_name} <span className="text-pmi-orange">*</span></label>
                  <input type="text" id="fullName" name="fullName" required placeholder={c.form_name} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>{c.form_email} <span className="text-pmi-orange">*</span></label>
                  <input type="email" id="email" name="email" required placeholder={c.form_email} className={fieldClass} />
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={labelClass}>{c.form_phone} <span className="font-normal normal-case tracking-normal text-pmi-dark/40">{c.form_phone_optional}</span></label>
                  <input type="tel" id="phone" name="phone" placeholder="+34 600 000 000" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="subject" className={labelClass}>{c.form_subject} <span className="text-pmi-orange">*</span></label>
                  <select id="subject" name="subject" required defaultValue="" className={`${fieldClass} appearance-none`}>
                    <option value="" disabled>{c.form_subject_placeholder}</option>
                    {asuntos.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>{c.form_message} <span className="text-pmi-orange">*</span></label>
                <textarea id="message" name="message" rows={4} required placeholder={c.form_message} className={`${fieldClass} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {c.form_sending}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    {c.form_submit}
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {submitStatus !== 'idle' && (
                  <motion.div
                    role={submitStatus === 'error' ? 'alert' : 'status'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex items-start gap-3 rounded-2xl p-4 text-sm ${
                      submitStatus === 'success' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'
                    }`}
                  >
                    {submitStatus === 'success' ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
                    <span>{statusMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Panel de datos */}
          <motion.aside {...reveal} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-[#070B16] p-8 text-white lg:sticky lg:top-28 lg:p-10">
              <div className="absolute inset-0 opacity-60" style={BLUEPRINT} aria-hidden />
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold">{c.info_title}</h3>
                <ul className="mt-8 divide-y divide-white/10">
                  {infoContacto.map((item) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-pmi-cyan transition-colors group-hover:bg-pmi-orange group-hover:text-pmi-dark">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{item.label}</span>
                          <span className="mt-1 block text-base text-white">{item.value}</span>
                        </span>
                      </>
                    )
                    return (
                      <li key={item.label}>
                        {item.href === '#' ? (
                          <div className="group flex items-center gap-4 py-5">{inner}</div>
                        ) : (
                          <a href={item.href} className="group flex items-center gap-4 py-5">{inner}</a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ═══ 3. ÁREAS DE INTERÉS ═══ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{c.areas_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{c.areas_title}</h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-pmi-dark/60">{c.intro_desc}</p>
            </div>
          </motion.div>
          <ul className="border-t border-pmi-dark/15 lg:col-span-7">
            {areasInteres.map((item, i) => (
              <motion.li
                key={item.title}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group grid grid-cols-[3rem_1fr] items-start gap-5 border-b border-pmi-dark/15 py-8 transition-colors hover:bg-pmi-cream sm:grid-cols-[4rem_1fr] sm:px-4"
              >
                <span className="font-display text-3xl font-semibold tabular-nums text-pmi-dark/20 transition-colors group-hover:text-pmi-orange">0{i + 1}</span>
                <div>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-pmi-dark" />
                    <h3 className="font-display text-xl font-semibold text-pmi-dark">{item.title}</h3>
                  </div>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-pmi-dark/65">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 4. COMPROMISO ═══ */}
      <section className="relative overflow-hidden bg-[#070B16] py-24 text-white md:py-32">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow dark>{c.commitment_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{c.commitment_title}</h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">{c.commitment_desc}</p>
          </motion.div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-3">
            {compromisoPuntos.map((item, i) => (
              <motion.div
                key={item.title}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-[#0B1122] p-8 transition-colors duration-500 hover:bg-[#101936] lg:p-10"
              >
                <item.icon className="h-9 w-9 text-pmi-cyan transition-transform duration-500 group-hover:scale-110" />
                <h3 className="mt-8 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. CTA FINAL ═══ */}
      <section className="bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">{c.footer_cta_title}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{c.footer_cta_desc}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Magnetic>
                <a href="#contactForm" className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black">
                  {c.footer_cta_primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
              <Link href={getLink('/certifications')} className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold transition-colors hover:bg-pmi-dark/10">
                {c.footer_cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
