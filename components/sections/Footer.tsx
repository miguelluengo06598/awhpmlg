'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function Footer() {
  const { t, getLink } = useTranslation()
  const f = t.footer

  const navLinks = [
    { name: t.nav.home, href: getLink('/') },
    { name: t.nav.about, href: getLink('/about') },
    { name: t.nav.formation, href: getLink('/formacion') },
    { name: t.nav.contact, href: getLink('/contact') },
  ]

  const certLinks = [
    { name: 'Information Delivery Manager', href: getLink('/certifications/information-delivery-manager'), dot: '#4DA3FF' },
    { name: 'BIM Design Manager', href: getLink('/certifications/bim-design-manager'), dot: '#2CD3AF' },
    { name: 'BIM Construction Manager', href: getLink('/certifications/bim-construction-manager'), dot: '#FF8A4C' },
  ]

  const linkClass =
    'text-[15px] text-white/60 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-pmi-cyan'
  const headingClass = 'text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40'

  return (
    <footer className="relative w-full overflow-hidden bg-[#070B16] text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-5">
            <Link href={getLink('/')} className="inline-flex items-center gap-3 group">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="transition-transform duration-300 group-hover:scale-105">
                <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1" />
                <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1" />
                <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1" />
                <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1" />
              </svg>
              <span className="font-display text-lg font-semibold uppercase tracking-[0.14em]">AECOMI</span>
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/55">{f.description}</p>
            <a
              href="mailto:info@aecomi.com"
              className="group mt-8 inline-flex items-center gap-2 border-b border-pmi-orange pb-1 font-display text-xl font-medium text-white transition-colors hover:text-pmi-orange"
            >
              info@aecomi.com
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Navegación */}
          <nav aria-label={f.useful_links} className="lg:col-span-2 lg:col-start-7">
            <h4 className={headingClass}>{f.useful_links}</h4>
            <ul className="mt-6 space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Certificaciones */}
          <nav aria-label={f.certifications_title} className="lg:col-span-2">
            <h4 className={headingClass}>{f.certifications_title}</h4>
            <ul className="mt-6 space-y-3.5">
              {certLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={`${linkClass} inline-flex items-center gap-2.5`}>
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: link.dot }} aria-hidden />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3 lg:col-start-10 lg:row-start-1 xl:col-span-2 xl:col-start-11">
            <h4 className={headingClass}>{f.contact_title}</h4>
            <ul className="mt-6 space-y-3.5">
              <li>
                <a href="tel:+34646799005" className={`${linkClass} flex items-center gap-2.5`}>
                  <Phone className="h-4 w-4 shrink-0 text-white/35" aria-hidden />
                  +34 646 799 005
                </a>
              </li>
              <li>
                <a href="mailto:info@aecomi.com" className={`${linkClass} flex items-center gap-2.5`}>
                  <Mail className="h-4 w-4 shrink-0 text-white/35" aria-hidden />
                  info@aecomi.com
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[15px] text-white/60">
                <MapPin className="h-4 w-4 shrink-0 text-white/35" aria-hidden />
                Madrid, España
              </li>
            </ul>
          </div>
        </div>

        {/* Wordmark gigante */}
        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <div className="whitespace-nowrap text-center font-display text-[22vw] font-semibold leading-[0.8] tracking-[-0.04em] text-white/[0.05] lg:text-[17rem]">
            AECOMI
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <span className="text-xs text-white/45">
            © {new Date().getFullYear()} AECOMI. {f.rights}
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={getLink('/legal/privacidad')} className="text-xs text-white/45 transition-colors hover:text-white">
              {f.privacy}
            </Link>
            <Link href={getLink('/legal/terminos')} className="text-xs text-white/45 transition-colors hover:text-white">
              {f.terms}
            </Link>
            <Link href={getLink('/legal/cookies')} className="text-xs text-white/45 transition-colors hover:text-white">
              {f.cookies}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
