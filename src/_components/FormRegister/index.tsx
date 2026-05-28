"use client";
import {
  faEye,
  faEyeSlash,
  faStethoscope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/src/lib/firebase/client";
import { FirebaseError } from "firebase/app";

export function FormRegister() {
  const [userType, setUserType] = useState<"patient" | "therapist">("patient");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const cpf = (form.elements.namedItem("cpf") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const telefone = (form.elements.namedItem("telefone") as HTMLInputElement).value;
    const senha = (form.elements.namedItem("senha") as HTMLInputElement).value;
    const confirmarSenha = (form.elements.namedItem("confirmarSenha") as HTMLInputElement).value;
    const especialidade =
      userType === "therapist"
        ? (form.elements.namedItem("especialidade") as HTMLSelectElement).value
        : null;

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, senha);
      console.log("✅ 1. Usuário criado:", user.uid);

      await updateProfile(user, { displayName: name });
      console.log("✅ 2. Profile atualizado");

      await setDoc(doc(db, "users", user.uid), {
        name,
        cpf,
        email,
        telefone,
        role: userType,
        ...(especialidade && { especialidade }),
        createdAt: new Date().toISOString(),
      });
      console.log("✅ 3. Firestore salvo");

      const response = await fetch("/api/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid, role: userType }),
      });
      console.log("✅ 4. set-role status:", response.status);

      await user.getIdToken(true);
      const newToken = await user.getIdToken();
      document.cookie = `firebase-token=${newToken}; path=/; max-age=3600; SameSite=Strict`;
      console.log("✅ 5. Token atualizado");

      router.push(userType === "therapist" ? "/admin" : "/patient");

    } catch (err) {
      if (err instanceof FirebaseError) {
        console.log("ERRO FIREBASE:", err.code, err.message);
        setError(getErrorMessage(err.code));
      } else {
        console.log("ERRO DESCONHECIDO:", err);
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

      {/* Campos */}
      {[
        { id: "name", label: "Nome Completo", type: "text", placeholder: "Seu Nome" },
        { id: "cpf", label: "CPF", type: "text", placeholder: "•••.•••.•••-••" },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="flex flex-col gap-1 mb-4">
          <label htmlFor={id} className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            required
            className="p-2.5 rounded border focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      ))}

      {userType === "therapist" && (
        <div className="flex flex-col gap-1 mb-4">
          <label htmlFor="especialidade" className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Especialidade
          </label>
          <select
            name="especialidade"
            id="especialidade"
            className="p-2.5 rounded border focus:outline-none"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
          >
            <option value="">Selecione uma especialidade</option>
            <option value="ortopedica">Fisioterapeuta Ortopédica</option>
            <option value="neurologica">Fisioterapeuta Neurológica</option>
            <option value="respiratoria">Fisioterapeuta Respiratória</option>
            <option value="esportiva">Fisioterapeuta Esportiva</option>
          </select>
        </div>
      )}

      {[
        { id: "email", label: "Email", type: "email", placeholder: "seu.email@dominio.com" },
        { id: "telefone", label: "Telefone", type: "text", placeholder: "(XX) XXXXX-XXXX" },
      ].map(({ id, label, type, placeholder }) => (
        <div key={id} className="flex flex-col gap-1 mb-4">
          <label htmlFor={id} className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            required
            className="p-2.5 rounded border focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      ))}

      {/* Senha */}
      {[
        { id: "senha", label: "Senha", show: showPassword, toggle: () => setShowPassword(!showPassword) },
        { id: "confirmarSenha", label: "Confirmar Senha", show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword) },
      ].map(({ id, label, show, toggle }) => (
        <div key={id} className="flex flex-col gap-1 mb-4 relative">
          <label htmlFor={id} className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {label}
          </label>
          <input
            type={show ? "text" : "password"}
            id={id}
            name={id}
            placeholder="••••••••"
            required
            className="p-2.5 pr-10 rounded border focus:outline-none transition-colors"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--text-secondary)",
              color: "var(--text-primary)",
            }}
          />
          <button
            type="button"
            onClick={toggle}
            className="absolute right-3 bottom-3 cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
          >
            <FontAwesomeIcon icon={show ? faEyeSlash : faEye} width={16} />
          </button>
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full p-3 rounded-lg font-bold transition-colors cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "var(--accent-color)",
          color: "var(--bg-primary)",
        }}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>

      <p className="text-center text-sm mt-4" style={{ color: "var(--text-secondary)" }}>
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="font-medium hover:underline"
          style={{ color: "var(--accent-color)" }}
        >
          Faça login
        </Link>
      </p>
    </form>
  );
}

function getErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Este email já está cadastrado.";
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    default:
      return "Erro ao cadastrar. Tente novamente.";
  }
}