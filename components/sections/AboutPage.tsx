'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
  motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform,
} from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, ArrowDown,
  Target, BookOpen, Globe, Users, Zap, TrendingUp,
  Star, ShieldCheck, Lightbulb, RefreshCw, HeartHandshake,
  BadgeCheck, FlaskConical, UsersRound, Scale,
  GraduationCap, Building2, HardHat,
} from 'lucide-react'
import { type Locale, localizePath } from '@/lib/locale'
import {
  reveal, BLUEPRINT, CountUp, RevealWords, Magnetic, Marquee, Eyebrow, ScrollWords, useDrawLine,
} from '@/components/ui/motion-kit'

type Props = { locale: Locale }

const COPY = {
  es: {
    hero_badge: 'Conócenos',
    hero_title: 'Sobre AECOMI',
    hero_accent: 'Líderes en certificación BIM internacional',
    hero_desc:
      'Organización internacional especializada en la certificación de competencias BIM para profesionales del sector AEC. Promovemos estándares globales, formación especializada y una comunidad comprometida con la transformación digital de la construcción.',
    hero_cta: 'Nuestra historia',
    scroll: 'Desliza',
    manifesto_badge: 'Por qué existimos',
    manifesto:
      'AECOMI nace con la vocación de convertirse en una referencia internacional dentro del ámbito BIM y de la gestión de la información aplicada a la construcción. Certificamos competencias técnicas, estratégicas y de liderazgo en todas las fases del ciclo de vida de los proyectos.',
    mission_badge: 'Misión',
    mission_title: 'Lo que nos mueve',
    mission_items: [
      { title: 'Referencia internacional', desc: 'Posicionamos a AECOMI como referente en BIM y gestión de la información aplicada a la construcción.' },
      { title: 'Estándares de calidad', desc: 'Desarrollamos estándares profesionales que marcan la diferencia en el sector AEC.' },
      { title: 'Formación especializada', desc: 'Impulsamos la formación y el reconocimiento de competencias alineadas con el mercado.' },
    ],
    vision_badge: 'Visión',
    vision_title: 'Hacia dónde vamos',
    vision_text:
      'Creemos que la transformación digital de la industria AEC requiere profesionales preparados para liderar procesos colaborativos complejos y organizaciones capaces de implantar metodologías eficientes y sostenibles.',
    vision_items: [
      { title: 'Profesionales preparados', desc: 'Liderazgo en procesos colaborativos complejos y proyectos multidisciplinares.' },
      { title: 'Metodologías eficientes', desc: 'Implantación de metodologías sostenibles que optimizan recursos y reducen el impacto.' },
      { title: 'Excelencia continua', desc: 'Trabajo conjunto con expertos internacionales, instituciones académicas y empresas innovadoras.' },
    ],
    story_badge: 'Nuestra trayectoria',
    story_title: 'De una idea a un',
    story_accent: 'estándar global',
    story: [
      'AECOMI surge de una necesidad real de la industria: contar con un marco internacional reconocido que permita validar las competencias de los profesionales que gestionan proyectos BIM. Un sector en plena transformación digital requería criterios claros, rigurosos y aplicables en cualquier contexto geográfico.',
      'A lo largo de los años hemos construido un ecosistema de certificación respaldado por expertos internacionales, instituciones académicas de prestigio y empresas comprometidas con la mejora continua. Nuestras certificaciones IDM, BDM y BCM cubren los roles más demandados en proyectos BIM multidisciplinares.',
      'Hoy AECOMI está presente en más de 30 países, con una comunidad activa de profesionales certificados que lideran la transformación digital del sector AEC en sus organizaciones.',
    ],
    stats: [
      { value: '20+', label: 'Años de experiencia' },
      { value: '500+', label: 'Profesionales certificados' },
      { value: '30+', label: 'Países representados' },
      { value: '3', label: 'Certificaciones activas' },
    ],
    do_badge: 'Nuestra actividad',
    do_title: '¿Qué hacemos?',
    do_desc: 'Desarrollamos programas de certificación que reconocen las competencias de los perfiles BIM más relevantes del sector AEC.',
    do_items: [
      { title: 'Certificaciones profesionales', desc: 'Programas que reconocen las competencias de los perfiles BIM más relevantes, alineados con estándares internacionales.' },
      { title: 'Formación e investigación', desc: 'Promovemos actividades de formación, investigación y difusión de buenas prácticas en gestión de la información.' },
      { title: 'Comunidad internacional', desc: 'Facilitamos el intercambio de conocimiento, la colaboración entre expertos y el desarrollo de nuevas oportunidades.' },
      { title: 'Estándares globales', desc: 'Seguimos los estándares más reconocidos de la profesión, ofreciendo un lenguaje técnico común a nivel mundial.' },
    ],
    values_badge: 'Lo que nos define',
    values_title: 'Nuestros valores',
    values_desc: 'Principios duraderos que guían cada decisión, proceso y relación en AECOMI. En tiempos de crecimiento y cambio, son nuestra brújula moral.',
    values: [
      { title: 'Excelencia', desc: 'Buscamos los más altos estándares en cada certificación, proceso y servicio que ofrecemos.' },
      { title: 'Ética', desc: 'Actuamos con integridad, transparencia y responsabilidad en todas nuestras relaciones profesionales.' },
      { title: 'Innovación', desc: 'Adoptamos y promovemos tecnologías y metodologías emergentes que transforman la industria.' },
      { title: 'Mejora continua', desc: 'Evaluamos y perfeccionamos constantemente nuestros programas para estar a la vanguardia.' },
      { title: 'Visión global', desc: 'Reunir a la comunidad global y compartir criterios es la mejor forma de mejorar la práctica profesional.' },
      { title: 'Compromiso', desc: 'Fomentamos puntos de vista diversos para que cada persona aporte su conocimiento y experiencia a la transformación del sector AEC.' },
    ],
    partners_badge: 'Alianzas',
    partners_title: 'Trabajamos con',
    partners: ['Expertos internacionales', 'Instituciones académicas', 'Empresas innovadoras', 'Profesionales del sector AEC'],
    gov_badge: 'Estructura de gobierno',
    gov_title: 'Gobierno y organización',
    gov_desc: 'Descubre cómo AECOMI garantiza la transparencia, la calidad y el cumplimiento de principios éticos a través de sus órganos de gobierno.',
    gov_cta: 'Ver estructura de gobierno',
    cta_title: 'Sé parte del cambio',
    cta_desc: 'Nuestro objetivo es contribuir a una cultura de trabajo más integrada, transparente y orientada a aportar valor real a los proyectos.',
    cta_primary: 'Únete a AECOMI',
    cta_secondary: 'Conoce nuestras certificaciones',
  },
  en: {
    hero_badge: 'Get to know us',
    hero_title: 'About AECOMI',
    hero_accent: 'Leaders in international BIM certification',
    hero_desc:
      'An international organization specialized in certifying BIM competencies for AEC professionals. We promote global standards, specialized training and a community committed to the digital transformation of construction.',
    hero_cta: 'Our story',
    scroll: 'Scroll',
    manifesto_badge: 'Why we exist',
    manifesto:
      'AECOMI was born with the vocation to become an international reference in BIM and in information management applied to construction. We certify technical, strategic and leadership competencies across every phase of the project life cycle.',
    mission_badge: 'Mission',
    mission_title: 'What drives us',
    mission_items: [
      { title: 'International reference', desc: 'We position AECOMI as a reference in BIM and information management applied to construction.' },
      { title: 'Quality standards', desc: 'We develop professional standards that make a difference in the AEC sector.' },
      { title: 'Specialized training', desc: 'We promote training and the recognition of market-aligned competencies.' },
    ],
    vision_badge: 'Vision',
    vision_title: 'Where we are heading',
    vision_text:
      'We believe the digital transformation of the AEC industry requires professionals prepared to lead complex collaborative processes and organizations capable of implementing efficient and sustainable methodologies.',
    vision_items: [
      { title: 'Prepared professionals', desc: 'Leadership in complex collaborative processes and multidisciplinary projects.' },
      { title: 'Efficient methodologies', desc: 'Implementation of sustainable methodologies that optimize resources and reduce environmental impact.' },
      { title: 'Continuous excellence', desc: 'Working together with international experts, academic institutions and innovative companies.' },
    ],
    story_badge: 'Our journey',
    story_title: 'From an idea to a',
    story_accent: 'global standard',
    story: [
      'AECOMI arose from a real need in the industry: an internationally recognized framework to validate the competencies of the professionals who manage BIM projects. A sector in the midst of digital transformation required clear, rigorous criteria applicable in any geographic context.',
      'Over the years we have built a certification ecosystem backed by international experts, prestigious academic institutions and companies committed to continuous improvement. Our IDM, BDM and BCM certifications cover the most in-demand roles in multidisciplinary BIM projects.',
      'Today AECOMI is present in more than 30 countries, with an active community of certified professionals leading the digital transformation of the AEC sector within their organizations.',
    ],
    stats: [
      { value: '20+', label: 'Years of experience' },
      { value: '500+', label: 'Certified professionals' },
      { value: '30+', label: 'Countries represented' },
      { value: '3', label: 'Active certifications' },
    ],
    do_badge: 'Our activity',
    do_title: 'What do we do?',
    do_desc: 'We develop certification programs that recognize the competencies of the most relevant BIM profiles in the AEC sector.',
    do_items: [
      { title: 'Professional certifications', desc: 'Programs that recognize the competencies of the most relevant BIM profiles, aligned with international standards.' },
      { title: 'Training and research', desc: 'We promote training, research and the dissemination of best practices in information management.' },
      { title: 'International community', desc: 'We facilitate knowledge exchange, collaboration among experts and the development of new opportunities.' },
      { title: 'Global standards', desc: 'We follow the most recognized standards in the profession, providing a common technical language worldwide.' },
    ],
    values_badge: 'What defines us',
    values_title: 'Our values',
    values_desc: 'Enduring principles that guide every decision, process and relationship at AECOMI. In times of growth and change, they are our moral compass.',
    values: [
      { title: 'Excellence', desc: 'We seek the highest standards in every certification, process and service we offer.' },
      { title: 'Ethics', desc: 'We act with integrity, transparency and responsibility in all our professional relationships.' },
      { title: 'Innovation', desc: 'We adopt and promote emerging technologies and methodologies that transform the industry.' },
      { title: 'Continuous improvement', desc: 'We constantly evaluate and refine our programs to stay at the forefront.' },
      { title: 'Global vision', desc: 'Bringing the global community together and sharing criteria is the best way to improve professional practice.' },
      { title: 'Commitment', desc: 'We encourage diverse points of view so people contribute their knowledge and experience to transforming the AEC sector.' },
    ],
    partners_badge: 'Partnerships',
    partners_title: 'We work with',
    partners: ['International experts', 'Academic institutions', 'Innovative companies', 'AEC sector professionals'],
    gov_badge: 'Governance structure',
    gov_title: 'Governance and organization',
    gov_desc: 'Discover how AECOMI guarantees transparency, quality and compliance with ethical principles through its governance bodies.',
    gov_cta: 'Discover our governance structure',
    cta_title: 'Be part of the change',
    cta_desc: 'Our goal is to help build a more integrated, transparent work culture oriented toward delivering real value to projects.',
    cta_primary: 'Join AECOMI',
    cta_secondary: 'Explore our certifications',
  },
  pt: {
    hero_badge: 'Conheça-nos',
    hero_title: 'Sobre a AECOMI',
    hero_accent: 'Líderes em certificação BIM internacional',
    hero_desc:
      'Organização internacional especializada na certificação de competências BIM para profissionais do setor AEC. Promovemos padrões globais, formação especializada e uma comunidade comprometida com a transformação digital da construção.',
    hero_cta: 'Nossa história',
    scroll: 'Role',
    manifesto_badge: 'Por que existimos',
    manifesto:
      'A AECOMI nasce com a vocação de se tornar uma referência internacional em BIM e na gestão da informação aplicada à construção. Certificamos competências técnicas, estratégicas e de liderança em todas as fases do ciclo de vida dos projetos.',
    mission_badge: 'Missão',
    mission_title: 'O que nos move',
    mission_items: [
      { title: 'Referência internacional', desc: 'Posicionamos a AECOMI como referência em BIM e gestão da informação aplicada à construção.' },
      { title: 'Padrões de qualidade', desc: 'Desenvolvemos padrões profissionais que fazem a diferença no setor AEC.' },
      { title: 'Formação especializada', desc: 'Impulsionamos a formação e o reconhecimento de competências alinhadas ao mercado.' },
    ],
    vision_badge: 'Visão',
    vision_title: 'Para onde vamos',
    vision_text:
      'Acreditamos que a transformação digital da indústria AEC exige profissionais preparados para liderar processos colaborativos complexos e organizações capazes de implantar metodologias eficientes e sustentáveis.',
    vision_items: [
      { title: 'Profissionais preparados', desc: 'Liderança em processos colaborativos complexos e projetos multidisciplinares.' },
      { title: 'Metodologias eficientes', desc: 'Implantação de metodologias sustentáveis que otimizam recursos e reduzem o impacto ambiental.' },
      { title: 'Excelência contínua', desc: 'Trabalho conjunto com especialistas internacionais, instituições acadêmicas e empresas inovadoras.' },
    ],
    story_badge: 'Nossa trajetória',
    story_title: 'De uma ideia a um',
    story_accent: 'padrão global',
    story: [
      'A AECOMI surge de uma necessidade real da indústria: contar com um marco internacional reconhecido que permita validar as competências dos profissionais que gerenciam projetos BIM. Um setor em plena transformação digital exigia critérios claros, rigorosos e aplicáveis em qualquer contexto geográfico.',
      'Ao longo dos anos, construímos um ecossistema de certificação respaldado por especialistas internacionais, instituições acadêmicas de prestígio e empresas comprometidas com a melhoria contínua. Nossas certificações IDM, BDM e BCM cobrem os papéis mais demandados em projetos BIM multidisciplinares.',
      'Hoje a AECOMI está presente em mais de 30 países, com uma comunidade ativa de profissionais certificados que lideram a transformação digital do setor AEC em suas organizações.',
    ],
    stats: [
      { value: '20+', label: 'Anos de experiência' },
      { value: '500+', label: 'Profissionais certificados' },
      { value: '30+', label: 'Países representados' },
      { value: '3', label: 'Certificações ativas' },
    ],
    do_badge: 'Nossa atividade',
    do_title: 'O que fazemos?',
    do_desc: 'Desenvolvemos programas de certificação que reconhecem as competências dos perfis BIM mais relevantes do setor AEC.',
    do_items: [
      { title: 'Certificações profissionais', desc: 'Programas que reconhecem as competências dos perfis BIM mais relevantes, alinhados a padrões internacionais.' },
      { title: 'Formação e pesquisa', desc: 'Promovemos atividades de formação, pesquisa e difusão de boas práticas em gestão da informação.' },
      { title: 'Comunidade internacional', desc: 'Facilitamos a troca de conhecimento, a colaboração entre especialistas e o desenvolvimento de novas oportunidades.' },
      { title: 'Padrões globais', desc: 'Seguimos os padrões mais reconhecidos da profissão, oferecendo uma linguagem técnica comum em nível mundial.' },
    ],
    values_badge: 'O que nos define',
    values_title: 'Nossos valores',
    values_desc: 'Princípios duradouros que orientam cada decisão, processo e relacionamento na AECOMI. Em tempos de crescimento e mudança, são a nossa bússola moral.',
    values: [
      { title: 'Excelência', desc: 'Buscamos os mais altos padrões em cada certificação, processo e serviço que oferecemos.' },
      { title: 'Ética', desc: 'Agimos com integridade, transparência e responsabilidade em todos os nossos relacionamentos profissionais.' },
      { title: 'Inovação', desc: 'Adotamos e promovemos tecnologias e metodologias emergentes que transformam a indústria.' },
      { title: 'Melhoria contínua', desc: 'Avaliamos e aprimoramos constantemente nossos programas para estar na vanguarda.' },
      { title: 'Visão global', desc: 'Reunir a comunidade global e compartilhar critérios é a melhor forma de aprimorar a prática profissional.' },
      { title: 'Compromisso', desc: 'Incentivamos pontos de vista diversos para que cada pessoa contribua com seu conhecimento e experiência na transformação do setor AEC.' },
    ],
    partners_badge: 'Parcerias',
    partners_title: 'Trabalhamos com',
    partners: ['Especialistas internacionais', 'Instituições acadêmicas', 'Empresas inovadoras', 'Profissionais do setor AEC'],
    gov_badge: 'Estrutura de governança',
    gov_title: 'Governança e organização',
    gov_desc: 'Descubra como a AECOMI garante transparência, qualidade e cumprimento de princípios éticos por meio de seus órgãos de governança.',
    gov_cta: 'Conheça a estrutura de governança',
    cta_title: 'Faça parte da mudança',
    cta_desc: 'Nosso objetivo é contribuir para uma cultura de trabalho mais integrada, transparente e orientada a gerar valor real para os projetos.',
    cta_primary: 'Junte-se à AECOMI',
    cta_secondary: 'Conheça nossas certificações',
  },
} as const

