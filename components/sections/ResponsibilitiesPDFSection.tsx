'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, CheckCircle2 } from 'lucide-react'
import { generateResponsibilitiesPDF, type PdfReportData } from '@/lib/generatePdfReport'

interface Props {
  certificationName: string
  certificationCode: string
  accentColorRgb: [number, number, number]
  responsibilities: { title: string; desc: string }[]
  locale: 'es' | 'en' | 'pt'
  badgeLabel?: string
  sectionTitle?: string
  bgClass?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function ResponsibilitiesPDFSection({
  certificationName,
  certificationCode,
  accentColorRgb,
  responsibilities,
  locale,
  badgeLabel,
  sectionTitle,
  bgClass = 'bg-[#f9fbff]',
}: Props) {
  const [loading, setLoading] = useState(false)
  // Etiqueta 3-idiomas para el texto del bloque (el título puede llegar por prop).
  const L = (es: string, en: string, pt: string) =>
    locale === 'es' ? es : locale === 'en' ? en : pt

  const accentHex = `rgb(${accentColorRgb.join(',')})`

  const handleDownload = async () => {
    setLoading(true)
    const data: PdfReportData = {
      certificationName,
      certificationCode,
      accentColorRgb,
      responsibilities,
      // El PDF solo tiene plantillas es/en; para pt se usa en como respaldo.
      locale: locale === 'pt' ? 'en' : locale,
    }
    try {
      generateResponsibilitiesPDF(data)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const preview = responsibilities.slice(0, 5)

  return (
    <section className={`py-24 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          {badgeLabel && (
            <motion.span
              variants={fadeInUp}
              className="inline-block font-semibold text-sm tracking-wider uppercase mb-3"
              style={{ color: accentHex }}
            >
              {badgeLabel}
            </motion.span>
          )}
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
            {sectionTitle ?? L('Responsabilidades Principales', 'Main Responsibilities', 'Responsabilidades Principais')}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-3 text-[#333]/60 max-w-xl mx-auto text-base">
            {L(
              'Descarga el documento completo para revisar, imprimir o compartir.',
              'Download the full document to review, print, or share.',
              'Baixe o documento completo para revisar, imprimir ou compartilhar.',
            )}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white rounded-2xl border border-[#ddd]/50 shadow-sm overflow-hidden"
        >
          {/* Card header */}
          <div className="p-6 flex items-center gap-4 border-b border-[#eee]">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${accentHex}18` }}
            >
              <FileText className="w-7 h-7" style={{ color: accentHex }} />
            </div>
            <div>
              <h3 className="font-bold text-[#333] text-lg">
                {certificationCode} — {L('Responsabilidades Principales', 'Main Responsibilities', 'Responsabilidades Principais')}
              </h3>
              <p className="text-sm text-[#333]/50 mt-0.5">
                {certificationName} · {responsibilities.length} {L('responsabilidades', 'items', 'responsabilidades')} · PDF
              </p>
            </div>
          </div>

          {/* Preview list */}
          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-[#333]/40 uppercase tracking-wider mb-3">
              {L('Vista previa', 'Preview', 'Prévia')}
            </p>
            <ul className="space-y-2">
              {preview.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-[#333]/70">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentHex }} />
                  <span className="font-medium">{item.title}</span>
                </li>
              ))}
              {responsibilities.length > 5 && (
                <li className="text-sm text-[#333]/40 pl-6">
                  + {responsibilities.length - 5} {L('más...', 'more...', 'mais...')}
                </li>
              )}
            </ul>
          </div>

          {/* Download button */}
          <div className="px-6 pb-6 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white text-[15px] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: accentHex }}
            >
              <Download className={`w-5 h-5 ${loading ? 'animate-bounce' : ''}`} />
              {loading
                ? L('Generando…', 'Generating…', 'Gerando…')
                : L('Descargar PDF', 'Download PDF', 'Baixar PDF')}
            </button>
            <p className="text-xs text-[#333]/40">
              {L(
                'El archivo se descargará automáticamente a tu dispositivo.',
                'The file will download automatically to your device.',
                'O arquivo será baixado automaticamente no seu dispositivo.',
              )}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
