'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search, Globe, Star, Shield, Users, ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  X, FileCheck, UserCheck, Monitor, Lock, RefreshCw, BadgeCheck, Calendar, QrCode,
  ScanLine, Camera, CameraOff, Hash, ExternalLink, Plus,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';
import { validateQRCode } from '@/lib/qrGenerator';
import { reveal, BLUEPRINT, CountUp, RevealWords, Magnetic, Marquee, Eyebrow } from '@/components/ui/motion-kit';

interface Props {
  locale: 'es' | 'en' | 'pt';
}

interface Professional {
  id: number;
  name: string;
  email: string;
  certifications: string[];
  country: string;
  company: string;
  status: 'Activa' | 'Por Renovar' | 'Vencida' | 'Active' | 'Due for Renewal' | 'Expired';
  obtainedDate: string;
  expiryDate: string;
  certificateNumber: string;
  isPublic?: boolean;
  qrCode?: string;
}

function InfoAccordionItem({ item }: { item: { icon: React.ReactNode; title: string; content: React.ReactNode } }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="border-b border-pmi-dark/15">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-4 py-5 text-left">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pmi-cream text-pmi-dark [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
        <span className="flex-1 font-display text-lg font-semibold text-pmi-dark">{item.title}</span>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pmi-dark/20 transition-all duration-300 ${open ? 'rotate-45 bg-pmi-dark text-white' : 'text-pmi-dark'}`}>
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="max-w-2xl pb-6 pl-14 text-[15px] leading-relaxed text-pmi-dark/65">{item.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function StatusBadge({ status, locale }: { status: Professional['status']; locale: 'es' | 'en' | 'pt' }) {
  const styles: Record<string, string> = {
    Activa: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
    Active: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
    'Por Renovar': 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    'Due for Renewal': 'bg-amber-400/15 text-amber-300 border-amber-400/30',
    Vencida: 'bg-red-400/15 text-red-300 border-red-400/30',
    Expired: 'bg-red-400/15 text-red-300 border-red-400/30',
  };
  const labels: Record<string, string> = {
    Activa: locale === 'es' ? 'Activa' : locale === 'pt' ? 'Ativa' : 'Active',
    Active: locale === 'es' ? 'Activa' : locale === 'pt' ? 'Ativa' : 'Active',
    'Por Renovar': locale === 'es' ? 'Por Renovar' : locale === 'pt' ? 'A Renovar' : 'Due for Renewal',
    'Due for Renewal': locale === 'es' ? 'Por Renovar' : locale === 'pt' ? 'A Renovar' : 'Due for Renewal',
    Vencida: locale === 'es' ? 'Vencida' : locale === 'pt' ? 'Expirada' : 'Expired',
    Expired: locale === 'es' ? 'Vencida' : locale === 'pt' ? 'Expirada' : 'Expired',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || styles.Activa}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status] || status}
    </span>
  );
}

export default function RegistryPage({ locale }: Props) {
  const router = useRouter();
  const { t, getLink } = useTranslation(locale);
  const [activeTab, setActiveTab] = useState<'verify' | 'search'>('verify');

  // QR Verification state
  const [qrInput, setQrInput] = useState('');
  const [qrError, setQrError] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  // Search state
  const [query, setQuery] = useState('');
  const [certFilter, setCertFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const searchRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 8;

  const tReg = (key: string) => (t as unknown as { registry?: Record<string, string> }).registry?.[key] ?? key;

  const statuses = {
    all: tReg('status_all'),
    active: tReg('status_active'),
    due: tReg('status_due'),
    expired: tReg('status_expired'),
  };

  const certOptions = [
    { value: 'all', label: tReg('filter_all') },
    { value: 'Information Delivery Manager', label: 'Information Delivery Manager' },
    { value: 'BIM Design Manager', label: 'BIM Design Manager' },
    { value: 'BIM Construction Manager', label: 'BIM Construction Manager' },
  ];

  const countryOptions = [
    { value: 'all', label: tReg('filter_all_short') },
    { value: 'España', label: 'España' },
    { value: 'UK', label: 'UK' },
    { value: 'USA', label: 'USA' },
    { value: 'México', label: 'México' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Chile', label: 'Chile' },
  ];

  const statusOptions = [
    { value: 'all', label: statuses.all },
    { value: 'active', label: statuses.active },
    { value: 'due', label: statuses.due },
    { value: 'expired', label: statuses.expired },
  ];

  // Only show publicly listed professionals
  const publicProfessionals: Professional[] = [];

  const filtered = useMemo(() => {
    return publicProfessionals.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.certificateNumber.toLowerCase().includes(q) ||
        (p.qrCode && p.qrCode.toLowerCase().includes(q));
      const matchesCert = certFilter === 'all' || p.certifications.includes(certFilter);
      const matchesCountry = countryFilter === 'all' || p.country === countryFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && (p.status === 'Activa' || p.status === 'Active')) ||
        (statusFilter === 'due' && (p.status === 'Por Renovar' || p.status === 'Due for Renewal')) ||
        (statusFilter === 'expired' && (p.status === 'Vencida' || p.status === 'Expired'));
      return matchesQuery && matchesCert && matchesCountry && matchesStatus;
    });
  }, [query, certFilter, countryFilter, statusFilter, publicProfessionals]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageResults = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = useMemo(() => {
    const total = publicProfessionals.length;
    const active = publicProfessionals.filter((p) => p.status === 'Activa' || p.status === 'Active').length;
    const countries = new Set(publicProfessionals.map((p) => p.country)).size;
    return { total, active, countries };
  }, [publicProfessionals]);

  const scrollToSearch = () => {
    searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const clearFilters = () => {
    setQuery('');
    setCertFilter('all');
    setCountryFilter('all');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const hasFilters = query || certFilter !== 'all' || countryFilter !== 'all' || statusFilter !== 'all';

  const handleVerifyQR = useCallback(() => {
    const code = qrInput.trim().toUpperCase();
    if (!code) {
      setQrError(tReg('qr_err_empty'));
      return;
    }
    if (!validateQRCode(code)) {
      setQrError(tReg('qr_err_format'));
      return;
    }
    setQrError('');
    router.push(getLink(`/certificate/${code}`));
  }, [qrInput, router, locale, getLink]);

  const handleStartScan = useCallback(() => {
    setIsScanning(true);
    // In a real implementation, this would activate the camera and use jsQR
    // For now, we simulate a scan after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setQrInput('IDM-2024-ABC123XYZ789');
    }, 2000);
  }, []);

  const handleStopScan = useCallback(() => {
    setIsScanning(false);
  }, []);

  const reduce = useReducedMotion();
  const regLabel = (es: string, en: string, pt: string) => (locale === 'es' ? es : locale === 'en' ? en : pt);

  const infoItems = [
    {
      icon: <UserCheck className="h-5 w-5" />,
      title: tReg('info_appear_title'),
      content: (
        <div className="space-y-3">
          <p>{tReg('info_appear_desc')}</p>
          <Link href={getLink('/certifications')} className="inline-flex items-center gap-2 font-semibold text-pmi-dark underline decoration-pmi-orange decoration-2 underline-offset-4">
            {tReg('info_appear_link')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
    { icon: <Lock className="h-5 w-5" />, title: tReg('info_privacy_title'), content: <p>{tReg('info_privacy_desc')}</p> },
    {
      icon: <BadgeCheck className="h-5 w-5" />,
      title: tReg('info_verify_title'),
      content: (
        <div className="space-y-3">
          <p>{tReg('info_verify_desc')}</p>
          <Link href={getLink('/contact')} className="inline-flex items-center gap-2 font-semibold text-pmi-dark underline decoration-pmi-orange decoration-2 underline-offset-4">
            {tReg('info_verify_link')} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ),
    },
    { icon: <RefreshCw className="h-5 w-5" />, title: tReg('info_update_title'), content: <p>{tReg('info_update_desc')}</p> },
  ];

  const selectClass =
    'w-full appearance-none rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 pr-10 text-sm text-white focus:border-pmi-cyan focus:outline-none focus:ring-2 focus:ring-pmi-cyan/30 [&>option]:text-pmi-dark';

  return (
    <div className="min-h-screen bg-white">
      {/* ═══ 1. HERO · visor de escaneo ═══════════════════════════════ */}
      <section className="relative flex min-h-[86vh] items-center overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />

        {/* Visor QR */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 lg:block xl:right-24" aria-hidden>
          <div className="absolute inset-6 grid grid-cols-9 gap-1.5">
            {Array.from({ length: 81 }).map((_, i) => {
              const on = (i * 7 + (i % 5) * 3) % 4 !== 0;
              return (
                <motion.span
                  key={i}
                  className="rounded-[3px]"
                  style={{ backgroundColor: on ? (i % 11 === 0 ? '#E87722' : '#4DA3FF') : 'transparent' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: on ? 0.55 : 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + (i % 9) * 0.04 + Math.floor(i / 9) * 0.04 }}
                />
              );
            })}
          </div>
          {[
            'left-0 top-0 border-l-2 border-t-2 rounded-tl-2xl',
            'right-0 top-0 border-r-2 border-t-2 rounded-tr-2xl',
            'left-0 bottom-0 border-l-2 border-b-2 rounded-bl-2xl',
            'right-0 bottom-0 border-r-2 border-b-2 rounded-br-2xl',
          ].map((c) => (
            <span key={c} className={`absolute h-12 w-12 border-pmi-cyan ${c}`} />
          ))}
          <motion.span
            className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-pmi-cyan to-transparent shadow-[0_0_20px_4px_rgba(0,163,196,0.6)]"
            animate={reduce ? { top: '50%' } : { top: ['6%', '94%', '6%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow dark>{tReg('hero_eyebrow')}</Eyebrow>
          </motion.div>
          <h1 className="mt-8 max-w-3xl font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[84px]">
            <RevealWords text={tReg('hero_title')} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }} className="mt-6 max-w-2xl font-display text-xl text-pmi-cyan sm:text-2xl">
            {tReg('hero_subtitle')}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
            {tReg('hero_lead')}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }} className="mt-10">
            <Magnetic>
              <button onClick={scrollToSearch} className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-orange px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-[#f08430]">
                <Search className="h-4 w-4" />
                {tReg('cta_verify_or_search')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      <Marquee items={['IDM', 'BDM', 'BCM', regLabel('Verificación pública', 'Public verification', 'Verificação pública'), 'QR']} />

      {/* ═══ 2. QUÉ ES · tríptico ═════════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{tReg('what_eyebrow')}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{tReg('what_title')}</h2>
          </motion.div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pmi-dark/10 md:grid-cols-3">
            {[
              { icon: QrCode, title: tReg('card_qr_title'), desc: tReg('card_qr_desc') },
              { icon: Search, title: tReg('card_search_title'), desc: tReg('card_search_desc') },
              { icon: Star, title: tReg('card_recognition_title'), desc: tReg('card_recognition_desc') },
            ].map((card, i) => (
              <motion.div key={i} {...reveal} transition={{ duration: 0.5, delay: i * 0.1 }} className="group bg-white p-8 transition-colors duration-500 hover:bg-pmi-dark lg:p-10">
                <div className="flex items-start justify-between">
                  <card.icon className="h-10 w-10 text-pmi-dark transition-colors duration-500 group-hover:text-pmi-cyan" />
                  <span className="font-display text-6xl font-semibold tabular-nums text-pmi-dark/[0.07] transition-colors duration-500 group-hover:text-white/15">0{i + 1}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-semibold text-pmi-dark transition-colors duration-500 group-hover:text-white">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-pmi-dark/65 transition-colors duration-500 group-hover:text-white/70">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. VERIFICAR / BUSCAR · consola ══════════════════════════ */}
      <section ref={searchRef} className="relative scroll-mt-20 overflow-hidden bg-[#070B16] py-24 text-white md:py-32">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="text-center">
            <div className="flex justify-center"><Eyebrow dark>{tReg('verify_eyebrow')}</Eyebrow></div>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{tReg('verify_heading')}</h2>
          </motion.div>

          {/* Pestañas */}
          <div className="mt-10 flex justify-center" role="tablist">
            <div className="relative inline-flex rounded-full border border-white/15 bg-white/[0.05] p-1.5">
              {([
                ['verify', QrCode, tReg('tab_verify')],
                ['search', Search, tReg('tab_search')],
              ] as const).map(([key, Icon, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeTab === key}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${activeTab === key ? 'text-pmi-dark' : 'text-white/70 hover:text-white'}`}
                >
                  {activeTab === key && <motion.span layoutId="reg-tab" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative flex items-center gap-2"><Icon className="h-4 w-4" />{label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'verify' ? (
              <motion.div key="verify" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mx-auto mt-10 max-w-2xl">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm sm:p-10">
                  <div className="text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pmi-cyan/15 text-pmi-cyan"><Shield className="h-7 w-7" /></span>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{tReg('verify_title')}</h3>
                    <p className="mt-2 text-sm text-white/55">{tReg('verify_desc')}</p>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="relative">
                      <Hash className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-pmi-cyan" />
                      <input
                        type="text"
                        value={qrInput}
                        onChange={(e) => { setQrInput(e.target.value); setQrError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleVerifyQR()}
                        placeholder={tReg('verify_input_placeholder')}
                        aria-label={tReg('verify_title')}
                        className="w-full rounded-2xl border border-white/15 bg-[#0B1122] py-4 pl-14 pr-4 font-mono text-lg uppercase tracking-wider text-white placeholder:normal-case placeholder:tracking-normal placeholder:text-white/30 focus:border-pmi-cyan focus:outline-none focus:ring-2 focus:ring-pmi-cyan/30"
                      />
                    </div>

                    {qrError && (
                      <motion.div role="alert" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
                        <X className="h-4 w-4 shrink-0" />
                        {qrError}
                      </motion.div>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button onClick={handleVerifyQR} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-pmi-orange px-6 py-4 font-semibold text-pmi-dark transition-colors hover:bg-[#f08430]">
                        <Search className="h-5 w-5" />
                        {tReg('verify_button')}
                      </button>
                      <button onClick={isScanning ? handleStopScan : handleStartScan} className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 font-semibold text-white transition-colors hover:bg-white/10">
                        {isScanning ? <CameraOff className="h-5 w-5" /> : <Camera className="h-5 w-5" />}
                        {isScanning ? tReg('verify_stop_scan') : tReg('verify_scan')}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isScanning && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="relative rounded-2xl border border-pmi-cyan/30 bg-pmi-cyan/[0.06] p-8 text-center">
                            {['left-3 top-3 border-l-2 border-t-2', 'right-3 top-3 border-r-2 border-t-2', 'left-3 bottom-3 border-l-2 border-b-2', 'right-3 bottom-3 border-r-2 border-b-2'].map((c) => (
                              <span key={c} className={`absolute h-5 w-5 border-pmi-cyan ${c}`} />
                            ))}
                            <ScanLine className="mx-auto mb-3 h-12 w-12 animate-pulse text-pmi-cyan/60" />
                            <p className="text-sm font-medium text-white/70">{tReg('verify_camera_hint')}</p>
                            <p className="mt-1 text-xs text-white/40">{tReg('verify_camera_off')}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="border-t border-white/10 pt-5">
                      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{tReg('example_codes')}</p>
                      <div className="flex flex-wrap gap-2">
                        {['IDM-2024-ABC123XYZ789', 'BDM-2024-DEF456ABC012', 'BCM-2024-GHI789DEF345'].map((code) => (
                          <button
                            key={code}
                            onClick={() => { setQrInput(code); setQrError(''); }}
                            className="rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-pmi-cyan hover:text-pmi-cyan"
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="search" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="mt-10">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-10">
                  <div className="text-center">
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-pmi-cyan/15 text-pmi-cyan"><Users className="h-7 w-7" /></span>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{tReg('search_title')}</h3>
                    <p className="mt-2 text-sm text-white/55">{tReg('search_desc')}</p>
                  </div>

                  <div className="relative mt-8">
                    <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-pmi-cyan" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                      placeholder={tReg('search_input_placeholder')}
                      aria-label={tReg('search_title')}
                      className="w-full rounded-full border border-white/15 bg-[#0B1122] py-4 pl-14 pr-4 text-lg text-white placeholder:text-white/30 focus:border-pmi-cyan focus:outline-none focus:ring-2 focus:ring-pmi-cyan/30"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 md:flex-row">
                    {([
                      [certFilter, setCertFilter, certOptions],
                      [countryFilter, setCountryFilter, countryOptions],
                      [statusFilter, setStatusFilter, statusOptions],
                    ] as const).map(([val, setVal, opts], i) => (
                      <div key={i} className="relative flex-1">
                        <select value={val} onChange={(e) => { setVal(e.target.value); setCurrentPage(1); }} className={selectClass}>
                          {opts.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                      </div>
                    ))}
                    {hasFilters && (
                      <button onClick={clearFilters} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                        <X className="h-4 w-4" />
                        {tReg('clear')}
                      </button>
                    )}
                  </div>

                  <div className="mb-6 mt-8 flex items-center justify-between">
                    <p className="text-sm text-white/55">
                      <span className="font-display text-lg font-semibold text-white">{filtered.length}</span>{' '}
                      {filtered.length === 1 ? tReg('results_count') : tReg('results_count_plural')}
                    </p>
                    <div className="flex gap-1 rounded-full border border-white/15 p-1">
                      {(['cards', 'table'] as const).map((m) => (
                        <button key={m} onClick={() => setViewMode(m)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${viewMode === m ? 'bg-white text-pmi-dark' : 'text-white/60 hover:text-white'}`}>
                          {m === 'cards' ? tReg('view_card') : tReg('view_table')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {pageResults.length > 0 ? (
                      <motion.div key={`${viewMode}-${currentPage}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                        {viewMode === 'cards' ? (
                          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {pageResults.map((p) => (
                              <div key={p.id} className="group rounded-2xl border border-white/10 bg-[#0B1122] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-pmi-cyan/50">
                                <div className="mb-4 flex items-start justify-between">
                                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pmi-cyan/20 font-display text-lg font-semibold text-pmi-cyan">{p.name.charAt(0)}</span>
                                  <StatusBadge status={p.status} locale={locale} />
                                </div>
                                <h3 className="mb-1 truncate font-display font-semibold">{p.name}</h3>
                                <p className="mb-3 text-xs text-white/45">{p.company} — {p.country}</p>
                                <div className="mb-3 flex flex-wrap gap-1.5">
                                  {p.certifications.map((c) => (
                                    <span key={c} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">{c}</span>
                                  ))}
                                </div>
                                <div className="space-y-1 text-xs text-white/45">
                                  <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{tReg('date_obtained_short')} {p.obtainedDate}</div>
                                  <div className="flex items-center gap-1.5"><RefreshCw className="h-3 w-3" />{tReg('date_expiry_short')} {p.expiryDate}</div>
                                </div>
                                <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                                  <p className="font-mono text-[10px] text-white/35">{p.certificateNumber}</p>
                                  {p.qrCode && (
                                    <Link href={getLink(`/certificate/${p.qrCode}`)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-pmi-cyan hover:underline">
                                      <ExternalLink className="h-3 w-3" />
                                      {tReg('action_verify')}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="overflow-x-auto rounded-2xl border border-white/10">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="bg-white/[0.05]">
                                  {['column_name', 'column_certification', 'column_country', 'column_status', 'column_expiry', ''].map((k, i) => (
                                    <th key={i} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">{k ? tReg(k) : ''}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {pageResults.map((p) => (
                                  <tr key={p.id} className="border-t border-white/10 transition-colors hover:bg-white/[0.04]">
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-pmi-cyan/20 text-xs font-semibold text-pmi-cyan">{p.name.charAt(0)}</span>
                                        <div>
                                          <div className="text-sm font-semibold">{p.name}</div>
                                          <div className="text-[11px] text-white/45">{p.company}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex flex-wrap gap-1">
                                        {p.certifications.map((c) => <span key={c} className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">{c}</span>)}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-white/75">{p.country}</td>
                                    <td className="px-4 py-3"><StatusBadge status={p.status} locale={locale} /></td>
                                    <td className="px-4 py-3 font-mono text-sm text-white/55">{p.expiryDate}</td>
                                    <td className="px-4 py-3">
                                      {p.qrCode && (
                                        <Link href={getLink(`/certificate/${p.qrCode}`)} className="inline-flex items-center gap-1 text-xs font-semibold text-pmi-cyan hover:underline">
                                          <ExternalLink className="h-3.5 w-3.5" />
                                          {tReg('action_verify')}
                                        </Link>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-14 text-center">
                        <motion.div animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                          <Search className="mx-auto mb-4 h-14 w-14 text-white/20" />
                        </motion.div>
                        <h3 className="font-display text-xl font-semibold">{tReg('no_results')}</h3>
                        <p className="mx-auto mt-2 max-w-md text-sm text-white/50">{tReg('no_results_desc')}</p>
                        <button onClick={clearFilters} className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-pmi-dark transition-colors hover:bg-white/90">
                          <X className="h-4 w-4" />
                          {tReg('clear_filters')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                      <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button key={p} onClick={() => setCurrentPage(p)} className={`h-10 w-10 rounded-full text-sm font-semibold transition-colors ${currentPage === p ? 'bg-white text-pmi-dark' : 'border border-white/20 hover:bg-white/10'}`}>
                          {p}
                        </button>
                      ))}
                      <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ 4. CARACTERÍSTICAS · filas ═══════════════════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{tReg('features_eyebrow')}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{tReg('features_title')}</h2>
            </div>
          </motion.div>
          <ul className="border-t border-pmi-dark/15 lg:col-span-7">
            {[
              { icon: UserCheck, title: tReg('feature_voluntary_title'), desc: tReg('feature_voluntary_desc') },
              { icon: Monitor, title: tReg('feature_online_title'), desc: tReg('feature_online_desc') },
              { icon: FileCheck, title: tReg('feature_standards_title'), desc: tReg('feature_standards_desc') },
              { icon: Globe, title: tReg('feature_community_title'), desc: tReg('feature_community_desc') },
            ].map((f, i) => (
              <motion.li key={i} {...reveal} transition={{ duration: 0.5, delay: i * 0.06 }} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-pmi-dark/15 py-8 sm:grid-cols-[4rem_1fr]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-pmi-cream text-pmi-dark transition-colors duration-300 group-hover:bg-pmi-dark group-hover:text-white">
                  <f.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-pmi-dark">{f.title}</h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-pmi-dark/65">{f.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 5. INFORMACIÓN · acordeón ════════════════════════════════ */}
      <section className="bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{tReg('details_eyebrow')}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{tReg('details_title')}</h2>
            </div>
          </motion.div>
          <ul className="border-t border-pmi-dark/15 lg:col-span-8">
            {infoItems.map((item, idx) => (
              <InfoAccordionItem key={idx} item={item} />
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ 6. ESTADÍSTICAS ══════════════════════════════════════════ */}
      <section className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{tReg('stats_eyebrow')}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{tReg('stats_title')}</h2>
          </motion.div>
          <dl className="mt-14 grid grid-cols-2 border-t border-pmi-dark/15 lg:grid-cols-4">
            {[
              { value: `${stats.total}`, label: tReg('stats_professionals') },
              { value: `${stats.active}`, label: tReg('stats_active') },
              { value: `${stats.countries}`, label: tReg('stats_countries') },
              { value: '500+', label: tReg('stats_verified') },
            ].map((s, i) => (
              <motion.div key={i} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }} className="border-b border-pmi-dark/15 py-10 pr-4 lg:border-b-0 lg:border-r lg:pl-8 lg:first:pl-0 lg:last:border-r-0">
                <dd className="font-display text-5xl font-semibold tracking-tight text-pmi-dark lg:text-6xl"><CountUp value={s.value} /></dd>
                <dt className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-pmi-dark/50">{s.label}</dt>
              </motion.div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══ 7. CTA FINAL ═════════════════════════════════════════════ */}
      <section className="bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">{tReg('cta_title')}</h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{tReg('cta_desc')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Link href={getLink('/certifications')} className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black">
                {tReg('cta_view_certifications')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold transition-colors hover:bg-pmi-dark/10">
                {tReg('cta_contact')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
