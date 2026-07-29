// La landing de certificaciones es un client component ('use client'), así que no
// puede exportar `metadata`. Este layout aporta el SEO de la ruta sin envolver el
// árbol en markup extra.
export const metadata = {
  title: 'Certificações BIM — AECOMI',
  description:
    'Certificações internacionais BIM da AECOMI: Information Delivery Manager, BIM Design Manager e BIM Construction Manager. Requisitos, processo de candidatura e exame.',
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
