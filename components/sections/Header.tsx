'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, Users, Award, FileText, Landmark, MessageSquare, ClipboardList, Layers, HardHat, Search, BadgeCheck } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function Header() {
  const { currentLang, t, getLink } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null)

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'es' : 'en'
    let newPath = pathname || '/'

    if (currentLang === 'en') {
      newPath = pathname?.replace('/en', '') || '/'
      if (newPath === '') newPath = '/'
    } else {
      newPath = '/en' + pathname
    }

    router.push(newPath)
  }

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
          title: isEs() ? 'Información' : 'Information',
          items: [
            { name: isEs() ? 'Sobre AECMI' : 'About AECMI', href: getLink('/about'), icon: Users },
            { name: isEs() ? 'Gobierno y Organización' : 'Governance & Organization', href: getLink('/about/gobierno'), icon: Landmark },
            { name: isEs() ? 'Contactar' : 'Contact', href: getLink('/contact'), icon: MessageSquare },
          ],
        },
      ],
    },
    {
      name: t.nav.certifications,
      href: getLink('/certifications'),
      mega: [
        {
          title: isEs() ? 'Nuestras Certificaciones' : 'Our Certifications',
          items: [
            { name: 'Information Delivery Manager', href: getLink('/certifications/information-delivery-manager'), icon: ClipboardList },
            { name: 'BIM Design Manager', href: getLink('/certifications/bim-design-manager'), icon: Layers },
            { name: 'BIM Construction Manager', href: getLink('/certifications/bim-construction-manager'), icon: HardHat },
          ],
        },
        {
          title: isEs() ? 'Información' : 'Information',
          items: [
            { name: isEs() ? 'Registro de Certificados' : 'Certification Registry', href: getLink('/certifications/registro'), icon: BadgeCheck },
            { name: isEs() ? 'Ver todas las Cert.' : 'View all Cert.', href: getLink('/certifications'), icon: Award },
            { name: isEs() ? 'Proceso de Certificación' : 'Certification Process', href: getLink('/certifications'), icon: FileText },
          ],
        },
      ],
    },
    { name: t.nav.formation, href: getLink('/formacion') },
    { name: t.nav.contact, href: getLink('/contact') },
  ]

  function isEs() {
    return currentLang === 'es'
  }

  return (
    <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
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
                <div className="text-[11px] font-bold text-gray-900 leading-tight tracking-widest uppercase">AECMI</div>
                <div className="text-[10px] font-medium text-gray-500 leading-tight tracking-wide">BIM Certification</div>
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
                    className="flex items-center gap-1 px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-pmi-dark transition-colors rounded-lg hover:bg-gray-50/80"
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''}`}
                    />
                  </Link>

                  <AnimatePresence>
                    {openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden"
                        style={{ minWidth: 560 }}
                      >
                        {/* Dropdown arrow */}
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

                        <div className="flex p-6 gap-0">
                          {link.mega.map((col, colIdx) => (
                            <div
                              key={col.title}
                              className={`flex-1 ${colIdx > 0 ? 'pl-6 ml-6 border-l border-gray-100' : ''}`}
                            >
                              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-sans">
                                {col.title}
                              </h4>
                              <div className="flex flex-col">
                                {col.items.map((item, itemIdx) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                      group/item flex items-center gap-3 px-3 py-3 rounded-lg
                                      text-[15px] font-medium font-sans leading-snug text-gray-700
                                      hover:text-cert-idm hover:bg-blue-50/60 hover:font-semibold
                                      transition-all duration-200
                                      min-h-[48px]
                                      ${itemIdx < col.items.length - 1 ? 'border-b border-gray-50' : ''}
                                    `}
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 group-hover/item:bg-blue-100/80 flex items-center justify-center transition-colors duration-200">
                                      <item.icon className="w-4 h-4 text-gray-400 group-hover/item:text-cert-idm transition-colors duration-200" />
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
                  className="px-4 py-2 text-[15px] font-medium text-gray-700 hover:text-pmi-dark transition-colors rounded-lg hover:bg-gray-50/80"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* Right utilities */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-1.5 text-[13px] font-medium text-gray-600 hover:text-pmi-dark transition-colors px-3 py-2 rounded-lg hover:bg-gray-50/80"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'ES' : 'EN'}</span>
            </button>

            <div className="hidden sm:block w-px h-5 bg-gray-200 mx-1" />

            <Link
              href={getLink('/auth/signin')}
              className="hidden sm:inline-flex text-[13px] font-medium text-gray-700 hover:text-pmi-dark transition-colors px-3 py-2 rounded-lg hover:bg-gray-50/80"
            >
              {t.nav.signIn}
            </Link>
            <Link
              href={getLink('/auth/signup')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-[13px] font-semibold text-white bg-pmi-dark rounded-lg hover:bg-pmi-purple transition-colors shadow-sm hover:shadow-md"
            >
              {t.nav.signUp}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
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
            className="lg:hidden bg-white border-t border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            style={{ maxHeight: 'calc(100vh - 68px)', overflowY: 'auto' }}
          >
            <nav className="max-w-[1400px] mx-auto flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                  className="border-b border-gray-50 last:border-0"
                >
                  {link.mega ? (
                    <>
                      {/* Parent row: link on left, toggle chevron on right */}
                      <div className="flex items-center">
                        <Link
                          href={link.href}
                          className="flex-1 py-4 px-5 text-[15px] font-medium font-sans text-gray-800 hover:text-cert-idm transition-colors leading-[1.6]"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={() => toggleSubmenu(link.name)}
                          className="flex items-center justify-center w-12 h-12 mr-1 rounded-lg hover:bg-gray-50 transition-colors"
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
                            <div className="bg-gray-50/70 border-l-[3px] border-cert-idm ml-5 mr-4 mb-3 rounded-r-lg">
                              {link.mega.map((col) => (
                                <div key={col.title}>
                                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-1 font-sans">
                                    {col.title}
                                  </div>
                                  {col.items.map((child, childIdx) => (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      className={`
                                        flex items-center gap-3 px-4 py-3
                                        text-[14px] font-medium font-sans text-gray-700
                                        hover:text-cert-idm hover:bg-white/80
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
                      className="flex items-center py-4 px-5 text-[15px] font-medium font-sans text-gray-800 hover:text-cert-idm transition-colors leading-[1.6] min-h-[52px]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Bottom utilities */}
              <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-3">
                <button
                  onClick={() => {
                    toggleLanguage()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-pmi-dark transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{currentLang === 'en' ? 'Español' : 'English'}</span>
                </button>
              </div>

              <div className="flex flex-col gap-2 px-5 pb-5">
                <Link
                  href={getLink('/auth/signin')}
                  className="w-full text-center py-3 text-[14px] font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.signIn}
                </Link>
                <Link
                  href={getLink('/auth/signup')}
                  className="w-full text-center py-3 text-[14px] font-semibold text-white bg-pmi-dark rounded-lg hover:bg-pmi-purple transition-colors"
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
