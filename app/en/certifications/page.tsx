'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  FileText,
  Search,
  CreditCard,
  GraduationCap,
  ArrowRight,
  ChevronDown,
  BookOpen,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  ClipboardList,
  Layers,
  HardHat,
  Calendar,
  Globe,
  MessageSquare,
  UserCheck,
  AlertCircle,
  Sparkles,
  Zap,
  Users,
  BarChart3,
  Rocket,
  FolderOpen,
  Settings,
  Users2,
  LineChart,
  Box,
  Wrench,
  Handshake,
  BadgeCheck,
  Clock,
  BookMarked,
  School,
  MessageCircle,
  Mail,
  FileBadge,
  ChevronRight,
  X,
} from 'lucide-react'

// ─── Animated Accordion ───
function AccordionItem({
  icon: Icon,
  title,
  children,
  defaultOpen = false,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-gray-200 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pmi-blue to-pmi-cyan flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-pmi-dark flex-1">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-0 text-gray-600 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── FAQ Item ───
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white hover:border-gray-200 transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
      >
        <span className="font-semibold text-pmi-dark text-left">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Data ───
const whyCards = [
  {
    icon: Globe,
    title: 'Global Recognition',
    description: 'International validation of your BIM competencies with world-class standards.',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  {
    icon: BarChart3,
    title: 'Market Demand',
    description: 'Certified BIM professionals are highly sought after by leading companies in the sector.',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  {
    icon: Rocket,
    title: 'Professional Growth',
    description: 'Access to better job opportunities and accelerated career development.',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
]

const certificaciones = [
  {
    icon: ClipboardList,
    title: 'Information Delivery Manager',
    level: 'Level: Advanced',
    description:
      'Strategic information management in BIM projects. CDE supervision and ISO 19650 compliance.',
    color: 'from-slate-700 to-blue-900',
    accent: 'bg-blue-500',
    border: 'border-blue-200',
    shadow: 'shadow-blue-200/50',
    softBg: 'bg-blue-50',
    skills: [FolderOpen, Settings, Users2, LineChart],
    slug: '/en/certifications/information-delivery-manager',
  },
  {
    icon: Layers,
    title: 'BIM Design Manager',
    level: 'Level: Intermediate',
    description:
      'Interdisciplinary coordination in the design phase. Audit of digital and federated models.',
    color: 'from-teal-600 to-emerald-800',
    accent: 'bg-teal-500',
    border: 'border-teal-200',
    shadow: 'shadow-teal-200/50',
    softBg: 'bg-teal-50',
    skills: [Box, Wrench, Handshake, BadgeCheck],
    slug: '/en/certifications/bim-design-manager',
  },
  {
    icon: HardHat,
    title: 'BIM Construction Manager',
    level: 'Nivel: Avanzado',
    description:
      'BIM implementation in the construction phase. Quality control and federated model management.',
    color: 'from-orange-600 to-red-800',
    accent: 'bg-orange-500',
    border: 'border-orange-200',
    shadow: 'shadow-orange-200/50',
    softBg: 'bg-orange-50',
    skills: [HardHat, Calendar, ShieldCheck, TrendingUp],
    slug: '/en/certifications/bim-construction-manager',
  },
]

const timelineSteps = [
  {
    icon: UserCheck,
    title: 'Eligibility',
    description: 'Verify that you meet the experience and training requirements.',
    color: 'bg-violet-500',
    soft: 'bg-violet-50',
  },
  {
    icon: FileText,
    title: 'Application',
    description: 'Complete your application with contact information and experience.',
    color: 'bg-blue-500',
    soft: 'bg-blue-50',
  },
  {
    icon: Search,
    title: 'Review',
    description: 'We validate your credentials and professional experience.',
    color: 'bg-cyan-500',
    soft: 'bg-cyan-50',
  },
  {
    icon: CreditCard,
    title: 'Payment',
    description: 'Secure payment system after eligibility approval.',
    color: 'bg-teal-500',
    soft: 'bg-teal-50',
  },
  {
    icon: GraduationCap,
    title: 'Examen',
    description: 'Technical exam + personal interview with a senior evaluator.',
    color: 'bg-emerald-500',
    soft: 'bg-emerald-50',
  },
]

const comparativa = [
  {
    label: 'Ideal Profile',
    values: [
      'Information and data managers',
      'BIM design coordinators',
      'BIM construction coordinators',
    ],
  },
  {
    label: 'Required Experience',
    values: ['5+ years in BIM management', '3+ years in BIM design', '5+ years in BIM construction'],
  },
  {
    label: 'Process Duration',
    values: ['~3-4 months', '~2-3 months', '~3-4 months'],
  },
  {
    label: 'Exam',
    values: ['Technical + Interview', 'Technical + Interview', 'Technical + Interview'],
  },
  {
    label: 'Retakes',
    values: ['3 in 1 year', '3 in 1 year', '3 in 1 year'],
  },
]

const consejos = [
  {
    icon: Clock,
    title: 'Gather Information in Advance',
    description: 'Gather your CV, certificates, and project evidence before starting.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: BookMarked,
    title: 'Review the Certification Manual',
    description: 'Each program has its manual. Read it carefully before the exam.',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    icon: School,
    title: 'Recommended Preparatory Course',
    description: 'Our preparatory courses significantly increase the pass rate.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: MessageCircle,
    title: 'Join a Study Group',
    description: 'Connect with other candidates and share knowledge in our community.',
    color: 'from-violet-500 to-purple-600',
  },
]

const faqGeneral = [
  {
    q: 'How do I obtain an AECOMI certification?',
    a: 'You must meet the eligibility criteria, complete the online application, pass the review of your experience, make the payment, and pass the technical exam along with the personal interview.',
  },
  {
    q: 'How do I complete the application?',
    a: 'The application is completed through our online portal. You will need contact information, your academic credentials, and a detailed description of your professional experience in BIM projects.',
  },
  {
    q: 'What documentation should I submit?',
    a: 'Generally required: official identification, detailed CV, academic certificates, professional references, and evidence of projects in which you have participated.',
  },
]

const faqExamen = [
  {
    q: 'How do I schedule an exam appointment?',
    a: 'Once your eligibility is approved, you will receive a link to access the exam calendar and select the date and time that best suits your availability.',
  },
  {
    q: 'Where is the exam held?',
    a: 'Exams are conducted online through our secure platform. We also have physical centers in selected cities.',
  },
  {
    q: 'Are exams available in other languages?',
    a: 'Currently exams are available in Spanish and English. We are working to add more languages soon.',
  },
  {
    q: 'If I do not pass, can I retake it?',
    a: 'Yes, you have up to 3 attempts during a one-year period from the approval of your eligibility.',
  },
  {
    q: 'What happens if my eligibility expires?',
    a: 'If your eligibility period expires, you must submit a new complete application and pay the corresponding fee.',
  },
  {
    q: 'How do I schedule my personal interview?',
    a: 'After passing the technical exam, our team will contact you to coordinate the personal interview with an AECOMI senior evaluator.',
  },
  {
    q: 'How do I conduct my personal interview?',
    a: 'The interview is conducted virtually via video call. Your technical and transversal competencies will be evaluated over 45-60 minutes.',
  },
  {
    q: 'Who conducts the interview?',
    a: 'The interview is conducted by a senior evaluator certified by AECOMI with extensive experience in international BIM project management.',
  },
  {
    q: 'What happens if I do not meet the requirements?',
    a: 'If you do not meet the requirements at any stage, you will receive detailed feedback and can reapply after a defined waiting period.',
  },
]

// ─── Main Page ───
export default function CertificationsPage() {
  const [activeFaqTab, setActiveFaqTab] = useState<'general' | 'examen'>('general')
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-pmi-cream">
      {/* ═══════════════════════════════════════════
          1. HERO EPICO
      ═══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#0B1D3F] via-[#0F2B5E] to-[#1a4a8a]">
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-[0.07]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cert-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="24" cy="24" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cert-grid)" />
          </svg>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4" />

        {/* Iconos flotantes decorativos */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[10%] text-white/10 hidden lg:block"
        >
          <Award className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-32 right-[12%] text-white/10 hidden lg:block"
        >
          <Globe className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-[20%] text-white/5 hidden lg:block"
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.0, 0.0, 0.2, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 rounded-full mb-8 border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Profesionales BIM de clase mundial
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]"
            >
              Professional{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                BIM Certifications
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed"
            >
              International Recognition <span className="text-white/40 mx-2">|</span> Global Standards
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5"
              >
                <Zap className="w-5 h-5" />
                Start Your Certification
              </Link>
              <Link
                href="#certificaciones"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                Explorar programas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
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

      {/* ═══════════════════════════════════════════
          2. WHY GET CERTIFIED?
      ═══════════════════════════════════════════ */}
      <section className="w-full pt-8 pb-20 sm:pb-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-6 border border-blue-100">
              Ventajas
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Why Get Certified with AECOMI?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group relative bg-white rounded-3xl p-8 border ${card.border} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.gradient}`} />
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{card.title}</h3>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          3. AVAILABLE CERTIFICATIONS
      ═══════════════════════════════════════════ */}
      <section id="certificaciones" className="w-full py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-purple uppercase bg-purple-50 rounded-full mb-6 border border-purple-100">
              Programas
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Our Certifications
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {certificaciones.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`group relative flex flex-col rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border ${cert.border}`}
              >
                {/* Card header with gradient */}
                <div className={`relative bg-gradient-to-br ${cert.color} p-8 pb-10`}>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur-sm rounded-full border border-white/10">
                      {cert.level}
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-5">
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{cert.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{cert.description}</p>
                </div>

                {/* Skills icons */}
                <div className={`${cert.softBg} p-6`}>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Key Competencies
                  </p>
                  <div className="flex items-center gap-3">
                    {cert.skills.map((SkillIcon, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-xl ${cert.accent} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                      >
                        <SkillIcon className="w-5 h-5 text-gray-700" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white p-6 pt-4 mt-auto flex flex-col gap-3">
                  <Link
                    href={cert.slug}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-xl bg-gradient-to-r ${cert.color} hover:shadow-lg transition-all hover:-translate-y-0.5`}
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href={cert.slug}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          4. TIMELINE VISUAL
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-teal uppercase bg-teal-50 rounded-full mb-6 border border-teal-100">
              5 Steps
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Path to Your Certification
            </h2>
          </motion.div>

          {/* Desktop Timeline horizontal */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-12 left-[10%] right-[10%] h-1 bg-gray-100 rounded-full">
                <motion.div
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 rounded-full"
                />
              </div>

              <div className="relative grid grid-cols-5 gap-4">
                {timelineSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="flex flex-col items-center text-center cursor-pointer"
                    onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className={`relative z-10 w-24 h-24 rounded-full ${step.color} flex items-center justify-center shadow-lg shadow-gray-200 mb-6`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                      <div className="absolute -bottom-2 w-8 h-8 rounded-full bg-white border-4 border-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        {index + 1}
                      </div>
                    </motion.div>
                    <h4 className="text-sm font-bold text-pmi-dark mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-[180px]">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline vertical */}
          <div className="md:hidden space-y-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center shadow-md shrink-0`}>
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="w-0.5 h-10 bg-gradient-to-b from-gray-200 to-gray-100 mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">Paso {index + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-pmi-dark">{step.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Detail popover for desktop timeline */}
          <AnimatePresence>
            {selectedStep !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="hidden md:block mt-10"
              >
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 shadow-lg max-w-3xl mx-auto">
                  <button
                    onClick={() => setSelectedStep(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl ${timelineSteps[selectedStep].color} flex items-center justify-center`}>
                      {(() => {
                        const Icon = timelineSteps[selectedStep].icon
                        return <Icon className="w-6 h-6 text-white" />
                      })()}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-pmi-dark">{timelineSteps[selectedStep].title}</h4>
                      <p className="text-sm text-gray-500">Paso {selectedStep + 1} de 5</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{timelineSteps[selectedStep].description}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          5. COMPARISON TABLE
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-orange uppercase bg-orange-50 rounded-full mb-6 border border-orange-100">
              Comparativa
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Find Your Certification
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-wider">
                Feature
              </div>
              {certificaciones.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`text-center p-4 rounded-xl transition-colors ${hoveredCol === i ? cert.softBg : ''}`}
                  onMouseEnter={() => setHoveredCol(i)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-3 shadow-md`}
                  >
                    <cert.icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-bold text-pmi-dark leading-tight">{cert.title}</p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {comparativa.map((row, ri) => (
              <div
                key={row.label}
                className={`grid grid-cols-4 gap-4 p-5 items-center ${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} hover:bg-gray-50 transition-colors`}
              >
                <div className="text-sm font-semibold text-gray-600">{row.label}</div>
                {row.values.map((val, ci) => (
                  <div
                    key={ci}
                    className={`text-center text-sm text-gray-700 p-3 rounded-xl transition-colors ${
                      hoveredCol === ci ? certificaciones[ci].softBg : ''
                    }`}
                    onMouseEnter={() => setHoveredCol(ci)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-4 gap-4 p-5 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100 items-center">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-wider" />
              {certificaciones.map((cert, i) => (
                <div
                  key={cert.title}
                  className={`text-center p-2 rounded-xl transition-colors ${hoveredCol === i ? cert.softBg : ''}`}
                  onMouseEnter={() => setHoveredCol(i)}
                  onMouseLeave={() => setHoveredCol(null)}
                >
                  <Link
                    href={cert.slug}
                    className={`inline-flex items-center gap-1 px-4 py-2 text-xs font-bold text-white rounded-lg bg-gradient-to-r ${cert.color} hover:shadow-md transition-all`}
                  >
                    Choose This
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          6. DETAILED PROCESS - ACCORDION
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-6 border border-blue-100">
              In Depth
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Process Details
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            <AccordionItem icon={UserCheck} title="Step 1: Meet Eligibility Criteria" defaultOpen>
              <div className="space-y-3">
                <p>
                  Requires experience and specialized knowledge in BIM management. Review the corresponding certification
                  manual to learn about the specific requirements of each program.
                </p>
                <ul className="space-y-2">
                  {['Demonstrable experience in BIM projects', 'Related academic training', 'Professional references'].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </AccordionItem>
            <AccordionItem icon={FileText} title="Step 2: Complete Application">
              <p>
                Provide contact information, education, and professional experience. You have{' '}
                <strong>100 days</strong> to complete your application once started.
              </p>
            </AccordionItem>
            <AccordionItem icon={Search} title="Step 3: Application Review">
              <p>
                Verification of eligibility criteria and validation of experience. The process takes approximately{' '}
                <strong>15 business days</strong>.
              </p>
            </AccordionItem>
            <AccordionItem icon={CreditCard} title="Step 4: Payment">
              <p>
                Secure online payment system to complete your registration. You only pay{' '}
                <strong>after your eligibility is approved</strong>.
              </p>
            </AccordionItem>
            <AccordionItem icon={GraduationCap} title="Step 5: Schedule Exam and Interview">
              <p>
                Technical competency exam and personal interview with evaluators. You have{' '}
                <strong>1 year with 3 attempts</strong> to pass.
              </p>
            </AccordionItem>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          7. CONSEJOS - CARDS VISUALES
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-purple uppercase bg-purple-50 rounded-full mb-6 border border-purple-100">
              Tips
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Consejos para Aprobar
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {consejos.map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative"
              >
                <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${tip.color}`} />
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <tip.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-pmi-dark mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          8. RENEWAL AND REGISTRY
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Renewal */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pmi-dark via-pmi-blue to-pmi-cyan p-10 sm:p-12 text-white shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-6">
                  <RefreshCw className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Maintain Your Certification</h3>
                <p className="text-white/70 leading-relaxed mb-8">
                  AECOMI certifications require periodic renewal processes aimed at ensuring that
                  professionals keep their knowledge and competencies up to date.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pmi-dark font-bold rounded-xl hover:bg-white/90 transition-all shadow-lg">
                  Renewal Information
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Derecha: Registro */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gray-50 to-white p-10 sm:p-12 border border-gray-100 shadow-xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-pmi-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pmi-blue to-pmi-cyan flex items-center justify-center mb-6 shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-pmi-dark mb-4">Register Publicly</h3>
                <p className="text-gray-600 leading-relaxed mb-8">
                  AECOMI maintains an updated registry of certified professionals to provide transparency and
                  trust to the market. Verify credentials quickly and securely.
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-pmi-dark text-white font-bold rounded-xl hover:bg-pmi-blue transition-all shadow-lg">
                  View Certificate Registry
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* ═══════════════════════════════════════════
          9. FAQ - TABS + ACCORDION
      ═══════════════════════════════════════════ */}
      <section className="w-full py-20 sm:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-pmi-teal uppercase bg-teal-50 rounded-full mb-6 border border-teal-100">
              Ayuda
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
              Preguntas Frecuentes
            </h2>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {[
              { key: 'general' as const, label: 'General', icon: MessageSquare },
              { key: 'examen' as const, label: 'Examen y Entrevista', icon: GraduationCap },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFaqTab(tab.key)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFaqTab === tab.key
                    ? 'bg-pmi-dark text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFaqTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto space-y-3"
            >
              {(activeFaqTab === 'general' ? faqGeneral : faqExamen).map((faq) => (
                <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          10. FOOTER CTA
      ═══════════════════════════════════════════ */}
      <section className="w-full bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-dots" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-dots)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              Ready to Transform{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200">
                Your Career?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/60 max-w-xl mx-auto mb-10">
              Join thousands of certified professionals who are already leading the digital transformation of the
              AEC sector.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5"
              >
                <FileBadge className="w-5 h-5" />
                Apply for Certification
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                <Mail className="w-5 h-5" />
                Contacta con Nosotros
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
              {[
                { value: '500+', label: 'Profesionales' },
                { value: '3', label: 'Certificaciones' },
                { value: '100%', label: 'Verificable' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-wider font-semibold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
