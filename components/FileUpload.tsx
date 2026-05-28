'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { uploadApplicationDocument } from '@/lib/storageClient'

interface FileUploadProps {
  applicationId: string
  documentType: 'cv' | 'education' | 'experience' | 'portfolio' | 'other'
  label?: string
  accept?: string
  maxSize?: number
  onSuccess?: (path: string, url: string, fileSize: number) => void
  onError?: (error: string) => void
}

const TYPE_LABELS: Record<string, string> = {
  cv: 'CV / Currículum',
  education: 'Título / Educación',
  experience: 'Experiencia',
  portfolio: 'Portfolio',
  other: 'Otro',
}

export default function FileUpload({
  applicationId,
  documentType,
  label,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  maxSize = 5 * 1024 * 1024,
  onSuccess,
  onError,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    async (file: File) => {
      setError('')
      setSuccess(false)

      if (file.size > maxSize) {
        const msg = `El archivo es muy grande. Máximo ${(maxSize / 1024 / 1024).toFixed(1)}MB`
        setError(msg)
        onError?.(msg)
        return
      }

      setLoading(true)
      setProgress(10)

      // Simular progreso
      const interval = setInterval(() => {
        setProgress((p) => (p >= 85 ? 85 : p + Math.random() * 20))
      }, 200)

      try {
        const { path, url } = await uploadApplicationDocument(
          applicationId,
          file,
          documentType
        )
        clearInterval(interval)
        setProgress(100)
        setSuccess(true)
        onSuccess?.(path, url, file.size)
        setTimeout(() => {
          setLoading(false)
          setProgress(0)
          setSuccess(false)
          if (fileInputRef.current) fileInputRef.current.value = ''
        }, 1500)
      } catch (err: any) {
        clearInterval(interval)
        setLoading(false)
        setProgress(0)
        const msg = err.message || 'Error al subir el archivo'
        setError(msg)
        onError?.(msg)
      }
    },
    [applicationId, documentType, maxSize, onSuccess, onError]
  )

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = () => setIsDragging(false)

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`
          relative rounded-xl border-2 border-dashed transition-all duration-200
          ${isDragging
            ? 'border-pmi-blue bg-pmi-blue/5 scale-[1.01]'
            : error
              ? 'border-red-300 bg-red-50/30'
              : success
                ? 'border-green-400 bg-green-50/30'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={onFileChange}
          disabled={loading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="flex flex-col items-center justify-center px-6 py-8 text-center">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-3"
              >
                <Loader2 className="w-8 h-8 text-pmi-blue animate-spin" />
                <p className="text-sm font-medium text-gray-700">
                  Subiendo {TYPE_LABELS[documentType] || 'documento'}...
                </p>
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-pmi-blue rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
              </motion.div>
            ) : success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-2"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <p className="text-sm font-medium text-green-700">
                  ¡Archivo subido correctamente!
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                    ${isDragging ? 'bg-pmi-blue text-white' : 'bg-gray-50 text-gray-400'}
                  `}
                >
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  {isDragging
                    ? 'Suelta el archivo aquí'
                    : `Arrastra o haz click para subir ${TYPE_LABELS[documentType] || 'archivo'}`}
                </p>
                <p className="text-xs text-gray-400">
                  PDF, DOC, DOCX, JPG, PNG. Máx {(maxSize / 1024 / 1024).toFixed(0)}MB
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-2 flex items-center gap-2 text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
            <button onClick={() => setError('')} className="ml-auto">
              <X className="w-3.5 h-3.5 hover:text-red-800" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
