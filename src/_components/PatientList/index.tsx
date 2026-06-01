import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PatientStatus = "Ativo" | "Pendente" | "Inativo";

interface Patient {
  id: number;
  name: string;
  age: number;
  status: PatientStatus;
  avatarColor: string;
}

const statusConfig: Record<
  PatientStatus,
  { dot: string; badge: string; text: string }
> = {
  Ativo: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-900/60 text-emerald-400",
    text: "Ativo",
  },
  Pendente: {
    dot: "bg-amber-400",
    badge: "bg-amber-900/60   text-amber-400",
    text: "Pendente",
  },
  Inativo: {
    dot: "bg-gray-500",
    badge: "bg-gray-700/60    text-gray-400",
    text: "Inativo",
  },
};

const patients: Patient[] = [
  {
    id: 1,
    name: "Maria Silva",
    age: 45,
    status: "Ativo",
    avatarColor: "bg-teal-500",
  },
  {
    id: 2,
    name: "João Santos",
    age: 62,
    status: "Pendente",
    avatarColor: "bg-purple-500",
  },
  {
    id: 3,
    name: "Ana Costa",
    age: 38,
    status: "Ativo",
    avatarColor: "bg-teal-600",
  },
  {
    id: 4,
    name: "Pedro Oliveira",
    age: 55,
    status: "Inativo",
    avatarColor: "bg-amber-500",
  },
];

function getInitials(name: string) {
  return name.split(" ")[0][0].toUpperCase();
}

export function PatientList() {
  return (
    <section
      className="rounded-2xl p-5 border border-(--border-color) w-full"
      style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-md)" }}
      aria-labelledby="patients-heading"
    >
      <header className="flex items-center gap-2 mb-5 justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUsers} className="text-(--accent-color)"/>
          <h2
            id="patients-heading"
            className="text-base font-semibold text-(--text-primary)"
          >
            Pacientes
          </h2>
        </div>
        <button className="text-(--accent-color) cursor-pointer hover:underline">
          Listar
        </button>
      </header>

      <ul className="flex flex-col divide-y divide-(--border-color)">
        {patients.map((p) => {
          const cfg = statusConfig[p.status];
          return (
            <li
              key={p.id}
              className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`${p.avatarColor} w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0`}
                  aria-hidden="true"
                >
                  {getInitials(p.name)}
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-(--text-primary) leading-none">
                      {p.name}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${cfg.dot}`}
                      aria-label={`Status: ${p.status}`}
                    />
                  </div>
                  <span className="text-xs text-(--text-description) mt-0.5 block">
                    {p.age} anos
                  </span>
                </div>
              </div>

              {/* Badge de status */}
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${cfg.badge}`}
                aria-label={`Status: ${p.status}`}
              >
                {cfg.text}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
