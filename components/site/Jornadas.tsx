import Link from "next/link";
import { ArrowUpRight, Compass, GraduationCap, Layers } from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import { getT } from "@/lib/i18n/server";

/* "Qual é o seu próximo passo?": logo depois do topo da home, separa os três
   públicos (briefing de 18/11/2026, seção 11). Cada cartão leva a um caminho
   próprio, nunca ao mesmo formulário. */

const CAMINHOS = [
  {
    Icone: Compass,
    rotulo: "Preciso de estratégia",
    texto: "Entender os desafios da minha empresa e o que priorizar.",
    cta: "Conhecer a consultoria",
    href: "/consultoria-empresarial",
    rastreio: "jornada-consultoria",
  },
  {
    Icone: Layers,
    rotulo: "Preciso de execução",
    texto: "Contratar a OutBox para desenvolver ou gerenciar soluções digitais.",
    cta: "Ver os serviços",
    href: "/servicos",
    rastreio: "jornada-servicos",
  },
  {
    Icone: GraduationCap,
    rotulo: "Quero aprender",
    texto: "Construir a minha atuação profissional com as mentorias de Felipe.",
    cta: "Conhecer as mentorias",
    href: "/mentoria",
    rastreio: "jornada-mentoria",
  },
];

export default function Jornadas() {
  const { t, href } = getT();
  return (
    <section aria-labelledby="jornadas-titulo" className="relative pb-8 md:pb-12">
      <div className="container-outbox">
        <Revelar>
          <h2 id="jornadas-titulo" className="font-display text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-white">
            {t("Qual é o seu próximo passo?")}
          </h2>
        </Revelar>
        <ul className="mt-7 grid gap-4 md:grid-cols-3">
          {CAMINHOS.map((c, i) => (
            <li key={c.href} className="flex">
              <Revelar atraso={i * 0.06} className="flex w-full">
                <Link
                  href={href(c.href)}
                  data-cta={c.rastreio}
                  className="card-dark group flex w-full flex-col p-6 transition-colors duration-300 hover:border-[var(--color-brand)]/45 md:p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/14">
                    <c.Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
                  </span>
                  <span className="mt-5 font-display text-[20px] text-white">{t(c.rotulo)}</span>
                  <span className="mt-2 flex-1 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">{t(c.texto)}</span>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14.5px] font-medium text-white transition-colors group-hover:text-[var(--color-brand-soft)]">
                    {t(c.cta)}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} aria-hidden />
                  </span>
                </Link>
              </Revelar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
