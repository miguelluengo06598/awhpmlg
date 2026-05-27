'use client'

import type { CSSProperties, ReactNode, ChangeEvent } from 'react'
import { colors, spacing, transitions } from '@/lib/design-system'

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'textarea'
  placeholder?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  disabled?: boolean
  error?: string
  label?: string
  icon?: ReactNode
  required?: boolean
}

export function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled,
  error,
  label,
  icon,
  required,
}: InputProps) {
  const baseBorder = error ? colors.semantic.danger : colors.neutral[300]

  const baseInputStyle: CSSProperties = {
    padding:         `${spacing.md} ${spacing.lg}`,
    paddingLeft:     icon ? `calc(${spacing.lg} + 24px)` : spacing.lg,
    borderRadius:    '6px',
    border:          `1px solid ${baseBorder}`,
    fontSize:        '1rem',
    fontFamily:      'var(--font-inter)',
    transition:      transitions.normal,
    width:           '100%',
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral.white,
    color:           colors.neutral[700],
    opacity:         disabled ? 0.6 : 1,
    outline:         'none',
    boxSizing:       'border-box',
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = colors.primary.idm
    e.currentTarget.style.boxShadow  = `0 0 0 3px ${colors.primary.idm}33`
  }
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = error ? colors.semantic.danger : colors.neutral[300]
    e.currentTarget.style.boxShadow   = 'none'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
      {label && (
        <label style={{ fontWeight: 600, fontSize: '0.9rem', color: colors.neutral[700] }}>
          {label}
          {required && <span style={{ color: colors.semantic.danger }}> *</span>}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span style={{ position: 'absolute', left: spacing.md, color: colors.neutral[500], pointerEvents: 'none' }}>
            {icon}
          </span>
        )}
        {type === 'textarea' ? (
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={{ ...baseInputStyle, resize: 'vertical', minHeight: '100px' }}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            style={baseInputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        )}
      </div>

      {error && (
        <p style={{ color: colors.semantic.danger, fontSize: '0.85rem', fontWeight: 500, margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  )
}
