'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Globe, Users, Award, BookOpen, FileText, GraduationCap, Landmark, FolderOpen, Wrench, MessageSquare, ClipboardList, Layers, HardHat, Search, BadgeCheck } from 'lucide-react'
import { useTranslation } from '@/lib/useTranslation'

export default function Header() {
  const { currentLang, t, getLink } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

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
            { name: isEs() ? 'Formación Especializada' : 'Specialized Training', href: getLink('/about/formacion'), icon: GraduationCap },
            { name: isEs() ? 'Guías y Estándares' : 'Guides & Standards', href: getLink('/about/guias-estandares'), icon: BookOpen },
          ],
        },
        {
          title: isEs() ? 'Recursos' : 'Resources',
          items: [
            { name: isEs() ? 'Descargar Guías' : 'Download Guides', href: getLink('/about/guias-estandares'), icon: FolderOpen },
            { name: isEs() ? 'Recursos Técnicos' : 'Technical Resources', href: getLink('/about/guias-estandares'), icon: Wrench },
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
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-[#e0e0e0] z-50 overflow-hidden"
                        style={{ minWidth: 520 }}
                      >
                        <div className="flex p-5">
                          {link.mega.map((col, colIdx) => (
                            <div key={col.title} className={`flex-1 ${colIdx > 0 ? 'pl-5 ml-5 border-l border-[#f0f0f0]' : ''}`}>
                              <h4 className="text-[12px] font-bold text-[#666] uppercase tracking-wider mb-3">
                                {col.title}
                              </h4>
                              <div className="flex flex-col gap-1">
                                {col.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[14px] text-[#333] hover:text-[#0066CC] hover:bg-[#f9fbff] transition-all duration-200"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <item.icon className="w-4 h-4 text-gray-400 shrink-0" />
                                    {item.name}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <nav className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.04 }}
                >
                  {link.mega ? (
                    <div className="border-b border-gray-50">
                      <Link
                        href={link.href}
                        className="block py-3 text-[15px] font-medium text-gray-800 hover:text-pmi-dark transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      <div className="pl-4 pb-2 flex flex-col gap-0.5">
                        {link.mega.map((col) => (
                          <div key={col.title}>
                            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider py-2">{col.title}</div>
                            {col.items.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                className="flex items-center gap-2 py-2.5 text-sm text-gray-600 hover:text-pmi-dark transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <span className="w-1 h-1 rounded-full bg-pmi-cyan/60" />
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-3 text-[15px] font-medium text-gray-800 hover:text-pmi-dark border-b border-gray-50 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    toggleLanguage()
                    setMobileMenuOpen(false)
                  }}
                  className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-pmi-dark"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{currentLang === 'en' ? 'Español' : 'English'}</span>
                </button>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <Link
                  href={getLink('/auth/signin')}
                  className="w-full text-center py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t.nav.signIn}
                </Link>
                <Link
                  href={getLink('/auth/signup')}
                  className="w-full text-center py-2.5 text-sm font-semibold text-white bg-pmi-dark rounded-lg hover:bg-pmi-purple"
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
