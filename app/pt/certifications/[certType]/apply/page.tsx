import CertificationApplyForm from '@/components/CertificationApplyForm'
import { Metadata } from 'next'

const certificationMap: Record<string, { type: string; name: string; description: string }> = {
  'information-delivery-manager': {
    type: 'Information_Delivery_Manager',
    name: 'Information Delivery Manager',
    description: 'Candidate-se à sua certificação Information Delivery Manager. Gestão estratégica de informação BIM.',
  },
  'bim-design-manager': {
    type: 'BIM_Design_Manager',
    name: 'BIM Design Manager',
    description: 'Candidate-se à sua certificação BIM Design Manager. Coordenação de processos BIM na fase de projeto.',
  },
  'bim-construction-manager': {
    type: 'BIM_Construction_Manager',
    name: 'BIM Construction Manager',
    description: 'Candidate-se à sua certificação BIM Construction Manager. Implementação BIM na fase de construção.',
  },
}

interface Props {
  params: Promise<{ certType: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certType } = await params
  const cert = certificationMap[certType]
  return {
    title: cert ? `Candidatura a ${cert.name} — AECOMI` : 'Candidatura a Certificação — AECOMI',
    description: cert?.description || 'Candidate-se à sua certificação profissional BIM com a AECOMI.',
  }
}

export default async function ApplyCertificationPage({ params }: Props) {
  const { certType } = await params
  const cert = certificationMap[certType]

  if (!cert) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pmi-dark mb-2">Certificação Não Encontrada</h1>
          <p className="text-gray-500 mb-6">A certificação solicitada não existe.</p>
          <a href="/pt/certifications" className="text-pmi-blue font-semibold hover:underline">
            Ver certificações disponíveis →
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
            Candidatura a Certificação
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-pmi-dark mb-3">
            Candidatura a {cert.name}
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Complete o formulário passo a passo. Vai precisar da sua informação profissional e documentos comprovativos.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10">
        <CertificationApplyForm
          certificationType={cert.type}
          certificationName={cert.name}
          locale="pt"
        />
      </section>
    </div>
  )
}
