'use client'

import { useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  LogOut,
  User,
  Menu,
  X,
  ChevronRight,
  Home,
} from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { clearAuthHint } from '@/lib/authHint'
import { useAuth } from '@/hooks/useAuth'
import { useDashboardLocale } from '@/lib/useDashboardLocale'
import { translations } from '@/lib/translations'
import { LOCALES } from '@/lib/locale'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

interface DashboardShellProps {
  children: ReactNode
  navItems: NavItem[]
  role: 'client' | 'admin'
  basePath: string
  brandColor: string
}

export default function DashboardShell({ children, navItems, role, basePath, brandColor }: DashboardShellProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  // Idioma del panel (cookie NEXT_LOCALE); las cadenas traducidas solo se usan en admin.
  const { locale, setLocale } = useDashboardLocale()
  const ta = translations[locale].admin

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace('/auth/signin')
      return
    }

    if (user.role !== role) {
      const redirect = user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client'
      router.replace(redirect)
    }
  }, [user, loading, role, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('aecomi_session')
    sessionStorage.removeItem('aecomi_session')
    clearAuthHint()
    router.push('/auth/signin')
  }

  const isActive = (href: string) => {
    if (href === basePath) return pathname === href
    return pathname.startsWith(href)
  }

  // Tema claro-moderno exclusivo del panel admin (brandColor 'slate'); 'light' = cliente intacto.
  const isAdminTheme = brandColor === 'slate'
  const sidebarBg      = isAdminTheme ? 'bg-white border-r border-slate-200' : 'bg-white border-r border-gray-100'
  const sidebarText    = isAdminTheme ? 'text-slate-600'   : 'text-gray-700'
  const sidebarHover   = isAdminTheme ? 'hover:bg-slate-100 hover:text-slate-900' : 'hover:bg-gray-50 hover:text-pmi-dark'
  const sidebarActive  = isAdminTheme ? 'bg-indigo-50 text-indigo-700' : 'bg-pmi-dark text-white shadow-md'
  const sidebarIcon    = isAdminTheme ? 'text-slate-400'   : 'text-gray-400'

  // Show spinner while checking auth or if role mismatch (redirecting)
  if (loading || !user || user.role !== role) {
    return (
      <div className={`min-h-screen ${isAdminTheme ? 'bg-slate-50' : 'bg-pmi-cream'} flex items-center justify-center`}>
        <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    )
  }

  const displayName = user.email || 'Usuario'

  return (
    <div className={`min-h-screen ${isAdminTheme ? 'bg-slate-50' : 'bg-pmi-cream'} flex`}>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg shadow-md flex items-center justify-center border ${
          isAdminTheme ? 'bg-white border-slate-200 text-slate-700' : 'bg-white border-gray-100 text-gray-700'
        }`}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 ${sidebarBg} flex flex-col transition-transform lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className={`h-16 flex items-center px-6 border-b ${isAdminTheme ? 'border-slate-200' : 'border-gray-100'}`}>
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
              <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
              <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
              <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
            </svg>
            <div>
              <span className={`font-bold text-sm block leading-tight ${isAdminTheme ? 'text-slate-900' : 'text-pmi-dark'}`}>AECOMI</span>
              <span className={`text-[10px] uppercase tracking-wider ${isAdminTheme ? 'text-indigo-600' : 'text-gray-400'}`}>{isAdminTheme ? ta.panelBadge : 'Client'}</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? sidebarActive : `${sidebarText} ${sidebarHover}`
                }`}
              >
                {/* Indicador lateral de color (solo admin, item activo) */}
                {active && isAdminTheme && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan-500 to-violet-500" />
                )}
                <item.icon className={`w-5 h-5 ${active ? (isAdminTheme ? 'text-indigo-600' : 'text-white') : sidebarIcon}`} />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight className={`w-4 h-4 ${isAdminTheme ? 'text-indigo-600' : ''}`} />}
              </Link>
            )
          })}
        </nav>

        <div className={`p-3 border-t space-y-2 ${isAdminTheme ? 'border-slate-200' : 'border-gray-100'}`}>
          {/* Selector de idioma (solo panel admin) */}
          {isAdminTheme && (
            <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-1" role="group" aria-label={ta.language}>
              {LOCALES.map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLocale(lng)}
                  aria-current={locale === lng ? 'true' : undefined}
                  className={`flex-1 rounded-md py-1 text-[11px] font-semibold transition-colors ${
                    locale === lng ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-5 h-5" />
            <span>{isAdminTheme ? ta.logout : 'Cerrar sesión'}</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="relative z-10 flex-1 min-w-0">
        <header className={`sticky top-0 z-30 ${isAdminTheme ? 'bg-white border-b border-slate-200' : 'bg-white border-b border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className={`flex items-center gap-2 text-sm ${isAdminTheme ? 'text-slate-500' : 'text-gray-500'}`}>
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span className={`font-medium capitalize ${isAdminTheme ? 'text-slate-900' : 'text-pmi-dark'}`}>{isAdminTheme ? ta.breadcrumbHome : 'Inicio'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`hidden sm:inline text-sm ${isAdminTheme ? 'text-slate-500' : 'text-gray-500'}`}>{isAdminTheme ? ta.greeting : 'Hola,'} {displayName}</span>
              <button className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${isAdminTheme ? 'border-slate-200 hover:bg-slate-100 text-slate-500' : 'border-gray-100 hover:bg-gray-50 text-gray-600'}`}>
                <Bell className="w-5 h-5" />
              </button>
              <div className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border ${isAdminTheme ? 'bg-slate-100 border-slate-200 text-indigo-600' : 'bg-pmi-cream border-gray-100 text-pmi-dark'}`}>
                <User className="w-5 h-5" />
              </div>
              <button
                onClick={handleLogout}
                className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl transition-colors border ${isAdminTheme ? 'text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50' : 'text-red-600 hover:text-red-700 border-red-100 hover:bg-red-50'}`}
              >
                <LogOut className="w-4 h-4" /> Salir
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  )
}
