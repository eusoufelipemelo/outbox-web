"use client";

import { useEffect, useState } from "react";
import { List, X } from "lucide-react";
import { INDICE } from "./conteudo";
import { cn } from "./util";

/* Índice do material. Num material de estudo o caminho inteiro precisa estar
   à vista: o leitor volta a módulos específicos, não lê de cabo a rabo uma
   vez só. No desktop vira trilho fixo; no celular, barra no topo com folha. */
export function Indice() {
  const [ativo, setAtivo] = useState(INDICE[0].id);
  const [aberto, setAberto] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    const secoes = INDICE.map((m) => document.getElementById(m.id)).filter(Boolean) as HTMLElement[];
    if (!secoes.length) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        // o módulo "atual" é o que está mais acima dentro da faixa de leitura
        const visiveis = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visiveis[0]) setAtivo(visiveis[0].target.id);
      },
      { rootMargin: "-12% 0px -70% 0px" }
    );
    secoes.forEach((s) => obs.observe(s));

    const aoRolar = () => {
      const alcance = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(alcance > 0 ? Math.min(100, (window.scrollY / alcance) * 100) : 0);
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", aoRolar);
    };
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fecha = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fecha);
    return () => window.removeEventListener("keydown", fecha);
  }, [aberto]);

  const atual = INDICE.find((m) => m.id === ativo) ?? INDICE[0];

  return (
    <>
      {/* trilho do desktop */}
      <nav
        aria-label="Módulos do material"
        className="fixed top-0 left-0 z-40 hidden h-screen w-[248px] flex-col border-r border-linha bg-superficie px-6 py-8 lg:flex"
      >
        <a href="/" className="inline-flex min-h-[44px] cursor-pointer items-center" aria-label="Ir para o site da OutBox">
          <img src="/brand/logo-outbox-black.svg" alt="OutBox Group" className="h-[22px] w-auto" />
        </a>
        <p className="mt-8 text-[11.5px] font-semibold tracking-[0.16em] text-mudo uppercase">
          Material de estudo
        </p>
        <ol className="trilho-modulos mt-4 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
          {INDICE.map((m) => {
            const on = m.id === ativo;
            return (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  aria-current={on ? "true" : undefined}
                  className={cn(
                    "flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[14px] leading-[1.35] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none",
                    on ? "bg-marca-tenue font-semibold text-marca-tinta" : "text-mudo hover:bg-elevado hover:text-corpo"
                  )}
                >
                  <span className={cn("w-4 shrink-0 text-[12px] tabular-nums", on ? "text-marca-tinta" : "text-mudo")}>
                    {m.n}
                  </span>
                  {m.nome}
                </a>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 shrink-0">
          <div className="h-1 overflow-hidden rounded-full bg-elevado">
            <i className="block h-full rounded-full bg-marca transition-[width] duration-200" style={{ width: progresso + "%" }} />
          </div>
          <p className="mt-2 text-[12px] text-mudo">{Math.round(progresso)}% lido</p>
        </div>
      </nav>

      {/* barra do celular */}
      <div className="sticky top-0 z-40 border-b border-linha bg-superficie/95 backdrop-blur-sm lg:hidden">
        <div className="h-[3px] bg-elevado">
          <i className="block h-full bg-marca transition-[width] duration-200" style={{ width: progresso + "%" }} />
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5">
          <img src="/brand/logo-outbox-black.svg" alt="OutBox Group" className="h-[18px] w-auto shrink-0" />
          <p className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-corpo">
            <span className="text-mudo">{atual.n}.</span> {atual.nome}
          </p>
          <button
            type="button"
            onClick={() => setAberto(true)}
            aria-label="Abrir o índice dos módulos"
            className="flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-1.5 rounded-[10px] px-2 text-[13.5px] font-semibold text-marca-tinta transition-colors duration-200 hover:bg-marca-tenue focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {aberto && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Fechar o índice"
            onClick={() => setAberto(false)}
            className="absolute inset-0 cursor-pointer bg-black/45"
          />
          <nav
            aria-label="Módulos do material"
            className="absolute inset-x-0 top-0 max-h-[85vh] overflow-y-auto rounded-b-[22px] bg-superficie px-5 pt-5 pb-7 shadow-[0_24px_60px_rgba(0,0,0,.25)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-mudo uppercase">Módulos</p>
              <button
                type="button"
                onClick={() => setAberto(false)}
                aria-label="Fechar o índice"
                className="flex size-11 cursor-pointer items-center justify-center rounded-full text-mudo transition-colors duration-200 hover:bg-elevado hover:text-tinta focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none"
              >
                <X size={19} />
              </button>
            </div>
            <ol className="mt-3 flex flex-col">
              {INDICE.map((m) => (
                <li key={m.id}>
                  <a
                    href={`#${m.id}`}
                    onClick={() => setAberto(false)}
                    className={cn(
                      "flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[10px] px-3 text-[15.5px] transition-colors duration-200",
                      m.id === ativo ? "bg-marca-tenue font-semibold text-marca-tinta" : "text-corpo hover:bg-elevado"
                    )}
                  >
                    <span className="w-5 shrink-0 text-[13px] tabular-nums text-mudo">{m.n}</span>
                    {m.nome}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
    </>
  );
}
