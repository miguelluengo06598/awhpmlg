'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import {
  Award,
  Download,
  Share2,
  Copy,
  CheckCircle2,
  Printer,
  Shield,
  AlertTriangle,
  AlertCircle,
  QrCode,
  Hash,
  Eye,
  EyeOff,
  Calendar,
  FileCheck,
  ChevronRight,
  Clock,
  ExternalLink,
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

interface UserCertification {
  id: string;
  certificationType: CertificationType;
  professionalName: string;
  qrCode: string;
  certificateNumber: string;
  obtainedDate: string;
  expiryDate: string;
  status: 'active' | 'due' | 'expired';
  isPublic: boolean;
}

interface HistoryItem {
  id: string;
  action: 'download' | 'share' | 'privacy';
  date: string;
  details?: string;
}

export default function ClientCertificatePage() {
  const { t, getLink } = useTranslation('es');
  const [cert, setCert] = useState<UserCertification | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const tDash = (key: string) => (t as any).dashboardCertificate?.[key] ?? key;

  const handleTogglePrivacy = useCallback(() => {
    if (!cert) return;
    setCert({ ...cert, isPublic: !cert.isPublic });
    // TODO: Update in Supabase
    // await supabase.from('certifications_applications')
    //   .update({ is_public_listed: !cert.isPublic })
    //   .eq('qr_code', cert.qrCode);
  }, [cert]);

  const handleCopyCode = useCallback(() => {
    if (!cert) return;
    navigator.clipboard.writeText(cert.qrCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }, [cert]);

  const handleCopyLink = useCallback(() => {
    if (!cert) return;
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/certificate/${cert.qrCode}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }, [cert]);

  const handleDownloadPDF = useCallback(() => {
    if (!cert) return;
    downloadCertificatePDF({
      professionalName: cert.professionalName,
      certificationType: cert.certificationType,
      qrCode: cert.qrCode,
      certificateNumber: cert.certificateNumber,
      obtainedDate: cert.obtainedDate,
      expiryDate: cert.expiryDate,
      verificationUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/certificate/${cert.qrCode}`,
    });
  }, [cert]);

  const handleDownloadQR = useCallback(() => {
    const svg = document.querySelector('#cert-qr-code svg');
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const link = document.createElement('a');
      link.download = `AECOMI-QR-${cert?.qrCode}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  }, [cert]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const currentStatus = cert ? getCertificateStatus(cert.expiryDate) : 'active';
  const statusInfo = cert ? getStatusInfo(currentStatus, 'es') : getStatusInfo('active', 'es');
  const colors = cert ? getCertificationColors(cert.certificationType) : getCertificationColors('IDM');

  if (!cert) {
    return (
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold text-pmi-dark">{tDash('title')}</h1>
          <p className="text-sm text-gray-500 mt-1">{tDash('subtitle')}</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white p-10 rounded-2xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-pmi-dark mb-2">{tDash('no_cert_title')}</h3>
          <p className="text-sm text-gray-500 max-w-sm mb-6">{tDash('no_cert_desc')}</p>
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pmi-dark text-white text-sm font-medium rounded-xl hover:bg-pmi-blue transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
            {tDash('no_cert_cta')}
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-pmi-dark">{tDash('title')}</h1>
        <p className="text-sm text-gray-500 mt-1">{tDash('subtitle')}</p>
      </div>

      {currentStatus === 'due' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">{tDash('expiry_warning')}</p>
        </motion.div>
      )}
      {currentStatus === 'expired' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{tDash('expired_alert')}</p>
        </motion.div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primaryLight }}>
                  <Award className="w-5 h-5" style={{ color: colors.primary }} />
                </div>
                <div>
                  <h3 className="font-bold text-pmi-dark text-sm">{getCertificationName(cert.certificationType, 'es')}</h3>
                  <p className="text-xs text-gray-400 font-mono">{cert.certificateNumber}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusInfo.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                {statusInfo.label}
              </span>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{tDash('obtained_label') || 'Obtención'}</div>
                  <div className="text-sm font-semibold text-pmi-dark flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    {cert.obtainedDate}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{tDash('expiry_label') || 'Vencimiento'}</div>
                  <div className="text-sm font-semibold text-pmi-dark flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {cert.expiryDate}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-gray-200 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{tDash('manual_code_title')}</span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 text-xs font-medium text-pmi-blue hover:text-pmi-dark transition-colors"
                  >
                    {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedCode ? tDash('copied') : tDash('copy_code')}
                  </button>
                </div>
                <div className="text-lg font-mono font-bold text-pmi-dark tracking-wide">{cert.qrCode}</div>
                <p className="text-xs text-gray-400 mt-1">{tDash('manual_code_desc')}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  {cert.isPublic ? <Eye className="w-5 h-5 text-purple-600" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                </div>
                <div>
                  <h3 className="font-bold text-pmi-dark text-sm">{tDash('privacy_title')}</h3>
                  <p className="text-xs text-gray-400">{tDash('privacy_desc')}</p>
                </div>
              </div>
              <button
                onClick={handleTogglePrivacy}
                className={`relative w-12 h-7 rounded-full transition-colors duration-300 ${cert.isPublic ? 'bg-purple-600' : 'bg-gray-200'}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-300 ${cert.isPublic ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            <div className={`p-4 rounded-xl transition-colors ${cert.isPublic ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50 border border-gray-100'}`}>
              <div className="flex items-start gap-3">
                {cert.isPublic ? (
                  <>
                    <Eye className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-purple-800">{tDash('privacy_public')}</div>
                      <p className="text-xs text-purple-600 mt-0.5">{tDash('privacy_public_desc')}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-gray-700">{tDash('privacy_private')}</div>
                      <p className="text-xs text-gray-500 mt-0.5">{tDash('privacy_private_desc')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
          >
            <h3 className="font-bold text-pmi-dark text-sm mb-4">{tDash('actions_title')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={handleDownloadPDF}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-pmi-blue hover:bg-pmi-cream/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-pmi-cream flex items-center justify-center group-hover:bg-pmi-blue transition-colors">
                  <Download className="w-5 h-5 text-pmi-blue group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">{tDash('download_pdf')}</span>
              </button>

              <button
                onClick={handleDownloadQR}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-pmi-blue hover:bg-pmi-cream/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-pmi-cream flex items-center justify-center group-hover:bg-pmi-blue transition-colors">
                  <QrCode className="w-5 h-5 text-pmi-blue group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">{tDash('download_qr')}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-pmi-blue hover:bg-pmi-cream/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-pmi-cream flex items-center justify-center group-hover:bg-pmi-blue transition-colors">
                  {copiedLink ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5 text-pmi-blue group-hover:text-white transition-colors" />}
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">{copiedLink ? tDash('copied') : tDash('share_cert')}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-pmi-blue hover:bg-pmi-cream/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-pmi-cream flex items-center justify-center group-hover:bg-pmi-blue transition-colors">
                  <Printer className="w-5 h-5 text-pmi-blue group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-medium text-gray-600 text-center">{tDash('print')}</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center"
          >
            <h3 className="font-bold text-pmi-dark text-sm mb-1">{tDash('qr_code_title')}</h3>
            <p className="text-xs text-gray-400 mb-5 text-center">{tDash('qr_code_desc')}</p>

            <div id="cert-qr-code" className="p-4 rounded-xl border border-gray-100 bg-white mb-4">
              <QRCodeSVG
                value={`${typeof window !== 'undefined' ? window.location.origin : ''}/certificate/${cert.qrCode}`}
                size={180}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: '/favicon.ico',
                  height: 28,
                  width: 28,
                  excavate: true,
                }}
              />
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{tDash('manual_code_title')}</div>
              <div className="text-sm font-mono font-bold text-pmi-dark">{cert.qrCode}</div>
            </div>

            <div className="w-full mt-5 pt-4 border-t border-gray-100">
              <Link
                href={`/certificate/${cert.qrCode}`}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                {tDash('verify_another') || 'Ver perfil público'}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-pmi-dark">{tDash('history_title')}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showHistory ? 'rotate-90' : ''}`} />
            </button>

            {showHistory && (
              <div className="px-6 pb-4">
                <p className="text-sm text-gray-400 py-2">Sin actividad reciente</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
