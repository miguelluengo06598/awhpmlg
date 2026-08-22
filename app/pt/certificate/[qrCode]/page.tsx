import CertificateVerifyPage from '@/components/sections/CertificateVerifyPage';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ qrCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { qrCode } = await params;
  return {
    title: `Verificar Certificação — ${qrCode} | AECOMI`,
    description: 'Verifique a autenticidade de uma certificação profissional AECOMI.',
  };
}

export default async function Page({ params }: Props) {
  const { qrCode } = await params;
  return <CertificateVerifyPage qrCode={qrCode} locale="pt" />;
}
