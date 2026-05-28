'use client'

import { motion } from 'framer-motion'
import {
  Target, BookOpen, Award, Users, Zap, TrendingUp,
  Star, ShieldCheck, Lightbulb, Globe, GraduationCap,
  Building2, HardHat, ArrowRight, BadgeCheck, FlaskConical,
  UsersRound, Scale, Clock, MapPin, BarChart3,
} from 'lucide-react'
import Link from 'next/link'

/* ─── Motion helpers ────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

const GRID_BG = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

/* ─── Data ──────────────────────────────────────────────────── */
const misionItems = [
  { icon: Globe,    text: 'Posicionamos a AECMI como referencia internacional en BIM y gestión de la información.' },
  { icon: Target,   text: 'Desarrollamos estándares profesionales que marcan la diferencia en el sector AEC.' },
  { icon: BookOpen, text: 'Impulsamos la formación y el reconocimiento de competencias alineadas al mercado.' },
]

const visionPilares = [
  { icon: Users,     title: 'Profesionales Preparados',  desc: 'Liderazgo en procesos colaborativos complejos y proyectos multidisciplinares.' },
  { icon: Zap,       title: 'Metodologías Eficientes',   desc: 'Implantación de metodologías sostenibles que optimizan recursos y reducen impacto.' },
  { icon: TrendingUp, title: 'Excelencia Continua',      desc: 'Trabajo conjunto con expertos internacionales, académicos y empresas innovadoras.' },
]

const queHacemos = [
  { icon: BadgeCheck, title: 'Certificaciones Profesionales', desc: 'Programas que reconocen las competencias de los perfiles BIM más relevantes, alineados con estándares internacionales.' },
  { icon: FlaskConical, title: 'Formación e Investigación',   desc: 'Promovemos actividades de formación, investigación y difusión de buenas prácticas en gestión de la información.' },
  { icon: UsersRound, title: 'Comunidad Internacional',       desc: 'Facilitamos el intercambio de conocimiento, la colaboración entre expertos y el desarrollo de nuevas oportunidades.' },
  { icon: Scale,      title: 'Estándares Globales',           desc: 'Seguimos los estándares más reconocidos en la profesión, proporcionando un lenguaje técnico común a nivel mundial.' },
]

const valores = [
  { icon: Star,       title: 'Excelencia',       desc: 'Buscamos los más altos estándares en cada certificación, proceso y servicio que ofrecemos.' },
  { icon: ShieldCheck, title: 'Ética',            desc: 'Actuamos con integridad, transparencia y responsabilidad en todas nuestras relaciones profesionales.' },
  { icon: Lightbulb,  title: 'Innovación',        desc: 'Adoptamos y promovemos tecnologías y metodologías emergentes que transforman la industria.' },
  { icon: Globe,      title: 'Visión Global',     desc: 'Reunir a la comunidad global y compartir criterios es la mejor forma de mejorar la práctica profesional.' },
]

const stats = [
  { value: '20+',    label: 'Años de experiencia',         icon: Clock },
  { value: '500+',   label: 'Profesionales certificados',  icon: Award },
  { value: '30+',    label: 'Países representados',        icon: MapPin },
  { value: '3',      label: 'Certificaciones activas',     icon: BadgeCheck },
]

const colaboradores = [
  { icon: Globe,         label: 'Expertos internacionales' },
  { icon: GraduationCap, label: 'Instituciones académicas' },
  { icon: Building2,     label: 'Empresas innovadoras' },
  { icon: HardHat,       label: 'Profesionales del sector AEC' },
]

