// La landing de certificaciones es un client component ('use client'), así que no
// puede exportar `metadata`. Este layout aporta el SEO de la ruta sin envolver el
// árbol en markup extra.
export const metadata = {
  title: 'BIM Certifications — AECOMI',
  description:
    'AECOMI international BIM certifications: Information Delivery Manager, BIM Design Manager and BIM Construction Manager. Requirements, application process and exam.',
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
