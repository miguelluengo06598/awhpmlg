'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Card } from './Card'

interface AnimatedCardProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger' | 'gradient'
  children: ReactNode
  delay?: number
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  header?: ReactNode
  footer?: ReactNode
}

export function AnimatedCard({
  variant = 'default',
  children,
  delay = 0,
  padding,
  onClick,
  header,
  footer,
}: AnimatedCardProps) {
  const wrapStyle: CSSProperties = {
    animation: `slideInUp 0.45s ease-out ${delay}ms both`,
  }

  return (
    <div style={wrapStyle}>
      <Card variant={variant} padding={padding} onClick={onClick} header={header} footer={footer}>
        {children}
      </Card>
    </div>
  )
}
