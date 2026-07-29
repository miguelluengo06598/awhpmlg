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
    title: 'Referência Internacional',
    description: 'Posicionamos a AECOMI como referência em BIM e gestão da informação aplicada à construção.',
  },
  {
    icon: Target,
    title: 'Padrões de Qualidade',
    description: 'Desenvolvemos padrões profissionais que fazem a diferença no setor AEC.',
  },
  {
    icon: BookOpen,
    title: 'Formação Especializada',
    description: 'Promovemos a formação e o reconhecimento de competências alinhadas com o mercado.',
  },
]

const visionPilares = [
  {
    icon: Users,
    title: 'Profissionais Preparados',
    description:
      'Liderança em processos colaborativos complexos, formando especialistas capazes de gerir projetos multidisciplinares com excelência.',
  },
  {
    icon: Zap,
    title: 'Metodologias Eficientes',
    description:
      'Implementação de metodologias eficientes e sustentáveis que otimizam recursos e reduzem o impacto ambiental.',
  },
  {
    icon: TrendingUp,
    title: 'Excelência Contínua',
    description:
      'Trabalhamos em conjunto com especialistas internacionais, instituições académicas e empresas comprometidas com a inovação.',
  },
]

const valores = [
  {
    icon: Star,
    title: 'Excelência',
    description:
      'Procuramos os mais elevados padrões em cada certificação, processo e serviço que oferecemos.',
  },
  {
    icon: ShieldCheck,
    title: 'Ética',
    description:
      'Agimos com integridade, transparência e responsabilidade em todas as nossas relações profissionais.',
  },
  {
    icon: Lightbulb,
    title: 'Inovação',
    description:
      'Adotamos e promovemos tecnologias e metodologias emergentes que transformam a indústria.',
  },
  {
    icon: RefreshCw,
    title: 'Melhoria Contínua',
    description:
      'Avaliamos e aperfeiçoamos constantemente os nossos programas para nos mantermos na vanguarda.',
  },
]

// NEW SECTION 1: What We Do?
const queHacemosItems = [
  {
    icon: BadgeCheck,
    title: 'Certificações Profissionais',
    description:
      'Programas de certificação orientados a reconhecer as competências dos perfis BIM mais relevantes do setor AEC, alinhados com padrões internacionais.',
  },
  {
    icon: FlaskConical,
    title: 'Formação e Investigação',
    description:
      'Promovemos atividades de formação, investigação e divulgação de boas práticas em gestão da informação e transformação digital.',
  },
  {
    icon: UsersRound,
    title: 'Comunidade Internacional',
    description:
      'Criamos uma comunidade profissional que facilita a troca de conhecimento, a colaboração entre especialistas e o desenvolvimento de novas oportunidades.',
  },
  {
    icon: Scale,
    title: 'Padrões Globais',
    description:
      'Seguimos os padrões mais reconhecidos da profissão, um modelo para governos e operadores privados que proporciona uma linguagem global comum.',
  },
]

// NEW SECTION 2: Corporate Values
const valoresCorporativos = [
  {
    icon: Award,
    title: 'Excelência',
    description:
      'A responsabilidade, o reconhecimento de uma competência técnica excelente e o comportamento ético asseguram o nosso compromisso com todas as partes da cadeia de valor.',
  },
  {
    icon: Globe,
    title: 'Visão Global',
    description:
      'Reunir os membros da comunidade global e partilhar critérios é a melhor forma de melhorar a prática dos profissionais do setor.',
  },
  {
    icon: HeartHandshake,
    title: 'Compromisso',
    description:
      'Incentivamos a diversidade de pontos de vista para que as pessoas contribuam com o seu conhecimento e experiência, permitindo uma maior e melhor transformação do setor AEC.',
  },
]

const colaboradores = [
  { icon: Globe, label: 'Especialistas Internacionais' },
  { icon: GraduationCap, label: 'Instituições Académicas' },
  { icon: Building2, label: 'Empresas Inovadoras' },
  { icon: HardHat, label: 'Profissionais do Setor AEC' },
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
              Sobre nós
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Sobre a AECOMI
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Líderes em certificação BIM internacional. Desenvolvemos padrões, formamos
              profissionais e transformamos a indústria AEC com rigor e visão de futuro.
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
              Porque Existimos
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              A Nossa Missão
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A AECOMI nasceu com a vocação de se tornar uma referência internacional
              no campo do BIM e da gestão da informação aplicada à construção.
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
                      <span className="text-sm font-semibold leading-tight">Certificação Internacional</span>
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
                Para Onde Vamos
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight leading-[1.15]">
                A Nossa Visão
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Acreditamos que a transformação digital da indústria AEC exige profissionais
                preparados para liderar processos colaborativos complexos e organizações capazes
                de implementar metodologias eficientes e sustentáveis.
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
              A Nossa Atividade
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              O Que Fazemos?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A AECOMI desenvolve programas de certificação profissional orientados a reconhecer as
              competências dos perfis BIM mais relevantes do setor AEC.
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
              O Que Nos Define
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Os Nossos Valores
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A experiência acumulada pelas nossas equipas permite-nos oferecer um quadro
              sólido baseado em princípios que orientam cada decisão.
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
              Ideologia Central
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Valores Corporativos
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A AECOMI é impulsionada por uma missão clara e por um conjunto de valores que inspiram a
              forma como agimos. Estes valores são fundamentais, duradouros e profundamente
              enraizados, orientando o nosso comportamento em todos os momentos.
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
            Em tempos de crescimento e mudança, os nossos valores centrais proporcionam
            continuidade e uma bússola moral, comunicando as nossas convicções e orientando o nosso
            comportamento enquanto organização.
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
                Estrutura de Governo
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                Governo e Organização
              </h2>
              <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
                Descubra como a AECOMI garante a transparência, a qualidade e o cumprimento de
                princípios éticos através dos seus órgãos de governo.
              </p>
              <div className="mt-10">
                <Link
                  href="/pt/about/gobierno"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
                >
                  Descubra a nossa estrutura de governo
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
              Parcerias
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-pmi-dark tracking-tight">
              Trabalhamos com...
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
              Faça Parte da Mudança
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
              O nosso objetivo é contribuir para gerar uma cultura de trabalho mais integrada,
              transparente e orientada a acrescentar valor real aos projetos.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pt/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-pmi-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                Junte-se à AECOMI
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pt/certifications"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium rounded-full border border-white/30 hover:bg-white/10 transition-all text-base"
              >
                Explore as Nossas Certificações
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
