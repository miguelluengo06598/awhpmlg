'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'

// Card de métrica reutilizable del panel admin (modo claro).
// Solo presentacional; la data la pasan las páginas (lógica intacta).
export type MetricAccent = 'cyan' | 'indigo' | 'violet' | 'amber'

const ACCENT: Record<MetricAccent, { grad: string; stroke: string }> = {
  cyan: { grad: 'from-cyan-500 to-sky-600', stroke: '#0891B2' },
  indigo: { grad: 'from-indigo-500 to-violet-600', stroke: '#4F46E5' },
  violet: { grad: 'from-violet-500 to-fuchsia-600', stroke: '#9333EA' },
  amber: { grad: 'from-amber-500 to-orange-600', stroke: '#D97706' },
}

interface MetricCardProps {
  title: string
  value: React.ReactNode
  icon: LucideIcon
  accent?: MetricAccent
  trend?: number
  subtitle?: string
  sparkline?: number[]
  delay?: number
  loading?: boolean
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  accent = 'cyan',
  trend,
  subtitle,
  sparkline,
  delay = 0,
  loading = false,
}: MetricCardProps) {
  const a = ACCENT[accent]
  const isPositive = trend !== undefined && trend >= 0
  const data = (sparkline ?? []).map((v, i) => ({ i, v }))
  const sparkId = `spark-${accent}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-500">{title}</p>
          <p className="mt-2 font-mono text-3xl font-bold tracking-tight tabular-nums text-slate-900">
            {loading ? (
              <span className="inline-block h-7 w-20 animate-pulse rounded bg-slate-200 align-middle" />
            ) : (
              value
            )}
          </p>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
          {trend !== undefined && !loading && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700',
              )}
            >
              {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {isPositive ? '+' : ''}
              {trend}%
            </div>
          )}
        </div>

        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-sm', a.grad)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Sparkline de tendencia (opcional) */}
      {data.length > 1 && !loading && (
        <div className="mt-3 h-10 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={sparkId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={a.stroke} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={a.stroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={a.stroke} strokeWidth={2} fill={`url(#${sparkId})`} isAnimationActive={false} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  )
}
