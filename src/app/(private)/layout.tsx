

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

   

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Grid de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(47,179,173,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47,179,173,0.10) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Conteúdo */}
      <div className="relative flex flex-col flex-1">
        {children}
      </div>
    </div>
  );
}