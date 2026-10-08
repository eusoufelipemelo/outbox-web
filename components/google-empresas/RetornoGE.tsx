"use client";

import { useId, useState } from "react";
import { GE_PLANOS, formatarReais, type Plano } from "@/lib/google-empresas";
import { useEntrar } from "./useEntrar";
import s from "./vantagens.module.css";

/* A conta é feita ao contrário, como no simulador da proposta: em vez de
   prometer contatos, parte do quanto o próprio cliente ganha com um cliente
   novo e responde quantos clientes pagam o plano. É matemática, não promessa. */

const ORDEM: Plano["id"][] = ["essencial", "crescimento", "autoridade"];
const planos = ORDEM.map((id) => GE_PLANOS.find((p) => p.id === id)!);
const MAX_ARTIGOS_ANO = Math.max(...planos.map((p) => p.artigos * 12));

export default function RetornoGE() {
  const [planoId, setPlanoId] = useState<Plano["id"]>("autoridade");
  const [valor, setValor] = useState(1500);
  const idValor = useId();
  const barras = useEntrar<HTMLDivElement>(s.entra);

  const plano = planos.find((p) => p.id === planoId)!;
  const clientes = valor > 0 ? Math.ceil(plano.preco / valor) : null;
  const sobra = clientes === 1 ? valor - plano.preco : 0;

  const colunas = [
    { nome: "Sem conteúdo", artigos: 0, id: "nenhum" as const },
    ...planos.map((p) => ({ nome: p.nome.replace("Plano ", ""), artigos: p.artigos * 12, id: p.id })),
  ];

  return (
    <article className="card-dark flex h-full flex-col p-7 md:p-9" aria-labelledby="retorno-titulo">
      <h3 id="retorno-titulo" className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-white">
        Como o investimento se paga?
      </h3>
      <p className="mt-3 max-w-[54ch] leading-relaxed text-[var(--color-fg-muted)]">
        Faça a conta com o seu número. Diga quanto entra, em média, com um cliente novo e veja
        quantos clientes por mês cobrem o plano.
      </p>

      {/* Escolha do plano */}
      <div
        role="radiogroup"
        aria-label="Plano para a conta"
        className="mt-7 grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-black/30 p-1.5"
      >
        {planos.map((p) => {
          const ativo = p.id === planoId;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={ativo}
              onClick={() => setPlanoId(p.id)}
              className={`min-h-11 cursor-pointer rounded-xl px-1 text-[12.5px] font-medium tracking-tight transition-colors duration-200 sm:px-2 sm:text-[14px] ${
                ativo ? "bg-[var(--color-brand)] text-black" : "text-white/75 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {p.nome.replace("Plano ", "")}
            </button>
          );
        })}
      </div>

      {/* Valor de um cliente */}
      <label htmlFor={idValor} className="mt-6 block text-[14.5px] font-medium text-white/85">
        Quanto entra, em média, com um cliente novo?
      </label>
      <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.04] px-4 focus-within:border-[var(--color-brand)]">
        <span className="text-[17px] font-semibold text-white/50">R$</span>
        <input
          id={idValor}
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          value={valor || ""}
          onChange={(e) => setValor(Math.max(0, Math.round(Number(e.target.value) || 0)))}
          className="min-h-[54px] w-full bg-transparent text-[22px] font-semibold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>

      {/* Resultado */}
      <div
        aria-live="polite"
        className="mt-6 rounded-2xl border border-[var(--color-brand)]/45 bg-[var(--color-brand)]/10 p-5"
      >
        {clientes === null ? (
          <p className="text-[15px] text-white/85">Digite um valor para ver a conta.</p>
        ) : (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-[clamp(2.6rem,6vw,3.4rem)] leading-none text-white">
                {clientes}
              </span>
              <span className="text-[17px] font-medium text-white">
                {clientes === 1 ? "cliente novo por mês" : "clientes novos por mês"}
              </span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">
              {clientes === 1 ? "paga" : "pagam"} o {plano.nome} ({formatarReais(plano.preco)}/mês).{" "}
              {clientes === 1
                ? sobra > 0
                  ? `E ainda sobram ${formatarReais(sobra)}. Todo cliente a mais é retorno.`
                  : "Todo cliente a mais é retorno."
                : `Do ${clientes + 1}º em diante, é retorno.`}
            </p>
          </>
        )}
      </div>

      {/* Páginas acumuladas em 12 meses */}
      <div ref={barras} className="mt-8 border-t border-white/8 pt-7">
        <p className="text-[15px] font-medium text-white">
          Páginas novas respondendo o seu cliente em 12 meses
        </p>
        <ul className="mt-5 flex flex-col gap-3" aria-label="Páginas novas em 12 meses, por plano">
          {colunas.map((c, i) => {
            const ativo = c.id === planoId;
            const largura = c.artigos === 0 ? 1.5 : Math.max(6, (c.artigos / MAX_ARTIGOS_ANO) * 100);
            return (
              <li key={c.id} className="grid grid-cols-[96px_1fr_40px] items-center gap-3">
                <span className={`text-[13.5px] ${ativo ? "font-semibold text-white" : "text-[var(--color-fg-muted)]"}`}>
                  {c.nome}
                </span>
                <span className="h-7 overflow-hidden rounded-lg bg-white/[0.04]">
                  <span
                    className={`${s.barraColuna} block h-full rounded-lg transition-colors duration-300 ${
                      ativo
                        ? "bg-[linear-gradient(90deg,#f15532,#ff7a5c)] shadow-[0_0_24px_rgba(241,85,50,0.45)]"
                        : c.artigos === 0
                          ? "bg-white/20"
                          : "bg-white/[0.16]"
                    }`}
                    style={{ width: `${largura}%`, ["--i" as string]: i }}
                  />
                </span>
                <span
                  className={`text-right font-display text-[17px] ${
                    ativo ? "text-[var(--color-brand-soft)]" : c.artigos === 0 ? "text-white/45" : "text-white"
                  }`}
                >
                  {c.artigos}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
          O anúncio pago some no dia em que o pagamento para. O artigo continua no ar, e cada mês
          soma páginas novas que trabalham por você.
        </p>
      </div>
    </article>
  );
}
