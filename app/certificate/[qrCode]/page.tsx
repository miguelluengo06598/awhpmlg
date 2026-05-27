import CertificateVerifyPage from '@/components/sections/CertificateVerifyPage';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ qrCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { qrCode } = await params;
  return {
    title: `Verificar Certificación — ${qrCode} | AECMI`,
    description: 'Verifica la autenticidad de una certificación profesional AECMI.',
  };
}

export default async function Page({ params }: Props) {
  const { qrCode } = await params;
  return <CertificateVerifyPage qrCode={qrCode} locale="es" />;
}
