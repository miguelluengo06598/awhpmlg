'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Users,
  Leaf,
  ArrowLeft,
  Home,
  ChevronRight,
  Landmark,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Mail,
  FileBadge,
  Compass,
  Star,
  Zap,
  FileText,
  Scale,
  Eye,
  Vote,
  Trophy,
  ClipboardList,
  Download,
  Lock,
} from 'lucide-react'

/* ─── Motion helpers ─────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.0, 0.0, 0.2, 1] as const },
  }),
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const GRID_BG: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

/* ─── Data ───────────────────────────────────────────────── */
const pilares = [
  {
    icon: Compass,
    title: 'Sabiduría Colectiva',
    description: 'Experiencia acumulada de profesionales de reconocido prestigio internacional que guían cada decisión estratégica.',
    gradient: 'from-violet-500 to-purple-600',
    bgSoft: 'bg-purple-50',
    border: 'border-purple-100',
  },
  {
    icon: Users,
    title: 'Diversidad',
    description: 'Múltiples perspectivas y backgrounds que enriquecen cada debate y fortalecen nuestras conclusiones.',
    gradient: 'from-sky-500 to-blue-600',
    bgSoft: 'bg-sky-50',
    border: 'border-sky-100',
  },
  {
    icon: Star,
    title: 'Excelencia',
    description: 'Calidad insuperable en cada decisión que garantiza el prestigio y la confianza en AECMI.',
    gradient: 'from-amber-400 to-orange-500',
    bgSoft: 'bg-amber-50',
    border: 'border-amber-100',
  },
  {
    icon: Leaf,
    title: 'Desarrollo Sostenible',
    description: 'Construimos el futuro del sector AEC con responsabilidad ambiental y visión de largo plazo.',
    gradient: 'from-emerald-400 to-teal-600',
    bgSoft: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
]

const principios = [
  { icon: Eye,          title: 'Transparencia',  desc: 'Todas nuestras decisiones son públicas, documentadas y justificadas ante la comunidad.' },
  { icon: Vote,         title: 'Participación',  desc: 'Procesos inclusivos que recogen las voces de expertos, instituciones y certificados.' },
  { icon: Trophy,       title: 'Meritocracia',   desc: 'Los roles de gobierno se asignan por competencia, experiencia y trayectoria demostrada.' },
  { icon: ClipboardList, title: 'Rendición de cuentas', desc: 'Los órganos de gobierno responden regularmente ante la comunidad sobre sus actuaciones.' },
]

const documents = [
  { icon: FileText,     title: 'Estatutos de AECMI',          type: 'PDF',                 locked: false },
  { icon: Scale,        title: 'Código de Ética',              type: 'PDF',                 locked: false },
  { icon: Eye,          title: 'Política de Transparencia',    type: 'PDF',                 locked: false },
  { icon: ClipboardList, title: 'Reporte Anual',               type: 'PDF',                 locked: false },
  { icon: Lock,         title: 'Actas de Junta Directiva',     type: 'Acceso restringido',  locked: true  },
  { icon: Compass,      title: 'Plan Estratégico',             type: 'PDF',                 locked: false },
]

const funcionesEjecutivo = [
  'Dirección y administración de AECMI',
  'Ejecución de actividades',
  'Cumplimiento de objetivos estratégicos',
  'Observancia de políticas de gobierno',
  'Cumplimiento de fines fundacionales',
]

const miembrosPlaceholder = [
  { nombre: 'Miembro del Consejo', cargo: 'Presidente',    especialidad: 'Estrategia & Gobierno' },
  { nombre: 'Miembro del Consejo', cargo: 'Vicepresidente', especialidad: 'Investigación BIM' },
  { nombre: 'Miembro del Consejo', cargo: 'Director',      especialidad: 'Certificaciones' },
  { nombre: 'Miembro del Consejo', cargo: 'Asesor',        especialidad: 'Buenas Prácticas' },
]

/* ─── Page ───────────────────────────────────────────────── */
export default function GobiernoPage() {
  return (
    <main className="min-h-screen bg-pmi-cream">

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#060B18]">
        <div className="absolute inset-0 opacity-[0.04]" style={GRID_BG} />
        <div className="absolute -top-32 -right-32 w-[700px] h-[500px] rounded-full bg-pmi-blue/[0.07] blur-[100px] pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white/55 hover:text-white text-sm mb-8 transition-colors bg-white/[0.06] px-4 py-2 rounded-full border border-white/[0.1]"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a Sobre nosotros
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]"
            >
              Gobierno y{' '}
              <span className="text-pmi-cyan">
                Organización
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-lg text-white/60 max-w-2xl leading-relaxed"
            >
              Estructura de gobierno transparente y ética, fundamentada en la excelencia y el desarrollo sostenible del sector AEC.
            </motion.p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50C240 90 480 10 720 50C960 90 1200 10 1440 50V100H0V50Z" fill="#FAF7F4" />
          </svg>
        </div>
      </section>

      {/* ══ INTRO ════════════════════════════════════════════ */}
      <section className="w-full pt-8 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-6 border border-blue-100">
              Gobierno y estructura
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Estructura de Gobierno AECMI
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-gray-600 leading-relaxed">
              La estructura de gobierno de AECMI está diseñada para garantizar la{' '}
              <span className="text-pmi-blue font-semibold">transparencia</span>, la{' '}
              <span className="text-pmi-blue font-semibold">calidad</span> y el cumplimiento de los
              principios éticos que inspiran todas nuestras actividades. El Gobierno de AECMI es
              dirigido por el <span className="text-pmi-blue font-semibold">Consejo Ejecutivo</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ ORG STRUCTURE ════════════════════════════════════ */}
      <section className="w-full pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            {/* Top node */}
            <div className="flex justify-center mb-0">
              <div className="px-8 py-4 bg-pmi-dark text-white font-bold text-base rounded-2xl shadow-md text-center">
                Gobierno de AECMI
              </div>
            </div>

            {/* Vertical connector */}
            <div className="flex justify-center">
              <div className="w-px h-8 bg-gray-300" />
            </div>

            {/* Single node */}
            <div className="flex justify-center">
              <div className="px-6 py-3 bg-gradient-to-br from-pmi-blue to-pmi-teal text-white text-sm font-semibold rounded-xl text-center leading-snug shadow-md">
                Consejo Ejecutivo
                <div className="text-[10px] font-normal text-white/60 mt-0.5">Dirección y Ejecución</div>
              </div>
            </div>

            {/* Note */}
            <p className="mt-8 text-center text-sm text-gray-400">
              El Consejo Ejecutivo dirige y administra AECMI para garantizar la excelencia de la organización
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ══ PILARES ══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-purple uppercase bg-purple-50 rounded-full mb-6 border border-purple-100">
              Fundamentos
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Los Pilares de Nuestro Gobierno
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pilares.map((pilar, i) => (
              <motion.div
                key={pilar.title}
                variants={fadeInUp}
                custom={i}
                className={`group relative bg-white rounded-3xl p-7 sm:p-8 border ${pilar.border} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pilar.gradient}`} />
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${pilar.bgSoft} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pilar.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <pilar.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{pilar.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{pilar.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ══ CONSEJO EJECUTIVO ════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-sky-50/50 via-pmi-cream to-gray-50/40" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pmi-cyan via-pmi-blue to-pmi-dark" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/40 to-cyan-200/40 rounded-[2.5rem] blur-2xl" />
                <div className="relative bg-gradient-to-br from-pmi-blue to-pmi-teal rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <Briefcase className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Consejo Ejecutivo</h3>
                      <p className="text-white/60 text-sm">Dirección y administración</p>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-white/20 to-transparent my-8" />
                  <div>
                    <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-5 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Miembros
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {miembrosPlaceholder.map((m, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.08 }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center shrink-0">
                            <GraduationCap className="w-5 h-5 text-white/50" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-white/90 text-sm font-medium truncate">{m.nombre}</p>
                            <p className="text-white/50 text-xs">{m.cargo}</p>
                            <p className="text-white/40 text-[11px] italic">{m.especialidad}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              custom={1}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <Zap className="w-3.5 h-3.5" />
                Órgano Operativo
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15] mb-6">
                Consejo Ejecutivo
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                La misión del Consejo Ejecutivo es dirigir y administrar AECMI para ejecutar las actividades de la
                organización, garantizando el cumplimiento de los objetivos estratégicos mediante la observancia de
                las políticas de gobierno rectoras que dan cumplimiento a nuestros fines fundacionales.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-pmi-dark uppercase tracking-wider mb-4">
                  Funciones principales
                </h4>
                {funcionesEjecutivo.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-sky-200 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ══ PRINCIPIOS DE GOBIERNO ═══════════════════════════ */}
      <section className="w-full py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-6 border border-blue-100">
              Principios
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Principios de Buen Gobierno
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Compromisos concretos que guían cómo AECMI toma decisiones y responde ante su comunidad.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {principios.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeInUp}
                custom={i}
                className="group p-7 rounded-2xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-pmi-dark rounded-xl mx-auto mb-5 group-hover:scale-105 transition-transform">
                  <p.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-pmi-dark mb-2.5">{p.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ══ DOCUMENTOS ═══════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 bg-pmi-cream">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-white rounded-full mb-6 border border-gray-100">
              Documentación
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Documentos y Políticas
            </h2>
            <p className="mt-5 text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
              Marco normativo que regula la actuación de AECMI y garantiza la transparencia ante la comunidad.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {documents.map((doc, i) => (
              <motion.a
                key={doc.title}
                variants={fadeInUp}
                custom={i}
                href="#"
                className={`group flex items-center gap-4 p-5 rounded-2xl bg-white border transition-all duration-300 ${
                  doc.locked
                    ? 'border-gray-100 opacity-60 cursor-not-allowed'
                    : 'border-gray-100 hover:border-pmi-blue/20 hover:shadow-md hover:-translate-y-0.5'
                }`}
                onClick={(e) => doc.locked && e.preventDefault()}
                aria-disabled={doc.locked}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${doc.locked ? 'bg-gray-100' : 'bg-blue-50 group-hover:bg-blue-100'} transition-colors`}>
                  <doc.icon className={`w-5 h-5 ${doc.locked ? 'text-gray-400' : 'text-pmi-blue'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-pmi-dark leading-snug">{doc.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{doc.type}</p>
                </div>
                {doc.locked ? (
                  <Lock className="w-4 h-4 text-gray-300 shrink-0" />
                ) : (
                  <Download className="w-4 h-4 text-gray-300 group-hover:text-pmi-blue transition-colors shrink-0" />
                )}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FOOTER CTA ═══════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 bg-[#060B18] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={GRID_BG} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pmi-cyan/[0.04] rounded-full blur-[80px] translate-x-1/3 -translate-y-1/4 pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-[1.15]">
              Conoce nuestro impacto
            </h2>
            <p className="text-base text-white/40 max-w-xl mx-auto mb-10 leading-relaxed">
              Explora nuestras certificaciones o ponte en contacto con nosotros para saber más sobre AECMI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white bg-pmi-orange rounded-xl hover:bg-pmi-orange/90 transition-all shadow-lg shadow-pmi-orange/20 hover:shadow-xl"
              >
                <FileBadge className="w-4 h-4" />
                Ver nuestras certificaciones
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-[15px] font-medium text-white/70 border border-white/[0.14] rounded-xl hover:bg-white/[0.06] hover:text-white/90 transition-all"
              >
                <Mail className="w-4 h-4" />
                Contacta con nosotros
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
