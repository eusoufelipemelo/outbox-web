import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";
import RevealTitle from "@/components/ui/reveal-title";
import { TESTIMONIALS } from "@/lib/site";
import { getT } from "@/lib/i18n/server";

type Depoimento = (typeof TESTIMONIALS)[number];

function CartaoDepoimento({ quote, name, role, avatar, t }: Depoimento & { t: (pt: string) => string }) {
  return (
    <figure className="w-[290px] shrink-0 rounded-[var(--radius-xl2)] border border-white/12 bg-white/[0.055] p-6 transition-colors duration-300 hover:border-[var(--color-brand)]/50">
      <span
        aria-hidden
        className="font-display text-4xl leading-[0.3] text-[var(--color-brand)]"
      >
        &rdquo;
      </span>
      <blockquote className="mt-5 text-[14px] leading-relaxed text-white/85">
        {t(quote)}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
        <Image
          src={avatar}
          alt=""
          width={38}
          height={38}
          className="h-[38px] w-[38px] rounded-full object-cover"
        />
        <span className="flex min-w-0 flex-col">
          <span className="truncate font-display text-[14.5px] text-white">
            {name}
          </span>
          <span className="truncate text-[11.5px] text-[var(--color-fg-subtle)]">
            {t(role)}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/* Componente de servidor: os cartões chegam prontos no HTML e não custam
   hidratação (antes eram ~30 cartões hidratados no celular). */

/** Divide os depoimentos em colunas alternadas. */
const colunas = [
  TESTIMONIALS.filter((_, i) => i % 3 === 0),
  TESTIMONIALS.filter((_, i) => i % 3 === 1),
  TESTIMONIALS.filter((_, i) => i % 3 === 2),
  [...TESTIMONIALS].reverse(),
];

export default function Testimonials3D() {
  const { t } = getT();
  return (
    <section
      id="depoimentos"
      // Fora da primeira tela e a seção mais pesada (cartões em 3D): o
      // navegador só a desenha quando ela chega perto. A altura reservada é a
      // real, para a rolagem não pular.
      className="relative overflow-hidden py-24 [content-visibility:auto] [contain-intrinsic-size:auto_940px] md:py-32 md:[contain-intrinsic-size:auto_1040px]"
    >
      <div className="container-outbox relative z-10">
        <div className="mx-auto max-w-[44ch] text-center">
          <span className="pill reveal">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            {t("Quem já trabalhou com a gente")}
          </span>
          <RevealTitle
            as="h2"
            className="mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.07] text-white"
          >
            {t("O resultado quem conta são eles.")}
          </RevealTitle>
        </div>
      </div>

      {/* Palco 3D */}
      <div
        className="relative mt-16 flex h-[560px] w-full items-center justify-center overflow-hidden [perspective:340px]"
        style={{
          maskImage:
            "radial-gradient(ellipse 78% 66% at 50% 50%, #000 34%, rgba(0,0,0,0.55) 62%, transparent 86%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 66% at 50% 50%, #000 34%, rgba(0,0,0,0.55) 62%, transparent 86%)",
        }}
      >
        <div
          className="flex flex-row items-center gap-4"
          style={{
            transform:
              "translateX(-40px) translateZ(-90px) rotateX(16deg) rotateY(-9deg) rotateZ(16deg)",
          }}
        >
          {colunas.map((coluna, i) => (
            <Marquee
              key={i}
              vertical
              pauseOnHover
              reverse={i % 2 === 1}
              repeat={coluna.length >= 4 ? 2 : 3}
              className="[--duration:46s] [--gap:1rem]"
            >
              {coluna.map((d) => (
                <CartaoDepoimento key={`${i}-${d.name}`} {...d} t={t} />
              ))}
            </Marquee>
          ))}
        </div>
      </div>

      {/* Lista acessível: o palco 3D é decorativo */}
      <div className="sr-only">
        <h3>{t("Depoimentos de clientes")}</h3>
        <ul>
          {TESTIMONIALS.map((d) => (
            <li key={d.name}>
              <blockquote>{t(d.quote)}</blockquote>
              <cite>
                {d.name}, {t(d.role)}
              </cite>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
