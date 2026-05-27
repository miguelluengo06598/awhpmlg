import RegistryPage from '@/components/sections/RegistryPage';

export const metadata = {
  title: 'Registro de Certificaciones — AECMI',
  description: 'Directorio de profesionales certificados AECMI. Verifica la vigencia de certificaciones internacionales BIM.',
};

export default function Page() {
  return <RegistryPage locale="es" />;
}
