import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import HeroCta from "@/components/site/HeroCta";
import { getT } from "@/lib/i18n/server";

const STATS = [
  { value: "250+", label: "Projetos entregues", highlight: false },
  { value: "15 anos", label: "De estrada em criação", highlight: true },
  { value: "500+", label: "Clientes atendidos", highlight: false },
];

export default function Hero() {
  const { t, href } = getT();
  return (
    <section className="relative overflow-hidden pb-24 md:pb-32">
      {/* Palco com a imagem de fundo: zoom lento e as luzes de neon pulsando */}
      <div className="relative flex min-h-[100svh] items-end overflow-hidden md:min-h-[min(100svh,960px)] md:items-center">
        <div aria-hidden className="hero-bg absolute inset-x-0 top-0 h-[74svh] md:inset-0 md:h-auto">
          <picture>
            <source media="(max-width: 767px)" srcSet="/img/hero/hero-mobile.webp" type="image/webp" />
            <source media="(max-width: 767px)" srcSet="/img/hero/hero-mobile.jpg" />
            <source srcSet="/img/hero/hero-desktop.webp" type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/hero/hero-desktop.jpg"
              alt=""
              fetchPriority="high"
              decoding="async"
              className="hero-bg__foto h-full w-full object-cover object-[50%_40%] md:object-[70%_50%]"
            />
          </picture>
          <picture>
            <source media="(max-width: 767px)" srcSet="/img/hero/neon-mobile.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/hero/neon-desktop.webp"
              alt=""
              decoding="async"
              className="hero-bg__neon absolute inset-0 h-full w-full object-cover object-[50%_40%] md:object-[70%_50%]"
            />
          </picture>
        </div>

        {/* Sombras para o texto ler bem: lado esquerdo no desktop, base no celular */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-[74svh] bg-[linear-gradient(to_top,#000_0%,rgba(0,0,0,0.6)_22%,transparent_48%)] md:inset-0 md:h-auto md:bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.55)_42%,transparent_70%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 to-transparent" />

        <div className="container-outbox relative z-10 pb-14 pt-[56svh] md:pb-14 md:pt-[112px]">
          <div className="flex flex-col items-center text-center md:max-w-[600px] md:items-start md:text-left">
            <span className="pill reveal">
              <span
                aria-hidden
                className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              {t("Agência de tecnologia e criação")}
            </span>

            <h1 className="reveal-words mt-8 max-w-[16ch] font-display text-[clamp(2.5rem,5.6vw,4.6rem)] leading-[1.03] text-white">
              {t("Sua marca no digital, feita para")}{" "}
              <span className="text-brand-gradient">{t("vender")}</span> {t("e para ser")}{" "}
              <span className="text-brand-gradient">{t("encontrada")}</span>.
            </h1>

            <p
              className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-white/80 md:text-lg"
              style={{ transitionDelay: "120ms" }}
            >
              {t("Sistemas sob medida, sites de alta performance com SEO e GEO, branding e apresentações em link. Você entrega o material, a gente entrega rápido e com acabamento de gente grande.")}
            </p>

            <div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:items-start"
              style={{ transitionDelay: "220ms" }}
            >
              <HeroCta />

              <Link
                href={href("/#servicos")}
                className="flex min-h-14 cursor-pointer items-center rounded-full border border-white/25 bg-black/30 px-7 text-[15px] text-white/90 backdrop-blur-sm transition-colors duration-300 hover:border-white/45 hover:text-white"
              >
                {t("Ver o que fazemos")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-outbox relative z-10">
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
                {t(s.value)}
              </div>
              <div
                className={`mt-2.5 text-sm ${
                  s.highlight ? "text-white/85" : "text-[var(--color-fg-muted)]"
                }`}
              >
                {t(s.label)}
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
            {t("Entrega rápida com o material em mãos")}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
          <span>{t("Atendimento em todo o Brasil")}</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
          <span>Santa Cruz do Rio Pardo, SP</span>
        </div>

        {/* Gente de verdade: quem faz e para quem a gente faz */}
        <div
          className="reveal mt-16 grid gap-4 sm:grid-cols-3"
          style={{ transitionDelay: "460ms" }}
        >
          {[
            { src: "/img/hero-strip-1.webp", alt: "Dupla em reunião de projeto, com ideias e equipe em destaque", tall: true },
            { src: "/img/hero-strip-2.webp", alt: "Desenvolvimento de sistema e site no estúdio", tall: false },
            { src: "/img/hero-strip-3.webp", alt: "Cliente comemorando resultado ao telefone", tall: false },
          ].map((img, i) => (
            <figure
              key={img.src}
              className={`group relative overflow-hidden rounded-[var(--radius-xl2)] border border-white/10 ${
                i === 0 ? "sm:row-span-1" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={t(img.alt)}
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
                  {t("Projetos rodando agora")}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
