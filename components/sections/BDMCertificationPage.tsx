'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, ArrowUpRight, Globe, Shield, Briefcase, Users,
  GraduationCap, FileCheck, Award, Building2, BarChart3,
  LayoutTemplate, ClipboardCheck, BadgeCheck, Layers, Box, FolderOpen, Cog, Plus,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';
import ResponsibilitiesPDFSection from './ResponsibilitiesPDFSection';
import {
  reveal, BLUEPRINT, RevealWords, Magnetic, Marquee, Eyebrow, ScrollWords, useDrawLine,
} from '@/components/ui/motion-kit';

interface Props {
  locale: 'es' | 'en' | 'pt';
}

export default function BDMCertificationPage({ locale }: Props) {
  // Años de experiencia de la tabla comparativa (la unidad cambia por idioma).
  const expYears = (n: number) =>
    locale === 'es' ? n+'+ años' : locale === 'pt' ? n+'+ anos' : n+'+ years';
  const L = (es: string, en: string, pt: string) =>
    locale === 'es' ? es : locale === 'en' ? en : pt;
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

  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bigY = useTransform(heroScroll, [0, 1], [0, reduce ? 0 : -140]);
  const heroFade = useTransform(heroScroll, [0, 0.8], [1, reduce ? 1 : 0.15]);

  const procRef = useRef<HTMLDivElement>(null);
  const procLine = useDrawLine(procRef);

  const spot = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const bdm = t.bdm as unknown as Record<string, string>;
  const overview = [1, 2, 3].map((i) => ({
    title: bdm[`overview_${i}_title`],
    sub: bdm[`overview_${i}_subtitle`],
    desc: bdm[`overview_${i}_desc`],
  }));
  const overviewIcons = [Globe, Shield, Award];

  const requirements = [
    { icon: <Briefcase className="h-7 w-7" />, title: t.bdm.req_exp_title, desc: t.bdm.req_exp_desc },
    { icon: <GraduationCap className="h-7 w-7" />, title: t.bdm.req_edu_title, desc: t.bdm.req_edu_desc },
    { icon: <Shield className="h-7 w-7" />, title: t.bdm.req_tech_title, desc: t.bdm.req_tech_desc },
  ];

  const compareRows = [
    { label: t.bdm.compare_focus, values: [L('Gestión de Información', 'Information Management', 'Gestão de Informação'), L('Diseño BIM', 'BIM Design', 'Projeto BIM'), L('Construcción BIM', 'BIM Construction', 'Construção BIM')] },
    { label: t.bdm.compare_level, values: [L('Avanzado', 'Advanced', 'Avançado'), L('Intermedio', 'Intermediate', 'Intermediário'), L('Avanzado', 'Advanced', 'Avançado')] },
    { label: t.bdm.compare_exp, values: [expYears(3), expYears(3), expYears(5)] },
    { label: t.bdm.compare_price, values: ['€350', '€350', '€450'] },
  ];

  const testimonials = [
    { name: 'Laura Fernández', role: L('Coordinadora BIM', 'BIM Coordinator', 'Coordenadora BIM'), company: 'Arquitech Studio', quote: L('La certificación BDM me dio las herramientas para liderar la coordinación de diseño en proyectos internacionales con total confianza.', 'The BDM certification gave me the tools to lead design coordination in international projects with complete confidence.', 'A certificação BDM me deu as ferramentas para liderar a coordenação de projeto em projetos internacionais com total confiança.') },
    { name: 'Miguel Ángel Ruiz', role: L('Jefe de Proyecto de Diseño', 'Design Project Manager', 'Gerente de Projeto de Design'), company: 'Ingeco BIM', quote: L('Como jefe de proyecto, contar con la certificación BDM de AECOMI me permite garantizar calidad en cada entrega de modelos.', 'As a project manager, having the AECOMI BDM certification allows me to guarantee quality in every model delivery.', 'Como gerente de projeto, ter a certificação BDM da AECOMI me permite garantir qualidade em cada entrega de modelos.') },
    { name: 'Sarah Johnson', role: 'BIM Manager', company: 'DesignBuild NYC', quote: L('El enfoque práctico de esta certificación la convierte en un estándar indispensable para cualquier coordinador de diseño BIM.', 'The practical focus of this certification makes it an essential standard for any BIM design coordinator.', 'A abordagem prática desta certificação a torna um padrão indispensável para qualquer coordenador de projeto BIM.') },
  ];

  const related = [
    { href: getLink('/certifications/information-delivery-manager'), acronym: 'IDM', color: '#0066CC', title: 'Information Delivery Manager', desc: L('Gestión estratégica de la información BIM', 'Strategic BIM information management', 'Gestão estratégica da informação BIM') },
    { href: getLink('/certifications/bim-construction-manager'), acronym: 'BCM', color: '#FF6B35', title: 'BIM Construction Manager', desc: L('Gestión de construcción BIM', 'BIM construction management', 'Gestão de construção BIM') },
  ];

  const applyHref = getLink('/certifications/bim-design-manager/apply');

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ 1. HERO · nodos de datos ═══════════════════════════════ */}
      <section ref={heroRef} className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <motion.span
          style={{ y: bigY, WebkitTextStroke: '1.5px #2CD3AF', color: 'transparent' }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[300px] font-semibold leading-none tracking-tighter lg:block xl:text-[400px]"
          aria-hidden
        >
          BDM
        </motion.span>

        {/* Red de entrega de información (CDE) */}
        <svg className="pointer-events-none absolute right-0 top-0 hidden h-full w-[55%] lg:block" viewBox="0 0 600 700" fill="none" aria-hidden>
          {[
            'M120 160 L300 260', 'M300 260 L480 180', 'M300 260 L260 450', 'M260 450 L450 520', 'M120 160 L90 360', 'M90 360 L260 450',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#2CD3AF"
              strokeOpacity="0.35"
              strokeWidth="1.2"
              strokeDasharray="5 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.6 + i * 0.15 }}
            />
          ))}
          {[[120, 160], [300, 260], [480, 180], [260, 450], [450, 520], [90, 360]].map(([x, y], i) => (
            <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', delay: 0.5 + i * 0.12 }} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle cx={x} cy={y} r="18" fill="#00AA88" fillOpacity="0.25" />
              <motion.circle
                cx={x} cy={y} r="7" fill="#2CD3AF"
                animate={reduce ? undefined : { r: [7, 9, 7] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          ))}
        </svg>

        <motion.div style={{ opacity: heroFade }} className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow dark>{t.bdm.badge}</Eyebrow>
          </motion.div>
          <h1 className="mt-8 max-w-3xl font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[84px]">
            <RevealWords text={t.bdm.hero_title} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-6 max-w-2xl font-display text-xl text-[#2CD3AF] sm:text-2xl">
            {t.bdm.hero_subtitle}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            {t.bdm.hero_desc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link href={applyHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-orange px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-[#f08430]">
                {t.bdm.hero_cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/[0.05] hover:text-white">
              {t.bdm.hero_cta_secondary}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Marquee items={[t.bdm.hero_title, 'ISO 19650', 'CDE', 'BIM', 'AECOMI']} />

      {/* ═══ 2. OVERVIEW · tríptico ═════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.overview_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.overview_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pmi-dark/10 md:grid-cols-3">
            {overview.map((o, i) => {
              const Icon = overviewIcons[i];
              return (
                <motion.div
                  key={i}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative bg-white p-8 transition-colors duration-500 hover:bg-[#0A5A4C] lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-10 w-10 text-[#00AA88] transition-colors duration-500 group-hover:text-[#2CD3AF]" />
                    <span className="font-display text-6xl font-semibold tabular-nums text-pmi-dark/[0.07] transition-colors duration-500 group-hover:text-white/15">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-semibold text-pmi-dark transition-colors duration-500 group-hover:text-white">{o.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#00AA88] transition-colors duration-500 group-hover:text-[#2CD3AF]">{o.sub}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-pmi-dark/65 transition-colors duration-500 group-hover:text-white/70">{o.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 3. DESCRIPCIÓN · título fijo + párrafos ════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>BDM</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{t.bdm.desc_title}</h2>
            </div>
          </motion.div>
          <div className="space-y-10 lg:col-span-7">
            {[t.bdm.desc_p1, t.bdm.desc_p2, t.bdm.desc_p3].map((p, i) => (
              <motion.div key={i} {...reveal} transition={{ duration: 0.55, delay: i * 0.06 }} className="relative pl-8">
                <motion.span
                  className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-[#00AA88]"
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                />
                <p className="text-lg leading-[1.8] text-pmi-dark/75">{p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. CONTEXTO INTERNACIONAL ══════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#070B16] py-24 text-white md:py-32">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow dark>{t.bdm.context_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{t.bdm.context_title}</h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:col-span-5 md:justify-self-end">{t.bdm.context_desc}</p>
          </motion.div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              { title: t.bdm.context_1, desc: t.bdm.context_1_desc, icon: <Building2 className="h-8 w-8" /> },
              { title: t.bdm.context_2, desc: t.bdm.context_2_desc, icon: <Globe className="h-8 w-8" /> },
            ].map((c, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                onMouseMove={spot}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(44,211,175,0.18), transparent 65%)' }} aria-hidden />
                <div className="relative">
                  <span className="text-[#2CD3AF]">{c.icon}</span>
                  <h3 className="mt-8 font-display text-3xl font-semibold">{c.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/55">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 5. RESPONSABILIDADES (PDF) ═════════════════════════════ */}
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

      {/* ═══ 6. COMPETENCIAS TÉCNICAS · cuadrícula con foco ═════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.tech_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.tech_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pmi-dark/10 sm:grid-cols-2 lg:grid-cols-3">
            {techCompetencies.map((c, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                onMouseMove={spot}
                className="group relative overflow-hidden bg-white p-8"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(0,170,136,0.10), transparent 65%)' }} aria-hidden />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[#00AA88] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 [&>svg]:h-7 [&>svg]:w-7">{c.icon}</span>
                    <span className="font-display text-sm font-semibold tabular-nums text-pmi-dark/25">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-8 font-display text-lg font-semibold leading-snug text-pmi-dark">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pmi-dark/60">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7. COMPETENCIAS TRANSVERSALES · dos grupos ═════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.trans_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.trans_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {transversalGroups.map((group, g) => (
              <motion.div
                key={g}
                {...reveal}
                transition={{ duration: 0.55, delay: g * 0.1 }}
                className={`rounded-3xl p-8 lg:p-10 ${g === 0 ? 'bg-pmi-dark text-white' : 'bg-white text-pmi-dark'}`}
              >
                <h3 className={`border-b pb-5 font-display text-2xl font-semibold ${g === 0 ? 'border-white/15' : 'border-pmi-dark/10'}`}>{group.label}</h3>
                <ul className="mt-6 space-y-4">
                  {group.items.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                      className="flex items-center gap-3 text-[16px]"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#2CD3AF]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <circle cx="12" cy="12" r="10" className="opacity-30" />
                        <motion.path d="M7 12.5l3.2 3.2L17 9" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }} />
                      </svg>
                      <span className={g === 0 ? 'text-white/85' : 'text-pmi-dark/80'}>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. REQUISITOS · lista de verificación ══════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.requirements_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.requirements_title}</h2>
          </motion.div>
          <ul className="mt-14 border-t border-pmi-dark/15">
            {requirements.map((r, i) => (
              <motion.li key={i} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }} className="grid items-center gap-5 border-b border-pmi-dark/15 py-8 md:grid-cols-12 md:py-10">
                <span className="flex items-center gap-4 md:col-span-1">
                  <svg viewBox="0 0 24 24" className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10" className="opacity-25" />
                    <motion.path d="M7 12.5l3.2 3.2L17 9" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }} />
                  </svg>
                </span>
                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#00AA88] text-white">{r.icon}</span>
                  <h3 className="font-display text-xl font-semibold text-pmi-dark">{r.title}</h3>
                </div>
                <p className="text-[15px] leading-relaxed text-pmi-dark/65 md:col-span-7">{r.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 9. PROCESO · línea que se dibuja ═══════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.process_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.process_title}</h2>
          </motion.div>
          <div ref={procRef} className="relative mt-16">
            <div className="absolute left-5 top-0 h-full w-px bg-pmi-dark/10 md:left-0 md:right-0 md:top-6 md:h-px md:w-full" aria-hidden />
            <motion.div style={{ scaleX: reduce ? 1 : procLine, scaleY: 1 }} className="absolute left-0 right-0 top-6 hidden h-0.5 origin-left bg-pmi-orange md:block" aria-hidden />
            <motion.div style={{ scaleY: reduce ? 1 : procLine }} className="absolute left-[19px] top-0 h-full w-0.5 origin-top bg-pmi-orange md:hidden" aria-hidden />
            <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
              {processSteps.map((s, i) => (
                <motion.li key={i} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex items-start gap-5 md:flex-col md:gap-0">
                  <motion.span
                    initial={{ scale: 0.4, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.12 }}
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pmi-dark font-display text-sm font-semibold text-white ring-4 ring-pmi-cream md:h-12 md:w-12"
                  >
                    {s.step}
                  </motion.span>
                  <div className="md:mt-6">
                    <h3 className="font-display text-lg font-semibold text-pmi-dark">{s.title}</h3>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ 10. BENEFICIOS ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0A5A4C] py-24 text-white md:py-32">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow dark>{t.bdm.benefits_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{t.bdm.benefits_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={reduce ? undefined : { y: -6 }}
                className="flex gap-6 rounded-3xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm lg:p-10"
              >
                <span className="font-display text-5xl font-semibold leading-none tabular-nums text-white/25">0{i + 1}</span>
                <div>
                  <span className="text-[#2CD3AF] [&>svg]:h-7 [&>svg]:w-7">{b.icon}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/70">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 11. CARRERA · manifiesto ═══════════════════════════════ */}
      <section className="bg-white py-24 md:py-36">
        <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <Eyebrow>{t.bdm.career_title}</Eyebrow>
          </motion.div>
          <ScrollWords text={t.bdm.career_desc} className="mt-10 font-display text-3xl font-medium leading-[1.25] tracking-[-0.015em] text-pmi-dark sm:text-4xl md:text-[44px]" />
        </div>
      </section>

      {/* ═══ 12. COMPARATIVA ════════════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.compare_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.compare_title}</h2>
          </motion.div>
          <motion.div {...reveal} className="mt-14 overflow-x-auto rounded-3xl border border-pmi-dark/10 bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-pmi-dark/45">{L('Aspecto', 'Aspect', 'Aspecto')}</th>
                  <th className="px-6 py-5 font-display text-lg font-semibold text-pmi-dark">{t.bdm.compare_idm}</th>
                  <th className="bg-[#00AA88] px-6 py-5 font-display text-lg font-semibold text-white">{t.bdm.compare_bdm}</th>
                  <th className="px-6 py-5 font-display text-lg font-semibold text-pmi-dark">{t.bdm.compare_bcm}</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, r) => (
                  <tr key={r} className="border-t border-pmi-dark/10 transition-colors hover:bg-pmi-cream/60">
                    <td className="px-6 py-4 text-sm font-semibold text-pmi-dark/60">{row.label}</td>
                    {row.values.map((v, c) => (
                      <td key={c} className={`px-6 py-4 text-[15px] ${c === 1 ? 'bg-[#00AA88]/[0.07] font-semibold text-[#0A5A4C]' : 'text-pmi-dark/75'}`}>
                        <span className="flex items-center gap-2">
                          {c === 1 && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
                          {v}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ═══ 13. TESTIMONIOS ════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bdm.testimonials_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bdm.testimonials_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <motion.figure
                key={i}
                {...reveal}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`flex flex-col justify-between rounded-3xl bg-pmi-cream p-8 ${i === 1 ? 'md:translate-y-8' : ''}`}
              >
                <span className="font-display text-7xl leading-none text-[#00AA88]" aria-hidden>“</span>
                <blockquote className="-mt-4 text-[17px] leading-relaxed text-pmi-dark/80">{tm.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pmi-dark font-display font-semibold text-white">{tm.name.charAt(0)}</span>
                  <span>
                    <span className="block font-display font-semibold text-pmi-dark">{tm.name}</span>
                    <span className="block text-sm text-pmi-dark/55">{tm.role} — {tm.company}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 14. FAQ ════════════════════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{t.bdm.faq_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{t.bdm.faq_title}</h2>
            </div>
          </motion.div>
          <ul className="border-t border-pmi-dark/15 lg:col-span-8">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <li key={idx} className="border-b border-pmi-dark/15">
                  <button onClick={() => setOpenFaq(isOpen ? null : idx)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                    <span className="font-display text-lg font-semibold text-pmi-dark">{faq.q}</span>
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pmi-dark/20 transition-all duration-300 ${isOpen ? 'rotate-45 bg-pmi-dark text-white' : 'text-pmi-dark'}`}>
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-pmi-dark/65">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ═══ 15. CTA FINAL ══════════════════════════════════════════ */}
      <section className="bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>{L('Certificación profesional', 'Professional certification', 'Certificação profissional')}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">{t.bdm.final_cta_title}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{t.bdm.final_cta_desc}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Link href={applyHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black">
                {t.bdm.final_cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold transition-colors hover:bg-pmi-dark/10">
                {t.bdm.final_cta_secondary}
              </Link>
            </div>
          </motion.div>
          <Link href={getLink('/certifications')} className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-pmi-dark/70 transition-colors hover:text-pmi-dark">
            <ArrowRight className="h-4 w-4 rotate-180" /> {t.bdm.back_to_certs}
          </Link>
        </div>
      </section>

      {/* ═══ RELACIONADAS ═══════════════════════════════════════════ */}
      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <h3 className="font-display text-3xl font-semibold tracking-tight text-pmi-dark">{L('Explora otras certificaciones', 'Explore other certifications', 'Explore outras certificações')}</h3>
            <p className="mt-3 text-pmi-dark/60">{L('Descubre el programa que mejor se adapta a tu perfil profesional', 'Discover the program that best fits your professional profile', 'Descubra o programa que melhor se adapta ao seu perfil profissional')}</p>
          </motion.div>
          <ul className="mt-10 border-t border-pmi-dark/15">
            {related.map((r) => (
              <li key={r.acronym} className="border-b border-pmi-dark/15">
                <Link href={r.href} className="group flex items-center gap-5 py-6 md:gap-8">
                  <span className="w-[3.2ch] font-display text-4xl font-semibold tracking-tighter md:text-6xl" style={{ color: r.color }}>{r.acronym}</span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-semibold text-pmi-dark md:text-2xl">{r.title}</span>
                    <span className="block text-sm text-pmi-dark/55">{r.desc}</span>
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-pmi-dark/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-pmi-dark" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
