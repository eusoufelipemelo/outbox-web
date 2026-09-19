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
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import PlanosGE from "@/components/google-empresas/PlanosGE";
import { SITE } from "@/lib/site";
import {
  GE_CONDICOES,
  GE_CONTEXTO,
  GE_FAQ,
  GE_PASSOS,
  GE_PLANOS,
  GE_PROBLEMAS,
  GE_ROTA,
  formatarReais,
  geWhatsapp,
} from "@/lib/google-empresas";

const URL_PAGINA = `${SITE.url}${GE_ROTA}`;
/* O layout acrescenta " · OutBox Group" ao título: o total fica em 53 caracteres. */
const TITULO = "Google Empresas: artigos com SEO e GEO";
const DESCRICAO =
  "Artigos com SEO e GEO publicados todo mês no seu site e no Perfil da Empresa no Google, para aparecer na busca e nas IAs. Planos a partir de R$ 900.";
const OG_IMAGEM = "/google-empresas-og.png";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: TITULO,
    description: DESCRICAO,
    alternates: { canonical: GE_ROTA },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: URL_PAGINA,
      siteName: SITE.name,
      title: `${TITULO} · ${SITE.name}`,
      description: DESCRICAO,
      images: [
        {
          url: OG_IMAGEM,
          width: 1200,
          height: 630,
          alt: "Google Empresas pela OutBox: artigos com SEO e GEO todo mês no site e no Perfil da Empresa",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${TITULO} · ${SITE.name}`,
      description: DESCRICAO,
      images: [OG_IMAGEM],
    },
  };
}

function jsonLd() {
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
        name: "Artigos com SEO e GEO para o site e o Perfil da Empresa no Google",
        serviceType: "Marketing de conteúdo com SEO e GEO",
        description:
          "Produção mensal de artigos com SEO e GEO, publicados no blog do site do cliente e divulgados no Perfil da Empresa no Google (Google Empresas), para empresas de qualquer segmento.",
        url: URL_PAGINA,
        provider: provedor,
        areaServed: { "@type": "Country", name: "Brasil" },
        audience: { "@type": "BusinessAudience", name: "Empresas de qualquer segmento" },
        termsOfService: `${GE_CONDICOES.contrato} ${GE_CONDICOES.pagamento}`,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Planos Google Empresas",
          itemListElement: GE_PLANOS.map((p) => ({
            "@type": "Offer",
            name: p.nome,
            description: `${p.artigos} artigos por mês com SEO e GEO, publicados no site e resumidos no Perfil da Empresa no Google.`,
            url: `${URL_PAGINA}#planos`,
            price: p.preco.toFixed(2),
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
            seller: provedor,
            /* A unidade da cobrança (por mês) mora aqui: unitText não é
               propriedade de Offer no schema.org, é de UnitPriceSpecification. */
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: p.preco.toFixed(2),
              priceCurrency: "BRL",
              unitText: "MONTH",
              unitCode: "MON",
              referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
            },
            eligibleDuration: { "@type": "QuantitativeValue", minValue: 6, unitCode: "MON" },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${URL_PAGINA}#perguntas`,
        mainEntity: GE_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE.url },
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

function BotaoWhatsapp({ children = "Quero aparecer no Google" }: { children?: React.ReactNode }) {
  return (
    <a
      href={geWhatsapp()}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-12 cursor-pointer items-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-black transition-all duration-300 hover:shadow-[0_14px_40px_rgba(255,255,255,0.16)]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-4.5 w-4.5 text-white" strokeWidth={2.4} aria-hidden />
      </span>
      {children}
    </a>
  );
}

const ICONES_PROBLEMA = [MapPinOff, FileX2, TrendingDown] as const;
const TITULO_SECAO = "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white";

