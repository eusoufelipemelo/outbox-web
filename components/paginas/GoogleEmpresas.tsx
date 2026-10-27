import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  FileX2,
  MapPinOff,
  Search,
  Sparkles,
  TrendingDown,
} from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import Faq from "@/components/site/Faq";
import AboutFelipe from "@/components/site/AboutFelipe";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import PlanosGE from "@/components/google-empresas/PlanosGE";
import VantagensGE from "@/components/google-empresas/VantagensGE";
import { SITE } from "@/lib/site";
import {
  GE_CONDICOES,
  GE_CONTEXTO,
  GE_FAQ,
  GE_IMPLANTACAO,
  GE_PASSOS,
  GE_PLANOS,
  GE_PROBLEMAS,
  GE_ROTA,
  formatarReais,
  geWhatsapp,
} from "@/lib/google-empresas";
import { getT } from "@/lib/i18n/server";
import { alternates } from "@/lib/i18n/meta";
import { localizar, OG_LOCALE, traduzir, type Locale, type Vars } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";

const urlPagina = (locale: Locale) => `${SITE.url}${localizar(locale, GE_ROTA)}`;
/* O layout acrescenta " · OutBox Group" ao título: o total fica em 53 caracteres. */
const TITULO = "Google Empresas: artigos com SEO e GEO";
const DESCRICAO =
  "Artigos com SEO e GEO publicados todo mês no seu site e no Perfil da Empresa no Google, para aparecer na busca e nas IAs. Planos a partir de R$ 900.";
const OG_IMAGEM = "/google-empresas-og.png";

