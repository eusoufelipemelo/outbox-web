"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  Palette,
  Presentation,
} from "lucide-react";
import RevealTitle from "@/components/ui/reveal-title";
import { SERVICES, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n/client";

const ICONS = {
  sistemas: Code2,
  sites: Gauge,
  branding: Palette,
  apresentacoes: Presentation,
} as const;

/** A imagem de cada frente, na mesma ordem e com o mesmo slug de SERVICES. */
const IMAGENS = {
  sistemas: "Painel de gestão sob medida aberto no monitor do escritório",
  sites: "Site com SEO e GEO aparecendo no Google e nas respostas das IAs",
  branding:
    "Designer criando identidade visual com paleta, tipografia e referências",
  apresentacoes:
    "Apresentação de negócios aberta por link no notebook e no celular",
} as const;

const TOTAL = SERVICES.length;

export default function Services() {
  const [active, setActive] = useState(0);
  const [fixado, setFixado] = useState(false);
  const { t, href } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  // Só fixa a rolagem em telas grandes e para quem não pediu menos movimento.
  useEffect(() => {
    const mqTela = window.matchMedia("(min-width: 1024px)");
    const mqMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const avaliar = () => setFixado(mqTela.matches && !mqMovimento.matches);
    avaliar();
    mqTela.addEventListener("change", avaliar);
    mqMovimento.addEventListener("change", avaliar);
    return () => {
      mqTela.removeEventListener("change", avaliar);
      mqMovimento.removeEventListener("change", avaliar);
    };
  }, []);

  // Enquanto a seção está presa na tela, a rolagem escolhe o serviço.
  useEffect(() => {
    if (!fixado) return;
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const percorrivel = el.offsetHeight - window.innerHeight;
      if (percorrivel <= 0) return;
      const andado = Math.min(Math.max(-rect.top, 0), percorrivel);
      const progresso = andado / percorrivel;
      const idx = Math.min(TOTAL - 1, Math.floor(progresso * TOTAL));
      setActive((atual) => (atual === idx ? atual : idx));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [fixado]);

  /** Clicar em um item leva a rolagem até o trecho dele. */
  const irPara = useCallback(
    (i: number) => {
      if (!fixado) {
        setActive(i);
        return;
      }
      const el = sectionRef.current;
      if (!el) return;
      const percorrivel = el.offsetHeight - window.innerHeight;
      const alvo =
        el.offsetTop +
        (percorrivel * (i + 0.5)) / TOTAL -
        window.innerHeight * 0;
      window.scrollTo({ top: alvo, behavior: "smooth" });
    },
    [fixado],
  );

  const servico = SERVICES[active];
  const Icone = ICONS[servico.slug];

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative"
      style={fixado ? { height: `${TOTAL * 100}vh` } : undefined}
    >
      {/* O título rola junto com a página; só a lista e o card ficam presos,
          para caberem inteiros na altura de um notebook. */}
      <div className="container-outbox pt-24 md:pt-32">
        <div className="max-w-[46ch] lg:max-w-[880px]">
          <span className="pill reveal">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            {t("O que fazemos")}
          </span>
          <RevealTitle
            as="h2"
            className="mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] text-white"
          >
            {t("Quatro frentes para tirar a sua empresa do lugar comum.")}
          </RevealTitle>
        </div>
      </div>

      <div
        className={
          fixado
            ? "sticky top-0 flex h-screen items-center overflow-hidden pb-6 pt-24"
            : "pb-24 md:pb-32"
        }
      >
        <div className="container-outbox w-full">
          <div
            className={`${fixado ? "" : "mt-10"} grid gap-6 lg:grid-cols-[0.85fr_1.4fr]`}
          >
            {/* Lista */}
            <div className="flex flex-col gap-2">
              {SERVICES.map((s, i) => {
                const Icon = ICONS[s.slug];
                const isActive = i === active;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => irPara(i)}
                    aria-pressed={isActive}
                    className={`group relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border text-left transition-all duration-500 ${
                      fixado ? "p-4" : "p-5"
                    } ${
                      isActive
                        ? "border-[var(--color-brand)]/45 bg-white/[0.05]"
                        : "border-white/8 bg-transparent hover:border-white/16 hover:bg-white/[0.025]"
                    }`}
                  >
                    {/* Barra de progresso do item ativo */}
                    {fixado && isActive && (
                      <span
                        aria-hidden
                        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--color-brand)]"
                      />
                    )}
                    <span
                      className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                        isActive
                          ? "bg-[var(--color-brand)] text-white"
                          : "bg-white/6 text-[var(--color-fg-muted)] group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="flex-1">
                      <span
                        className={`font-display text-xs tracking-widest ${
                          isActive
                            ? "text-[var(--color-brand)]"
                            : "text-[var(--color-fg-subtle)]"
                        }`}
                      >
                        {s.number}
                      </span>
                      <span
                        className={`mt-1 block font-display text-[19px] leading-snug transition-colors duration-500 ${
                          isActive ? "text-white" : "text-white/75"
                        }`}
                      >
                        {t(s.name)}
                      </span>
                      <span className="mt-1 block text-[13.5px] text-[var(--color-fg-subtle)]">
                        {t(s.tagline)}
                      </span>
                    </span>
                  </button>
                );
              })}
              {/* Com a seção presa, o resultado sobe para baixo da lista e
                  a imagem do card ganha essa altura (o quanto a tela deixar). */}
              {fixado && (
                <div key={servico.slug} className="animate-troca">
                  <Resultado texto={t(servico.outcome)} titulo={t("O resultado")} className="" />
                </div>
              )}
            </div>

            {/* Detalhe: troca com a rolagem */}
            <div className="card-dark relative overflow-hidden p-5 md:p-6">
              {/* As quatro imagens ficam carregadas e trocam por opacidade,
                  para não piscar quando a rolagem muda de frente. */}
              <div
                className={`relative overflow-hidden rounded-2xl border border-white/10 ${
                  fixado
                    ? "h-[clamp(170px,calc(100svh-550px),320px)]"
                    : "h-[240px] md:h-[320px]"
                }`}
              >
                {SERVICES.map((s, i) => (
                  <Image
                    key={s.slug}
                    src={`/img/servicos/${s.slug}.webp`}
                    alt={i === active ? t(IMAGENS[s.slug]) : ""}
                    aria-hidden={i !== active}
                    fill
                    sizes="(max-width: 1024px) 100vw, 660px"
                    className={`object-cover transition-opacity duration-700 ${
                      i === active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent"
                />
                <h3
                  key={servico.slug}
                  className="animate-troca absolute inset-x-5 bottom-4 font-display text-[clamp(1.45rem,2.4vw,2rem)] leading-tight text-white md:inset-x-6"
                >
                  {t(servico.name)}
                </h3>
                <span className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl bg-black/55 backdrop-blur-sm">
                  <Icone
                    className="h-5 w-5 text-[var(--color-brand)]"
                    strokeWidth={2}
                  />
                </span>
              </div>

              <div
                key={servico.slug}
                className="animate-troca relative z-10 px-3 pb-3 md:px-4 md:pb-4"
              >
                <p className="mt-5 max-w-[58ch] leading-relaxed text-[var(--color-fg-muted)]">
                  {t(servico.description)}
                </p>

                <ul className="mt-7 grid lg:mt-5 gap-3 sm:grid-cols-2">
                  {servico.bullets.map((b) => (
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
                      {t(b)}
                    </li>
                  ))}
                </ul>

                {!fixado && <Resultado texto={t(servico.outcome)} titulo={t("O resultado")} />}

                <div className="mt-7 flex flex-wrap gap-3 lg:mt-5">
                  <Link
                    href={href("/#contato")}
                    className="borda-viva group flex cursor-pointer items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[14.5px] font-medium text-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(255,255,255,0.14)]"
                  >
                    {t("Quero este serviço")}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.4}
                    />
                  </Link>
                  <a
                    href={whatsappLink(servico.name, t)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer rounded-full border border-white/14 px-5 py-3 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
                  >
                    {t("Tirar dúvida no WhatsApp")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Passos: mostra onde a pessoa está na sequência */}
          {fixado && (
            <div
              className="mt-5 flex items-center justify-center gap-2"
              aria-hidden
            >
              {SERVICES.map((s, i) => (
                <span
                  key={s.slug}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-10 bg-[var(--color-brand)]"
                      : "w-5 bg-white/15"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Resultado({
  texto,
  titulo,
  className = "mt-7 lg:mt-5",
}: {
  texto: string;
  titulo: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--color-brand)]/25 bg-[var(--color-brand)]/8 p-5 ${className}`}
    >
      <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand)]">
        {titulo}
      </span>
      <p className="mt-1.5 text-[15.5px] text-white">{texto}</p>
    </div>
  );
}
