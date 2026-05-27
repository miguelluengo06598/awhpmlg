'use client'

import type { CSSProperties, ReactNode } from 'react'
import { colors, spacing, shadows, transitions } from '@/lib/design-system'

interface CardProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger' | 'gradient'
  children: ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  header?: ReactNode
  footer?: ReactNode
}

export function Card({
  variant = 'default',
  children,
  hover = true,
  padding = 'lg',
  onClick,
  header,
  footer,
}: CardProps) {
  const variantExtra: Record<string, CSSProperties> = {
    default:  {},
    info:     { borderLeft: `4px solid ${colors.semantic.info}`,    backgroundColor: colors.semantic.info    + '0D' },
    success:  { borderLeft: `4px solid ${colors.semantic.success}`, backgroundColor: colors.semantic.success + '0D' },
    warning:  { borderLeft: `4px solid ${colors.semantic.warning}`, backgroundColor: colors.semantic.warning + '0D' },
    danger:   { borderLeft: `4px solid ${colors.semantic.danger}`,  backgroundColor: colors.semantic.danger  + '0D' },
    gradient: {
      background:  `linear-gradient(135deg, ${colors.primary.idm}26 0%, ${colors.primary.bdm}1A 100%)`,
      borderLeft:  `4px solid ${colors.primary.idm}`,
    },
  }
  const paddingMap: Record<string, string> = {
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
  }

  const baseStyle: CSSProperties = {
    backgroundColor: colors.neutral.white,
    borderRadius:    '8px',
    boxShadow:       shadows.md,
    transition:      transitions.normal,
    padding:         paddingMap[padding],
    cursor:          onClick ? 'pointer' : 'default',
    ...variantExtra[variant],
  }

  return (
    <div
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (hover && onClick) {
          e.currentTarget.style.transform = 'translateY(-5px)'
          e.currentTarget.style.boxShadow = shadows.lg
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = shadows.md
      }}
    >
      {header && (
        <div style={{ marginBottom: spacing.md, paddingBottom: spacing.md, borderBottom: `1px solid ${colors.neutral[200]}` }}>
          {header}
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div style={{ marginTop: spacing.md, paddingTop: spacing.md, borderTop: `1px solid ${colors.neutral[200]}` }}>
          {footer}
        </div>
      )}
    </div>
  )
}
