import { FormLogin } from "@/src/_components/FormLogin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Faça login para acessar sua conta e gerenciar seus pacientes ou evoluções.",
};

export default function Login() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#12222B] text-white px-6 lg:py-24">
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
          <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
          <p className="text-gray-400">
            Entre com suas credenciais para continuar
          </p>
        </div>

        <FormLogin />
      </div>
    </>
  );
}
