import RegistryPage from '@/components/sections/RegistryPage';

export const metadata = {
  title: 'Certification Registry — AECMI',
  description: 'Directory of AECMI certified professionals. Verify the validity of international BIM certifications.',
};

export default function Page() {
  return <RegistryPage locale="en" />;
}
