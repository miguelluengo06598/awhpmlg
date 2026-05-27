'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Download,
  Trash2,
  Upload,
  File,
  Loader2,
  AlertCircle,
  FolderOpen,
  Image,
  FileSpreadsheet,
  FileType,
} from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import {
  listApplicationDocuments,
  deleteFile,
  downloadFile,
} from '@/lib/storageClient'
import type { StorageFile } from '@/lib/storageClient'

// Mock application ID - en producción vendría de la URL o estado global
const MOCK_APPLICATION_ID = 'sample-app-id'

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

function getFileIcon(fileName: string) {
  const ext = fileName.split('.').pop()?.toLowerCase() || ''
  if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) return <Image className="w-4 h-4" />
  if (['pdf'].includes(ext)) return <FileText className="w-4 h-4" />
  if (['doc', 'docx'].includes(ext)) return <FileType className="w-4 h-4" />
  if (['xls', 'xlsx', 'csv'].includes(ext)) return <FileSpreadsheet className="w-4 h-4" />
  return <File className="w-4 h-4" />
}

export default function ClientDocumentsPage() {
  const [documents, setDocuments] = useState<StorageFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeType, setActiveType] = useState<'cv' | 'education' | 'experience' | 'portfolio' | 'other'>('cv')
  const [deletingPath, setDeletingPath] = useState<string | null>(null)

  const loadDocuments = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const docs = await listApplicationDocuments(MOCK_APPLICATION_ID)
      setDocuments(docs)
    } catch (err: any) {
      console.error('Error al cargar documentos:', err)
      setError(err.message || 'Error al cargar documentos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDocuments()
  }, [loadDocuments])

  const handleDelete = async (path: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este archivo?')) return
    setDeletingPath(path)
    try {
      await deleteFile('application-documents', path)
      setDocuments((prev) => prev.filter((d) => d.path !== path))
    } catch (err: any) {
      alert(err.message || 'Error al eliminar')
    } finally {
      setDeletingPath(null)
    }
  }

  const handleDownload = async (path: string, fileName: string) => {
    try {
      const blob = await downloadFile('application-documents', path)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err: any) {
      alert(err.message || 'Error al descargar')
    }
  }

  const filteredDocs = documents.filter((d) => d.path.includes(`/${activeType}/`))

  const typeTabs = [
    { key: 'cv' as const, label: 'CV' },
    { key: 'education' as const, label: 'Educación' },
    { key: 'experience' as const, label: 'Experiencia' },
    { key: 'portfolio' as const, label: 'Portfolio' },
    { key: 'other' as const, label: 'Otros' },
  ]

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">Documentos</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona tus archivos y evidencias para la certificación</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-3 py-2 rounded-xl border border-gray-100">
          <FolderOpen className="w-4 h-4" />
          {documents.length} {documents.length === 1 ? 'documento' : 'documentos'}
        </div>
      </div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8"
      >
        <h2 className="text-lg font-bold text-pmi-dark mb-1">Subir Documento</h2>
        <p className="text-sm text-gray-500 mb-6">
          Selecciona el tipo de documento y arrastra o haz click para subirlo
        </p>

        {/* Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {typeTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveType(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeType === tab.key
                  ? 'bg-pmi-dark text-white shadow-sm'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <FileUpload
          applicationId={MOCK_APPLICATION_ID}
          documentType={activeType}
          onSuccess={(_path, _url) => {
            loadDocuments()
          }}
          onError={(err) => console.error('❌ Error:', err)}
        />
      </motion.div>

      {/* Documents List */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-pmi-dark">Documentos Subidos</h2>
          {loading && (
            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
          )}
        </div>

        {error && (
          <div className="px-6 py-4 flex items-center gap-2 text-sm text-red-600 bg-red-50">
            <AlertCircle className="w-4 h-4" />
            {error}
            <button onClick={loadDocuments} className="ml-auto text-pmi-blue font-medium hover:underline">
              Reintentar
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          {loading && documents.length === 0 ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
            </div>
          ) : documents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-600">No hay documentos subidos</p>
              <p className="text-xs text-gray-400 mt-1">
                Usa el formulario de arriba para subir tus primeros documentos
              </p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100">
                  <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Documento</th>
                  <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Tipo</th>
                  <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Fecha</th>
                  <th className="text-left font-semibold text-gray-700 px-5 py-3.5">Tamaño</th>
                  <th className="text-right font-semibold text-gray-700 px-5 py-3.5">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <AnimatePresence>
                  {documents.map((doc) => (
                    <motion.tr
                      key={doc.path}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-pmi-cream rounded-lg flex items-center justify-center shrink-0 text-pmi-blue">
                            {getFileIcon(doc.name)}
                          </div>
                          <div>
                            <span className="font-medium text-pmi-dark block max-w-[200px] truncate">
                              {doc.name}
                            </span>
                            <span className="text-[11px] text-gray-400 font-mono truncate max-w-[200px] block">
                              {doc.path.split('/').pop()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                          {doc.path.includes('/cv/')
                            ? 'CV'
                            : doc.path.includes('/education/')
                              ? 'Educación'
                              : doc.path.includes('/experience/')
                                ? 'Experiencia'
                                : doc.path.includes('/portfolio/')
                                  ? 'Portfolio'
                                  : 'Otro'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-600">{formatDate(doc.createdAt)}</td>
                      <td className="px-5 py-4 text-gray-600">{formatSize(doc.size)}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDownload(doc.path, doc.name)}
                            className="p-2 text-pmi-blue hover:bg-pmi-blue/10 rounded-lg transition-colors"
                            title="Descargar"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.path)}
                            disabled={deletingPath === doc.path}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Eliminar"
                          >
                            {deletingPath === doc.path ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  )
}
