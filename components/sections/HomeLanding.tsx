'use client'

import { useRef } from 'react'
import {
  motion, useMotionTemplate, useMotionValue,
  useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion'
import { reveal, BLUEPRINT, CountUp, RevealWords, Magnetic, Marquee, Eyebrow } from '@/components/ui/motion-kit'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight,
  CheckCircle2, FileText, Search, CreditCard, GraduationCap,
} from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function HomeLanding() {
  const { t, getLink, currentLang } = useTranslation()
  const h = t.home

  const certs = [
    {
      acronym: 'IDM',
      title: h.cert_1_title,
      level: h.cert_1_level,
      desc: h.cert_1_desc,
      href: getLink('/certifications/information-delivery-manager'),
      color: '#0066CC',
      light: '#4DA3FF',
    },
    {
      acronym: 'BDM',
      title: h.cert_2_title,
      level: h.cert_2_level,
      desc: h.cert_2_desc,
      href: getLink('/certifications/bim-design-manager'),
      color: '#00AA88',
      light: '#2CD3AF',
    },
    {
      acronym: 'BCM',
      title: h.cert_3_title,
      level: h.cert_3_level,
      desc: h.cert_3_desc,
      href: getLink('/certifications/bim-construction-manager'),
      color: '#E8601C',
      light: '#FF8A4C',
    },
  ]

  const advantages = [
    { title: h.adv_1_title, desc: h.adv_1_desc },
    { title: h.adv_2_title, desc: h.adv_2_desc },
    { title: h.adv_3_title, desc: h.adv_3_desc },
    { title: h.adv_4_title, desc: h.adv_4_desc },
  ]

  const steps = [
    { icon: CheckCircle2, title: h.step_1_title, desc: h.step_1_desc },
    { icon: FileText, title: h.step_2_title, desc: h.step_2_desc },
    { icon: Search, title: h.step_3_title, desc: h.step_3_desc },
    { icon: CreditCard, title: h.step_4_title, desc: h.step_4_desc },
    { icon: GraduationCap, title: h.step_5_title, desc: h.step_5_desc },
  ]

  const reduce = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const mx = useMotionValue(70)
  const my = useMotionValue(30)
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${mx}% ${my}%, rgba(0,163,196,0.16), transparent 70%)`
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroTextY = useTransform(heroScroll, [0, 1], [0, reduce ? 0 : 90])
  const heroBarsY = useTransform(heroScroll, [0, 1], [0, reduce ? 0 : -60])
  const heroFade = useTransform(heroScroll, [0, 0.8], [1, reduce ? 1 : 0.2])

  const tlRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress: tlScroll } = useScroll({ target: tlRef, offset: ['start 85%', 'end 60%'] })
  const tlLine = useSpring(tlScroll, { stiffness: 90, damping: 24 })

  const marqueeItems = [...certs.map((c) => c.title), 'ISO 19650', 'BIM', 'CDE', 'AECOMI']

  const stats = [
    { value: h.community_1_value, label: h.community_1_label },
    { value: h.community_2_value, label: h.community_2_label },
    { value: h.community_3_value, label: h.community_3_label },
    { value: h.community_4_value, label: h.community_4_label },
  ]

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        onMouseMove={(e) => {
          if (reduce) return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set(((e.clientX - r.left) / r.width) * 100)
          my.set(((e.clientY - r.top) / r.height) * 100)
        }}
        className="relative w-full overflow-hidden bg-[#070B16] text-white"
      >
        <motion.div
          className="absolute inset-0"
          style={BLUEPRINT}
          animate={reduce ? undefined : { backgroundPosition: ['0px 0px', '56px 56px'] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
          aria-hidden
        />
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spotlight }} aria-hidden />
        {/* Barras del logo que "construyen" el skyline */}
        <motion.div style={{ y: heroBarsY }} className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[46%] items-end justify-end gap-3 px-4 opacity-[0.16] sm:px-8 lg:pr-24" aria-hidden>
          {[
            { h: '62%', c: '#00A3C4' }, { h: '88%', c: '#E87722' }, { h: '48%', c: '#5B2D8E' },
            { h: '74%', c: '#00A3C4' }, { h: '100%', c: '#E87722' }, { h: '56%', c: '#5B2D8E' },
          ].map((b, i) => (
            <motion.span
              key={i}
              className="w-8 origin-bottom rounded-t-sm sm:w-12 lg:w-16"
              style={{ height: b.h, backgroundColor: b.c }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.div>
        <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-pmi-cyan/[0.10] blur-[140px]" aria-hidden />

        <motion.div style={{ y: heroTextY, opacity: heroFade }} className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-7"
            >
              <Eyebrow dark>{h.hero_badge}</Eyebrow>
              <h1 className="mt-8 font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[84px]">
                <RevealWords text={h.hero_title} />
                <span className="mt-2 block text-pmi-cyan">
                  <RevealWords text={h.hero_title_accent} delay={0.25} />
                </span>
              </h1>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">{h.hero_subtitle}</p>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/40">{h.hero_description}</p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Magnetic>
                <Link
                  href={getLink('/certifications')}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-orange px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-all hover:bg-[#f08430] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {h.cta_primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                </Magnetic>
                <Link
                  href={getLink('/about')}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/80 transition-all hover:border-white/40 hover:bg-white/[0.05] hover:text-white"
                >
                  {h.cta_secondary}
                </Link>
              </div>
            </motion.div>

            {/* Índice de certificaciones */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="lg:col-span-5 lg:pt-6"
            >
              <div className="mb-4 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40">
                <span>{h.certifications_badge}</span>
                <span>AECOMI</span>
              </div>
              <ul className="border-t border-white/15">
                {certs.map((cert) => (
                  <li key={cert.acronym} className="border-b border-white/15">
                    <Link href={cert.href} className="group flex items-center gap-5 py-5 transition-colors hover:bg-white/[0.03]">
                      <span
                        className="font-display text-3xl font-semibold tracking-tight lg:text-4xl"
                        style={{ color: cert.light }}
                      >
                        {cert.acronym}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] font-medium text-white/90">{cert.title}</span>
                        <span className="mt-0.5 block text-xs text-white/40">{cert.level}</span>
                      </span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-white/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Marquee items={marqueeItems} />

      {/* ═══ CERTIFICATIONS ═════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow>{h.certifications_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
                {h.certifications_title}
              </h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <Link
                href={getLink('/certifications')}
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-pmi-dark underline decoration-pmi-orange decoration-2 underline-offset-8"
              >
                {h.certifications_cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pmi-dark/10 md:grid-cols-3">
            {certs.map((cert, i) => (
              <motion.div
                key={cert.acronym}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect()
                  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                }}
                className="group relative flex flex-col overflow-hidden bg-white p-8 lg:p-10"
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(360px circle at var(--mx,50%) var(--my,50%), ${cert.color}1f, transparent 65%)` }}
                  aria-hidden
                />
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.25] transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: cert.color }} />
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-semibold leading-none tracking-tighter transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 lg:text-7xl origin-left" style={{ color: cert.color }}>
                    {cert.acronym}
                  </span>
                  <span className="rounded-full border border-pmi-dark/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-pmi-dark/60">
                    {cert.level}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-xl font-semibold leading-snug text-pmi-dark">{cert.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-pmi-dark/65">{cert.desc}</p>
                <Link
                  href={cert.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-pmi-dark after:absolute after:inset-0 after:content-['']"
                >
                  {currentLang === 'en' ? `Explore ${cert.acronym}` : `Explorar ${cert.acronym}`}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" style={{ color: cert.color }} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADVANTAGES ═════════════════════════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <motion.div {...reveal} className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>{h.advantages_badge}</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
                  {h.advantages_title}
                </h2>
              </div>
            </motion.div>

            <ol className="lg:col-span-7 lg:col-start-6">
              {advantages.map((item, i) => (
                <motion.li
                  key={item.title}
                  {...reveal}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="grid grid-cols-[3rem_1fr] gap-4 border-t border-pmi-dark/15 py-8 first:border-t-0 first:pt-0 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="font-display text-sm font-semibold tabular-nums text-pmi-orange">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-pmi-dark md:text-2xl">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-pmi-dark/65">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══════════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{h.timeline_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {h.timeline_title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-pmi-dark/65">{h.timeline_subtitle}</p>
          </motion.div>

          <div className="relative mt-16">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-pmi-dark/10 lg:block" aria-hidden />
          <motion.div style={{ scaleX: reduce ? 1 : tlLine }} className="pointer-events-none absolute left-0 right-0 top-6 hidden h-0.5 origin-left bg-pmi-orange lg:block" aria-hidden />
          <ol ref={tlRef} className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((step, i) => (
              <motion.li key={step.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }} className="relative">
                <motion.span
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: i * 0.12 }}
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-pmi-dark text-white ring-4 ring-pmi-cream"
                >
                  <step.icon className="h-5 w-5" />
                </motion.span>
                <div className="mt-6 font-display text-xs font-semibold tabular-nums tracking-widest text-pmi-orange">0{i + 1}</div>
                <h3 className="mt-1 font-display text-lg font-semibold text-pmi-dark">{step.title}</h3>
                <p className="mt-2 max-w-[220px] text-sm leading-relaxed text-pmi-dark/60">{step.desc}</p>
              </motion.li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* ═══ COMMUNITY ══════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div {...reveal} className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Eyebrow dark>{h.community_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">
                {h.community_title}
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-white/50 md:col-span-5 md:justify-self-end">
              {h.community_subtitle}
            </p>
          </motion.div>

          <dl className="mt-16 grid grid-cols-2 border-t border-white/15 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...reveal}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border-b border-white/15 py-10 pr-4 lg:border-b-0 lg:border-r lg:pl-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <dd className="font-display text-5xl font-semibold tracking-tight text-white lg:text-6xl"><CountUp value={s.value} /></dd>
                <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">{s.label}</dt>
              </motion.div>
            ))}
          </dl>

          <motion.div {...reveal} className="mt-12">
            <Link
              href={getLink('/contact')}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-white/90"
            >
              {h.community_cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ══════════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">
                {h.final_cta_title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{h.final_cta_subtitle}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <Link
                href={getLink('/certifications')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black"
              >
                {h.final_cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={getLink('/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-pmi-dark/10"
              >
                {h.final_cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
