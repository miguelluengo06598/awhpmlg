'use client'

import { motion } from 'framer-motion'
import {
  Target,
  BookOpen,
  Award,
  Users,
  Zap,
  TrendingUp,
  Star,
  ShieldCheck,
  Lightbulb,
  RefreshCw,
  Globe,
  GraduationCap,
  Building2,
  HardHat,
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  UsersRound,
  Scale,
  HeartHandshake,
} from 'lucide-react'
import Link from 'next/link'

const misionItems = [
  {
    icon: Globe,
    title: 'International Reference',
    description: 'We position AECMI as a reference in BIM and information management applied to construction.',
  },
  {
    icon: Target,
    title: 'Quality Standards',
    description: 'We develop professional standards that make a difference in the AEC sector.',
  },
  {
    icon: BookOpen,
    title: 'Specialized Training',
    description: 'We promote training and the recognition of market-aligned competencies.',
  },
]

const visionPilares = [
  {
    icon: Users,
    title: 'Prepared Professionals',
    description:
      'Leadership in complex collaborative processes, training experts capable of managing multidisciplinary projects with excellence.',
  },
  {
    icon: Zap,
    title: 'Efficient Methodologies',
    description:
      'Implementation of efficient and sustainable methodologies that optimize resources and reduce environmental impact.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Excellence',
    description:
      'Working together with international experts, academic institutions, and companies committed to innovation.',
  },
]

const valores = [
  {
    icon: Star,
    title: 'Excellence',
    description:
      'We seek the highest standards in every certification, process, and service we offer.',
  },
  {
    icon: ShieldCheck,
    title: 'Ethics',
    description:
      'We act with integrity, transparency, and responsibility in all our professional relationships.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'We adopt and promote emerging technologies and methodologies that transform the industry.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement',
    description:
      'We constantly evaluate and refine our programs to stay at the forefront.',
  },
]

// NEW SECTION 1: What We Do?
const queHacemosItems = [
  {
    icon: BadgeCheck,
    title: 'Professional Certifications',
    description:
      'Certification programs aimed at recognizing the competencies of the most relevant BIM profiles in the AEC sector, aligned with international standards.',
  },
  {
    icon: FlaskConical,
    title: 'Training and Research',
    description:
      'We promote training activities, research, and dissemination of best practices in information management and digital transformation.',
  },
  {
    icon: UsersRound,
    title: 'International Community',
    description:
      'We create a professional community that facilitates knowledge exchange, collaboration among experts, and the development of new opportunities.',
  },
  {
    icon: Scale,
    title: 'Global Standards',
    description:
      'We follow the most recognized standards in the profession, a model for governments and private operators that provides a common global language.',
  },
]

// NEW SECTION 2: Corporate Values
const valoresCorporativos = [
  {
    icon: Award,
    title: 'Excellence',
    description:
      'Responsibility, recognition of excellent technical competence, and ethical behavior ensure our commitment to all parties in the value chain.',
  },
  {
    icon: Globe,
    title: 'Global Vision',
    description:
      'Bringing together members of the global community and sharing criteria is the best way to improve the practice of sector professionals.',
  },
  {
    icon: HeartHandshake,
    title: 'Commitment',
    description:
      'We encourage diverse points of view so that people contribute their knowledge and experience, enabling greater and better transformation of the AEC sector.',
  },
]

const colaboradores = [
  { icon: Globe, label: 'International Experts' },
  { icon: GraduationCap, label: 'Academic Institutions' },
  { icon: Building2, label: 'Innovative Companies' },
  { icon: HardHat, label: 'AEC Sector Professionals' },
]

