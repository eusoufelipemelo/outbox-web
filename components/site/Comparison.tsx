import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Gauge, MonitorSmartphone, PenTool, Sparkles, Timer } from "lucide-react";
import { COMPARISON } from "@/lib/site";
import { Revelar } from "@/components/ui/revelar";

const ICONES = [PenTool, Gauge, Sparkles, MonitorSmartphone, Timer, Compass];

/* "Our Values" da referência aplicado ao diferencial da OutBox: cada item
   mostra como a OutBox faz e, embaixo, o jeito de sempre que ele substitui. */
export default function Comparison() {
  const itens = COMPARISON.outbox.map((titulo, i) => ({
    titulo,
    lugar: COMPARISON.others[i],
    Icone: ICONES[i],
  }));

  return (
    <section className="bg-[var(--color-creme)] py-24 md:py-32">
      <div className="container-outbox">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="v3-titulo max-w-[16ch]">A diferença entre ter um site e ser encontrado.</h2>
          <p className="v3-sub md:text-right">Nosso diferencial</p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <Revelar className="relative aspect-[16/10] overflow-hidden rounded-[20px] md:col-span-2 lg:aspect-auto lg:min-h-[300px]">
            <Image
              src="/img/gmn-operacao.jpg"
              alt="Empreendedora trabalhando no notebook"
              fill
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-cover"
            />
          </Revelar>

          {itens.map(({ titulo, lugar, Icone }, i) => (
            <Revelar key={titulo} atraso={(i % 3) * 0.06}>
              <div className={i === 0 ? "lg:flex lg:h-full lg:flex-col lg:justify-end" : ""}>
                <Icone className="h-8 w-8 text-[var(--color-breu)]" strokeWidth={1.7} aria-hidden />
                <h3 className="mt-5 text-[20px] font-semibold leading-snug tracking-[-0.01em]">{titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-cinza)]">
                  No lugar de: {lugar.charAt(0).toLowerCase() + lugar.slice(1)}.
                </p>
              </div>
            </Revelar>
          ))}

          <Revelar atraso={0.12}>
            <div className="flex h-full flex-col justify-between gap-6 rounded-[20px] bg-[var(--color-brand)] p-7">
              <p className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-breu)]">
                Quer um site que traz cliente, e não só elogio?
              </p>
              <Link href="/#contato" className="v3-btn v3-btn--escuro self-start">
                Começar meu projeto
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
              </Link>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
