'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Mail,
  Star,
  Globe,
  Award,
  TrendingUp,
  Settings,
  Users,
  BarChart3,
  ClipboardCheck,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  FileText,
  Search,
  CreditCard,
  GraduationCap,
  Briefcase,
  UserCircle,
  Rocket,
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

export default function HomeLanding() {
  const { t, getLink } = useTranslation()
  const h = t.home

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-pmi-cyan/30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-pmi-blue/30 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-white/80 uppercase bg-white/[0.06] rounded-full mb-7 border border-white/[0.08]">
              {h.hero_badge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              {h.hero_title}
              <span className="block text-pmi-cyan mt-2">{h.hero_title_accent}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">
              {h.hero_subtitle}
            </p>
            <p className="mt-3 text-base text-white/50 leading-relaxed max-w-lg">
              {h.hero_description}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href={getLink('/certifications')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pmi-orange text-white font-semibold rounded-xl hover:bg-pmi-orange/90 transition-all shadow-lg hover:shadow-xl text-[15px]"
              >
                {h.cta_primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLink('/about')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl border border-white/20 hover:bg-white/5 transition-all text-[15px]"
              >
                {h.cta_secondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 74C120 68 240 56 360 50C480 44 600 44 720 48C840 52 960 60 1080 64C1200 68 1320 68 1380 68L1440 68V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#FAF7F4" />
          </svg>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {h.stats_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.stats_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { value: h.stat_1_value, label: h.stat_1_label, icon: Star, color: 'text-pmi-blue', bg: 'bg-blue-50', border: 'border-blue-100' },
              { value: h.stat_2_value, label: h.stat_2_label, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
              { value: h.stat_3_value, label: h.stat_3_label, icon: Award, color: 'text-pmi-orange', bg: 'bg-orange-50', border: 'border-orange-100' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative p-8 lg:p-10 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} ${stat.color} mb-5`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-pmi-dark tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm font-medium text-gray-500 tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <motion.div
              {...fadeInUp}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue overflow-hidden relative">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pmi-cyan/40 rounded-full blur-2xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pmi-orange/30 rounded-full blur-2xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    {[Settings, Users, BarChart3, Award].map((Icon, i) => (
                      <div key={i} className="w-16 h-16 lg:w-20 lg:h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white/80" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-pmi-cream rounded-2xl border border-gray-100 -z-10" />
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-5 border border-blue-100/60">
                {h.mission_badge}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
                {h.mission_title}
              </h2>

              <div className="mt-10 space-y-8">
                {[
                  { icon: Settings, title: h.mission_item_1_title, desc: h.mission_item_1_desc },
                  { icon: Users, title: h.mission_item_2_title, desc: h.mission_item_2_desc },
                  { icon: BarChart3, title: h.mission_item_3_title, desc: h.mission_item_3_desc },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pmi-dark shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-pmi-dark">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href={getLink('/certifications')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-pmi-dark hover:text-pmi-blue transition-colors"
                >
                  {h.mission_cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {h.services_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.services_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: ClipboardCheck,
                title: h.service_1_title,
                desc: h.service_1_desc,
                cta: h.service_1_cta,
                href: getLink('/certifications'),
                gradient: 'from-pmi-blue to-[#005C8F]',
                hoverBorder: 'hover:border-pmi-blue/30',
              },
              {
                icon: BookOpen,
                title: h.service_2_title,
                desc: h.service_2_desc,
                cta: h.service_2_cta,
                href: getLink('/certifications'),
                gradient: 'from-emerald-600 to-teal-600',
                hoverBorder: 'hover:border-emerald-500/30',
              },
              {
                icon: Lightbulb,
                title: h.service_3_title,
                desc: h.service_3_desc,
                cta: h.service_3_cta,
                href: getLink('/about'),
                gradient: 'from-pmi-orange to-[#D46A2A]',
                hoverBorder: 'hover:border-pmi-orange/30',
              },
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
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-pmi-dark hover:text-pmi-blue transition-colors"
                >
                  {item.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMMUNITY ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pmi-cyan/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-cyan uppercase bg-white/[0.06] rounded-full mb-5 border border-white/[0.08]">
              {h.community_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white tracking-tight">
              {h.community_title}
            </h2>
            <p className="mt-4 text-base text-white/50 max-w-xl mx-auto">
              {h.community_subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              { value: h.community_1_value, label: h.community_1_label, icon: UserCircle },
              { value: h.community_2_value, label: h.community_2_label, icon: GraduationCap },
              { value: h.community_3_value, label: h.community_3_label, icon: Briefcase },
              { value: h.community_4_value, label: h.community_4_label, icon: Globe },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="p-6 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center hover:bg-white/[0.06] transition-colors duration-300"
              >
                <item.icon className="w-6 h-6 text-pmi-cyan/70 mx-auto mb-4" />
                <div className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {item.value}
                </div>
                <div className="mt-1.5 text-xs font-medium text-white/40 uppercase tracking-wider">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link
              href={getLink('/contact')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all text-[15px]"
            >
              {h.community_cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
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
            {/* Desktop connector line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
              {[
                { icon: CheckCircle2, title: h.step_1_title, desc: h.step_1_desc, color: 'bg-pmi-blue' },
                { icon: FileText, title: h.step_2_title, desc: h.step_2_desc, color: 'bg-pmi-cyan' },
                { icon: Search, title: h.step_3_title, desc: h.step_3_desc, color: 'bg-pmi-purple' },
                { icon: CreditCard, title: h.step_4_title, desc: h.step_4_desc, color: 'bg-pmi-orange' },
                { icon: GraduationCap, title: h.step_5_title, desc: h.step_5_desc, color: 'bg-emerald-600' },
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
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATIONS HIGHLIGHT ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {h.certifications_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.certifications_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: h.cert_1_title,
                level: h.cert_1_level,
                desc: h.cert_1_desc,
                gradient: 'from-pmi-blue to-[#005C8F]',
                bg: 'bg-blue-50',
              },
              {
                title: h.cert_2_title,
                level: h.cert_2_level,
                desc: h.cert_2_desc,
                gradient: 'from-pmi-purple to-[#4A2080]',
                bg: 'bg-purple-50',
              },
              {
                title: h.cert_3_title,
                level: h.cert_3_level,
                desc: h.cert_3_desc,
                gradient: 'from-pmi-orange to-[#D46A2A]',
                bg: 'bg-orange-50',
              },
            ].map((cert, index) => (
              <motion.div
                key={cert.title}
                {...staggerItem}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${cert.gradient}`} />
                <div className="p-7 lg:p-8">
                  <span className="inline-block px-2.5 py-1 text-[10px] font-semibold tracking-wider text-gray-500 uppercase bg-gray-100 rounded-md mb-4">
                    {cert.level}
                  </span>
                  <h3 className="text-lg font-bold text-pmi-dark mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">{cert.desc}</p>
                  <Link
                    href={getLink('/certifications')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-pmi-dark hover:text-pmi-blue transition-colors"
                  >
                    {h.certifications_cta}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-12 text-center">
            <Link
              href={getLink('/certifications')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pmi-dark text-white font-semibold rounded-xl hover:bg-pmi-purple transition-all text-[15px]"
            >
              {h.certifications_cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== ADVANTAGES ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {h.advantages_badge}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {h.advantages_title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: Globe, title: h.adv_1_title, desc: h.adv_1_desc, color: 'text-pmi-blue', bg: 'bg-blue-50', border: 'border-blue-100' },
              { icon: TrendingUp, title: h.adv_2_title, desc: h.adv_2_desc, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
              { icon: Users, title: h.adv_3_title, desc: h.adv_3_desc, color: 'text-pmi-orange', bg: 'bg-orange-50', border: 'border-orange-100' },
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
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-pmi-cyan/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-pmi-orange/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              {h.final_cta_title}
            </h2>
            <p className="mt-5 text-base text-white/50 leading-relaxed">
              {h.final_cta_subtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={getLink('/certifications')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all text-[15px]"
              >
                {h.final_cta_primary}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl border border-white/20 hover:bg-white/5 transition-all text-[15px]"
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
