'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Globe, Award, TrendingUp,
  Users, ClipboardList, Layers, HardHat,
  CheckCircle2, FileText, Search, CreditCard,
  GraduationCap, Briefcase, UserCircle, ShieldCheck,
} from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

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

const GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

export default function HomeLanding() {
  const { t, getLink, currentLang } = useTranslation()
  const h = t.home
  const isEs = currentLang === 'es'

  const certs = [
    {
      acronym: 'IDM',
      title: h.cert_1_title,
      level: h.cert_1_level,
      desc: h.cert_1_desc,
      href: getLink('/certifications/information-delivery-manager'),
      hexColor: '#0066CC',
      gradient: 'from-[#0055aa] to-[#0080dd]',
      icon: ClipboardList,
    },
    {
      acronym: 'BDM',
      title: h.cert_2_title,
      level: h.cert_2_level,
      desc: h.cert_2_desc,
      href: getLink('/certifications/bim-design-manager'),
      hexColor: '#00AA88',
      gradient: 'from-[#008866] to-[#00ccaa]',
      icon: Layers,
    },
    {
      acronym: 'BCM',
      title: h.cert_3_title,
      level: h.cert_3_level,
      desc: h.cert_3_desc,
      href: getLink('/certifications/bim-construction-manager'),
      hexColor: '#E8601C',
      gradient: 'from-[#c84c12] to-[#f07030]',
      icon: HardHat,
    },
  ]

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute -top-48 -left-48 w-[900px] h-[700px] rounded-full bg-pmi-cyan/[0.07] blur-[110px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

            {/* ── Text ── */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-semibold tracking-widest text-white/60 uppercase bg-white/[0.06] rounded-full mb-8 border border-white/[0.1]">
                {h.hero_badge}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[60px] xl:text-[68px] font-extrabold text-white leading-[1.06] tracking-tight">
                {h.hero_title}
                <span className="block text-pmi-cyan mt-2.5 leading-[1.1]">{h.hero_title_accent}</span>
              </h1>
              <p className="mt-7 text-[17px] text-white/60 leading-[1.75] max-w-[500px]">
                {h.hero_subtitle}
              </p>
              <p className="mt-3 text-sm text-white/35 leading-relaxed max-w-[460px]">
                {h.hero_description}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href={getLink('/certifications')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pmi-orange text-white font-semibold rounded-xl hover:bg-pmi-orange/90 transition-all shadow-lg shadow-pmi-orange/20 hover:shadow-xl text-[15px]"
                >
                  {h.cta_primary}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={getLink('/about')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white/75 font-medium rounded-xl border border-white/[0.14] hover:bg-white/[0.06] hover:text-white/90 transition-all text-[15px]"
                >
                  {h.cta_secondary}
                </Link>
              </motion.div>
            </motion.div>

            {/* ── Cert card previews (desktop only) ── */}
            <div className="hidden lg:flex flex-col gap-3">
              {certs.map((cert, i) => (
                <motion.div
                  key={cert.acronym}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 + i * 0.12 }}
                >
                  <Link
                    href={cert.href}
                    className="group flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-300"
                  >
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center shrink-0`}>
                      <cert.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{cert.acronym}</div>
                      <div className="text-sm font-semibold text-white/80 truncate leading-snug mt-0.5">{cert.title}</div>
                      <div className="text-[11px] text-white/30 mt-0.5">{cert.level}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                  </Link>
                </motion.div>
              ))}
              <p className="mt-1 text-center text-[11px] text-white/20 tracking-wide">
                {h.certifications_badge} · AECMI
              </p>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 74C120 68 240 56 360 50C480 44 600 44 720 48C840 52 960 60 1080 64C1200 68 1320 68 1380 68L1440 68V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#FAF7F4" />
          </svg>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100 shadow-sm">
              {h.certifications_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.certifications_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.acronym}
                {...staggerItem}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Colored header */}
                <div className={`relative bg-gradient-to-br ${cert.gradient} p-6 pb-9 overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute -right-5 -top-5 w-28 h-28 rounded-full bg-white/[0.08]" />
                  <div className="absolute right-6 bottom-2 w-16 h-16 rounded-full bg-white/[0.06]" />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <span className="text-5xl font-black text-white tracking-tighter leading-none">{cert.acronym}</span>
                      <div className="mt-2.5 inline-flex items-center px-2.5 py-0.5 bg-white/20 rounded-full">
                        <span className="text-[10px] font-semibold text-white/85 uppercase tracking-wider">{cert.level}</span>
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                      <cert.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col px-6 pb-6 pt-5">
                  <h3 className="text-[15px] font-bold text-pmi-dark leading-snug">{cert.title}</h3>
                  <p className="mt-2.5 text-sm text-gray-500 leading-relaxed flex-1">{cert.desc}</p>
                  <Link
                    href={cert.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
                    style={{ color: cert.hexColor }}
                  >
                    {isEs ? `Explorar ${cert.acronym}` : `Explore ${cert.acronym}`}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link
              href={getLink('/certifications')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-purple transition-all text-[15px] shadow-md hover:shadow-lg"
            >
              {h.certifications_cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ ADVANTAGES ═════════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {h.advantages_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.advantages_title}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              { icon: Globe, title: h.adv_1_title, desc: h.adv_1_desc, color: 'text-pmi-blue', bg: 'bg-blue-50', border: 'border-blue-100/60' },
              { icon: TrendingUp, title: h.adv_2_title, desc: h.adv_2_desc, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100/60' },
              { icon: Users, title: h.adv_3_title, desc: h.adv_3_desc, color: 'text-pmi-purple', bg: 'bg-purple-50', border: 'border-purple-100/60' },
              { icon: ShieldCheck, title: h.adv_4_title, desc: h.adv_4_desc, color: 'text-pmi-orange', bg: 'bg-orange-50', border: 'border-orange-100/60' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`p-7 rounded-2xl bg-white border ${item.border} hover:shadow-md transition-all duration-300`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.bg} ${item.color} mb-5`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {h.timeline_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.timeline_title}
            </h2>
            <p className="mt-3 text-base text-gray-500 max-w-lg mx-auto">
              {h.timeline_subtitle}
            </p>
          </motion.div>

          <div className="relative">
            {/* Desktop connector */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {[
                { icon: CheckCircle2, title: h.step_1_title, desc: h.step_1_desc, color: 'bg-pmi-blue', n: '01' },
                { icon: FileText,     title: h.step_2_title, desc: h.step_2_desc, color: 'bg-pmi-cyan', n: '02' },
                { icon: Search,       title: h.step_3_title, desc: h.step_3_desc, color: 'bg-pmi-purple', n: '03' },
                { icon: CreditCard,   title: h.step_4_title, desc: h.step_4_desc, color: 'bg-pmi-orange', n: '04' },
                { icon: GraduationCap, title: h.step_5_title, desc: h.step_5_desc, color: 'bg-emerald-600', n: '05' },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform duration-300`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="mt-5">
                    <div className="text-[11px] font-bold text-gray-300 tracking-widest mb-1.5">{step.n}</div>
                    <div className="text-sm font-bold text-pmi-dark">{step.title}</div>
                    <div className="mt-1.5 text-xs text-gray-500 leading-relaxed max-w-[140px] mx-auto">{step.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY ══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={GRID_BG} />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-pmi-cyan/[0.05] rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-cyan uppercase bg-white/[0.06] rounded-full mb-5 border border-white/[0.08]">
              {h.community_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white tracking-tight">
              {h.community_title}
            </h2>
            <p className="mt-4 text-sm text-white/35 max-w-lg mx-auto leading-relaxed">
              {h.community_subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {[
              { value: h.community_1_value, label: h.community_1_label, icon: UserCircle },
              { value: h.community_2_value, label: h.community_2_label, icon: GraduationCap },
              { value: h.community_3_value, label: h.community_3_label, icon: Briefcase },
              { value: h.community_4_value, label: h.community_4_label, icon: Globe },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                {...staggerItem}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="px-6 py-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-pmi-cyan/50 mx-auto mb-3" />
                <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">{item.value}</div>
                <div className="mt-1.5 text-[11px] font-semibold text-white/30 uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link
              href={getLink('/contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all text-[15px] shadow-md"
            >
              {h.community_cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#060B18] overflow-hidden border-t border-white/[0.04]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pmi-cyan/10 via-pmi-blue/10 to-pmi-orange/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              {h.final_cta_title}
            </h2>
            <p className="mt-5 text-sm text-white/40 leading-relaxed max-w-lg mx-auto">
              {h.final_cta_subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={getLink('/certifications')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all text-[15px] shadow-md"
              >
                {h.final_cta_primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white/70 font-medium rounded-xl border border-white/[0.14] hover:bg-white/[0.06] hover:text-white/90 transition-all text-[15px]"
              >
                {h.final_cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
