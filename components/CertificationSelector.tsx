'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileCheck, Clock, ArrowRight, HelpCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export interface CertificationOption {
  id: string
  name: string
  displayName: string
  description: string
  color: string
  requirements: string[]
  duration: string
}

const CERTIFICATIONS: CertificationOption[] = [
  {
    id: 'Information_Delivery_Manager',
    name: 'information-delivery-manager',
    displayName: 'Information Delivery Manager',
    description: 'Especialista en gestión estratégica de información BIM',
    color: '#0066CC',
    requirements: [
      '3+ años de experiencia en BIM',
      'Conocimiento de ISO 19650',
      'Experiencia en gestión de información',
    ],
    duration: '12-16 semanas',
  },
  {
    id: 'BIM_Design_Manager',
    name: 'bim-design-manager',
    displayName: 'BIM Design Manager',
    description: 'Coordinador de procesos BIM en fase de diseño',
    color: '#00AA88',
    requirements: [
      '2+ años de experiencia en diseño BIM',
      'Conocimiento de software BIM',
      'Experiencia en coordinación interdisciplinar',
    ],
    duration: '12-16 semanas',
  },
  {
    id: 'BIM_Construction_Manager',
    name: 'bim-construction-manager',
    displayName: 'BIM Construction Manager',
    description: 'Especialista en implantación BIM en fase de construcción',
    color: '#FF6B35',
    requirements: [
      '2+ años de experiencia en construcción BIM',
      'Conocimiento de procesos constructivos',
      'Experiencia en planificación y seguimiento',
    ],
    duration: '12-16 semanas',
  },
]

interface CertificationSelectorProps {
  onSelect: (type: string, displayName: string) => void
  locale?: 'es' | 'en' | 'pt'
}

export default function CertificationSelector({ onSelect, locale = 'es' }: CertificationSelectorProps) {
  const isEn = locale === 'en'
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-pmi-dark mb-2">
          {isEn ? 'Apply for Certification' : 'Solicitar Certificación'}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          {isEn
            ? 'Choose the type of certification you want to apply for and complete the application process'
            : 'Elige el tipo de certificación que deseas solicitar y completa el proceso de solicitud'}
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
                {cert.description}
              </p>

              {/* Duration */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-4 text-sm text-gray-600">
                <Clock className="w-4 h-4 shrink-0" style={{ color: cert.color }} />
                <span>
                  <strong>{isEn ? 'Duration:' : 'Duración:'}</strong> {cert.duration}
                </span>
              </div>

              {/* Requirements */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  {isEn ? 'Requirements:' : 'Requisitos:'}
                </h4>
                <ul className="space-y-1.5">
                  {cert.requirements.map((req, idx) => (
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
                {isEn ? 'Apply for Certification' : 'Solicitar Certificación'}
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
          {isEn ? 'Need help?' : '¿Necesitas ayuda?'}
        </h3>
        <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
          {isEn
            ? 'If you have questions about which certification is right for you, contact our team.'
            : 'Si tienes dudas sobre cuál certificación es la más adecuada para ti, puedes contactar con nuestro equipo.'}
        </p>
        <Link
          href={isEn ? '/en/contact' : '/contact'}
          className="inline-flex items-center gap-2 text-sm font-semibold text-pmi-blue hover:underline"
        >
          <Mail className="w-4 h-4" />
          {isEn ? 'Contact us' : 'Contacta con nosotros'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
