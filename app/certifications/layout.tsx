// La landing de certificaciones es un client component ('use client'), así que no
// puede exportar `metadata`. Este layout aporta el SEO de la ruta sin envolver el
// árbol en markup extra.
export const metadata = {
  title: 'Certificaciones BIM — AECOMI',
  description:
    'Certificaciones internacionales BIM de AECOMI: Information Delivery Manager, BIM Design Manager y BIM Construction Manager. Requisitos, proceso de solicitud y examen.',
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
