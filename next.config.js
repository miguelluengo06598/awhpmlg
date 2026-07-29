const { withSentryConfig } = require('@sentry/nextjs')

const isDev = process.env.NODE_ENV !== 'production'

const securityHeaders = [
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'X-Frame-Options',         value: 'DENY' },
  // 0 es el valor recomendado hoy: el filtro heurístico (1; mode=block) está
  // obsoleto y ha introducido vulnerabilidades propias. La CSP es la defensa real.
  { key: 'X-XSS-Protection',        value: '0' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-eval' solo en desarrollo (React lo usa para depuración). En
      // producción no se necesita. Eliminar 'unsafe-inline' requeriría migrar a
      // nonces (fuerza render dinámico + romper estilos inline de framer-motion):
      // ver SECURITY_PENDIENTE.md.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' data:",
      "connect-src 'self' *.supabase.co wss://*.supabase.co https://sentry.io *.ingest.sentry.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT ?? 'aecmi-platform',
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: true,
  hideSourceMaps: true,
})
