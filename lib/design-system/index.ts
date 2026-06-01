import type { CSSProperties } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// DESIGN SYSTEM AECOMI - Basado en UI UX Pro Max v2.0
// ═══════════════════════════════════════════════════════════════════════════

// COLORES
export const colors = {
  primary: {
    idm: '#0066CC',
    bdm: '#00AA88',
    bcm: '#FF6B35',
  },
  neutral: {
    900: '#111',
    800: '#222',
    700: '#333',
    600: '#666',
    500: '#999',
    400: '#ccc',
    300: '#ddd',
    200: '#eee',
    100: '#f5f5f5',
    50:  '#f9f9f9',
    white: '#fff',
  },
  semantic: {
    success: '#00AA88',
    warning: '#FFA500',
    danger:  '#FF0000',
    info:    '#0066CC',
  },
  status: {
    pending:        '#FFA500',
    in_review:      '#0066CC',
    approved:       '#00AA88',
    exam_scheduled: '#9933FF',
    certified:      '#00AA88',
    rejected:       '#FF0000',
  },
} as const

// TIPOGRAFÍA
export const typography = {
  family: {
    title: 'var(--font-poppins)',
    body:  'var(--font-inter)',
  },
  sizes: {
    h1:    { size: '2.5rem',   weight: 700, lineHeight: 1.2 },
    h2:    { size: '1.8rem',   weight: 700, lineHeight: 1.3 },
    h3:    { size: '1.4rem',   weight: 600, lineHeight: 1.4 },
    body:  { size: '1rem',     weight: 400, lineHeight: 1.6 },
    small: { size: '0.875rem', weight: 400, lineHeight: 1.5 },
    xs:    { size: '0.75rem',  weight: 400, lineHeight: 1.4 },
  },
}

// ESPACIADO
export const spacing = {
  xs:   '4px',
  sm:   '8px',
  md:   '16px',
  lg:   '24px',
  xl:   '32px',
  '2xl': '48px',
  '3xl': '64px',
}

// BREAKPOINTS
export const breakpoints = {
  mobile:  '320px',
  tablet:  '768px',
  desktop: '1024px',
  wide:    '1440px',
}

// SOMBRAS
export const shadows = {
  sm: '0 2px 8px rgba(0,0,0,0.1)',
  md: '0 4px 16px rgba(0,0,0,0.1)',
  lg: '0 10px 40px rgba(0,0,0,0.15)',
  xl: '0 20px 60px rgba(0,0,0,0.2)',
}

// TRANSICIONES
export const transitions = {
  fast:   '0.2s ease',
  normal: '0.3s ease',
  slow:   '0.5s ease',
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILIDADES Y HELPERS
// ═══════════════════════════════════════════════════════════════════════════

export function getStatusColor(status: string): string {
  return colors.status[status as keyof typeof colors.status] ?? colors.neutral[600]
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending:        'Pendiente',
    in_review:      'En revisión',
    approved:       'Aprobado',
    exam_scheduled: 'Examen programado',
    certified:      'Certificado',
    rejected:       'Rechazado',
  }
  return labels[status] ?? status
}

export function getCertificationColor(certType: string): string {
  const map: Record<string, string> = {
    Information_Delivery_Manager: colors.primary.idm,
    BIM_Design_Manager:           colors.primary.bdm,
    BIM_Construction_Manager:     colors.primary.bcm,
  }
  return map[certType] ?? colors.neutral[600]
}

export function getCertificationName(certType: string): string {
  const names: Record<string, string> = {
    Information_Delivery_Manager: 'Information Delivery Manager',
    BIM_Design_Manager:           'BIM Design Manager',
    BIM_Construction_Manager:     'BIM Construction Manager',
  }
  return names[certType] ?? certType
}

