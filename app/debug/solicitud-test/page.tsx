'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { RefreshCw, User, Database, HardDrive, Table, UserCheck } from 'lucide-react'

export default function DebugSolicitudPage() {
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString('es-ES', { hour12: false })
    const line = `[${time}] ${message}`
    console.log(line)
    setLogs((prev) => [...prev, line])
  }

  const clearLogs = () => setLogs([])

  const testAuth = async () => {
    addLog('=== TEST AUTH ===')
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        addLog(`❌ Error auth: ${error.message}`)
        return
      }
      if (user) {
        addLog(`✅ Usuario logueado: ${user.email}`)
        addLog(`   ID: ${user.id.substring(0, 8)}...`)
      } else {
        addLog('❌ No hay usuario logueado')
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`)
    }
  }

  const testDB = async () => {
    addLog('=== TEST BASE DE DATOS ===')
    try {
      const { data, error } = await supabase
        .from('certifications_catalog')
        .select('id, name, fee, is_active')
      if (error) {
        addLog(`❌ Error: ${error.message}`)
      } else {
        addLog(`✅ Certificaciones encontradas: ${data.length}`)
        data.forEach((cert: any) => {
          addLog(`   - ${cert.name} | €${cert.fee} | activa: ${cert.is_active}`)
        })
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`)
    }
  }

  const testStorage = async () => {
    addLog('=== TEST STORAGE ===')
    try {
      const { data, error } = await supabase.storage
        .from('application-documents')
        .list('', { limit: 5 })

      if (error) {
        addLog(`❌ Error: ${error.message}`)
      } else {
        addLog(`✅ Storage accesible. Carpetas/Archivos en raíz: ${data.length}`)
        data.forEach((item: any) => {
          addLog(`   - ${item.name} ${item.id ? '(archivo)' : '(carpeta)'}`)
        })
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`)
    }
  }

  const testTable = async () => {
    addLog('=== TEST TABLA applications ===')
    try {
      const { data, error } = await supabase
        .from('certifications_applications')
        .select('*')
        .limit(3)

      if (error) {
        addLog(`❌ Error: ${error.message}`)
      } else {
        addLog(`✅ Tabla accesible. Registros mostrados: ${data.length}`)
        data.forEach((app: any) => {
          addLog(`   - ${app.id?.substring(0, 8)}... | status: ${app.status} | cert_id: ${app.certification_id?.substring(0, 8)}...`)
        })
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`)
    }
  }

  const testDocumentsTable = async () => {
    addLog('=== TEST TABLA documents ===')
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .limit(3)

      if (error) {
        addLog(`❌ Error: ${error.message}`)
      } else {
        addLog(`✅ Tabla documents accesible. Registros: ${data.length}`)
        data.forEach((doc: any) => {
          addLog(`   - ${doc.document_type} | ${doc.file_name}`)
        })
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`)
    }
  }

  const testUserProfile = async () => {
    addLog('=== TEST TABLA users ===')
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      if (authError || !user) {
        addLog('❌ No hay sesión activa para testear perfil')
        return
      }
      const { data, error } = await supabase
        .from('users')
        .select('id, first_name, last_name, email, phone, role')
        .eq('id', user.id)
        .single()
      if (error) {
        addLog(`❌ Error perfil: ${error.message}`)
        addLog('   ⚠️  El usuario puede no estar en la tabla public.users (falta trigger de sync)')
      } else {
        addLog(`✅ Perfil encontrado: ${data.first_name} ${data.last_name}`)
        addLog(`   Email: ${data.email} | Rol: ${data.role}`)
      }
    } catch (err: any) {
      addLog(`❌ Error: ${err.message}`)
    }
  }

  const runAllTests = async () => {
    clearLogs()
    await testAuth()
    await testUserProfile()
    await testDB()
    await testStorage()
    await testTable()
    await testDocumentsTable()
    addLog('=== TODOS LOS TESTS COMPLETADOS ===')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold text-pmi-dark mb-2">
        Debug — Solicitud de Certificación
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Herramienta de diagnóstico para verificar Auth, Base de Datos y Storage.
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={testAuth}
          className="inline-flex items-center gap-2 px-4 py-2 bg-pmi-blue text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <User className="w-4 h-4" /> Test Auth
        </button>
        <button
          onClick={testUserProfile}
          className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 transition-colors"
        >
          <UserCheck className="w-4 h-4" /> Test Perfil
        </button>
        <button
          onClick={testDB}
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl hover:bg-emerald-700 transition-colors"
        >
          <Database className="w-4 h-4" /> Test DB
        </button>
        <button
          onClick={testStorage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors"
        >
          <HardDrive className="w-4 h-4" /> Test Storage
        </button>
        <button
          onClick={testTable}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
        >
          <Table className="w-4 h-4" /> Test Applications
        </button>
        <button
          onClick={testDocumentsTable}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
        >
          <Table className="w-4 h-4" /> Test Documents
        </button>
        <button
          onClick={runAllTests}
          className="inline-flex items-center gap-2 px-4 py-2 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Ejecutar Todos
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Logs</span>
          <button
            onClick={clearLogs}
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Limpiar
          </button>
        </div>
        <div className="font-mono text-sm max-h-[400px] overflow-y-auto space-y-1">
          {logs.length === 0 ? (
            <p className="text-gray-500 italic">Click en los botones para ver logs...</p>
          ) : (
            logs.map((log, idx) => (
              <div
                key={idx}
                className={`${
                  log.includes('❌') ? 'text-red-400' :
                  log.includes('✅') ? 'text-green-400' :
                  log.includes('===') ? 'text-yellow-400 font-bold' :
                  'text-gray-300'
                }`}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
