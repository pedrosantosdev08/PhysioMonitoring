import { FormRegister } from "@/src/_components/FormRegister";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
  description:
    "Crie sua conta para acessar o sistema e gerenciar seus pacientes ou evoluções.",
};

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-start px-6 py-12">
      <div className="max-w-md w-full p-8 text-center">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Crie sua conta
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Preencha os campos abaixo para se cadastrar
        </p>
      </div>
      <FormRegister />
    </div>
  );
}