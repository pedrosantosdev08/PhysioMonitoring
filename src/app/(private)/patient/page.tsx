"use client"; // necessário para framer-motion

import { AvatarUser } from "@/src/_components/Avatar";
import { ButtonLogOut } from "@/src/_components/ButtonLogOut";
import { ThemeToggle } from "@/src/_components/ThemeToggle/ThemeToggle";
import { PatientPerformanceCard } from "@/src/utils";
import { motion } from "framer-motion";

const user = {
  name: "João",
  week: 4,
};

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getColor(value: number) {
  if (value >= 80) return { stroke: "#1D9E75", track: "#9FE1CB" };
  if (value >= 60) return { stroke: "#378ADD", track: "#B5D4F4" };
  return { stroke: "#D85A30", track: "#F5C4B3" };
}

export default function PatientPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <main className="w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* ── Cabeçalho ───────────────────────────── */}
        <header className="flex justify-between items-center border-b border-(--border-color) pb-5">
          <h1 className="text-3xl font-black tracking-tight text-(--accent-color)">
            Área do Paciente
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <ButtonLogOut />
          </div>
        </header>

        {/* ── Perfil ──────────────────────────────── */}
        <div className="flex flex-col items-start border border-(--accent-color) rounded-2xl p-6">
          <div className="flex items-center gap-6">
            <AvatarUser />
            <div className="flex flex-col">
              <span className="text-2xl font-bold">Olá, {user.name}!</span>
              <p className="text-xl">
                Você está na semana {user.week} do seu protocolo de fortalecimento
              </p>
            </div>
          </div>
          <button className="mt-4 bg-(--accent-color) text-white py-2 px-4 rounded-lg cursor-pointer">
            Solicitar uma sessão
          </button>
        </div>

        {/* ── Cards de desempenho ──────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PatientPerformanceCard.map((card, index) => {
            const offset = CIRCUMFERENCE * (1 - card.performance / 100);
            const { stroke, track } = getColor(card.performance);

            return (
              <div
                key={card.id}
                className="w-full rounded-lg flex flex-col items-center justify-between px-6 py-8 bg-(--bg-card) shadow-md border gap-4"
              >
                <span className="text-sm font-medium text-center text-muted-foreground">
                  {card.title}
                </span>

                <div className="relative w-25 h-25">
                  <svg
                    viewBox="0 0 100 100"
                    width="100"
                    height="100"
                    className="absolute inset-0"
                  >
                    {/* Trilha */}
                    <circle
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="none"
                      stroke={track}
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    {/* Progresso animado */}
                    <motion.circle
                      cx="50"
                      cy="50"
                      r={RADIUS}
                      fill="none"
                      stroke={stroke}
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={CIRCUMFERENCE}
                      initial={{ strokeDashoffset: CIRCUMFERENCE }}
                      animate={{ strokeDashoffset: offset }}
                      transition={{
                        duration: 1,
                        ease: [0.4, 0, 0.2, 1],
                        delay: index * 0.12,
                      }}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>

                  {/* Número central */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      className="text-2xl font-semibold leading-none"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.12 + 0.3,
                      }}
                    >
                      {card.performance}
                    </motion.span>
                    <span className="text-[11px] text-muted-foreground mt-0.5">
                      / 100
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

      </main>
    </div>
  );
}