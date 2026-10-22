'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Download, Lock, Mail, FileBadge,
  Compass, Users, Star, Leaf, Eye, Vote, Trophy, ClipboardList,
  FileText, Scale, GraduationCap, Landmark,
} from 'lucide-react'
import { type Locale, localizePath } from '@/lib/locale'
import { reveal, BLUEPRINT, RevealWords, Magnetic, Marquee, Eyebrow } from '@/components/ui/motion-kit'

type Props = { locale: Locale }

const COPY = {
  es: {
    back: 'Volver a Sobre nosotros',
    hero_title: 'Gobierno y organización',
    hero_desc: 'Estructura de gobierno transparente y ética, fundamentada en la excelencia y el desarrollo sostenible del sector AEC.',
    intro_badge: 'Gobierno y estructura',
    intro_title: 'Estructura de gobierno AECOMI',
    intro_text:
      'La estructura de gobierno de AECOMI está diseñada para garantizar la transparencia, la calidad y el cumplimiento de los principios éticos que inspiran todas nuestras actividades. El Gobierno de AECOMI es dirigido por el Consejo Ejecutivo.',
    intro_chips: ['Transparencia', 'Calidad', 'Ética'],
    org_badge: 'Organigrama',
    org_title: 'Cómo nos organizamos',
    org_root: 'Gobierno de AECOMI',
    org_council: 'Consejo Ejecutivo',
    org_council_sub: 'Dirección y ejecución',
    org_note: 'El Consejo Ejecutivo dirige y administra AECOMI para garantizar la excelencia de la organización.',
    pillars_badge: 'Fundamentos',
    pillars_title: 'Los pilares de nuestro gobierno',
    pillars: [
      { title: 'Sabiduría colectiva', desc: 'Experiencia acumulada de profesionales de reconocido prestigio internacional que guían cada decisión estratégica.' },
      { title: 'Diversidad', desc: 'Múltiples perspectivas y trayectorias que enriquecen cada debate y fortalecen nuestras conclusiones.' },
      { title: 'Excelencia', desc: 'Calidad insuperable en cada decisión, que garantiza el prestigio y la confianza en AECOMI.' },
      { title: 'Desarrollo sostenible', desc: 'Construimos el futuro del sector AEC con responsabilidad ambiental y visión de largo plazo.' },
    ],
    council_badge: 'Órgano operativo',
    council_title: 'Consejo Ejecutivo',
    council_text:
      'La misión del Consejo Ejecutivo es dirigir y administrar AECOMI para ejecutar las actividades de la organización, garantizando el cumplimiento de los objetivos estratégicos mediante la observancia de las políticas de gobierno rectoras que dan cumplimiento a nuestros fines fundacionales.',
    functions_title: 'Funciones principales',
    functions: [
      'Dirección y administración de AECOMI',
      'Ejecución de actividades',
      'Cumplimiento de objetivos estratégicos',
      'Observancia de políticas de gobierno',
      'Cumplimiento de fines fundacionales',
    ],
    members_title: 'Miembros',
    member_name: 'Miembro del Consejo',
    members: [
      { role: 'Presidente', area: 'Estrategia y gobierno' },
      { role: 'Vicepresidente', area: 'Investigación BIM' },
      { role: 'Director', area: 'Certificaciones' },
      { role: 'Asesor', area: 'Buenas prácticas' },
    ],
    principles_badge: 'Principios',
    principles_title: 'Principios de buen gobierno',
    principles_desc: 'Compromisos concretos que guían cómo AECOMI toma decisiones y responde ante su comunidad.',
    principles: [
      { title: 'Transparencia', desc: 'Todas nuestras decisiones son públicas, documentadas y justificadas ante la comunidad.' },
      { title: 'Participación', desc: 'Procesos inclusivos que recogen las voces de expertos, instituciones y certificados.' },
      { title: 'Meritocracia', desc: 'Los roles de gobierno se asignan por competencia, experiencia y trayectoria demostrada.' },
      { title: 'Rendición de cuentas', desc: 'Los órganos de gobierno responden regularmente ante la comunidad sobre sus actuaciones.' },
    ],
    docs_badge: 'Documentación',
    docs_title: 'Documentos y políticas',
    docs_desc: 'Marco normativo que regula la actuación de AECOMI y garantiza la transparencia ante la comunidad.',
    docs: [
      { title: 'Estatutos de AECOMI', type: 'PDF' },
      { title: 'Código de ética', type: 'PDF' },
      { title: 'Política de transparencia', type: 'PDF' },
      { title: 'Reporte anual', type: 'PDF' },
      { title: 'Actas de Junta Directiva', type: 'Acceso restringido' },
      { title: 'Plan estratégico', type: 'PDF' },
    ],
    cta_title: 'Conoce nuestro impacto',
    cta_desc: 'Explora nuestras certificaciones o ponte en contacto con nosotros para saber más sobre AECOMI.',
    cta_primary: 'Ver nuestras certificaciones',
    cta_secondary: 'Contacta con nosotros',
  },
  en: {
    back: 'Back to About Us',
    hero_title: 'Governance and organization',
    hero_desc: 'A transparent and ethical governance structure, grounded in excellence and the sustainable development of the AEC sector.',
    intro_badge: 'Governance and structure',
    intro_title: 'AECOMI governance structure',
    intro_text:
      "AECOMI's governance structure is designed to guarantee transparency, quality and compliance with the ethical principles that inspire all our activities. AECOMI Governance is led by the Executive Council.",
    intro_chips: ['Transparency', 'Quality', 'Ethics'],
    org_badge: 'Org chart',
    org_title: 'How we are organized',
    org_root: 'AECOMI Governance',
    org_council: 'Executive Council',
    org_council_sub: 'Direction and execution',
    org_note: 'The Executive Council directs and administers AECOMI to guarantee the excellence of the organization.',
    pillars_badge: 'Foundations',
    pillars_title: 'The pillars of our governance',
    pillars: [
      { title: 'Collective wisdom', desc: 'Accumulated experience of internationally renowned professionals who guide every strategic decision.' },
      { title: 'Diversity', desc: 'Multiple perspectives and backgrounds that enrich every debate and strengthen our conclusions.' },
      { title: 'Excellence', desc: 'Unsurpassed quality in every decision, guaranteeing the prestige and trust in AECOMI.' },
      { title: 'Sustainable development', desc: 'We build the future of the AEC sector with environmental responsibility and long-term vision.' },
    ],
    council_badge: 'Operating body',
    council_title: 'Executive Council',
    council_text:
      "The mission of the Executive Council is to direct and administer AECOMI in carrying out the organization's activities, ensuring the fulfillment of strategic objectives through observance of the governing policies that uphold our foundational purposes.",
    functions_title: 'Key functions',
    functions: [
      'Direction and administration of AECOMI',
      'Execution of activities',
      'Fulfillment of strategic objectives',
      'Observance of governance policies',
      'Fulfillment of foundational purposes',
    ],
    members_title: 'Members',
    member_name: 'Council Member',
    members: [
      { role: 'President', area: 'Strategy & governance' },
      { role: 'Vice President', area: 'BIM research' },
      { role: 'Director', area: 'Certifications' },
      { role: 'Advisor', area: 'Best practices' },
    ],
    principles_badge: 'Principles',
    principles_title: 'Principles of good governance',
    principles_desc: 'Concrete commitments that guide how AECOMI makes decisions and answers to its community.',
    principles: [
      { title: 'Transparency', desc: 'All our decisions are public, documented and justified to the community.' },
      { title: 'Participation', desc: 'Inclusive processes that gather the voices of experts, institutions and certified professionals.' },
      { title: 'Meritocracy', desc: 'Governance roles are assigned based on competence, experience and proven track record.' },
      { title: 'Accountability', desc: 'Governing bodies regularly answer to the community for their actions.' },
    ],
    docs_badge: 'Documentation',
    docs_title: 'Documents and policies',
    docs_desc: "Regulatory framework that governs AECOMI's conduct and guarantees transparency to the community.",
    docs: [
      { title: 'AECOMI Bylaws', type: 'PDF' },
      { title: 'Code of Ethics', type: 'PDF' },
      { title: 'Transparency Policy', type: 'PDF' },
      { title: 'Annual Report', type: 'PDF' },
      { title: 'Board Meeting Minutes', type: 'Restricted access' },
      { title: 'Strategic Plan', type: 'PDF' },
    ],
    cta_title: 'Discover our impact',
    cta_desc: 'Explore our certifications or get in touch with us to learn more about AECOMI.',
    cta_primary: 'View our certifications',
    cta_secondary: 'Contact us',
  },
  pt: {
    back: 'Voltar para Sobre nós',
    hero_title: 'Governança e organização',
    hero_desc: 'Estrutura de governança transparente e ética, fundamentada na excelência e no desenvolvimento sustentável do setor AEC.',
    intro_badge: 'Governança e estrutura',
    intro_title: 'Estrutura de governança da AECOMI',
    intro_text:
      'A estrutura de governança da AECOMI foi concebida para garantir a transparência, a qualidade e o cumprimento dos princípios éticos que inspiram todas as nossas atividades. A Governança da AECOMI é conduzida pelo Conselho Executivo.',
    intro_chips: ['Transparência', 'Qualidade', 'Ética'],
    org_badge: 'Organograma',
    org_title: 'Como nos organizamos',
    org_root: 'Governança da AECOMI',
    org_council: 'Conselho Executivo',
    org_council_sub: 'Direção e execução',
    org_note: 'O Conselho Executivo dirige e administra a AECOMI para garantir a excelência da organização.',
    pillars_badge: 'Fundamentos',
    pillars_title: 'Os pilares da nossa governança',
    pillars: [
      { title: 'Sabedoria coletiva', desc: 'Experiência acumulada de profissionais de reconhecido prestígio internacional que orientam cada decisão estratégica.' },
      { title: 'Diversidade', desc: 'Múltiplas perspectivas e trajetórias que enriquecem cada debate e fortalecem nossas conclusões.' },
      { title: 'Excelência', desc: 'Qualidade insuperável em cada decisão, que garante o prestígio e a confiança na AECOMI.' },
      { title: 'Desenvolvimento sustentável', desc: 'Construímos o futuro do setor AEC com responsabilidade ambiental e visão de longo prazo.' },
    ],
    council_badge: 'Órgão operacional',
    council_title: 'Conselho Executivo',
    council_text:
      'A missão do Conselho Executivo é dirigir e administrar a AECOMI para executar as atividades da organização, garantindo o cumprimento dos objetivos estratégicos por meio da observância das políticas de governança que dão cumprimento aos nossos fins fundacionais.',
    functions_title: 'Principais funções',
    functions: [
      'Direção e administração da AECOMI',
      'Execução de atividades',
      'Cumprimento dos objetivos estratégicos',
      'Observância das políticas de governança',
      'Cumprimento dos fins fundacionais',
    ],
    members_title: 'Membros',
    member_name: 'Membro do Conselho',
    members: [
      { role: 'Presidente', area: 'Estratégia e governança' },
      { role: 'Vice-presidente', area: 'Pesquisa BIM' },
      { role: 'Diretor', area: 'Certificações' },
      { role: 'Consultor', area: 'Boas práticas' },
    ],
    principles_badge: 'Princípios',
    principles_title: 'Princípios de boa governança',
    principles_desc: 'Compromissos concretos que orientam como a AECOMI toma decisões e presta contas à sua comunidade.',
    principles: [
      { title: 'Transparência', desc: 'Todas as nossas decisões são públicas, documentadas e justificadas perante a comunidade.' },
      { title: 'Participação', desc: 'Processos inclusivos que reúnem as vozes de especialistas, instituições e certificados.' },
      { title: 'Meritocracia', desc: 'Os papéis de governança são atribuídos por competência, experiência e trajetória comprovada.' },
      { title: 'Prestação de contas', desc: 'Os órgãos de governança respondem regularmente à comunidade por suas ações.' },
    ],
    docs_badge: 'Documentação',
    docs_title: 'Documentos e políticas',
    docs_desc: 'Marco normativo que regula a atuação da AECOMI e garante a transparência perante a comunidade.',
    docs: [
      { title: 'Estatutos da AECOMI', type: 'PDF' },
      { title: 'Código de Ética', type: 'PDF' },
      { title: 'Política de Transparência', type: 'PDF' },
      { title: 'Relatório Anual', type: 'PDF' },
      { title: 'Atas da Diretoria', type: 'Acesso restrito' },
      { title: 'Plano Estratégico', type: 'PDF' },
    ],
    cta_title: 'Conheça o nosso impacto',
    cta_desc: 'Explore nossas certificações ou entre em contato conosco para saber mais sobre a AECOMI.',
    cta_primary: 'Ver nossas certificações',
    cta_secondary: 'Fale conosco',
  },
} as const

