'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { colors, spacing, typography } from '@/lib/design-system'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

interface CreatedCert {
  id: string
  qr_code: string
  qr_data: string
  certification_code: string
}

const CERT_OPTIONS = [
  { value: 'IDM', label: 'IDM — Information Delivery Manager' },
  { value: 'BDM', label: 'BDM — BIM Design Manager' },
  { value: 'BCM', label: 'BCM — BIM Construction Manager' },
]

const fieldStyle = {
  width: '100%',
  padding: `${spacing.md} ${spacing.lg}`,
  border: `1px solid ${colors.neutral[300]}`,
  borderRadius: 8,
  fontFamily: typography.family.body,
  fontSize: '0.95rem',
  color: colors.neutral[700],
  backgroundColor: colors.neutral.white,
  outline: 'none',
  boxSizing: 'border-box' as const,
}

const labelStyle = {
  display: 'block',
  fontFamily: typography.family.body,
  fontSize: '0.875rem',
  fontWeight: 600 as const,
  color: colors.neutral[700],
  marginBottom: spacing.sm,
}

export function AdminCreateCertificateSection() {
  const [form, setForm] = useState({
    certification_type: 'IDM',
    email: '',
    full_name: '',
    organization: '',
    exam_score: '',
    expiry_date: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState<CreatedCert | null>(null)
  const [copied, setCopied] = useState(false)

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setCreated(null)
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setError('Sesión expirada. Recarga la página.'); return }

      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          ...form,
          exam_score: form.exam_score ? Number(form.exam_score) : undefined,
          expiry_date: form.expiry_date || undefined,
        }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Error creando el certificado.'); return }

      setCreated(data.certificate)
      setForm({ certification_type: 'IDM', email: '', full_name: '', organization: '', exam_score: '', expiry_date: '' })
    } catch {
      setError('Error de red. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    if (!created) return
    navigator.clipboard.writeText(created.qr_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ marginTop: spacing['2xl'] }}>
      <h2 style={{ fontFamily: typography.family.title, fontSize: '1.4rem', fontWeight: 700, color: colors.neutral[800], marginBottom: spacing.xl }}>
        Emitir Certificado Manual
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: spacing.xl, alignItems: 'start' }}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>

          <div>
            <label style={labelStyle}>Tipo de certificación <span style={{ color: colors.semantic.danger }}>*</span></label>
            <select name="certification_type" value={form.certification_type} onChange={update} style={fieldStyle}>
              {CERT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Email del profesional <span style={{ color: colors.semantic.danger }}>*</span></label>
            <input type="email" name="email" value={form.email} onChange={update} required placeholder="nombre@empresa.com" style={fieldStyle} />
          </div>

          <div>
            <label style={labelStyle}>Nombre completo <span style={{ color: colors.semantic.danger }}>*</span></label>
            <input type="text" name="full_name" value={form.full_name} onChange={update} required placeholder="Nombre Apellido" style={fieldStyle} />
          </div>

          <div>
            <label style={labelStyle}>Organización <span style={{ color: colors.neutral[400], fontWeight: 400 }}>(opcional)</span></label>
            <input type="text" name="organization" value={form.organization} onChange={update} placeholder="Empresa o institución" style={fieldStyle} />
          </div>

          <div>
            <label style={labelStyle}>Puntuación del examen <span style={{ color: colors.neutral[400], fontWeight: 400 }}>(0–100)</span></label>
            <input type="number" name="exam_score" value={form.exam_score} onChange={update} min={0} max={100} placeholder="85" style={fieldStyle} />
          </div>

          <div>
            <label style={labelStyle}>Fecha de vencimiento <span style={{ color: colors.neutral[400], fontWeight: 400 }}>(opcional)</span></label>
            <input type="date" name="expiry_date" value={form.expiry_date} onChange={update} style={fieldStyle} />
          </div>

          {error && (
            <div style={{ padding: spacing.md, backgroundColor: colors.semantic.danger + '14', border: `1px solid ${colors.semantic.danger}44`, borderRadius: 8, color: colors.semantic.danger, fontSize: '0.9rem', fontWeight: 500 }}>
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
            Emitir Certificado
          </Button>
        </form>

        {/* Result panel */}
        <div>
          {created ? (
            <div style={{ backgroundColor: '#f0fdf4', border: `2px solid ${colors.semantic.success}44`, borderRadius: 16, padding: spacing.xl }}>
              <p style={{ fontFamily: typography.family.title, fontSize: '1rem', fontWeight: 700, color: colors.semantic.success, marginBottom: spacing.lg }}>
                ✅ Certificado emitido
              </p>

              <div style={{ marginBottom: spacing.md }}>
                <p style={{ ...labelStyle, color: colors.neutral[500] }}>Código</p>
                <code style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700, color: colors.neutral[800] }}>
                  {created.certification_code}
                </code>
              </div>

              <div style={{ marginBottom: spacing.lg }}>
                <p style={{ ...labelStyle, color: colors.neutral[500] }}>Link de verificación</p>
                <Link
                  href={created.qr_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: typography.family.body, fontSize: '0.85rem', color: colors.primary.idm, wordBreak: 'break-all', fontWeight: 600 }}
                >
                  {created.qr_code}
                </Link>
              </div>

              {created.qr_data && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing.lg }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={created.qr_data} alt="QR del certificado" style={{ width: 140, height: 140, borderRadius: 8, border: `1px solid ${colors.neutral[200]}` }} />
                </div>
              )}

              <Button variant="success" size="md" fullWidth onClick={copyLink}>
                {copied ? '✓ Copiado' : '📋 Copiar link'}
              </Button>

              <p style={{ fontFamily: typography.family.body, fontSize: '0.78rem', color: colors.neutral[500], marginTop: spacing.md, textAlign: 'center' }}>
                Comparte este link o QR con el profesional para que acceda a su certificación.
              </p>
            </div>
          ) : (
            <div style={{ backgroundColor: colors.neutral[50], border: `1px dashed ${colors.neutral[300]}`, borderRadius: 16, padding: spacing.xl, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 280, gap: spacing.md }}>
              <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>🎓</span>
              <p style={{ fontFamily: typography.family.body, fontSize: '0.9rem', color: colors.neutral[400], textAlign: 'center', margin: 0 }}>
                El QR y el link de verificación aparecerán aquí tras emitir el certificado.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
