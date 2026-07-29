'use client'

import DashboardShell from '@/components/dashboard/DashboardShell'
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  Mail,
  CalendarDays,
} from 'lucide-react'
import { useDashboardLocale } from '@/lib/useDashboardLocale'
import { translations } from '@/lib/translations'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { locale } = useDashboardLocale()
  const nav = translations[locale].admin.nav

  // Solo cambian las etiquetas (presentacional); href e iconos intactos.
  const navItems = [
    { name: nav.dashboard,    href: '/dashboard/admin',              icon: LayoutDashboard },
    { name: nav.applications, href: '/dashboard/admin/applications', icon: FileText },
    { name: nav.users,        href: '/dashboard/admin/users',        icon: Users },
    { name: nav.payments,     href: '/dashboard/admin/payments',     icon: CreditCard },
    { name: nav.messages,     href: '/dashboard/admin/messages',     icon: Mail },
    { name: nav.exams,        href: '/dashboard/admin/exams',        icon: CalendarDays },
  ]

  return (
    <DashboardShell navItems={navItems} role="admin" basePath="/dashboard/admin" brandColor="slate">
      {children}
    </DashboardShell>
  )
}
