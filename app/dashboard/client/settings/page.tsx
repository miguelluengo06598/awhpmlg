'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Lock, Camera, Save, Trash2 } from 'lucide-react'

export default function ClientSettingsPage() {
  const [form, setForm] = useState({ fullName: 'Usuario Demo', email: 'user@aecmi.com', phone: '+34 600 000 000', currentPassword: '', newPassword: '', confirmPassword: '' })

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-pmi-dark">Configuración</h1>
        <p className="text-sm text-gray-500 mt-1">Administra tu perfil y preferencias</p>
      </div>

      {/* Profile photo */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-pmi-dark mb-4">Foto de perfil</h2>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-pmi-cream border border-gray-100 flex items-center justify-center text-2xl font-bold text-pmi-dark">
            UD
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors">
              <Camera className="w-4 h-4" /> Cambiar foto
            </button>
          </div>
        </div>
      </motion.div>

      {/* Personal info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-pmi-dark mb-5">Información personal</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066CC] bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066CC] bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066CC] bg-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Password */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h2 className="text-base font-bold text-pmi-dark mb-5">Cambiar contraseña</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contraseña actual</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066CC] bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nueva contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066CC] bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirmar nueva contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-[#0066CC] bg-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0066CC] text-white text-sm font-semibold rounded-xl hover:bg-[#0052a3] transition-colors shadow-sm">
          <Save className="w-4 h-4" /> Guardar cambios
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors border border-red-100">
          <Trash2 className="w-4 h-4" /> Eliminar cuenta
        </button>
      </div>
    </div>
  )
}
