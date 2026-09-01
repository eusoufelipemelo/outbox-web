"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  Palette,
  Presentation,
} from "lucide-react";
import { SERVICES } from "@/lib/site";
import { whatsappLink } from "@/lib/site";

const ICONS = {
  sistemas: Code2,
  sites: Gauge,
  branding: Palette,
  apresentacoes: Presentation,
} as const;

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow glow--brand absolute -left-40 top-1/3 h-[440px] w-[440px]" />
      </div>

      <div className="container-outbox relative z-10">
        <div className="max-w-[46ch]">
          <span className="pill reveal">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            O que fazemos
          </span>
          <h2 className="reveal-words mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] text-white">
            Quatro frentes para tirar a sua empresa do lugar comum.
          </h2>
          <p className="reveal mt-5 text-[17px] leading-relaxed text-[var(--color-fg-muted)]">
            Cada projeto começa entendendo onde está o gargalo do seu negócio.
            Depois a gente escolhe a ferramenta certa, não a mais cara.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.4fr]">
          {/* Lista de serviços */}
          <div className="reveal flex flex-col gap-2 lg:sticky lg:top-28 lg:self-start">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.slug];
              const isActive = i === active;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group flex cursor-pointer items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[var(--color-brand)]/45 bg-white/[0.05]"
                      : "border-white/8 bg-transparent hover:border-white/16 hover:bg-white/[0.025]"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      isActive
                        ? "bg-[var(--color-brand)] text-white"
                        : "bg-white/6 text-[var(--color-fg-muted)] group-hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={`font-display text-xs tracking-widest ${
                          isActive
                            ? "text-[var(--color-brand)]"
                            : "text-[var(--color-fg-subtle)]"
                        }`}
                      >
                        {s.number}
                      </span>
                    </span>
                    <span
                      className={`mt-1 block font-display text-[19px] leading-snug transition-colors ${
                        isActive ? "text-white" : "text-white/75"
                      }`}
                    >
                      {s.name}
                    </span>
                    <span className="mt-1 block text-[13.5px] text-[var(--color-fg-subtle)]">
                      {s.tagline}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detalhe do serviço ativo */}
          <div className="reveal card-dark relative overflow-hidden p-8 md:p-10">
            <div
              aria-hidden
              className="glow glow--brand absolute -right-24 -top-24 h-64 w-64"
            />
            <div className="relative z-10">
              <span className="font-display text-6xl leading-none text-white/8">
                {SERVICES[active].number}
              </span>

              <h3 className="mt-4 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight text-white">
                {SERVICES[active].name}
              </h3>

              <p className="mt-4 max-w-[58ch] leading-relaxed text-[var(--color-fg-muted)]">
                {SERVICES[active].description}
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {SERVICES[active].bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-[14.5px] text-white/85"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
                      <Check
                        className="h-3 w-3 text-[var(--color-brand)]"
                        strokeWidth={3}
                      />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-2xl border border-[var(--color-brand)]/25 bg-[var(--color-brand)]/8 p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">
                  O resultado
                </span>
                <p className="mt-1.5 text-[15.5px] text-white">
                  {SERVICES[active].outcome}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#contato"
                  className="group flex cursor-pointer items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[14.5px] font-medium text-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(255,255,255,0.14)]"
                >
                  Quero este serviço
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.4}
                  />
                </Link>
                <a
                  href={whatsappLink(SERVICES[active].name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-full border border-white/14 px-5 py-3 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
                >
                  Tirar dúvida no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
