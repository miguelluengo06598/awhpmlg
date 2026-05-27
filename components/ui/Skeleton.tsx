'use client'

import type { CSSProperties } from 'react'
import { colors } from '@/lib/design-system'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
}

export function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
}: SkeletonProps) {
  const style: CSSProperties = {
    width:        typeof width        === 'number' ? `${width}px`        : width,
    height:       typeof height       === 'number' ? `${height}px`       : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    backgroundColor: colors.neutral[200],
    animation:    'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    display:      'block',
  }

  return <div style={style} />
}
