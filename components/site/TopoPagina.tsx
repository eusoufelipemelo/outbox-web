import type { ReactNode } from "react";

/* Abertura das páginas internas no layout v3: rótulos nas pontas, a palavra
   gigante em degradê (decorativa) e o h1 de verdade logo abaixo. */
export default function TopoPagina({
  palavra,
  esquerda,
  direita = "©2026",
  titulo,
  texto,
  children,
}: {
  palavra: string;
  esquerda: string;
  direita?: string;
  titulo: ReactNode;
  texto?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-[var(--color-creme)] pb-16 pt-[96px] md:pb-24 md:pt-[108px]">
      <div className="container-outbox">
        <div className="flex items-end justify-between text-[clamp(1.05rem,2.2vw,2rem)] font-bold leading-none">
          <span>{esquerda}</span>
          <span>{direita}</span>
        </div>
        <div aria-hidden className="mt-3 overflow-hidden pb-[1.5cqw] [container-type:inline-size] md:mt-4">
          <div
            className="flex justify-between font-[family-name:var(--font-anton)] leading-[0.86] select-none"
            style={{ fontSize: `${Math.min(33, 230 / palavra.length)}cqw` }}
          >
            {palavra.split("").map((l, i) => (
              <span key={i} className="v3-letra" style={{ ["--i" as string]: i }}>
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-12">
          <h1 className="v3-titulo max-w-[18ch]">{titulo}</h1>
          {texto && <p className="text-[17px] leading-relaxed text-[var(--color-cinza)] md:pb-2">{texto}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
