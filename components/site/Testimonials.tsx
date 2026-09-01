import Image from "next/image";
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div className="container-outbox relative z-10">
        <div className="mx-auto max-w-[44ch] text-center">
          <span className="pill reveal">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
            />
            Quem já trabalhou com a gente
          </span>
          <h2 className="reveal-words mt-6 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.07] text-white">
            O resultado quem conta são eles.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="reveal card-dark flex flex-col p-7"
              style={{ transitionDelay: `${(i % 3) * 100}ms` }}
            >
              <span
                aria-hidden
                className="font-display text-5xl leading-[0.4] text-[var(--color-brand)]"
              >
                &rdquo;
              </span>
              <blockquote className="mt-6 flex-1 text-[15px] leading-relaxed text-white/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3.5 border-t border-white/8 pt-5">
                <Image
                  src={t.avatar}
                  alt={`Foto de ${t.name}`}
                  width={46}
                  height={46}
                  className="h-[46px] w-[46px] rounded-full object-cover"
                />
                <span className="flex flex-col">
                  <span className="font-display text-[15.5px] text-white">
                    {t.name}
                  </span>
                  <span className="mt-0.5 text-[12.5px] leading-snug text-[var(--color-fg-subtle)]">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
