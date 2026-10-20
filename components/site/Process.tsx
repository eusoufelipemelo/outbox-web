"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { PROCESS } from "@/lib/site";

const FOTOS = ["/img/hero-2.jpg", "/img/hero-1.jpg", "/img/gmn-conversa.jpg", "/img/hero-3.jpg"];

const PRAZOS = [
  { k: "Apresentações", v: "poucos dias" },
  { k: "Sites e blogs", v: "poucas semanas" },
  { k: "Sistemas", v: "prazo combinado" },
];

function Cartao({
  passo,
  i,
  p,
  reduzir,
}: {
  passo: (typeof PROCESS)[number];
  i: number;
  p: MotionValue<number>;
  reduzir: boolean;
}) {
  // Cada cartão sobe um pouco depois do anterior, como na referência.
  const inicio = 0.05 + i * 0.07;
  const y = useTransform(p, [inicio, inicio + 0.32], reduzir ? [0, 0] : [90 + i * 36, 0]);
  return (
    <motion.li style={{ y }} className="list-none">
      <article className="relative aspect-[0.66] overflow-hidden rounded-[18px] bg-[var(--color-brand)]">
        <Image
          src={FOTOS[i]}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 280px"
          className="object-cover opacity-90 mix-blend-multiply grayscale contrast-125"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#000000]/90 via-[#000000]/25 to-transparent" />
        <span className="absolute right-4 top-3 text-[clamp(3rem,5.2vw,4.25rem)] font-bold leading-none tracking-[-0.04em] text-white">
          {passo.step}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="text-[20px] font-semibold leading-tight text-white">{passo.title}</h3>
          <p className="mt-2 text-[14px] leading-[1.5] text-white/90">{passo.text}</p>
        </div>
      </article>
    </motion.li>
  );
}

/* "Our Process" da referência: seção preta com quatro cartões laranja
   que sobem em sequência conforme a rolagem. */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduzir = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end 0.55"] });

  return (
    <section id="processo" className="tema-breu scroll-mt-20 py-24 md:py-32">
      <div className="container-outbox">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="v3-titulo max-w-[13ch]">Um processo simples, do briefing ao ar.</h2>
          <p className="v3-sub max-w-[38ch] md:text-right">Como funciona</p>
        </div>

        <ol ref={ref} className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PROCESS.map((passo, i) => (
            <Cartao key={passo.step} passo={passo} i={i} p={scrollYProgress} reduzir={reduzir} />
          ))}
        </ol>

        {/* Nosso compromisso */}
        <div className="mt-20 grid gap-10 border-t border-white/12 pt-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div>
            <p className="v3-chip text-white/85">Nosso compromisso</p>
            <h3 className="mt-4 max-w-[20ch] text-[clamp(1.6rem,3vw,2.3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
              Material completo na mão, projeto no ar em tempo recorde.
            </h3>
            <p className="mt-5 max-w-[56ch] leading-relaxed text-[#c9c9c9]">
              O que mais atrasa um projeto não é a produção, é a espera por texto, foto e
              informação. Por isso a nossa regra é clara: assim que você entrega o material, o
              cronograma corre sem travas e a gente entrega no menor prazo possível, com o
              acabamento que a sua marca merece.
            </p>
          </div>
          <dl className="flex flex-col self-end">
            {PRAZOS.map((p) => (
              <div key={p.k} className="flex items-baseline justify-between gap-4 border-b border-white/12 py-4">
                <dt className="text-[15.5px] text-[#c9c9c9]">{p.k}</dt>
                <dd className="text-[20px] font-semibold text-[var(--color-brand)]">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
