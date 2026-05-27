'use client'

import DashboardShell from '@/components/dashboard/DashboardShell'
import {
  Home,
  FileText,
  Award,
  Shield,
  FolderOpen,
  CreditCard,
  Settings,
  PlusCircle,
} from 'lucide-react'

const navItems = [
  { name: 'Inicio', href: '/dashboard/client', icon: Home },
  { name: 'Solicitar Certificación', href: '/dashboard/client/apply-certification', icon: PlusCircle },
  { name: 'Mis solicitudes', href: '/dashboard/client/applications', icon: FileText },
  { name: 'Certificaciones', href: '/dashboard/client/certifications', icon: Award },
  { name: 'Mi Certificado', href: '/dashboard/client/certificate', icon: Shield },
  { name: 'Documentos', href: '/dashboard/client/documents', icon: FolderOpen },
  { name: 'Pagos', href: '/dashboard/client/payments', icon: CreditCard },
  { name: 'Configuración', href: '/dashboard/client/settings', icon: Settings },
]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell navItems={navItems} role="client" basePath="/dashboard/client" brandColor="light">
      {children}
    </DashboardShell>
  )
}
