import CertificateVerifyPage from '@/components/sections/CertificateVerifyPage';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ qrCode: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { qrCode } = await params;
  return {
    title: `Verify Certification — ${qrCode} | AECOMI`,
    description: 'Verify the authenticity of an AECOMI professional certification.',
  };
}

export default async function Page({ params }: Props) {
  const { qrCode } = await params;
  return <CertificateVerifyPage qrCode={qrCode} locale="pt" />;
}
