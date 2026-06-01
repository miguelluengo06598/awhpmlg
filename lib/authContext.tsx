'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from './supabaseClient'

export interface AuthUser {
  id: string
  email?: string
  role?: string
}

interface AuthContextValue {
  user: AuthUser | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const resolveUser = async (userId: string, email?: string) => {
      try {
        const { data } = await supabase
          .from('users')
          .select('id, email, role')
          .eq('id', userId)
          .single()
        setUser({ id: userId, email, role: data?.role })
      } catch {
        setUser({ id: userId, email })
      } finally {
        setLoading(false)
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { setUser(null); setLoading(false); return }
      resolveUser(session.user.id, session.user.email)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) { setUser(null); setLoading(false); return }
        resolveUser(session.user.id, session.user.email)
      }
    )

    return () => { subscription.unsubscribe() }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext)
}
