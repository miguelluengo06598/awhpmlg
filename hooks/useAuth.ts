'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface AuthUser {
  id: string
  email?: string
  role?: string
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
}

const isDev = process.env.NODE_ENV === 'development'

export function useAuth(): AuthState {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          setUser(null)
          setLoading(false)
          return
        }

        const { data: userData, error } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', session.user.id)
          .single()

        if (error) {
          console.error('Error obteniendo datos del usuario:', error.message)
          setUser(null)
          setLoading(false)
          return
        }

        if (isDev) console.log('useAuth: rol detectado:', userData.role)

        setUser({
          id: session.user.id,
          email: session.user.email,
          role: userData.role,
        })

        setLoading(false)
      } catch (err) {
        console.error('Error en checkAuth:', err)
        setUser(null)
        setLoading(false)
      }
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!session) {
          setUser(null)
          setLoading(false)
          return
        }

        try {
          const { data: userData } = await supabase
            .from('users')
            .select('id, email, role')
            .eq('id', session.user.id)
            .single()

          setUser({
            id: session.user.id,
            email: session.user.email,
            role: userData?.role,
          })
        } catch (err) {
          console.error('onAuthStateChange: error fetching user role', err)
          setUser(null)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => { subscription?.unsubscribe() }
  }, [])

  return { user, loading }
}
