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
  Calendar,
  Clock,
  Zap,
  Truck,
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

const PRIMARY = '#FF6B35';
const PRIMARY_BG = 'bg-[#FF6B35]';
const PRIMARY_TEXT = 'text-[#FF6B35]';
const PRIMARY_BG_LIGHT = 'bg-[#FF6B35]/10';
const PRIMARY_BORDER = 'border-orange-50';
const PRIMARY_GRADIENT_FROM = 'from-[#fff7ed]';
const PRIMARY_GRADIENT_TO = 'to-[#ffedd5]';

export default function BCMCertificationPage({ locale }: Props) {
  // Años de experiencia de la tabla comparativa (la unidad cambia por idioma).
  const expYears = (n: number) =>
    locale === 'es' ? n+'+ años' : locale === 'pt' ? n+'+ anos' : n+'+ years';
  const { t, getLink } = useTranslation(locale);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const responsibilities = [
    { title: t.bcm.resp_1_title, desc: t.bcm.resp_1_desc },
    { title: t.bcm.resp_2_title, desc: t.bcm.resp_2_desc },
    { title: t.bcm.resp_3_title, desc: t.bcm.resp_3_desc },
    { title: t.bcm.resp_4_title, desc: t.bcm.resp_4_desc },
    { title: t.bcm.resp_5_title, desc: t.bcm.resp_5_desc },
    { title: t.bcm.resp_6_title, desc: t.bcm.resp_6_desc },
    { title: t.bcm.resp_7_title, desc: t.bcm.resp_7_desc },
    { title: t.bcm.resp_8_title, desc: t.bcm.resp_8_desc },
    { title: t.bcm.resp_9_title, desc: t.bcm.resp_9_desc },
    { title: t.bcm.resp_10_title, desc: t.bcm.resp_10_desc },
    { title: t.bcm.resp_11_title, desc: t.bcm.resp_11_desc },
    { title: t.bcm.resp_12_title, desc: t.bcm.resp_12_desc },
    { title: t.bcm.resp_13_title, desc: t.bcm.resp_13_desc },
    { title: t.bcm.resp_14_title, desc: t.bcm.resp_14_desc },
    { title: t.bcm.resp_15_title, desc: t.bcm.resp_15_desc },
    { title: t.bcm.resp_16_title, desc: t.bcm.resp_16_desc },
  ];

  const techCompetencies = [
    { icon: <FileCheck className="w-6 h-6" />, title: t.bcm.tech_1_title, desc: t.bcm.tech_1_desc },
    { icon: <FolderOpen className="w-6 h-6" />, title: t.bcm.tech_2_title, desc: t.bcm.tech_2_desc },
    { icon: <Box className="w-6 h-6" />, title: t.bcm.tech_3_title, desc: t.bcm.tech_3_desc },
    { icon: <Cog className="w-6 h-6" />, title: t.bcm.tech_4_title, desc: t.bcm.tech_4_desc },
    { icon: <Layers className="w-6 h-6" />, title: t.bcm.tech_5_title, desc: t.bcm.tech_5_desc },
    { icon: <ClipboardCheck className="w-6 h-6" />, title: t.bcm.tech_6_title, desc: t.bcm.tech_6_desc },
    { icon: <LayoutTemplate className="w-6 h-6" />, title: t.bcm.tech_7_title, desc: t.bcm.tech_7_desc },
    { icon: <Shield className="w-6 h-6" />, title: t.bcm.tech_8_title, desc: t.bcm.tech_8_desc },
    { icon: <BarChart3 className="w-6 h-6" />, title: t.bcm.tech_9_title, desc: t.bcm.tech_9_desc },
  ];

  const transversalItems = [
    t.bcm.trans_1,
    t.bcm.trans_2,
    t.bcm.trans_3,
    t.bcm.trans_4,
    t.bcm.trans_5,
    t.bcm.trans_6,
  ];

  const processSteps = [
    { step: '01', title: t.bcm.process_step_1, desc: locale === 'es' ? 'Registro y preparación de documentación' : locale === 'pt' ? 'Registo e preparação de documentação' : 'Registration and documentation preparation' },
    { step: '02', title: t.bcm.process_step_2, desc: locale === 'es' ? 'Evaluación de competencias técnicas' : locale === 'pt' ? 'Avaliação de competências técnicas' : 'Technical competency assessment' },
    { step: '03', title: t.bcm.process_step_3, desc: locale === 'es' ? 'Evaluación de competencias transversales' : locale === 'pt' ? 'Avaliação de competências transversais' : 'Transversal competency assessment' },
    { step: '04', title: t.bcm.process_step_4, desc: locale === 'es' ? 'Entrevista con el tribunal' : locale === 'pt' ? 'Entrevista com o júri' : 'Interview with the board' },
    { step: '05', title: t.bcm.process_step_5, desc: locale === 'es' ? 'Emisión de certificado digital' : locale === 'pt' ? 'Emissão de certificado digital' : 'Digital certificate issuance' },
  ];

  const benefits = [
    { icon: <HardHat className="w-6 h-6" />, title: t.bcm.benefit_1_title, desc: t.bcm.benefit_1_desc },
    { icon: <Users className="w-6 h-6" />, title: t.bcm.benefit_2_title, desc: t.bcm.benefit_2_desc },
    { icon: <BarChart3 className="w-6 h-6" />, title: t.bcm.benefit_3_title, desc: t.bcm.benefit_3_desc },
    { icon: <Truck className="w-6 h-6" />, title: t.bcm.benefit_4_title, desc: t.bcm.benefit_4_desc },
  ];

  const faqs = [
    { q: t.bcm.faq_1_q, a: t.bcm.faq_1_a },
    { q: t.bcm.faq_2_q, a: t.bcm.faq_2_a },
    { q: t.bcm.faq_3_q, a: t.bcm.faq_3_a },
    { q: t.bcm.faq_4_q, a: t.bcm.faq_4_a },
    { q: t.bcm.faq_5_q, a: t.bcm.faq_5_a },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden bg-[#0B0F1C] py-20 md:py-32">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FF6B35" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF6B35] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF3333] rounded-full blur-[120px]" />
        </div>
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:flex absolute right-20 top-1/3 w-32 h-32 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 items-center justify-center text-[#FF6B35]/40"
        >
          <HardHat className="w-16 h-16" />
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
              className="inline-block px-5 py-2 rounded-full bg-white/10 text-[#FF6B35] text-sm font-medium mb-8 border border-white/10 backdrop-blur-md"
            >
              {t.bcm.badge}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {t.bcm.hero_title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-2xl md:text-3xl font-medium mb-4 bg-gradient-to-r from-[#FF6B35] via-[#FF8C5A] to-[#FF3333] bg-clip-text text-transparent">
              {t.bcm.hero_subtitle}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t.bcm.hero_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLink('/certifications/bim-construction-manager/apply')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-[#FF6B35] hover:bg-[#e55a2b] text-white px-10 py-4 transition-colors shadow-lg shadow-orange-900/20">
                <Award className="w-5 h-5" />
                {t.bcm.hero_cta_primary}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 px-10 py-4 transition-colors">
                <Calendar className="w-5 h-5" />
                {t.bcm.hero_cta_secondary}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. OVERVIEW (3 puntos) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.overview_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.overview_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => {
              const gradients = [
                'bg-gradient-to-br from-orange-50 to-white',
                'bg-gradient-to-br from-red-50 to-white',
                'bg-gradient-to-br from-amber-50 to-white',
              ];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`group relative p-8 rounded-2xl ${gradients[i - 1]} border border-slate-100/80 shadow-lg shadow-orange-900/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-900/10 transition-all duration-300`}
                >
                  <div className={`w-14 h-14 rounded-xl ${PRIMARY_BG_LIGHT} flex items-center justify-center ${PRIMARY_TEXT} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {i === 1 ? <Box className="w-10 h-10" /> : i === 2 ? <Users className="w-10 h-10" /> : <BarChart3 className="w-10 h-10" />}
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0F1C] mb-1">
                    {(t.bcm as any)[`overview_${i}_title`]}
                  </h3>
                  <p className={`text-sm ${PRIMARY_TEXT} font-medium mb-3`}>
                    {(t.bcm as any)[`overview_${i}_subtitle`]}
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    {(t.bcm as any)[`overview_${i}_desc`]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. DESCRIPCIÓN COMPLETA ===== */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C] text-center mb-14">
              {t.bcm.desc_title}
            </motion.h2>
            <div className="space-y-8">
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#FF6B35]">
                <p className="text-lg text-slate-700 leading-[1.8]">{t.bcm.desc_p1}</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#FF6B35]">
                <p className="text-lg text-slate-700 leading-[1.8]">{t.bcm.desc_p2}</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#FF6B35]">
                <p className="text-lg text-slate-700 leading-[1.8]">{t.bcm.desc_p3}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4. CONTEXTO INTERNACIONAL ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.context_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C] mb-4">
              {t.bcm.context_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-slate-600 max-w-2xl mx-auto">
              {t.bcm.context_desc}
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.bcm.context_1, desc: t.bcm.context_1_desc, icon: <Building2 className="w-6 h-6" />, bg: 'bg-blue-50', text: 'text-blue-600' },
              { title: t.bcm.context_2, desc: t.bcm.context_2_desc, icon: <FileCheck className="w-6 h-6" />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
              { title: t.bcm.context_3, desc: t.bcm.context_3_desc, icon: <Globe className="w-6 h-6" />, bg: 'bg-violet-50', text: 'text-violet-600' },
              { title: t.bcm.context_4, desc: t.bcm.context_4_desc, icon: <Briefcase className="w-6 h-6" />, bg: 'bg-amber-50', text: 'text-amber-600' },
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
        certificationName={t.bcm.hero_subtitle ?? 'BIM Construction Manager'}
        certificationCode="BCM"
        accentColorRgb={[255, 107, 53]}
        responsibilities={responsibilities}
        locale={locale}
        badgeLabel={t.bcm.responsibilities_badge}
        sectionTitle={t.bcm.responsibilities_title}
        bgClass="bg-slate-50"
      />

      {/* ===== 6. COMPETENCIAS TÉCNICAS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.tech_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.tech_title}
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
                className="group p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border-t-4 border-t-[#FF6B35]"
              >
                <div className={`w-14 h-14 rounded-2xl ${PRIMARY_BG_LIGHT} flex items-center justify-center ${PRIMARY_TEXT} mb-4 group-hover:${PRIMARY_BG} group-hover:text-white transition-colors duration-300`}>
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.trans_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.trans_title}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {transversalItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-slate-700 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. REQUISITOS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.requirements_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.requirements_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase className="w-6 h-6" />, title: t.bcm.req_exp_title, desc: t.bcm.req_exp_desc, gradient: 'from-orange-50 to-amber-50', circle: 'bg-[#FF6B35]' },
              { icon: <GraduationCap className="w-6 h-6" />, title: t.bcm.req_edu_title, desc: t.bcm.req_edu_desc, gradient: 'from-blue-50 to-sky-50', circle: 'bg-[#0066CC]' },
              { icon: <Shield className="w-6 h-6" />, title: t.bcm.req_tech_title, desc: t.bcm.req_tech_desc, gradient: 'from-emerald-50 to-teal-50', circle: 'bg-[#00AA88]' },
            ].map((req, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative p-8 rounded-2xl bg-gradient-to-br ${req.gradient} border border-slate-100 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-14 h-14 rounded-full ${req.circle} flex items-center justify-center text-white mb-6 shadow-lg`}>
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
      <section className="py-24 bg-[#0B0F1C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#FF8C5A] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.bcm.process_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white">
              {t.bcm.process_title}
            </motion.h2>
          </motion.div>
          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#FF6B35] via-[#FF3333] to-[#0066CC] shadow-[0_0_12px_rgba(255,107,53,0.4)]" />
            {/* Mobile vertical line */}
            <div className="md:hidden absolute left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B35] via-[#FF3333] to-[#0066CC] shadow-[0_0_12px_rgba(255,107,53,0.4)]" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 relative">
              {processSteps.map((s, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex md:flex-col items-start md:items-center gap-6 md:gap-0"
                >
                  <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF3333] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-900/30 relative z-10">
                    {s.step}
                  </div>
                  <div className="md:mt-6 md:text-center">
                    <h3 className="font-semibold text-white text-lg">{s.title}</h3>
                    <p className="text-sm text-gray-400 mt-1 max-w-[200px] mx-auto">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 10. BENEFICIOS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.benefits_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.benefits_title}
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
                className="p-8 rounded-2xl bg-white border border-slate-100 text-center shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border-t-4 border-t-[#FF6B35]"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF3333] flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-900/20">
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className={`w-16 h-16 mx-auto rounded-full ${PRIMARY_BG_LIGHT} flex items-center justify-center ${PRIMARY_TEXT} mb-6`}>
              <TrendingUp className="w-8 h-8" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C] mb-6">
              {t.bcm.career_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-700 leading-relaxed">
              {t.bcm.career_desc}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== 12. FAQ ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.faq_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.faq_title}
            </motion.h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`rounded-xl border border-slate-100 overflow-hidden shadow-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-slate-50/50 transition-colors"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <span className="font-semibold text-[#0B0F1C] flex-1 pr-4">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 shrink-0 ${openFaq === idx ? 'bg-[#FF6B35] border-[#FF6B35] text-white' : 'text-slate-400'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pl-[4.25rem] text-slate-600 leading-relaxed">
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
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.compare_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.compare_title}
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
                  <tr className="bg-gradient-to-r from-[#c44a1a] to-[#FF6B35] text-white">
                    <th className="px-6 py-4 font-semibold">{locale === 'es' ? 'Aspecto' : locale === 'pt' ? 'Aspeto' : 'Aspect'}</th>
                    <th className="px-6 py-4 font-semibold">{t.bcm.compare_idm}</th>
                    <th className="px-6 py-4 font-semibold">{t.bcm.compare_bdm}</th>
                    <th className="px-6 py-4 font-semibold">{t.bcm.compare_bcm}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t.bcm.compare_focus, values: [locale === 'es' ? 'Gestión de Información' : locale === 'pt' ? 'Gestão de Informação' : 'Information Management', locale === 'es' ? 'Diseño BIM' : locale === 'pt' ? 'Projeto BIM' : 'BIM Design', locale === 'es' ? 'Construcción BIM' : locale === 'pt' ? 'Construção BIM' : 'BIM Construction'] },
                    { label: t.bcm.compare_level, values: [locale === 'es' ? 'Intermedio' : locale === 'pt' ? 'Intermédio' : 'Intermediate', locale === 'es' ? 'Intermedio' : locale === 'pt' ? 'Intermédio' : 'Intermediate', locale === 'es' ? 'Avanzado' : locale === 'pt' ? 'Avançado' : 'Advanced'] },
                    { label: t.bcm.compare_exp, values: [expYears(3), expYears(3), expYears(5)] },
                    { label: t.bcm.compare_price, values: ['€350', '€350', '€450'] },
                  ].map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`transition-colors hover:bg-slate-50 ${rIdx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4 font-medium text-[#0B0F1C]">{row.label}</td>
                      {row.values.map((v, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-6 py-4 text-slate-700 ${cIdx === 2 ? 'bg-[#FF6B35]/5 text-[#FF6B35] font-medium' : ''}`}
                        >
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className={`inline-block ${PRIMARY_TEXT} font-semibold text-sm tracking-wider uppercase mb-3`}>
              {t.bcm.testimonials_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#0B0F1C]">
              {t.bcm.testimonials_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Roberto Sánchez', role: locale === 'es' ? 'Jefe de Obra BIM' : locale === 'pt' ? 'Chefe de Obra BIM' : 'BIM Site Manager', company: 'Construcciones del Norte', quote: locale === 'es' ? 'La certificación BCM me permitió liderar la coordinación BIM en obra con total autoridad. Los clientes confían más en un perfil certificado.' : locale === 'pt' ? 'A certificação BCM permitiu-me liderar a coordenação BIM em obra com total autoridade. Os clientes confiam mais num perfil certificado.' : 'The BCM certification allowed me to lead BIM coordination on site with full authority. Clients trust a certified profile more.' },
              { name: 'María José López', role: locale === 'es' ? 'Directora de Construcción' : locale === 'pt' ? 'Diretora de Construção' : 'Construction Director', company: 'Edifica Proyectos', quote: locale === 'es' ? 'Como directora, valorar que mi equipo tenga certificaciones BCM nos da una ventaja real en licitaciones de obra pública.' : locale === 'pt' ? 'Como diretora, o facto de a minha equipa ter certificações BCM dá-nos uma vantagem real em concursos de obra pública.' : 'As a director, having BCM certified team members gives us a real advantage in public construction tenders.' },
              { name: 'David Chen', role: locale === 'es' ? 'Coordinador BIM de Obra' : locale === 'pt' ? 'Coordenador BIM de Obra' : 'Site BIM Coordinator', company: 'GlobalBuild Asia', quote: locale === 'es' ? 'El nivel práctico de esta certificación la convierte en imprescindible para cualquier profesional que gestione BIM en obra.' : locale === 'pt' ? 'O nível prático desta certificação torna-a indispensável para qualquer profissional que faça a gestão de BIM em obra.' : 'The practical level of this certification makes it essential for any professional managing BIM on site.' },
            ].map((timo, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 relative border-l-4 border-l-[#FF6B35]/30"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg italic leading-relaxed mb-6">&ldquo;{timo.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF3333] flex items-center justify-center text-white font-bold shadow-md">
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
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0B0F1C] via-[#2a1a10] to-[#4a1a0a]">
        {/* Floating decorative icons */}
        <motion.div animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:block absolute top-16 left-16 text-[#FF6B35]/10">
          <Shield className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:block absolute bottom-16 right-16 text-[#FF6B35]/10">
          <Zap className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:block absolute top-1/2 right-1/4 text-[#FF3333]/10">
          <Award className="w-16 h-16" />
        </motion.div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-5 py-2 rounded-full bg-white/10 text-[#FF6B35] text-sm font-medium mb-8 border border-white/10 backdrop-blur-md"
            >
              {locale === 'es' ? 'Certificación profesional' : locale === 'pt' ? 'Certificação profissional' : 'Professional certification'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.bcm.final_cta_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.bcm.final_cta_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLink('/certifications/bim-construction-manager/apply')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-[#FF6B35] hover:bg-[#e55a2b] text-white px-10 py-4 transition-colors shadow-lg shadow-orange-900/30">
                {t.bcm.final_cta_primary} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border border-white/20 text-white hover:bg-white/10 px-10 py-4 transition-colors">
                {t.bcm.final_cta_secondary}
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-12">
              <Link href={getLink('/certifications')} className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" /> {t.bcm.back_to_certs}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== RELACIONADOS ===== */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-[#0B0F1C] mb-2">
              {locale === 'es' ? 'Explora otras certificaciones' : locale === 'pt' ? 'Explore outras certificações' : 'Explore other certifications'}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-slate-600">
              {locale === 'es' ? 'Descubre el programa que mejor se adapta a tu perfil profesional' : locale === 'pt' ? 'Descubra o programa que melhor se adapta ao seu perfil profissional' : 'Discover the program that best fits your professional profile'}
            </motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href={getLink('/certifications/information-delivery-manager')}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-l-4 border-l-[#0066CC]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC]">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#0B0F1C]">Information Delivery Manager</div>
                  <div className="text-sm text-slate-500">{locale === 'es' ? 'Gestión estratégica de información' : locale === 'pt' ? 'Gestão estratégica de informação' : 'Strategic information management'}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </Link>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                href={getLink('/certifications/bim-design-manager')}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-l-4 border-l-[#00AA88]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00AA88]/10 flex items-center justify-center text-[#00AA88]">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#0B0F1C]">BIM Design Manager</div>
                  <div className="text-sm text-slate-500">{locale === 'es' ? 'Coordinación de diseño BIM' : locale === 'pt' ? 'Coordenação de projeto BIM' : 'BIM design coordination'}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 ml-auto" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
