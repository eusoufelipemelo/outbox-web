"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { MapPin, Star, Sparkles, ArrowDown } from "lucide-react";
import { AGENCIA, BUSCA_DEMO, CAPA } from "./conteudo";
import { Botao, Rotulo, Titulo, cn } from "./base";

/* A janela do hero é o argumento inteiro em forma visual: a mesma procura
   acontecendo nas duas portas de entrada, e nas duas a empresa do cliente
   ausente. Alterna sozinha, mas o visitante pode assumir o controle. */
export function Hero() {
  const [aba, setAba] = useState<"google" | "ia">("google");
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (manual) return;
    // quem pediu menos movimento no sistema não recebe a troca sozinha:
    // as duas telas continuam acessíveis pelos botões
    const calmo = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (calmo) return;
    const t = setInterval(() => setAba((a) => (a === "google" ? "ia" : "google")), 5200);
    return () => clearInterval(t);
  }, [manual]);

  const trocar = (a: "google" | "ia") => {
    setManual(true);
    setAba(a);
  };

  return (
    <header className="relative overflow-hidden bg-papel px-6 pt-8 pb-24 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[420px] right-[-260px] size-[900px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(241,85,50,.16), rgba(241,85,50,0) 66%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <nav className="flex items-center justify-between gap-4">
          <img src="/brand/logo-outbox-black.svg" alt={AGENCIA.nome} className="h-[26px] w-auto" />
          <span className="hidden text-[14px] text-mudo sm:block">{AGENCIA.siteRotulo}</span>
        </nav>

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <Rotulo>{CAPA.selo}</Rotulo>
            <Titulo as="h1" className="mt-7 text-tinta">
              {CAPA.titulo}
              <br />
              <span className="text-marca">{CAPA.destaque}</span>
            </Titulo>
            <p className="mt-6 max-w-[54ch] text-[19px] leading-[1.62] text-suave">{CAPA.linha}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Botao href="#simulador">
                {CAPA.cta}
                <ArrowDown size={17} />
              </Botao>
              <Botao href={AGENCIA.whats} variante="contorno">
                Falar com a OutBox
              </Botao>
            </div>
          </div>

          <JanelaBusca aba={aba} trocar={trocar} />
        </div>
      </div>
    </header>
  );
}

function JanelaBusca({ aba, trocar }: { aba: "google" | "ia"; trocar: (a: "google" | "ia") => void }) {
  return (
    <div className="rounded-[24px] bg-superficie p-3 shadow-[0_28px_70px_rgba(20,14,10,.13)] ring-1 ring-linha">
      <div className="flex gap-1.5 rounded-[14px] bg-elevado p-1.5" role="tablist" aria-label="Onde o cliente procura">
        {(
          [
            { id: "google", nome: "No Google", icone: MapPin },
            { id: "ia", nome: "Numa IA", icone: Sparkles },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={aba === t.id}
            onClick={() => trocar(t.id)}
            className={cn(
              "flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[10px] text-[14.5px] font-semibold transition-colors duration-200",
              aba === t.id ? "bg-superficie text-tinta shadow-sm" : "text-mudo hover:text-corpo"
            )}
          >
            <t.icone size={16} />
            {t.nome}
          </button>
        ))}
      </div>

      <div className="relative min-h-[430px] px-4 pt-5 pb-4">
        <AnimatePresence mode="wait">
          {aba === "google" ? (
            <motion.div
              key="g"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2.5"
            >
              <Consulta texto={BUSCA_DEMO.termo} />
              {BUSCA_DEMO.google.map((f, i) => (
                <div key={f.nome} className="flex items-center gap-3 rounded-[13px] bg-superficie p-3.5 ring-1 ring-linha">
                  <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-elevado text-[14px] font-bold text-mudo">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15.5px] font-semibold text-corpo">{f.nome}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-mudo">
                      <Star size={12} className="fill-[#f5a623] text-[#f5a623]" />
                      {f.nota} · {f.avaliacoes} · {f.tag}
                    </p>
                  </div>
                </div>
              ))}
              <Ausente />
            </motion.div>
          ) : (
            <motion.div
              key="i"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Consulta texto={BUSCA_DEMO.ia.pergunta} />
              <div className="mt-2.5 rounded-[13px] bg-elevado p-4 ring-1 ring-linha">
                <p className="text-[15px] leading-[1.6] text-corpo">{BUSCA_DEMO.ia.resposta}</p>
                <ul className="mt-3 flex flex-col gap-2">
                  {BUSCA_DEMO.ia.citadas.map((n, i) => (
                    <li key={n} className="flex items-center gap-2.5 text-[15px] font-semibold text-corpo">
                      <span className="text-mudo">{i + 1}.</span>
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-linha pt-3 text-[12.5px] text-mudo">{BUSCA_DEMO.ia.rodape}</p>
              </div>
              <div className="mt-2.5">
                <Ausente />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Consulta({ texto }: { texto: string }) {
  return (
    <div className="mb-3 flex items-center gap-2.5 rounded-full bg-elevado px-4 py-3 text-[14.5px] text-mudo ring-1 ring-linha">
      <span className="size-2 shrink-0 rounded-full bg-marca" />
      <span className="truncate">{texto}</span>
    </div>
  );
}

function Ausente() {
  return (
    <div className="flex items-center gap-3 rounded-[13px] border border-dashed border-[#f1553288] bg-marca-tenue p-3.5">
      <span className="grid size-9 shrink-0 place-items-center rounded-[9px] bg-white text-[15px] font-bold text-marca-tinta ring-1 ring-[#f1553244]">
        ?
      </span>
      <div className="min-w-0">
        <p className="text-[15.5px] font-semibold text-marca-tinta">{BUSCA_DEMO.ausente}</p>
        <p className="mt-0.5 text-[13px] text-[#8a4b33]">Não apareceu nesta busca</p>
      </div>
    </div>
  );
}
