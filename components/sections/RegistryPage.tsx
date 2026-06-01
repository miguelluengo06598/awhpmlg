'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Search,
  CheckCircle2,
  Globe,
  Star,
  Shield,
  Award,
  Users,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Database,
  Eye,
  FileCheck,
  UserCheck,
  Monitor,
  Lock,
  RefreshCw,
  BadgeCheck,
  GraduationCap,
  TrendingUp,
  BarChart3,
  MessageSquare,
  Calendar,
  ClipboardList,
  Layers,
  HardHat,
  QrCode,
  ScanLine,
  Camera,
  CameraOff,
  Hash,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';
import { validateQRCode } from '@/lib/qrGenerator';

interface Props {
  locale: 'es' | 'en';
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
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-xl border border-[#ddd]/60 bg-white overflow-hidden shadow-sm"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f9fbff]/50 transition-colors">
        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC]">{item.icon}</span>
        <span className="font-bold text-[#333] flex-1">{item.title}</span>
        <span className={`w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#0066CC] border-[#0066CC] text-white' : 'text-[#333]/40'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-6 pl-[4.5rem] text-[#333]/80 leading-relaxed">{item.content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const mockProfessionals: Professional[] = [
  { id: 1, name: 'Juan García López', email: 'juan@example.com', certifications: ['Information Delivery Manager'], country: 'España', company: 'BuildTech Solutions', status: 'Activa', obtainedDate: '2023-05-15', expiryDate: '2026-05-15', certificateNumber: 'IDM-2023-001**', isPublic: true, qrCode: 'IDM-2024-ABC123XYZ789' },
  { id: 2, name: 'María López Pérez', email: 'maria@example.com', certifications: ['BIM Design Manager', 'Information Delivery Manager'], country: 'España', company: 'DesignBIM', status: 'Activa', obtainedDate: '2022-08-20', expiryDate: '2025-08-20', certificateNumber: 'BDM-2022-042**', isPublic: true, qrCode: 'BDM-2024-DEF456ABC012' },
  { id: 3, name: 'Robert Smith', email: 'robert@example.com', certifications: ['BIM Construction Manager'], country: 'UK', company: 'Construct UK Ltd', status: 'Activa', obtainedDate: '2023-01-10', expiryDate: '2026-01-10', certificateNumber: 'BCM-2023-015**', isPublic: false, qrCode: 'BCM-2024-GHI789DEF345' },
  { id: 4, name: 'Ana Martínez Ruiz', email: 'ana@example.com', certifications: ['Information Delivery Manager'], country: 'México', company: 'BIM México', status: 'Por Renovar', obtainedDate: '2021-03-12', expiryDate: '2024-03-12', certificateNumber: 'IDM-2021-089**', isPublic: true, qrCode: 'IDM-2024-JKL012GHI678' },
  { id: 5, name: 'David Chen', email: 'david@example.com', certifications: ['BIM Design Manager'], country: 'USA', company: 'NYC Design Group', status: 'Activa', obtainedDate: '2023-09-05', expiryDate: '2026-09-05', certificateNumber: 'BDM-2023-067**', isPublic: true, qrCode: 'BDM-2024-MNO345JKL901' },
  { id: 6, name: 'Laura Fernández', email: 'laura@example.com', certifications: ['BIM Construction Manager', 'BIM Design Manager'], country: 'España', company: 'ObraBIM', status: 'Activa', obtainedDate: '2022-11-30', expiryDate: '2025-11-30', certificateNumber: 'BCM-2022-033**', isPublic: true, qrCode: 'BCM-2024-PQR678MNO234' },
  { id: 7, name: 'Michael Johnson', email: 'michael@example.com', certifications: ['Information Delivery Manager'], country: 'USA', company: 'DigitalBuild Corp', status: 'Vencida', obtainedDate: '2020-06-18', expiryDate: '2023-06-18', certificateNumber: 'IDM-2020-112**', isPublic: true, qrCode: 'IDM-2024-STU901PQR567' },
  { id: 8, name: 'Sofía Gómez', email: 'sofia@example.com', certifications: ['BIM Design Manager'], country: 'Colombia', company: 'ArquiBIM', status: 'Activa', obtainedDate: '2023-04-22', expiryDate: '2026-04-22', certificateNumber: 'BDM-2023-055**', isPublic: true, qrCode: 'BDM-2024-VWX234STU890' },
  { id: 9, name: 'James Wilson', email: 'james@example.com', certifications: ['BIM Construction Manager'], country: 'UK', company: 'BuildRight', status: 'Por Renovar', obtainedDate: '2021-07-08', expiryDate: '2024-07-08', certificateNumber: 'BCM-2021-078**', isPublic: false, qrCode: 'BCM-2024-YZA567VWX123' },
  { id: 10, name: 'Carlos Ruiz', email: 'carlos@example.com', certifications: ['Information Delivery Manager', 'BIM Design Manager'], country: 'España', company: 'Ingeconsult SA', status: 'Activa', obtainedDate: '2023-02-14', expiryDate: '2026-02-14', certificateNumber: 'IDM-2023-023**', isPublic: true, qrCode: 'IDM-2024-BCD890YZA456' },
  { id: 11, name: 'Emma Thompson', email: 'emma@example.com', certifications: ['BIM Construction Manager'], country: 'UK', company: 'GlobalBuild', status: 'Activa', obtainedDate: '2022-12-01', expiryDate: '2025-12-01', certificateNumber: 'BCM-2022-041**', isPublic: true, qrCode: 'BCM-2024-EFG123BCD789' },
  { id: 12, name: 'Pedro Sánchez', email: 'pedro@example.com', certifications: ['BIM Design Manager'], country: 'Chile', company: 'BIM Sur', status: 'Activa', obtainedDate: '2023-06-10', expiryDate: '2026-06-10', certificateNumber: 'BDM-2023-071**', isPublic: true, qrCode: 'BDM-2024-HIJ456EFG012' },
];

function StatusBadge({ status, locale }: { status: Professional['status']; locale: 'es' | 'en' }) {
  const styles: Record<string, string> = {
    Activa: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Por Renovar': 'bg-amber-100 text-amber-700 border-amber-200',
    'Due for Renewal': 'bg-amber-100 text-amber-700 border-amber-200',
    Vencida: 'bg-red-100 text-red-700 border-red-200',
    Expired: 'bg-red-100 text-red-700 border-red-200',
  };
  const labels: Record<string, string> = {
    Activa: locale === 'es' ? 'Activa' : 'Active',
    Active: locale === 'es' ? 'Activa' : 'Active',
    'Por Renovar': locale === 'es' ? 'Por Renovar' : 'Due for Renewal',
    'Due for Renewal': locale === 'es' ? 'Por Renovar' : 'Due for Renewal',
    Vencida: locale === 'es' ? 'Vencida' : 'Expired',
    Expired: locale === 'es' ? 'Vencida' : 'Expired',
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

  const isEs = locale === 'es';
  const tReg = (key: string) => (t as any).registry?.[key] ?? key;

  const statuses = isEs
    ? { all: 'Todos', active: 'Activa', due: 'Por Renovar', expired: 'Vencida' }
    : { all: 'All', active: 'Active', due: 'Due for Renewal', expired: 'Expired' };

  const certOptions = [
    { value: 'all', label: isEs ? 'Todas' : 'All' },
    { value: 'Information Delivery Manager', label: 'Information Delivery Manager' },
    { value: 'BIM Design Manager', label: 'BIM Design Manager' },
    { value: 'BIM Construction Manager', label: 'BIM Construction Manager' },
  ];

  const countryOptions = [
    { value: 'all', label: isEs ? 'Todos' : 'All' },
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
  const publicProfessionals = useMemo(() => mockProfessionals.filter((p) => p.isPublic), []);

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
      setQrError(isEs ? 'Introduce un código' : 'Enter a code');
      return;
    }
    if (!validateQRCode(code)) {
      setQrError(isEs ? 'Formato inválido. Ejemplo: IDM-2024-ABC123XYZ789' : 'Invalid format. Example: IDM-2024-ABC123XYZ789');
      return;
    }
    setQrError('');
    router.push(`/certificate/${code}`);
  }, [qrInput, router, isEs]);

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

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#004d99] via-[#0066CC] to-[#4A9EFF]" />
        <div className="absolute inset-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="reg-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#reg-grid)" />
          </svg>
        </div>
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="hidden xl:flex absolute right-16 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 items-center justify-center">
          <Database className="w-28 h-28 text-white/20" />
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-center max-w-4xl mx-auto">
            <motion.span variants={fadeInUp} className="inline-block px-5 py-2 rounded-full bg-white/15 text-white text-sm font-semibold mb-8 border border-white/20 backdrop-blur-sm">
              {isEs ? 'Transparencia Profesional' : 'Professional Transparency'}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {tReg('hero_title')}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl lg:text-3xl font-medium mb-4 text-white/90">
              {tReg('hero_subtitle')}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-white/75 max-w-3xl mx-auto mb-12 leading-relaxed">
              {isEs
                ? 'Verifica la vigencia de certificaciones mediante código QR o busca profesionales certificados en todo el mundo.'
                : 'Verify certification validity via QR code or search for certified professionals worldwide.'}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button onClick={scrollToSearch} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-white text-[#0066CC] px-10 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                <Search className="w-5 h-5" />
                {isEs ? 'Verificar o Buscar' : 'Verify or Search'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. ¿QUÉ ES EL REGISTRO? ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Información' : 'Information'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#333]">
              {isEs ? '¿Qué es el Registro?' : 'What is the Registry?'}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <QrCode className="w-14 h-14" />,
                title: isEs ? 'Verificación por QR' : 'QR Verification',
                desc: isEs
                  ? 'Escanea un código QR o introduce un código manual para verificar instantáneamente la autenticidad de una certificación.'
                  : 'Scan a QR code or enter a manual code to instantly verify the authenticity of a certification.',
              },
              {
                icon: <Search className="w-14 h-14" />,
                title: isEs ? 'Búsqueda Pública' : 'Public Search',
                desc: isEs
                  ? 'Encuentra profesionales certificados que han optado por aparecer públicamente en nuestro directorio internacional.'
                  : 'Find certified professionals who have chosen to appear publicly in our international directory.',
              },
              {
                icon: <Star className="w-14 h-14" />,
                title: isEs ? 'Reconocimiento Profesional' : 'Professional Recognition',
                desc: isEs
                  ? 'Refuerza el reconocimiento profesional y visibilidad de especialistas BIM certificados internacionalmente.'
                  : 'Reinforces professional recognition and visibility of internationally certified BIM specialists.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white border border-[#ddd] shadow-sm hover:-translate-y-[5px] hover:shadow-xl transition-all duration-300"
              >
                <div className="w-[100px] h-[100px] rounded-2xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333] mb-3">{card.title}</h3>
                <p className="text-[#333]/80 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. TABS: VERIFY / SEARCH ===== */}
      <section ref={searchRef} className="py-24 bg-[#f9fbff]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-12">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Verificación' : 'Verification'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Verifica o Busca Certificaciones' : 'Verify or Search Certifications'}
            </motion.h2>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center mb-10">
            <div className="inline-flex bg-white rounded-xl p-1.5 border border-[#ddd] shadow-sm">
              <button
                onClick={() => setActiveTab('verify')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'verify' ? 'bg-[#0066CC] text-white shadow-md' : 'text-[#333]/70 hover:text-[#333] hover:bg-[#f9fbff]'}`}
              >
                <QrCode className="w-4 h-4" />
                {tReg('tab_verify')}
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold transition-all ${activeTab === 'search' ? 'bg-[#0066CC] text-white shadow-md' : 'text-[#333]/70 hover:text-[#333] hover:bg-[#f9fbff]'}`}
              >
                <Search className="w-4 h-4" />
                {tReg('tab_search')}
              </button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'verify' ? (
              <motion.div
                key="verify"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#eee] p-8 sm:p-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#f0f4ff] flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-8 h-8 text-[#0066CC]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B0F1C] mb-2">{tReg('verify_title')}</h3>
                    <p className="text-sm text-[#333]/60">{tReg('verify_desc')}</p>
                  </div>

                  {/* QR Input */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0066CC]">
                        <Hash className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={qrInput}
                        onChange={(e) => { setQrInput(e.target.value); setQrError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleVerifyQR()}
                        placeholder={tReg('verify_input_placeholder')}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-[#ddd] text-lg text-[#333] placeholder:text-[#333]/40 focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] transition-all shadow-sm uppercase"
                      />
                    </div>

                    {qrError && (
                      <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                        <X className="w-4 h-4 shrink-0" />
                        {qrError}
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleVerifyQR}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#0066CC] text-white font-semibold hover:bg-[#0055aa] transition-colors shadow-md"
                      >
                        <Search className="w-5 h-5" />
                        {tReg('verify_button')}
                      </button>
                      <button
                        onClick={isScanning ? handleStopScan : handleStartScan}
                        className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-[#ddd] text-[#333] font-semibold hover:bg-[#f9fbff] transition-colors"
                      >
                        {isScanning ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
                        {isScanning ? tReg('verify_stop_scan') : tReg('verify_scan')}
                      </button>
                    </div>

                    {/* Scanner simulation area */}
                    {isScanning && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl border-2 border-dashed border-[#0066CC]/30 bg-[#f0f4ff]/50 p-8 text-center"
                      >
                        <ScanLine className="w-12 h-12 text-[#0066CC]/40 mx-auto mb-3 animate-pulse" />
                        <p className="text-sm text-[#333]/60 font-medium">{tReg('verify_camera_hint')}</p>
                        <p className="text-xs text-[#333]/40 mt-1">{tReg('verify_camera_off')}</p>
                      </motion.div>
                    )}

                    {/* Example QR codes for demo */}
                    <div className="pt-4 border-t border-[#eee]">
                      <p className="text-xs text-[#333]/50 font-medium uppercase tracking-wider mb-3">{isEs ? 'Códigos de ejemplo' : 'Example codes'}</p>
                      <div className="flex flex-wrap gap-2">
                        {['IDM-2024-ABC123XYZ789', 'BDM-2024-DEF456ABC012', 'BCM-2024-GHI789DEF345'].map((code) => (
                          <button
                            key={code}
                            onClick={() => { setQrInput(code); setQrError(''); }}
                            className="px-3 py-1.5 rounded-lg bg-[#f9fbff] border border-[#ddd] text-xs font-mono text-[#333]/70 hover:border-[#0066CC] hover:text-[#0066CC] transition-colors"
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
              <motion.div
                key="search"
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#eee] p-8 sm:p-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#f0f4ff] flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-[#0066CC]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0B0F1C] mb-2">{tReg('search_title')}</h3>
                    <p className="text-sm text-[#333]/60">{tReg('search_desc')}</p>
                  </div>

                  {/* Search bar */}
                  <div className="relative mb-6">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0066CC]">
                      <Search className="w-6 h-6" />
                    </div>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                      placeholder={tReg('search_input_placeholder')}
                      className="w-full pl-14 pr-4 py-4 rounded-xl border border-[#ddd] text-lg text-[#333] placeholder:text-[#333]/40 focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] transition-all shadow-sm"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col md:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                      <select
                        value={certFilter}
                        onChange={(e) => { setCertFilter(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-3 rounded-xl border border-[#ddd] text-[#333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] appearance-none cursor-pointer"
                      >
                        {certOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                      <select
                        value={countryFilter}
                        onChange={(e) => { setCountryFilter(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-3 rounded-xl border border-[#ddd] text-[#333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] appearance-none cursor-pointer"
                      >
                        {countryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                      <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        className="w-full px-4 py-3 rounded-xl border border-[#ddd] text-[#333] bg-white focus:outline-none focus:ring-2 focus:ring-[#0066CC]/30 focus:border-[#0066CC] appearance-none cursor-pointer"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#333]/40 pointer-events-none" />
                    </div>
                    {hasFilters && (
                      <button
                        onClick={clearFilters}
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-[#ddd] text-[#333] hover:bg-[#f9fbff] transition-colors font-medium"
                      >
                        <X className="w-4 h-4" />
                        {isEs ? 'Limpiar' : 'Clear'}
                      </button>
                    )}
                  </div>

                  {/* View toggle + results count */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-[#333]/60">
                      {filtered.length} {filtered.length === 1 ? tReg('results_count') : tReg('results_count_plural')}
                    </p>
                    <div className="flex items-center gap-2 bg-[#f9fbff] rounded-lg p-1 border border-[#ddd]/40">
                      <button onClick={() => setViewMode('cards')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'cards' ? 'bg-white text-[#0066CC] shadow-sm' : 'text-[#333]/60 hover:text-[#333]'}`}>
                        {tReg('view_card')}
                      </button>
                      <button onClick={() => setViewMode('table')} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'table' ? 'bg-white text-[#0066CC] shadow-sm' : 'text-[#333]/60 hover:text-[#333]'}`}>
                        {tReg('view_table')}
                      </button>
                    </div>
                  </div>

                  {/* Results */}
                  <AnimatePresence mode="wait">
                    {pageResults.length > 0 ? (
                      <motion.div
                        key={`${viewMode}-${currentPage}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                      >
                        {viewMode === 'cards' ? (
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {pageResults.map((p) => (
                              <div key={p.id} className="group p-5 rounded-xl bg-white border border-[#ddd]/60 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4A9EFF] flex items-center justify-center text-white font-bold text-lg">
                                    {p.name.charAt(0)}
                                  </div>
                                  <StatusBadge status={p.status} locale={locale} />
                                </div>
                                <h3 className="font-bold text-[#333] mb-1 truncate">{p.name}</h3>
                                <p className="text-xs text-[#333]/50 mb-3">{p.company} — {p.country}</p>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                  {p.certifications.map((c) => (
                                    <span key={c} className="px-2 py-0.5 rounded-md bg-[#f0f4ff] text-[#0066CC] text-[11px] font-semibold">
                                      {c}
                                    </span>
                                  ))}
                                </div>
                                <div className="text-xs text-[#333]/50 space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" />
                                    {isEs ? 'Obt.' : 'Obt.'} {p.obtainedDate}
                                  </div>
                                  <div className="flex items-center gap-1.5">
                                    <RefreshCw className="w-3 h-3" />
                                    {isEs ? 'Venc.' : 'Exp.'} {p.expiryDate}
                                  </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-[#ddd]/40 flex items-center justify-between">
                                  <p className="text-[10px] text-[#333]/40 font-mono">{p.certificateNumber}</p>
                                  {p.qrCode && (
                                    <Link
                                      href={`/certificate/${p.qrCode}`}
                                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0066CC] hover:underline"
                                    >
                                      <ExternalLink className="w-3 h-3" />
                                      {tReg('action_verify')}
                                    </Link>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="overflow-x-auto rounded-xl border border-[#ddd]/60">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="bg-[#f9fbff]">
                                  <th className="px-4 py-3 text-xs font-bold text-[#333]/60 uppercase tracking-wider">{tReg('column_name')}</th>
                                  <th className="px-4 py-3 text-xs font-bold text-[#333]/60 uppercase tracking-wider">{tReg('column_certification')}</th>
                                  <th className="px-4 py-3 text-xs font-bold text-[#333]/60 uppercase tracking-wider">{tReg('column_country')}</th>
                                  <th className="px-4 py-3 text-xs font-bold text-[#333]/60 uppercase tracking-wider">{tReg('column_status')}</th>
                                  <th className="px-4 py-3 text-xs font-bold text-[#333]/60 uppercase tracking-wider">{tReg('column_expiry')}</th>
                                  <th className="px-4 py-3 text-xs font-bold text-[#333]/60 uppercase tracking-wider"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {pageResults.map((p, idx) => (
                                  <tr key={p.id} className={`border-b border-[#ddd]/30 hover:bg-[#f9fbff]/50 transition-colors ${idx % 2 === 1 ? 'bg-[#f9fbff]/30' : 'bg-white'}`}>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4A9EFF] flex items-center justify-center text-white font-bold text-xs shrink-0">
                                          {p.name.charAt(0)}
                                        </div>
                                        <div>
                                          <div className="font-semibold text-[#333] text-sm">{p.name}</div>
                                          <div className="text-[11px] text-[#333]/50">{p.company}</div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex flex-wrap gap-1">
                                        {p.certifications.map((c) => (
                                          <span key={c} className="px-2 py-0.5 rounded-md bg-[#f0f4ff] text-[#0066CC] text-[11px] font-semibold">{c}</span>
                                        ))}
                                      </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-[#333]/80">{p.country}</td>
                                    <td className="px-4 py-3"><StatusBadge status={p.status} locale={locale} /></td>
                                    <td className="px-4 py-3 text-sm text-[#333]/60 font-mono">{p.expiryDate}</td>
                                    <td className="px-4 py-3">
                                      {p.qrCode && (
                                        <Link
                                          href={`/certificate/${p.qrCode}`}
                                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0066CC] hover:underline"
                                        >
                                          <ExternalLink className="w-3.5 h-3.5" />
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
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                        <Search className="w-16 h-16 text-[#ddd] mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-[#333] mb-2">{tReg('no_results')}</h3>
                        <p className="text-[#333]/60 mb-6">{tReg('no_results_desc')}</p>
                        <button onClick={clearFilters} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0066CC] text-white font-semibold hover:bg-[#0055aa] transition-colors">
                          <X className="w-4 h-4" />
                          {isEs ? 'Limpiar filtros' : 'Clear filters'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 rounded-lg border border-[#ddd] flex items-center justify-center text-[#333] hover:bg-[#f9fbff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => setCurrentPage(p)}
                          className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${currentPage === p ? 'bg-[#0066CC] text-white' : 'border border-[#ddd] text-[#333] hover:bg-[#f9fbff]'}`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 rounded-lg border border-[#ddd] flex items-center justify-center text-[#333] hover:bg-[#f9fbff] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== 4. CARACTERÍSTICAS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Ventajas' : 'Advantages'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Características del Registro' : 'Registry Features'}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <UserCheck className="w-10 h-10" />,
                title: isEs ? 'Inclusión Voluntaria' : 'Voluntary Inclusion',
                desc: isEs ? 'La participación es voluntaria y refuerza el reconocimiento profesional en el mercado.' : 'Participation is voluntary and reinforces professional recognition in the market.',
              },
              {
                icon: <Monitor className="w-10 h-10" />,
                title: isEs ? 'Verificación en Línea' : 'Online Verification',
                desc: isEs ? 'Búsqueda fácil y acceso inmediato al estado de certificaciones de profesionales.' : 'Easy search and immediate access to the certification status of professionals.',
              },
              {
                icon: <FileCheck className="w-10 h-10" />,
                title: isEs ? 'Estándares AECOMI' : 'AECOMI Standards',
                desc: isEs ? 'Solo profesionales que cumplen estándares internacionales aparecen en el directorio.' : 'Only professionals who meet international standards appear in the directory.',
              },
              {
                icon: <Globe className="w-10 h-10" />,
                title: isEs ? 'Comunidad Internacional' : 'International Community',
                desc: isEs ? 'Acceso a profesionales certificados en todo el mundo, con cobertura global.' : 'Access to certified professionals worldwide, with global coverage.',
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-6 rounded-xl bg-white border border-[#ddd]/50 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] mb-4 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#333] text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-[#333]/70 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. INFORMACIÓN ADICIONAL (Accordion) ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-12">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Detalles' : 'Details'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Información Importante' : 'Important Information'}
            </motion.h2>
          </motion.div>
          <div className="space-y-4">
            {[
              {
                icon: <UserCheck className="w-5 h-5" />,
                title: isEs ? '¿Cómo aparecer en el Registro?' : 'How to appear in the Registry?',
                content: (
                  <div className="space-y-3">
                    <p>{isEs ? 'La inclusión en el Registro de Certificaciones es completamente voluntaria. Los profesionales certificados pueden optar por aparecer en el directorio público desde su dashboard de cliente.' : 'Inclusion in the Certification Registry is completely voluntary. Certified professionals can choose to appear in the public directory from their client dashboard.'}</p>
                    <Link href={getLink('/certifications')} className="inline-flex items-center gap-2 text-[#0066CC] font-semibold hover:underline">
                      {isEs ? 'Obtener certificación' : 'Get certified'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ),
              },
              {
                icon: <Lock className="w-5 h-5" />,
                title: isEs ? 'Privacidad y Protección de Datos' : 'Privacy & Data Protection',
                content: (
                  <div className="space-y-3">
                    <p>{isEs ? 'AECOMI cumple con el Reglamento General de Protección de Datos (GDPR). La información mostrada es limitada y el número de certificado se muestra parcialmente por seguridad. Los profesionales pueden solicitar la eliminación de sus datos en cualquier momento.' : 'AECOMI complies with the General Data Protection Regulation (GDPR). The displayed information is limited and the certificate number is partially shown for security. Professionals can request deletion of their data at any time.'}</p>
                  </div>
                ),
              },
              {
                icon: <BadgeCheck className="w-5 h-5" />,
                title: isEs ? 'Verificación de Certificados' : 'Certificate Verification',
                content: (
                  <div className="space-y-3">
                    <p>{isEs ? 'Para verificar que un certificado es auténtico, escanea el código QR, introduce el código manual, o busca al profesional en este registro.' : 'To verify that a certificate is authentic, scan the QR code, enter the manual code, or search for the professional in this registry.'}</p>
                    <Link href={getLink('/contact')} className="inline-flex items-center gap-2 text-[#0066CC] font-semibold hover:underline">
                      {isEs ? 'Contacta con nosotros' : 'Contact us'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ),
              },
              {
                icon: <RefreshCw className="w-5 h-5" />,
                title: isEs ? 'Actualizar Datos' : 'Update Data',
                content: (
                  <div className="space-y-3">
                    <p>{isEs ? 'Los profesionales certificados pueden solicitar actualizar sus datos de contacto, empresa o país de residencia desde su dashboard de cliente.' : 'Certified professionals can request to update their contact details, company or country of residence from their client dashboard.'}</p>
                  </div>
                ),
              },
            ].map((item, idx) => (
              <InfoAccordionItem key={idx} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. ESTADÍSTICAS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Números' : 'Numbers'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Estadísticas del Registro' : 'Registry Statistics'}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-10 h-10" />, value: `${stats.total}`, label: tReg('stats_professionals'), color: 'from-[#0066CC] to-[#4A9EFF]' },
              { icon: <BadgeCheck className="w-10 h-10" />, value: `${stats.active}`, label: tReg('stats_active'), color: 'from-emerald-500 to-teal-500' },
              { icon: <Globe className="w-10 h-10" />, value: `${stats.countries}`, label: tReg('stats_countries'), color: 'from-violet-500 to-purple-500' },
              { icon: <Shield className="w-10 h-10" />, value: '500+', label: tReg('stats_verified'), color: 'from-amber-500 to-orange-500' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white border border-[#ddd]/40 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold text-[#333] mb-2">{stat.value}</div>
                <div className="text-sm text-[#333]/60 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. CTA FINAL ===== */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#0066CC] via-[#0055aa] to-[#004d99]">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-reg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-reg-grid)" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
              {isEs ? '¿No estás en el Registro?' : 'Not in the Registry?'}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              {isEs ? 'Obtén tu certificación AECOMI y únete al directorio de profesionales BIM de clase mundial.' : 'Get your AECOMI certification and join the directory of world-class BIM professionals.'}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLink('/certifications')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl bg-white text-[#0066CC] px-10 py-4 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                {isEs ? 'Ver Certificaciones' : 'View Certifications'} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-3 text-lg font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 px-10 py-4 transition-all duration-300 hover:-translate-y-1">
                {isEs ? 'Contacta con Nosotros' : 'Contact Us'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
