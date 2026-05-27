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

const navItems = [
  { name: 'Dashboard',   href: '/dashboard/admin',              icon: LayoutDashboard },
  { name: 'Solicitudes', href: '/dashboard/admin/applications', icon: FileText },
  { name: 'Usuarios',    href: '/dashboard/admin/users',        icon: Users },
  { name: 'Pagos',       href: '/dashboard/admin/payments',     icon: CreditCard },
  { name: 'Contactos',   href: '/dashboard/admin/messages',     icon: Mail },
  { name: 'Exámenes',    href: '/dashboard/admin/exams',        icon: CalendarDays },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={navItems} role="admin" basePath="/dashboard/admin" brandColor="slate">
      {children}
    </DashboardShell>
  )
}
