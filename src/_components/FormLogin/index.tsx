"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/src/lib/firebase/auth-context";

export function FormLogin() {
  const [userType, setUserType] = useState<"patient" | "therapist">("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push(userType === "therapist" ? "/admin" : "/patient");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(getErrorMessage(err.code));
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md backdrop-blur-md border rounded-lg p-8"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--text-secondary)",
      }}
    >
      {/* Seletores de Usuário */}
      <div className="flex gap-4 mb-6 justify-center w-full">
        <button
          type="button"
          onClick={() => setUserType("patient")}
          className="flex flex-col items-center gap-2 border-2 rounded-lg px-6 py-4 w-full cursor-pointer transition-all"
          style={{
            borderColor: userType === "patient" ? "var(--accent-color)" : "var(--text-secondary)",
            backgroundColor: userType === "patient" ? "color-mix(in srgb, var(--accent-color) 10%, transparent)" : "transparent",
            color: userType === "patient" ? "var(--text-primary)" : "var(--text-secondary)",
          }}
        >
          <FontAwesomeIcon icon={faUser} width={20} height={20} />
          <span className="text-sm font-medium">Paciente</span>
        </button>

        <button
          type="button"
          onClick={() => setUserType("therapist")}
          className="flex flex-col items-center gap-2 border-2 rounded-lg px-6 py-4 w-full cursor-pointer transition-all"
          style={{
            borderColor: userType === "therapist" ? "var(--accent-color)" : "var(--text-secondary)",
            backgroundColor: userType === "therapist" ? "color-mix(in srgb, var(--accent-color) 10%, transparent)" : "transparent",
            color: userType === "therapist" ? "var(--text-primary)" : "var(--text-secondary)",
          }}
        >
          <FontAwesomeIcon icon={faStethoscope} width={20} height={20} />
          <span className="text-sm font-medium">Profissional</span>
        </button>
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="email" className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="exemplo@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2.5 rounded border focus:outline-none transition-colors"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--text-secondary)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="password" className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Senha
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2.5 rounded border focus:outline-none transition-colors"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--text-secondary)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Lembrar e Esqueci */}
      <div className="flex items-center justify-between my-4 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            style={{ accentColor: "var(--accent-color)" }}
          />
          <label
            htmlFor="remember"
            className="cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
          >
            Lembrar de mim
          </label>
        </div>
        <button
          className="hover:underline cursor-pointer"
          style={{ color: "var(--accent-color)" }}
          type="button"
        >
          Esqueci minha senha
        </button>
      </div>

      {/* Botão submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 rounded-lg font-bold transition-colors cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "var(--bg-primary)",
        }}
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      <p className="text-center text-sm mt-4" style={{ color: "var(--text-secondary)" }}>
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="font-medium hover:underline"
          style={{ color: "var(--accent-color)" }}
        >
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}

function getErrorMessage(code: string): string {
  switch (code) {
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Email ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";
    case "auth/user-disabled":
      return "Esta conta foi desativada.";
    default:
      return "Erro ao fazer login. Tente novamente.";
  }
}