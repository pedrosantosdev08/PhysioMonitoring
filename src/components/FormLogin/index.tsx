"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faUser } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

export function FormLogin() {
  const [userType, setUserType] = useState<"patient" | "therapist">("patient");
  return (
    <>
      {/* Formulario */}
      <form
        action="/login"
        method="get"
        className="w-full max-w-md bg-[#111827]/80 backdrop-blur-md border border-gray-700 rounded-lg p-8"
      >
        {/* Seletores de Usuário */}
        <div className="flex gap-4 mb-6 justify-center w-full">
          {/* Botão Paciente */}
          <button
            type="button"
            onClick={() => setUserType("patient")}
            className={`flex flex-col items-center gap-2 border-2 rounded-lg px-6 py-4 w-full cursor-pointer transition-all ${
              userType === "patient"
                ? "border-[#2FB3AD] bg-[#2FB3AD]/10 text-white" 
                : "border-white/20 text-gray-400 hover:border-white/40" 
            }`}
          >
            <FontAwesomeIcon icon={faUser} width={20} height={20} />
            <span className="text-sm font-medium">Paciente</span>
          </button>

          {/* Botão Profissional */}
          <button
            type="button"
            onClick={() => setUserType("therapist")}
            className={`flex flex-col items-center gap-2 border-2 rounded-lg px-6 py-4 w-full cursor-pointer transition-all ${
              userType === "therapist"
                ? "border-[#2FB3AD] bg-[#2FB3AD]/10 text-white" 
                : "border-white/20 text-gray-400 hover:border-white/40" 
            }`}
          >
            <FontAwesomeIcon icon={faStethoscope} width={20} height={20} />
            <span className="text-sm font-medium">Profissional</span>
          </button>
        </div>

        {/* Campo Oculto para enviar no formulário */}
        {/* Isso garante que quando o form for enviado, o backend saiba quem logou */}
        <input type="hidden" name="userType" value={userType} />

        {/* Inputs de Credenciais */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="text-sm text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@gmail.com"
            required
            className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="password" className="text-sm text-gray-300">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
            className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
        </div>

        <div className="flex items-center justify-between my-4 text-sm">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="accent-[#2FB3AD]"
            />
            <label htmlFor="remember" className="cursor-pointer text-gray-300">
              Lembrar de mim
            </label>
          </div>
          <button
            className="text-(--accent-color) hover:underline cursor-pointer"
            type="button"
          >
            Esqueci minha senha
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2FB3AD] text-white p-3 rounded-lg font-bold hover:bg-[#249c97] transition-colors cursor-pointer mt-2"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Não tem uma conta?{" "}
          <Link
            href="/register"
            className="text-(--accent-color) font-medium hover:underline cursor-pointer"
          >
            Cadastre-se
          </Link>
        </p>
      </form>
    </>
  );
}
