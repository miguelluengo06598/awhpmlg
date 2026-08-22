'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Download,
  Share2,
  Copy,
  ArrowLeft,
  Search,
  Award,
  Calendar,
  User,
  FileCheck,
  Hash,
  Globe,
  Printer,
  AlertTriangle,
} from 'lucide-react';
import {
  CertificationType,
  getCertificationColors,
  getCertificationName,
  getStatusInfo,
  getCertificateStatus,
} from '@/lib/qrGenerator';
import { downloadCertificatePDF } from '@/lib/pdfGenerator';
import { useTranslation } from '@/lib/useTranslation';

interface CertificateData {
  qrCode: string;
  certificationType: CertificationType;
  professionalName: string;
  obtainedDate: string;
  expiryDate: string;
  status: 'active' | 'due' | 'expired';
  certificateNumber: string;
  isPublic: boolean;
  country?: string;
  company?: string;
}

interface Props {
  qrCode: string;
  locale: 'es' | 'en' | 'pt';
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};


export default function CertificateVerifyPage({ qrCode, locale }: Props) {
  const router = useRouter();
  const { t, getLink } = useTranslation(locale);
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const tVerify = (key: string) => (t as any).certificateVerify?.[key] ?? key;

  useEffect(() => {
    const normalized = qrCode.trim().toUpperCase();
    const controller = new AbortController();

    fetch(`/api/certificate/${encodeURIComponent(normalized)}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => {
        if (json.valid && json.certificate) {
          const c = json.certificate;
          setCertificate({
            qrCode: normalized,
            certificationType: c.certificationType as CertificationType,
            professionalName: c.fullName,
            obtainedDate: c.issueDate,
            expiryDate: c.expiryDate ?? '',
            status: getCertificateStatus(c.expiryDate ?? new Date().toISOString()),
            certificateNumber: c.certificationCode,
            isPublic: true,
            company: c.organization ?? undefined,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setLoading(false);
      });

    return () => controller.abort();
  }, [qrCode]);

  const handleShare = useCallback(() => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/certificate/${qrCode}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [qrCode]);

  const handleDownloadPDF = useCallback(() => {
    if (!certificate) return;
    downloadCertificatePDF({
      professionalName: certificate.professionalName,
      certificationType: certificate.certificationType,
      qrCode: certificate.qrCode,
      certificateNumber: certificate.certificateNumber,
      obtainedDate: certificate.obtainedDate,
      expiryDate: certificate.expiryDate,
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/certificate/${qrCode}`,
    });
  }, [certificate, qrCode]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const colors = certificate ? getCertificationColors(certificate.certificationType) : getCertificationColors('IDM');
  const statusInfo = certificate ? getStatusInfo(certificate.status, locale) : getStatusInfo('active', locale);

  return (
    <div className="min-h-screen bg-[#f9fbff]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-white border-b border-[#eee]">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${colors.primary} 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
              style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
            >
              <Shield className="w-3.5 h-3.5" />
              {tVerify('hero_badge')}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F1C] mb-3">
              {tVerify('hero_title')}
            </h1>
            <p className="text-base sm:text-lg text-[#333]/70 max-w-xl mx-auto">
              {tVerify('hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <div className="w-12 h-12 border-4 border-[#ddd] border-t-[#0066CC] rounded-full animate-spin mb-4" />
              <p className="text-[#333]/60 text-sm">{locale === 'es' ? 'Verificando certificación...' : locale === 'pt' ? 'Verificando certificação...' : 'Verifying certification...'}</p>
            </motion.div>
          ) : certificate ? (
            <motion.div
              key="valid"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5 }}
            >
              {/* Certificate Card */}
              <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#eee] overflow-hidden">
                {/* Card Header */}
                <div className="relative px-6 sm:px-10 py-8" style={{ backgroundColor: colors.primary }}>
                  <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="80" cy="20" r="60" fill="white" />
                    </svg>
                  </div>
                  <div className="relative flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-white/80 text-xs font-medium uppercase tracking-wider">{tVerify('valid_badge')}</div>
                      <div className="text-white font-bold text-lg">{getCertificationName(certificate.certificationType, locale)}</div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 sm:px-10 py-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Info */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Professional Name */}
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: colors.primaryLight }}>
                          <User className="w-6 h-6" style={{ color: colors.primary }} />
                        </div>
                        <div>
                          <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider mb-0.5">{tVerify('professional_label')}</div>
                          <div className="text-xl font-bold text-[#0B0F1C]">{certificate.professionalName}</div>
                          {certificate.company && (
                            <div className="text-sm text-[#333]/60 mt-0.5">{certificate.company}</div>
                          )}
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f9fbff] border border-[#eee]">
                          <Award className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider">{tVerify('certification_label')}</div>
                            <div className="text-sm font-semibold text-[#0B0F1C] mt-0.5">{getCertificationName(certificate.certificationType, locale)}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f9fbff] border border-[#eee]">
                          <FileCheck className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider">{tVerify('status_label')}</div>
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${statusInfo.color}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                              {statusInfo.label}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f9fbff] border border-[#eee]">
                          <Calendar className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider">{tVerify('obtained_label')}</div>
                            <div className="text-sm font-semibold text-[#0B0F1C] mt-0.5">{certificate.obtainedDate}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f9fbff] border border-[#eee]">
                          <Calendar className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider">{tVerify('expiry_label')}</div>
                            <div className="text-sm font-semibold text-[#0B0F1C] mt-0.5">{certificate.expiryDate}</div>
                          </div>
                        </div>
                      </div>

                      {/* Certificate Number & Manual Code */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 p-4 rounded-xl border border-dashed border-[#ddd] bg-white">
                          <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider mb-1">{tVerify('certificate_number')}</div>
                          <div className="text-sm font-mono font-semibold text-[#0B0F1C]">{certificate.certificateNumber}</div>
                        </div>
                        <div className="flex-1 p-4 rounded-xl border border-dashed border-[#ddd] bg-white">
                          <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider mb-1">{tVerify('manual_code')}</div>
                          <div className="text-sm font-mono font-semibold text-[#0B0F1C]">{certificate.qrCode}</div>
                        </div>
                      </div>

                      {/* Privacy Notice */}
                      {!certificate.isPublic && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-amber-800">{tVerify('not_public')}</p>
                        </div>
                      )}
                    </div>

                    {/* Right: QR & Actions */}
                    <div className="space-y-6">
                      {/* QR Code */}
                      <div className="flex flex-col items-center p-6 rounded-xl border border-[#eee] bg-white">
                        <div className="mb-4">
                          <QRCodeSVG
                            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/certificate/${certificate.qrCode}`}
                            size={160}
                            level="H"
                            includeMargin={true}
                            imageSettings={{
                              src: '/favicon.ico',
                              height: 24,
                              width: 24,
                              excavate: true,
                            }}
                          />
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-[#333]/50 font-medium uppercase tracking-wider mb-1">{tVerify('manual_code')}</div>
                          <div className="text-sm font-mono font-bold text-[#0B0F1C]">{certificate.qrCode}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2.5">
                        <button
                          onClick={handleDownloadPDF}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <Download className="w-4 h-4" />
                          {tVerify('download_pdf')}
                        </button>

                        <button
                          onClick={handleShare}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-[#f9fbff]"
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          {copied ? tVerify('share_success') : tVerify('copy_link')}
                        </button>

                        <button
                          onClick={handlePrint}
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm border border-[#ddd] text-[#333] transition-all hover:bg-[#f9fbff]"
                        >
                          <Printer className="w-4 h-4" />
                          {locale === 'es' ? 'Imprimir' : locale === 'pt' ? 'Imprimir' : 'Print'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 sm:px-10 py-4 bg-[#f9fbff] border-t border-[#eee] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#333]/50">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{typeof window !== 'undefined' ? window.location.origin : ''}/certificate/{certificate.qrCode}</span>
                  </div>
                  <Link
                    href={getLink('/certifications/registro')}
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: colors.primary }}
                  >
                    <Search className="w-4 h-4" />
                    {tVerify('verify_another')}
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="invalid"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#0B0F1C] mb-2">{tVerify('invalid_title')}</h2>
              <p className="text-[#333]/60 max-w-md mx-auto mb-8">{tVerify('invalid_subtitle')}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={getLink('/certifications/registro')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0066CC] text-white font-semibold rounded-xl hover:bg-[#004d99] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  {tVerify('invalid_cta')}
                </Link>
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#ddd] text-[#333] font-semibold rounded-xl hover:bg-[#f9fbff] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {tVerify('invalid_back')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
