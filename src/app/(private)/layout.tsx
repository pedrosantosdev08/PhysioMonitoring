import { Header } from "@/src/_components/Header";
import "../globals.css";
export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-full flex flex-col">
        <>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
              linear-gradient(rgba(47,179,173,0.30) 1px, transparent 1px),
              linear-gradient(90deg, rgba(47,179,173,0.30) 1px, transparent 1px)
            `,
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative flex flex-col min-h-screen">{children}</div>
        </>
      </body>
    </html>
  );
}
