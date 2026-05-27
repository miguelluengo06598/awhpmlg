'use client'

import type { CSSProperties, ReactNode } from 'react'
import { colors, spacing, shadows, transitions } from '@/lib/design-system'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  loading?: boolean
  icon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled,
  type = 'button',
  fullWidth,
  loading,
  icon,
}: ButtonProps) {
  const variantColors: Record<string, string> = {
    primary:   colors.primary.idm,
    secondary: colors.neutral[600],
    danger:    colors.semantic.danger,
    success:   colors.semantic.success,
    outline:   'transparent',
  }
  const variantBorders: Record<string, string> = {
    primary:   'none',
    secondary: 'none',
    danger:    'none',
    success:   'none',
    outline:   `2px solid ${colors.primary.idm}`,
  }
  const variantText: Record<string, string> = {
    primary:   'white',
    secondary: 'white',
    danger:    'white',
    success:   'white',
    outline:   colors.primary.idm,
  }
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: `${spacing.sm} ${spacing.md}`,  fontSize: '0.875rem', minHeight: '32px' },
    md: { padding: `${spacing.md} ${spacing.lg}`,  fontSize: '1rem',     minHeight: '40px' },
    lg: { padding: `${spacing.lg} ${spacing.xl}`,  fontSize: '1.1rem',   minHeight: '48px' },
  }

  const baseStyle: CSSProperties = {
    backgroundColor: variantColors[variant],
    color:           variantText[variant],
    border:          variantBorders[variant],
    borderRadius:    '6px',
    cursor:          disabled ? 'not-allowed' : 'pointer',
    fontWeight:      600,
    transition:      transitions.normal,
    fontFamily:      'var(--font-inter)',
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             spacing.sm,
    opacity:         disabled ? 0.6 : 1,
    width:           fullWidth ? '100%' : 'auto',
    position:        'relative',
    overflow:        'hidden',
    ...sizeStyles[size],
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
          e.currentTarget.style.boxShadow = shadows.xl
          if (variant !== 'outline')
            e.currentTarget.style.filter = 'brightness(1.15) drop-shadow(0 0 8px rgba(0,102,204,0.25))'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.filter   = 'brightness(1)'
      }}
      onMouseDown={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-1px) scale(0.99)'
          e.currentTarget.style.boxShadow = shadows.sm
        }
      }}
    >
      {loading ? (
        <>
          <span style={{
            width: '16px', height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
            display: 'inline-block',
          }} />
          Cargando...
        </>
      ) : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}
