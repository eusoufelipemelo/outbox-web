import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import AboutFelipe from "@/components/site/AboutFelipe";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import { FaixaCta, Topo } from "@/components/oferta/Blocos";
import { getT } from "@/lib/i18n/server";
import { alternates } from "@/lib/i18n/meta";
import { OG_LOCALE, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { jsonLdOferta } from "@/lib/jsonld";
import { CATALOGO, GRUPOS, rotaServico } from "@/lib/catalogo";
import { servicoPorSlug } from "@/lib/servicos";
import { descricaoLocal, tituloLocal } from "@/lib/regiao";
import { SITE } from "@/lib/site";

/** /servicos: os onze serviços da OutBox, por grupo. */

const TITULO = "Serviços da OutBox";
const DESCRICAO =
  "Sites, blog, Perfil da Empresa no Google, identidade visual, sistemas, Micro SaaS, landing pages, apresentações e gestão de e-commerce e marketplaces.";
const MIGALHAS = [{ rotulo: "Início", href: "/" }, { rotulo: "Serviços" }];

/** Linha curta de cada serviço no catálogo (o Google Empresas tem página própria). */
const RESUMO_GE = "Organize a sua presença nas buscas locais com informações corretas, conteúdo e acompanhamento.";

export function metadataCatalogo(locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  return {
    title: tituloLocal(t(TITULO), locale),
    description: descricaoLocal(t(DESCRICAO), locale),
    alternates: alternates(locale, "/servicos"),
    openGraph: { type: "website", locale: OG_LOCALE[locale], title: `${tituloLocal(t(TITULO), locale)} · ${SITE.name}`, description: descricaoLocal(t(DESCRICAO), locale) },
  };
}

export default function Catalogo() {
  const { t, href, locale } = getT();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdOferta({ locale, caminho: "/servicos", nome: TITULO, descricao: DESCRICAO, migalhas: MIGALHAS, tipo: "WebPage" })),
        }}
      />
      <Ambience />
      <ScrollEffects />
      <Navbar />
      <main>
        <Topo
          migalhas={MIGALHAS}
          rotulo="Execução OutBox"
          titulo={
            <>
              {t("Onze serviços para")} <span className="text-brand-gradient">{t("tirar a sua empresa do lugar comum")}</span>.
            </>
          }
          apoio="Presença digital, marca, operação e vendas. Escolha um serviço ou conte o que precisa: não é preciso saber o que contratar antes de falar com a gente."
          ctas={[
            { texto: "Falar sobre meu negócio", href: "/#contato", principal: true, rastreio: "catalogo" },
            { texto: "Prefiro um diagnóstico antes", href: "/consultoria-empresarial" },
          ]}
        />

        {GRUPOS.map((g) => {
          const itens = CATALOGO.filter((c) => c.grupo === g);
          return (
            <section key={g} aria-labelledby={`grupo-${g}`} className="relative py-10 md:py-14">
              <div className="container-outbox">
                <h2 id={`grupo-${g}`} className="font-display text-[clamp(1.5rem,2.6vw,2rem)] text-white">
                  {t(g)}
                </h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {itens.map((c, i) => {
                    const resumo = c.slug === "google-empresas" ? RESUMO_GE : servicoPorSlug(c.slug)?.titulo ?? "";
                    return (
                      <li key={c.slug} className="flex">
                        <Revelar atraso={i * 0.04} className="flex w-full">
                          <Link
                            href={href(rotaServico(c))}
                            className="card-dark group flex w-full flex-col p-6 transition-colors duration-300 hover:border-[var(--color-brand)]/45 md:p-7"
                          >
                            <span className="flex items-start justify-between gap-4">
                              <span className="font-display text-[20px] leading-snug text-white">{t(c.nome)}</span>
                              <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-[var(--color-fg-muted)] transition-colors group-hover:text-[var(--color-brand)]" aria-hidden />
                            </span>
                            <span className="mt-3 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">{t(resumo)}</span>
                          </Link>
                        </Revelar>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}

        <AboutFelipe />

        <FaixaCta
          titulo="Não sabe por onde começar?"
          texto="Conte o que a sua empresa precisa e a gente indica o melhor próximo passo. Se a dúvida for de estratégia, a Consultoria Estratégica Empresarial é o caminho."
          ctas={[
            { texto: "Falar sobre meu negócio", href: "/#contato", principal: true, rastreio: "catalogo-final" },
            { texto: "Conhecer a consultoria", href: "/consultoria-empresarial" },
          ]}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