export function metadataGoogleEmpresas(locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  const titulo = t(TITULO);
  const descricao = t(DESCRICAO);
  return {
    title: titulo,
    description: descricao,
    alternates: alternates(locale, GE_ROTA),
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: urlPagina(locale),
      siteName: SITE.name,
      title: `${titulo} · ${SITE.name}`,
      description: descricao,
      images: [
        {
          url: OG_IMAGEM,
          width: 1200,
          height: 630,
          alt: t("Google Empresas pela OutBox: artigos com SEO e GEO todo mês no site e no Perfil da Empresa"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titulo} · ${SITE.name}`,
      description: descricao,
      images: [OG_IMAGEM],
    },
  };
}

function jsonLd(locale: Locale, t: (pt: string, vars?: Vars) => string) {
  const URL_PAGINA = urlPagina(locale);
  const provedor = { "@id": `${SITE.url}/#organizacao` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE.url}/#organizacao`,
        name: SITE.name,
        url: SITE.url,
        telephone: SITE.phoneE164,
        email: SITE.email,
        logo: `${SITE.url}/brand/outbox-logo-512.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Santa Cruz do Rio Pardo",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      {
        "@type": "Service",
        "@id": `${URL_PAGINA}#servico`,
        name: t("Artigos com SEO e GEO para o site e o Perfil da Empresa no Google"),
        serviceType: t("Marketing de conteúdo com SEO e GEO"),
        description: t(
          "Produção mensal de artigos com SEO e GEO, publicados no blog do site do cliente e divulgados no Perfil da Empresa no Google (Google Empresas), para empresas de qualquer segmento.",
        ),
        url: URL_PAGINA,
        provider: provedor,
        areaServed: { "@type": "Country", name: "Brasil" },
        audience: { "@type": "BusinessAudience", name: t("Empresas de qualquer segmento") },
        termsOfService: `${t(GE_CONDICOES.contrato)} ${t(GE_CONDICOES.pagamento)}`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("Planos Google Empresas"),
          itemListElement: GE_PLANOS.map((p) => ({
            "@type": "Offer",
            name: p.nome,
            description: t(
              "{artigos} artigos por mês com SEO e GEO, publicados no site e resumidos no Perfil da Empresa no Google. Mensalidade de {mensalidade} mais implantação única de {implantacao}.",
              { artigos: p.artigos, mensalidade: formatarReais(p.preco), implantacao: formatarReais(GE_IMPLANTACAO.valor) },
            ),
            url: `${URL_PAGINA}#planos`,
            price: p.preco.toFixed(2),
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            seller: provedor,
            /* A unidade da cobrança (por mês) mora aqui: unitText não é
               propriedade de Offer no schema.org, é de UnitPriceSpecification. */
            priceSpecification: [
              {
                "@type": "UnitPriceSpecification",
                name: t("Mensalidade"),
                price: p.preco.toFixed(2),
                priceCurrency: "BRL",
                unitText: "MONTH",
                unitCode: "MON",
                referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
              },
              /* Implantação: cobrança única no começo do contrato. ActivationFee é
                 o tipo do schema.org para taxa de ativação de um serviço contratado. */
              {
                "@type": "UnitPriceSpecification",
                name: t("Implantação"),
                description: GE_IMPLANTACAO.inclui.map((i) => t(i)).join("; ") + `. ${t(GE_IMPLANTACAO.pagamento)}`,
                price: GE_IMPLANTACAO.valor.toFixed(2),
                priceCurrency: "BRL",
                priceComponentType: "https://schema.org/ActivationFee",
              },
            ],
            eligibleDuration: { "@type": "QuantitativeValue", minValue: 6, unitCode: "MON" },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${URL_PAGINA}#perguntas`,
        mainEntity: GE_FAQ.map((f) => ({
          "@type": "Question",
          name: t(f.q),
          acceptedAnswer: { "@type": "Answer", text: t(f.a) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("Início"), item: `${SITE.url}${localizar(locale, "/") === "/" ? "" : localizar(locale, "/")}` },
          { "@type": "ListItem", position: 2, name: "Google Empresas", item: URL_PAGINA },
        ],
      },
    ],
  };
}

function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <span className="pill">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
      {children}
    </span>
  );
}

function BotaoWhatsapp({ children }: { children?: React.ReactNode }) {
  const { t } = getT();
  return (
    <a
      href={geWhatsapp(undefined, t)}
      target="_blank"
      rel="noopener noreferrer"
      className="borda-viva group flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-black transition-all duration-300 hover:shadow-[0_14px_40px_rgba(255,255,255,0.16)]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4.5 w-4.5 text-white" strokeWidth={2.4} aria-hidden />
      </span>
      {children ?? t("Quero aparecer no Google")}
    </a>
  );
}

const ICONES_PROBLEMA = [MapPinOff, FileX2, TrendingDown] as const;
const TITULO_SECAO = "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white";

export default function GoogleEmpresas() {
  const { t, href, locale } = getT();
  const menorPreco = Math.min(...GE_PLANOS.map((p) => p.preco));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, t)) }}
      />
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        {/* Topo */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="glow glow--brand absolute -top-40 left-1/2 h-[480px] w-[640px] -translate-x-1/2" />
          </div>

          <div className="container-outbox relative z-10 flex flex-col items-center text-center">
            <nav aria-label={t("Você está em")} className="mb-8">
              <ol className="flex items-center gap-1.5 text-[13.5px] text-[var(--color-fg-muted)]">
                <li>
                  <Link href={href("/")} className="inline-flex min-h-11 min-w-11 items-center justify-center px-1 transition-colors hover:text-white">
                    {t("Início")}
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="px-1 text-white/85">
                  Google Empresas
                </li>
              </ol>
            </nav>

            <Revelar>
              <Rotulo>{t("Google Empresas · SEO e GEO")}</Rotulo>
            </Revelar>

            <Revelar atraso={0.05}>
              <h1 className="mt-7 max-w-[19ch] font-display text-[clamp(2.3rem,6vw,4.4rem)] leading-[1.04] text-white">
                {t("Seja")} <span className="text-brand-gradient">{t("encontrado no Google")}</span> {t("e")}{" "}
                <span className="text-brand-gradient">{t("citado pelas IAs")}</span>{" "}
                {t("com artigos novos todo mês.")}
              </h1>
            </Revelar>

            <Revelar atraso={0.1}>
              <p className="mx-auto mt-7 max-w-[60ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
                {t("Artigos pensados para o seu nicho e a sua cidade, publicados no seu site e divulgados no seu Perfil da Empresa no Google. Para aparecer na busca, no ChatGPT, no Gemini e nos resumos com IA do Google.")}
              </p>
            </Revelar>

            <Revelar atraso={0.15} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <BotaoWhatsapp />
              <a
                href="#planos"
                className="flex min-h-12 cursor-pointer items-center rounded-full border border-white/14 px-7 py-3.5 text-[15px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                {t("Ver os planos")}
              </a>
            </Revelar>

            <Revelar atraso={0.2} className="mt-12 w-full">
              <ul className="mx-auto grid max-w-[760px] gap-3 text-[14.5px] sm:grid-cols-3">
                {[
                  t("De 4 a 10 artigos por mês"),
                  t("No seu site e no seu Perfil"),
                  t("Planos a partir de {valor}/mês", { valor: formatarReais(menorPreco) }),
                ].map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5 text-white/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Revelar>
          </div>
        </section>

        {/* O problema */}
        <section id="problema" className="relative py-20 md:py-28">
          <div className="container-outbox">
            <Revelar className="max-w-[46ch]">
              <Rotulo>{t("O problema")}</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                {t("Por que o cliente está escolhendo o concorrente?")}
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--color-fg-muted)]">
                {t("Muitas vezes não é preço nem qualidade, é presença: quem aparece com uma resposta na hora da pesquisa leva a conversa.")}
              </p>
            </Revelar>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {GE_PROBLEMAS.map((p, i) => {
                const Icone = ICONES_PROBLEMA[i];
                return (
                  <Revelar key={t(p.titulo)} atraso={i * 0.06} className="flex">
                    <article className="card-dark w-full p-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/12">
                        <Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-[20px] leading-snug text-white">
                        {t(p.titulo)}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
                        {t(p.texto)}
                      </p>
                    </article>
                  </Revelar>
                );
              })}
            </div>
          </div>
        </section>

        {/* Como funciona */}
        <section id="como-funciona" className="relative py-20 md:py-28">
          <div className="container-outbox">
            <Revelar className="max-w-[44ch]">
              <Rotulo>{t("Como funciona")}</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                {t("Como o serviço funciona, mês a mês?")}
              </h2>
            </Revelar>

            <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {GE_PASSOS.map((p, i) => (
                <li key={p.numero} className="flex">
                  <Revelar atraso={i * 0.06} className="flex w-full">
                    <article className="card-dark group relative w-full overflow-hidden p-7">
                      <div
                        aria-hidden
                        className="absolute -right-6 -top-8 font-display text-[6rem] leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-[var(--color-brand)]/12"
                      >
                        {p.numero}
                      </div>
                      <div className="relative z-10">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-brand)]/35 font-display text-[15px] text-[var(--color-brand)]">
                          <span className="sr-only">{t("Passo")} </span>
                          {p.numero}
                        </span>
                        <h3 className="mt-5 font-display text-[19px] leading-snug text-white">
                          {t(p.titulo)}
                        </h3>
                        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                          {t(p.texto)}
                        </p>
                      </div>
                    </article>
                  </Revelar>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GEO */}
        <section id="geo" className="relative py-20 md:py-28">
          <div className="container-outbox">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <Revelar>
                <Rotulo>{t("SEO e GEO")}</Rotulo>
                <h2 className={`mt-6 ${TITULO_SECAO}`}>{t("O que é GEO?")}</h2>
                <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-white/90">
                  {t("GEO é a otimização para motores generativos, as inteligências artificiais que respondem perguntas, como o ChatGPT, o Gemini e os resumos com IA do Google.")}
                </p>
                <p className="mt-4 max-w-[60ch] leading-relaxed text-[var(--color-fg-muted)]">
                  {t("É escrever e organizar o conteúdo de um jeito que essas IAs entendam a sua empresa e citem o seu site na resposta. O SEO continua sendo a base, porque as IAs leem o que o Google encontra. A diferença está no objetivo: o SEO disputa uma posição na lista de resultados, o GEO disputa a menção dentro da resposta.")}
                </p>
              </Revelar>

              <div className="grid gap-4">
                {[
                  {
                    Icone: Search,
                    rotulo: "SEO",
                    titulo: t("Disputa posição"),
                    texto: t("Coloca o seu site entre os resultados quando alguém pesquisa no Google."),
                  },
                  {
                    Icone: Sparkles,
                    rotulo: "GEO",
                    titulo: t("Disputa citação"),
                    texto: t("Faz a sua empresa ser mencionada quando alguém pergunta para uma IA."),
                  },
                ].map(({ Icone, rotulo, titulo, texto }, i) => (
                  <Revelar key={rotulo} atraso={i * 0.06}>
                    <div className="card-dark flex items-start gap-5 p-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)]/12">
                        <Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-brand)]">
                          {rotulo}
                        </p>
                        <p className="mt-1 font-display text-[20px] text-white">{titulo}</p>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                          {texto}
                        </p>
                      </div>
                    </div>
                  </Revelar>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vantagens: o argumento completo antes do preço */}
        <VantagensGE tituloClasse={TITULO_SECAO} />

        {/* Planos */}
        <section id="planos" className="relative scroll-mt-24 py-20 md:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="glow glow--brand absolute left-1/2 top-1/3 h-[560px] w-[760px] -translate-x-1/2 opacity-70" />
          </div>
          <div className="container-outbox relative z-10">
            <Revelar className="mx-auto max-w-[52ch] text-center">
              <Rotulo>{t("Planos")}</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                {t("Quantos artigos a sua empresa precisa por mês?")}
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--color-fg-muted)]">
                {t("Todos os planos têm artigos com SEO e GEO, publicação no seu site e resumo no Perfil da Empresa no Google. O que muda é o volume e o quanto a gente investe na sua cidade.")}
              </p>
            </Revelar>

            <PlanosGE />
          </div>
        </section>

        {/* Quem está por trás: vai em toda página nova da OutBox */}
        <AboutFelipe />

        {/* Perguntas frequentes */}
        <div id="perguntas">
          <Faq
            items={GE_FAQ}
            rotulo={t("Perguntas frequentes")}
            titulo={t("O que as empresas perguntam antes de contratar?")}
            texto={t("Não encontrou a sua dúvida? Chame no WhatsApp e fale direto com a equipe da OutBox.")}
            animarTitulo={false}
          />
        </div>

        {/* Chamada final */}
        <section className="relative pb-24 md:pb-32">
          <div className="container-outbox">
            <Revelar>
              <div className="card-dark relative overflow-hidden p-8 text-center md:p-14">
                <div aria-hidden className="glow glow--brand absolute -right-24 -top-24 h-80 w-80" />
                <div aria-hidden className="glow glow--warm absolute -bottom-32 -left-24 h-80 w-80" />
                <div className="relative z-10 flex flex-col items-center">
                  <h2 className="max-w-[22ch] font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.08] text-white">
                    {t("Enquanto o seu perfil está parado, alguém responde o seu cliente.")}
                  </h2>
                  <p className="mt-5 max-w-[52ch] leading-relaxed text-[var(--color-fg-muted)]">
                    {t("Conte o seu segmento e a sua cidade no WhatsApp. A gente mostra as perguntas que o seu cliente faz e por onde começar.")}
                  </p>
                  <div className="mt-8">
                    <BotaoWhatsapp />
                  </div>
                </div>
              </div>
            </Revelar>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat contexto={GE_CONTEXTO} />
    </>
  );
}
