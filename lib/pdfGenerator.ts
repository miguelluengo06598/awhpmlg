/**
 * PDF Certificate Generator for AECMI
 * Uses jsPDF to generate professional certificate PDFs
 */

import { jsPDF } from 'jspdf';
import { CertificationType, getCertificationColors, getCertificationName } from './qrGenerator';

export interface CertificatePDFData {
  professionalName: string;
  certificationType: CertificationType;
  qrCode: string;
  certificateNumber: string;
  obtainedDate: string;
  expiryDate: string;
  verificationUrl: string;
}

/**
 * Generate a professional certificate PDF
 */
export async function generateCertificatePDF(data: CertificatePDFData): Promise<Blob> {
  const { professionalName, certificationType, qrCode, certificateNumber, obtainedDate, expiryDate, verificationUrl } = data;
  const colors = getCertificationColors(certificationType);
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;

  // Helper to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const primaryRgb = hexToRgb(colors.primary);
  const primaryDarkRgb = hexToRgb(colors.primaryDark);

  // === BACKGROUND ===
  // White background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top decorative band
  doc.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.rect(0, 0, pageWidth, 25, 'F');

  // Bottom decorative band
  doc.setFillColor(primaryDarkRgb.r, primaryDarkRgb.g, primaryDarkRgb.b);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');

  // Side accent lines
  doc.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setLineWidth(0.5);
  doc.line(margin, 35, margin, pageHeight - 25);
  doc.line(pageWidth - margin, 35, pageWidth - margin, pageHeight - 25);

  // === HEADER ===
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('AECMI — ASOCIACIÓN ESPAÑOLA DE CERTIFICACIÓN BIM', pageWidth / 2, 10, { align: 'center' });
  doc.setFontSize(8);
  doc.text('International BIM Certification Organization', pageWidth / 2, 16, { align: 'center' });

  // === TITLE ===
  doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('CERTIFICADO PROFESIONAL', pageWidth / 2, 50, { align: 'center' });

  // Subtitle
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text('Professional Certificate', pageWidth / 2, 57, { align: 'center' });

  // Decorative line under title
  doc.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setLineWidth(1);
  const titleLineWidth = 80;
  doc.line((pageWidth - titleLineWidth) / 2, 62, (pageWidth + titleLineWidth) / 2, 62);

  // === CERTIFICATION BADGE ===
  const badgeY = 72;
  doc.setFillColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.roundedRect((pageWidth - 100) / 2, badgeY - 5, 100, 14, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(getCertificationName(certificationType, 'es').toUpperCase(), pageWidth / 2, badgeY + 3, { align: 'center' });

  // === PROFESSIONAL NAME ===
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Otorgado a / Awarded to', pageWidth / 2, 92, { align: 'center' });

  doc.setTextColor(primaryDarkRgb.r, primaryDarkRgb.g, primaryDarkRgb.b);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(professionalName, pageWidth / 2, 102, { align: 'center' });

  // === DESCRIPTION ===
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  const description = `Por haber demostrado competencias profesionales avaladas por AECMI en la especialidad de ${getCertificationName(certificationType, 'es')}.\nFor having demonstrated professional competencies endorsed by AECMI in the specialty of ${getCertificationName(certificationType, 'en')}.`;
  const descLines = doc.splitTextToSize(description, pageWidth - 2 * margin - 20);
  doc.text(descLines, pageWidth / 2, 114, { align: 'center' });

  // === DETAILS BOX ===
  const boxY = 132;
  const boxHeight = 50;
  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.roundedRect(margin + 5, boxY, pageWidth - 2 * margin - 10, boxHeight, 2, 2, 'S');

  // Left column - Dates
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('FECHA DE OBTENCIÓN / ISSUE DATE:', margin + 12, boxY + 10);
  doc.text('FECHA DE VENCIMIENTO / EXPIRY DATE:', margin + 12, boxY + 22);
  doc.text('NÚMERO DE CERTIFICADO / CERTIFICATE NO.:', margin + 12, boxY + 34);
  doc.text('CÓDIGO DE VERIFICACIÓN / VERIFICATION CODE:', margin + 12, boxY + 46);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(obtainedDate, margin + 80, boxY + 10);
  doc.text(expiryDate, margin + 80, boxY + 22);
  doc.text(certificateNumber, margin + 80, boxY + 34);
  doc.text(qrCode, margin + 80, boxY + 46);

  // === QR CODE PLACEHOLDER BOX (Right side) ===
  const qrSize = 32;
  const qrX = pageWidth - margin - qrSize - 10;
  const qrY = boxY + 8;
  doc.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setLineWidth(0.5);
  doc.rect(qrX, qrY, qrSize, qrSize, 'S');
  
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.text('QR CODE', qrX + qrSize / 2, qrY + qrSize / 2, { align: 'center' });
  doc.text('(Escanea para verificar)', qrX + qrSize / 2, qrY + qrSize / 2 + 4, { align: 'center' });

  // === VERIFICATION URL ===
  doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Verifica este certificado en: ${verificationUrl}`, pageWidth / 2, boxY + boxHeight + 10, { align: 'center' });

  // === SIGNATURES ===
  const sigY = 205;
  const sigWidth = 50;
  const sigGap = 30;
  const centerX = pageWidth / 2;

  // Left signature
  doc.setDrawColor(80, 80, 80);
  doc.setLineWidth(0.3);
  doc.line(centerX - sigGap - sigWidth, sigY, centerX - sigGap, sigY);
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(8);
  doc.text('DIRECTOR EJECUTIVO', centerX - sigGap - sigWidth / 2, sigY + 5, { align: 'center' });
  doc.setFontSize(7);
  doc.text('Executive Director', centerX - sigGap - sigWidth / 2, sigY + 9, { align: 'center' });

  // Right signature
  doc.line(centerX + sigGap, sigY, centerX + sigGap + sigWidth, sigY);
  doc.setFontSize(8);
  doc.text('PRESIDENTE DEL CONSEJO', centerX + sigGap + sigWidth / 2, sigY + 5, { align: 'center' });
  doc.setFontSize(7);
  doc.text('Board President', centerX + sigGap + sigWidth / 2, sigY + 9, { align: 'center' });

  // === SEAL ===
  const sealY = sigY - 5;
  doc.setDrawColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setLineWidth(1);
  doc.circle(centerX, sealY, 10, 'S');
  doc.setTextColor(primaryRgb.r, primaryRgb.g, primaryRgb.b);
  doc.setFontSize(5);
  doc.text('AECMI', centerX, sealY + 2, { align: 'center' });

  // === FOOTER INFO ===
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('www.aecmi.com | info@aecmi.com | Madrid, España', pageWidth / 2, pageHeight - 8, { align: 'center' });

  // === SECURITY WATERMARK ===
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(60);
  doc.setFont('helvetica', 'bold');
  doc.text('AECMI', pageWidth / 2, pageHeight / 2, { align: 'center', angle: 45 });

  return doc.output('blob');
}

/**
 * Download a certificate PDF
 */
export function downloadCertificatePDF(data: CertificatePDFData, filename?: string): void {
  generateCertificatePDF(data).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `AECMI-Certificado-${data.qrCode}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
}
