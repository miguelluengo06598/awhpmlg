'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  CheckCircle2,
  ArrowRight,
  Globe,
  Shield,
  Briefcase,
  Users,
  GraduationCap,
  FileCheck,
  Award,
  TrendingUp,
  MessageSquare,
  Building2,
  BarChart3,
  LayoutTemplate,
  PenTool,
  ClipboardCheck,
  HardHat,
  BadgeCheck,
  Layers,
  Box,
  Wrench,
  FolderOpen,
  Cog,
  Star,
  HelpCircle,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';
import ResponsibilitiesPDFSection from './ResponsibilitiesPDFSection';

interface Props {
  locale: 'es' | 'en' | 'pt';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function BDMCertificationPage({ locale }: Props) {
  const { t, getLink } = useTranslation(locale);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const responsibilities = [
    { title: t.bdm.resp_1_title, desc: t.bdm.resp_1_desc },
    { title: t.bdm.resp_2_title, desc: t.bdm.resp_2_desc },
    { title: t.bdm.resp_3_title, desc: t.bdm.resp_3_desc },
    { title: t.bdm.resp_4_title, desc: t.bdm.resp_4_desc },
    { title: t.bdm.resp_5_title, desc: t.bdm.resp_5_desc },
    { title: t.bdm.resp_6_title, desc: t.bdm.resp_6_desc },
    { title: t.bdm.resp_7_title, desc: t.bdm.resp_7_desc },
    { title: t.bdm.resp_8_title, desc: t.bdm.resp_8_desc },
    { title: t.bdm.resp_9_title, desc: t.bdm.resp_9_desc },
    { title: t.bdm.resp_10_title, desc: t.bdm.resp_10_desc },
    { title: t.bdm.resp_11_title, desc: t.bdm.resp_11_desc },
    { title: t.bdm.resp_12_title, desc: t.bdm.resp_12_desc },
    { title: t.bdm.resp_13_title, desc: t.bdm.resp_13_desc },
    { title: t.bdm.resp_14_title, desc: t.bdm.resp_14_desc },
    { title: t.bdm.resp_15_title, desc: t.bdm.resp_15_desc },
    { title: t.bdm.resp_16_title, desc: t.bdm.resp_16_desc },
  ];

  const techCompetencies = [
    { icon: <FileCheck className="w-6 h-6" />, title: t.bdm.tech_1_title, desc: t.bdm.tech_1_desc },
    { icon: <Box className="w-6 h-6" />, title: t.bdm.tech_2_title, desc: t.bdm.tech_2_desc },
    { icon: <FolderOpen className="w-6 h-6" />, title: t.bdm.tech_3_title, desc: t.bdm.tech_3_desc },
    { icon: <Cog className="w-6 h-6" />, title: t.bdm.tech_4_title, desc: t.bdm.tech_4_desc },
    { icon: <ClipboardCheck className="w-6 h-6" />, title: t.bdm.tech_5_title, desc: t.bdm.tech_5_desc },
    { icon: <BarChart3 className="w-6 h-6" />, title: t.bdm.tech_6_title, desc: t.bdm.tech_6_desc },
    { icon: <LayoutTemplate className="w-6 h-6" />, title: t.bdm.tech_7_title, desc: t.bdm.tech_7_desc },
    { icon: <Briefcase className="w-6 h-6" />, title: t.bdm.tech_8_title, desc: t.bdm.tech_8_desc },
    { icon: <GraduationCap className="w-6 h-6" />, title: t.bdm.tech_9_title, desc: t.bdm.tech_9_desc },
  ];

  const transversalGroups = [
    { label: locale === 'es' ? 'Gestión y Liderazgo' : locale === 'pt' ? 'Gestão e Liderança' : 'Management and Leadership', items: [t.bdm.trans_1, t.bdm.trans_2, t.bdm.trans_3] },
    { label: locale === 'es' ? 'Organización y Ética' : locale === 'pt' ? 'Organização e Ética' : 'Organization and Ethics', items: [t.bdm.trans_4, t.bdm.trans_5, t.bdm.trans_6] },
  ];

  const processSteps = [
    { step: '01', title: t.bdm.process_step_1 },
    { step: '02', title: t.bdm.process_step_2 },
    { step: '03', title: t.bdm.process_step_3 },
    { step: '04', title: t.bdm.process_step_4 },
    { step: '05', title: t.bdm.process_step_5 },
  ];

  const benefits = [
    { icon: <Award className="w-6 h-6" />, title: t.bdm.benefit_1_title, desc: t.bdm.benefit_1_desc },
    { icon: <Layers className="w-6 h-6" />, title: t.bdm.benefit_2_title, desc: t.bdm.benefit_2_desc },
    { icon: <BadgeCheck className="w-6 h-6" />, title: t.bdm.benefit_3_title, desc: t.bdm.benefit_3_desc },
    { icon: <Users className="w-6 h-6" />, title: t.bdm.benefit_4_title, desc: t.bdm.benefit_4_desc },
  ];

  const faqs = [
    { q: t.bdm.faq_1_q, a: t.bdm.faq_1_a },
    { q: t.bdm.faq_2_q, a: t.bdm.faq_2_a },
    { q: t.bdm.faq_3_q, a: t.bdm.faq_3_a },
    { q: t.bdm.faq_4_q, a: t.bdm.faq_4_a },
    { q: t.bdm.faq_5_q, a: t.bdm.faq_5_a },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden bg-[#0B0F1C] py-24 md:py-32">
        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-[0.04]"
          animate={{ x: [0, 40, 0], y: [0, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <svg className="w-[200%] h-[200%]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* Ambient orbs */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#00AA88] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0066CC] rounded-full blur-[120px]" />
        </div>

        {/* Floating icon */}
        <motion.div
          className="hidden lg:block absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.08] text-[#00AA88]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Award className="w-72 h-72" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-[#00D4AA] text-sm font-medium mb-8 border border-white/20"
            >
              {t.bdm.badge}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {t.bdm.hero_title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-3xl font-medium mb-6 bg-gradient-to-r from-[#00D4AA] to-[#0066CC] bg-clip-text text-transparent"
            >
              {t.bdm.hero_subtitle}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t.bdm.hero_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getLink('/certifications/bim-design-manager/apply')}
                className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-[#00AA88] hover:bg-[#00997a] text-white px-10 py-4 transition-all hover:scale-105 shadow-lg shadow-[#00AA88]/20"
              >
                {t.bdm.hero_cta_primary} <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 px-10 py-4 transition-all">
                {t.bdm.hero_cta_secondary} <ChevronDown className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. OVERVIEW ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.overview_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.overview_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => {
              const gradients = ['from-emerald-50 to-white', 'from-teal-50 to-white', 'from-cyan-50 to-white'];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`relative p-8 rounded-2xl bg-gradient-to-br ${gradients[i - 1]} border border-slate-100/80 shadow-lg shadow-teal-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-300 group`}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#00AA88]/10 flex items-center justify-center text-[#00AA88] mb-6 group-hover:scale-110 transition-transform duration-300">
                    {i === 1 ? <Users className="w-10 h-10" /> : i === 2 ? <Box className="w-10 h-10" /> : <FolderOpen className="w-10 h-10" />}
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0F1C] mb-1">
                    {(t.bdm as any)[`overview_${i}_title`]}
                  </h3>
                  <p className="text-sm text-[#00AA88] font-medium mb-3">
                    {(t.bdm as any)[`overview_${i}_subtitle`]}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {(t.bdm as any)[`overview_${i}_desc`]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. DESCRIPCIÓN COMPLETA ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C] text-center mb-12">
              {t.bdm.desc_title}
            </motion.h2>
            <div className="border-l-4 border-[#00AA88] pl-6 space-y-6">
              <motion.p variants={fadeInUp} className="text-lg text-slate-700 leading-[1.8]">
                {t.bdm.desc_p1}
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-slate-700 leading-[1.8]">
                {t.bdm.desc_p2}
              </motion.p>
              <motion.p variants={fadeInUp} className="text-lg text-slate-700 leading-[1.8]">
                {t.bdm.desc_p3}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4. CONTEXTO INTERNACIONAL ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.context_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C] mb-4">
              {t.bdm.context_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-600 max-w-2xl mx-auto">
              {t.bdm.context_desc}
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.bdm.context_1, desc: t.bdm.context_1_desc, icon: <Building2 className="w-6 h-6" />, bg: 'bg-emerald-100', text: 'text-emerald-600' },
              { title: t.bdm.context_2, desc: t.bdm.context_2_desc, icon: <FileCheck className="w-6 h-6" />, bg: 'bg-blue-100', text: 'text-blue-600' },
              { title: t.bdm.context_3, desc: t.bdm.context_3_desc, icon: <Globe className="w-6 h-6" />, bg: 'bg-cyan-100', text: 'text-cyan-600' },
              { title: t.bdm.context_4, desc: t.bdm.context_4_desc, icon: <Briefcase className="w-6 h-6" />, bg: 'bg-teal-100', text: 'text-teal-600' },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-full ${card.bg} flex items-center justify-center ${card.text} mb-4`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#0B0F1C] mb-1">{card.title}</h3>
                <p className="text-sm text-slate-600">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. RESPONSABILIDADES (PDF Download) ===== */}
      <ResponsibilitiesPDFSection
        certificationName={t.bdm.hero_subtitle ?? 'BIM Design Manager'}
        certificationCode="BDM"
        accentColorRgb={[0, 170, 136]}
        responsibilities={responsibilities}
        locale={locale}
        badgeLabel={t.bdm.responsibilities_badge}
        sectionTitle={t.bdm.responsibilities_title}
        bgClass="bg-slate-50"
      />

      {/* ===== 6. COMPETENCIAS TÉCNICAS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.tech_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.tech_title}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techCompetencies.map((comp, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-xl border border-slate-100 bg-white border-t-4 border-t-[#00AA88] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00AA88]/10 flex items-center justify-center text-[#00AA88] mb-5 group-hover:bg-[#00AA88] group-hover:text-white transition-colors duration-300">
                  {comp.icon}
                </div>
                <h3 className="font-bold text-[#0B0F1C] mb-2">{comp.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{comp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. COMPETENCIAS TRANSVERSALES ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.trans_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.trans_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {transversalGroups.map((group, gIdx) => (
              <motion.div
                key={gIdx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-[#0B0F1C] mb-6 pb-4 border-b border-slate-100">
                  {group.label}
                </h3>
                <ul className="space-y-4">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#00AA88]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00AA88]" />
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. REQUISITOS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.requirements_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.requirements_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase className="w-6 h-6" />, title: t.bdm.req_exp_title, desc: t.bdm.req_exp_desc, color: 'bg-[#00AA88]', gradient: 'from-emerald-50/80 to-white' },
              { icon: <GraduationCap className="w-6 h-6" />, title: t.bdm.req_edu_title, desc: t.bdm.req_edu_desc, color: 'bg-[#0066CC]', gradient: 'from-blue-50/80 to-white' },
              { icon: <Shield className="w-6 h-6" />, title: t.bdm.req_tech_title, desc: t.bdm.req_tech_desc, color: 'bg-[#FF6B35]', gradient: 'from-orange-50/80 to-white' },
            ].map((req, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${req.gradient} border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-full ${req.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {req.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0B0F1C] mb-3">{req.title}</h3>
                <p className="text-slate-600 leading-relaxed">{req.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. PROCESO ===== */}
      <section className="py-20 bg-[#0B0F1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00D4AA] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.process_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white">
              {t.bdm.process_title}
            </motion.h2>
          </motion.div>
          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#00AA88] via-[#0066CC] to-[#00AA88] shadow-[0_0_12px_rgba(0,170,136,0.35)]" />
            {/* Mobile vertical line */}
            <div className="md:hidden absolute left-[2.5rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00AA88] via-[#0066CC] to-[#00AA88] shadow-[0_0_12px_rgba(0,170,136,0.35)]" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6 relative">
              {processSteps.map((s, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex md:flex-col items-start md:items-center gap-6 md:gap-0 relative"
                >
                  <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-[#00AA88] to-[#0066CC] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#00AA88]/20 relative z-10">
                    {s.step}
                  </div>
                  <div className="md:mt-6 md:text-center pt-2 md:pt-0">
                    <h3 className="font-semibold text-white text-lg">{s.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. BENEFICIOS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.benefits_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.benefits_title}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-white border border-slate-100 border-t-4 border-t-[#00AA88] shadow-lg text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#00AA88] to-[#0066CC] flex items-center justify-center text-white mb-6 shadow-lg">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#0B0F1C] text-lg mb-3">{b.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. OPORTUNIDADES DE CARRERA ===== */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#00AA88]/10 to-[#0066CC]/10 flex items-center justify-center text-[#00AA88] mb-8 shadow-lg shadow-[#00AA88]/10"
            >
              <TrendingUp className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C] mb-6">
              {t.bdm.career_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-700 leading-[1.8] max-w-3xl mx-auto">
              {t.bdm.career_desc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== 12. FAQ ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.faq_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.faq_title}
            </motion.h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`rounded-xl border border-slate-100 overflow-hidden ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                      openFaq === idx ? 'bg-[#00AA88] text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-[#0B0F1C] flex-1 pr-4">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${
                      openFaq === idx ? 'bg-[#00AA88] text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`}
                    />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pl-[4.5rem] text-slate-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 13. COMPARATIVA ===== */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.compare_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.compare_title}
            </motion.h2>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0a2e26] to-[#00AA88] text-white">
                    <th className="px-6 py-4 font-semibold rounded-tl-2xl">{locale === 'es' ? 'Aspecto' : locale === 'pt' ? 'Aspeto' : 'Aspect'}</th>
                    <th className="px-6 py-4 font-semibold">{t.bdm.compare_idm}</th>
                    <th className="px-6 py-4 font-semibold">{t.bdm.compare_bdm}</th>
                    <th className="px-6 py-4 font-semibold rounded-tr-2xl">{t.bdm.compare_bcm}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t.bdm.compare_focus, values: [locale === 'es' ? 'Gestión de Información' : locale === 'pt' ? 'Gestão de Informação' : 'Information Management', locale === 'es' ? 'Diseño BIM' : locale === 'pt' ? 'Projeto BIM' : 'BIM Design', locale === 'es' ? 'Construcción BIM' : locale === 'pt' ? 'Construção BIM' : 'BIM Construction'] },
                    { label: t.bdm.compare_level, values: [locale === 'es' ? 'Avanzado' : locale === 'pt' ? 'Avançado' : 'Advanced', locale === 'es' ? 'Intermedio' : locale === 'pt' ? 'Intermédio' : 'Intermediate', locale === 'es' ? 'Avanzado' : locale === 'pt' ? 'Avançado' : 'Advanced'] },
                    { label: t.bdm.compare_exp, values: ['3+ años', '3+ años', '5+ años'] },
                    { label: t.bdm.compare_price, values: ['€350', '€350', '€450'] },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className={`border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors ${rIdx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                      <td className="px-6 py-4 font-medium text-[#0B0F1C]">{row.label}</td>
                      {row.values.map((v, cIdx) => (
                        <td key={cIdx} className={`px-6 py-4 text-slate-700 ${cIdx === 1 ? 'bg-[#00AA88]/5 text-[#00AA88] font-medium' : ''}`}>
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 14. TESTIMONIOS ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-14"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#00AA88] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bdm.testimonials_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bdm.testimonials_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Laura Fernández', role: locale === 'es' ? 'Coordinadora BIM' : locale === 'pt' ? 'Coordenadora BIM' : 'BIM Coordinator', company: 'Arquitech Studio', quote: locale === 'es' ? 'La certificación BDM me dio las herramientas para liderar la coordinación de diseño en proyectos internacionales con total confianza.' : locale === 'pt' ? 'A certificação BDM deu-me as ferramentas para liderar a coordenação de projeto em projetos internacionais com total confiança.' : 'The BDM certification gave me the tools to lead design coordination in international projects with complete confidence.' },
              { name: 'Miguel Ángel Ruiz', role: locale === 'es' ? 'Jefe de Proyecto de Diseño' : locale === 'pt' ? 'Chefe de Projeto de Conceção' : 'Design Project Manager', company: 'Ingeco BIM', quote: locale === 'es' ? 'Como jefe de proyecto, contar con la certificación BDM de AECOMI me permite garantizar calidad en cada entrega de modelos.' : locale === 'pt' ? 'Como chefe de projeto, ter a certificação BDM da AECOMI permite-me garantir qualidade em cada entrega de modelos.' : 'As a project manager, having the AECOMI BDM certification allows me to guarantee quality in every model delivery.' },
              { name: 'Sarah Johnson', role: locale === 'es' ? 'BIM Manager' : locale === 'pt' ? 'BIM Manager' : 'BIM Manager', company: 'DesignBuild NYC', quote: locale === 'es' ? 'El enfoque práctico de esta certificación la convierte en un estándar indispensable para cualquier coordinador de diseño BIM.' : locale === 'pt' ? 'A abordagem prática desta certificação torna-a num padrão indispensável para qualquer coordenador de projeto BIM.' : 'The practical focus of this certification makes it an essential standard for any BIM design coordinator.' },
            ].map((timo, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 relative border-l-4 border-l-[#00AA88]/20"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg italic leading-relaxed mb-6">&ldquo;{timo.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00AA88] to-[#0066CC] flex items-center justify-center text-white font-bold">
                    {timo.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B0F1C]">{timo.name}</div>
                    <div className="text-sm text-slate-500">{timo.role} — {timo.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 15. CTA FINAL ===== */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0B0F1C] via-[#0a2e26] to-[#0a4a3a]">
        {/* Floating decorative icons */}
        <motion.div
          className="absolute top-12 left-12 opacity-[0.08] text-[#00AA88]"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Award className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 right-12 opacity-[0.08] text-[#00AA88]"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BadgeCheck className="w-16 h-16" />
        </motion.div>
        <div className="absolute top-1/2 right-1/4 opacity-[0.04] text-white">
          <Layers className="w-24 h-24" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="w-20 h-20 mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#00AA88] mb-8"
            >
              <BadgeCheck className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t.bdm.final_cta_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.bdm.final_cta_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getLink('/certifications/bim-design-manager/apply')}
                className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-[#00AA88] hover:bg-[#00997a] text-white px-10 py-4 transition-all hover:scale-105 shadow-lg shadow-[#00AA88]/20"
              >
                {t.bdm.final_cta_primary} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 px-10 py-4 transition-all"
              >
                {t.bdm.final_cta_secondary}
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-10">
              <Link href={getLink('/certifications')} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" /> {t.bdm.back_to_certs}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
