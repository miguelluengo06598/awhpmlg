'use client'

import { motion } from 'framer-motion'
import { CreditCard, Receipt, AlertCircle } from 'lucide-react'

const payments = [
  { id: 'PAY-001', concept: 'Information Delivery Manager', amount: '€350.00', status: 'Completado', statusColor: 'bg-green-50 text-green-700 border-green-100', date: '10/04/2026' },
  { id: 'PAY-002', concept: 'BIM Design Manager', amount: '€350.00', status: 'Pendiente', statusColor: 'bg-orange-50 text-orange-700 border-orange-100', date: '18/05/2026' },
]

export default function ClientPaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-pmi-dark">Pagos</h1>
        <p className="text-sm text-gray-500 mt-1">Historial de facturación y pagos pendientes</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Concepto</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Monto</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Estado</th>
                <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha</th>
                <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 font-medium text-pmi-dark">{p.concept}</td>
                  <td className="px-5 py-4 font-semibold text-pmi-dark">{p.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${p.statusColor}`}>{p.status}</span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{p.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors">
                      <Receipt className="w-3.5 h-3.5" /> Ver recibo
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {payments.some((p) => p.status === 'Pendiente') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-orange-50 border border-orange-100 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-orange-800">Tienes un pago pendiente</div>
            <div className="text-sm text-orange-700 mt-0.5">Completa el pago de tu solicitud para continuar con el proceso de certificación.</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
