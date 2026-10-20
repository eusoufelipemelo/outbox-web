"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";

const TEXTO =
  "Sistemas sob medida, sites de alta performance com SEO e GEO, branding e apresentações em link. Você entrega o material, a gente entrega rápido e com acabamento de gente grande.";

const FATOS = ["Santa Cruz do Rio Pardo, SP", "Atendimento em todo o Brasil", "Entrega rápida com o material em mãos"];

const CINZA = "#b4ada2";
const TINTA = "#0a0a0a";

function Palavra({ p, i, n, children }: { p: MotionValue<number>; i: number; n: number; children: string }) {
  const color = useTransform(p, [i / n, (i + 1) / n], [CINZA, TINTA]);
  return <motion.span style={{ color }}>{children} </motion.span>;
}

/* O texto escurece palavra por palavra enquanto a pessoa rola.
   Sem JavaScript ou com movimento reduzido, nasce todo em preto. */
export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduzir = useReducedMotion();
  // Antes de o JavaScript rodar, o texto já vem inteiro em preto: o efeito
  // só entra depois, então nunca existe texto apagado sem motivo.
  const [ativo, setAtivo] = useState(false);
  useEffect(() => setAtivo(true), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const palavras = TEXTO.split(" ");

  return (
    <section className="bg-[var(--color-creme)] py-24 md:py-36">
      <div className="container-outbox grid gap-10 md:grid-cols-[0.75fr_2fr]">
        <ul className="flex flex-col gap-2 text-[14px] font-medium uppercase tracking-[0.04em] text-[var(--color-cinza)]">
          {FATOS.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p
          ref={ref}
          className="text-[clamp(1.6rem,3vw,2.35rem)] font-semibold leading-[1.22] tracking-[-0.02em]"
        >
          {reduzir || !ativo
            ? TEXTO
            : palavras.map((w, i) => (
                <Palavra key={i} p={scrollYProgress} i={i} n={palavras.length}>
                  {w}
                </Palavra>
              ))}
        </p>
      </div>
    </section>
  );
}
