"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const PALAVRA = "DIGITAL";

const NUMEROS = [
  { valor: "250+", rotulo: "Projetos entregues" },
  { valor: "15 anos", rotulo: "De estrada em criação" },
  { valor: "500+", rotulo: "Clientes atendidos" },
];

const FRENTES = [
  "Sistemas Personalizados",
  "Sites com SEO e GEO",
  "Branding",
  "Apresentações em link",
];

/* Abertura do layout v3: "©2026 / AGÊNCIA", a palavra gigante em degradê
   e a faixa larga com o retrato do Felipe, como a foto da referência.
   O retrato é vertical; para ocupar a largura toda sem distorcer, o fundo
   da faixa é a própria foto ampliada e desfocada, e a foto nítida entra
   no centro com as bordas esmaecidas. */
export default function Hero() {
  const faixa = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: faixa, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduzir ? ["0%", "0%"] : ["-9%", "9%"]);

  return (
    <section className="relative bg-[var(--color-creme)] pt-[96px] md:pt-[108px]">
      <div className="container-outbox">
        <div className="flex items-end justify-between text-[clamp(1.05rem,2.2vw,2rem)] font-bold leading-none">
          <span>©2026</span>
          <span>AGÊNCIA</span>
        </div>

        {/* Palavra gigante: decorativa, o título da página é o h1 da faixa */}
        <div aria-hidden className="mt-3 overflow-hidden pb-[1.5cqw] [container-type:inline-size] md:mt-4">
          <div className="flex justify-between font-[family-name:var(--font-anton)] text-[33.2cqw] leading-[0.86] select-none">
            {PALAVRA.split("").map((l, i) => (
              <span key={i} className="v3-letra" style={{ ["--i" as string]: i }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Faixa com o retrato */}
      <div
        ref={faixa}
        className="relative mt-6 h-[clamp(620px,58vw,760px)] overflow-hidden bg-[#c2340f] text-white md:mt-8"
      >
        <Image
          src="/img/felipe-retrato.jpg"
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="scale-[1.35] object-cover object-[50%_30%] blur-[38px] saturate-[1.15]"
        />
        <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[12%]">
          <div
            className="relative mx-auto h-full w-[min(100%,980px)]"
            style={{
              maskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 22%, #000 78%, transparent 100%)",
            }}
          >
            <Image
              src="/img/felipe-retrato.jpg"
              alt="Felipe Melo, fundador da OutBox Group, em retrato com fundo laranja"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 980px"
              className="object-cover object-[50%_24%]"
            />
          </div>
        </motion.div>

        {/* Sombras para o texto ler bem em cima da foto */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />

        <div className="container-outbox relative z-10 flex h-full flex-col justify-between py-8 md:py-10">
          <dl className="grid grid-cols-3 gap-4">
            {NUMEROS.map((n, i) => (
              <div
                key={n.valor}
                className={`flex flex-col-reverse ${i === 1 ? "items-center text-center" : i === 2 ? "items-end text-right" : ""}`}
              >
                <dt className="mt-1 text-[13px] text-white/85 md:text-[15px]">{n.rotulo}</dt>
                <dd className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold leading-none">{n.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[560px]">
              <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.03em]">
                Sua marca no digital, feita para vender e para ser encontrada.
              </h1>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/#contato" className="v3-btn v3-btn--claro">
                  Começar meu projeto
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </Link>
                <Link href="/#servicos" className="v3-btn v3-btn--contorno">
                  Ver o que fazemos
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </Link>
              </div>
            </div>

            <ul className="flex max-w-[360px] flex-wrap gap-2 md:justify-end" aria-label="O que fazemos">
              {FRENTES.map((f) => (
                <li key={f}>
                  <Link
                    href="/#servicos"
                    className="inline-flex min-h-11 items-center rounded-full border border-white/70 px-3.5 text-[13.5px] font-medium backdrop-blur-sm transition-colors hover:bg-white hover:text-[var(--color-breu)]"
                  >
                    {f}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <FaixaServicos />
    </section>
  );
}

const ITENS_FAIXA = [
  "Sistemas Personalizados",
  "Sites com Performance",
  "SEO e GEO",
  "Blog com painel próprio",
  "Branding",
  "Apresentações em link",
  "Google Empresas",
];

/* Faixa que corre embaixo da foto, com barra laranja entre os itens */
function FaixaServicos() {
  const lista = [...ITENS_FAIXA, ...ITENS_FAIXA];
  return (
    <div className="overflow-hidden border-b border-[var(--color-borda)] bg-[var(--color-creme)] py-5">
      <div className="v3-faixa" style={{ ["--dur" as string]: "46s" }} aria-hidden>
        {lista.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-3 border-r border-[var(--color-borda)] px-8 text-[15px] font-medium uppercase tracking-[0.06em] text-[#3a3a3a] whitespace-nowrap"
          >
            <span className="text-[var(--color-brand)]">/</span>
            {t}
          </span>
        ))}
      </div>
      <p className="sr-only">
        Sistemas personalizados, sites com performance, SEO e GEO, blog com painel próprio,
        branding, apresentações em link e Google Empresas.
      </p>
    </div>
  );
}
