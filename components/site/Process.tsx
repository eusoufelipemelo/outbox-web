import { PROCESS } from "@/lib/site";
import { Zap } from "lucide-react";
import RevealTitle from "@/components/ui/reveal-title";

export default function Process() {
  return (
    <section id="processo" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        {/* Destaque do prazo */}
        <div className="reveal card-dark relative mb-16 overflow-hidden p-8 md:p-12">
          <div
            aria-hidden
            className="glow glow--brand absolute -left-20 -top-20 h-72 w-72"
          />
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <span className="pill">
                <Zap className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                Nosso compromisso
              </span>
              <RevealTitle
                as="h2"
                className="mt-6 max-w-[20ch] font-display text-[clamp(1.8rem,4vw,3rem)] leading-[1.08] text-white"
              >
                Material completo na mão, projeto no ar em tempo recorde.
              </RevealTitle>
              <p className="mt-5 max-w-[54ch] leading-relaxed text-[var(--color-fg-muted)]">
                O que mais atrasa um projeto não é a produção, é a espera por
                texto, foto e informação. Por isso a nossa regra é clara: assim
                que você entrega o material, o cronograma corre sem travas e a
                gente entrega no menor prazo possível, com o acabamento que a
                sua marca merece.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                { k: "Apresentações", v: "poucos dias" },
                { k: "Sites e blogs", v: "poucas semanas" },
                { k: "Sistemas", v: "prazo combinado" },
              ].map((i) => (
                <div
                  key={i.k}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4"
                >
                  <span className="text-[14.5px] text-[var(--color-fg-muted)]">
                    {i.k}
                  </span>
                  <span className="font-display text-[15px] text-[var(--color-brand)]">
                    {i.v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Etapas */}
        <div className="max-w-[44ch]">
          <span className="pill reveal">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            Como funciona
          </span>
          <RevealTitle
            as="h2"
            className="mt-6 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white"
          >
            Um processo simples, do briefing ao ar.
          </RevealTitle>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <article
              key={p.step}
              className="reveal card-dark group relative overflow-hidden p-7"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div
                aria-hidden
                className="absolute -right-6 -top-8 font-display text-[6rem] leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-[var(--color-brand)]/12"
              >
                {p.step}
              </div>
              <div className="relative z-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-brand)]/35 font-display text-[15px] text-[var(--color-brand)]">
                  {p.step}
                </span>
                <h3 className="mt-5 font-display text-[19px] leading-snug text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                  {p.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
