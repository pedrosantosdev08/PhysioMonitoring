import { AuthProvider } from "@/src/lib/firebase/auth-context";
import { ThemeProvider } from "@/src/lib/providers/theme-provider";
import { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "FisioMonitoring - Plataforma de Fisioterapia Digital",
    template: "%s | FisioMonitoring",
  },
  description: "Gerencie pacientes, acompanhe evoluções e entregue planos terapêuticos personalizados.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lê o tema salvo no cookie — padrão é dark
  const cookieStore = await cookies();
  const theme = cookieStore.get("fisio-theme")?.value ?? "dark";

  return (
    <html
      lang="pt-BR"
      className={cn("antialiased", theme, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}