const PILLAR_STYLE = [
  { icon: Compass, bg: '#5B2D8E', fg: '#ffffff' },
  { icon: Users, bg: '#00A3C4', fg: '#06222a' },
  { icon: Star, bg: '#E87722', fg: '#2a1100' },
  { icon: Leaf, bg: '#0A4F5C', fg: '#ffffff' },
]
const PRINCIPLE_ICONS = [Eye, Vote, Trophy, ClipboardList]
const DOC_ICONS = [FileText, Scale, Eye, ClipboardList, Lock, Compass]

export default function GobiernoPage({ locale }: Props) {
  const c = COPY[locale]
  const link = (path: string) => localizePath(path, locale)
  const reduce = useReducedMotion()
  const [activePillar, setActivePillar] = useState(0)
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null)

  return (
    <main className="bg-pmi-cream">
      {/* ═══ HERO · anillos orbitales ═══════════════════════════════════ */}
      <section className="relative flex min-h-[78vh] w-full items-center overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />

        {/* Órbitas de gobierno */}
        <div className="pointer-events-none absolute -right-40 top-1/2 h-[720px] w-[720px] -translate-y-1/2 lg:right-0" aria-hidden>
          {[1, 0.72, 0.46].map((s, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 m-auto rounded-full border border-white/15"
              style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
              animate={reduce ? undefined : { rotate: i % 2 ? -360 : 360 }}
              transition={{ duration: 60 - i * 14, ease: 'linear', repeat: Infinity }}
            >
              {[0, 140, 250].slice(0, 3 - i).map((deg) => (
                <span
                  key={deg}
                  className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full"
                  style={{
                    transform: `rotate(${deg}deg) translateY(calc(-${s * 360}px)) translate(-50%, -50%)`,
                    backgroundColor: ['#00A3C4', '#E87722', '#5B2D8E'][(i + deg) % 3],
                  }}
                />
              ))}
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/20"
            animate={reduce ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Landmark className="h-9 w-9 text-pmi-cyan" />
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              href={link('/about')}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/50 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {c.back}
            </Link>
          </motion.div>
          <h1 className="mt-10 max-w-4xl font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[96px]">
            <RevealWords text={c.hero_title} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-white/60"
          >
            {c.hero_desc}
          </motion.p>
        </div>
      </section>

      {/* ═══ INTRO · cita con términos clave ════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-4">
            <Eyebrow>{c.intro_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-pmi-dark md:text-4xl">
              {c.intro_title}
            </h2>
          </motion.div>
          <div className="lg:col-span-8">
            <motion.p
              {...reveal}
              className="font-display text-2xl font-medium leading-[1.35] tracking-[-0.01em] text-pmi-dark md:text-[34px]"
            >
              {c.intro_text}
            </motion.p>
            <ul className="mt-10 flex flex-wrap gap-3">
              {c.intro_chips.map((chip, i) => (
                <motion.li
                  key={chip}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 + i * 0.1 }}
                  className="rounded-full border border-pmi-dark/20 bg-white px-5 py-2 font-display text-sm font-semibold text-pmi-dark"
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: ['#00A3C4', '#E87722', '#5B2D8E'][i] }} />
                  {chip}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ ORGANIGRAMA · árbol que se dibuja ══════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="mx-auto max-w-2xl text-center">
            <Eyebrow>{c.org_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {c.org_title}
            </h2>
          </motion.div>

          <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-pmi-dark px-8 py-4 font-display text-lg font-semibold text-white"
            >
              {c.org_root}
            </motion.div>

            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="h-10 w-0.5 origin-top bg-pmi-dark/40"
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="rounded-2xl bg-pmi-cyan px-8 py-4 text-center text-pmi-dark"
            >
              <div className="font-display text-lg font-semibold">{c.org_council}</div>
              <div className="text-xs font-medium uppercase tracking-widest text-pmi-dark/70">{c.org_council_sub}</div>
            </motion.div>

            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="h-8 w-0.5 origin-top bg-pmi-dark/40"
              aria-hidden
            />
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 1.5 }}
              className="hidden h-0.5 w-[84%] bg-pmi-dark/40 lg:block"
              aria-hidden
            />

            <ul className="grid w-full gap-3 lg:grid-cols-5 lg:gap-4">
              {c.functions.map((fn, i) => (
                <motion.li
                  key={fn}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: 1.9 + i * 0.1 }}
                  className="relative rounded-xl border border-pmi-dark/15 bg-pmi-cream px-4 py-4 text-center text-sm font-medium leading-snug text-pmi-dark lg:mt-0 lg:pt-5"
                >
                  <span className="absolute -top-px left-1/2 hidden h-4 w-0.5 -translate-x-1/2 -translate-y-full bg-pmi-dark/40 lg:block" aria-hidden />
                  <span className="mb-1 block font-display text-xs font-semibold tabular-nums text-pmi-orange">0{i + 1}</span>
                  {fn}
                </motion.li>
              ))}
            </ul>

            <p className="mt-10 max-w-lg text-center text-sm leading-relaxed text-pmi-dark/55">{c.org_note}</p>
          </div>
        </div>
      </section>

      {/* ═══ PILARES · acordeón horizontal ══════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{c.pillars_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {c.pillars_title}
            </h2>
          </motion.div>

          <div className="mt-14 flex flex-col gap-3 lg:h-[460px] lg:flex-row">
            {c.pillars.map((p, i) => {
              const st = PILLAR_STYLE[i]
              const open = activePillar === i
              return (
                <motion.div
                  key={p.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  onMouseEnter={() => setActivePillar(i)}
                  onFocus={() => setActivePillar(i)}
                  onClick={() => setActivePillar(i)}
                  className={`relative flex min-h-[120px] cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-7 outline-none transition-[flex] duration-500 ease-out focus-visible:ring-4 focus-visible:ring-pmi-dark/30 lg:min-h-0 ${open ? 'lg:flex-[3.2]' : 'lg:flex-1'}`}
                  style={{ backgroundColor: st.bg, color: st.fg }}
                >
                  <div className="flex items-start justify-between">
                    <st.icon className="h-8 w-8" />
                    <span className="font-display text-sm font-semibold tabular-nums opacity-60">0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className={`font-display font-semibold leading-tight transition-all duration-500 ${open ? 'text-3xl' : 'text-xl lg:text-2xl'}`}>
                      {p.title}
                    </h3>
                    <p
                      className={`overflow-hidden text-[15px] leading-relaxed opacity-85 transition-all duration-500 lg:max-w-md ${open ? 'mt-4 max-h-40 opacity-85' : 'max-h-0 opacity-0 max-lg:mt-3 max-lg:max-h-40 max-lg:opacity-85'}`}
                    >
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CONSEJO EJECUTIVO · panel oscuro con sticky ════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto grid max-w-[1400px] gap-16 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <Eyebrow dark>{c.council_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[56px]">
                {c.council_title}
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-white/60">{c.council_text}</p>

              <h3 className="mt-12 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{c.functions_title}</h3>
              <ul className="mt-5 space-y-3">
                {c.functions.map((fn, i) => (
                  <motion.li
                    key={fn}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-center gap-3 text-[15px] text-white/80"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-pmi-cyan" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="10" className="opacity-30" />
                      <motion.path
                        d="M7 12.5l3.2 3.2L17 9"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                      />
                    </svg>
                    {fn}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <div className="lg:col-span-6">
            <h3 className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              <Users className="h-4 w-4" aria-hidden />
              {c.members_title}
            </h3>
            <ul className="space-y-4">
              {c.members.map((m, i) => (
                <motion.li
                  key={m.role}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduce ? undefined : { x: 8 }}
                  className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-pmi-cyan/50 hover:bg-white/[0.07]"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pmi-cyan/40 to-pmi-purple/40 ring-1 ring-white/15">
                    <GraduationCap className="h-6 w-6 text-white/80" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg font-semibold">{m.role}</div>
                    <div className="text-sm text-white/45">{c.member_name}</div>
                  </div>
                  <span className="hidden rounded-full border border-white/15 px-3 py-1 text-xs text-white/60 sm:block">{m.area}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══ PRINCIPIOS · filas editoriales ═════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>{c.principles_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
                {c.principles_title}
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-pmi-dark/60 md:col-span-5 md:justify-self-end">{c.principles_desc}</p>
          </motion.div>

          <ul className="mt-14 border-t border-pmi-dark/15">
            {c.principles.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i]
              const on = activePrinciple === i
              return (
                <motion.li
                  key={p.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onMouseEnter={() => setActivePrinciple(i)}
                  onMouseLeave={() => setActivePrinciple(null)}
                  className="group relative overflow-hidden border-b border-pmi-dark/15"
                >
                  <motion.span
                    className="absolute inset-0 origin-left bg-pmi-dark"
                    initial={false}
                    animate={{ scaleX: on ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden
                  />
                  <div className={`relative grid items-center gap-4 px-2 py-8 transition-colors duration-300 md:grid-cols-12 md:px-6 md:py-10 ${on ? 'text-white' : 'text-pmi-dark'}`}>
                    <span className="font-display text-sm font-semibold tabular-nums text-pmi-orange md:col-span-1">0{i + 1}</span>
                    <h3 className="font-display text-3xl font-semibold tracking-tight md:col-span-5 md:text-5xl">{p.title}</h3>
                    <p className={`text-[15px] leading-relaxed transition-colors duration-300 md:col-span-5 ${on ? 'text-white/70' : 'text-pmi-dark/60'}`}>{p.desc}</p>
                    <span className="hidden justify-self-end md:col-span-1 md:block">
                      <Icon className={`h-7 w-7 transition-all duration-300 ${on ? 'translate-x-0 text-pmi-cyan' : '-translate-x-2 opacity-40'}`} />
                    </span>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ═══ DOCUMENTOS · carpetas ══════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{c.docs_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {c.docs_title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pmi-dark/60">{c.docs_desc}</p>
          </motion.div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {c.docs.map((d, i) => {
              const Icon = DOC_ICONS[i]
              const locked = i === 4
              return (
                <motion.li
                  key={d.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={reduce || locked ? undefined : { y: -8, rotate: -0.6 }}
                  className="relative"
                >
                  {/* pestaña de carpeta */}
                  <span className={`absolute -top-3 left-6 h-4 w-20 rounded-t-lg ${locked ? 'bg-pmi-dark/15' : 'bg-pmi-orange'}`} aria-hidden />
                  <a
                    href="#"
                    onClick={(e) => locked && e.preventDefault()}
                    aria-disabled={locked}
                    className={`group relative flex h-full min-h-[170px] flex-col justify-between rounded-2xl rounded-tl-none border bg-white p-6 transition-shadow ${
                      locked ? 'cursor-not-allowed border-pmi-dark/10 opacity-60' : 'border-pmi-dark/10 hover:shadow-[0_20px_40px_-18px_rgba(15,5,36,0.35)]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <Icon className="h-7 w-7 text-pmi-dark" />
                      {locked ? (
                        <Lock className="h-5 w-5 text-pmi-dark/40" />
                      ) : (
                        <Download className="h-5 w-5 text-pmi-dark/30 transition-all group-hover:translate-y-0.5 group-hover:text-pmi-orange" />
                      )}
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold leading-snug text-pmi-dark">{d.title}</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-pmi-dark/45">{d.type}</div>
                    </div>
                  </a>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════════════════ */}
      <Marquee items={[...c.intro_chips, ...c.pillars.map((p) => p.title), ...c.principles.map((p) => p.title)]} />
      <section className="w-full bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">{c.cta_title}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{c.cta_desc}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Magnetic>
                <Link
                  href={link('/certifications')}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black"
                >
                  <FileBadge className="h-4 w-4" />
                  {c.cta_primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Magnetic>
              <Link
                href={link('/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold transition-colors hover:bg-pmi-dark/10"
              >
                <Mail className="h-4 w-4" />
                {c.cta_secondary}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
