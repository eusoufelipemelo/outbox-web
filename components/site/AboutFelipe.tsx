import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Quote } from "lucide-react";
import { SITE } from "@/lib/site";
import { Revelar } from "@/components/ui/revelar";

const MARCAS = [
  "Casa46",
  "Escola de Planejados",
  "Couros do Valleh",
  "Clínica Paz Pediatria",
  "Master Revolution",
];

const FOTOS = {
  retrato: { src: "/img/felipe-retrato.jpg", w: 1127, h: 1400, alt: "Felipe Melo, fundador da OutBox Group, em retrato com fundo laranja" },
  estudio: { src: "/img/team-felipe.jpg", w: 746, h: 1000, alt: "Felipe Melo, fundador da OutBox Group, de camiseta branca e braços cruzados" },
} as const;

/* "Quem está por trás": a seção laranja do layout v3. Vai em toda página do
   site. Na home usa a foto de estúdio, porque o retrato laranja já está na
   abertura; nas outras páginas, o retrato. */
export default function AboutFelipe({ foto = "retrato" }: { foto?: keyof typeof FOTOS } = {}) {
  const f = FOTOS[foto];
  return (
    <section id="sobre" className="tema-laranja relative scroll-mt-16 overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Revelar className="relative mx-auto w-full max-w-[500px]">
            <div className="group relative overflow-hidden rounded-[24px] bg-[#c2340f] shadow-[0_40px_80px_-30px_rgba(60,10,0,0.6)]">
              <Image
                src={f.src}
                alt={f.alt}
                width={f.w}
                height={f.h}
                sizes="(max-width: 1024px) 92vw, 500px"
                className="h-auto w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-[24px] font-bold leading-tight tracking-[-0.02em]">Felipe Melo</p>
                <p className="mt-1 text-[14px] text-white/85">Fundador e Diretor de Criação</p>
              </div>
            </div>
            <div className="absolute -right-3 -top-4 rounded-[18px] bg-[var(--color-breu)] px-5 py-4 text-center text-white shadow-xl">
              <span className="block text-[34px] font-bold leading-none text-[var(--color-brand)]">15</span>
              <span className="mt-1 block text-[13px] font-medium">anos de estrada</span>
            </div>
          </Revelar>

          <div>
            <Revelar>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-breu)]/25 px-4 py-2 text-[14px] font-semibold">
                <span aria-hidden className="h-2 w-2 rounded-full bg-[var(--color-breu)]" />
                Quem está por trás
              </p>
              <h2 className="v3-titulo mt-6 max-w-[15ch]">Você não fala com um robô. Fala comigo.</h2>
              <div className="mt-7 flex flex-col gap-4 text-[17px] leading-relaxed text-[var(--color-breu)]/85">
                <p>
                  Meu nome é Felipe Melo e eu toco a OutBox. Sou designer e estrategista de marca, e
                  passei os últimos quinze anos ajudando empresas a parecerem tão boas por fora quanto
                  já são por dentro.
                </p>
                <p>
                  Acredito em três coisas: projeto tem que ter <strong className="text-[var(--color-breu)]">dono</strong>,
                  prazo tem que ser <strong className="text-[var(--color-breu)]">cumprido</strong> e site bonito que não
                  traz cliente é <strong className="text-[var(--color-breu)]">despesa, não investimento</strong>. Por
                  isso eu mesmo participo de cada etapa, do briefing à publicação.
                </p>
                <p>
                  Quando você me chama no WhatsApp, é comigo que você fala. Sem atendente, sem fila, sem
                  promessa que a gente não vai cumprir.
                </p>
              </div>
            </Revelar>

            <Revelar atraso={0.06}>
              <blockquote className="mt-8 rounded-[20px] bg-[var(--color-breu)] p-6 text-white md:p-7">
                <Quote className="h-6 w-6 text-[var(--color-brand)]" aria-hidden />
                <p className="mt-3 text-[clamp(1.15rem,1.8vw,1.4rem)] font-semibold leading-snug tracking-[-0.01em]">
                  Marca boa não é a que grita mais alto. É a que a pessoa lembra na hora de decidir.
                </p>
              </blockquote>

              <p className="mt-8 text-[14.5px] font-semibold">Já construí marca e presença digital para</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MARCAS.map((m) => (
                  <li key={m} className="rounded-full bg-[var(--color-breu)]/10 px-4 py-2 text-[14px] font-medium">
                    {m}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/#contato" className="v3-btn v3-btn--escuro">
                  Falar direto comigo
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </Link>
                <a
                  href={SITE.instagramPersonal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v3-btn v3-btn--contorno hover:!bg-[var(--color-breu)]/10"
                >
                  {SITE.instagramPersonalHandle}
                </a>
              </div>
            </Revelar>
          </div>
        </div>
      </div>
    </section>
  );
}
