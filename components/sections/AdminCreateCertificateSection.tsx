'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GraduationCap, CheckCircle2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui'
import { supabase } from '@/lib/supabaseClient'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'
import { useDashboardLocale } from '@/lib/useDashboardLocale'
import { translations } from '@/lib/translations'

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

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-700'

export function AdminCreateCertificateSection({ onCreated }: { onCreated?: () => void }) {
  const { locale } = useDashboardLocale()
  const t = translations[locale].admin.createCert

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
      if (!session) { setError(t.errSession); return }

      const res = await fetchWithTimeout('/api/admin/certificates', {
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
      if (!res.ok) { setError(data.error ?? t.errCreate); return }

      setCreated(data.certificate)
      setForm({ certification_type: 'IDM', email: '', full_name: '', organization: '', exam_score: '', expiry_date: '' })
      onCreated?.()
    } catch {
      setError(t.errNetwork)
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
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-bold tracking-tight text-slate-900">{t.title}</h2>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>
              {t.typeLabel} <span className="text-red-500">*</span>
            </label>
            <select name="certification_type" value={form.certification_type} onChange={update} className={`${inputClass} cursor-pointer`}>
              {CERT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              {t.emailLabel} <span className="text-red-500">*</span>
            </label>
            <input type="email" name="email" value={form.email} onChange={update} required placeholder={t.emailPlaceholder} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>
              {t.nameLabel} <span className="text-red-500">*</span>
            </label>
            <input type="text" name="full_name" value={form.full_name} onChange={update} required placeholder={t.namePlaceholder} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>
              {t.orgLabel} <span className="font-normal text-slate-400">{t.optional}</span>
            </label>
            <input type="text" name="organization" value={form.organization} onChange={update} placeholder={t.orgPlaceholder} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>
              {t.scoreLabel} <span className="font-normal text-slate-400">{t.scoreHint}</span>
            </label>
            <input type="number" name="exam_score" value={form.exam_score} onChange={update} min={0} max={100} placeholder={t.scorePlaceholder} className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>
              {t.expiryLabel} <span className="font-normal text-slate-400">{t.optional}</span>
            </label>
            <input type="date" name="expiry_date" value={form.expiry_date} onChange={update} className={inputClass} />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <Button type="submit" variant="primary" size="md" fullWidth loading={loading}>
            {t.submit}
          </Button>
        </form>

        {/* Result panel */}
        <div>
          {created ? (
            <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
              <p className="mb-4 flex items-center gap-2 text-base font-bold text-emerald-700">
                <CheckCircle2 className="h-5 w-5" /> {t.successTitle}
              </p>

              <div className="mb-3">
                <p className="mb-1 text-sm font-semibold text-slate-500">{t.codeLabel}</p>
                <code className="font-mono text-base font-bold text-slate-800">{created.certification_code}</code>
              </div>

              <div className="mb-4">
                <p className="mb-1 text-sm font-semibold text-slate-500">{t.verifyLinkLabel}</p>
                <Link
                  href={created.qr_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  {created.qr_code}
                </Link>
              </div>

              {created.qr_data && (
                <div className="mb-4 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={created.qr_data} alt={t.qrAlt} className="h-36 w-36 rounded-lg border border-slate-200" />
                </div>
              )}

              <Button variant="success" size="md" fullWidth onClick={copyLink} icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}>
                {copied ? t.copied : t.copyLink}
              </Button>

              <p className="mt-3 text-center text-xs text-slate-500">{t.shareHint}</p>
            </div>
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
              <GraduationCap className="h-10 w-10 text-slate-300" />
              <p className="m-0 text-center text-sm text-slate-400">{t.placeholderHint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
