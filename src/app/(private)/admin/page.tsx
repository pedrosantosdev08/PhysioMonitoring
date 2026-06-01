import { FormMedicalRecord } from "@/src/_components/FormMedicalRecord";
import { InfoCards } from "@/src/_components/InfoCards";
import { PatientList } from "@/src/_components/PatientList";
import { TodaySchedule } from "@/src/_components/TodaySchedule";
import { ThemeToggle } from "@/src/_components/ThemeToggle/ThemeToggle";
import { InfoCardData } from "@/src/utils";
import { ButtonLogOut } from "@/src/_components/ButtonLogOut";
import { Metadata } from "next";

const user = {
  name: "Pedro",
  specialty: "Fisioterapeuta Esportivo",
};

export const metadata: Metadata = {
  title: "Painel Administrativo - Fisio Monitoring"
}

export default function AdminPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <main className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
        {/* ── Cabeçalho ───────────────────────────── */}
        <header className="flex justify-between items-center border-b border-(--border-color) pb-5">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-(--accent-color)">
              Painel Administrativo
            </h1>
            <p className="text-md font-bold mt-1">
              <span className="text-(--text-description)">{user.name}</span>{" "}
              <span className="text-zinc-400 font-normal" aria-hidden="true">
                &#x2022;
              </span>{" "}
              <span className="font-medium text-(--text-description)">
                {user.specialty}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <ButtonLogOut />
          </div>
        </header>

        {/* ── Cards de resumo ──────────────────────── */}
        <section aria-labelledby="summary-heading">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {InfoCardData.map((card) => (
              <InfoCards key={card.id} {...card} />
            ))}
          </div>
        </section>

        {/* ── Conteúdo principal ───────────────────── */}
        <section
          aria-labelledby="dashboard-heading"
          className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 items-start"
        >
          <h2 id="dashboard-heading" className="sr-only">
            Dashboard
          </h2>

          {/* Coluna esquerda — Pacientes + Agenda */}
          <div className="flex flex-col gap-4">
            <aside aria-label="Lista de pacientes">
              <PatientList />
            </aside>
            <aside aria-label="Agenda de hoje">
              <TodaySchedule />
            </aside>
          </div>

          {/* Coluna direita — Prontuário */}
          <article aria-label="Prontuário do paciente">
            <FormMedicalRecord />
          </article>
        </section>
      </main>
    </div>
  );
}
