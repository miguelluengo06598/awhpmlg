'use client'

import type { CSSProperties } from 'react'
import { colors } from '@/lib/design-system'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export function Loader({ size = 'md', color = colors.primary.idm }: LoaderProps) {
  const sizeMap = { sm: '24px', md: '40px', lg: '60px' }
  const thickness = size === 'sm' ? '3px' : size === 'lg' ? '5px' : '4px'

  const style: CSSProperties = {
    width:        sizeMap[size],
    height:       sizeMap[size],
    border:       `${thickness} solid ${color}22`,
    borderTop:    `${thickness} solid ${color}`,
    borderRadius: '50%',
    animation:    'spin 0.8s linear infinite',
    flexShrink:   0,
  }

  return <div style={style} />
}
