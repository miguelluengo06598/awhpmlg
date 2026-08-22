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
    // Brasil: verde, rombo amarillo y globo azul. La banda blanca se dibuja como
    // un círculo grande de trazo blanco recortado al globo (así solo asoma el
    // arco inferior, como en la bandera real). Las 27 estrellas se reducen a
    // unos pocos puntos: a 24 px el detalle exacto sería ruido.
    const clipGlobe = `${uid}-globe`
    return (
      <svg {...common}>
        <rect width="60" height="40" fill="#009C3B" />
        <path d="M30 4.9 54.9 20 30 35.1 5.1 20z" fill="#FEDF00" />
        <clipPath id={clipGlobe}>
          <circle cx="30" cy="20" r="10" />
        </clipPath>
        <circle cx="30" cy="20" r="10" fill="#002776" />
        <g clipPath={`url(#${clipGlobe})`}>
          <circle cx="30" cy="9" r="15.7" fill="none" stroke="#fff" strokeWidth="2.8" />
          <g fill="#fff">
            <circle cx="24" cy="15" r="0.9" />
            <circle cx="30" cy="13.4" r="0.9" />
            <circle cx="36" cy="15.5" r="0.9" />
            <circle cx="27" cy="17.6" r="0.9" />
            <circle cx="34" cy="18.2" r="0.9" />
            <circle cx="30" cy="28.8" r="0.9" />
          </g>
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
