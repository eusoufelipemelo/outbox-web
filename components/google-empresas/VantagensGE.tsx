import { Search, Sparkles } from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import { GE_IAS, GE_VANTAGENS_GEO, GE_VANTAGENS_SEO } from "@/lib/google-empresas";
import CelularGE from "./CelularGE";
import RetornoGE from "./RetornoGE";
import ConsequenciasGE from "./ConsequenciasGE";

/* Seção entre "O que é GEO?" e os planos: o argumento completo antes do preço.
   O que se ganha no Google e nas IAs, como o investimento se paga e o que
   acontece se a empresa não fizer nada. */

function Grupo({
  Icone,
  titulo,
  itens,
}: {
  Icone: typeof Search;
  titulo: string;
  itens: readonly { titulo: string; texto: string }[];
}) {
  return (
    <div>
      <h3 className="flex items-center gap-3 font-display text-[21px] text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand)]/14">
          <Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
        </span>
        {titulo}
      </h3>
      <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {itens.map((v) => (
          <li key={v.titulo} className="border-l border-[var(--color-brand)]/35 pl-4">
            <p className="text-[15.5px] font-semibold leading-snug text-white">{v.titulo}</p>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">{v.texto}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VantagensGE({ tituloClasse }: { tituloClasse: string }) {
  return (
    <section id="vantagens" className="relative scroll-mt-24 py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow glow--brand absolute -left-40 top-24 h-[520px] w-[620px] opacity-60" />
      </div>

      <div className="container-outbox relative z-10">
        <Revelar className="max-w-[54ch]">
          <span className="pill">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
            Por que vale a pena
          </span>
          <h2 className={`mt-6 ${tituloClasse}`}>
            O que a sua empresa ganha aparecendo primeiro no Google e nas IAs?
          </h2>
          <p className="mt-5 leading-relaxed text-[var(--color-fg-muted)]">
            O seu cliente pesquisa em dois lugares: na busca do Google e nas respostas das
            inteligências artificiais. O Perfil da Empresa ativo e os artigos no seu site trabalham
            nos dois ao mesmo tempo, com SEO para o Google e GEO para as IAs.
          </p>
        </Revelar>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="min-w-0">
            <CelularGE />
          </div>

          <div className="flex min-w-0 flex-col gap-10">
            <Revelar>
              <Grupo Icone={Search} titulo="No Google, com SEO" itens={GE_VANTAGENS_SEO} />
            </Revelar>
            <Revelar atraso={0.06}>
              <Grupo Icone={Sparkles} titulo="Nas IAs, com GEO" itens={GE_VANTAGENS_GEO} />
              <div className="mt-7">
                <p className="text-[14px] text-white/80">
                  Não é só o ChatGPT. O mesmo conteúdo serve para as IAs que consultam a web:
                </p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Inteligências artificiais">
                  {GE_IAS.map((ia) => (
                    <li
                      key={ia}
                      className="rounded-full border border-white/12 bg-white/[0.035] px-3.5 py-1.5 text-[13px] text-white/85"
                    >
                      {ia}
                    </li>
                  ))}
                </ul>
              </div>
            </Revelar>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-5">
          <Revelar className="flex">
            <RetornoGE />
          </Revelar>
          <Revelar atraso={0.06} className="flex">
            <ConsequenciasGE />
          </Revelar>
        </div>
      </div>
    </section>
  );
}
