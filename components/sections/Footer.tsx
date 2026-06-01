'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function Footer() {
  const { t, getLink } = useTranslation()
  const f = t.footer

  return (
    <footer className="w-full bg-[#0B0F1C] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-18">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <Link href={getLink('/')} className="inline-flex items-center gap-2.5 group">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
                <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
                <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
                <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
                <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
              </svg>
              <div>
                <div className="text-sm font-bold tracking-widest uppercase text-white">AECOMI</div>
                <div className="text-[10px] font-medium text-gray-400 tracking-wide">BIM Certification</div>
              </div>
            </Link>
            <p className="mt-5 text-sm text-gray-400 leading-relaxed max-w-xs">
              {f.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                <svg key="li" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                <svg key="tw" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
                <svg key="yt" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
                <svg key="ig" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links Útiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 lg:col-start-6"
          >
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-5">{f.useful_links}</h4>
            <ul className="space-y-3">
              {[
                { name: 'Inicio', href: getLink('/') },
                { name: 'Sobre nosotros', href: getLink('/about') },
                { name: 'Certificaciones', href: getLink('/certifications') },
                { name: 'Contacto', href: getLink('/contact') },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-5">{f.certifications_title}</h4>
            <ul className="space-y-3">
              {[
                { name: 'Information Delivery Manager', href: getLink('/certifications') },
                { name: 'BIM Design Manager', href: getLink('/certifications') },
                { name: 'BIM Construction Manager', href: getLink('/certifications') },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-5">{f.contact_title}</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@aecomi.com" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                  <Mail className="w-4 h-4 mt-0.5 text-gray-500 group-hover:text-pmi-cyan transition-colors" />
                  <span>info@aecomi.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+34000000000" className="flex items-start gap-3 text-sm text-gray-400 hover:text-white transition-colors group">
                  <Phone className="w-4 h-4 mt-0.5 text-gray-500 group-hover:text-pmi-cyan transition-colors" />
                  <span>+34 XXX XXX XXX</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                  <span>Madrid, España</span>
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-gray-500">
              © {new Date().getFullYear()} AECOMI. {f.rights}
            </span>
            <div className="flex items-center gap-6">
              <Link href={getLink('/legal/privacidad')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {f.privacy}
              </Link>
              <Link href={getLink('/legal/terminos')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {f.terms}
              </Link>
              <Link href={getLink('/legal/cookies')} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                {f.cookies}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
