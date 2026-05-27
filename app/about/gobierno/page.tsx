'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain,
  Users,
  Award,
  Leaf,
  Lightbulb,
  Shield,
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
  Globe,
  Zap,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const pilares = [
  {
    icon: Compass,
    title: 'Sabiduría Colectiva',
    description: 'Experiencia acumulada de profesionales de reconocido prestigio internacional que guían cada decisión estratégica.',
    gradient: 'from-violet-500 to-purple-600',
    bgSoft: 'bg-purple-50',
    border: 'border-purple-100',
    text: 'text-purple-700',
    shadow: 'shadow-purple-200/50',
  },
  {
    icon: Users,
    title: 'Diversidad',
    description: 'Múltiples perspectivas y backgrounds que enriquecen cada debate y fortalecen nuestras conclusiones.',
    gradient: 'from-sky-500 to-blue-600',
    bgSoft: 'bg-sky-50',
    border: 'border-sky-100',
    text: 'text-sky-700',
    shadow: 'shadow-sky-200/50',
  },
  {
    icon: Star,
    title: 'Excelencia',
    description: 'Calidad insuperable en cada decisión que garantiza el prestigio y la confianza en AECMI.',
    gradient: 'from-amber-400 to-orange-500',
    bgSoft: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    shadow: 'shadow-amber-200/50',
  },
  {
    icon: Leaf,
    title: 'Desarrollo Sostenible',
    description: 'Construimos el futuro del sector AEC con responsabilidad ambiental y visión de largo plazo.',
    gradient: 'from-emerald-400 to-teal-600',
    bgSoft: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    shadow: 'shadow-emerald-200/50',
  },
]

const funcionesAsesor = [
  'Definir estándares y requisitos de certificación',
  'Establecer mapa de competencias',
  'Orientar líneas de investigación',
  'Guiar buenas prácticas BIM',
  'Asegurar calidad y relevancia',
]

const funcionesEjecutivo = [
  'Dirección y administración de AECMI',
  'Ejecución de actividades',
  'Cumplimiento de objetivos estratégicos',
  'Observancia de políticas de gobierno',
  'Cumplimiento de fines fundacionales',
]

const miembrosPlaceholder = [
  { nombre: 'Miembro del Consejo', cargo: 'Presidente', especialidad: 'Estrategia & Gobierno' },
  { nombre: 'Miembro del Consejo', cargo: 'Vicepresidente', especialidad: 'Investigación BIM' },
  { nombre: 'Miembro del Consejo', cargo: 'Director', especialidad: 'Certificaciones' },
  { nombre: 'Miembro del Consejo', cargo: 'Asesor', especialidad: 'Buenas Prácticas' },
]

