"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { FAQ } from "@/lib/site";

type Item = { readonly q: string; readonly a: string };

/**
 * Perguntas frequentes no layout v3: linhas brancas e a aberta em laranja.
 * Sem props, mostra as da home; outras páginas passam as próprias perguntas.
 * As respostas ficam no HTML mesmo fechadas, então o Google e as IAs leem tudo.
 */
export default function Faq({
  items = FAQ,
  titulo = "Perguntas que sempre chegam por aqui.",
  rotulo = "Dúvidas frequentes",
  texto = "Se a sua dúvida não estiver na lista, é só chamar no WhatsApp que a gente responde de verdade, sem robô.",
  tituloComo = "h2",
}: {
  items?: readonly Item[];
  titulo?: string;
  rotulo?: string;
  texto?: string;
  tituloComo?: "h2" | "h3";
  /** Mantido por compatibilidade: o título já nasce como texto. */
  animarTitulo?: boolean;
} = {}) {
  const [aberto, setAberto] = useState<number | null>(0);
  const Titulo = tituloComo;

  return (
    <section className="bg-[var(--color-creme)] py-24 md:py-32">
      <div className="container-outbox">
        <div className="mx-auto max-w-[720px] text-center">
          <Titulo className="v3-titulo">{titulo}</Titulo>
          <p className="v3-sub mx-auto mt-4 max-w-[52ch]">
            <span className="sr-only">{rotulo}: </span>
            {texto}
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-[860px] flex-col gap-2.5">
          {items.map((item, i) => {
            const on = aberto === i;
            return (
              <div
                key={item.q}
                className={`overflow-hidden rounded-[16px] transition-colors duration-300 ${
                  on ? "bg-[var(--color-brand)]" : "bg-white"
                }`}
              >
                <button
                  type="button"
                  id={`faq-q-${i}`}
                  onClick={() => setAberto(on ? null : i)}
                  aria-expanded={on}
                  aria-controls={`faq-a-${i}`}
                  className="flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-5 px-5 py-4 text-left md:px-6"
                >
                  <span className="text-[16.5px] font-semibold leading-snug text-[var(--color-breu)]">{item.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      on ? "bg-white text-[var(--color-breu)]" : "bg-[var(--color-breu)] text-white"
                    }`}
                    aria-hidden
                  >
                    {on ? <Minus className="h-4 w-4" strokeWidth={2.6} /> : <Plus className="h-4 w-4" strokeWidth={2.6} />}
                  </span>
                </button>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-6 text-[15.5px] leading-relaxed text-[var(--color-breu)]/85 md:px-6 md:pr-16">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
