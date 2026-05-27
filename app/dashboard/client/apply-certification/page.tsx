'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ClipboardList } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import CertificationApplyForm from '@/components/CertificationApplyForm'
import CertificationSelector from '@/components/CertificationSelector'

export default function ApplyCertificationPage() {
  const [selectedCert, setSelectedCert] = useState<{
    type: string
    name: string
  } | null>(null)
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-pmi-blue/20 border-t-pmi-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth/signin')
    return null
  }

  const handleSelectCertification = (type: string, displayName: string) => {
    setSelectedCert({ type, name: displayName })
  }

  const handleBack = () => {
    setSelectedCert(null)
  }

  return (
    <div>
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-6 h-6 text-pmi-blue" />
          <h1 className="text-2xl sm:text-3xl font-bold text-pmi-dark">
            Solicitar Certificación
          </h1>
        </div>
        <p className="text-gray-500">
          Elige una certificación y completa el proceso de solicitud
        </p>
      </motion.div>

      {!selectedCert ? (
        <CertificationSelector
          locale="es"
          onSelect={handleSelectCertification}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Certificaciones
          </button>

          <CertificationApplyForm
            certificationType={selectedCert.type}
            certificationName={selectedCert.name}
            locale="es"
            onBack={handleBack}
          />
        </motion.div>
      )}
    </div>
  )
}
