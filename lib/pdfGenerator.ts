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
  BDM: [5, 150, 105],
  BCM: [217, 119, 6],
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function generateCertificatePDF(data: CertificatePDFData): Promise<Blob> {
  const { professionalName, certificationType, qrCode, certificateNumber, obtainedDate, expiryDate, verificationUrl } = data;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const pw = doc.internal.pageSize.getWidth();   // 210 mm
  const ph = doc.internal.pageSize.getHeight();  // 297 mm

  const [r, g, b] = CERT_COLORS[certificationType] ?? CERT_COLORS.IDM;

  // ─── BACKGROUND ───────────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pw, ph, 'F');

  // ─── OUTER FRAME ──────────────────────────────────────────────────────────
  const m = 12;
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.6);
  doc.rect(m, m, pw - m * 2, ph - m * 2);

  // Thick accent line at top (inside frame)
  doc.setLineWidth(2.5);
  doc.line(m, m + 9, pw - m, m + 9);

  // Thin accent line at bottom (inside frame)
  doc.setLineWidth(0.6);
  doc.line(m, ph - m - 9, pw - m, ph - m - 9);

  // ─── HEADER: AECMI ────────────────────────────────────────────────────────
  let y = 26;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(r, g, b);
  doc.text('AECMI', pw / 2, y, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text('ASOCIACIÓN ESPAÑOLA DE CERTIFICACIÓN BIM', pw / 2, y + 6, { align: 'center' });

  // Certification type badge — top right
  const badgeW = 22;
  const badgeH = 9;
  const badgeX = pw - m - badgeW - 2;
  const badgeY = m + 11;
  doc.setFillColor(r, g, b);
  doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(certificationType, badgeX + badgeW / 2, badgeY + 6.2, { align: 'center' });

  // ─── INTRO PHRASE ─────────────────────────────────────────────────────────
  y = 56;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(100, 100, 100);
  doc.text('AECMI se complace en otorgar el siguiente', pw / 2, y, { align: 'center' });

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(r, g, b);
  doc.text('CERTIFICADO', pw / 2, y, { align: 'center' });

  // ─── DECORATIVE DIVIDER ───────────────────────────────────────────────────
  y += 10;
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.4);
  doc.line(m + 25, y, pw - m - 25, y);

  // ─── CERTIFICATE TYPE NAME ────────────────────────────────────────────────
  y += 14;
  const certName = getCertificationName(certificationType, 'es').toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(r, g, b);
  const certNameLines: string[] = doc.splitTextToSize(certName, pw - m * 2 - 16);
  doc.text(certNameLines, pw / 2, y, { align: 'center' });
  y += certNameLines.length * 8 + 8;

  // ─── PROFESSIONAL NAME ────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(20, 20, 20);
  const nameLines: string[] = doc.splitTextToSize(professionalName.toUpperCase(), pw - m * 2 - 10);
  doc.text(nameLines, pw / 2, y, { align: 'center' });
  y += nameLines.length * 11 + 14;

  // ─── INFO DIVIDER ─────────────────────────────────────────────────────────
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.4);
  doc.line(m + 25, y, pw - m - 25, y);
  y += 14;

  // ─── INFO GRID (2 columns) ────────────────────────────────────────────────
  const col1 = m + 20;
  const col2 = pw / 2 + 10;

  const drawField = (label: string, value: string, x: number, fy: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(label, x, fy);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(r, g, b);
    doc.text(value, x, fy + 7);
  };

  drawField('CÓDIGO DE CERTIFICACIÓN', certificateNumber, col1, y);
  drawField('PERÍODO DE VALIDEZ', '2 AÑOS', col2, y);

  y += 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('FECHA DE EMISIÓN', col1, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(formatDate(obtainedDate), col1, y + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('VÁLIDO HASTA', col2, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(formatDate(expiryDate), col2, y + 6);

  // ─── SIGNATURES ───────────────────────────────────────────────────────────
  const sigY = ph - 62;

  doc.setDrawColor(180, 180, 180);
  doc.setLineWidth(0.4);
  doc.line(col1, sigY, col1 + 50, sigY);
  doc.line(col2, sigY, col2 + 50, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text('DIRECTOR EJECUTIVO', col1, sigY + 5);
  doc.text('PRESIDENTE DEL CONSEJO', col2, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(150, 150, 150);
  doc.text('AECMI', col1, sigY + 10);
  doc.text('AECMI', col2, sigY + 10);

  // ─── VERIFICATION CODE ────────────────────────────────────────────────────
  const codeY = ph - 38;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('CÓDIGO DE VERIFICACIÓN', pw / 2, codeY, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(r, g, b);
  doc.text(qrCode, pw / 2, codeY + 6, { align: 'center' });

  // ─── FOOTER ───────────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(160, 160, 160);
  doc.text(
    `Verifica este certificado en: ${verificationUrl}`,
    pw / 2,
    ph - 16,
    { align: 'center' }
  );

  return doc.output('blob');
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
