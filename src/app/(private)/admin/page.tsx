import { InfoCards } from "@/src/_components/InfoCards";
import { InfoCardData } from "@/src/utils";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const user = {
  name: "Pedro",
  specialty: "Fisioterapeuta Esportivo",
};

export default function AdminPage() {
  return (
    <main className="min-h-screen w-full max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-(--accent-color)">
            Painel Administrativo
          </h1>
          <p className="text-md font-bold mt-1">
            <span className="text-(--text-description)">{user.name}</span>{" "}
            <span className="text-zinc-400 font-normal">&#x2022;</span>{" "}
            <span className="font-medium text-(--text-description)">
              {user.specialty}
            </span>
          </p>
        </div>
        <div>
          <button className="bg-(--accent-color) text-white p-3.5 rounded-md cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center">
            <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {InfoCardData.map((card) => (
          <InfoCards key={card.id} {...card} />
        ))}
      </section>
    </main>
  );
}
