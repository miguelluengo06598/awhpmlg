'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'client'
  children: React.ReactNode
}

export function ProtectedRoute({ requiredRole, children }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace('/auth/signin')
      return
    }
    if (requiredRole && user.role && user.role !== requiredRole) {
      router.replace(user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client')
    }
  }, [user, loading, requiredRole, router])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
      </div>
    )
  }

  if (!user) return null
  if (requiredRole && user.role && user.role !== requiredRole) return null

  return <>{children}</>
}
