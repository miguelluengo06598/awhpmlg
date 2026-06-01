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
import { useAuth } from '@/hooks/useAuth'

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
    localStorage.removeItem('aecmi_session')
    sessionStorage.removeItem('aecmi_session')
    document.cookie = 'aecmi-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax'
    router.push('/auth/signin')
  }

  const isActive = (href: string) => {
    if (href === basePath) return pathname === href
    return pathname.startsWith(href)
  }

  const sidebarBg      = brandColor === 'slate' ? 'bg-slate-900 border-r border-slate-800' : 'bg-white border-r border-gray-100'
  const sidebarText    = brandColor === 'slate' ? 'text-slate-300'   : 'text-gray-700'
  const sidebarHover   = brandColor === 'slate' ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-gray-50 hover:text-pmi-dark'
  const sidebarActive  = brandColor === 'slate' ? 'bg-pmi-blue text-white shadow-md'   : 'bg-pmi-dark text-white shadow-md'
  const sidebarIcon    = brandColor === 'slate' ? 'text-slate-400'   : 'text-gray-400'

  // Show spinner while checking auth or if role mismatch (redirecting)
  if (loading || !user || user.role !== role) {
    return (
      <div className={`min-h-screen ${brandColor === 'slate' ? 'bg-slate-50' : 'bg-pmi-cream'} flex items-center justify-center`}>
        <div className="w-10 h-10 border-4 border-pmi-blue/20 border-t-pmi-blue rounded-full animate-spin" />
      </div>
    )
  }

  const displayName = user.email || 'Usuario'

  return (
    <div className={`min-h-screen ${brandColor === 'slate' ? 'bg-slate-50' : 'bg-pmi-cream'} flex`}>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-100"
      >
        {mobileOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
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
        <div className={`h-16 flex items-center px-6 border-b ${brandColor === 'slate' ? 'border-slate-800' : 'border-gray-100'}`}>
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="8" width="14" height="24" fill="#00A3C4" rx="1"/>
              <rect x="18" y="4" width="8" height="18" fill="#E87722" rx="1"/>
              <rect x="18" y="24" width="8" height="12" fill="#5B2D8E" rx="1"/>
              <rect x="28" y="12" width="10" height="20" fill="#003B5C" rx="1"/>
            </svg>
            <div>
              <span className={`font-bold text-sm block leading-tight ${brandColor === 'slate' ? 'text-white' : 'text-pmi-dark'}`}>AECMI</span>
              <span className={`text-[10px] uppercase tracking-wider ${brandColor === 'slate' ? 'text-slate-400' : 'text-gray-400'}`}>{role === 'admin' ? 'Admin Panel' : 'Client'}</span>
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? sidebarActive : `${sidebarText} ${sidebarHover}`
                }`}
              >
                <item.icon className={`w-5 h-5 ${active ? 'text-white' : sidebarIcon}`} />
                <span className="flex-1">{item.name}</span>
                {active && <ChevronRight className="w-4 h-4" />}
              </Link>
            )
          })}
        </nav>

        <div className={`p-3 border-t ${brandColor === 'slate' ? 'border-slate-800' : 'border-gray-100'}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              brandColor === 'slate' ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Home className="w-4 h-4" />
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium text-pmi-dark capitalize">{role === 'admin' ? 'Dashboard' : 'Inicio'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-gray-500">Hola, {displayName}</span>
              <button className="relative w-10 h-10 rounded-xl hover:bg-gray-50 flex items-center justify-center transition-colors border border-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-pmi-cream border border-gray-100">
                <User className="w-5 h-5 text-pmi-dark" />
              </div>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700 font-medium px-3 py-2 rounded-xl hover:bg-red-50 transition-colors border border-red-100"
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
