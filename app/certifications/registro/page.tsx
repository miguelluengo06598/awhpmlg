import RegistryPage from '@/components/sections/RegistryPage';

export const metadata = {
  title: 'Registro de Certificaciones — AECOMI',
  description: 'Directorio de profesionales certificados AECOMI. Verifica la vigencia de certificaciones internacionales BIM.',
};

export default function Page() {
  return <RegistryPage locale="es" />;
}
