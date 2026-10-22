'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, Users, Award, FileText, Landmark, MessageSquare, ClipboardList, Layers, HardHat, Search, BadgeCheck } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'
import { type Locale, LOCALES, LOCALE_NAMES, localizePath } from '@/lib/locale'
import FlagIcon from '@/components/FlagIcon'

export default function Header() {
  const { currentLang, t, getLink } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null)

  // Cambio manual de idioma: persiste en cookie (solo el código, SameSite=Lax,
  // Secure en https; no httpOnly — no es sensible) y navega a la ruta localizada.
  const changeLanguage = (target: Locale) => {
    if (target === currentLang) return
    const secure =
      typeof window !== 'undefined' && window.location.protocol === 'https:' ? ' Secure;' : ''
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; SameSite=Lax;${secure}`
    router.push(localizePath(pathname ?? '/', target))
  }

  // Etiqueta 3-idiomas para textos del menú que no están en el objeto translations.
  const L = (es: string, en: string, pt: string) =>
    currentLang === 'es' ? es : currentLang === 'en' ? en : pt

  const toggleSubmenu = (name: string) => {
    setExpandedSubmenu(expandedSubmenu === name ? null : name)
  }

  const navLinks = [
    { name: t.nav.home, href: getLink('/') },
    {
      name: t.nav.about,
      href: getLink('/about'),
      mega: [
        {
          title: L('Información', 'Information', 'Informação'),
          items: [
            { name: L('Sobre AECOMI', 'About AECOMI', 'Sobre a AECOMI'), href: getLink('/about'), icon: Users },
            { name: L('Gobierno y Organización', 'Governance & Organization', 'Governança e Organização'), href: getLink('/about/gobierno'), icon: Landmark },
            { name: L('Contactar', 'Contact', 'Contato'), href: getLink('/contact'), icon: MessageSquare },
          ],
        },
      ],
    },
    {
      name: t.nav.certifications,
      href: getLink('/certifications'),
      mega: [
        {
          title: L('Nuestras Certificaciones', 'Our Certifications', 'Nossas Certificações'),
          items: [
            { name: 'Information Delivery Manager', href: getLink('/certifications/information-delivery-manager'), icon: ClipboardList },
            { name: 'BIM Design Manager', href: getLink('/certifications/bim-design-manager'), icon: Layers },
            { name: 'BIM Construction Manager', href: getLink('/certifications/bim-construction-manager'), icon: HardHat },
          ],
        },
        {
          title: L('Información', 'Information', 'Informação'),
          items: [
            { name: L('Registro de Certificados', 'Certification Registry', 'Registro de Certificados'), href: getLink('/certifications/registro'), icon: BadgeCheck },
            { name: L('Ver todas las Cert.', 'View all Cert.', 'Ver todas as Cert.'), href: getLink('/certifications'), icon: Award },
            { name: L('Proceso de Certificación', 'Certification Process', 'Processo de Certificação'), href: getLink('/certifications'), icon: FileText },
          ],
        },
      ],
    },
    { name: t.nav.formation, href: getLink('/formacion') },
    { name: t.nav.contact, href: getLink('/contact') },
  ]

  return (
    <header className="w-full bg-pmi-cream/90 backdrop-blur-xl sticky top-0 z-50 border-b border-pmi-dark/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link href={getLink('/')} className="flex items-center gap-2.5 shrink-0 group">
            <div className="flex items-center">
              <svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-105">
                <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
                <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
                <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
                <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
              </svg>
              <div className="ml-2.5 hidden sm:block">
                <div className="font-display text-[15px] font-semibold text-pmi-dark leading-tight tracking-[0.14em] uppercase">AECOMI</div>
                <div className="text-[10px] font-medium text-pmi-dark/55 leading-tight tracking-[0.12em] uppercase">BIM Certification</div>
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {navLinks.map((link) =>
              link.mega ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="relative flex items-center gap-1 px-3.5 py-2 text-[14px] font-medium text-pmi-dark/75 hover:text-pmi-dark transition-colors after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-pmi-orange after:transition-transform hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pmi-cyan rounded-sm"
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-pmi-dark/40 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                    />
                  </Link>

                  <AnimatePresence>
                    {openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-2xl shadow-[0_24px_60px_-12px_rgba(15,5,36,0.25)] border border-pmi-dark/10 z-50 overflow-hidden"
                        style={{ minWidth: 560 }}
                      >
                        
                        

                        <div className="flex p-6 gap-0">
                          {link.mega.map((col, colIdx) => (
                            <div
                              key={col.title}
                              className={`flex-1 ${colIdx > 0 ? 'pl-6 ml-6 border-l border-pmi-dark/10' : ''}`}
                            >
                              <h4 className="text-[10px] font-semibold text-pmi-dark/45 uppercase tracking-[0.22em] mb-3 font-sans">
                                {col.title}
                              </h4>
                              <div className="flex flex-col">
                                {col.items.map((item, itemIdx) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                      group/item flex items-center gap-3 px-3 py-3 rounded-lg
                                      text-[14px] font-medium font-sans leading-snug text-pmi-dark/80
                                      hover:text-pmi-dark hover:bg-pmi-cream
                                      transition-colors duration-200
                                      min-h-[48px]
                                      
                                    `}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-pmi-cream group-hover/item:bg-pmi-dark flex items-center justify-center transition-colors duration-200">
                                      <item.icon className="w-4 h-4 text-pmi-dark/50 group-hover/item:text-white transition-colors duration-200" />
                                    </span>
                                    <span className="leading-[1.6]">{item.name}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3.5 py-2 text-[14px] font-medium text-pmi-dark/75 hover:text-pmi-dark transition-colors after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-pmi-orange after:transition-transform hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pmi-cyan rounded-sm"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right utilities */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Language selector (banderas 🇪🇸 / 🇬🇧 / 🇵🇹) */}
            <div className="hidden md:flex items-center gap-0.5 rounded-full border border-pmi-dark/15 p-0.5 pl-1" role="group" aria-label={t.nav.language}>
              <Globe className="w-3.5 h-3.5 text-gray-400 mx-1" aria-hidden />
              {LOCALES.map((lng) => (
                <button
                  key={lng}
                  onClick={() => changeLanguage(lng)}
                  aria-label={LOCALE_NAMES[lng]}
                  aria-current={currentLang === lng ? 'true' : undefined}
                  title={LOCALE_NAMES[lng]}
                  className={`px-1.5 py-1 rounded-full transition-all ${
                    currentLang === lng
                      ? 'bg-pmi-dark/10 ring-1 ring-pmi-dark/30 opacity-100'
                      : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-gray-50'
                  }`}
                >
                  <FlagIcon locale={lng} className="w-6 h-4 rounded-[2px] ring-1 ring-black/10" />
                </button>
              ))}
            </div>

            <div className="hidden sm:block w-px h-5 bg-pmi-dark/15 mx-1" />

            <Link
              href={getLink('/auth/signin')}
              className="hidden sm:inline-flex text-[13px] font-medium text-pmi-dark/75 hover:text-pmi-dark transition-colors px-3 py-2"
            >
              {t.nav.signIn}
            </Link>
            <Link
              href={getLink('/auth/signup')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[13px] font-semibold text-white bg-pmi-dark rounded-full hover:bg-pmi-purple transition-colors"
            >
              {t.nav.signUp}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-pmi-dark/5 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-pmi-dark" />
              ) : (
                <Menu className="w-5 h-5 text-pmi-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden bg-pmi-cream border-t border-pmi-dark/10"
            style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
          >
            <nav className="max-w-[1400px] mx-auto flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  className="border-b border-pmi-dark/10 last:border-0"
                >
                  {link.mega ? (
                    <>
                      {/* Parent row: link on left, toggle chevron on right */}
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          className="flex-1 py-4 px-5 text-[15px] font-display font-medium text-pmi-dark hover:text-pmi-purple transition-colors leading-[1.6]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => toggleSubmenu(link.name)}
                          className="flex items-center justify-center w-12 h-12 mr-1 rounded-full hover:bg-white transition-colors"
                          aria-label={`Toggle ${link.name} submenu`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${expandedSubmenu === link.name ? 'rotate-180' : ''}`}
                          />
                        </button>
                      </div>

                      {/* Expandable submenu */}
                      <AnimatePresence>
                        {expandedSubmenu === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="bg-white/70 border-l-2 border-pmi-orange ml-5 mr-4 mb-3 rounded-r-lg">
                              {link.mega.map((col) => (
                                <div key={col.title}>
                                  <div className="text-[10px] font-bold text-pmi-dark/55 uppercase tracking-widest px-4 pt-3 pb-1 font-sans">
                                    {col.title}
                                  </div>
                                  {col.items.map((child, childIdx) => (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      className={`
                                        flex items-center gap-3 px-4 py-3
                                        text-[14px] font-medium font-sans text-pmi-dark/80
                                        hover:text-pmi-dark hover:bg-white
                                        transition-all duration-200 min-h-[44px]
                                        ${childIdx < col.items.length - 1 ? 'border-b border-gray-100' : ''}
                                      `}
                                      onClick={() => {
                                        setMobileMenuOpen(false)
                                        setExpandedSubmenu(null)
                                      }}
                                    >
                                      <child.icon className="w-4 h-4 text-gray-400 shrink-0" />
                                      <span className="leading-[1.6]">{child.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="flex items-center py-4 px-5 text-[15px] font-display font-medium text-pmi-dark hover:text-pmi-purple transition-colors leading-[1.6] min-h-[52px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Bottom utilities: language selector (banderas 🇪🇸 / 🇬🇧 / 🇵🇹) */}
              <div className="px-5 py-4 border-t border-pmi-dark/10 flex items-center gap-3">
                <Globe className="w-4 h-4 text-gray-400" aria-hidden />
                <div className="flex items-center gap-1" role="group" aria-label={t.nav.language}>
                  {LOCALES.map((lng) => (
                    <button
                      key={lng}
                      onClick={() => {
                        changeLanguage(lng)
                        setMobileMenuOpen(false)
                      }}
                      aria-label={LOCALE_NAMES[lng]}
                      aria-current={currentLang === lng ? 'true' : undefined}
                      title={LOCALE_NAMES[lng]}
                      className={`px-2 py-1.5 rounded-md transition-all ${
                        currentLang === lng
                          ? 'bg-pmi-dark/10 ring-1 ring-pmi-dark/30 opacity-100'
                          : 'opacity-50 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-gray-50'
                      }`}
                    >
                      <FlagIcon locale={lng} className="w-7 h-[18px] rounded-[2px] ring-1 ring-black/10" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 px-5 pb-5">
                <Link
                  href={getLink('/auth/signin')}
                  className="w-full text-center py-3 text-[14px] font-medium text-pmi-dark border border-pmi-dark/20 rounded-full hover:bg-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.signIn}
                </Link>
                <Link
                  href={getLink('/auth/signup')}
                  className="w-full text-center py-3 text-[14px] font-semibold text-white bg-pmi-dark rounded-full hover:bg-pmi-purple transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.signUp}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
