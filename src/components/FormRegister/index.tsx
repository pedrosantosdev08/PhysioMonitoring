"use client";
import { faEye, faEyeSlash, faStethoscope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export function FormRegister() {
  const [userType, setUserType] = useState<"patient" | "therapist">("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <>
      {/* Formulario */}
      <form
        action="/register"
        method="post"
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
                ? "border-[#2FB3AD] bg-[#2FB3AD]/10 text-white" // Ativo
                : "border-white/20 text-gray-400 hover:border-white/40" // Inativo
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
                ? "border-[#2FB3AD] bg-[#2FB3AD]/10 text-white" // Ativo
                : "border-white/20 text-gray-400 hover:border-white/40" // Inativo
            }`}
          >
            <FontAwesomeIcon icon={faStethoscope} width={20} height={20} />
            <span className="text-sm font-medium">Profissional</span>
          </button>
        </div>

        {/* Campo Oculto para enviar no formulário */}

        <input type="hidden" name="userType" value={userType} />

        {/* Inputs de Credenciais */}
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="name" className="text-sm text-gray-300">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Seu Nome"
            required
            className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="cpf" className="text-sm text-gray-300">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            placeholder="•••.•••.•••-••"
            required
            className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
        </div>

        {userType === "therapist" && (
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="especialidade" className="text-sm text-gray-300">
              Especialidade
            </label>
            <select
              name="especialidade"
              id="especialidade"
              className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
            >
              <option value="">Selecione uma especialidade</option>
              <option value="fisioterapeuta">Fisioterapeuta Ortopedica</option>
              <option value="terapeuta">Fisioterapeuta Neurologica</option>
              <option value="terapeuta">Fisioterapeuta Respiratoria</option>
              <option value="terapeuta">Fisioterapeuta Esportiva</option>
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="email" className="text-sm text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="seu.email@dominio.com"
            required
            className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="telefone" className="text-sm text-gray-300">
            Telefone
          </label>
          <input
            type="text"
            id="telefone"
            name="telefone"
            placeholder="(XX) XXXXX-XXXX"
            required
            className="p-2.5 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
        </div>

        <div className="flex flex-col gap-1 mb-4 relative">
          <label htmlFor="senha" className="text-sm text-gray-300">
            Senha
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="senha"
            name="senha"
            placeholder="••••••••"
            required
            className="p-2.5 pr-10 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 bottom-3 text-gray-400 hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              width={16}
            />
          </button>
        </div>

        <div className="flex flex-col gap-1 mb-4 relative">
          <label htmlFor="confirmarSenha" className="text-sm text-gray-300">
            Confirmar Senha
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="••••••••"
            required
            className="p-2.5 pr-10 rounded bg-slate-800/80 border border-gray-600 text-white focus:outline-none focus:border-[#2FB3AD]"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 bottom-3 text-gray-400 hover:text-white cursor-pointer"
          >
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              width={16}
            />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#2FB3AD] text-white p-3 rounded-lg font-bold hover:bg-[#249c97] transition-colors cursor-pointer mt-2"
        >
          Cadastrar
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="text-(--accent-color) font-medium hover:underline cursor-pointer"
          >
            Faça login
          </Link>
        </p>
      </form>
    </>
  );
}
