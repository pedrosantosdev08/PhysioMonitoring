"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { motion, Variants } from "framer-motion"; // Adicione o Variants aqui
import { Header } from "@/src/_components/Header";
import { CardData } from "@/src/utils";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const titleContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function HomeClient() {
  const title1 = "Transforme sua".split(" ");
  const title2 = "clínica em resultados".split(" ");

  return (
    <div className="bg-(--bg-color) font-sans overflow-x-hidden">
      <Header />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative flex flex-col items-center justify-center text-center text-white px-6 py-24 overflow-hidden min-h-[calc(100vh-106px)]"
      >
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

        <motion.div
          variants={itemVariants}
          className="relative inline-flex items-center gap-2 border border-(--accent-color)/40 text-(--accent-color) text-xs md:text-lg font-medium px-4 py-1.5 rounded-full mb-8 tracking-wide"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent-color)" />
          Plataforma de Fisioterapia Digital
        </motion.div>

        <motion.h1
          variants={titleContainerVariants}
          className="relative font-serif text-5xl md:text-7xl font-normal leading-[1.1] max-w-5xl mb-5 flex flex-wrap justify-center gap-x-3 md:gap-x-4"
        >
          {title1.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className="inline-block text-(--text-description)"
            >
              {word}
            </motion.span>
          ))}
          <motion.em
            variants={wordVariants}
            className="text-(--accent-color) italic inline-block font-serif"
          >
            prática
          </motion.em>
          {title2.map((word, idx) => (
            <motion.span
              key={idx}
              variants={wordVariants}
              className="inline-block text-(--text-description)"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="relative text-(--text-description) text-base md:text-xl font-light max-w-4xl leading-relaxed mb-10"
        >
          Gerencie pacientes, acompanhe evoluções e entregue planos terapêuticos
          personalizados em uma única plataforma.
        </motion.p>

        <motion.div variants={itemVariants} className="relative flex gap-3">
          <Link
            href="/register"
            className="bg-(--accent-color) text-(--bg-color) text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer md:text-lg"
          >
            Começar Agora
          </Link>
          <Link
            href="/login"
            className="bg-transparent border border-black/80 text-black/70 text-sm font-normal px-6 py-3 rounded-lg hover:border-white/30 hover:text-white transition-all cursor-pointer md:text-lg"
          >
            Fazer Login
          </Link>
        </motion.div>
      </motion.main>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-3 border-t border-gray-900/20 "
      >
        {[
          { num: "+1.4k", label: "Pacientes ativos" },
          { num: "98%", label: "Satisfação clínica" },
          { num: "+150", label: "Fisioterapeutas" },
        ].map((s, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className={`py-6 text-center ${i < 2 ? "border-r border-gray-900/20 " : ""}`}
          >
            <div className="font-serif text-3xl text-white font-normal">
              <span className="text-(--accent-color)">{s.num}</span>
            </div>
            <div className="text-[11px] font-bold mt-1 tracking-wide text-(--text-dark)">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 px-4 max-w-6xl mx-auto"
      >
        {CardData.map((card) => (
          <motion.div
            key={card.id}
            variants={itemVariants}
            whileHover={{
              y: -6,
              transition: { duration: 0.2 },
            }}
            className="flex flex-row md:flex-col items-center md:items-start gap-4 p-6 bg-(--bg-color) rounded-lg w-full shadow-2xl cursor-pointer border border-transparent hover:border-(--accent-color) transition-all"
          >
            <div className="text-(--accent-color) text-2xl bg-(--bg-color) p-3 rounded-2xl shrink-0">
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-black/70 ">
                {card.title}
              </h3>
              <p className="text-sm text-black/70 mt-1 ">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