export default function GobiernoPage() {
  return (
    <main className="min-h-screen bg-pmi-cream">
      {/* Breadcrumb */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-[104px] z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="flex items-center gap-1 hover:text-pmi-purple transition-colors">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/about" className="hover:text-pmi-purple transition-colors">
              Sobre nosotros
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">Gobierno y Organización</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B1D3F] via-[#0F2B5E] to-[#1a4a8a]">
        {/* Patrón geométrico */}
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>
        {/* Círculos decorativos */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }}
            className="max-w-3xl"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                Organización
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-xl text-white/70 max-w-2xl leading-relaxed"
            >
              Estructura de gobierno transparente y ética, fundamentada en la excelencia y el desarrollo sostenible del sector AEC.
            </motion.p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 50C240 90 480 10 720 50C960 90 1200 10 1440 50V100H0V50Z"
              fill="#FAF7F4"
            />
          </svg>
        </div>
      </section>

      {/* Introducción */}
      <section className="w-full pt-8 pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-6 border border-blue-100">
              Dos órganos, un solo propósito
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Estructura de Gobierno AECMI
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-gray-600 leading-relaxed">
              La estructura de gobierno de AECMI está diseñada para garantizar la{' '}
              <span className="text-pmi-blue font-semibold">transparencia</span>, la{' '}
              <span className="text-pmi-blue font-semibold">calidad</span> y el cumplimiento de los
              principios éticos que inspiran todas nuestras actividades y procesos de certificación.
              El Gobierno de AECMI es regido por dos órganos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Pilares */}
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
                {/* Gradient top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pilar.gradient}`} />
                {/* Soft bg circle on hover */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${pilar.bgSoft} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pilar.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                  >
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

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Consejo Asesor */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden">
        {/* Fondo sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/60 via-pmi-cream to-blue-50/40" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pmi-purple via-pmi-blue to-pmi-cyan" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Órgano Estratégico
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15] mb-6">
                Consejo Asesor
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                Está integrado por profesionales y especialistas de reconocido prestigio internacional. La misión del
                Consejo Asesor es definir los estándares a seguir por AECMI, así como los requisitos a cumplir y el
                mapa de competencias exigidos en las diferentes certificaciones, orientar las líneas de investigación
                del instituto, guiar la definición de buenas prácticas en los usos de BIM así como su implantación en
                las organizaciones.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-pmi-dark uppercase tracking-wider mb-4">
                  Funciones principales
                </h4>
                {funcionesAsesor.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="flex items-start gap-3 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-purple-200 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeInUp}
              custom={1}
              className="order-1 lg:order-2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-200/40 to-cyan-200/40 rounded-[2.5rem] blur-2xl" />
                <div className="relative bg-gradient-to-br from-pmi-purple to-pmi-darkblue rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <Landmark className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Consejo Asesor</h3>
                      <p className="text-white/60 text-sm">Visión estratégica y estándares</p>
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
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Consejo Ejecutivo */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden">
        {/* Fondo sutil */}
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

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Sinergia */}
      <section className="w-full py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-pmi-cream to-purple-50/30" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-purple uppercase bg-purple-50 rounded-full mb-6 border border-purple-100">
              Sinergia
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Sinergia y Colaboración
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-100/40 via-cyan-50/30 to-blue-100/40 rounded-[3rem] blur-2xl" />
            <div className="relative bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-gray-100 shadow-xl">
              <div className="flex flex-col items-center">
                {/* Diagrama visual */}
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-12 w-full justify-center">
                  {/* Círculo Consejo Asesor */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-pmi-purple to-pmi-darkblue flex flex-col items-center justify-center text-white shadow-xl shadow-purple-200/50"
                  >
                    <Landmark className="w-8 h-8 mb-2 opacity-90" />
                    <span className="text-sm font-bold text-center px-4">Consejo Asesor</span>
                    <span className="text-[11px] text-white/60 mt-1">Estrategia</span>
                  </motion.div>

                  {/* Conector */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="hidden sm:flex items-center gap-0">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-0.5 bg-gradient-to-r from-purple-300 to-cyan-300"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <ArrowRight className="w-5 h-5 text-cyan-400 -ml-1" />
                      </motion.div>
                    </div>
                    <div className="sm:hidden">
                      <ArrowRight className="w-5 h-5 text-cyan-400 rotate-90" />
                    </div>
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                      className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1"
                    >
                      Colaboración
                    </motion.span>
                    <div className="hidden sm:flex items-center gap-0">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="h-0.5 bg-gradient-to-r from-cyan-300 to-blue-300"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                      >
                        <ArrowRight className="w-5 h-5 text-blue-400 -ml-1 rotate-180" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Círculo Consejo Ejecutivo */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-pmi-blue to-pmi-teal flex flex-col items-center justify-center text-white shadow-xl shadow-blue-200/50"
                  >
                    <Briefcase className="w-8 h-8 mb-2 opacity-90" />
                    <span className="text-sm font-bold text-center px-4">Consejo Ejecutivo</span>
                    <span className="text-[11px] text-white/60 mt-1">Ejecución</span>
                  </motion.div>
                </div>

                <div className="w-full max-w-2xl">
                  <p className="text-gray-700 text-lg leading-relaxed text-center">
                    Ambos órganos trabajan conjuntamente para consolidar una institución orientada a la excelencia y
                    al desarrollo sostenible del sector AEC. La sabiduría colectiva, la experiencia, la diversidad y
                    la pasión de los miembros integrantes de los dos órganos de gobierno de AECMI son los pilares
                    sobre los que se establecen y ejecutan nuestra ideología, propósito y valores centrales.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
                  {[
                    { label: 'Transparencia', color: 'bg-purple-100 text-purple-700 border-purple-200' },
                    { label: 'Calidad', color: 'bg-blue-100 text-blue-700 border-blue-200' },
                    { label: 'Ética', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
                    { label: 'Sostenibilidad', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                  ].map((tag) => (
                    <motion.div
                      key={tag.label}
                      whileHover={{ scale: 1.05 }}
                      className={`text-center py-2.5 rounded-xl text-sm font-semibold border ${tag.color} transition-colors`}
                    >
                      {tag.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Footer CTA */}
      <section className="w-full py-20 sm:py-28 bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-8 leading-[1.15]">
              Conoce nuestro impacto
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
              Explora nuestras certificaciones o ponte en contacto con nosotros para saber más.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/certifications"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-pmi-orange rounded-full hover:bg-pmi-orange/90 transition-all shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5"
              >
                <FileBadge className="w-5 h-5" />
                Ver nuestras certificaciones
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5" />
                Contacta con nosotros
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
