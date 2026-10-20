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
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import Faq from "@/components/site/Faq";
import TopoPagina from "@/components/site/TopoPagina";
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
            description: `${p.artigos} artigos por mês com SEO e GEO, publicados no site e resumidos no Perfil da Empresa no Google. Mensalidade de ${formatarReais(p.preco)} mais implantação única de ${formatarReais(GE_IMPLANTACAO.valor)}.`,
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
                name: "Mensalidade",
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
                name: "Implantação",
                description: GE_IMPLANTACAO.inclui.join("; ") + `. ${GE_IMPLANTACAO.pagamento}`,
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
    <a href={geWhatsapp()} target="_blank" rel="noopener noreferrer" className="v3-btn">
      {children}
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
    </a>
  );
}

const ICONES_PROBLEMA = [MapPinOff, FileX2, TrendingDown] as const;
const TITULO_SECAO = "v3-titulo !text-[clamp(2rem,4.2vw,3.25rem)]";

export default function GoogleEmpresasPage() {
  const menorPreco = Math.min(...GE_PLANOS.map((p) => p.preco));

  return (
    <div className="sitev">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <ScrollEffects />
      <Navbar />

      <main>
        {/* Topo */}
        <TopoPagina
          palavra="GOOGLE"
          esquerda="Google Empresas"
          direita="SEO e GEO"
          titulo="Seja encontrado no Google e citado pelas IAs com artigos novos todo mês."
          texto="Artigos pensados para o seu nicho e a sua cidade, publicados no seu site e divulgados no seu Perfil da Empresa no Google. Para aparecer na busca, no ChatGPT, no Gemini e nos resumos com IA do Google."
        >
          <div className="mt-10 flex flex-col gap-6 border-t border-[var(--color-borda)] pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-3">
              <BotaoWhatsapp />
              <a href="#planos" className="v3-btn v3-btn--contorno !border-[var(--color-breu)]/25 hover:!bg-white">
                Ver os planos
              </a>
            </div>
            <ul className="flex flex-wrap gap-2 text-[14px] font-medium">
              {[
                "De 4 a 10 artigos por mês",
                "No seu site e no seu Perfil",
                `Planos a partir de ${formatarReais(menorPreco)}/mês`,
              ].map((t) => (
                <li key={t} className="v3-chip rounded-full bg-white px-4 py-2.5">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Você está em" className="mt-8">
            <ol className="flex items-center gap-1.5 text-[13.5px] text-[var(--color-cinza)]">
              <li>
                <Link href="/" className="inline-flex min-h-11 min-w-11 items-center justify-center px-1 transition-colors hover:text-[var(--color-acao)]">
                  Início
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="px-1 text-[var(--color-breu)]">
                Google Empresas
              </li>
            </ol>
          </nav>
        </TopoPagina>

        {/* O problema */}
        <section id="problema" className="relative bg-[var(--color-creme)] py-20 md:py-28">
          <div className="container-outbox">
            <Revelar className="max-w-[46ch]">
              <Rotulo>O problema</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                Por que o cliente está escolhendo o concorrente?
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--color-cinza)]">
                Muitas vezes não é preço nem qualidade, é presença: quem aparece
                com uma resposta na hora da pesquisa leva a conversa.
              </p>
            </Revelar>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {GE_PROBLEMAS.map((p, i) => {
                const Icone = ICONES_PROBLEMA[i];
                return (
                  <Revelar key={p.titulo} atraso={i * 0.06} className="flex">
                    <article className="rounded-[20px] bg-white w-full p-7">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/12">
                        <Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
                      </span>
                      <h3 className="mt-5 font-display text-[20px] leading-snug text-[var(--color-breu)]">
                        {p.titulo}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-cinza)]">
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
        <section id="como-funciona" className="tema-breu relative py-20 md:py-28">
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
        <section id="geo" className="relative bg-[var(--color-creme)] py-20 md:py-28">
          <div className="container-outbox">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
              <Revelar>
                <Rotulo>SEO e GEO</Rotulo>
                <h2 className={`mt-6 ${TITULO_SECAO}`}>O que é GEO?</h2>
                <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-[var(--color-breu)]">
                  GEO é a otimização para motores generativos, as inteligências
                  artificiais que respondem perguntas, como o ChatGPT, o Gemini e os
                  resumos com IA do Google.
                </p>
                <p className="mt-4 max-w-[60ch] leading-relaxed text-[var(--color-cinza)]">
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
                    <div className="rounded-[20px] bg-white flex items-start gap-5 p-6">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)]/12">
                        <Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
                      </span>
                      <div>
                        <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#b8330f]">
                          {rotulo}
                        </p>
                        <p className="mt-1 font-display text-[20px] text-[var(--color-breu)]">{titulo}</p>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-cinza)]">
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
        <section id="planos" className="relative scroll-mt-24 bg-[var(--color-creme)] py-20 md:py-28">
          <div className="container-outbox relative z-10">
            <Revelar className="mx-auto max-w-[52ch] text-center">
              <Rotulo>Planos</Rotulo>
              <h2 className={`mt-6 ${TITULO_SECAO}`}>
                Quantos artigos a sua empresa precisa por mês?
              </h2>
              <p className="mt-5 leading-relaxed text-[var(--color-cinza)]">
                Todos os planos têm artigos com SEO e GEO, publicação no seu site e
                resumo no Perfil da Empresa no Google. O que muda é o volume e o
                quanto a gente investe na sua cidade.
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
            rotulo="Perguntas frequentes"
            titulo="O que as empresas perguntam antes de contratar?"
            texto="Não encontrou a sua dúvida? Chame no WhatsApp e fale direto com a equipe da OutBox."
            animarTitulo={false}
          />
        </div>

        {/* Chamada final */}
        <section className="bg-[var(--color-creme)] pb-24 md:pb-32">
          <div className="container-outbox">
            <Revelar>
              <div className="flex flex-col items-center rounded-[28px] bg-[var(--color-breu)] p-8 text-center text-white md:p-14">
                <h2 className="max-w-[22ch] text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.03em]">
                  Enquanto o seu perfil está parado, alguém responde o seu cliente.
                </h2>
                <p className="mt-5 max-w-[52ch] leading-relaxed text-[#a1a1a1]">
                  Conte o seu segmento e a sua cidade no WhatsApp. A gente mostra as perguntas que o
                  seu cliente faz e por onde começar.
                </p>
                <div className="mt-8">
                  <BotaoWhatsapp />
                </div>
              </div>
            </Revelar>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat contexto={GE_CONTEXTO} />
    </div>
  );
}
