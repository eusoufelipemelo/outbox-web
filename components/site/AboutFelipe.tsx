import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { SITE } from "@/lib/site";

const MARCAS = [
  "Casa46",
  "Escola de Planejados",
  "Couros do Valleh",
  "Clínica Paz Pediatria",
  "Master Revolution",
];

export default function AboutFelipe() {
  return (
    <section id="sobre" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Retrato */}
          <div className="reveal relative">
            <div className="relative mx-auto max-w-[420px]">
              {/* Moldura com brilho da marca */}
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[var(--color-brand)]/25 via-transparent to-transparent blur-2xl"
              />
              <div className="relative overflow-hidden rounded-[var(--radius-xl2)] border border-white/10">
                <Image
                  src="/img/team-felipe.jpg"
                  alt="Felipe Melo, fundador da OutBox Group"
                  width={840}
                  height={1050}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="font-display text-[22px] leading-tight text-white">
                    Felipe Melo
                  </p>
                  <p className="mt-1 text-[13.5px] text-white/70">
                    Fundador e Diretor de Criação
                  </p>
                </div>
              </div>

              {/* Selo de anos */}
              <div className="absolute -right-3 -top-3 rounded-2xl border border-[var(--color-brand)]/40 bg-black/80 px-4 py-3 text-center backdrop-blur-sm">
                <span className="block font-display text-[26px] leading-none text-[var(--color-brand)]">
                  10
                </span>
                <span className="mt-1 block text-[10.5px] uppercase tracking-widest text-white/60">
                  anos de estrada
                </span>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div>
            <span className="pill reveal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              Quem está por trás
            </span>

            <h2 className="reveal-words mt-6 max-w-[18ch] font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white">
              Você não fala com um robô. Fala comigo.
            </h2>

            <div className="reveal mt-6 flex flex-col gap-4 text-[16.5px] leading-relaxed text-[var(--color-fg-muted)]">
              <p>
                Meu nome é Felipe Melo e eu toco a OutBox de{" "}
                {SITE.city.replace(", SC", ", em Santa Catarina")}. Sou designer
                e estrategista de marca, e passei os últimos anos ajudando
                empresas a parecerem tão boas por fora quanto já são por dentro.
              </p>
              <p>
                Acredito em três coisas: projeto tem que ter{" "}
                <span className="text-white">dono</span>, prazo tem que ser{" "}
                <span className="text-white">cumprido</span> e site bonito que
                não traz cliente é{" "}
                <span className="text-white">despesa, não investimento</span>.
                Por isso eu mesmo participo de cada etapa, do briefing à
                publicação.
              </p>
              <p>
                Quando você me chama no WhatsApp, é comigo que você fala. Sem
                atendente, sem fila, sem promessa que a gente não vai cumprir.
              </p>
            </div>

            {/* Citação */}
            <blockquote className="reveal mt-8 rounded-2xl border-l-2 border-[var(--color-brand)] bg-white/[0.03] p-6">
              <Quote className="h-5 w-5 text-[var(--color-brand)]" />
              <p className="mt-3 font-display text-[19px] leading-snug text-white">
                Marca boa não é a que grita mais alto. É a que a pessoa lembra
                na hora de decidir.
              </p>
            </blockquote>

            {/* Marcas atendidas */}
            <div className="reveal mt-8">
              <p className="text-[12.5px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
                Já construí marca e presença digital para
              </p>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {MARCAS.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-[13.5px] text-white/80"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="reveal mt-9 flex flex-wrap gap-3">
              <Link
                href="/#contato"
                className="group flex cursor-pointer items-center gap-2.5 rounded-full bg-white px-5 py-3.5 text-[14.5px] font-medium text-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(255,255,255,0.14)]"
              >
                Falar direto comigo
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.4}
                />
              </Link>
              <a
                href={SITE.instagramPersonal}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-full border border-white/14 px-5 py-3.5 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                {SITE.instagramPersonalHandle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
