'use client'

import { motion } from 'framer-motion'
import { Award, Download, Clock, CheckCircle2 } from 'lucide-react'

const certs = [
  { name: 'Information Delivery Manager', code: 'AECOMI-IDM-2026-0042', issued: '12/04/2026', expiry: '12/04/2029', status: 'Activa', statusColor: 'bg-green-50 text-green-700 border-green-100', needsRenewal: false },
  { name: 'BIM Design Manager', code: 'AECOMI-BDM-2025-0018', issued: '03/02/2025', expiry: '03/02/2028', status: 'Activa', statusColor: 'bg-green-50 text-green-700 border-green-100', needsRenewal: false },
]

export default function ClientCertificationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-pmi-dark">Mis Certificaciones</h1>
        <p className="text-sm text-gray-500 mt-1">Tus credenciales vigentes y estado de renovación</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certs.map((cert, i) => (
          <motion.div
            key={cert.code}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-pmi-cream rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-pmi-blue" />
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cert.statusColor}`}>{cert.status}</span>
            </div>
            <h3 className="text-base font-bold text-pmi-dark mb-1">{cert.name}</h3>
            <p className="text-xs text-gray-400 font-mono mb-4">{cert.code}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Obtención</span><span className="font-medium">{cert.issued}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Vencimiento</span><span className="font-medium">{cert.expiry}</span></div>
            </div>
            <button className="mt-5 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
              <Download className="w-4 h-4" /> Descargar certificado
            </button>
          </motion.div>
        ))}

        {/* Empty state / CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="bg-white p-6 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center min-h-[260px]"
        >
          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
            <Award className="w-6 h-6 text-gray-300" />
          </div>
          <p className="text-sm text-gray-500 mb-4">¿Quieres obtener una nueva certificación?</p>
          <a href="/certifications" className="inline-flex items-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
            <CheckCircle2 className="w-4 h-4" /> Solicitar ahora
          </a>
        </motion.div>
      </div>
    </div>
  )
}
