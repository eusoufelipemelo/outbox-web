import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";

const STATS = [
  { value: "250+", label: "Projetos entregues", highlight: false },
  { value: "10 anos", label: "De estrada em criação", highlight: true },
  { value: "500+", label: "Clientes atendidos", highlight: false },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="container-outbox relative z-10">
        <div className="flex flex-col items-center text-center">
          <span className="pill reveal">
            <span
              aria-hidden
              className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            Agência de tecnologia e criação
          </span>

          <h1 className="reveal-words mt-8 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5.1rem)] leading-[1.02] text-white">
            Sua marca no digital, feita para{" "}
            <span className="text-brand-gradient">vender</span> e para ser{" "}
            <span className="text-brand-gradient">encontrada</span>.
          </h1>

          <p
            className="reveal mt-7 max-w-[62ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)] md:text-lg"
            style={{ transitionDelay: "120ms" }}
          >
            Sistemas sob medida, sites de alta performance com SEO e GEO,
            branding e apresentações em link. Você entrega o material, a gente
            entrega rápido e com acabamento de gente grande.
          </p>

          <div
            className="reveal mt-10 flex flex-col items-center gap-4 sm:flex-row"
            style={{ transitionDelay: "220ms" }}
          >
            <Link
              href="/#contato"
              className="group flex cursor-pointer items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-black transition-all duration-300 hover:shadow-[0_14px_40px_rgba(255,255,255,0.16)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4.5 w-4.5 text-white" strokeWidth={2.4} />
              </span>
              Começar meu projeto
            </Link>

            <Link
              href="/#servicos"
              className="cursor-pointer rounded-full border border-white/14 px-7 py-3.5 text-[15px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
            >
              Ver o que fazemos
            </Link>
          </div>
        </div>

        {/* Números */}
        <div
          className="reveal mt-20 grid gap-4 sm:grid-cols-3"
          style={{ transitionDelay: "320ms" }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className={`rounded-[var(--radius-xl2)] border p-7 text-center transition-all duration-500 ${
                s.highlight
                  ? "border-transparent bg-gradient-to-b from-[var(--color-brand)] to-[var(--color-brand-deep)] shadow-[0_20px_60px_rgba(241,85,50,0.28)]"
                  : "card-dark"
              }`}
            >
              <div className="font-display text-[2.6rem] leading-none text-white">
                {s.value}
              </div>
              <div
                className={`mt-2.5 text-sm ${
                  s.highlight ? "text-white/85" : "text-[var(--color-fg-muted)]"
                }`}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Faixa de reforço */}
        <div
          className="reveal mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13.5px] text-[var(--color-fg-subtle)]"
          style={{ transitionDelay: "400ms" }}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--color-brand)]" />
            Entrega rápida com o material em mãos
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
          <span>Atendimento em todo o Brasil</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
          <span>Balneário Camboriú, SC</span>
        </div>

        {/* Gente de verdade: quem faz e para quem a gente faz */}
        <div
          className="reveal mt-16 grid gap-4 sm:grid-cols-3"
          style={{ transitionDelay: "460ms" }}
        >
          {[
            { src: "/img/hero-2.jpg", alt: "Equipe da OutBox em reunião de projeto", tall: true },
            { src: "/img/hero-1.jpg", alt: "Processo de criação no estúdio", tall: false },
            { src: "/img/hero-3.jpg", alt: "Desenvolvimento e acompanhamento de resultado", tall: false },
          ].map((img, i) => (
            <figure
              key={img.src}
              className={`group relative overflow-hidden rounded-[var(--radius-xl2)] border border-white/10 ${
                i === 0 ? "sm:row-span-1" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={900}
                height={640}
                className="h-[220px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-[260px]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
              />
              {i === 1 && (
                <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-2 text-[12.5px] text-white backdrop-blur-sm">
                  <span
                    aria-hidden
                    className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
                  />
                  Projetos rodando agora
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
