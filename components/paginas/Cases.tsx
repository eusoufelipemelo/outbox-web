import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import AboutFelipe from "@/components/site/AboutFelipe";
import VerOferta from "@/components/site/VerOferta";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import { FaixaCta, Secao, Topo } from "@/components/oferta/Blocos";
import { getT } from "@/lib/i18n/server";
import { alternates } from "@/lib/i18n/meta";
import { OG_LOCALE, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { jsonLdOferta } from "@/lib/jsonld";
import { TESTIMONIALS } from "@/lib/site";
import { SITE } from "@/lib/site";

/* /cases (briefing de 18/11/2026, seção 06). Por enquanto só o que JÁ É
   PÚBLICO no site: as marcas atendidas e os depoimentos reais. Cada estudo
   de caso completo só entra depois de escopo, evidências e autorização do
   cliente (PENDENTE DE APROVAÇÃO). Nada de número, logo ou resultado novo. */

const TITULO = "Cases e clientes da OutBox";
const DESCRICAO = "Empresas que já trabalharam com a OutBox e o que elas dizem. Os estudos de caso completos estão em preparação, com autorização de cada cliente.";
const MIGALHAS = [{ rotulo: "Início", href: "/" }, { rotulo: "Cases" }];

/** Marcas citadas no site e os depoimentos que já estão publicados. */
const CLIENTES = [
  { marca: "Casa46", depoimentos: ["Jônas Pastore"] },
  { marca: "Escola de Planejados", depoimentos: ["Nicoli Cercal Ferreira"] },
  { marca: "Couros do Valleh", depoimentos: ["Patrícia Fontanive"] },
  { marca: "Clínica Paz Pediatria", depoimentos: ["Dr. Alexandre Paz"] },
  { marca: "Master Revolution", depoimentos: [] },
];

/** Depoimentos de profissionais que não estão ligados a uma das marcas acima. */
const OUTROS = TESTIMONIALS.filter((d) => !CLIENTES.some((c) => c.depoimentos.includes(d.name)));

const O_QUE_TERA = [
  "Contexto e problema inicial do cliente",
  "Objetivo e como a necessidade foi diagnosticada",
  "Escopo da OutBox: entregas, período e limites",
  "Decisões do processo e soluções implementadas",
  "Resultados apenas documentados, com período e fonte",
  "Evidências autorizadas: telas, links e depoimento validado",
];

export function metadataCases(locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  return {
    title: t(TITULO),
    description: t(DESCRICAO),
    alternates: alternates(locale, "/cases"),
    openGraph: { type: "website", locale: OG_LOCALE[locale], title: `${t(TITULO)} · ${SITE.name}`, description: t(DESCRICAO) },
  };
}

function CartaoDepoimento({ quote, name, role, avatar }: (typeof TESTIMONIALS)[number]) {
  const { t } = getT();
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/8 bg-black/30 p-6">
      <Quote className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
      <blockquote className="mt-3 flex-1 leading-relaxed text-white/85">{t(quote)}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Image src={avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
        <span>
          <span className="block text-[14.5px] font-medium text-white">{name}</span>
          <span className="block text-[13px] text-[var(--color-fg-subtle)]">{t(role)}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Cases() {
  const { t, locale } = getT();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdOferta({ locale, caminho: "/cases", nome: TITULO, descricao: DESCRICAO, migalhas: MIGALHAS, tipo: "WebPage" })),
        }}
      />
      <VerOferta oferta="cases" nome="view_case" />
      <Ambience />
      <ScrollEffects />
      <Navbar />
      <main>
        <Topo
          migalhas={MIGALHAS}
          rotulo="Cases e clientes"
          titulo={
            <>
              {t("Quem já trabalhou com a OutBox")} <span className="text-brand-gradient">{t("conta como foi")}</span>.
            </>
          }
          apoio="Marcas atendidas e depoimentos reais de clientes. Os estudos de caso completos estão em preparação: cada um só é publicado com escopo confirmado, evidências e autorização do cliente."
          ctas={[
            { texto: "Quero avaliar um projeto semelhante", href: "/#contato", principal: true, rastreio: "cases" },
            { texto: "Quero uma consultoria para priorizar melhorias", href: "/consultoria-empresarial" },
          ]}
        />

        <section className="relative py-10 md:py-16">
          <div className="container-outbox flex flex-col gap-6">
            {CLIENTES.map((c, i) => {
              const deps = TESTIMONIALS.filter((d) => c.depoimentos.includes(d.name));
              return (
                <Revelar key={c.marca} atraso={i * 0.04}>
                  <article aria-labelledby={`case-${i}`} className="card-dark grid gap-6 p-7 md:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div>
                      <h2 id={`case-${i}`} className="font-display text-[clamp(1.5rem,2.6vw,2rem)] text-white">
                        {c.marca}
                      </h2>
                      <p className="mt-4 inline-flex rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] text-white/70">
                        {t("Estudo de caso completo em preparação")}
                      </p>
                    </div>
                    {deps.length > 0 ? (
                      <div className="grid gap-4">
                        {deps.map((d) => (
                          <CartaoDepoimento key={d.name} {...d} />
                        ))}
                      </div>
                    ) : (
                      <p className="leading-relaxed text-[var(--color-fg-muted)]">
                        {t("Marca atendida pela OutBox. O estudo de caso com escopo e evidências entra aqui assim que for autorizado.")}
                      </p>
                    )}
                  </article>
                </Revelar>
              );
            })}
          </div>
        </section>

        {OUTROS.length > 0 && (
          <Secao rotulo="Depoimentos" titulo="Mais clientes que falaram sobre o trabalho.">
            <div className="grid gap-4 md:grid-cols-2">
              {OUTROS.map((d) => (
                <CartaoDepoimento key={d.name} {...d} />
              ))}
            </div>
          </Secao>
        )}

        <Secao rotulo="Como publicamos" titulo="O que cada estudo de caso vai mostrar." texto="Para você comparar com a sua situação, e não para impressionar com números soltos.">
          <ul className="grid gap-3 md:grid-cols-2">
            {O_QUE_TERA.map((x) => (
              <li key={x} className="rounded-2xl border border-white/8 bg-white/[0.02] px-5 py-4 text-[15px] text-white/85">
                {t(x)}
              </li>
            ))}
          </ul>
        </Secao>

        <AboutFelipe />

        <FaixaCta
          titulo="Tem um projeto parecido?"
          texto="Conte o que a sua empresa precisa. Se ainda não está claro o que priorizar, a consultoria ajuda a decidir antes de contratar."
          ctas={[
            { texto: "Quero avaliar um projeto semelhante", href: "/#contato", principal: true, rastreio: "cases-final" },
            { texto: "Conhecer a consultoria", href: "/consultoria-empresarial" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
