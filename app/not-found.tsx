'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, HardHat } from 'lucide-react'
import { DEFAULT_LOCALE, localeFromPath, localizePath, type Locale } from '@/lib/locale'

// El 404 global de Next se prerenderiza en build (ruta /_not-found), por lo que
// `usePathname()` devolvería `/_not-found` en el servidor y la URL real en el
// cliente → desajuste de hidratación. La documentación de Next indica resolver
// en cliente lo que dependa del path, así que el idioma se detecta tras montar
// partiendo del idioma por defecto (español, que es el de la raíz del sitio).

// Retícula de puntos de marca, atenuada hacia los bordes para que no compita
// con el texto (mismo recurso que el hero legal y las páginas de certificación).
const DOT_GRID: React.CSSProperties = {
  backgroundImage: 'radial-gradient(circle, #0066CC 1px, transparent 1px)',
  backgroundSize: '28px 28px',
  maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 20%, transparent 75%)',
}

// Marcas de encuadre de plano técnico: refuerzan el lenguaje BIM de la marca
// sin añadir ninguna ilustración pesada.
function CornerTicks() {
  const base = 'absolute w-5 h-5 border-[#0066CC]/25'
  return (
    <>
      <span className={`${base} top-0 left-0 border-t border-l`} />
      <span className={`${base} top-0 right-0 border-t border-r`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  )
}

export default function NotFound() {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE)

  useEffect(() => {
    setLocale(localeFromPath(window.location.pathname))
  }, [])

  const L = (es: string, en: string, pt: string) =>
    locale === 'es' ? es : locale === 'en' ? en : pt

  const quickLinks = [
    { href: '/certifications', label: L('Certificaciones', 'Certifications', 'Certificações') },
    { href: '/about', label: L('Sobre AECOMI', 'About AECOMI', 'Sobre a AECOMI') },
    { href: '/contact', label: L('Contacto', 'Contact', 'Contato') },
  ]

  return (
    <main className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.45] pointer-events-none" style={DOT_GRID} />
      {/* Halo de marca, muy tenue, para dar profundidad al fondo blanco */}
      <div className="absolute top-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full bg-[#0066CC]/[0.05] blur-3xl pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">

          {/* ── Columna de contenido ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F0FF] border border-[#0066CC]/10">
              <HardHat className="w-3.5 h-3.5 text-[#0066CC]" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-[0.14em] text-[#0066CC] uppercase">
                {L('Error 404', 'Error 404', 'Erro 404')}
              </span>
            </span>

            <h1 className="mt-7 font-display text-[2.75rem] sm:text-5xl lg:text-[3.5rem] font-bold text-[#0F0524] tracking-[-0.03em] leading-[1.05]">
              {L('Página en', 'Page under', 'Página em')}
              <br />
              <span className="text-[#0066CC]">
                {L('construcción', 'construction', 'construção')}
              </span>
            </h1>

            {/* Filete corto: mismo recurso de jerarquía del resto del rediseño */}
            <span className="block w-14 h-px bg-[#0066CC]/30 mt-8 mx-auto lg:mx-0" />

            <p className="mt-8 text-lg text-[#333]/75 leading-relaxed max-w-md mx-auto lg:mx-0">
              {L(
                'Estamos trabajando en esta sección. Estará disponible muy pronto.',
                'We are working on this section. It will be available very soon.',
                'Estamos trabalhando nesta seção. Em breve estará disponível.',
              )}
            </p>

            <p className="mt-3 text-[15px] text-[#333]/45 max-w-md mx-auto lg:mx-0">
              {L(
                'Mientras tanto, puedes volver al inicio o escribirnos si necesitas ayuda.',
                'In the meantime, you can go back home or write to us if you need help.',
                'Enquanto isso, você pode voltar ao início ou nos escrever se precisar de ajuda.',
              )}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href={localizePath('/', locale)}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0066CC] text-white font-semibold rounded-xl hover:bg-[#0055AA] transition-all shadow-lg shadow-[#0066CC]/20 text-[15px]"
              >
                {L('Volver al inicio', 'Back to home', 'Voltar ao início')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>

              <Link
                href={localizePath('/contact', locale)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-[#333] font-semibold rounded-xl border border-gray-200 hover:border-[#0066CC]/30 hover:text-[#0066CC] transition-all text-[15px]"
              >
                {L('Contactar', 'Get in touch', 'Fale conosco')}
              </Link>
            </div>

            {/* Salidas secundarias: evitan que el 404 sea un callejón sin salida */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#333]/40 uppercase">
                {L('Quizá buscabas', 'You may be looking for', 'Talvez você procure')}
              </p>
              <ul className="mt-4 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={localizePath(link.href, locale)}
                      className="group inline-flex items-center gap-1 text-[15px] text-[#333]/70 hover:text-[#0066CC] transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight
                        className="w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Columna gráfica: el 404 como pieza tipográfica ───────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="order-1 lg:order-2 relative"
            aria-hidden="true"
          >
            <div className="relative mx-auto w-full max-w-[420px] aspect-square flex items-center justify-center p-8">
              <CornerTicks />

              {/* Anillos concéntricos: eco del lenguaje de sello / credencial */}
              <span className="absolute inset-[8%] rounded-full border border-[#0066CC]/[0.09]" />
              <span className="absolute inset-[20%] rounded-full border border-dashed border-[#0066CC]/[0.14]" />

              {/* Numeral con relleno degradado de marca (blue → cyan → purple) */}
              <span
                className="relative font-display font-extrabold leading-none tracking-[-0.06em] text-[8rem] sm:text-[11rem] bg-clip-text text-transparent select-none"
                style={{ backgroundImage: 'linear-gradient(135deg, #0066CC 0%, #00A3C4 55%, #3D1A6E 100%)' }}
              >
                404
              </span>

              {/* Cota de plano: traduce el "en obra" al lenguaje técnico de la marca */}
              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]/40" />
                <span className="w-24 sm:w-32 h-px bg-[#0066CC]/25" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066CC]/40" />
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}
