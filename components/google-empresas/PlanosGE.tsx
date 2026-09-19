import { ArrowUpRight, CalendarClock, Check, CreditCard, Minus } from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import {
  GE_CONDICOES,
  GE_ITENS_AUTORIDADE,
  GE_ITENS_COMUNS,
  GE_PLANOS,
  formatarReais,
  geWhatsapp,
  type Plano,
} from "@/lib/google-empresas";

/* O Plano Crescimento é a âncora: custa quase o mesmo que o Autoridade e
   entrega bem menos, então a economia do Autoridade é medida contra ele. */
const ANCORA = GE_PLANOS.find((p) => p.id === "crescimento")!;

function economiaPorArtigo(plano: Plano) {
  return Math.round((1 - plano.porArtigo / ANCORA.porArtigo) * 100);
}

function CardPlano({ plano, atraso }: { plano: Plano; atraso: number }) {
  const d = plano.destaque;
  // O espaço fixo do "R$ 1.590" vira espaço comum na mensagem do WhatsApp.
  const mensagem = `${plano.nome} (${plano.artigos} artigos por mês, ${formatarReais(plano.preco).replace(/\u00a0/g, " ")}/mês)`;

  return (
    <Revelar
      atraso={atraso}
      className={`flex ${d ? "order-first lg:order-none lg:-my-6" : ""}`}
    >
      <article
        aria-labelledby={`plano-${plano.id}`}
        className={
          d
            ? "relative flex w-full flex-col rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/70 bg-[linear-gradient(180deg,rgba(241,85,50,0.16),rgba(241,85,50,0.035)_55%,rgba(255,255,255,0.02))] p-7 shadow-[0_0_0_1px_rgba(241,85,50,0.25),0_30px_90px_-30px_rgba(241,85,50,0.55)] md:p-9 lg:py-12"
            : "card-dark flex w-full flex-col p-7 md:p-8"
        }
      >
        {d && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-xl2)]"
            >
              <div className="glow glow--brand absolute -right-24 -top-24 h-72 w-72" />
            </div>
            <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--color-brand)] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-black shadow-[0_8px_24px_rgba(241,85,50,0.45)]">
              Mais escolhido
            </span>
          </>
        )}

        <div className="relative z-10 flex h-full flex-col">
          <h3
            id={`plano-${plano.id}`}
            className={`font-display text-[22px] leading-tight ${d ? "text-[var(--color-brand-soft)]" : "text-white"}`}
          >
            {plano.nome}
          </h3>
          <p className="mt-2 min-h-[3.25em] text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
            {plano.resumo}
          </p>

          <p className="mt-6 flex items-baseline gap-1.5">
            <span
              className={`font-display leading-none text-white ${d ? "text-[clamp(2.8rem,5vw,3.4rem)]" : "text-[clamp(2.4rem,4.4vw,2.9rem)]"}`}
            >
              {formatarReais(plano.preco)}
            </span>
            <span className="text-[15px] text-[var(--color-fg-muted)]">/mês</span>
          </p>
          <p className="mt-2 text-[16px] font-medium text-white">
            {plano.artigos} artigos por mês
          </p>

          <div
            className={`mt-5 rounded-2xl border px-4 py-3.5 ${
              d
                ? "border-[var(--color-brand)]/45 bg-[var(--color-brand)]/12"
                : "border-white/8 bg-white/[0.03]"
            }`}
          >
            <p className="flex items-baseline justify-between gap-3 text-[14.5px]">
              <span className="text-[var(--color-fg-muted)]">Valor por artigo</span>
              <span className={`font-display text-[18px] ${d ? "text-[var(--color-brand-soft)]" : "text-white"}`}>
                {formatarReais(plano.porArtigo)}
              </span>
            </p>
            {d && (
              <p className="mt-1.5 text-[13.5px] font-medium text-white">
                {economiaPorArtigo(plano)}% a menos por artigo que no {ANCORA.nome}
              </p>
            )}
          </div>

          <ul className="mt-7 flex flex-col gap-3 border-t border-white/8 pt-6">
            {GE_ITENS_COMUNS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[14.5px] leading-snug text-white/90">
                <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
                  <Check className="h-3 w-3 text-[var(--color-brand)]" strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
            {GE_ITENS_AUTORIDADE.map((item) =>
              d ? (
                <li key={item} className="flex items-start gap-3 text-[14.5px] font-medium leading-snug text-white">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
                    <Check className="h-3 w-3 text-black" strokeWidth={3.2} aria-hidden />
                  </span>
                  {item}
                </li>
              ) : (
                <li key={item} className="flex items-start gap-3 text-[14.5px] leading-snug text-[var(--color-fg-muted)] line-through decoration-white/25">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/12">
                    <Minus className="h-3 w-3 text-white/45" strokeWidth={2.6} aria-hidden />
                  </span>
                  <span>
                    {item}
                    <span className="sr-only"> (não incluso neste plano)</span>
                  </span>
                </li>
              )
            )}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href={geWhatsapp(mensagem)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Escolher o ${plano.nome} pelo WhatsApp`}
              className={`group flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-300 ${
                d
                  ? "bg-[var(--color-brand)] text-black hover:bg-[var(--color-brand-soft)] hover:shadow-[0_14px_36px_rgba(241,85,50,0.4)]"
                  : "border border-white/16 text-white hover:border-white/40 hover:bg-white/[0.06]"
              }`}
            >
              Escolher este plano
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.4}
                aria-hidden
              />
            </a>
          </div>
        </div>
      </article>
    </Revelar>
  );
}

export default function PlanosGE() {
  return (
    <>
      <div className="mt-16 grid gap-6 pt-4 lg:grid-cols-3 lg:gap-5">
        {GE_PLANOS.map((p, i) => (
          <CardPlano key={p.id} plano={p} atraso={i * 0.06} />
        ))}
      </div>

      <Revelar className="mt-14">
        <div className="grid gap-4 rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.025] p-6 md:grid-cols-2 md:p-7">
          <p className="flex items-start gap-3.5 text-[15px] leading-relaxed text-white/90">
            <CalendarClock className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
            {GE_CONDICOES.contrato}
          </p>
          <p className="flex items-start gap-3.5 text-[15px] leading-relaxed text-white/90">
            <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-brand)]" aria-hidden />
            {GE_CONDICOES.pagamento}
          </p>
        </div>
      </Revelar>
    </>
  );
}
