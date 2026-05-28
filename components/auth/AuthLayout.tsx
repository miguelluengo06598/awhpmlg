'use client'

import React from 'react'
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

const GRID_BG: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const AecmiLogo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1" />
    <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1" />
    <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1" />
    <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1" />
  </svg>
)

export default function AuthLayout({ children, leftTitle, leftDescription, benefits, authType }: AuthLayoutProps) {
  const { getLink } = useTranslation()

  return (
    <div className="min-h-screen bg-white flex">

      {/* ─── LEFT PANEL ─── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[46%] xl:w-[42%] relative flex-col justify-between p-10 xl:p-14 overflow-hidden bg-[#060B18]"
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        {/* Single glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#0066CC]/[0.09] blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href={getLink('/')} className="inline-flex items-center gap-2.5 group">
            <AecmiLogo size={38} />
            <span className="text-white font-bold text-lg tracking-wide group-hover:text-white/80 transition-colors">
              AECMI
            </span>
          </Link>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-[380px]">
          <div className="w-10 h-0.5 bg-[#0066CC] rounded-full mb-8" />
          <h2 className="text-3xl xl:text-[2.15rem] font-bold text-white leading-[1.2] tracking-tight mb-5">
            {leftTitle}
          </h2>
          <p className="text-white/55 text-[0.95rem] leading-relaxed mb-10">
            {leftDescription}
          </p>

          <div className="space-y-5">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] shrink-0">
                  <benefit.icon className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white/90">{benefit.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed mt-0.5">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[11px] text-white/25 tracking-wide uppercase">
          © {new Date().getFullYear()} AECMI — {authType === 'signup' ? 'Registro seguro' : 'Acceso seguro'}
        </div>
      </motion.div>

      {/* ─── RIGHT PANEL (form) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 lg:px-14 py-12 bg-white"
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link href={getLink('/')} className="inline-flex items-center gap-2.5">
            <AecmiLogo size={30} />
            <span className="text-pmi-dark font-bold text-base tracking-wide">AECMI</span>
          </Link>
        </div>

        <div className="w-full max-w-[420px]">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
