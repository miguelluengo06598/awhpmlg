'use client'

import type { CSSProperties, ReactNode } from 'react'
import { getStatusColor, spacing } from '@/lib/design-system'

interface BadgeProps {
  status: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
}

const STATUS_LABELS: Record<string, string> = {
  pending:        'Pendiente',
  in_review:      'En revisión',
  approved:       'Aprobado',
  exam_scheduled: 'Examen programado',
  certified:      'Certificado',
  rejected:       'Rechazado',
}

export function Badge({ status, label, size = 'md', icon }: BadgeProps) {
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { fontSize: '0.75rem', padding: `2px ${spacing.sm}` },
    md: { fontSize: '0.85rem', padding: `4px ${spacing.md}` },
    lg: { fontSize: '0.95rem', padding: `6px ${spacing.lg}` },
  }

  return (
    <span
      style={{
        display:         'inline-flex',
        alignItems:      'center',
        gap:             spacing.sm,
        backgroundColor: getStatusColor(status),
        color:           'white',
        borderRadius:    '12px',
        fontWeight:      600,
        fontFamily:      'var(--font-inter)',
        ...sizeStyles[size],
      }}
    >
      {icon && <span>{icon}</span>}
      {label ?? STATUS_LABELS[status] ?? status}
    </span>
  )
}
