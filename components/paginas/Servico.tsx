import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import AboutFelipe from "@/components/site/AboutFelipe";
import Faq from "@/components/site/Faq";
import VerOferta from "@/components/site/VerOferta";
import FormularioLead, { type CampoLead } from "@/components/site/FormularioLead";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import { BlocoFormulario, Escopo, Etapas, ListaChecks, NotaNeutra, Secao, Topo } from "@/components/oferta/Blocos";
import { getT } from "@/lib/i18n/server";
import { alternates } from "@/lib/i18n/meta";
import { OG_LOCALE, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { jsonLdOferta } from "@/lib/jsonld";
import { CATALOGO, rotaServico } from "@/lib/catalogo";
import { nomeServico, servicoPorSlug, SERVICOS } from "@/lib/servicos";
import { SITE } from "@/lib/site";

/* Modelo único das páginas de serviço (briefing de 18/11/2026, seção 05):
   problema, escopo, benefícios com limites, processo, responsabilidades,
   FAQ e formulário com o serviço já identificado. */

const CAMPOS: CampoLead[] = [
  { nome: "nome", rotulo: "Nome", tipo: "texto", obrigatorio: true, autoComplete: "name", meia: true },
  { nome: "empresa", rotulo: "Empresa", tipo: "texto", autoComplete: "organization", meia: true },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", placeholder: "seu@email.com.br", meia: true },
  { nome: "telefone", rotulo: "WhatsApp", tipo: "tel", autoComplete: "tel", placeholder: "(00) 00000-0000", meia: true },
  { nome: "segmento", rotulo: "Segmento", tipo: "texto", placeholder: "Ex.: móveis planejados, clínica, loja", meia: true },
  { nome: "site", rotulo: "Site atual", tipo: "url", placeholder: "https://", meia: true },
  { nome: "mensagem", rotulo: "Qual é o objetivo do projeto?", tipo: "area", placeholder: "O que você precisa resolver?" },
  { nome: "videochamada", rotulo: "Como prefere a primeira conversa?", tipo: "opcoes", opcoes: ["WhatsApp ou e-mail", "Videochamada"] },
];

export const SLUGS_SERVICO = SERVICOS.map((s) => s.slug);

export function metadataServico(slug: string, locale: Locale): Metadata {
  const s = servicoPorSlug(slug);
  if (!s) return {};
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  return {
    title: t(s.seo.titulo),
    description: t(s.seo.descricao),
    alternates: alternates(locale, `/servicos/${slug}`),
    openGraph: { type: "website", locale: OG_LOCALE[locale], title: `${t(s.seo.titulo)} · ${SITE.name}`, description: t(s.seo.descricao) },
  };
}

export default function Servico({ slug }: { slug: string }) {
  const s = servicoPorSlug(slug);
  if (!s) notFound();
  const { t, href, locale } = getT();
  const nome = nomeServico(slug);
  const caminho = `/servicos/${slug}`;
  const migalhas = [{ rotulo: "Início", href: "/" }, { rotulo: "Serviços", href: "/servicos" }, { rotulo: nome }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdOferta({ locale, caminho, nome, descricao: s.seo.descricao, migalhas, faq: s.faq })),
        }}
      />
      <VerOferta oferta={`servico-${slug}`} />
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        <Topo
          migalhas={migalhas}
          rotulo={nome}
          titulo={t(s.titulo)}
          apoio={s.apoio}
          imagem={`/img/servicos-hero/${slug}`}
          ctas={[
            { texto: "Quero um projeto", href: `${caminho}#formulario`, principal: true, rastreio: `servico-${slug}` },
            { texto: "Ver o que está incluído", href: `${caminho}#escopo` },
          ]}
        />

        <Secao rotulo="O problema" titulo={s.problema.titulo} texto={s.problema.texto}>
          <ul className="grid gap-4 md:grid-cols-3">
            {s.problema.sintomas.map((x, i) => (
              <li key={x}>
                <Revelar atraso={i * 0.05} className="h-full">
                  <p className="card-dark h-full p-6 text-[16px] leading-relaxed text-white/90">{t(x)}</p>
                </Revelar>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao id="escopo" rotulo="Escopo" titulo="O que o serviço inclui, e o que fica de fora.">
          <Escopo inclui={s.inclui} naoInclui={s.naoInclui} />
        </Secao>

        <Secao rotulo="Benefícios" titulo={s.beneficios.titulo} texto={s.beneficios.texto}>
          <ListaChecks itens={s.beneficiosLista} />
          <NotaNeutra>{s.limite}</NotaNeutra>
        </Secao>

        <Secao rotulo="Como funciona" titulo="Do briefing à entrega.">
          <Etapas itens={s.processo} />
          <div className="mt-10 rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-7 md:p-9">
            <h3 className="font-display text-[20px] text-white">{t("O que fica com você")}</h3>
            <div className="mt-5">
              <ListaChecks itens={s.cliente} colunas={1} />
            </div>
          </div>
        </Secao>

        <section className="relative py-10">
          <div className="container-outbox">
            <Revelar>
              <div className="flex flex-col gap-4 rounded-[var(--radius-xl2)] border border-white/10 bg-white/[0.025] p-6 md:flex-row md:items-center md:justify-between md:p-8">
                <p className="max-w-[60ch] leading-relaxed text-white/85">
                  {t("Quer ver quem já trabalhou com a OutBox? Conheça os clientes e o que eles dizem.")}
                </p>
                <Link
                  href={href("/cases")}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/16 px-6 text-[15px] text-white/85 transition-colors hover:border-white/30 hover:text-white"
                >
                  {t("Ver cases e clientes")}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </Link>
              </div>
            </Revelar>
          </div>
        </section>

        <AboutFelipe />

        <div id="perguntas">
          <Faq items={s.faq} rotulo="Perguntas frequentes" titulo={t("{servico}: dúvidas comuns.", { servico: t(nome) })} texto="Se a sua dúvida não estiver aqui, conte no formulário abaixo." animarTitulo={false} />
        </div>

        <BlocoFormulario
          rotulo={nome}
          titulo="Vamos entender o seu projeto."
          intro="Conte o que a sua empresa precisa e a equipe da OutBox avalia o melhor próximo passo."
        >
          <FormularioLead jornada="projeto" servicoPadrao={nome} campos={CAMPOS} botao="Quero um projeto" />
        </BlocoFormulario>

        <Secao rotulo="Serviços relacionados" titulo="Costuma andar junto.">
          <ul className="grid gap-4 md:grid-cols-3">
            {s.relacionados.map((r, i) => {
              const item = CATALOGO.find((c) => c.slug === r);
              if (!item) return null;
              return (
                <li key={r}>
                  <Revelar atraso={i * 0.05} className="h-full">
                    <Link
                      href={href(rotaServico(item))}
                      className="card-dark group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:border-[var(--color-brand)]/45"
                    >
                      <span className="font-display text-[18px] text-white">{t(item.nome)}</span>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-[var(--color-fg-muted)] transition-colors group-hover:text-[var(--color-brand)]" aria-hidden />
                    </Link>
                  </Revelar>
                </li>
              );
            })}
          </ul>
        </Secao>
      </main>

      <Footer />
      <WhatsAppFloat contexto={nome} />
    </>
  );
}