export function getButtonStyles(
  variant: 'primary' | 'secondary' | 'danger' | 'success' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md'
): CSSProperties {
  const variantColors: Record<string, string> = {
    primary:   colors.primary.idm,
    secondary: colors.neutral[600],
    danger:    colors.semantic.danger,
    success:   colors.semantic.success,
  }
  const sizeStyles: Record<string, CSSProperties> = {
    sm: { padding: '0.5rem 1rem',   fontSize: '0.875rem' },
    md: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    lg: { padding: '0.9rem 2rem',   fontSize: '1.1rem' },
  }
  return {
    backgroundColor: variantColors[variant],
    color:           'white',
    border:          'none',
    borderRadius:    '4px',
    cursor:          'pointer',
    fontWeight:      600,
    transition:      transitions.normal,
    fontFamily:      typography.family.body,
    ...sizeStyles[size],
  }
}

export function getCardStyles(
  variant: 'default' | 'info' | 'success' | 'warning' | 'danger' = 'default'
): CSSProperties {
  const borderColors: Record<string, string> = {
    default: 'transparent',
    info:    colors.semantic.info,
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    danger:  colors.semantic.danger,
  }
  return {
    padding:         spacing.lg,
    backgroundColor: colors.neutral.white,
    borderRadius:    '8px',
    boxShadow:       shadows.md,
    transition:      transitions.normal,
    borderLeft:      variant !== 'default' ? `4px solid ${borderColors[variant]}` : 'none',
  }
}

export function getInputStyles(): CSSProperties {
  return {
    padding:      spacing.md,
    borderRadius: '4px',
    border:       `1px solid ${colors.neutral[300]}`,
    fontSize:     '1rem',
    fontFamily:   typography.family.body,
    transition:   transitions.normal,
    width:        '100%',
  }
}

export function getBadgeStyles(status: string): CSSProperties {
  return {
    padding:         '0.25rem 0.75rem',
    borderRadius:    '12px',
    backgroundColor: getStatusColor(status),
    color:           'white',
    fontSize:        '0.85rem',
    fontWeight:      600,
    fontFamily:      typography.family.body,
    display:         'inline-block',
  }
}

export function getTableStyles(): CSSProperties {
  return { borderCollapse: 'collapse', width: '100%' }
}

export function getTableRowStyles(isHeader = false): CSSProperties {
  return {
    backgroundColor: isHeader ? colors.neutral[100] : 'transparent',
    borderBottom:    `1px solid ${isHeader ? colors.neutral[300] : colors.neutral[200]}`,
  }
}

export function getTableCellStyles(isHeader = false): CSSProperties {
  return {
    padding:    spacing.md,
    textAlign:  'left',
    fontWeight: isHeader ? 600 : 400,
    fontSize:   isHeader ? '0.95rem' : '0.9rem',
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// TEMAS Y COMBINACIONES
// ═══════════════════════════════════════════════════════════════════════════

export function getCertificationTheme(certType: string) {
  const color = getCertificationColor(certType)
  return {
    color,
    name:            getCertificationName(certType),
    backgroundColor: color + '1A', // ~10% opacity
    borderColor:     color,
  }
}

export function getCertHeroStyles(certType: string): CSSProperties {
  return {
    backgroundColor: getCertificationColor(certType),
    color:           'white',
    padding:         spacing.xl,
    borderRadius:    '8px',
    marginBottom:    spacing.lg,
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// BASE STYLES
// ═══════════════════════════════════════════════════════════════════════════

export const baseStyles = {
  button: getButtonStyles(),
  card:   getCardStyles(),
  input:  getInputStyles(),
  badge:  getBadgeStyles('pending'),
  table:  getTableStyles(),
}

export * from './hooks'

export default {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  transitions,
  getStatusColor,
  getStatusLabel,
  getCertificationColor,
  getCertificationName,
  getButtonStyles,
  getCardStyles,
  getInputStyles,
  getBadgeStyles,
  getTableStyles,
  getCertificationTheme,
  getCertHeroStyles,
}
