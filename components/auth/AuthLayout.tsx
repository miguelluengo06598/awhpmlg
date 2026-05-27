'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useTranslation } from '@/lib/useTranslation'

interface AuthLayoutProps {
  children: ReactNode
  leftTitle: string
  leftDescription: string
  benefits: { icon: React.ElementType; title: string; description: string }[]
  authType: 'signup' | 'signin'
}

export default function AuthLayout({ children, leftTitle, leftDescription, benefits, authType }: AuthLayoutProps) {
  const { getLink } = useTranslation()

  return (
    <div className="min-h-screen bg-white flex">
      {/* ─── COLUMNA IZQUIERDA (Gradiente) ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 xl:w-[45%] relative flex-col justify-between p-10 xl:p-14 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0066CC 0%, #0052a3 40%, #00AA88 100%)' }}
      >
        {/* Decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          <Link href={getLink('/')} className="inline-flex items-center gap-2.5 group">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
              <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
              <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
              <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
            </svg>
            <span className="text-white font-bold text-lg tracking-wide">AECMI</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-4">
            {leftTitle}
          </h2>
          <p className="text-white/80 text-base leading-relaxed mb-10">
            {leftDescription}
          </p>

          <div className="space-y-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/15 backdrop-blur-sm border border-white/10 shrink-0">
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{benefit.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mt-0.5">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-white/50">
          © {new Date().getFullYear()} AECMI. {authType === 'signup' ? 'Registro de nuevos usuarios.' : 'Acceso seguro.'}
        </div>
      </motion.div>

      {/* ─── COLUMNA DERECHA (Formulario) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-12 bg-gray-50/50"
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href={getLink('/')} className="inline-flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
              <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
              <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
              <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
            </svg>
            <span className="text-pmi-dark font-bold text-base tracking-wide">AECMI</span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
