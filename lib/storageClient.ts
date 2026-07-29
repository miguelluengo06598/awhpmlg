import { supabase } from './supabaseClient'

const isDev = process.env.NODE_ENV === 'development'

export interface UploadProgressEvent {
  progress: number
  loaded: number
  total: number
}

export interface StorageFile {
  name: string
  path: string
  size: number
  url: string
  createdAt?: string
  mimeType?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

function validateFile(file: File, allowedTypes?: string[]) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`El archivo excede el límite de 5MB (${(file.size / 1024 / 1024).toFixed(2)}MB)`)
  }
  if (allowedTypes && allowedTypes.length > 0) {
    const isAllowed = allowedTypes.some((type) =>
      file.type.includes(type) || file.name.toLowerCase().endsWith(type)
    )
    if (!isAllowed) {
      throw new Error(`Tipo de archivo no permitido. Permitidos: ${allowedTypes.join(', ')}`)
    }
  }
}

/**
 * Subir documento de aplicación (CV, títulos, portfolio, etc.)
 * Estructura: application-documents/userId/applicationId/documentType/filename
 */
export const uploadApplicationDocument = async (
  applicationId: string,
  file: File,
  documentType: 'cv' | 'education' | 'experience' | 'portfolio' | 'other',
  onProgress?: (progress: number) => void
): Promise<{ path: string; url: string }> => {
  try {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) throw new Error('Usuario no autenticado')

    validateFile(file, ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'])

    const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf'
    const fileName = `${Date.now()}_${crypto.randomUUID().slice(0, 8)}.${ext}`
    const path = `${userId}/${applicationId}/${documentType}/${fileName}`

    if (isDev) console.log('Subiendo archivo:', path)

    const { data, error } = await supabase.storage
      .from('application-documents')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/octet-stream',
      })

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from('application-documents')
      .getPublicUrl(data.path)

    return { path: data.path, url: urlData.publicUrl }
  } catch (error: any) {
    console.error('Error en uploadApplicationDocument:', error.message)
    throw new Error(error.message || 'Error al subir el archivo')
  }
}

/**
 * Subir foto de perfil
 * Estructura: profile-pictures/userId/filename
 */
export const uploadProfilePicture = async (
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ path: string; url: string }> => {
  try {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) throw new Error('Usuario no autenticado')

    validateFile(file, ['jpg', 'jpeg', 'png', 'webp'])

    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `avatar.${ext}`
    const path = `${userId}/${fileName}`

    const { data, error } = await supabase.storage
      .from('profile-pictures')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: file.type || 'image/jpeg',
      })

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from('profile-pictures')
      .getPublicUrl(data.path)

    return { path: data.path, url: urlData.publicUrl }
  } catch (error: any) {
    console.error('Error en uploadProfilePicture:', error.message)
    throw new Error(error.message || 'Error al subir la foto')
  }
}

/**
 * Subir certificado PDF (bucket PRIVADO).
 * Estructura: certificates/qrCode.pdf
 * Devuelve una URL FIRMADA con expiración (no pública): el bucket ya no permite
 * lectura anónima, así que las rutas adivinables dejan de ser explotables.
 */
export const uploadCertificate = async (
  qrCode: string,
  file: File,
  signedUrlExpiresIn = 60 * 60 // 1 hora
): Promise<{ path: string; url: string }> => {
  try {
    validateFile(file, ['pdf'])

    const path = `${qrCode}.pdf`

    const { data, error } = await supabase.storage
      .from('certificates')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: true,
        contentType: 'application/pdf',
      })

    if (error) throw error

    const { data: urlData, error: urlError } = await supabase.storage
      .from('certificates')
      .createSignedUrl(data.path, signedUrlExpiresIn)

    if (urlError) throw urlError

    return { path: data.path, url: urlData.signedUrl }
  } catch (error: any) {
    console.error('Error en uploadCertificate:', error.message)
    throw new Error(error.message || 'Error al subir el certificado')
  }
}

/**
 * Descargar archivo como Blob
 */
export const downloadFile = async (bucket: string, path: string): Promise<Blob> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).download(path)
    if (error) throw error
    return data
  } catch (error: any) {
    console.error('Error al descargar:', error.message)
    throw new Error(error.message || 'Error al descargar el archivo')
  }
}

/**
 * Eliminar archivo
 */
export const deleteFile = async (bucket: string, path: string): Promise<void> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) throw error
  } catch (error: any) {
    console.error('Error al eliminar:', error.message)
    throw new Error(error.message || 'Error al eliminar el archivo')
  }
}

/**
 * Listar documentos de una aplicación
 */
export const listApplicationDocuments = async (
  applicationId: string
): Promise<StorageFile[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) throw new Error('Usuario no autenticado')

    const prefix = `${userId}/${applicationId}`

    const { data, error } = await supabase.storage
      .from('application-documents')
      .list(prefix, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) throw error
    if (!data) return []

    const files: StorageFile[] = []

    for (const item of data) {
      if (!item.id) continue // saltar carpetas
      const filePath = `${prefix}/${item.name}`
      const { data: urlData } = supabase.storage
        .from('application-documents')
        .getPublicUrl(filePath)

      files.push({
        name: item.name,
        path: filePath,
        size: item.metadata?.size || 0,
        url: urlData.publicUrl,
        createdAt: item.created_at || undefined,
        mimeType: item.metadata?.mimetype,
      })
    }

    return files
  } catch (error: any) {
    console.error('❌ Error al listar archivos:', error)
    throw new Error(error.message || 'Error al listar archivos')
  }
}

/**
 * Listar todos los documentos del usuario (todos los tipos)
 */
export const listAllUserDocuments = async (): Promise<StorageFile[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id
    if (!userId) throw new Error('Usuario no autenticado')

    const { data, error } = await supabase.storage
      .from('application-documents')
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) throw error
    if (!data) return []

    const files: StorageFile[] = []

    for (const folder of data) {
      if (!folder.id) {
        // Es una carpeta (applicationId)
        const appFiles = await listApplicationDocuments(folder.name)
        files.push(...appFiles)
      }
    }

    return files
  } catch (error: any) {
    console.error('❌ Error al listar documentos del usuario:', error)
    throw new Error(error.message || 'Error al listar documentos')
  }
}

/**
 * Obtener URL firmada (para buckets privados)
 */
export const getSignedUrl = async (
  bucket: string,
  path: string,
  expiresIn = 60
): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error) throw error
    return data.signedUrl
  } catch (error: any) {
    console.error('❌ Error al crear URL firmada:', error)
    throw new Error(error.message || 'Error al generar URL')
  }
}
