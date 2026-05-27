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
  Star,
  HelpCircle,
  Calendar,
  Zap,
  Layers,
  Box,
  FolderOpen,
  Cog,
  Database,
  Search,
  Target,
  BookOpen,
  Cpu,
  Lightbulb,
  Handshake,
  Megaphone,
  Eye,
  Compass,
  Scale,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

interface Props {
  locale: 'es' | 'en';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function IDMCertificationPage({ locale }: Props) {
  const { t, getLink } = useTranslation(locale);
  const [openResponsibility, setOpenResponsibility] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const responsibilities = [
    { title: t.idm.resp_1_title, desc: t.idm.resp_1_desc },
    { title: t.idm.resp_2_title, desc: t.idm.resp_2_desc },
    { title: t.idm.resp_3_title, desc: t.idm.resp_3_desc },
    { title: t.idm.resp_4_title, desc: t.idm.resp_4_desc },
    { title: t.idm.resp_5_title, desc: t.idm.resp_5_desc },
    { title: t.idm.resp_6_title, desc: t.idm.resp_6_desc },
    { title: t.idm.resp_7_title, desc: t.idm.resp_7_desc },
    { title: t.idm.resp_8_title, desc: t.idm.resp_8_desc },
    { title: t.idm.resp_9_title, desc: t.idm.resp_9_desc },
    { title: t.idm.resp_10_title, desc: t.idm.resp_10_desc },
    { title: t.idm.resp_11_title, desc: t.idm.resp_11_desc },
    { title: t.idm.resp_12_title, desc: t.idm.resp_12_desc },
    { title: t.idm.resp_13_title, desc: t.idm.resp_13_desc },
    { title: t.idm.resp_14_title, desc: t.idm.resp_14_desc },
    { title: t.idm.resp_15_title, desc: t.idm.resp_15_desc },
  ];

  const techCompetencies = [
    { icon: <FileCheck className="w-10 h-10" />, title: t.idm.tech_1_title, desc: t.idm.tech_1_desc },
    { icon: <LayoutTemplate className="w-10 h-10" />, title: t.idm.tech_2_title, desc: t.idm.tech_2_desc },
    { icon: <ClipboardCheck className="w-10 h-10" />, title: t.idm.tech_3_title, desc: t.idm.tech_3_desc },
    { icon: <Users className="w-10 h-10" />, title: t.idm.tech_4_title, desc: t.idm.tech_4_desc },
    { icon: <PenTool className="w-10 h-10" />, title: t.idm.tech_5_title, desc: t.idm.tech_5_desc },
    { icon: <BarChart3 className="w-10 h-10" />, title: t.idm.tech_6_title, desc: t.idm.tech_6_desc },
    { icon: <Briefcase className="w-10 h-10" />, title: t.idm.tech_7_title, desc: t.idm.tech_7_desc },
    { icon: <Building2 className="w-10 h-10" />, title: t.idm.tech_8_title, desc: t.idm.tech_8_desc },
    { icon: <GraduationCap className="w-10 h-10" />, title: t.idm.tech_9_title, desc: t.idm.tech_9_desc },
  ];

  const transversalItems = [
    { icon: <Users className="w-8 h-8" />, label: t.idm.trans_1 },
    { icon: <Briefcase className="w-8 h-8" />, label: t.idm.trans_2 },
    { icon: <Target className="w-8 h-8" />, label: t.idm.trans_3 },
    { icon: <Handshake className="w-8 h-8" />, label: t.idm.trans_4 },
    { icon: <Megaphone className="w-8 h-8" />, label: t.idm.trans_5 },
    { icon: <MessageSquare className="w-8 h-8" />, label: t.idm.trans_6 },
  ];

  const processSteps = [
    { step: '01', title: t.idm.process_step_1, desc: locale === 'es' ? 'Registro y preparación de documentación' : 'Registration and documentation preparation' },
    { step: '02', title: t.idm.process_step_2, desc: locale === 'es' ? 'Evaluación de competencias técnicas' : 'Technical competency assessment' },
    { step: '03', title: t.idm.process_step_3, desc: locale === 'es' ? 'Evaluación de competencias transversales' : 'Transversal competency assessment' },
    { step: '04', title: t.idm.process_step_4, desc: locale === 'es' ? 'Entrevista con el tribunal' : 'Interview with the board' },
    { step: '05', title: t.idm.process_step_5, desc: locale === 'es' ? 'Emisión de certificado digital' : 'Digital certificate issuance' },
  ];

  const benefits = [
    { icon: <Globe className="w-10 h-10" />, title: t.idm.benefit_1_title, desc: t.idm.benefit_1_desc },
    { icon: <TrendingUp className="w-10 h-10" />, title: t.idm.benefit_2_title, desc: t.idm.benefit_2_desc },
    { icon: <Award className="w-10 h-10" />, title: t.idm.benefit_3_title, desc: t.idm.benefit_3_desc },
    { icon: <Users className="w-10 h-10" />, title: t.idm.benefit_4_title, desc: t.idm.benefit_4_desc },
  ];

  const faqs = [
    { q: t.idm.faq_1_q, a: t.idm.faq_1_a },
    { q: t.idm.faq_2_q, a: t.idm.faq_2_a },
    { q: t.idm.faq_3_q, a: t.idm.faq_3_a },
    { q: t.idm.faq_4_q, a: t.idm.faq_4_a },
    { q: t.idm.faq_5_q, a: t.idm.faq_5_a },
  ];

  const getResponsibilityGroup = (idx: number) => {
    if (idx < 5) return { color: 'bg-[#0066CC]', light: 'bg-[#0066CC]/10', text: 'text-[#0066CC]', border: 'border-[#0066CC]/20' };
    if (idx < 10) return { color: 'bg-[#004d99]', light: 'bg-[#004d99]/10', text: 'text-[#004d99]', border: 'border-[#004d99]/20' };
    return { color: 'bg-[#4A9EFF]', light: 'bg-[#4A9EFF]/10', text: 'text-[#4A9EFF]', border: 'border-[#4A9EFF]/20' };
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#004d99] via-[#0066CC] to-[#4A9EFF]" />
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="idm-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#idm-grid)" />
          </svg>
        </div>
        {/* Subtle overlay dots */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        {/* Floating decorative icon right */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden xl:flex absolute right-16 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 items-center justify-center"
        >
          <Database className="w-32 h-32 text-white/20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="hidden xl:block absolute left-20 bottom-20"
        >
          <Globe className="w-20 h-20 text-white/10" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-5 py-2 rounded-full bg-white/15 text-white text-sm font-semibold mb-8 border border-white/20 backdrop-blur-sm"
            >
              {t.idm.badge}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {t.idm.hero_title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-white/90">
              {t.idm.hero_subtitle}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-white/75 max-w-3xl mx-auto mb-12 leading-relaxed">
              {t.idm.hero_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLink('/certifications/information-delivery-manager/apply')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-white text-[#0066CC] px-10 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                <Award className="w-5 h-5" />
                {t.idm.hero_cta_primary}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 px-10 py-4 transition-all duration-300 hover:-translate-y-1">
                <Calendar className="w-5 h-5" />
                {t.idm.hero_cta_secondary}
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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.overview_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#333]">
              {t.idm.overview_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => {
              const icons = [
                <Globe className="w-14 h-14" key="g" />,
                <Shield className="w-14 h-14" key="s" />,
                <Award className="w-14 h-14" key="a" />,
              ];
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="group relative p-8 rounded-2xl bg-white border border-[#ddd] shadow-sm hover:-translate-y-[5px] hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-[100px] h-[100px] rounded-2xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {icons[i - 1]}
                  </div>
                  <h3 className="text-xl font-bold text-[#333] mb-1">
                    {(t.idm as any)[`overview_${i}_title`]}
                  </h3>
                  <p className="text-sm text-[#0066CC] font-semibold mb-3">
                    {(t.idm as any)[`overview_${i}_subtitle`]}
                  </p>
                  <p className="text-[#333]/80 leading-relaxed">
                    {(t.idm as any)[`overview_${i}_desc`]}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 3. DESCRIPCIÓN DETALLADA ===== */}
      <section className="py-24 bg-[#f0f4ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333] text-center mb-14">
              {t.idm.desc_title}
            </motion.h2>
            <div className="space-y-8 px-2 md:px-8">
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#0066CC]">
                <p className="text-lg text-[#333] leading-[1.8]">{t.idm.desc_p1}</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#0066CC]">
                <p className="text-lg text-[#333] leading-[1.8]">{t.idm.desc_p2}</p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#0066CC]">
                <p className="text-lg text-[#333] leading-[1.8]">{t.idm.desc_p3}</p>
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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.context_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333] mb-4">
              {t.idm.context_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-[#333]/70 max-w-2xl mx-auto">
              {t.idm.context_desc}
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.idm.context_1, desc: t.idm.context_1_desc, icon: <Building2 className="w-10 h-10" /> },
              { title: t.idm.context_2, desc: t.idm.context_2_desc, icon: <FileCheck className="w-10 h-10" /> },
              { title: t.idm.context_3, desc: t.idm.context_3_desc, icon: <Globe className="w-10 h-10" /> },
              { title: t.idm.context_4, desc: t.idm.context_4_desc, icon: <Briefcase className="w-10 h-10" /> },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-[#f0f4ff] border-l-4 border-[#0066CC] shadow-sm hover:bg-[#e4ebff] hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC] mb-4">
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#333] mb-1">{card.title}</h3>
                <p className="text-sm text-[#333]/70">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. RESPONSABILIDADES (Accordion) ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.responsibilities_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.responsibilities_title}
            </motion.h2>
          </motion.div>
          {/* Group labels */}
          <div className="space-y-4">
            {responsibilities.map((item, idx) => {
              const group = getResponsibilityGroup(idx);
              const isOpen = openResponsibility === idx;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`rounded-xl border ${group.border} bg-white overflow-hidden shadow-sm`}
                >
                  <button
                    onClick={() => setOpenResponsibility(isOpen ? null : idx)}
                    className={`w-full flex items-center gap-4 p-5 text-left hover:${group.light} transition-colors duration-300`}
                  >
                    <span className={`flex-shrink-0 w-10 h-10 rounded-xl ${group.color} text-white text-base font-bold flex items-center justify-center`}>
                      {idx + 1}
                    </span>
                    <span className="font-bold text-[#333] flex-1 text-base">{item.title}</span>
                    <span className={`w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center transition-all duration-300 ${isOpen ? `${group.color} border-transparent text-white` : 'text-[#333]/40'}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pl-[4.5rem] text-[#333]/80 leading-relaxed">
                          {item.desc}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.tech_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.tech_title}
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
                className="group p-6 rounded-xl bg-gradient-to-br from-[#f9fbff] to-[#f0f4ff] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-[#ddd]/50"
              >
                <div className="w-20 h-20 rounded-xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC] mb-5 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                  {comp.icon}
                </div>
                <h3 className="font-bold text-[#333] text-lg mb-2">{comp.title}</h3>
                <p className="text-sm text-[#333]/70 leading-relaxed">{comp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. COMPETENCIAS TRANSVERSALES ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.trans_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.trans_title}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {transversalItems.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-6 rounded-xl bg-white border border-[#ddd]/60 shadow-sm flex items-center gap-5 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-[70px] h-[70px] rounded-xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] shrink-0 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[#333] font-bold text-base">{item.label}</span>
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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.requirements_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.requirements_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Briefcase className="w-8 h-8" />, title: t.idm.req_exp_title, desc: t.idm.req_exp_desc, bgIcon: 'bg-[#0066CC]' },
              { icon: <GraduationCap className="w-8 h-8" />, title: t.idm.req_edu_title, desc: t.idm.req_edu_desc, bgIcon: 'bg-[#004d99]' },
              { icon: <Shield className="w-8 h-8" />, title: t.idm.req_tech_title, desc: t.idm.req_tech_desc, bgIcon: 'bg-[#4A9EFF]' },
            ].map((req, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-[#f9fbff] border border-[#ddd]/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${req.bgIcon} flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {req.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333] mb-3">{req.title}</h3>
                <p className="text-[#333]/70 leading-relaxed">{req.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 9. PROCESO (Timeline) ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.process_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.process_title}
            </motion.h2>
          </motion.div>
          <div className="relative">
            {/* Desktop horizontal line */}
            <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-1 bg-[#0066CC]/20" />
            {/* Mobile vertical line */}
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-1 bg-[#0066CC]/20" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6 relative">
              {processSteps.map((s, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0"
                >
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#0066CC] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#0066CC]/30 relative z-10">
                    {s.step}
                  </div>
                  <div className="md:mt-5 md:text-center">
                    <h3 className="font-bold text-[#333] text-base">{s.title}</h3>
                    <p className="text-sm text-[#333]/60 mt-1 max-w-[200px] mx-auto">{s.desc}</p>
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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.benefits_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.benefits_title}
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
                className="group p-8 rounded-2xl bg-gradient-to-br from-[#f9fbff] to-[#f0f4ff] border border-[#ddd]/40 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-[100px] h-[100px] mx-auto rounded-2xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC] mb-6 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#333] text-xl mb-3">{b.title}</h3>
                <p className="text-sm text-[#333]/70 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 11. OPORTUNIDADES DE CARRERA ===== */}
      <section className="py-24 bg-[#f0f4ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="w-20 h-20 mx-auto rounded-2xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC] mb-8">
              <TrendingUp className="w-10 h-10" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333] mb-6">
              {t.idm.career_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-[#333]/80 leading-relaxed">
              {t.idm.career_desc}
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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.faq_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.faq_title}
            </motion.h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={`rounded-xl border border-[#ddd]/60 overflow-hidden shadow-sm ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f9fbff]'}`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f0f4ff]/50 transition-colors duration-300"
                  >
                    <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC]">
                      <HelpCircle className="w-5 h-5" />
                    </span>
                    <span className="font-bold text-[#333] flex-1 pr-4">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? 'bg-[#0066CC] border-[#0066CC] text-white' : 'text-[#333]/40'}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6 pl-[4.5rem] text-[#333]/80 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== 13. COMPARATIVA ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.compare_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.compare_title}
            </motion.h2>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-[#ddd]/60 overflow-hidden shadow-sm"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#0066CC] text-white">
                    <th className="px-6 py-4 font-bold">{locale === 'es' ? 'Aspecto' : 'Aspect'}</th>
                    <th className="px-6 py-4 font-bold">{t.idm.compare_idm}</th>
                    <th className="px-6 py-4 font-bold">{t.idm.compare_bdm}</th>
                    <th className="px-6 py-4 font-bold">{t.idm.compare_bcm}</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: t.idm.compare_focus, values: [locale === 'es' ? 'Gestión de Información' : 'Information Management', locale === 'es' ? 'Diseño BIM' : 'BIM Design', locale === 'es' ? 'Construcción BIM' : 'BIM Construction'] },
                    { label: t.idm.compare_level, values: [locale === 'es' ? 'Intermedio' : 'Intermediate', locale === 'es' ? 'Intermedio' : 'Intermediate', locale === 'es' ? 'Avanzado' : 'Advanced'] },
                    { label: t.idm.compare_exp, values: ['3+ años', '3+ años', '5+ años'] },
                    { label: t.idm.compare_price, values: ['€350', '€350', '€450'] },
                  ].map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={`transition-colors hover:bg-[#f0f4ff]/50 border-b border-[#ddd]/30 ${rIdx % 2 === 1 ? 'bg-[#f9fbff]' : 'bg-white'}`}
                    >
                      <td className="px-6 py-4 font-bold text-[#333]">{row.label}</td>
                      {row.values.map((v, cIdx) => (
                        <td
                          key={cIdx}
                          className={`px-6 py-4 text-[#333]/80 ${cIdx === 0 ? 'bg-[#0066CC]/5 text-[#0066CC] font-semibold' : ''}`}
                        >
                          <div className="flex items-center gap-2">
                            {cIdx === 0 && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                            {v}
                          </div>
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
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {t.idm.testimonials_badge}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {t.idm.testimonials_title}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Carlos Martínez', role: locale === 'es' ? 'Jefe de Proyectos BIM' : 'BIM Project Manager', company: 'Ingeconsult SA', quote: locale === 'es' ? 'La certificación IDM me abrió puertas en proyectos internacionales. Es un reconocimiento que realmente marca la diferencia.' : 'The IDM certification opened doors for me on international projects. It is a recognition that truly makes a difference.' },
              { name: 'Ana Gómez', role: locale === 'es' ? 'Directora de Innovación' : 'Innovation Director', company: 'Construtech', quote: locale === 'es' ? 'Como directora, valorar que mi equipo cuente con certificaciones AECMI nos da una ventaja competitiva real en licitaciones.' : 'As a director, valuing that my team has AECMI certifications gives us a real competitive advantage in tenders.' },
              { name: 'James Wilson', role: locale === 'es' ? 'Consultor BIM Senior' : 'Senior BIM Consultant', company: 'DigitalBuild UK', quote: locale === 'es' ? 'El nivel de exigencia de esta certificación la convierte en un estándar de referencia en la industria global.' : 'The demanding level of this certification makes it a reference standard in the global industry.' },
            ].map((timo, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white border border-[#ddd]/40 relative border-l-4 border-l-[#0066CC] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, sIdx) => (
                    <Star key={sIdx} className="w-4 h-4 fill-[#0066CC] text-[#0066CC]" />
                  ))}
                </div>
                <p className="text-[#333]/80 text-lg italic leading-relaxed mb-6">&ldquo;{timo.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4A9EFF] flex items-center justify-center text-white font-bold shadow-md">
                    {timo.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-[#333]">{timo.name}</div>
                    <div className="text-sm text-[#333]/50">{timo.role} — {timo.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 15. CTA FINAL ===== */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0066CC] via-[#0055aa] to-[#004d99]">
        {/* Animated background subtle */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        {/* Floating decorative icons */}
        <motion.div animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:block absolute top-16 left-16 text-white/10">
          <Shield className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:block absolute bottom-16 right-16 text-white/10">
          <Zap className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="hidden lg:block absolute top-1/2 right-1/4 text-white/10">
          <Award className="w-16 h-16" />
        </motion.div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeInUp}
              className="inline-block px-5 py-2 rounded-full bg-white/15 text-white text-sm font-medium mb-8 border border-white/20 backdrop-blur-sm"
            >
              {locale === 'es' ? 'Certificación profesional' : 'Professional certification'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t.idm.final_cta_title}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.idm.final_cta_desc}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLink('/certifications/information-delivery-manager/apply')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-white text-[#0066CC] px-10 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                {t.idm.final_cta_primary} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 px-10 py-4 transition-all duration-300 hover:-translate-y-1">
                {t.idm.final_cta_secondary}
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-12">
              <Link href={getLink('/certifications')} className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-2">
                <ArrowRight className="w-4 h-4 rotate-180" /> {t.idm.back_to_certs}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== RELACIONADOS ===== */}
      <section className="py-16 bg-[#f9fbff] border-t border-[#ddd]/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.h3 variants={fadeInUp} className="text-2xl font-bold text-[#333] mb-2">
              {locale === 'es' ? 'Explora otras certificaciones' : 'Explore other certifications'}
            </motion.h3>
            <motion.p variants={fadeInUp} className="text-[#333]/60">
              {locale === 'es' ? 'Descubre el programa que mejor se adapta a tu perfil profesional' : 'Discover the program that best fits your professional profile'}
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
                href={getLink('/certifications/bim-construction-manager')}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-[#ddd]/40 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-l-4 border-l-[#FF6B35]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35]">
                  <HardHat className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#333]">BIM Construction Manager</div>
                  <div className="text-sm text-[#333]/50">{locale === 'es' ? 'Gestión de construcción BIM' : 'BIM construction management'}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#333]/30 ml-auto" />
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
                className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-[#ddd]/40 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border-l-4 border-l-[#00AA88]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00AA88]/10 flex items-center justify-center text-[#00AA88]">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#333]">BIM Design Manager</div>
                  <div className="text-sm text-[#333]/50">{locale === 'es' ? 'Coordinación de diseño BIM' : 'BIM design coordination'}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#333]/30 ml-auto" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
