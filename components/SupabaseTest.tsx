'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SupabaseTest() {
  const [results, setResults] = useState<Record<string, any>>({})

  useEffect(() => {
    const testSupabase = async () => {
      console.log('═══════════════════════════════════════════════')
      console.log('           TEST DE CONEXIÓN SUPABASE')
      console.log('═══════════════════════════════════════════════')

      const output: Record<string, any> = {}

      // Test 1: Variables de entorno
      console.log('\n📋 TEST 1: Variables de entorno')
      output.env = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configurada' : '❌ FALTA',
        key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ FALTA',
        urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 40) + '...',
      }
      console.log('   URL:', output.env.url)
      console.log('   Key:', output.env.key)

      // Test 2: Cliente inicializado
      console.log('\n📋 TEST 2: Cliente Supabase')
      try {
        output.client = { initialized: !!supabase, hasAuth: !!supabase.auth }
        console.log('   Cliente creado:', output.client.initialized ? '✅ Sí' : '❌ No')
        console.log('   Tiene auth:', output.client.hasAuth ? '✅ Sí' : '❌ No')
      } catch (err: any) {
        output.client = { error: err.message }
        console.log('   ❌ Error:', err.message)
      }

      // Test 3: Obtener sesión actual
      console.log('\n📋 TEST 3: Sesión actual')
      try {
        const { data, error } = await supabase.auth.getSession()
        output.session = { data, error: error?.message || null }
        if (error) {
          console.log('   ❌ Error:', error.message)
        } else if (data.session) {
          console.log('   ✅ Sesión activa encontrada')
          console.log('   User ID:', data.session.user.id)
        } else {
          console.log('   ℹ️ No hay sesión activa (esperado)')
        }
      } catch (err: any) {
        output.session = { error: err.message, type: err.name }
        console.log('   ❌ Error:', err.name, '-', err.message)
      }

      // Test 4: Query simple a la base de datos
      console.log('\n📋 TEST 4: Query a base de datos')
      try {
        const { data, error } = await supabase
          .from('certifications_catalog')
          .select('*')
          .limit(1)

        output.query = { data, error: error?.message || null }
        if (error) {
          console.log('   ❌ Error:', error.message, '| Código:', error.code)
        } else if (data && data.length > 0) {
          console.log('   ✅ Conexión exitosa. Datos recibidos:', data.length, 'filas')
          console.log('   Primera certificación:', data[0].name)
        } else {
          console.log('   ⚠️ Conectado pero sin datos')
        }
      } catch (err: any) {
        output.query = { error: err.message, type: err.name, stack: err.stack }
        console.log('   ❌ Error CRÍTICO:', err.name, '-', err.message)
        if (err.message === 'Failed to fetch') {
          console.log('   💡 ESTO SIGNIFICA:')
          console.log('      - CORS bloqueando la petición')
          console.log('      - URL de Supabase incorrecta')
          console.log('      - Proyecto Supabase pausado o eliminado')
          console.log('      - Firewall bloqueando conexiones')
        }
      }

      // Test 5: Auth directo (login de prueba)
      console.log('\n📋 TEST 5: Auth endpoint')
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'test-nonexistent@aecmi.com',
          password: 'test123456',
        })
        output.auth = { data: !!data, error: error?.message || null }
        if (error && error.message === 'Invalid login credentials') {
          console.log('   ✅ Auth endpoint responde correctamente (credenciales inválidas como esperado)')
        } else if (error) {
          console.log('   ⚠️ Auth error:', error.message)
        } else {
          console.log('   ✅ Login inesperado...')
        }
      } catch (err: any) {
        output.auth = { error: err.message, type: err.name }
        console.log('   ❌ Error en Auth:', err.name, '-', err.message)
      }

      console.log('\n═══════════════════════════════════════════════')
      console.log('                  FIN DEL TEST')
      console.log('═══════════════════════════════════════════════')

      setResults(output)
    }

    testSupabase()
  }, [])

  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <details className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <summary className="px-4 py-3 bg-gray-50 cursor-pointer text-sm font-semibold text-gray-700 hover:bg-gray-100 select-none">
          🔧 Supabase Test
        </summary>
        <div className="p-4 text-xs space-y-2 font-mono max-h-80 overflow-auto">
          <div>
            <span className="font-bold">Env URL:</span>{' '}
            <span className={results.env?.url?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {results.env?.url}
            </span>
          </div>
          <div>
            <span className="font-bold">Env Key:</span>{' '}
            <span className={results.env?.key?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
              {results.env?.key}
            </span>
          </div>
          <div>
            <span className="font-bold">Session:</span>{' '}
            {results.session?.error ? (
              <span className="text-red-600">{results.session.error}</span>
            ) : results.session?.data?.session ? (
              <span className="text-green-600">Activa</span>
            ) : (
              <span className="text-gray-500">Ninguna</span>
            )}
          </div>
          <div>
            <span className="font-bold">DB Query:</span>{' '}
            {results.query?.error ? (
              <span className="text-red-600">{results.query.error}</span>
            ) : results.query?.data ? (
              <span className="text-green-600">OK ({results.query.data.length} filas)</span>
            ) : (
              <span className="text-gray-500">Pendiente...</span>
            )}
          </div>
          <div>
            <span className="font-bold">Auth:</span>{' '}
            {results.auth?.error ? (
              <span className="text-red-600">{results.auth.error}</span>
            ) : (
              <span className="text-green-600">OK</span>
            )}
          </div>
          {results.query?.error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded text-red-700">
              <p className="font-bold">Error detectado:</p>
              <p>{results.query.error}</p>
              <p className="mt-1 text-gray-600">
                Revisa F12 → Network para ver el detalle del error CORS/fetch.
              </p>
            </div>
          )}
        </div>
      </details>
    </div>
  )
}
