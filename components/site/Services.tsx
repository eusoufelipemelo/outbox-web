"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, whatsappLink, type Service } from "@/lib/site";

/* Imagens reais de trabalhos da OutBox. Sistemas e Branding não têm foto
   própria no site, então ganham um quadro desenhado em código. */
function Visual({ slug }: { slug: Service["slug"] }) {
  if (slug === "sites" || slug === "apresentacoes") {
    const src = slug === "sites" ? "/img/proj-rap.jpg" : "/img/proj-revolucao.jpg";
    const alt =
      slug === "sites"
        ? "Página de vendas criada pela OutBox para o programa RAP"
        : "Página da imersão A Revolução, criada pela OutBox";
    return (
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 520px" className="object-cover object-top" />
    );
  }
  if (slug === "branding") return <QuadroMarcas />;
  return <QuadroPainel />;
}

/* Painel de gestão em modo escuro, só com formas: representa um sistema sob medida. */
function QuadroPainel() {
  const barras = [42, 68, 54, 82, 61, 90, 74];
  return (
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_100%_0%,#f15532_0%,#b8330f_45%,#000000_80%)] p-6 md:p-8">
      <div className="flex h-full flex-col gap-3 rounded-[16px] border border-white/12 bg-[#1f1f1f]/85 p-4 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-3 h-2 w-24 rounded-full bg-white/15" />
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-[10px] bg-white/[0.06] p-3">
              <span className="block h-1.5 w-10 rounded-full bg-white/25" />
              <span className={`mt-2.5 block h-3.5 rounded-full ${i === 1 ? "w-14 bg-[#f15532]" : "w-12 bg-white/70"}`} />
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-2 rounded-[10px] bg-white/[0.04] p-3">
          {barras.map((h, i) => (
            <span
              key={i}
              className={`flex-1 rounded-t-[4px] ${i === 5 ? "bg-[#f15532]" : "bg-white/20"}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="space-y-2">
          {[78, 64, 52].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-white/12" />
              <span className="h-1.5 rounded-full bg-white/20" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Marcas de clientes reais em azulejos: o trabalho de branding da OutBox. */
function QuadroMarcas() {
  const logos = [
    "/img/logo-jonas.svg",
    "/img/logo-patricia.svg",
    "/img/logo-alexandre.svg",
    "/img/logo-michelle.svg",
    "/img/logo-nicoli.png",
    "/img/logo-fabricio.png",
  ];
  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-2 bg-[var(--color-brand)] p-2">
      {logos.map((src) => (
        <div key={src} className="relative flex items-center justify-center rounded-[12px] bg-[#ffffff]">
          <Image src={src} alt="" width={80} height={80} className="h-[42%] w-auto object-contain" />
        </div>
      ))}
      <span className="sr-only">Marcas de clientes desenvolvidas pela OutBox</span>
    </div>
  );
}

function Cartao({
  s,
  i,
  total,
  p,
  reduzir,
}: {
  s: Service;
  i: number;
  total: number;
  p: MotionValue<number>;
  reduzir: boolean;
}) {
  // O cartão de baixo encolhe um pouco quando o próximo passa por cima.
  const alvo = 1 - (total - 1 - i) * 0.035;
  const scale = useTransform(p, [i / total, 1], reduzir ? [1, 1] : [1, alvo]);

  return (
    <div className="md:sticky md:pb-6" style={{ top: `${96 + i * 22}px` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="grid overflow-hidden rounded-[24px] border border-[var(--color-borda)] bg-[#ffffff] shadow-[0_-12px_40px_-24px_rgba(0,0,0,0.25)] md:grid-cols-[1.05fr_1fr]"
      >
        <div className="flex flex-col p-7 md:p-10">
          <p className="text-[14px] font-medium text-[var(--color-cinza)]">
            {s.number} · {s.tagline}
          </p>
          <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,2.15rem)] font-bold leading-[1.08] tracking-[-0.025em]">
            {s.name}
          </h3>
          <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--color-cinza)]">{s.description}</p>

          <div className="mt-6 border-t border-[var(--color-borda)] pt-5">
            <p className="text-[13px] font-medium text-[var(--color-cinza)]">O resultado</p>
            <p className="v3-chip mt-2 !text-[15.5px] !font-semibold">{s.outcome}</p>
          </div>

          <div className="mt-5 border-t border-[var(--color-borda)] pt-5">
            <p className="text-[13px] font-medium text-[var(--color-cinza)]">Inclui</p>
            <ul className="mt-2 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
              {s.bullets.map((b) => (
                <li key={b} className="v3-chip !text-[14.5px]">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#contato" className="v3-btn">
              Quero este serviço
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </Link>
            <a
              href={whatsappLink(s.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="v3-btn v3-btn--contorno !border-[var(--color-borda)] hover:!bg-white"
            >
              Tirar dúvida no WhatsApp
            </a>
          </div>
        </div>
        <div className="relative min-h-[260px] overflow-hidden md:m-3 md:min-h-0 md:rounded-[18px]">
          <Visual slug={s.slug} />
        </div>
      </motion.article>
    </div>
  );
}

/* Serviços em cartões empilhados: cada um fica preso no topo e o seguinte
   passa por cima, então a página só segue depois do 04. No celular viram
   uma lista comum. */
export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="servicos" className="scroll-mt-16 bg-[var(--color-creme)] pb-24 pt-8 md:pb-32">
      <div className="container-outbox">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="v3-titulo">Quatro frentes para tirar a sua empresa do lugar comum.</h2>
          <p className="v3-sub mx-auto mt-4 max-w-[46ch]">O que fazemos</p>
        </div>

        <div ref={ref} className="mt-14 flex flex-col gap-6 md:gap-[18vh]">
          {SERVICES.map((s, i) => (
            <Cartao key={s.slug} s={s} i={i} total={SERVICES.length} p={scrollYProgress} reduzir={reduzir} />
          ))}
        </div>
      </div>
    </section>
  );
}
