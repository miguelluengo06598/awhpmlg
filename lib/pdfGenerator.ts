import { jsPDF } from 'jspdf';
import { CertificationType, getCertificationName } from './qrGenerator';

export interface CertificatePDFData {
  professionalName: string;
  certificationType: CertificationType;
  qrCode: string;
  certificateNumber: string;
  obtainedDate: string;
  expiryDate: string;
  verificationUrl: string;
}

const CERT_COLORS: Record<CertificationType, [number, number, number]> = {
  IDM: [0, 102, 204],
  BDM: [0, 170, 136],
  BCM: [255, 107, 53],
};

const CERT_DARK: Record<CertificationType, [number, number, number]> = {
  IDM: [0, 77, 153],
  BDM: [0, 128, 102],
  BCM: [204, 85, 42],
};

export async function generateCertificatePDF(data: CertificatePDFData): Promise<Blob> {
  const { professionalName, certificationType, qrCode, certificateNumber, obtainedDate, expiryDate, verificationUrl } = data;

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const pw = doc.internal.pageSize.getWidth();   // 297 mm
  const ph = doc.internal.pageSize.getHeight();  // 210 mm

  const [r, g, b]     = CERT_COLORS[certificationType] ?? CERT_COLORS.IDM;
  const [rd, gd, bd]  = CERT_DARK[certificationType]   ?? CERT_DARK.IDM;

  // ─────────────────────────────────────────────────────────────────────────
  // 1. WHITE BACKGROUND
  // ─────────────────────────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pw, ph, 'F');

  // ─────────────────────────────────────────────────────────────────────────
  // 2. WATERMARK — drawn first, behind everything
  // ─────────────────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(90);
  doc.setTextColor(235, 235, 235);
  doc.text('AECMI', pw / 2, ph / 2 + 20, { align: 'center', angle: 30 });

  doc.setFontSize(18);
  doc.setTextColor(242, 242, 242);
  doc.text('CERTIFIED', pw / 2 + 60, ph / 2 - 10, { align: 'center', angle: 30 });

  // ─────────────────────────────────────────────────────────────────────────
  // 3. COLORED TOP BAND
  // ─────────────────────────────────────────────────────────────────────────
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pw, 22, 'F');

  // Left accent strip
  doc.setFillColor(rd, gd, bd);
  doc.rect(0, 0, 6, ph, 'F');

  // Bottom band
  doc.setFillColor(rd, gd, bd);
  doc.rect(0, ph - 12, pw, 12, 'F');

  // ─────────────────────────────────────────────────────────────────────────
  // 4. HEADER: AECMI logo (left) + cert type badge (right)
  // ─────────────────────────────────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('AECMI', 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('ASOCIACIÓN ESPAÑOLA DE CERTIFICACIÓN BIM', 14, 17);

  // Badge right
  const badgeLabel = certificationType;
  const badgeW = 28;
  const badgeH = 12;
  const badgeX = pw - badgeW - 10;
  const badgeY = 5;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 3, 3, 'F');
  doc.setTextColor(r, g, b);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(badgeLabel, badgeX + badgeW / 2, badgeY + 8.5, { align: 'center' });

  // ─────────────────────────────────────────────────────────────────────────
  // 5. MAIN CONTENT — left column (14 → 185 mm)
  // ─────────────────────────────────────────────────────────────────────────
  const lx = 16; // left content X (after strip)
  let y = 36;

  // "CERTIFICA QUE"
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text('CERTIFICA QUE', lx, y);
  y += 7;

  // Professional name — large
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(30, 30, 30);
  const nameLines: string[] = doc.splitTextToSize(professionalName.toUpperCase(), 175);
  doc.text(nameLines, lx, y);
  y += nameLines.length * 11 + 2;

  // Thin divider
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.8);
  doc.line(lx, y, 185, y);
  y += 7;

  // "HA OBTENIDO..."
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  const desc = `ha demostrado las competencias profesionales acreditadas por AECMI en la especialidad de ${getCertificationName(certificationType, 'es')}, cumpliendo los requisitos establecidos por los estándares internacionales BIM.`;
  const descLines: string[] = doc.splitTextToSize(desc, 175);
  doc.text(descLines, lx, y);
  y += descLines.length * 5 + 8;

  // Certification name — highlighted
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(r, g, b);
  doc.text(getCertificationName(certificationType, 'es').toUpperCase(), lx, y);
  y += 9;

  // ─────────────────────────────────────────────────────────────────────────
  // 6. DETAILS GRID
  // ─────────────────────────────────────────────────────────────────────────
  const detailsY = y + 4;
  const col2X = lx + 70;
  const col3X = lx + 140;

  const drawDetail = (label: string, value: string, x: number, dy: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(140, 140, 140);
    doc.text(label, x, dy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(30, 30, 30);
    doc.text(value, x, dy + 5.5);
  };

  drawDetail('NÚMERO DE CERTIFICADO', certificateNumber, lx, detailsY);
  drawDetail('FECHA DE EMISIÓN', formatDate(obtainedDate), col2X, detailsY);
  drawDetail('VÁLIDO HASTA', formatDate(expiryDate), col3X, detailsY);

  // ─────────────────────────────────────────────────────────────────────────
  // 7. SIGNATURES
  // ─────────────────────────────────────────────────────────────────────────
  const sigY = detailsY + 24;
  const sig1X = lx;
  const sig2X = lx + 80;

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(sig1X, sigY, sig1X + 55, sigY);
  doc.line(sig2X, sigY, sig2X + 55, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  doc.text('DIRECTOR EJECUTIVO', sig1X, sigY + 5);
  doc.text('PRESIDENTE DEL CONSEJO', sig2X, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(140, 140, 140);
  doc.text('AECMI — Executive Director', sig1X, sigY + 9);
  doc.text('AECMI — Board President', sig2X, sigY + 9);

  // ─────────────────────────────────────────────────────────────────────────
  // 8. RIGHT PANEL — QR area
  // ─────────────────────────────────────────────────────────────────────────
  const rightX = 200;
  const rightW = pw - rightX - 8;

  // Panel background
  doc.setFillColor(249, 249, 249);
  doc.roundedRect(rightX, 27, rightW, ph - 27 - 14, 4, 4, 'F');

  // Seal circle
  const sealCX = rightX + rightW / 2;
  const sealCY = 52;
  doc.setFillColor(r, g, b);
  doc.circle(sealCX, sealCY, 18, 'F');
  doc.setFillColor(rd, gd, bd);
  doc.circle(sealCX, sealCY, 14, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text(certificationType, sealCX, sealCY + 2.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.text('AECMI CERTIFIED', sealCX, sealCY + 8, { align: 'center' });

  // QR placeholder box
  const qrBoxY = sealCY + 25;
  const qrSide = 42;
  const qrBoxX = sealCX - qrSide / 2;
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.6);
  doc.roundedRect(qrBoxX, qrBoxY, qrSide, qrSide, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(r, g, b);
  doc.text('QR', sealCX, qrBoxY + qrSide / 2 - 2, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(5);
  doc.setTextColor(160, 160, 160);
  doc.text('Escanea para', sealCX, qrBoxY + qrSide / 2 + 3, { align: 'center' });
  doc.text('verificar', sealCX, qrBoxY + qrSide / 2 + 7, { align: 'center' });

  // Verification code below QR
  const codeY = qrBoxY + qrSide + 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(140, 140, 140);
  doc.text('CÓDIGO DE VERIFICACIÓN', sealCX, codeY, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 30, 30);
  doc.text(qrCode, sealCX, codeY + 5.5, { align: 'center' });

  // ─────────────────────────────────────────────────────────────────────────
  // 9. FOOTER
  // ─────────────────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `Verifica este certificado en: ${verificationUrl}   ·   www.aecmi.tech   ·   info@aecmi.com`,
    pw / 2,
    ph - 5,
    { align: 'center' }
  );

  return doc.output('blob');
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function downloadCertificatePDF(data: CertificatePDFData, filename?: string): void {
  generateCertificatePDF(data).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `AECMI-${data.certificationType}-${data.qrCode}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
}
