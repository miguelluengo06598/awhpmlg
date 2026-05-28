'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import {
  BookOpen,
  Briefcase,
  Users,
  TrendingUp,
  GraduationCap,
  Presentation,
  Monitor,
  Star,
  CheckCircle2,
  Award,
  ArrowRight,
  FileText,
  Search,
  ClipboardCheck,
  BadgeCheck,
  ChevronDown,
  School,
  Building2,
  Laptop,
  BarChart3,
  Mail,
  ClipboardList,
  Layers,
  HardHat,
  Globe,
  Handshake,
} from 'lucide-react'
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

export default function FormationPage() {
  const { t, getLink, currentLang } = useTranslation()
  const f = t.formation
  const isEn = currentLang === 'en'

  const [openReq, setOpenReq] = useState<number | null>(null)

  const toggleReq = (index: number) => {
    setOpenReq((prev) => (prev === index ? null : index))
  }

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full bg-pmi-blue/[0.07] blur-3xl pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-cyan uppercase bg-white/[0.06] rounded-full mb-8 border border-white/[0.08]">
              {f.title}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              {f.hero_title}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl">
              {f.hero_subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-pmi-dark bg-white rounded-full hover:bg-pmi-cream transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                {f.alliances_cta}
              </Link>
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                {f.mission_cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== MISIÓN FORMATIVA ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {f.mission_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {f.mission_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: BookOpen, title: f.mission_1_title, desc: f.mission_1_desc, color: 'text-pmi-blue', bg: 'bg-blue-50' },
              { icon: Briefcase, title: f.mission_2_title, desc: f.mission_2_desc, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: TrendingUp, title: f.mission_3_title, desc: f.mission_3_desc, color: 'text-pmi-orange', bg: 'bg-orange-50' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} ${item.color} mb-5`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-10 text-center">
            <Link href={getLink('/certifications')} className="inline-flex items-center gap-2 text-sm font-semibold text-pmi-dark hover:text-pmi-blue transition-colors">
              {f.mission_cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== PROGRAMAS FORMATIVOS ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {f.programs_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {f.programs_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: GraduationCap, title: f.program_1_title, desc: f.program_1_desc, cta: f.program_1_cta, gradient: 'from-pmi-blue to-[#005C8F]', hoverBorder: 'hover:border-pmi-blue/30' },
              { icon: Presentation, title: f.program_2_title, desc: f.program_2_desc, cta: f.program_2_cta, gradient: 'from-emerald-600 to-teal-600', hoverBorder: 'hover:border-emerald-500/30' },
              { icon: Monitor, title: f.program_3_title, desc: f.program_3_desc, cta: f.program_3_cta, gradient: 'from-pmi-orange to-[#D46A2A]', hoverBorder: 'hover:border-pmi-orange/30' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className={`group relative p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 ${item.hoverBorder} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} mb-6 shadow-sm`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-pmi-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-pmi-dark group-hover:text-pmi-blue transition-colors">
                  {item.cta} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CURSOS PREPARATORIOS ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {f.alliances_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {f.alliances_title}
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {f.alliances_subtitle}
            </p>
          </motion.div>

          <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-base text-gray-600 leading-relaxed">
              {f.alliances_text}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: ClipboardList,
                title: 'IDM',
                full: 'Information Delivery Manager',
                desc: isEn
                  ? 'Preparatory programme for the IDM certification. Information governance, CDE and ISO 19650 compliance.'
                  : 'Programa preparatorio para la certificación IDM. Gobierno de la información, CDE y cumplimiento ISO 19650.',
                color: 'from-slate-700 to-blue-900',
                border: 'border-blue-100',
                href: '/certifications/information-delivery-manager',
              },
              {
                icon: Layers,
                title: 'BDM',
                full: 'BIM Design Manager',
                desc: isEn
                  ? 'Preparatory programme for the BDM certification. Interdisciplinary coordination and digital model auditing.'
                  : 'Programa preparatorio para la certificación BDM. Coordinación interdisciplinar y auditoría de modelos digitales.',
                color: 'from-teal-600 to-emerald-800',
                border: 'border-teal-100',
                href: '/certifications/bim-design-manager',
              },
              {
                icon: HardHat,
                title: 'BCM',
                full: 'BIM Construction Manager',
                desc: isEn
                  ? 'Preparatory programme for the BCM certification. BIM implementation on site and federated model management.'
                  : 'Programa preparatorio para la certificación BCM. Implantación BIM en obra y gestión de modelos federados.',
                color: 'from-orange-600 to-red-800',
                border: 'border-orange-100',
                href: '/certifications/bim-construction-manager',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden border ${item.border} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className={`bg-gradient-to-br ${item.color} p-6 pb-8`}>
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-black text-white mb-1">{item.title}</div>
                    <div className="text-sm text-white/70 font-medium">{item.full}</div>
                  </div>
                  <div className="flex-1 flex flex-col bg-white p-6">
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.desc}</p>
                    <Link
                      href={item.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-pmi-dark hover:text-pmi-blue transition-colors group-hover:gap-3"
                    >
                      {isEn ? 'View certification' : 'Ver certificación'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-blue transition-all shadow-md text-[15px]">
              {f.alliances_cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== BENEFICIOS ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {f.benefits_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {f.benefits_title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: Star, title: f.benefit_1_title, desc: f.benefit_1_desc, color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: CheckCircle2, title: f.benefit_2_title, desc: f.benefit_2_desc, color: 'text-pmi-blue', bg: 'bg-blue-50' },
              { icon: Award, title: f.benefit_3_title, desc: f.benefit_3_desc, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: Users, title: f.benefit_4_title, desc: f.benefit_4_desc, color: 'text-pmi-orange', bg: 'bg-orange-50' },
              { icon: TrendingUp, title: f.benefit_5_title, desc: f.benefit_5_desc, color: 'text-purple-600', bg: 'bg-purple-50' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${item.bg} ${item.color} mb-4`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROCESO ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {f.process_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {f.process_title}
            </h2>
            <p className="mt-3 text-base text-gray-500 max-w-lg mx-auto">
              {f.process_subtitle}
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {[
                { icon: FileText, title: f.step_1_title, desc: f.step_1_desc, cta: f.step_1_cta, color: 'bg-pmi-blue' },
                { icon: ClipboardCheck, title: f.step_2_title, desc: f.step_2_desc, cta: f.step_2_cta, color: 'bg-pmi-cyan' },
                { icon: Search, title: f.step_3_title, desc: f.step_3_desc, cta: f.step_3_cta, color: 'bg-pmi-purple' },
                { icon: BadgeCheck, title: f.step_4_title, desc: f.step_4_desc, color: 'bg-emerald-600' },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-105 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="mt-5">
                    <div className="text-sm font-bold text-pmi-dark">{step.title}</div>
                    <div className="mt-1 text-xs text-gray-500">{step.desc}</div>
                    {step.cta && (
                      <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-pmi-blue hover:text-pmi-dark transition-colors cursor-pointer">
                        {step.cta} <ArrowRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== REQUISITOS ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {f.requirements_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {f.requirements_title}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { icon: BookOpen, title: f.req_1_title, desc: f.req_1_desc },
              { icon: Users, title: f.req_2_title, desc: f.req_2_desc },
              { icon: Laptop, title: f.req_3_title, desc: f.req_3_desc },
              { icon: BarChart3, title: f.req_4_title, desc: f.req_4_desc },
            ].map((req, index) => (
              <motion.div
                key={req.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleReq(index)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-pmi-cream shrink-0">
                    <req.icon className="w-5 h-5 text-pmi-dark" />
                  </div>
                  <span className="flex-1 text-sm font-bold text-pmi-dark">{req.title}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openReq === index ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openReq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-[4.5rem]">
                        <p className="text-sm text-gray-500 leading-relaxed">{req.desc}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pmi-blue/[0.06] blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              {f.final_cta_title}
            </h2>
            <p className="mt-5 text-lg text-white/60 leading-relaxed">
              {f.final_cta_subtitle}
            </p>
            <p className="mt-3 text-base text-white/40 leading-relaxed">
              {f.final_cta_desc}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-pmi-cream transition-all shadow-lg text-[15px]">
                {f.final_cta_primary} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl border border-white/20 hover:bg-white/5 transition-all text-[15px]">
                {f.final_cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER CTA ========== */}
      <section className="w-full bg-white py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={getLink('/certifications')} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-blue transition-all text-[15px]">
              {f.footer_cta_cert} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-pmi-dark font-medium rounded-xl border border-gray-200 hover:border-pmi-blue hover:text-pmi-blue transition-all text-[15px]">
              <Mail className="w-4 h-4" /> {f.footer_cta_contact}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