const MISSION_ICONS = [Globe, Target, BookOpen]
const VISION_ICONS = [Users, Zap, TrendingUp]
const DO_ICONS = [BadgeCheck, FlaskConical, UsersRound, Scale]
const VALUE_ICONS = [Star, ShieldCheck, Lightbulb, RefreshCw, Globe, HeartHandshake]
const PARTNER_ICONS = [Globe, GraduationCap, Building2, HardHat]

export default function AboutPage({ locale }: Props) {
  const c = COPY[locale]
  const link = (path: string) => localizePath(path, locale)
  const reduce = useReducedMotion()

  // Hero: foco que sigue al cursor + parallax
  const heroRef = useRef<HTMLElement>(null)
  const mx = useMotionValue(70)
  const my = useMotionValue(35)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(0,163,196,0.16), transparent 70%)`
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroScroll, [0, 1], [0, reduce ? 0 : 100])
  const heroFade = useTransform(heroScroll, [0, 0.8], [1, reduce ? 1 : 0.15])
  const barsY = useTransform(heroScroll, [0, 1], [0, reduce ? 0 : -70])

  // Línea vertical de "qué hacemos" que se dibuja con el scroll
  const doRef = useRef<HTMLOListElement>(null)
  const doLine = useDrawLine(doRef)

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          if (reduce) return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(((e.clientX - r.left) / r.width) * 100)
          my.set(((e.clientY - r.top) / r.height) * 100)
        }}
        className="relative flex min-h-[88vh] w-full items-center overflow-hidden bg-[#070B16] text-white"
      >
        <motion.div
          className="absolute inset-0"
          style={BLUEPRINT}
          animate={reduce ? undefined : { backgroundPosition: ['0px 0px', '56px 56px'] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          aria-hidden
        />
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />
        <motion.div
          style={{ y: barsY }}
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[55%] items-end justify-end gap-3 px-4 opacity-[0.16] sm:px-8 lg:pr-24"
          aria-hidden
        >
          {[
            { h: '46%', c: '#00A3C4' }, { h: '78%', c: '#E87722' }, { h: '58%', c: '#5B2D8E' },
            { h: '92%', c: '#00A3C4' }, { h: '100%', c: '#E87722' }, { h: '64%', c: '#5B2D8E' }, { h: '82%', c: '#00A3C4' },
          ].map((b, i) => (
            <motion.span
              key={i}
              className="w-8 origin-bottom rounded-t-sm sm:w-12 lg:w-16"
              style={{ height: b.h, backgroundColor: b.c }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>

        <motion.div style={{ y: heroY, opacity: heroFade }} className="relative mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Eyebrow dark>{c.hero_badge}</Eyebrow>
          <h1 className="mt-8 font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[104px]">
            <RevealWords text={c.hero_title} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 max-w-2xl font-display text-xl text-pmi-cyan sm:text-2xl"
          >
            {c.hero_accent}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/60"
          >
            {c.hero_desc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-10"
          >
            <Magnetic>
              <a
                href="#manifiesto"
                className="group inline-flex items-center gap-2 rounded-full bg-pmi-orange px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-[#f08430] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {c.hero_cta}
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35 md:flex" aria-hidden>
          {c.scroll}
          <motion.span
            className="block h-10 w-px origin-top bg-white/40"
            animate={reduce ? undefined : { scaleY: [0, 1, 0], originY: [0, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </section>

      <Marquee items={[...c.stats.map((s) => `${s.value} ${s.label}`), 'IDM', 'BDM', 'BCM', 'BIM']} />

      {/* ═══ MANIFIESTO ═════════════════════════════════════════════════ */}
      <section id="manifiesto" className="w-full scroll-mt-20 bg-pmi-cream py-24 md:py-36">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <Eyebrow>{c.manifesto_badge}</Eyebrow>
          </motion.div>
          <ScrollWords
            text={c.manifesto}
            className="mt-10 font-display text-3xl font-medium leading-[1.25] tracking-[-0.015em] text-pmi-dark sm:text-4xl md:text-[46px]"
          />
        </div>
      </section>

      {/* ═══ MISIÓN + VISIÓN ════════════════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-px px-4 sm:px-6 lg:grid-cols-2 lg:gap-0 lg:px-8">
          {/* Misión */}
          <motion.div {...reveal} className="lg:pr-16">
            <Eyebrow>{c.mission_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-5xl">
              {c.mission_title}
            </h2>
            <ul className="mt-12 divide-y divide-pmi-dark/10 border-y border-pmi-dark/10">
              {c.mission_items.map((item, i) => {
                const Icon = MISSION_ICONS[i]
                return (
                  <li key={item.title} className="group flex gap-5 py-6">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-pmi-cream text-pmi-dark transition-colors group-hover:bg-pmi-dark group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-pmi-dark">{item.title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-pmi-dark/65">{item.desc}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Visión */}
          <motion.div
            {...reveal}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="relative mt-14 overflow-hidden rounded-3xl bg-[#070B16] p-8 text-white lg:mt-0 lg:p-12"
          >
            <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
            <div className="relative">
              <Eyebrow dark>{c.vision_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-5xl">
                {c.vision_title}
              </h2>
              <p className="mt-6 text-[15px] leading-relaxed text-white/60">{c.vision_text}</p>
              <ul className="mt-10 space-y-6">
                {c.vision_items.map((item, i) => {
                  const Icon = VISION_ICONS[i]
                  return (
                    <li key={item.title} className="flex gap-4">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-pmi-cyan" />
                      <div>
                        <h3 className="font-display text-base font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-white/50">{item.desc}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRAYECTORIA ════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-6">
            <Eyebrow>{c.story_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {c.story_title}
              <span className="block text-pmi-orange">{c.story_accent}</span>
            </h2>
            <div className="mt-8 space-y-5 text-[16px] leading-[1.8] text-pmi-dark/70">
              {c.story.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-3xl bg-pmi-dark/10 lg:col-span-6 lg:col-start-7">
            {c.stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex aspect-[4/3] flex-col justify-between bg-white p-6 lg:p-8"
              >
                <span className="h-1.5 w-8 rounded-full" style={{ backgroundColor: ['#00A3C4', '#E87722', '#5B2D8E', '#003B5C'][i] }} />
                <div>
                  <div className="font-display text-5xl font-semibold tracking-tight text-pmi-dark lg:text-6xl">
                    <CountUp value={s.value} />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-pmi-dark/55">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ QUÉ HACEMOS ════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <motion.div {...reveal} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>{c.do_badge}</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
                  {c.do_title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-pmi-dark/65">{c.do_desc}</p>
              </div>
            </motion.div>

            <div className="relative lg:col-span-7 lg:col-start-6">
              <div className="absolute bottom-0 left-[22px] top-0 hidden w-px bg-pmi-dark/10 sm:block" aria-hidden />
              <motion.div
                style={{ scaleY: reduce ? 1 : doLine }}
                className="absolute bottom-0 left-[21px] top-0 hidden w-0.5 origin-top bg-pmi-orange sm:block"
                aria-hidden
              />
              <ol ref={doRef} className="space-y-6">
                {c.do_items.map((item, i) => {
                  const Icon = DO_ICONS[i]
                  return (
                    <motion.li
                      key={item.title}
                      {...reveal}
                      transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="group relative sm:pl-16"
                    >
                      <span className="absolute left-0 top-6 z-10 hidden h-11 w-11 items-center justify-center rounded-full bg-pmi-dark text-white ring-4 ring-white transition-transform duration-300 group-hover:scale-110 sm:flex">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="rounded-2xl border border-pmi-dark/10 bg-pmi-cream p-6 transition-colors duration-300 group-hover:border-pmi-dark/30 lg:p-8">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="font-display text-xl font-semibold text-pmi-dark">{item.title}</h3>
                          <span className="font-display text-sm font-semibold tabular-nums text-pmi-orange">0{i + 1}</span>
                        </div>
                        <p className="mt-3 text-[15px] leading-relaxed text-pmi-dark/65">{item.desc}</p>
                      </div>
                    </motion.li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALORES ════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow dark>{c.values_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">
                {c.values_title}
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/50 md:col-span-5 md:justify-self-end">{c.values_desc}</p>
          </motion.div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {c.values.map((v, i) => {
              const Icon = VALUE_ICONS[i]
              return (
                <motion.div
                  key={v.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  onMouseMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                  }}
                  className="group relative overflow-hidden bg-[#0B1122] p-8 lg:p-10"
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(0,163,196,0.16), transparent 65%)' }}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <Icon className="h-6 w-6 text-pmi-cyan transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                      <span className="font-display text-sm font-semibold tabular-nums text-white/30">0{i + 1}</span>
                    </div>
                    <h3 className="mt-10 font-display text-2xl font-semibold">{v.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/55">{v.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ ALIANZAS ═══════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{c.partners_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {c.partners_title}
            </h2>
          </motion.div>
          <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {c.partners.map((label, i) => {
              const Icon = PARTNER_ICONS[i]
              return (
                <motion.li
                  key={label}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={reduce ? undefined : { y: -6 }}
                  className="flex aspect-square flex-col justify-between rounded-3xl border border-pmi-dark/10 bg-white p-6 lg:p-8"
                >
                  <Icon className="h-8 w-8 text-pmi-orange" />
                  <span className="font-display text-lg font-semibold leading-snug text-pmi-dark lg:text-xl">{label}</span>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ═══ GOBIERNO ═══════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div
            {...reveal}
            className="group relative overflow-hidden rounded-3xl bg-pmi-dark p-8 text-white md:p-14"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-pmi-cyan/20 blur-[90px] transition-transform duration-700 group-hover:scale-125" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Eyebrow dark>{c.gov_badge}</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[56px]">
                  {c.gov_title}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">{c.gov_desc}</p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  href={link('/about/gobierno')}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-white/90"
                >
                  {c.gov_cta}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA FINAL ══════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">
                {c.cta_title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{c.cta_desc}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Link
                href={link('/contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black"
              >
                {c.cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={link('/certifications')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-pmi-dark/10"
              >
                {c.cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
