import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // ─── Básico ───────────────────────────────────────────
  title: {
    default: "FisioMonitoring - Plataforma de Fisioterapia Digital",
    template: "%s | FisioMonitoring", 
  },
  description:
    "Gerencie pacientes, acompanhe evoluções e entregue planos terapêuticos personalizados em uma única plataforma.",
  keywords: [
    "fisioterapia digital",
    "prontuário eletrônico",
    "métricas de evolução",
    "relatórios personalizados",
    "acesso mobile",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
