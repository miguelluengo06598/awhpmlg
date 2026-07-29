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
import { DotPattern } from '@/components/magicui/dot-pattern'

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

  // Tema dark-glass exclusivo del panel admin (brandColor 'slate'); 'light' = cliente intacto.
  const isDark = brandColor === 'slate'
  const sidebarBg      = isDark ? 'bg-[#0A0E17]/80 backdrop-blur-xl border-r border-white/10' : 'bg-white border-r border-gray-100'
  const sidebarText    = isDark ? 'text-slate-300'   : 'text-gray-700'
  const sidebarHover   = isDark ? 'hover:bg-white/[0.06] hover:text-white' : 'hover:bg-gray-50 hover:text-pmi-dark'
  const sidebarActive  = isDark ? 'bg-white/[0.06] text-white' : 'bg-pmi-dark text-white shadow-md'
  const sidebarIcon    = isDark ? 'text-slate-400'   : 'text-gray-400'

  // Show spinner while checking auth or if role mismatch (redirecting)
  if (loading || !user || user.role !== role) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#05060A]' : 'bg-pmi-cream'} flex items-center justify-center`}>
        <div className="w-10 h-10 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    )
  }

  const displayName = user.email || 'Usuario'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#05060A] text-slate-200' : 'bg-pmi-cream'} flex`}>
      {/* Fondo sutil de rejilla de puntos (solo admin) */}
      {isDark && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <DotPattern />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.06),transparent_55%)]" />
        </div>
      )}

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg shadow-md flex items-center justify-center border ${
          isDark ? 'bg-[#0A0E17]/80 backdrop-blur-xl border-white/10 text-slate-200' : 'bg-white border-gray-100 text-gray-700'
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
        <div className={`h-16 flex items-center px-6 border-b ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
              <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
              <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
              <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
            </svg>
            <div>
              <span className={`font-bold text-sm block leading-tight ${isDark ? 'text-white' : 'text-pmi-dark'}`}>AECOMI</span>
              <span className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-cyan-300/80' : 'text-gray-400'}`}>{role === 'admin' ? 'Admin Panel' : 'Client'}</span>
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
                {/* Indicador lateral con glow (solo admin, item activo) */}
                {active && isDark && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-cyan-400 to-violet-500 shadow-[0_0_12px_2px_rgba(34,211,238,0.55)]" />
                )}
                <item.icon className={`w-5 h-5 ${active ? (isDark ? 'text-cyan-300' : 'text-white') : sidebarIcon}`} />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight className={`w-4 h-4 ${isDark ? 'text-cyan-300' : ''}`} />}
              </Link>
            )
          })}
        </nav>

        <div className={`p-3 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isDark ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="relative z-10 flex-1 min-w-0">
        <header className={`sticky top-0 z-30 ${isDark ? 'bg-[#0A0E17]/70 backdrop-blur-xl border-b border-white/10' : 'bg-white border-b border-gray-100'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span className={`font-medium capitalize ${isDark ? 'text-white' : 'text-pmi-dark'}`}>{role === 'admin' ? 'Dashboard' : 'Inicio'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={`hidden sm:inline text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Hola, {displayName}</span>
              <button className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors border ${isDark ? 'border-white/10 hover:bg-white/[0.06] text-slate-300' : 'border-gray-100 hover:bg-gray-50 text-gray-600'}`}>
                <Bell className="w-5 h-5" />
              </button>
              <div className={`hidden sm:flex items-center justify-center w-10 h-10 rounded-xl border ${isDark ? 'bg-white/[0.04] border-white/10 text-cyan-300' : 'bg-pmi-cream border-gray-100 text-pmi-dark'}`}>
                <User className="w-5 h-5" />
              </div>
              <button
                onClick={handleLogout}
                className={`hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl transition-colors border ${isDark ? 'text-red-300 border-red-400/20 hover:bg-red-500/10' : 'text-red-600 hover:text-red-700 border-red-100 hover:bg-red-50'}`}
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
