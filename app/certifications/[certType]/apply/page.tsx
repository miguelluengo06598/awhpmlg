import CertificationApplyForm from '@/components/CertificationApplyForm'
import { Metadata } from 'next'

const certificationMap: Record<string, { type: string; name: string; description: string }> = {
  'information-delivery-manager': {
    type: 'Information_Delivery_Manager',
    name: 'Information Delivery Manager',
    description: 'Solicita tu certificación como Information Delivery Manager. Gestión estratégica de información BIM.',
  },
  'bim-design-manager': {
    type: 'BIM_Design_Manager',
    name: 'BIM Design Manager',
    description: 'Solicita tu certificación como BIM Design Manager. Coordinación de procesos BIM en fase de diseño.',
  },
  'bim-construction-manager': {
    type: 'BIM_Construction_Manager',
    name: 'BIM Construction Manager',
    description: 'Solicita tu certificación como BIM Construction Manager. Implantación BIM en fase de construcción.',
  },
}

interface Props {
  params: Promise<{ certType: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certType } = await params
  const cert = certificationMap[certType]
  return {
    title: cert ? `Solicitar ${cert.name} — AECMI` : 'Solicitud de Certificación — AECMI',
    description: cert?.description || 'Solicita tu certificación profesional BIM con AECMI.',
  }
}

export default async function ApplyCertificationPage({ params }: Props) {
  const { certType } = await params
  const cert = certificationMap[certType]

  if (!cert) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pmi-dark mb-2">Certificación no encontrada</h1>
          <p className="text-gray-500 mb-6">La certificación solicitada no existe.</p>
          <a href="/certifications" className="text-pmi-blue font-semibold hover:underline">
            Ver certificaciones disponibles →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pmi-cream">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pmi-blue/10 text-pmi-blue text-xs font-semibold uppercase tracking-wider mb-4">
            Solicitud de Certificación
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-pmi-dark mb-3">
            Solicitar {cert.name}
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Completa el formulario paso a paso. Necesitarás tu información profesional y documentos de respaldo.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10">
        <CertificationApplyForm
          certificationType={cert.type}
          certificationName={cert.name}
          locale="es"
        />
      </section>
    </div>
  )
}
