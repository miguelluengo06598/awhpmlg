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

const CERT_NAMES_ES: Record<CertificationType, string> = {
  IDM: 'Gestor de Entrega de Información',
  BDM: 'Gestor de Diseño BIM',
  BCM: 'Gestor de Construcción BIM',
};

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function generateCertificatePDF(data: CertificatePDFData): Promise<Blob> {
  const { professionalName, certificationType, qrCode, certificateNumber, obtainedDate, expiryDate, verificationUrl } = data;

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const pw = doc.internal.pageSize.getWidth();   // 297mm
  const ph = doc.internal.pageSize.getHeight();  // 210mm
  const margin = 18;

  const [r, g, b] = CERT_COLORS[certificationType] ?? CERT_COLORS.IDM;

  // ─── WHITE BACKGROUND ─────────────────────────────────────────────────────
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pw, ph, 'F');

  // ─── WATERMARK (very subtle — near-white on white) ────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(100);
  doc.setTextColor(248, 248, 248);
  doc.text('AECOMI', pw / 2, ph / 2 + 28, { align: 'center' });

  // ─── TOP COLOR BAR ────────────────────────────────────────────────────────
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pw, 10, 'F');

  // ─── HEADER ───────────────────────────────────────────────────────────────
  let y = margin + 4;

  // AECOMI logo text (left)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(r, g, b);
  doc.text('AECOMI', margin, y);

  // Subtitles
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(130, 130, 130);
  doc.text('ASOCIACIÓN ESPAÑOLA DE CERTIFICACIÓN BIM', margin, y + 5.5);
  doc.text('International BIM Certification Organization', margin, y + 9.5);

  // Cert-type badge (right)
  const badgeW = 28;
  const badgeH = 10;
  const badgeX = pw - margin - badgeW;
  const badgeY = y - 5;
  doc.setFillColor(r, g, b);
  doc.roundedRect(badgeX, badgeY, badgeW, badgeH, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(certificationType, badgeX + badgeW / 2, badgeY + 7, { align: 'center' });

  y += 17;

  // ─── DECORATIVE RULE ──────────────────────────────────────────────────────
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pw - margin, y);

  y += 10;

  // ─── MAIN TITLE ───────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(r, g, b);
  doc.text('CERTIFICADO PROFESIONAL', pw / 2, y, { align: 'center' });

  y += 7;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(140, 140, 140);
  doc.text('Professional Certificate', pw / 2, y, { align: 'center' });

  y += 10;

  // ─── CERT TYPE NAME (bilingual) ───────────────────────────────────────────
  const nameEn = getCertificationName(certificationType, 'en');
  const nameEs = CERT_NAMES_ES[certificationType];

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.setTextColor(60, 60, 60);
  doc.text(`${nameEs}  ·  ${nameEn}`, pw / 2, y, { align: 'center' });

  y += 10;

  // ─── "Awarded to" ─────────────────────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(140, 140, 140);
  doc.text('Otorgado a  /  Awarded to', pw / 2, y, { align: 'center' });

  y += 9;

  // ─── PROFESSIONAL NAME ────────────────────────────────────────────────────
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(20, 20, 20);
  const nameLines: string[] = doc.splitTextToSize(professionalName.toUpperCase(), pw - margin * 2 - 20);
  doc.text(nameLines, pw / 2, y, { align: 'center' });
  y += nameLines.length * 11 + 7;

  // ─── ACHIEVEMENT TEXT (bilingual) ─────────────────────────────────────────
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(95, 95, 95);
  doc.text(
    'Por haber demostrado las competencias profesionales requeridas y avaladas por AECOMI',
    pw / 2, y, { align: 'center' }
  );
  y += 5;
  doc.text(
    'For having demonstrated the required professional competencies endorsed by AECOMI',
    pw / 2, y, { align: 'center' }
  );

  y += 11;

  // ─── INFO DIVIDER ─────────────────────────────────────────────────────────
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.4);
  doc.line(margin + 25, y, pw - margin - 25, y);

  y += 10;

  // ─── INFO GRID (2 columns) ────────────────────────────────────────────────
  const col1 = margin + 28;
  const col2 = pw / 2 + 18;

  // Labels row 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(155, 155, 155);
  doc.text('FECHA DE EMISIÓN  /  ISSUE DATE', col1, y);
  doc.text('VÁLIDO HASTA  /  VALID UNTIL', col2, y);

  y += 5.5;

  // Values row 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(r, g, b);
  doc.text(formatDate(obtainedDate), col1, y);
  doc.text(formatDate(expiryDate), col2, y);

  y += 9;

  // Labels row 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(155, 155, 155);
  doc.text('Nº CERTIFICADO  /  CERTIFICATE NO.', col1, y);
  doc.text('CÓDIGO DE VERIFICACIÓN  /  VERIFICATION CODE', col2, y);

  y += 5.5;

  // Values row 2
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(40, 40, 40);
  doc.text(certificateNumber, col1, y);

  doc.setFont('courier', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(r, g, b);
  doc.text(qrCode, col2, y);

  // ─── SIGNATURES ───────────────────────────────────────────────────────────
  const sigY = ph - 32;
  const sig1X = margin + 28;
  const sig2X = pw - margin - 90;

  let firmaDirector: string | null = null;
  let firmaPresidente: string | null = null;

  try {
    const res1 = await fetch('/images/firma-director.png');
    if (res1.ok) firmaDirector = await blobToBase64(await res1.blob());
  } catch { /* fall back to line only */ }

  try {
    const res2 = await fetch('/images/firma-presidente.png');
    if (res2.ok) firmaPresidente = await blobToBase64(await res2.blob());
  } catch { /* fall back to line only */ }

  if (firmaDirector) {
    try { doc.addImage(firmaDirector, 'PNG', sig1X, sigY - 16, 32, 14); } catch { /* ignore */ }
  }
  if (firmaPresidente) {
    try { doc.addImage(firmaPresidente, 'PNG', sig2X, sigY - 16, 32, 14); } catch { /* ignore */ }
  }

  doc.setDrawColor(190, 190, 190);
  doc.setLineWidth(0.4);
  doc.line(sig1X, sigY, sig1X + 58, sigY);
  doc.line(sig2X, sigY, sig2X + 58, sigY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(55, 55, 55);
  doc.text('DIRECTOR EJECUTIVO', sig1X, sigY + 5);
  doc.text('PRESIDENTE DEL CONSEJO', sig2X, sigY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(155, 155, 155);
  doc.text('Executive Director  ·  AECOMI', sig1X, sigY + 9.5);
  doc.text('Board President  ·  AECOMI', sig2X, sigY + 9.5);

  // ─── FOOTER BAR ───────────────────────────────────────────────────────────
  doc.setFillColor(r, g, b);
  doc.rect(0, ph - 10, pw, 10, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `Verifica este certificado en:  ${verificationUrl}    |    www.aecomi.com    |    info@aecomi.com    |    Madrid, España`,
    pw / 2,
    ph - 4,
    { align: 'center' }
  );

  return doc.output('blob');
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function downloadCertificatePDF(data: CertificatePDFData, filename?: string): void {
  generateCertificatePDF(data).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `AECOMI-${data.certificationType}-${data.qrCode}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  });
}
