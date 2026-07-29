import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { LocaleSync } from "@/components/LocaleSync";
import ServiceWorkerCleanup from "@/components/ServiceWorkerCleanup";
import { PageTransition } from "@/components/PageTransition";
import { AuthProvider } from "@/lib/authContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AECOMI - Certificación de Competencias BIM",
  description:
    "AECOMI es una organización internacional especializada en la certificación de competencias BIM para profesionales del sector AEC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
      </head>
      <body className="min-h-screen bg-pmi-cream antialiased">
        <AuthProvider>
          <LocaleSync />
          <PageTransition />
          <ServiceWorkerCleanup />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
