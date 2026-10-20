"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

type Depo = (typeof TESTIMONIALS)[number];

function Cartao({ t }: { t: Depo }) {
  return (
    <figure className="rounded-[22px] border border-white/10 bg-[#1f1f1f]/92 p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md md:p-7">
      <div className="flex gap-1" aria-label="Cinco estrelas">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-[18px] w-[18px] fill-[var(--color-brand)] text-[var(--color-brand)]" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-5 text-[15.5px] leading-[1.6] text-white/88">“{t.quote}”</blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        <Image src={t.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-[10px] object-cover" />
        <span>
          <span className="block text-[15px] font-semibold text-white">{t.name}</span>
          <span className="block text-[13px] text-[#c9c9c9]">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/* "Trusted by Happy Clients" da referência: o fundo com rastros de luz e o
   título ficam presos na tela enquanto os depoimentos sobem por cima, em
   duas colunas com velocidades diferentes. */
export default function Testimonials3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduzir = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yB = useTransform(scrollYProgress, [0, 1], reduzir ? [0, 0] : [140, -140]);

  const colA = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const colB = TESTIMONIALS.filter((_, i) => i % 2 === 1);

  return (
    <section id="depoimentos" className="tema-breu relative scroll-mt-16" aria-labelledby="depo-titulo">
      {/* Palco preso: fundo de luz e título */}
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div aria-hidden className="v3-luz absolute inset-0">
          <span className="v3-luz__faixa" style={{ ["--r" as string]: "-24deg", top: "38%", ["--d" as string]: "0s" }} />
          <span className="v3-luz__faixa" style={{ ["--r" as string]: "-18deg", top: "46%", ["--d" as string]: "-3s" }} />
          <span className="v3-luz__faixa v3-luz__faixa--fina" style={{ ["--r" as string]: "-30deg", top: "52%", ["--d" as string]: "-6s" }} />
          <span className="v3-luz__faixa v3-luz__faixa--fria" style={{ ["--r" as string]: "-12deg", top: "58%", ["--d" as string]: "-2s" }} />
          <span className="v3-luz__nucleo" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h2 id="depo-titulo" className="v3-titulo max-w-[14ch] text-white">
            O resultado quem conta são eles.
          </h2>
          <p className="v3-sub mt-4">Quem já trabalhou com a gente</p>
        </div>
      </div>

      {/* Cartões que passam por cima */}
      <div ref={ref} className="relative z-20 -mt-[100svh] pb-[30svh] pt-[70svh]">
        <div className="container-outbox grid gap-6 md:grid-cols-2 md:gap-x-[14%]">
          <div className="flex flex-col gap-6 md:gap-[38vh]">
            {colA.map((t) => (
              <Cartao key={t.name} t={t} />
            ))}
          </div>
          <motion.div style={{ y: yB }} className="flex flex-col gap-6 md:mt-[34vh] md:gap-[38vh]">
            {colB.map((t) => (
              <Cartao key={t.name} t={t} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
