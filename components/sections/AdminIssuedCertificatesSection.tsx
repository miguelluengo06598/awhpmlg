'use client'

import { useEffect, useState, useMemo } from 'react'
import { Search, X, ArrowUpDown, CheckCircle2, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { fetchWithTimeout } from '@/lib/fetchWithTimeout'
import { filterCertificates } from '@/lib/searchCertificates'
import { useDashboardLocale } from '@/lib/useDashboardLocale'
import { translations } from '@/lib/translations'

interface IssuedCertificate {
  id: string
  certification_type: string
  certification_code: string
  full_name: string
  email: string
  organization?: string
  issue_date: string
  expiry_date?: string
  status: string
  user_id?: string | null
  qr_code: string
  created_at: string
}

type FilterType = 'all' | 'assigned' | 'pending'
type SortType = 'recent' | 'code' | 'name'

interface TypeStyle {
  text: string
  badge: string
  action: string
}

const TYPE_STYLES: Record<string, TypeStyle> = {
  IDM: { text: 'text-cyan-700', badge: 'bg-cyan-50 text-cyan-700', action: 'border-cyan-200 bg-cyan-50 text-cyan-700 hover:bg-cyan-100' },
  BDM: { text: 'text-indigo-700', badge: 'bg-indigo-50 text-indigo-700', action: 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100' },
  BCM: { text: 'text-violet-700', badge: 'bg-violet-50 text-violet-700', action: 'border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100' },
}
const FALLBACK_STYLE: TypeStyle = { text: 'text-slate-600', badge: 'bg-slate-100 text-slate-600', action: 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100' }

const DATE_LOCALES: Record<string, string> = { es: 'es-ES', en: 'en-GB', pt: 'pt-PT' }

export function AdminIssuedCertificatesSection({ refreshKey }: { refreshKey?: number }) {
  const { locale } = useDashboardLocale()
  const t = translations[locale].admin.issuedCerts

  const [certificates, setCertificates] = useState<IssuedCertificate[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortType>('recent')

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true)
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const res = await fetchWithTimeout('/api/admin/certificates', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        }, 10_000)
        if (!res.ok) return
        const json = await res.json()
        setCertificates(json.certificates ?? [])
      } catch (err) {
        console.error('Error fetching issued certificates:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCertificates()
  }, [refreshKey])

  const displayCerts = useMemo(() => {
    const byStatus = certificates.filter((c) => {
      if (filter === 'assigned') return !!c.user_id
      if (filter === 'pending') return !c.user_id
      return true
    })
    const searched = filterCertificates(byStatus, search)
    return [...searched].sort((a, b) => {
      if (sortBy === 'code') return a.certification_code.localeCompare(b.certification_code)
      if (sortBy === 'name') return a.full_name.localeCompare(b.full_name)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }, [certificates, filter, search, sortBy])

  const assignedCount = certificates.filter((c) => !!c.user_id).length
  const pendingCount = certificates.filter((c) => !c.user_id).length

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(DATE_LOCALES[locale] ?? 'es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const filterLabels: Record<FilterType, string> = { all: t.filterAll, assigned: t.filterAssigned, pending: t.filterPending }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <h2 className="mb-6 text-lg font-bold tracking-tight text-slate-900">{t.title}</h2>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label={t.statTotal} value={certificates.length} valueClass="text-cyan-600" />
        <StatCard label={t.statAssigned} value={assignedCount} valueClass="text-emerald-600" />
        <StatCard label={t.statPending} value={pendingCount} valueClass="text-amber-600" />
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Status filters */}
        {(['all', 'assigned', 'pending'] as const).map((f) => (
          <FilterButton key={f} active={filter === f} onClick={() => setFilter(f)}>
            {filterLabels[f]}
          </FilterButton>
        ))}

        {/* Search */}
        <div className="relative max-w-[340px] flex-[1_1_220px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 ${search ? 'pr-8' : 'pr-2.5'}`}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center p-0.5 text-slate-400 hover:text-slate-600"
              aria-label={t.clearSearch}
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="recent">{t.sortRecent}</option>
            <option value="code">{t.sortCode}</option>
            <option value="name">{t.sortName}</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-sm text-slate-500">{t.loading}</p>
      ) : displayCerts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <p className="mb-3 text-sm text-slate-500">
            {search ? `${t.noResultsSearch} "${search}"` : t.noResults}
          </p>
          {search && (
            <button onClick={() => setSearch('')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              {t.clearSearch}
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {[t.colCode, t.colType, t.colName, t.colEmail, t.colIssued, t.colExpiry, t.colStatus, ''].map((h, i) => (
                    <th key={i} className="whitespace-nowrap px-4 py-3 text-left text-[13px] font-semibold text-slate-500">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayCerts.map((cert, idx) => {
                  const style = TYPE_STYLES[cert.certification_type] ?? FALLBACK_STYLE
                  const isAssigned = !!cert.user_id
                  return (
                    <tr
                      key={cert.id}
                      className={`border-b border-slate-100 transition-colors hover:bg-slate-50 ${idx % 2 === 1 ? 'bg-slate-50/50' : ''}`}
                    >
                      {/* Code */}
                      <td className="whitespace-nowrap px-4 py-2.5">
                        <code className={`font-mono text-sm font-bold tracking-wide ${style.text}`}>{cert.certification_code}</code>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-2.5">
                        <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${style.badge}`}>
                          {cert.certification_type}
                        </span>
                      </td>

                      {/* Name */}
                      <td className="whitespace-nowrap px-4 py-2.5 text-sm font-semibold text-slate-800">{cert.full_name}</td>

                      {/* Email */}
                      <td className="px-4 py-2.5">
                        <a href={`mailto:${cert.email}`} className="text-sm text-indigo-600 hover:text-indigo-700">{cert.email}</a>
                      </td>

                      {/* Issue date */}
                      <td className="whitespace-nowrap px-4 py-2.5 text-sm text-slate-500">{fmt(cert.issue_date)}</td>

                      {/* Expiry */}
                      <td className="whitespace-nowrap px-4 py-2.5 text-sm text-slate-500">{cert.expiry_date ? fmt(cert.expiry_date) : '—'}</td>

                      {/* Status */}
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-bold ${isAssigned ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                          {isAssigned ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                          {isAssigned ? t.statusAssigned : t.statusPending}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-2.5 text-right">
                        <a
                          href={cert.qr_code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-block whitespace-nowrap rounded-md border px-3 py-1 text-xs font-semibold transition-colors ${style.action}`}
                        >
                          {t.viewQr}
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer row count */}
          <div className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-500">
            {displayCerts.length} {t.footerConnector} {certificates.length} {certificates.length !== 1 ? t.certPlural : t.certSingular}
          </div>
        </div>
      )}
    </section>
  )
}

function StatCard({ label, value, valueClass }: { label: string; value: number; valueClass: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
      <p className="m-0 mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`m-0 text-3xl font-bold ${valueClass}`}>{value}</p>
    </div>
  )
}

function FilterButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
        active
          ? 'border-indigo-600 bg-indigo-600 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:text-indigo-600'
      }`}
    >
      {children}
    </button>
  )
}
