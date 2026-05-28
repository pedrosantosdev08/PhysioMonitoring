type AppointmentStatus = "Concluído" | "Em andamento" | "Pendente";

interface Appointment {
  id: number;
  time: string;
  patientName: string;
  specialty: string;
  status: AppointmentStatus;
}

const statusConfig: Record<AppointmentStatus, { badge: string }> = {
  "Concluído":    { badge: "bg-emerald-900/60 text-emerald-400"   },
  "Em andamento": { badge: "bg-amber-900/60   text-amber-400"     },
  "Pendente":     { badge: "bg-gray-700/60    text-gray-400"      },
};

const appointments: Appointment[] = [
  { id: 1, time: "09:00", patientName: "Maria Silva",  specialty: "Fisio Motora",  status: "Concluído"    },
  { id: 2, time: "10:30", patientName: "João Santos",  specialty: "Avaliação",     status: "Em andamento" },
  { id: 3, time: "14:00", patientName: "Ana Costa",    specialty: "Reabilitação",  status: "Pendente"     },
  { id: 4, time: "16:00", patientName: "Carlos Lima",  specialty: "Fisio Respi.",  status: "Pendente"     },
];

export function TodaySchedule() {
  return (
    <section
      className="rounded-2xl p-5 border border-[var(--border-color)] w-full"
      style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-md)" }}
      aria-labelledby="schedule-heading"
    >
      <header className="flex items-center gap-2 mb-5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        <h2 id="schedule-heading" className="text-base font-semibold text-[var(--text-primary)]">
          Agenda de Hoje
        </h2>
      </header>

      <ul className="flex flex-col gap-3">
        {appointments.map((appt) => {
          const cfg = statusConfig[appt.status];
          return (
            <li
              key={appt.id}
              className="rounded-xl p-4 border border-[var(--border-color)]"
              style={{ background: "var(--bg-secondary)" }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--accent-color)" }}
                >
                  {appt.time}
                </span>
                <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${cfg.badge}`}>
                  {appt.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                {appt.patientName}
              </p>
              <p className="text-xs text-[var(--text-description)] mt-0.5">
                {appt.specialty}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}