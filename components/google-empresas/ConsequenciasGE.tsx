"use client";

import { GE_CONSEQUENCIAS } from "@/lib/google-empresas";
import { useEntrar } from "./useEntrar";
import s from "./vantagens.module.css";

/* Gráfico ilustrativo com fatos do contrato: um concorrente no Plano Autoridade
   publica 10 artigos por mês (120 em um ano); quem não faz nada fica em zero.
   A área entre as linhas é a distância que cresce todo mês. */

const W = 520;
const H = 220;
const PAD = { l: 50, r: 70, t: 24, b: 44 };
const MESES = 12;
const POR_MES = 10;
const x = (m: number) => PAD.l + (m / MESES) * (W - PAD.l - PAD.r);
const y = (v: number) => H - PAD.b - (v / (MESES * POR_MES)) * (H - PAD.t - PAD.b);

const pontos = Array.from({ length: MESES + 1 }, (_, m) => [x(m), y(m * POR_MES)] as const);
const linha = pontos.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");
const area = `${linha} L${x(MESES)},${y(0)} L${x(0)},${y(0)} Z`;

export default function ConsequenciasGE() {
  const ref = useEntrar<HTMLDivElement>(s.entra);

  return (
    <article
      className="relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl2)] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))] p-7 md:p-9"
      aria-labelledby="consequencias-titulo"
    >
      <h3
        id="consequencias-titulo"
        className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-white"
      >
        E se a sua empresa não fizer nada?
      </h3>
      <p className="mt-3 max-w-[54ch] leading-relaxed text-[var(--color-fg-muted)]">
        Parar não deixa a sua empresa onde está. O concorrente que publica segue andando, e a
        distância cresce todo mês.
      </p>

      <div ref={ref} className="mt-7">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Gráfico: em 12 meses, um concorrente com 10 artigos por mês chega a 120 páginas publicadas, enquanto a empresa sem conteúdo continua com zero."
        >
          <defs>
            <linearGradient id="ge-distancia" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f15532" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#f15532" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {[0, 60, 120].map((v) => (
            <g key={v}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="rgba(255,255,255,0.08)" />
              <text x={PAD.l - 8} y={y(v) + 4} textAnchor="end" className={s.eixo} fill="rgba(255,255,255,0.45)">
                {v}
              </text>
            </g>
          ))}
          {[0, 6, 12].map((m) => (
            <text key={m} x={x(m)} y={H - 6} textAnchor={m === 0 ? "start" : m === 12 ? "end" : "middle"} className={s.eixo} fill="rgba(255,255,255,0.45)">
              {m === 0 ? "hoje" : `${m} meses`}
            </text>
          ))}

          <path d={area} fill="url(#ge-distancia)" className={s.areaDistancia} />
          <path
            d={linha}
            fill="none"
            stroke="#f15532"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={600}
            className={s.linhaConcorrente}
          />
          <line x1={x(0)} x2={x(MESES)} y1={y(0)} y2={y(0)} stroke="rgba(255,255,255,0.5)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />

          <circle cx={x(MESES)} cy={y(120)} r="5" fill="#f15532" />
          <text x={x(MESES) + 10} y={y(120) + 4} className={s.rotuloFim} fill="#ff9a72">
            120
          </text>
          <circle cx={x(MESES)} cy={y(0)} r="5" fill="rgba(255,255,255,0.6)" />
          <text x={x(MESES) + 10} y={y(0) + 4} className={s.rotuloFim} fill="rgba(255,255,255,0.6)">
            0
          </text>
        </svg>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-[var(--color-fg-muted)]">
          <span className="flex items-center gap-2">
            <span className="h-[3px] w-5 rounded-full bg-[var(--color-brand)]" aria-hidden />
            Concorrente no Plano Autoridade
          </span>
          <span className="flex items-center gap-2">
            <span className="h-[3px] w-5 rounded-full bg-white/50" aria-hidden />
            Empresa sem conteúdo
          </span>
        </div>
      </div>

      <ol className="mt-8 flex flex-col gap-5 border-t border-white/8 pt-7">
        {GE_CONSEQUENCIAS.map((c, i) => (
          <li key={c.quando} className="relative grid grid-cols-[86px_1fr] gap-4">
            <span
              className={`text-[14px] font-semibold ${
                i === GE_CONSEQUENCIAS.length - 1 ? "text-[var(--color-brand-soft)]" : "text-white"
              }`}
            >
              {c.quando}
            </span>
            <p className="text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">{c.texto}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
