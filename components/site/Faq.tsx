"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="pill reveal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              Dúvidas frequentes
            </span>
            <h2 className="reveal-words mt-6 max-w-[16ch] font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white">
              Perguntas que sempre chegam por aqui.
            </h2>
            <p className="reveal mt-5 max-w-[42ch] leading-relaxed text-[var(--color-fg-muted)]">
              Se a sua dúvida não estiver na lista, é só chamar no WhatsApp que
              a gente responde de verdade, sem robô.
            </p>
          </div>

          <div className="reveal flex flex-col gap-3">
            {FAQ.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={item.q}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-[var(--color-brand)]/40 bg-white/[0.045]"
                      : "border-white/8 bg-white/[0.02] hover:border-white/16"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 p-6 text-left"
                  >
                    <span className="font-display text-[17px] leading-snug text-white">
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-[var(--color-brand)] bg-[var(--color-brand)] text-white"
                          : "border-white/16 text-white/70"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-400 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
