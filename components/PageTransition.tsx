'use client'

import { useEffect, useRef } from 'react'

export function PageTransition() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.animation = 'fadeIn 0.35s ease-out both'
  }, [])

  return (
    <div
      ref={ref}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -1 }}
    />
  )
}