/* ─── Page ──────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute -top-40 -right-40 w-[800px] h-[600px] rounded-full bg-pmi-blue/[0.07] blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-[11px] font-semibold tracking-widest text-white/60 uppercase bg-white/[0.06] rounded-full mb-7 border border-white/[0.1]">
              Conócenos
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.06] tracking-tight">
              Sobre AECMI
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/65 font-medium leading-relaxed max-w-2xl">
              Líderes en certificación BIM internacional
            </p>
            <p className="mt-4 text-base text-white/45 leading-[1.8] max-w-xl">
              AECMI es una organización internacional especializada en la certificación de competencias BIM para profesionales del sector AEC. Promovemos estándares globales, formación especializada y una comunidad comprometida con la transformación digital de la industria de la construcción.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <a
                href="#mision"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all shadow-md text-[15px]"
              >
                Nuestra historia
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 80L60 74C120 68 240 56 360 50C480 44 600 44 720 48C840 52 960 60 1080 64C1200 68 1320 68 1380 68L1440 68V80H1440V80H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ MISIÓN + VISIÓN ══════════════════════════════════════ */}
      <section id="mision" className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50 rounded-full mb-4 border border-blue-100/60">
              Por qué existimos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              Misión y Visión
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-7">
            {/* Misión */}
            <motion.div
              {...fadeUp(0.1)}
              className="p-8 lg:p-10 rounded-2xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-7 shadow-md">
                <Target className="w-7 h-7 text-white" />
              </div>
              <span className="inline-block text-[11px] font-bold text-pmi-blue uppercase tracking-widest mb-3">
                Misión
              </span>
              <h3 className="text-2xl font-bold text-pmi-dark mb-4 leading-snug">
                Nuestra Misión
              </h3>
              <p className="text-gray-600 leading-[1.8] mb-7">
                AECMI nace con la vocación de convertirse en una referencia internacional dentro del ámbito BIM y de la gestión de la información aplicada a la construcción. Certificamos competencias técnicas, estratégicas y de liderazgo en todas las fases del ciclo de vida de los proyectos.
              </p>
              <ul className="space-y-3">
                {misionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center mt-0.5">
                      <item.icon className="w-3.5 h-3.5 text-pmi-blue" />
                    </div>
                    <span className="text-sm text-gray-600 leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Visión */}
            <motion.div
              {...fadeUp(0.2)}
              className="p-8 lg:p-10 rounded-2xl bg-pmi-dark border border-pmi-dark hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-white/10 border border-white/15 rounded-2xl mb-7">
                <TrendingUp className="w-7 h-7 text-pmi-cyan" />
              </div>
              <span className="inline-block text-[11px] font-bold text-pmi-cyan uppercase tracking-widest mb-3">
                Visión
              </span>
              <h3 className="text-2xl font-bold text-white mb-4 leading-snug">
                Nuestra Visión
              </h3>
              <p className="text-white/60 leading-[1.8] mb-7">
                Creemos que la transformación digital de la industria AEC requiere profesionales preparados para liderar procesos colaborativos complejos y organizaciones capaces de implantar metodologías eficientes y sostenibles.
              </p>
              <ul className="space-y-4">
                {visionPilares.map((pilar, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center mt-0.5">
                      <pilar.icon className="w-3.5 h-3.5 text-pmi-cyan" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white/85">{pilar.title}</span>
                      <span className="text-sm text-white/45 ml-1.5 leading-relaxed">{pilar.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ HISTORIA ════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Text */}
            <motion.div {...fadeUp()}>
              <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-5 border border-gray-100">
                Nuestra trayectoria
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight leading-[1.15] mb-8">
                De una idea a un
                <span className="block text-pmi-blue">estándar global</span>
              </h2>
              <div className="space-y-5 text-gray-600 leading-[1.85]">
                <p>
                  AECMI surge de una necesidad real de la industria: contar con un marco internacional reconocido que permita validar las competencias de los profesionales que gestionan proyectos BIM. Un sector en plena transformación digital requería criterios claros, rigurosos y aplicables en cualquier contexto geográfico.
                </p>
                <p>
                  A lo largo de los años, hemos construido un ecosistema de certificación respaldado por expertos internacionales, instituciones académicas de prestigio y empresas comprometidas con la mejora continua. Nuestras certificaciones IDM, BDM y BCM cubren los roles más demandados en proyectos BIM multidisciplinares.
                </p>
                <p>
                  Hoy AECMI está presente en más de 30 países, con una comunidad activa de profesionales certificados que lideran la transformación digital del sector AEC en sus organizaciones.
                </p>
              </div>
            </motion.div>

            {/* Visual — milestone grid */}
            <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 gap-4">
              {[
                { value: '20+', label: 'Años de experiencia', icon: Clock, bg: 'bg-pmi-dark', text: 'text-white', sub: 'text-white/50' },
                { value: '500+', label: 'Profesionales certificados', icon: Award, bg: 'bg-pmi-blue', text: 'text-white', sub: 'text-white/60' },
                { value: '30+', label: 'Países representados', icon: MapPin, bg: 'bg-white', text: 'text-pmi-dark', sub: 'text-gray-500', border: true },
                { value: '3', label: 'Certificaciones activas', icon: BadgeCheck, bg: 'bg-pmi-cyan', text: 'text-white', sub: 'text-white/60' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex flex-col justify-between p-6 rounded-2xl ${item.bg} ${item.border ? 'border border-gray-100' : ''} aspect-square`}
                >
                  <item.icon className={`w-6 h-6 ${item.sub}`} />
                  <div>
                    <div className={`text-4xl font-extrabold tracking-tight ${item.text}`}>{item.value}</div>
                    <div className={`mt-1 text-[13px] font-medium leading-snug ${item.sub}`}>{item.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ QUÉ HACEMOS ═════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50 rounded-full mb-4 border border-blue-100/60">
              Nuestra actividad
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              ¿Qué Hacemos?
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              AECMI desarrolla programas de certificación orientados a reconocer las competencias de los perfiles BIM más relevantes dentro del sector AEC.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {queHacemos.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.08)}
                className="group p-7 rounded-2xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-xl mb-6 shadow-sm group-hover:scale-105 transition-transform">
                  <item.icon className="w-5.5 h-5.5 text-white" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-2.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALORES ══════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              Lo que nos define
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              Nuestros Valores
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Principios duraderos que guían cada decisión, proceso y relación en AECMI.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {valores.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeUp(i * 0.08)}
                className="p-7 rounded-2xl bg-white border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-pmi-dark rounded-xl mx-auto mb-5">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-2.5">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CIFRAS ══════════════════════════════════════════════ */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={GRID_BG} />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-cyan uppercase bg-white/[0.06] rounded-full mb-4 border border-white/[0.08]">
              En números
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              AECMI en Cifras
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                {...fadeUp(i * 0.08)}
                className="px-6 py-8 rounded-2xl bg-white/[0.04] border border-white/[0.06] text-center hover:bg-white/[0.07] hover:border-white/[0.1] transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-pmi-cyan/50 mx-auto mb-3" />
                <div className="text-4xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="mt-1.5 text-[11px] font-semibold text-white/30 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GOBIERNO CTA ════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-7">
            {/* Gobierno card */}
            <motion.div
              {...fadeUp(0.05)}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pmi-dark via-pmi-blue to-pmi-cyan p-8 lg:p-10 shadow-xl"
            >
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/[0.06] rounded-full pointer-events-none" />
              <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-white/70 uppercase bg-white/[0.1] rounded-full mb-5 border border-white/10">
                Estructura de Gobierno
              </span>
              <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                Gobierno y Organización
              </h3>
              <p className="text-white/60 leading-relaxed mb-7 text-sm">
                Descubre cómo AECMI garantiza la transparencia, la calidad y el cumplimiento de principios éticos a través de sus órganos de gobierno.
              </p>
              <Link
                href="/about/gobierno"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all text-sm shadow-sm"
              >
                Ver estructura de gobierno
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            {/* Guías card */}
            <motion.div
              {...fadeUp(0.1)}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5f8ff] to-white border border-[#dde8ff]/60 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-cert-idm/[0.05] rounded-full pointer-events-none" />
              <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-cert-idm uppercase bg-cert-idm-light rounded-full mb-5 border border-cert-idm/10">
                Recursos Técnicos
              </span>
              <h3 className="text-2xl font-bold text-pmi-dark mb-3 leading-snug">
                Guías y Estándares
              </h3>
              <p className="text-gray-500 leading-relaxed mb-7 text-sm">
                Explora nuestro marco común de estándares BIM, guías técnicas descargables y recursos especializados para la transformación digital del sector AEC.
              </p>
              <Link
                href="/about/guias-estandares"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cert-idm text-white font-semibold rounded-xl hover:bg-[#0055aa] transition-all text-sm shadow-sm"
              >
                Explorar guías y estándares
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ COLABORADORES ═══════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              Alianzas
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-pmi-dark tracking-tight">
              Trabajamos con…
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {colaboradores.map((item, i) => (
              <motion.div
                key={item.label}
                {...fadeUp(i * 0.08)}
                className="flex flex-col items-center text-center p-7 rounded-2xl bg-white border border-gray-100 hover:border-pmi-blue/20 hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-4 shadow-sm">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-sm font-semibold text-pmi-dark leading-snug">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={GRID_BG} />
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-pmi-cyan/10 via-pmi-blue/10 to-pmi-orange/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div {...fadeUp()} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Sé parte del cambio
            </h2>
            <p className="mt-5 text-base text-white/40 leading-relaxed max-w-lg mx-auto">
              Nuestro objetivo es contribuir a una cultura de trabajo más integrada, transparente y orientada a aportar valor real a los proyectos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-white/90 transition-all text-[15px] shadow-md"
              >
                Únete a AECMI
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/certifications"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white/70 font-medium rounded-xl border border-white/[0.14] hover:bg-white/[0.06] hover:text-white/90 transition-all text-[15px]"
              >
                Conoce nuestras certificaciones
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
