'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import {
  GraduationCap,
  School,
  Globe,
  Laptop,
  Building2,
  MapPin,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  Network,
  ArrowRight,
  Mail,
  ChevronDown,
  MessageSquare,
} from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

const GRID_BG: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.45 },
}

const academicPartners = [
  {
    name: 'Instituto BIM Global',
    location: 'Madrid, España',
    specialties: ['IDM', 'BDM', 'BCM'],
    description: 'Referente en formación BIM desde 2015. Certificados internacionalmente con metodología propia.',
    icon: School,
    color: 'from-blue-600 to-blue-800',
    border: 'border-blue-100',
  },
  {
    name: 'Universidad Politécnica',
    location: 'Barcelona, España',
    specialties: ['IDM', 'BDM'],
    description: 'Programa académico de postgrado con profesores especializados y experiencia de campo.',
    icon: GraduationCap,
    color: 'from-slate-600 to-slate-800',
    border: 'border-slate-100',
  },
  {
    name: 'Centro de Capacitación AEC',
    location: 'Valencia, España',
    specialties: ['BCM', 'BDM'],
    description: 'Especializado en construcción y gestión de proyectos BIM. Enfoque muy práctico.',
    icon: Building2,
    color: 'from-orange-600 to-red-800',
    border: 'border-orange-100',
  },
  {
    name: 'Escuela Digital de Arquitectura',
    location: 'Online',
    specialties: ['IDM', 'BDM', 'BCM'],
    description: 'Formación 100% online. Flexible y accesible desde cualquier lugar del mundo.',
    icon: Laptop,
    color: 'from-teal-600 to-emerald-800',
    border: 'border-teal-100',
  },
  {
    name: 'Academia BIM Internacional',
    location: 'Portugal',
    specialties: ['IDM', 'BDM', 'BCM'],
    description: 'Reconocida internacionalmente. Expertos con décadas de experiencia en el sector.',
    icon: Globe,
    color: 'from-purple-600 to-indigo-800',
    border: 'border-purple-100',
  },
  {
    name: 'Instituto de Gestión de Proyectos',
    location: 'Madrid, España',
    specialties: ['BCM'],
    description: 'Especializado en coordinación y gestión de obra con metodología BIM integral.',
    icon: Network,
    color: 'from-emerald-600 to-teal-800',
    border: 'border-emerald-100',
  },
]

const certColors: Record<string, string> = {
  IDM: 'bg-blue-600',
  BDM: 'bg-teal-600',
  BCM: 'bg-orange-600',
}

// Set to true once real partner data is confirmed and loaded above
const SHOW_ACADEMIC_PARTNERS = false

