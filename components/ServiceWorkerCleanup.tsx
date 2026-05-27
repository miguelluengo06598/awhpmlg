'use client'

import { useEffect } from 'react'

export default function ServiceWorkerCleanup() {
  useEffect(() => {
    // Desregistrar service workers en desarrollo para evitar problemas de cache
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().then((success) => {
            if (success) {
              console.log('🧹 Service Worker desregistrado:', registration.scope)
            }
          })
        })
      })
    }
  }, [])

  return null
}
