'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, ArrowUpRight, Globe, Shield, Briefcase, Users,
  GraduationCap, FileCheck, Award, Building2, BarChart3, LayoutTemplate,
  ClipboardCheck, HardHat, Layers, Box, FolderOpen, Cog, Truck, Plus,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';
import ResponsibilitiesPDFSection from './ResponsibilitiesPDFSection';
import {
  reveal, BLUEPRINT, RevealWords, Magnetic, Marquee, Eyebrow, ScrollWords, useDrawLine,
} from '@/components/ui/motion-kit';

interface Props {
  locale: 'es' | 'en' | 'pt';
}

export default function BCMCertificationPage({ locale }: Props) {
  // Años de experiencia de la tabla comparativa (la unidad cambia por idioma).
  const expYears = (n: number) =>
    locale === 'es' ? n+'+ años' : locale === 'pt' ? n+'+ anos' : n+'+ years';
  const L = (es: string, en: string, pt: string) =>
    locale === 'es' ? es : locale === 'en' ? en : pt;
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
    { step: '01', title: t.bcm.process_step_1, desc: locale === 'es' ? 'Registro y preparación de documentación' : locale === 'pt' ? 'Registro e preparação de documentação' : 'Registration and documentation preparation' },
    { step: '02', title: t.bcm.process_step_2, desc: locale === 'es' ? 'Evaluación de competencias técnicas' : locale === 'pt' ? 'Avaliação de competências técnicas' : 'Technical competency assessment' },
    { step: '03', title: t.bcm.process_step_3, desc: locale === 'es' ? 'Evaluación de competencias transversales' : locale === 'pt' ? 'Avaliação de competências transversais' : 'Transversal competency assessment' },
    { step: '04', title: t.bcm.process_step_4, desc: locale === 'es' ? 'Entrevista con el tribunal' : locale === 'pt' ? 'Entrevista com a banca' : 'Interview with the board' },
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

  const bcm = t.bcm as unknown as Record<string, string>;
  const overview = [1, 2, 3].map((i) => ({
    title: bcm[`overview_${i}_title`],
    sub: bcm[`overview_${i}_subtitle`],
    desc: bcm[`overview_${i}_desc`],
  }));
  const overviewIcons = [Globe, Shield, Award];

  const requirements = [
    { icon: <Briefcase className="h-7 w-7" />, title: t.bcm.req_exp_title, desc: t.bcm.req_exp_desc },
    { icon: <GraduationCap className="h-7 w-7" />, title: t.bcm.req_edu_title, desc: t.bcm.req_edu_desc },
    { icon: <Shield className="h-7 w-7" />, title: t.bcm.req_tech_title, desc: t.bcm.req_tech_desc },
  ];

  const compareRows = [
    { label: t.bcm.compare_focus, values: [L('Gestión de Información', 'Information Management', 'Gestão de Informação'), L('Diseño BIM', 'BIM Design', 'Projeto BIM'), L('Construcción BIM', 'BIM Construction', 'Construção BIM')] },
    { label: t.bcm.compare_level, values: [L('Intermedio', 'Intermediate', 'Intermediário'), L('Intermedio', 'Intermediate', 'Intermediário'), L('Avanzado', 'Advanced', 'Avançado')] },
    { label: t.bcm.compare_exp, values: [expYears(3), expYears(3), expYears(5)] },
    { label: t.bcm.compare_price, values: ['€350', '€350', '€450'] },
  ];

  const testimonials = [
    { name: 'Roberto Sánchez', role: L('Jefe de Obra BIM', 'BIM Site Manager', 'Gerente de Obra BIM'), company: 'Construcciones del Norte', quote: L('La certificación BCM me permitió liderar la coordinación BIM en obra con total autoridad. Los clientes confían más en un perfil certificado.', 'The BCM certification allowed me to lead BIM coordination on site with full authority. Clients trust a certified profile more.', 'A certificação BCM me permitiu liderar a coordenação BIM em obra com total autoridade. Os clientes confiam mais em um perfil certificado.') },
    { name: 'María José López', role: L('Directora de Construcción', 'Construction Director', 'Diretora de Construção'), company: 'Edifica Proyectos', quote: L('Como directora, valorar que mi equipo tenga certificaciones BCM nos da una ventaja real en licitaciones de obra pública.', 'As a director, having BCM certified team members gives us a real advantage in public construction tenders.', 'Como diretora, o fato de minha equipe ter certificações BCM nos dá uma vantagem real em licitações de obra pública.') },
    { name: 'David Chen', role: L('Coordinador BIM de Obra', 'Site BIM Coordinator', 'Coordenador BIM de Obra'), company: 'GlobalBuild Asia', quote: L('El nivel práctico de esta certificación la convierte en imprescindible para cualquier profesional que gestione BIM en obra.', 'The practical level of this certification makes it essential for any professional managing BIM on site.', 'O nível prático desta certificação a torna indispensável para qualquer profissional que gerencie BIM em obra.') },
  ];

  const related = [
    { href: getLink('/certifications/information-delivery-manager'), acronym: 'IDM', color: '#0066CC', title: 'Information Delivery Manager', desc: L('Gestión estratégica de información', 'Strategic information management', 'Gestão estratégica de informação') },
    { href: getLink('/certifications/bim-design-manager'), acronym: 'BDM', color: '#00AA88', title: 'BIM Design Manager', desc: L('Coordinación de diseño BIM', 'BIM design coordination', 'Coordenação de projeto BIM') },
  ];

  const applyHref = getLink('/certifications/bim-construction-manager/apply');

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ 1. HERO · nodos de datos ═══════════════════════════════ */}
      <section ref={heroRef} className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <motion.span
          style={{ y: bigY, WebkitTextStroke: '1.5px #FF9A6C', color: 'transparent' }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 0.4, x: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[300px] font-semibold leading-none tracking-tighter lg:block xl:text-[400px]"
          aria-hidden
        >
          BCM
        </motion.span>

        {/* Red de entrega de información (CDE) */}
        <svg className="pointer-events-none absolute right-0 top-0 hidden h-full w-[55%] lg:block" viewBox="0 0 600 700" fill="none" aria-hidden>
          {[
            'M120 160 L300 260', 'M300 260 L480 180', 'M300 260 L260 450', 'M260 450 L450 520', 'M120 160 L90 360', 'M90 360 L260 450',
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#FF9A6C"
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
              <circle cx={x} cy={y} r="18" fill="#FF6B35" fillOpacity="0.25" />
              <motion.circle
                cx={x} cy={y} r="7" fill="#FF9A6C"
                animate={reduce ? undefined : { r: [7, 9, 7] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
            </motion.g>
          ))}
        </svg>

        <motion.div style={{ opacity: heroFade }} className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow dark>{t.bcm.badge}</Eyebrow>
          </motion.div>
          <h1 className="mt-8 max-w-3xl font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[84px]">
            <RevealWords text={t.bcm.hero_title} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-6 max-w-2xl font-display text-xl text-[#FF9A6C] sm:text-2xl">
            {t.bcm.hero_subtitle}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            {t.bcm.hero_desc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <Link href={applyHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-orange px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-[#f08430]">
                {t.bcm.hero_cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/[0.05] hover:text-white">
              {t.bcm.hero_cta_secondary}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Marquee items={[t.bcm.hero_title, 'ISO 19650', 'CDE', 'BIM', 'AECOMI']} />

      {/* ═══ 2. OVERVIEW · tríptico ═════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bcm.overview_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.overview_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pmi-dark/10 md:grid-cols-3">
            {overview.map((o, i) => {
              const Icon = overviewIcons[i];
              return (
                <motion.div
                  key={i}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative bg-white p-8 transition-colors duration-500 hover:bg-[#8A3414] lg:p-10"
                >
                  <div className="flex items-start justify-between">
                    <Icon className="h-10 w-10 text-[#C2410C] transition-colors duration-500 group-hover:text-[#FF9A6C]" />
                    <span className="font-display text-6xl font-semibold tabular-nums text-pmi-dark/[0.07] transition-colors duration-500 group-hover:text-white/15">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 font-display text-2xl font-semibold text-pmi-dark transition-colors duration-500 group-hover:text-white">{o.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-[#C2410C] transition-colors duration-500 group-hover:text-[#FF9A6C]">{o.sub}</p>
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
              <Eyebrow>BCM</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{t.bcm.desc_title}</h2>
            </div>
          </motion.div>
          <div className="space-y-10 lg:col-span-7">
            {[t.bcm.desc_p1, t.bcm.desc_p2, t.bcm.desc_p3].map((p, i) => (
              <motion.div key={i} {...reveal} transition={{ duration: 0.55, delay: i * 0.06 }} className="relative pl-8">
                <motion.span
                  className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-[#FF6B35]"
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
              <Eyebrow dark>{t.bcm.context_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{t.bcm.context_title}</h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/55 md:col-span-5 md:justify-self-end">{t.bcm.context_desc}</p>
          </motion.div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              { title: t.bcm.context_1, desc: t.bcm.context_1_desc, icon: <Building2 className="h-8 w-8" /> },
              { title: t.bcm.context_2, desc: t.bcm.context_2_desc, icon: <Globe className="h-8 w-8" /> },
            ].map((c, i) => (
              <motion.div
                key={i}
                {...reveal}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                onMouseMove={spot}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 lg:p-10"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(255,154,108,0.18), transparent 65%)' }} aria-hidden />
                <div className="relative">
                  <span className="text-[#FF9A6C]">{c.icon}</span>
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
        certificationName={t.bcm.hero_subtitle ?? 'BIM Construction Manager'}
        certificationCode="BCM"
        accentColorRgb={[255, 107, 53]}
        responsibilities={responsibilities}
        locale={locale}
        badgeLabel={t.bcm.responsibilities_badge}
        sectionTitle={t.bcm.responsibilities_title}
        bgClass="bg-slate-50"
      />

      {/* ═══ 6. COMPETENCIAS TÉCNICAS · cuadrícula con foco ═════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bcm.tech_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.tech_title}</h2>
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
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(255,107,53,0.10), transparent 65%)' }} aria-hidden />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[#C2410C] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 [&>svg]:h-7 [&>svg]:w-7">{c.icon}</span>
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

      {/* ═══ 7. COMPETENCIAS TRANSVERSALES · píldoras ═══════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bcm.trans_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.trans_title}</h2>
          </motion.div>
          <ul className="mt-14 flex flex-wrap gap-3">
            {transversalItems.map((label, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 240, damping: 18, delay: i * 0.08 }}
                whileHover={reduce ? undefined : { y: -6, scale: 1.04 }}
                className="flex items-center gap-3 rounded-full border border-pmi-dark/15 bg-white py-3 pl-3 pr-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-pmi-dark font-display text-sm font-semibold text-white">0{i + 1}</span>
                <span className="font-display text-base font-semibold text-pmi-dark md:text-lg">{label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 8. REQUISITOS · lista de verificación ══════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bcm.requirements_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.requirements_title}</h2>
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
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF6B35] text-white">{r.icon}</span>
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
            <Eyebrow>{t.bcm.process_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.process_title}</h2>
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
                    <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-pmi-dark/60">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ 10. BENEFICIOS ═════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#8A3414] py-24 text-white md:py-32">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow dark>{t.bcm.benefits_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{t.bcm.benefits_title}</h2>
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
                  <span className="text-[#FF9A6C] [&>svg]:h-7 [&>svg]:w-7">{b.icon}</span>
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
            <Eyebrow>{t.bcm.career_title}</Eyebrow>
          </motion.div>
          <ScrollWords text={t.bcm.career_desc} className="mt-10 font-display text-3xl font-medium leading-[1.25] tracking-[-0.015em] text-pmi-dark sm:text-4xl md:text-[44px]" />
        </div>
      </section>

      {/* ═══ 12. COMPARATIVA ════════════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{t.bcm.compare_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.compare_title}</h2>
          </motion.div>
          <motion.div {...reveal} className="mt-14 overflow-x-auto rounded-3xl border border-pmi-dark/10 bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr>
                  <th className="px-6 py-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-pmi-dark/45">{L('Aspecto', 'Aspect', 'Aspecto')}</th>
                  <th className="px-6 py-5 font-display text-lg font-semibold text-pmi-dark">{t.bcm.compare_idm}</th>
                  <th className="px-6 py-5 font-display text-lg font-semibold text-pmi-dark">{t.bcm.compare_bdm}</th>
                  <th className="bg-[#FF6B35] px-6 py-5 font-display text-lg font-semibold text-pmi-dark">{t.bcm.compare_bcm}</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, r) => (
                  <tr key={r} className="border-t border-pmi-dark/10 transition-colors hover:bg-pmi-cream/60">
                    <td className="px-6 py-4 text-sm font-semibold text-pmi-dark/60">{row.label}</td>
                    {row.values.map((v, c) => (
                      <td key={c} className={`px-6 py-4 text-[15px] ${c === 2 ? 'bg-[#FF6B35]/[0.09] font-semibold text-[#8A3414]' : 'text-pmi-dark/75'}`}>
                        <span className="flex items-center gap-2">
                          {c === 2 && <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />}
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
            <Eyebrow>{t.bcm.testimonials_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{t.bcm.testimonials_title}</h2>
          </motion.div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm, i) => (
              <motion.figure
                key={i}
                {...reveal}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className={`flex flex-col justify-between rounded-3xl bg-pmi-cream p-8 ${i === 1 ? 'md:translate-y-8' : ''}`}
              >
                <span className="font-display text-7xl leading-none text-[#C2410C]" aria-hidden>“</span>
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
              <Eyebrow>{t.bcm.faq_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{t.bcm.faq_title}</h2>
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
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">{t.bcm.final_cta_title}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{t.bcm.final_cta_desc}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Link href={applyHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black">
                {t.bcm.final_cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold transition-colors hover:bg-pmi-dark/10">
                {t.bcm.final_cta_secondary}
              </Link>
            </div>
          </motion.div>
          <Link href={getLink('/certifications')} className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-pmi-dark/70 transition-colors hover:text-pmi-dark">
            <ArrowRight className="h-4 w-4 rotate-180" /> {t.bcm.back_to_certs}
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
