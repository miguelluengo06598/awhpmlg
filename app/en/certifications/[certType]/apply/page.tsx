import CertificationApplyForm from '@/components/CertificationApplyForm'
import { Metadata } from 'next'

const certificationMap: Record<string, { type: string; name: string; description: string }> = {
  'information-delivery-manager': {
    type: 'Information_Delivery_Manager',
    name: 'Information Delivery Manager',
    description: 'Apply for your Information Delivery Manager certification. Strategic BIM information management.',
  },
  'bim-design-manager': {
    type: 'BIM_Design_Manager',
    name: 'BIM Design Manager',
    description: 'Apply for your BIM Design Manager certification. BIM process coordination in design phase.',
  },
  'bim-construction-manager': {
    type: 'BIM_Construction_Manager',
    name: 'BIM Construction Manager',
    description: 'Apply for your BIM Construction Manager certification. BIM implementation in construction phase.',
  },
}

interface Props {
  params: Promise<{ certType: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { certType } = await params
  const cert = certificationMap[certType]
  return {
    title: cert ? `Apply for ${cert.name} — AECMI` : 'Certification Application — AECMI',
    description: cert?.description || 'Apply for your professional BIM certification with AECMI.',
  }
}

export default async function ApplyCertificationPage({ params }: Props) {
  const { certType } = await params
  const cert = certificationMap[certType]

  if (!cert) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-pmi-dark mb-2">Certification Not Found</h1>
          <p className="text-gray-500 mb-6">The requested certification does not exist.</p>
          <a href="/en/certifications" className="text-pmi-blue font-semibold hover:underline">
            View Available Certifications →
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
            Certification Application
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-pmi-dark mb-3">
            Apply for {cert.name}
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Complete the form step by step. You will need your professional information and supporting documents.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10">
        <CertificationApplyForm
          certificationType={cert.type}
          certificationName={cert.name}
          locale="en"
        />
      </section>
    </div>
  )
}
