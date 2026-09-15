"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { PROVA } from "./conteudo";
import { cn } from "./util";

/* Autoavaliação. Corrige na hora e aponta o módulo de volta, porque o objetivo
   não é dar nota, é mandar o consultor reler a parte que ainda não domina. */
export function Quiz() {
  const [i, setI] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [errados, setErrados] = useState<string[]>([]);
  const [fim, setFim] = useState(false);

  const q = PROVA.questoes[i];
  const total = PROVA.questoes.length;

  const responder = (n: number) => {
    if (escolha !== null) return;
    setEscolha(n);
    if (n === q.certa) setAcertos((a) => a + 1);
    else setErrados((e) => (e.includes(q.modulo) ? e : [...e, q.modulo]));
  };

  const seguir = () => {
    if (i + 1 >= total) setFim(true);
    else {
      setI(i + 1);
      setEscolha(null);
    }
  };

  const recomecar = () => {
    setI(0);
    setEscolha(null);
    setAcertos(0);
    setErrados([]);
    setFim(false);
  };

  if (fim) {
    const r = acertos >= 5 ? PROVA.resultados.alto : acertos >= 3 ? PROVA.resultados.medio : PROVA.resultados.baixo;
    return (
      <div className="mt-8 rounded-[18px] bg-white/6 p-7 text-center ring-1 ring-white/12 sm:p-10">
        <p className="text-[13px] font-semibold tracking-[0.14em] text-white/50 uppercase">Seu resultado</p>
        <p className="mt-3 text-[56px] leading-none font-bold tracking-[-.04em] text-white tabular-nums">
          {acertos}
          <span className="text-[26px] text-white/40">/{total}</span>
        </p>
        <h3 className="mt-5 font-sans text-[24px] leading-[1.2] font-bold tracking-[-.02em] text-[#ff8f6e]">{r.titulo}</h3>
        <p className="mx-auto mt-3 max-w-[46ch] text-[16px] leading-[1.6] text-white/70">{r.texto}</p>

        {errados.length > 0 && (
          <div className="mx-auto mt-7 max-w-[42ch] rounded-[14px] bg-white/6 px-5 py-4">
            <p className="text-[13px] font-semibold tracking-[0.12em] text-white/50 uppercase">Volte nestes módulos</p>
            <p className="mt-2 text-[16px] font-semibold text-white">{errados.join(" · ")}</p>
          </div>
        )}

        <button
          type="button"
          onClick={recomecar}
          className="mt-8 inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[11px] bg-white px-7 text-[16px] font-semibold text-tinta transition-colors duration-200 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none"
        >
          <RotateCcw size={17} />
          Refazer a autoavaliação
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-[18px] bg-white/6 ring-1 ring-white/12">
      <div className="flex items-center gap-4 border-b border-white/12 px-6 py-4 sm:px-7">
        <p className="shrink-0 text-[13px] font-semibold text-white/50 tabular-nums">
          {i + 1} de {total}
        </p>
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <i
            className="block h-full rounded-full bg-marca transition-[width] duration-300"
            style={{ width: ((i + (escolha !== null ? 1 : 0)) / total) * 100 + "%" }}
          />
        </div>
      </div>

      <div className="px-6 py-7 sm:px-7">
        <h3 className="font-sans text-[21px] leading-[1.3] font-bold tracking-[-.02em] text-white">{q.pergunta}</h3>

        <div className="mt-6 flex flex-col gap-2.5">
          {q.opcoes.map((o, n) => {
            const respondida = escolha !== null;
            const eCerta = n === q.certa;
            const eEscolhida = n === escolha;
            return (
              <button
                key={o}
                type="button"
                onClick={() => responder(n)}
                disabled={respondida}
                className={cn(
                  "flex min-h-[56px] w-full items-center gap-3 rounded-[12px] px-4 py-3 text-left text-[16px] leading-[1.45] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none",
                  !respondida && "cursor-pointer bg-white/8 text-white hover:bg-white/14",
                  respondida && eCerta && "bg-[#1d5c3a] text-white ring-1 ring-[#4ade80]/40",
                  respondida && eEscolhida && !eCerta && "bg-[#5c1d1d] text-white ring-1 ring-[#f87171]/40",
                  respondida && !eCerta && !eEscolhida && "bg-white/5 text-white/40"
                )}
              >
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-[13px] font-bold",
                    !respondida && "bg-white/12 text-white/70",
                    respondida && eCerta && "bg-[#4ade80] text-[#0c2e1c]",
                    respondida && eEscolhida && !eCerta && "bg-[#f87171] text-[#3a0c0c]",
                    respondida && !eCerta && !eEscolhida && "bg-white/8 text-white/30"
                  )}
                >
                  {respondida && eCerta ? <Check size={15} /> : respondida && eEscolhida ? <X size={15} /> : String.fromCharCode(65 + n)}
                </span>
                {o}
              </button>
            );
          })}
        </div>

        <div aria-live="polite">
          {escolha !== null && (
            <div className="mt-6 rounded-[14px] bg-white/8 px-5 py-4">
              <p className="text-[12.5px] font-semibold tracking-[0.12em] text-[#ff8f6e] uppercase">
                {escolha === q.certa ? "Isso mesmo" : `Não é essa. Reveja o ${q.modulo}`}
              </p>
              <p className="mt-2 text-[15.5px] leading-[1.6] text-white/75">{q.porque}</p>
            </div>
          )}
        </div>

        {escolha !== null && (
          <button
            type="button"
            onClick={seguir}
            className="mt-6 inline-flex min-h-[52px] cursor-pointer items-center justify-center rounded-[11px] bg-marca px-7 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-marca-clara focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {i + 1 >= total ? "Ver meu resultado" : "Próxima pergunta"}
          </button>
        )}
      </div>
    </div>
  );
}