export default function GoogleEmpresasPage() {
  const menorPreco = Math.min(...GE_PLANOS.map((p) => p.preco));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
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
            <nav aria-label="Você está em" className="mb-8">
              <ol className="flex items-center gap-1.5 text-[13.5px] text-[var(--color-fg-muted)]">
                <li>
                  <Link href="/" className="inline-flex min-h-11 min-w-11 items-center justify-center px-1 transition-colors hover:text-white">
                    Início
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
              <Rotulo>Google Empresas · SEO e GEO</Rotulo>
            </Revelar>

            <Revelar atraso={0.05}>
              <h1 className="mt-7 max-w-[19ch] font-display text-[clamp(2.3rem,6vw,4.4rem)] leading-[1.04] text-white">
                Seja <span className="text-brand-gradient">encontrado no Google</span> e{" "}
                <span className="text-brand-gradient">citado pelas IAs</span> com artigos
                novos todo mês.
              </h1>
            </Revelar>

            <Revelar atraso={0.1}>
              <p className="mx-auto mt-7 max-w-[60ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
                Artigos pensados para o seu nicho e a sua cidade, publicados no seu
                site e divulgados no seu Perfil da Empresa no Google. Para aparecer
                na busca, no ChatGPT, no Gemini e nos resumos com IA do Google.
              </p>
            </Revelar>

            <Revelar atraso={0.15} className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <BotaoWhatsapp />
              <a
                href="#planos"
                className="flex min-h-12 cursor-pointer items-center rounded-full border border-white/14 px-7 py-3.5 text-[15px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
              >
                Ver os planos
              </a>
            </Revelar>

            <Revelar atraso={0.2} className="mt-12 w-full">
              <ul className="mx-auto grid max-w-[760px] gap-3 text-[14.5px] sm:grid-cols-3">
                {[
                  "De 4 a 10 artigos por mês",
                  "No seu site e no seu Perfil",
                  `Planos a partir de ${formatarReais(menorPreco)}/mês`,
                ].map((t) => (
                  <li
                    key={t}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5 text-white/85"
                  >
                    {t}
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
              <Rotulo>O problema</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                Por que o cliente está escolhendo o concorrente?
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--color-fg-muted)]">
                Muitas vezes não é preço nem qualidade, é presença: quem aparece
                com uma resposta na hora da pesquisa leva a conversa.
              </p>
            </Revelar>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {GE_PROBLEMAS.map((p, i) => {
                const Icone = ICONES_PROBLEMA[i];
                return (
                  <Revelar key={p.titulo} atraso={i * 0.06} className="flex">
                    <article className="card-dark w-full p-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/12">
                        <Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-[20px] leading-snug text-white">
                        {p.titulo}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
                        {p.texto}
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
              <Rotulo>Como funciona</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                Como o serviço funciona, mês a mês?
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
                          <span className="sr-only">Passo </span>
                          {p.numero}
                        </span>
                        <h3 className="mt-5 font-display text-[19px] leading-snug text-white">
                          {p.titulo}
                        </h3>
                        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                          {p.texto}
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
                <Rotulo>SEO e GEO</Rotulo>
                <h2 className={`mt-6 ${TITULO_SECAO}`}>O que é GEO?</h2>
                <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-white/90">
                  GEO é a otimização para motores generativos, as inteligências
                  artificiais que respondem perguntas, como o ChatGPT, o Gemini e os
                  resumos com IA do Google.
                </p>
                <p className="mt-4 max-w-[60ch] leading-relaxed text-[var(--color-fg-muted)]">
                  É escrever e organizar o conteúdo de um jeito que essas IAs
                  entendam a sua empresa e citem o seu site na resposta. O SEO
                  continua sendo a base, porque as IAs leem o que o Google encontra.
                  A diferença está no objetivo: o SEO disputa uma posição na lista de
                  resultados, o GEO disputa a menção dentro da resposta.
                </p>
              </Revelar>

              <div className="grid gap-4">
                {[
                  {
                    Icone: Search,
                    rotulo: "SEO",
                    titulo: "Disputa posição",
                    texto: "Coloca o seu site entre os resultados quando alguém pesquisa no Google.",
                  },
                  {
                    Icone: Sparkles,
                    rotulo: "GEO",
                    titulo: "Disputa citação",
                    texto: "Faz a sua empresa ser mencionada quando alguém pergunta para uma IA.",
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

        {/* Planos */}
        <section id="planos" className="relative scroll-mt-24 py-20 md:py-28">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="glow glow--brand absolute left-1/2 top-1/3 h-[560px] w-[760px] -translate-x-1/2 opacity-70" />
          </div>
          <div className="container-outbox relative z-10">
            <Revelar className="mx-auto max-w-[52ch] text-center">
              <Rotulo>Planos</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                Quantos artigos a sua empresa precisa por mês?
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--color-fg-muted)]">
                Todos os planos têm artigos com SEO e GEO, publicação no seu site e
                resumo no Perfil da Empresa no Google. O que muda é o volume e o
                quanto a gente investe na sua cidade.
              </p>
            </Revelar>

            <PlanosGE />
          </div>
        </section>

        {/* Perguntas frequentes */}
        <div id="perguntas">
          <Faq
            items={GE_FAQ}
            rotulo="Perguntas frequentes"
            titulo="O que as empresas perguntam antes de contratar?"
            texto="Não encontrou a sua dúvida? Chame no WhatsApp e fale direto com a equipe da OutBox."
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
                    Enquanto o seu perfil está parado, alguém responde o seu cliente.
                  </h2>
                  <p className="mt-5 max-w-[52ch] leading-relaxed text-[var(--color-fg-muted)]">
                    Conte o seu segmento e a sua cidade no WhatsApp. A gente mostra
                    as perguntas que o seu cliente faz e por onde começar.
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
