"use client";
import { useState } from "react";

const inputClass =
  "w-full px-3 py-2 text-sm rounded-lg outline-none transition " +
  "bg-[var(--bg-secondary)] border  " +
  "text-[var(--text-primary)] placeholder-[var(--text-description)] " +
  "focus:border-[var(--accent-color)] focus:ring-2 focus:ring-[var(--accent-color)]/20";

export function FormMedicalRecord() {
  const [evaValue, setEvaValue] = useState(0);

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 text-base leading-relaxed bg-(--bg-card) rounded-xl"
    style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-md)" }}>

      {/* Cabeçalho */}
      <header className="mb-10 px-7">
        <h1 className="text-2xl font-medium text-(--text-primary) mb-1">
          Consultório Virtual
        </h1>
        <p className="text-md text-(--text-description)">
          Preencha os dados abaixo para registrar o prontuário do paciente.
        </p>
      </header>

      <form
        method="post"
        action="/api/medical-record"
        aria-label="Formulário de prontuário médico"
        noValidate
      >
        {/* Card — Dados do Paciente */}
        <div
          className=" p-7 mb-4  "
          style={{ background: "var(--bg-card)",  }}
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-(--text-secondary) mb-5 pb-3 border-b ">
            Dados do paciente
          </p>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <legend className="sr-only">Informações pessoais</legend>

            <div className="sm:col-span-2 flex flex-col gap-1">
              <label htmlFor="fullName" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Nome completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                autoComplete="name"
                required
                aria-required="true"
                placeholder="Digite o nome completo"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="age" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Idade
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min={0}
                max={150}
                required
                aria-required="true"
                placeholder="Ex: 35"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
                aria-describedby="phone-hint"
                placeholder="(00) 00000-0000"
                className={inputClass}
              />
              <span id="phone-hint" className="text-[12px] text-[var(--text-description)]">
                Inclua o DDD
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-[13px] font-medium text-[var(--text-secondary)]">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="exemplo@email.com"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="occupation" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Profissão
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                autoComplete="organization-title"
                placeholder="Digite a profissão"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Status
              </label>
              <select
                id="status"
                name="status"
                aria-required="true"
                className={inputClass + " appearance-none"}
              >
                <option value="">Selecione o status</option>
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
                <option value="waiting">Em espera</option>
              </select>
            </div>
          </fieldset>
        </div>

        {/* Card — Diagnóstico & Anamnese */}
        <div
          className="rounded-xl p-7 mb-4 "
          style={{ background: "var(--bg-card)" }}
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-secondary)] mb-5 pb-3 border-b ">
            Diagnóstico &amp; anamnese
          </p>

          <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <legend className="sr-only">Informações clínicas</legend>

            <div className="flex flex-col gap-1">
              <label htmlFor="diagnosis" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Diagnóstico
              </label>
              <input
                type="text"
                id="diagnosis"
                name="diagnosis"
                placeholder="Descreva o diagnóstico"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="cid10" className="text-[13px] font-medium text-[var(--text-secondary)]">
                CID-10
              </label>
              <input
                type="text"
                id="cid10"
                name="cid10"
                pattern="[A-Z][0-9]{2}(\.[0-9]{1,2})?"
                aria-describedby="cid10-hint"
                placeholder="Ex: M54.5"
                className={inputClass}
              />
              <span id="cid10-hint" className="text-[12px] text-[var(--text-description)]">
                Classificação Internacional de Doenças
              </span>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1">
              <label htmlFor="history" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Histórico e queixa principal
              </label>
              <textarea
                id="history"
                name="history"
                rows={4}
                placeholder="Descreva o histórico clínico e a queixa principal do paciente"
                className={inputClass + " resize-y min-h-[80px] leading-relaxed"}
              />
            </div>

            {/* EVA */}
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label htmlFor="scale" className="text-[13px] font-medium text-[var(--text-secondary)]">
                Escala visual analógica de dor (EVA)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  id="scale"
                  name="scale"
                  min={0}
                  max={10}
                  step={1}
                  value={evaValue}
                  aria-valuemin={0}
                  aria-valuemax={10}
                  aria-valuenow={evaValue}
                  aria-valuetext={`${evaValue} — ${evaValue === 0 ? "Sem dor" : evaValue === 10 ? "Dor máxima" : "Dor moderada"}`}
                  onChange={(e) => setEvaValue(Number(e.target.value))}
                  className="flex-1 h-1 accent-[var(--accent-color)]"
                />
                <output
                  htmlFor="scale"
                  className="min-w-[32px] text-center text-sm font-medium rounded-md px-2 py-0.5"
                  style={{
                    color: "var(--accent-color)",
                    background: "color-mix(in srgb, var(--accent-color) 15%, transparent)",
                  }}
                >
                  {evaValue}
                </output>
              </div>
              <div className="flex justify-between text-[12px] text-[var(--text-description)] mt-1">
                <span>0 — Sem dor</span>
                <span>10 — Dor máxima</span>
              </div>
            </div>
          </fieldset>
        </div>

        {/* Ações */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-5 py-2 text-sm rounded-lg border  text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm font-medium rounded-lg text-white active:scale-[0.98] transition cursor-pointer"
            style={{
              background: "var(--accent-color)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            Salvar prontuário
          </button>
        </div>
      </form>
    </main>
  );
}