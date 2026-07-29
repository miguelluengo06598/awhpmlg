'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { cn } from '@/lib/utils'
import { BorderBeam } from '@/components/magicui/border-beam'

// Card de métrica reutilizable del panel admin (Dark Tech / Glass).
// Solo presentacional; la data la pasan las páginas (lógica intacta).
export type MetricAccent = 'cyan' | 'indigo' | 'violet' | 'amber'

const ACCENT: Record<MetricAccent, { grad: string; from: string; to: string }> = {
  cyan: { grad: 'from-cyan-400 to-sky-500', from: '#22D3EE', to: '#0EA5E9' },
  indigo: { grad: 'from-indigo-400 to-violet-500', from: '#6366F1', to: '#8B5CF6' },
  violet: { grad: 'from-violet-400 to-fuchsia-500', from: '#A855F7', to: '#D946EF' },
  amber: { grad: 'from-amber-400 to-orange-500', from: '#FBBF24', to: '#F97316' },
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
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_24px_48px_-24px_rgba(0,0,0,0.7)]"
    >
      {/* Glow radial del acento */}
      <div className={cn('pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-20 blur-2xl', a.grad)} />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium text-slate-400">{title}</p>
          <p className="mt-2 font-mono text-3xl font-bold tracking-tight tabular-nums text-white">
            {loading ? (
              <span className="inline-block h-7 w-20 animate-pulse rounded bg-white/10 align-middle" />
            ) : (
              value
            )}
          </p>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
          {trend !== undefined && !loading && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold',
                isPositive ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300',
              )}
            >
              {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {isPositive ? '+' : ''}
              {trend}%
            </div>
          )}
        </div>

        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg', a.grad)}>
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
                  <stop offset="0%" stopColor={a.from} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={a.from} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={a.from} strokeWidth={2} fill={`url(#${sparkId})`} isAnimationActive={false} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <BorderBeam size={120} duration={10} delay={delay / 1000} colorFrom={a.from} colorTo={a.to} />
    </motion.div>
  )
}
