'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Home, FileText, Shield, Cookie } from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface Props {
  locale: 'es' | 'en' | 'pt';
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  type: 'privacy' | 'terms' | 'cookies';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LegalPage({ locale, title, subtitle, lastUpdated, sections, type }: Props) {
  const { t, getLink } = useTranslation(locale);
  const isEs = locale === 'es';
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const otherPages = [
    { key: 'privacy', label: isEs ? 'Privacidad' : 'Privacy', href: isEs ? '/legal/privacidad' : '/en/legal/privacy', icon: Shield },
    { key: 'terms', label: isEs ? 'Términos' : 'Terms', href: isEs ? '/legal/terminos' : '/en/legal/terms', icon: FileText },
    { key: 'cookies', label: isEs ? 'Cookies' : 'Cookies', href: isEs ? '/legal/cookies' : '/en/legal/cookies', icon: Cookie },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileTocOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#f9fbff] to-[#f0f4ff] py-16 md:py-20">
        <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(circle, #0066CC 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-[#0066CC] uppercase bg-white rounded-full mb-4 border border-[#0066CC]/10">
              {isEs ? 'Información Legal' : 'Legal Information'}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#333] tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-lg text-[#333]/70">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* SIDEBAR / TABLE OF CONTENTS */}
          <aside className="lg:w-72 shrink-0">
            {/* Mobile accordion */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setMobileTocOpen(!mobileTocOpen)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-[#f9fbff] border border-[#ddd]/60 text-[#333] font-semibold"
              >
                <span>{isEs ? 'Tabla de Contenidos' : 'Table of Contents'}</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileTocOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileTocOpen && (
                <div className="mt-2 p-4 rounded-xl bg-[#f9fbff] border border-[#ddd]/60 space-y-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="block w-full text-left text-sm text-[#333]/80 hover:text-[#0066CC] py-1.5 transition-colors"
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop sticky sidebar */}
            <div className="hidden lg:block sticky top-24">
              <div className="p-5 rounded-xl bg-[#f9fbff] border border-[#ddd]/40">
                <h3 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-4">
                  {isEs ? 'Contenido' : 'Contents'}
                </h3>
                <nav className="flex flex-col gap-0.5">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollToSection(s.id)}
                      className="text-left text-[13px] text-[#333]/80 hover:text-[#0066CC] py-1.5 px-2 rounded-lg hover:bg-white transition-all"
                    >
                      {s.title}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Other legal pages */}
              <div className="mt-4 p-5 rounded-xl bg-[#f9fbff] border border-[#ddd]/40">
                <h3 className="text-xs font-bold text-[#666] uppercase tracking-wider mb-3">
                  {isEs ? 'Más información' : 'More info'}
                </h3>
                <div className="flex flex-col gap-1">
                  {otherPages
                    .filter((p) => p.key !== type)
                    .map((p) => (
                      <Link
                        key={p.key}
                        href={p.href}
                        className="flex items-center gap-2 text-[13px] text-[#333]/80 hover:text-[#0066CC] py-1.5 px-2 rounded-lg hover:bg-white transition-all"
                      >
                        <p.icon className="w-3.5 h-3.5" />
                        {p.label}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="max-w-3xl">
              <p className="text-sm text-[#333]/50 mb-8">
                {isEs ? 'Última actualización:' : 'Last updated:'} {lastUpdated}
              </p>

              <div className="space-y-12">
                {sections.map((section, idx) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    <h2 className="text-2xl md:text-[28px] font-bold text-[#333] mb-4 pb-3 border-b border-[#ddd]/40">
                      {section.title}
                    </h2>
                    <div className="text-[#333]/80 leading-[1.8] text-base space-y-4">
                      {section.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom links */}
              <div className="mt-16 pt-8 border-t border-[#ddd]/40">
                <div className="flex flex-wrap items-center gap-4">
                  <Link href={getLink('/')} className="inline-flex items-center gap-2 text-sm text-[#0066CC] hover:underline font-medium">
                    <Home className="w-4 h-4" />
                    {isEs ? 'Volver al inicio' : 'Back to home'}
                  </Link>
                  <span className="text-[#ddd]">|</span>
                  {otherPages
                    .filter((p) => p.key !== type)
                    .map((p) => (
                      <span key={p.key} className="flex items-center gap-2">
                        <Link href={p.href} className="inline-flex items-center gap-1.5 text-sm text-[#0066CC] hover:underline font-medium">
                          {p.label}
                        </Link>
                        <span className="text-[#ddd]">|</span>
                      </span>
                    ))}
                  <span className="text-sm text-[#333]/40">
                    {isEs ? 'Última actualización:' : 'Last updated:'} {lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
