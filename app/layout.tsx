import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ServiceWorkerCleanup from "@/components/ServiceWorkerCleanup";
import { PageTransition } from "@/components/PageTransition";

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
  title: "AECMI - Certificación de Competencias BIM",
  description:
    "AECMI es una organización internacional especializada en la certificación de competencias BIM para profesionales del sector AEC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-pmi-cream antialiased">
        <PageTransition />
        <ServiceWorkerCleanup />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
