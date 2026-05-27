'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabaseClient'

export default function AuthTestPage() {
  const { user, loading } = useAuth()
  const [rawSession, setRawSession] = useState<any>(null)
  const [rawUserRow, setRawUserRow] = useState<any>(null)
  const [queryLog, setQueryLog] = useState<string[]>([])

  const log = (msg: string) => {
    const ts = new Date().toLocaleTimeString('es-ES', { hour12: false })
    setQueryLog((p) => [...p, `[${ts}] ${msg}`])
    console.log(msg)
  }

  const runFullDiag = async () => {
    setQueryLog([])
    setRawSession(null)
    setRawUserRow(null)

    log('=== DIAGNÓSTICO COMPLETO ===')

    // 1. Session
    log('1. Verificando sesión Supabase...')
    const { data: { session }, error: sessError } = await supabase.auth.getSession()
    if (sessError) {
      log(`   ❌ Error sesión: ${sessError.message}`)
    } else if (!session) {
      log('   ❌ No hay sesión activa')
    } else {
      log(`   ✅ Sesión encontrada`)
      log(`   Email: ${session.user.email}`)
      log(`   ID: ${session.user.id}`)
      setRawSession({ email: session.user.email, id: session.user.id })
    }

    if (!session) {
      log('   ⛔ Sin sesión — deteniéndose aquí')
      return
    }

    // 2. public.users row
    log('2. Consultando public.users...')
    const { data: row, error: rowError } = await supabase
      .from('users')
      .select('id, email, role, first_name, last_name')
      .eq('id', session.user.id)
      .single()

    if (rowError) {
      log(`   ❌ Error: ${rowError.message}`)
      log('   ⚠️  El usuario NO existe en public.users')
      log('   ➡️  Solución: ejecuta supabase_auth_setup.sql en Supabase SQL Editor')
    } else if (!row) {
      log('   ❌ No se encontró registro en public.users')
    } else {
      log(`   ✅ Registro encontrado`)
      log(`   Rol: ${row.role ?? '❌ NULL — actualiza con SQL'}`)
      log(`   Nombre: ${row.first_name} ${row.last_name}`)
      setRawUserRow(row)
    }

    // 3. Summary
    log('=== RESULTADO ===')
    if (row?.role) {
      log(`✅ SISTEMA OK — Usuario: ${session.user.email} | Rol: ${row.role}`)
      log(`   Debería redirigir a: ${row.role === 'admin' ? '/dashboard/admin' : '/dashboard/client'}`)
    } else {
      log('❌ PROBLEMA: El rol es NULL o el usuario no está en public.users')
      log('   Ejecuta: supabase_auth_setup.sql en Supabase > SQL Editor')
    }
  }

  const doLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth/signin'
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>🔍 Debug — Auth & Roles</h1>
      <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Diagnóstico del sistema de autenticación y detección de roles
      </p>

      {/* useAuth status */}
      <div style={{ padding: '1rem', borderRadius: 8, border: '1px solid #ddd', marginBottom: '1rem', backgroundColor: loading ? '#fffbeb' : !user ? '#fef2f2' : '#f0fdf4' }}>
        <strong>Estado de useAuth():</strong>
        {loading ? (
          <p>⏳ Cargando...</p>
        ) : !user ? (
          <>
            <p style={{ color: '#dc2626' }}>❌ SIN USUARIO — no logueado o no en public.users</p>
            <a href="/auth/signin" style={{ color: '#2563eb' }}>→ Ir a login</a>
          </>
        ) : (
          <>
            <p style={{ color: '#16a34a' }}>✅ Usuario detectado</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Rol:</strong> {user.role
              ? <strong style={{ color: user.role === 'admin' ? '#7c3aed' : '#2563eb' }}>{user.role}</strong>
              : <strong style={{ color: '#dc2626' }}>❌ NULL — falta actualizar en BD</strong>
            }</p>
            {user.role === 'admin'
              ? <a href="/dashboard/admin" style={{ color: '#7c3aed', display: 'block', marginTop: 8 }}>→ Ir a Dashboard Admin</a>
              : <a href="/dashboard/client" style={{ color: '#2563eb', display: 'block', marginTop: 8 }}>→ Ir a Dashboard Client</a>
            }
          </>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <button
          onClick={runFullDiag}
          style={{ padding: '0.5rem 1rem', background: '#1e293b', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.875rem' }}
        >
          🔍 Diagnóstico completo
        </button>
        <a
          href="/auth/signin"
          style={{ padding: '0.5rem 1rem', background: '#2563eb', color: 'white', borderRadius: 6, textDecoration: 'none', fontSize: '0.875rem' }}
        >
          🔑 Ir a Login
        </a>
        {user && (
          <button
            onClick={doLogout}
            style={{ padding: '0.5rem 1rem', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: '0.875rem' }}
          >
            🚪 Logout
          </button>
        )}
      </div>

      {/* SQL hint */}
      {(!user || !user.role) && (
        <div style={{ padding: '1rem', background: '#fffbeb', border: '1px solid #fbbf24', borderRadius: 8, marginBottom: '1rem', fontSize: '0.875rem' }}>
          <strong>⚠️ Acción requerida:</strong>
          <p style={{ marginTop: 4 }}>El usuario no está en <code>public.users</code> o el rol es NULL. Ejecuta en <strong>Supabase SQL Editor</strong>:</p>
          <pre style={{ background: '#1e293b', color: '#86efac', padding: '0.75rem', borderRadius: 6, marginTop: 8, overflowX: 'auto', fontSize: '0.8rem' }}>{`-- Ver usuarios
SELECT id, email, role FROM public.users;

-- Sincronizar desde auth.users
INSERT INTO public.users (id, email, first_name, last_name, role, is_active)
SELECT au.id, au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', split_part(au.email,'@',1)),
  COALESCE(au.raw_user_meta_data->>'last_name', ''),
  'client', true
FROM auth.users au LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Asignar rol admin (cambia el email)
UPDATE public.users SET role = 'admin' WHERE email = 'adin@aecmi.com';`}</pre>
        </div>
      )}

      {/* Diagnostic log */}
      {queryLog.length > 0 && (
        <div style={{ background: '#0f172a', borderRadius: 8, padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Log de diagnóstico</span>
            <button onClick={() => setQueryLog([])} style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.75rem' }}>Limpiar</button>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', maxHeight: 300, overflowY: 'auto' }}>
            {queryLog.map((line, i) => (
              <div key={i} style={{ color: line.includes('❌') ? '#f87171' : line.includes('✅') ? '#86efac' : line.includes('===') ? '#fde68a' : '#cbd5e1', marginBottom: 2 }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
