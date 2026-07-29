'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Banderas como SVG inline. Se dibujan aquí en vez de usar emoji de bandera
// (pares de indicadores regionales) porque Windows no tiene glifo para ellos:
// Chrome/Edge en Windows los renderizan como las siglas del país, así que el
// selector se vería distinto según el sistema operativo del visitante.
//
// Sin imágenes ni librerías externas: cero peticiones y cero dependencias.
//
// Todas se normalizan a un lienzo 3:2 (60×40) para que las tres ocupen lo mismo
// en fila. La Union Jack se define sobre su retícula nativa 60×30 y se escala en
// vertical; es el mismo ajuste que hacen los sets de iconos de banderas en 3:2.
// ─────────────────────────────────────────────────────────────────────────────

import { useId } from 'react'
import type { Locale } from '@/lib/locale'

type Props = {
  locale: Locale
  /** Clases de tamaño/estilo. El ratio nativo es 3:2 (p. ej. w-6 h-4). */
  className?: string
}

/**
 * Bandera del idioma, puramente decorativa: va marcada con aria-hidden y
 * focusable={false}. El nombre accesible ("Español", "English", "Português")
 * lo aporta el aria-label del botón que la contiene, nunca este SVG.
 */
export default function FlagIcon({ locale, className = 'w-6 h-4' }: Props) {
  // clipPath necesita ids únicos: hay varias instancias del selector por página
  // (header desktop + menú móvil) y los ids duplicados son HTML inválido.
  const uid = useId()

  const common = {
    viewBox: '0 0 60 40',
    className,
    role: 'presentation' as const,
    'aria-hidden': true,
    focusable: false,
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (locale === 'es') {
    // Rojo/amarillo/rojo con la banda central a media altura (proporción 1:2:1).
    return (
      <svg {...common}>
        <rect width="60" height="40" fill="#AA151B" />
        <rect y="10" width="60" height="20" fill="#F1BF00" />
      </svg>
    )
  }

  if (locale === 'pt') {
    // Verde 2/5 + rojo 3/5, con esfera armilar y escudo simplificados: a 24 px
    // el detalle real del escudo (quinas y castillos) se convierte en ruido.
    return (
      <svg {...common}>
        <rect width="60" height="40" fill="#DA291C" />
        <rect width="24" height="40" fill="#046A38" />
        <g transform="translate(24 20)" fill="none" stroke="#FFE800" strokeWidth="1.5">
          <circle r="9" />
          <ellipse rx="4.4" ry="9" />
          <path d="M-9 0h18" />
        </g>
        <g transform="translate(24 20)">
          <path
            d="M-3.7-5.6h7.4v5.2a3.7 3.7 0 0 1-3.7 3.9 3.7 3.7 0 0 1-3.7-3.9z"
            fill="#fff"
            stroke="#DA291C"
            strokeWidth="1.5"
          />
          <rect x="-1.5" y="-2.6" width="3" height="4" rx="1.4" fill="#003399" />
        </g>
      </svg>
    )
  }

  // Reino Unido: retícula canónica 60×30. El clip recorta las diagonales rojas
  // para que queden contrapeadas (rojo solo en la mitad que le corresponde).
  const clipAll = `${uid}-all`
  const clipDiag = `${uid}-diag`
  return (
    <svg {...common}>
      <g transform="scale(1 1.3333)">
        <clipPath id={clipAll}>
          <path d="M0 0v30h60V0z" />
        </clipPath>
        <clipPath id={clipDiag}>
          <path d="M30 15h30v15zv15h-30zh-30v-15zv-15h30z" />
        </clipPath>
        <g clipPath={`url(#${clipAll})`}>
          <path d="M0 0v30h60V0z" fill="#012169" />
          <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0 0 60 30M60 0 0 30"
            clipPath={`url(#${clipDiag})`}
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </g>
    </svg>
  )
}