export default function AboutPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full bg-gradient-to-br from-pmi-dark via-[#0A2540] to-pmi-blue overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-cyan-400 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/4" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 rounded-full mb-6 border border-white/10">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              About AECMI
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Leaders in international BIM certification. We develop standards, train
              professionals, and transform the AEC industry with rigor and future vision.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ========== MISSION ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Why We Exist
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Our Mission
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI was born with the vocation to become an international reference
              within the field of BIM and information management applied to construction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {misionItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== VISION ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - visual block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto lg:mx-0 rounded-[3rem] bg-gradient-to-br from-pmi-dark via-pmi-blue to-pmi-cyan p-1 shadow-2xl">
                <div className="w-full h-full rounded-[2.8rem] bg-white flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-8">
                    {visionPilares.map((pilar, i) => (
                      <div
                        key={pilar.title}
                        className={`flex flex-col items-center justify-center text-center p-4 rounded-2xl ${
                          i === 0
                            ? 'bg-pmi-dark text-white'
                            : i === 1
                            ? 'bg-pmi-blue text-white'
                            : 'bg-pmi-cream text-pmi-dark border border-gray-100'
                        }`}
                      >
                        <pilar.icon className="w-8 h-8 mb-2 opacity-90" />
                        <span className="text-sm font-semibold leading-tight">{pilar.title}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-gradient-to-br from-pmi-cyan to-blue-400 text-white">
                      <Award className="w-8 h-8 mb-2 opacity-90" />
                      <span className="text-sm font-semibold leading-tight">International Certification</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-4 rounded-[4rem] border-2 border-pmi-blue/10 pointer-events-none" />
            </motion.div>

            {/* Right - content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
                Where We Are Heading
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
                Our Vision
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                We believe that the digital transformation of the AEC industry requires professionals
                prepared to lead complex collaborative processes and organizations capable
                of implementing efficient and sustainable methodologies.
              </p>

              <div className="mt-10 space-y-6">
                {visionPilares.map((pilar, index) => (
                  <motion.div
                    key={pilar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-pmi-dark rounded-xl flex items-center justify-center">
                      <pilar.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-pmi-dark">{pilar.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{pilar.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== WHAT WE DO? (NEW) ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Our Activity
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              What We Do?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI develops professional certification programs aimed at recognizing the
              competencies of the most relevant BIM profiles within the AEC sector.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {queHacemosItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OUR VALUES (existing) ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              What Defines Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Our Values
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              The experience accumulated by our teams allows us to offer a solid
              framework based on principles that guide every decision.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-pmi-dark rounded-2xl mx-auto mb-6">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-pmi-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CORPORATE VALUES (NEW) ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Core Ideology
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Corporate Values
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              AECMI is driven by a clear mission and a set of values that inspire the
              way we act. These values are fundamental, enduring, and deeply
              rooted, guiding our behavior at all times.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {valoresCorporativos.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group p-8 rounded-3xl bg-pmi-cream border border-gray-100 hover:border-pmi-blue/20 hover:shadow-lg transition-all text-center"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pmi-dark to-pmi-blue rounded-2xl mb-6 shadow-md group-hover:scale-105 transition-transform mx-auto">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-pmi-dark mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            In times of growth and change, our core values provide
            continuity and a moral compass, communicating our beliefs and guiding our
            behavior as an organization.
          </motion.p>
        </div>
      </section>

      {/* ========== GOVERNANCE AND ORGANIZATION (CTA) ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pmi-dark via-pmi-blue to-pmi-cyan p-10 md:p-16 text-center shadow-2xl"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
            </div>
            <div className="relative">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-white/90 uppercase bg-white/10 rounded-full mb-6 border border-white/10">
                Governance Structure
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Governance and Organization
              </h2>
              <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Discover how AECMI guarantees transparency, quality, and compliance with
                ethical principles through its governance bodies.
              </p>
              <div className="mt-10">
                <Link
                  href="/en/about/gobierno"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
                >
                  Discover our governance structure
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== COLLABORATORS ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-pmi-blue uppercase bg-blue-50 rounded-full mb-4">
              Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              We Work With...
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {colaboradores.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-pmi-cream border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pmi-blue to-pmi-cyan rounded-2xl mb-5 shadow-md">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-base font-semibold text-pmi-dark">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="w-full bg-gradient-to-br from-pmi-blue via-[#0A2540] to-pmi-dark py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Be Part of the Change
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              Our goal is to help generate a more integrated,
              transparent work culture oriented toward delivering real value to projects.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Join AECMI
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/en/certifications"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                Explore Our Certifications
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
