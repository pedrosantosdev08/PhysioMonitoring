import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "../components/Header";
import { CardData } from "../utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-(--bg-color)  font-sans">
      <Header />

      <main className="relative flex flex-col items-center justify-center text-center text-white px-6 py-24 overflow-hidden min-h-[calc(100vh-106px)]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(47,179,173,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(47,179,173,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative inline-flex items-center gap-2 border border-(--accent-color)/40 text-(--accent-color) text-xs md:text-lg font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent-color)" />
          Plataforma de Fisioterapia Digital
        </div>

        <h1 className="relative font-serif text-5xl md:text-7xl font-normal leading-[1.1] max-w-5xl mb-5">
          Transforme sua <em className="text-(--accent-color) italic">prática</em>{" "}
          clínica em resultados
        </h1>

        <p className="relative text-white/40 text-base md:text-xl font-light max-w-lg leading-relaxed mb-10">
          Gerencie pacientes, acompanhe evoluções e entregue planos terapêuticos
          personalizados em uma única plataforma.
        </p>

        <div className="relative flex gap-3">
          <Link
            href="/login"
            className="bg-(--accent-color) text-(--bg-color) text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer md:text-lg"
          >
            Acessar Painel →
          </Link>
          <Link
            href="/login"
            className="bg-transparent border border-white/15 text-white/70 text-sm font-normal px-6 py-3 rounded-lg hover:border-white/30 hover:text-white transition-all cursor-pointer md:text-lg"
          >
            Área do Paciente
          </Link>
        </div>
      </main>

      <section className="grid grid-cols-3 border-t border-white/[0.07]">
        {[
          { num: "+1.4k", label: "Pacientes ativos" },
          { num: "98%", label: "Satisfação clínica" },
          { num: "+150", label: "Fisioterapeutas" },
        ].map((s, i) => (
          <div
            key={i}
            className={`py-6 text-center ${i < 2 ? "border-r border-white/[0.07]" : ""}`}
          >
            <div className="font-serif text-3xl text-white font-normal">
              <span className="text-(--accent-color)">{s.num}</span>
            </div>
            <div className="text-[11px] text-white/35 mt-1 tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 px-4 max-w-6xl mx-auto">
        {CardData.map((card) => (
          <div
            key={card.id}
            className="flex flex-row md:flex-col items-center md:items-start gap-4 p-6 bg-[#1A2B34] rounded-lg w-full shadow-2xl cursor-pointer"
          >
            <div className="text-(--accent-color) text-2xl bg-(--bg-color) p-3 rounded-2xl shrink-0">
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="text-sm text-white/70 mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
