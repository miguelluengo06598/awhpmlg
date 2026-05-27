import type { MouseEvent } from 'react'
import { colors, spacing, shadows, transitions } from './index'

export function useDesignSystem() {
  return { colors, spacing, shadows, transitions }
}

export function useButtonHover() {
  return {
    onMouseEnter: (e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = shadows.lg
    },
    onMouseLeave: (e: MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    },
  }
}

export function useCardHover() {
  return {
    onMouseEnter: (e: MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = shadows.lg
    },
    onMouseLeave: (e: MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = shadows.md
    },
  }
}
