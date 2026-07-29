'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Clock, ArrowRight, HelpCircle, Mail } from 'lucide-react'
import Link from 'next/link'

/** Valor con una variante por idioma soportado. */
type Localized<T> = Record<'es' | 'en' | 'pt', T>

export interface CertificationOption {
  id: string
  name: string
  /** Nombre comercial: no se traduce, es el mismo en los tres idiomas. */
  displayName: string
  description: Localized<string>
  color: string
  requirements: Localized<string[]>
  duration: Localized<string>
}

const CERTIFICATIONS: CertificationOption[] = [
  {
    id: 'Information_Delivery_Manager',
    name: 'information-delivery-manager',
    displayName: 'Information Delivery Manager',
    description: {
      es: 'Especialista en gestión estratégica de información BIM',
      en: 'Specialist in strategic BIM information management',
      pt: 'Especialista em gestão estratégica de informação BIM',
    },
    color: '#0066CC',
    requirements: {
      es: [
        '3+ años de experiencia en BIM',
        'Conocimiento de ISO 19650',
        'Experiencia en gestión de información',
      ],
      en: [
        '3+ years of BIM experience',
        'Knowledge of ISO 19650',
        'Experience in information management',
      ],
      pt: [
        '3+ anos de experiência em BIM',
        'Conhecimento da ISO 19650',
        'Experiência em gestão de informação',
      ],
    },
    duration: { es: '12-16 semanas', en: '12-16 weeks', pt: '12-16 semanas' },
  },
  {
    id: 'BIM_Design_Manager',
    name: 'bim-design-manager',
    displayName: 'BIM Design Manager',
    description: {
      es: 'Coordinador de procesos BIM en fase de diseño',
      en: 'Coordinator of BIM processes in the design phase',
      pt: 'Coordenador de processos BIM na fase de projeto',
    },
    color: '#00AA88',
    requirements: {
      es: [
        '2+ años de experiencia en diseño BIM',
        'Conocimiento de software BIM',
        'Experiencia en coordinación interdisciplinar',
      ],
      en: [
        '2+ years of BIM design experience',
        'Knowledge of BIM software',
        'Experience in interdisciplinary coordination',
      ],
      pt: [
        '2+ anos de experiência em projeto BIM',
        'Conhecimento de software BIM',
        'Experiência em coordenação interdisciplinar',
      ],
    },
    duration: { es: '12-16 semanas', en: '12-16 weeks', pt: '12-16 semanas' },
  },
  {
    id: 'BIM_Construction_Manager',
    name: 'bim-construction-manager',
    displayName: 'BIM Construction Manager',
    description: {
      es: 'Especialista en implantación BIM en fase de construcción',
      en: 'Specialist in BIM implementation in the construction phase',
      pt: 'Especialista em implementação BIM na fase de construção',
    },
    color: '#FF6B35',
    requirements: {
      es: [
        '2+ años de experiencia en construcción BIM',
        'Conocimiento de procesos constructivos',
        'Experiencia en planificación y seguimiento',
      ],
      en: [
        '2+ years of BIM construction experience',
        'Knowledge of construction processes',
        'Experience in planning and monitoring',
      ],
      pt: [
        '2+ anos de experiência em construção BIM',
        'Conhecimento de processos construtivos',
        'Experiência em planeamento e acompanhamento',
      ],
    },
    duration: { es: '12-16 semanas', en: '12-16 weeks', pt: '12-16 semanas' },
  },
]

interface CertificationSelectorProps {
  onSelect: (type: string, displayName: string) => void
  locale?: 'es' | 'en' | 'pt'
}

export default function CertificationSelector({ onSelect, locale = 'es' }: CertificationSelectorProps) {
  const L = (es: string, en: string, pt: string) =>
    locale === 'es' ? es : locale === 'pt' ? pt : en
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-pmi-dark mb-2">
          {L('Solicitar Certificación', 'Apply for Certification', 'Candidatar-se à Certificação')}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {L(
            'Elige el tipo de certificación que deseas solicitar y completa el proceso de solicitud',
            'Choose the type of certification you want to apply for and complete the application process',
            'Escolha o tipo de certificação a que se quer candidatar e complete o processo de candidatura',
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {CERTIFICATIONS.map((cert, index) => {
          const isHovered = hovered === cert.id
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHovered(cert.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative rounded-2xl border-[3px] bg-white p-6 sm:p-7 transition-all duration-300 cursor-pointer"
              style={{
                borderColor: isHovered ? cert.color : `${cert.color}40`,
                transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isHovered
                  ? `0 16px 48px ${cert.color}25`
                  : '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${cert.color}15` }}
              >
                <FileCheck className="w-7 h-7" style={{ color: cert.color }} />
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold mb-2" style={{ color: cert.color }}>
                {cert.displayName}
              </h2>

              {/* Description */}
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                {cert.description[locale]}
              </p>

              {/* Duration */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-4 text-sm text-gray-600">
                <Clock className="w-4 h-4 shrink-0" style={{ color: cert.color }} />
                <span>
                  <strong>{L('Duración:', 'Duration:', 'Duração:')}</strong> {cert.duration[locale]}
                </span>
              </div>

              {/* Requirements */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  {L('Requisitos:', 'Requirements:', 'Requisitos:')}
                </h4>
                <ul className="space-y-1.5">
                  {cert.requirements[locale].map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="font-bold shrink-0" style={{ color: cert.color }}>✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                onClick={() => onSelect(cert.id, cert.displayName)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: cert.color,
                  opacity: isHovered ? 1 : 0.95,
                }}
              >
                {L('Solicitar Certificación', 'Apply for Certification', 'Candidatar-se à Certificação')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </div>

      {/* Help section */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 text-center">
        <div className="w-12 h-12 bg-pmi-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-6 h-6 text-pmi-blue" />
        </div>
        <h3 className="text-lg font-bold text-pmi-dark mb-2">
          {L('¿Necesitas ayuda?', 'Need help?', 'Precisa de ajuda?')}
        </h3>
        <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
          {L(
            'Si tienes dudas sobre cuál certificación es la más adecuada para ti, puedes contactar con nuestro equipo.',
            'If you have questions about which certification is right for you, contact our team.',
            'Se tem dúvidas sobre qual a certificação mais adequada para si, contacte a nossa equipa.',
          )}
        </p>
        <Link
          href={locale === 'es' ? '/contact' : `/${locale}/contact`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-pmi-blue hover:underline"
        >
          <Mail className="w-4 h-4" />
          {L('Contacta con nosotros', 'Contact us', 'Contacte-nos')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
