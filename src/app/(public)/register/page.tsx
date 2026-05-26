import { FormRegister } from "@/src/_components/FormRegister";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
  description:
    "Crie sua conta para acessar o sistema e gerenciar seus pacientes ou evoluções.",
};

export default function Register() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#12222B] text-white px-6">
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
        <div className="max-w-md w-full p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Crie sua conta</h1>
          <p className="text-gray-400">
            Preencha os campos abaixo para se cadastrar
          </p>
        </div>
        <FormRegister />
      </div>
    </>
  );
}
