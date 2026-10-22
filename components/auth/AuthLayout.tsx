'use client'

import React, { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'
import { BLUEPRINT } from '@/components/ui/motion-kit'

interface AuthLayoutProps {
  children: ReactNode
  leftTitle: string
  leftDescription: string
  benefits: { icon: React.ElementType; title: string; description: string }[]
  authType: 'signup' | 'signin'
}

const AecomiLogo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1" />
    <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1" />
    <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1" />
    <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1" />
  </svg>
)

export default function AuthLayout({ children, leftTitle, leftDescription, benefits, authType }: AuthLayoutProps) {
  const { getLink, currentLang } = useTranslation()
  const reduce = useReducedMotion()

  const secureLabel =
    authType === 'signup'
      ? currentLang === 'es' ? 'Registro seguro' : currentLang === 'en' ? 'Secure sign-up' : 'Cadastro seguro'
      : currentLang === 'es' ? 'Acceso seguro' : currentLang === 'en' ? 'Secure access' : 'Acesso seguro'

  return (
    <div className="flex min-h-screen bg-pmi-cream">
      {/* ─── PANEL IZQUIERDO ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative hidden flex-col justify-between overflow-hidden bg-[#070B16] p-10 lg:flex lg:w-[46%] xl:w-[44%] xl:p-14"
      >
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 h-[480px] w-[480px] rounded-full border border-pmi-orange/25"
          animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full border border-pmi-cyan/25"
          animate={reduce ? undefined : { scale: [1.06, 1, 1.06] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10">
          <Link href={getLink('/')} className="group inline-flex items-center gap-3">
            <AecomiLogo size={38} />
            <span className="font-display text-lg font-semibold uppercase tracking-[0.14em] text-white transition-colors group-hover:text-white/80">AECOMI</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-[420px]">
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.2 }} style={{ originX: 0 }} className="mb-8 h-0.5 w-14 bg-pmi-orange" />
          <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-[-0.025em] text-white xl:text-[44px]">{leftTitle}</h2>
          <p className="mb-10 mt-5 text-[15px] leading-relaxed text-white/60">{leftDescription}</p>

          <ul className="border-t border-white/10">
            {benefits.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.35 + i * 0.1 }}
                className="group flex items-start gap-4 border-b border-white/10 py-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-pmi-cyan transition-colors group-hover:bg-pmi-orange group-hover:text-pmi-dark">
                  <b.icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{b.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{b.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
          <ShieldCheck className="h-3.5 w-3.5 text-pmi-cyan" />
          © {new Date().getFullYear()} AECOMI — {secureLabel}
        </div>
      </motion.div>

      {/* ─── PANEL DEL FORMULARIO ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-8 lg:px-14"
      >
        <div className="mb-10 lg:hidden">
          <Link href={getLink('/')} className="inline-flex items-center gap-2.5">
            <AecomiLogo size={30} />
            <span className="font-display text-base font-semibold uppercase tracking-[0.14em] text-pmi-dark">AECOMI</span>
          </Link>
        </div>
        <div className="w-full max-w-[440px] rounded-3xl bg-white p-7 shadow-[0_1px_0_rgba(15,5,36,0.04),0_24px_60px_-24px_rgba(15,5,36,0.18)] sm:p-10">
          {children}
        </div>
      </motion.div>
    </div>
  )
}
