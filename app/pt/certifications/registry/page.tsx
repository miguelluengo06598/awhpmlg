import RegistryPage from '@/components/sections/RegistryPage';

export const metadata = {
  title: 'Registo de Certificações — AECOMI',
  description: 'Diretório de profissionais certificados AECOMI. Verifique a validade de certificações internacionais BIM.',
};

export default function Page() {
  return <RegistryPage locale="pt" />;
}
