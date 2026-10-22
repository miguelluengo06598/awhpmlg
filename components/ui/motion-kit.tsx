'use client'

import { useEffect, useRef } from 'react'
import {
  motion, animate, useInView, useReducedMotion, useScroll, useSpring, useTransform,
  type MotionValue,
} from 'framer-motion'

export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as const },
  transition: { duration: 0.55, ease: 'easeOut' as const },
}

// Cuadrícula tipo plano técnico (guiño al mundo BIM/CAD)
export const BLUEPRINT = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
  maskImage: 'radial-gradient(ellipse 70% 80% at 70% 40%, #000 30%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 70% 40%, #000 30%, transparent 75%)',
}

// Sube de 0 al valor al entrar en pantalla ("100+" → 0…100 + "+")
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/)
  const target = match ? parseFloat(match[2].replace(/[.,]/g, '')) : NaN

  useEffect(() => {
    if (!inView || reduce || !match || Number.isNaN(target) || !ref.current) return
    const el = ref.current
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { el.textContent = `${match[1]}${Math.round(v)}${match[3]}` },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return <span ref={ref}>{value}</span>
}

// Título que aparece palabra a palabra, subiendo desde una máscara
export function RevealWords({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden>
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: delay + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// Botón que se desplaza ligeramente hacia el cursor
export function Magnetic({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 220, damping: 16 })
  const y = useSpring(0, { stiffness: 220, damping: 16 })
  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="inline-block"
    >
      {children}
    </motion.div>
  )
}

// Cinta infinita de términos
export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion()
  const row = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-pmi-dark/10 bg-white py-5" aria-hidden>
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold tracking-tight text-pmi-dark/80 md:text-3xl">
            {item}
            <span className="h-2 w-2 rotate-45 bg-pmi-orange" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] ${dark ? 'text-white/55' : 'text-pmi-dark/55'}`}>
      <span className={`h-px w-8 ${dark ? 'bg-pmi-cyan' : 'bg-pmi-orange'}`} />
      {children}
    </div>
  )
}


// Párrafo cuyas palabras se iluminan según el scroll (efecto manifiesto)
export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} off={!!reduce}>
          {w}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range, off }: { children: string; progress: MotionValue<number>; range: [number, number]; off: boolean }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity: off ? 1 : opacity }} className="mr-[0.28em] inline-block" aria-hidden>
      {children}
    </motion.span>
  )
}

// Línea que se dibuja con el scroll
export function useDrawLine(target: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target, offset: ['start 80%', 'end 55%'] })
  return useSpring(scrollYProgress, { stiffness: 90, damping: 24 })
}