export default function FormationPage() {
  const { getLink, currentLang } = useTranslation()
  // Etiqueta 3-idiomas para textos que no están en el objeto translations.
  const L = (es: string, en: string, pt: string) =>
    currentLang === 'es' ? es : currentLang === 'en' ? en : pt
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const criteria = [
    {
      icon: Laptop,
      title: L('Modalidad', 'Format', 'Modalidade'),
      desc: L(
        'Elige entre online, presencial o híbrida según tu disponibilidad y preferencia de aprendizaje.',
        'Choose between online, in-person, or hybrid depending on your availability and learning preference.',
        'Escolha entre online, presencial ou híbrida conforme sua disponibilidade e preferência de aprendizado.',
      ),
    },
    {
      icon: Clock,
      title: L('Duración', 'Duration', 'Duração'),
      desc: L(
        'Los programas varían entre 8 y 16 semanas. Considera tu agenda laboral actual.',
        'Programs range from 8 to 16 weeks. Consider your current work schedule.',
        'Os programas variam de 8 a 16 semanas. Considere sua agenda de trabalho atual.',
      ),
    },
    {
      icon: Users,
      title: L('Experiencia del Instructor', 'Instructor Experience', 'Experiência do Instrutor'),
      desc: L(
        'Verifica que los instructores tengan experiencia práctica en la industria, no solo teórica.',
        'Check that instructors have hands-on industry experience, not just theoretical knowledge.',
        'Verifique se os instrutores têm experiência prática no setor, e não apenas teórica.',
      ),
    },
    {
      icon: DollarSign,
      title: L('Costo', 'Cost', 'Custo'),
      desc: L(
        'Compara precios pero considera la calidad. No siempre lo más caro es lo mejor.',
        'Compare prices but consider quality. The most expensive is not always the best.',
        'Compare preços, mas considere a qualidade. O mais caro nem sempre é o melhor.',
      ),
    },
    {
      icon: BarChart3,
      title: L('Tasa de Aprobación', 'Pass Rate', 'Taxa de Aprovação'),
      desc: L(
        'Pregunta por el porcentaje de estudiantes que aprueban el examen de certificación AECOMI.',
        'Ask about the percentage of students who pass the AECOMI certification exam.',
        'Pergunte qual é o percentual de alunos aprovados no exame de certificação AECOMI.',
      ),
    },
    {
      icon: Network,
      title: L('Comunidad', 'Community', 'Comunidade'),
      desc: L(
        'Una buena comunidad de estudiantes es valiosa para networking y apoyo mutuo.',
        'A good student community is valuable for networking and mutual support.',
        'Uma boa comunidade de alunos é valiosa para networking e apoio mútuo.',
      ),
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: L('Cuéntanos tus necesidades', 'Tell us your needs', 'Conte-nos suas necessidades'),
      desc: L(
        'Contacta con nuestro equipo y comparte tu experiencia, disponibilidad y objetivos profesionales.',
        'Contact our team and share your experience, availability, and professional goals.',
        'Fale com nossa equipe e compartilhe sua experiência, disponibilidade e objetivos profissionais.',
      ),
    },
    {
      number: '02',
      title: L('Análisis personalizado', 'Personalized analysis', 'Análise personalizada'),
      desc: L(
        'Analizamos qué certificación es ideal para tu perfil y qué entidad se adapta mejor a tu situación.',
        'We analyze which certification is ideal for your profile and which entity best fits your situation.',
        'Analisamos qual certificação é ideal para o seu perfil e qual instituição se adapta melhor à sua situação.',
      ),
    },
    {
      number: '03',
      title: L('Recomendación', 'Recommendation', 'Recomendação'),
      desc: L(
        'Te recomendamos 2-3 opciones con sus ventajas y desventajas claramente explicadas.',
        'We recommend 2-3 options with their advantages and disadvantages clearly explained.',
        'Recomendamos 2-3 opções com suas vantagens e desvantagens claramente explicadas.',
      ),
    },
    {
      number: '04',
      title: L('Apoyo durante la formación', 'Support during training', 'Apoio durante a formação'),
      desc: L(
        'Estamos disponibles para resolver dudas mientras realizas el curso preparatorio.',
        'We are available to answer questions while you take the preparatory course.',
        'Estamos disponíveis para tirar dúvidas enquanto você faz o curso preparatório.',
      ),
    },
    {
      number: '05',
      title: L('Examen y Certificación', 'Exam and Certification', 'Exame e Certificação'),
      desc: L(
        'Realizas el examen de certificación AECOMI y obtienes tu credencial profesional.',
        'You take the AECOMI certification exam and obtain your professional credential.',
        'Você faz o exame de certificação AECOMI e obtém sua credencial profissional.',
      ),
    },
  ]

  const faqs = [
    {
      question: L('¿AECOMI vende formación?', 'Does AECOMI sell training?', 'A AECOMI vende formação?'),
      answer: L(
        'No. AECOMI es el organismo certificador, no un proveedor de formación. Nosotros validamos y emitimos certificaciones. Recomendamos entidades académicas de calidad para que te prepares adecuadamente.',
        'No. AECOMI is the certifying body, not a training provider. We validate and issue certifications. We recommend quality academic entities so that you can prepare properly.',
        'Não. A AECOMI é o organismo certificador, não um provedor de formação. Nós validamos e emitimos certificações. Recomendamos instituições acadêmicas de qualidade para que você se prepare adequadamente.',
      ),
    },
    {
      question: L(
        '¿Puedo prepararme en otra entidad que no esté en la lista?',
        'Can I prepare at an entity that is not on the list?',
        'Posso me preparar em outra instituição que não esteja na lista?',
      ),
      answer: L(
        'Sí, puedes. La lista es de recomendaciones basadas en calidad verificada. Si encuentras otro proveedor que cumpla los estándares requeridos, puedes utilizarlo. Lo importante es que estés bien preparado para el examen AECOMI.',
        'Yes, you can. The list contains recommendations based on verified quality. If you find another provider that meets the required standards, you can use it. What matters is that you are well prepared for the AECOMI exam.',
        'Sim, pode. A lista traz recomendações baseadas em qualidade verificada. Se você encontrar outro provedor que atenda aos padrões exigidos, pode utilizá-lo. O importante é estar bem preparado para o exame AECOMI.',
      ),
    },
    {
      question: L(
        '¿Cuál es la diferencia entre las entidades recomendadas?',
        'What is the difference between the recommended entities?',
        'Qual é a diferença entre as instituições recomendadas?',
      ),
      answer: L(
        'Cada una tiene fortalezas distintas. Algunas son más teóricas, otras más prácticas. Algunas online, otras presenciales. Contáctanos y te recomendamos según tu perfil específico.',
        'Each one has different strengths. Some are more theoretical, others more practical. Some are online, others in person. Contact us and we will recommend one based on your specific profile.',
        'Cada uma tem pontos fortes diferentes. Algumas são mais teóricas, outras mais práticas. Algumas online, outras presenciais. Fale conosco e recomendamos de acordo com o seu perfil específico.',
      ),
    },
    {
      question: L(
        '¿Qué pasa si elijo una formación que no recomiendan?',
        'What if I choose training that you do not recommend?',
        'O que acontece se eu escolher uma formação que vocês não recomendam?',
      ),
      answer: L(
        'Nada cambia. Nuestras recomendaciones son orientativas. Al final, lo que importa es que apruebes el examen AECOMI. Muchos estudiantes de otros proveedores también obtienen la certificación exitosamente.',
        'Nothing changes. Our recommendations are only guidance. In the end, what matters is that you pass the AECOMI exam. Many students from other providers also obtain the certification successfully.',
        'Nada muda. Nossas recomendações são apenas orientativas. No fim, o que importa é você ser aprovado no exame AECOMI. Muitos alunos de outros provedores também obtêm a certificação com sucesso.',
      ),
    },
    {
      question: L(
        '¿Puedo estudiar sin hacer formación formal?',
        'Can I study without formal training?',
        'Posso estudar sem fazer uma formação formal?',
      ),
      answer: L(
        'Es difícil pero posible si tienes experiencia previa en BIM. La formación acelera el proceso y estructura el conocimiento de forma óptima. La recomendamos al 100% para mejores resultados.',
        'It is difficult but possible if you have prior BIM experience. Training speeds up the process and structures knowledge optimally. We recommend it 100% for better results.',
        'É difícil, mas possível se você já tem experiência prévia em BIM. A formação acelera o processo e estrutura o conhecimento de forma ideal. Recomendamos 100% para obter melhores resultados.',
      ),
    },
    {
      question: L(
        '¿Hacen descuentos para sus estudiantes?',
        'Do you offer discounts for students?',
        'Vocês oferecem descontos para os alunos?',
      ),
      answer: L(
        'Los descuentos dependen de cada entidad académica. Algunas ofrecen condiciones especiales para miembros de AECOMI. Consulta directamente con ellas mencionando que vienes de nuestra recomendación.',
        'Discounts depend on each academic entity. Some offer special conditions for AECOMI members. Ask them directly, mentioning that you come from our recommendation.',
        'Os descontos dependem de cada instituição acadêmica. Algumas oferecem condições especiais para membros da AECOMI. Consulte diretamente com elas mencionando que você veio por indicação nossa.',
      ),
    },
  ]

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full bg-pmi-blue/[0.07] blur-3xl pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 lg:py-44">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-cyan uppercase bg-white/[0.06] rounded-full mb-8 border border-white/[0.08]">
              {L('Formación BIM', 'Training', 'Formação BIM')}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
              {L('Formación en BIM', 'BIM Training', 'Formação em BIM')}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/60 leading-relaxed max-w-2xl">
              {L(
                'Recomendamos las mejores entidades académicas para tu preparación',
                'We recommend the best academic entities for your certification preparation',
                'Recomendamos as melhores instituições acadêmicas para a sua preparação',
              )}
            </p>
            <p className="mt-4 text-base text-white/40 leading-relaxed max-w-2xl">
              {L(
                'AECOMI no ofrece formación directa, pero hemos validado y aliado con las mejores instituciones académicas para que recibas una preparación de calidad.',
                'AECOMI does not offer training directly, but we have validated and partnered with the best academic institutions so you receive quality preparation.',
                'A AECOMI não oferece formação diretamente, mas validamos e firmamos parceria com as melhores instituições acadêmicas para que você receba uma preparação de qualidade.',
              )}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-pmi-dark bg-white rounded-full hover:bg-pmi-cream transition-all hover:-translate-y-0.5 shadow-lg"
              >
                <Mail className="w-5 h-5" />
                {L('Solicitar Asesoramiento', 'Request Advisory', 'Solicitar Orientação')}
              </Link>
              <Link
                href={getLink('/certifications')}
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white border border-white/20 rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5"
              >
                {L('Ver Certificaciones', 'View Certifications', 'Ver Certificações')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== PARTNERS ACADÉMICOS ========== */}
      {/* Hidden until real partner data is confirmed — flip SHOW_ACADEMIC_PARTNERS to true to enable */}
      {SHOW_ACADEMIC_PARTNERS && (
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {L('Entidades Recomendadas', 'Academic Partners', 'Instituições Recomendadas')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {L('Entidades Académicas Recomendadas', 'Recommended Academic Entities', 'Instituições Acadêmicas Recomendadas')}
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {L(
                'Hemos seleccionado estas instituciones por su excelencia académica, experiencia comprobada y resultados de sus estudiantes.',
                'We have selected these institutions for their academic excellence, proven experience, and student results.',
                'Selecionamos estas instituições por sua excelência acadêmica, experiência comprovada e pelos resultados de seus alunos.',
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicPartners.map((partner, idx) => {
              const Icon = partner.icon
              return (
                <motion.div
                  key={idx}
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden border ${partner.border} shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className={`bg-gradient-to-br ${partner.color} p-6 pb-8`}>
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{partner.name}</h3>
                    <p className="text-sm text-white/70 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {partner.location}
                    </p>
                  </div>
                  <div className="flex-1 flex flex-col bg-white p-6">
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">{partner.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {partner.specialties.map((spec) => (
                        <span
                          key={spec}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full text-white ${certColors[spec] ?? 'bg-gray-600'}`}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      )}

      {/* ========== CÓMO ELEGIR ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              {L('Guía de Selección', 'Selection Guide', 'Guia de Seleção')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {L('Cómo Elegir la Formación Correcta', 'How to Choose the Right Training', 'Como Escolher a Formação Certa')}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {criteria.map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="group p-7 rounded-2xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-blue-50 text-pmi-blue mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-pmi-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== PROCESO DE RECOMENDACIÓN ========== */}
      <section className="w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-blue-50/70 rounded-full mb-4 border border-blue-100/60">
              {L('Nuestro Proceso', 'Our Process', 'Nosso Processo')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {L('Nuestro Proceso de Recomendación', 'Our Recommendation Process', 'Nosso Processo de Recomendação')}
            </h2>
            <p className="mt-3 text-base text-gray-500 max-w-lg mx-auto">
              {L('Simple, personalizado y efectivo', 'Simple, personalized, and effective', 'Simples, personalizado e eficaz')}
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                {...staggerItem}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                className="flex gap-6 mb-10 last:mb-0"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-pmi-dark flex items-center justify-center shadow-lg shadow-black/10">
                    <span className="text-lg font-black text-white">{step.number}</span>
                  </div>
                  {idx < processSteps.length - 1 && (
                    <div className="w-0.5 flex-1 mt-3 bg-gradient-to-b from-gray-200 to-transparent" />
                  )}
                </div>
                <div className="pt-2 pb-8">
                  <h3 className="text-base font-bold text-pmi-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <section className="w-full bg-pmi-cream py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold tracking-widest text-pmi-blue uppercase bg-white rounded-full mb-4 border border-gray-100">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-pmi-dark tracking-tight">
              {L('Preguntas Frecuentes', 'Frequently Asked Questions', 'Perguntas Frequentes')}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                {...staggerItem}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="flex-1 text-sm font-bold text-pmi-dark">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="relative w-full bg-[#060B18] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pmi-blue/[0.06] blur-3xl pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-[1.1]">
              {L('¿Necesitas Asesoramiento Personalizado?', 'Need Personalized Advisory?', 'Precisa de Orientação Personalizada?')}
            </h2>
            <p className="mt-5 text-lg text-white/60 leading-relaxed">
              {L(
                'Contacta con nuestro equipo. Te ayudaremos a elegir la formación y entidad académica que mejor se adapte a tu perfil profesional.',
                'Contact our team. We will help you choose the training and academic entity that best suits your professional profile.',
                'Fale com nossa equipe. Vamos ajudar você a escolher a formação e a instituição acadêmica que melhor se adapta ao seu perfil profissional.',
              )}
            </p>
            <p className="mt-3 text-base text-white/40">
              formacion@aecomi.com &nbsp;·&nbsp; +34 91 234 5678
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-pmi-dark font-semibold rounded-xl hover:bg-pmi-cream transition-all shadow-lg text-[15px]"
              >
                <MessageSquare className="w-4 h-4" />
                {L('Solicitar Asesoramiento', 'Request Advisory', 'Solicitar Orientação')}
              </Link>
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white font-medium rounded-xl border border-white/20 hover:bg-white/5 transition-all text-[15px]"
              >
                <Mail className="w-4 h-4" />
                {L('Contactar por Email', 'Contact by Email', 'Entrar em contato por e-mail')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
