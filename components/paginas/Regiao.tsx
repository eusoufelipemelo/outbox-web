import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import Faq from "@/components/site/Faq";
import MapaOutBox from "@/components/site/MapaOutBox";
import FormularioLead, { type CampoLead } from "@/components/site/FormularioLead";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import { BlocoFormulario, Etapas, NotaNeutra, Secao, Topo } from "@/components/oferta/Blocos";
import { SITE } from "@/lib/site";
import { CATALOGO, rotaServico } from "@/lib/catalogo";
import { CIDADES, ROTA_REGIAO, SEDE } from "@/lib/regiao";
import { jsonLdOferta } from "@/lib/jsonld";

/**
 * Página regional (SEO local): a OutBox em Santa Cruz do Rio Pardo e as
 * cidades que ela atende. Só em português, porque é busca local no Brasil.
 * Nada de endereço para visita: a sede não recebe clientes.
 */

const TITULO = `Agência digital em ${SEDE.cidade} (${SEDE.uf}): sites, sistemas e identidade visual`;
const DESCRICAO = `A OutBox tem sede em ${SEDE.cidade} e cria sites, sistemas, logo e identidade visual, além de cuidar do Google Meu Negócio, para empresas de Ourinhos, Bauru, Marília, Assis e de toda a região, com atendimento por WhatsApp e videochamada também em todo o Brasil e no exterior.`;
const MIGALHAS = [{ rotulo: "Início", href: "/" }, { rotulo: `${SEDE.cidade} e região` }];

export const metadataRegiao: Metadata = {
  title: { absolute: `Agência digital em ${SEDE.cidade} e região · ${SITE.name}` },
  description: DESCRICAO,
  alternates: { canonical: `${SITE.url}${ROTA_REGIAO}` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE.url}${ROTA_REGIAO}`,
    siteName: SITE.name,
    title: `Agência digital em ${SEDE.cidade} e região · ${SITE.name}`,
    description: DESCRICAO,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
};

/** O que cada serviço resolve, em uma linha, com as palavras que as pessoas buscam. */
const RESUMO: Record<string, string> = {
  sites: "Criação de sites para empresas, rápidos e prontos para o celular.",
  "sites-com-blog": "Site com blog e painel próprio para publicar artigos.",
  "gestao-de-blog": "Artigos planejados, escritos e publicados todo mês.",
  "google-empresas": "Google Meu Negócio com artigos de SEO e GEO todo mês.",
  "landing-pages": "Uma página focada em uma oferta e em uma ação.",
  "identidade-visual": "Criação de logo, identidade visual e manual de marca.",
  "apresentacoes-comerciais": "Proposta comercial em link, no lugar do PDF.",
  "sistemas-personalizados": "Sistema de gestão sob medida para sair das planilhas.",
  "micro-saas": "Um software por assinatura para um problema recorrente.",
  "gestao-ecommerce": "Gestão da loja virtual: catálogo, compra e indicadores.",
  "gestao-marketplaces": "Anúncios, margem e reputação nos marketplaces.",
};

const ETAPAS = [
  { titulo: "Primeiro contato", texto: "Pelo WhatsApp ou pelo formulário desta página. Você conta o que a empresa precisa." },
  { titulo: "Conversa por vídeo", texto: "Uma videochamada para entender o negócio, o público e o objetivo do projeto." },
  { titulo: "Proposta", texto: "Escopo, prazo e investimento por escrito, antes de qualquer compromisso." },
  { titulo: "Projeto por link", texto: "Você acompanha cada etapa por link e aprova o que já está pronto." },
];

const FAQ = [
  {
    q: "A OutBox atende empresas de Ourinhos, Bauru e Marília?",
    a: `Sim. A OutBox tem sede em ${SEDE.cidade} e atende empresas de toda a região, como Ourinhos, Bauru, Marília, Assis, Botucatu e Avaré, e também de todo o Brasil e do exterior. O atendimento é por WhatsApp e videochamada.`,
  },
  {
    q: "Posso ir até a sede para conversar?",
    a: "A sede não recebe atendimento presencial. As reuniões são por videochamada, com a tela compartilhada, e o projeto é acompanhado por link, do primeiro rascunho à publicação.",
  },
  {
    q: "Quanto custa criar um site para a minha empresa?",
    a: "Depende do escopo: quantidade de páginas, conteúdo, blog e integrações. Depois de entender o projeto, a OutBox envia uma proposta com escopo, prazo e investimento por escrito.",
  },
  {
    q: "Vocês cuidam do Google Meu Negócio da minha empresa?",
    a: "Sim, pelo serviço Google Empresas: artigos com SEO e GEO publicados todo mês no seu site e no Perfil da Empresa no Google, o antigo Google Meu Negócio. Os planos estão na página do serviço.",
  },
  {
    q: "Ter um site ajuda a aparecer para quem busca na minha cidade?",
    a: "O Google considera a localização de quem busca, a relevância e a reputação da empresa. Um site bem estruturado e um Perfil da Empresa no Google completo aumentam as chances de aparecer nas buscas da sua cidade, sem garantia de posição.",
  },
];

const CAMPOS: CampoLead[] = [
  { nome: "nome", rotulo: "Nome", tipo: "texto", obrigatorio: true, autoComplete: "name", meia: true },
  { nome: "empresa", rotulo: "Empresa", tipo: "texto", autoComplete: "organization", meia: true },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", placeholder: "seu@email.com.br", meia: true },
  { nome: "telefone", rotulo: "WhatsApp", tipo: "tel", autoComplete: "tel", placeholder: "(00) 00000-0000", meia: true },
  { nome: "cidade", rotulo: "Cidade", tipo: "texto", autoComplete: "address-level2", placeholder: "Ex.: Ourinhos", meia: true },
  { nome: "segmento", rotulo: "Segmento", tipo: "texto", placeholder: "Ex.: clínica, loja, indústria", meia: true },
  { nome: "mensagem", rotulo: "O que a sua empresa precisa?", tipo: "area", placeholder: "Site, sistema, logo, Google Meu Negócio..." },
];

/** A rota da OutBox: da sede para as cidades vizinhas e os polos da região. */
function Rota() {
  const grupos = ["Sede", "Vizinhança", "Polos da região"] as const;
  return (
    <div className="card-dark p-6 md:p-8">
      <p className="text-[14px] text-[var(--color-fg-muted)]">Onde a OutBox atende</p>
      <ol className="relative mt-5">
        {/* A linha da rota liga a sede às outras cidades. */}
        <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-gradient-to-b from-[var(--color-brand)] via-white/20 to-white/5" />
        {grupos.map((g) => {
          const cidades = CIDADES.filter((c) => c.grupo === g);
          const sede = g === "Sede";
          return (
            <li key={g} className="relative pb-6 pl-8 last:pb-0">
              <span
                aria-hidden
                className={`absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 ${
                  sede
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)] shadow-[0_0_0_5px_rgba(241,85,50,0.18)]"
                    : "border-white/35 bg-black"
                }`}
              />
              <p className="text-[13px] text-[var(--color-fg-subtle)]">{g}</p>
              <p className={`mt-1 leading-snug ${sede ? "font-display text-[22px] text-white" : "text-[16px] text-white/85"}`}>
                {cidades.map((c) => c.nome).join(", ")}
              </p>
            </li>
          );
        })}
        <li className="relative pl-8">
          <span aria-hidden className="absolute left-[3px] top-1.5 h-[9px] w-[9px] rounded-full bg-white/25" />
          <p className="text-[15px] text-[var(--color-fg-muted)]">E empresas de todo o Brasil e do exterior, por videochamada.</p>
        </li>
      </ol>
    </div>
  );
}

export default function Regiao() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdOferta({ locale: "pt", caminho: ROTA_REGIAO, nome: TITULO, descricao: DESCRICAO, migalhas: MIGALHAS, faq: FAQ, tipo: "WebPage" }),
          ),
        }}
      />
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        <Topo
          migalhas={MIGALHAS}
          rotulo={`${SEDE.cidade} e região`}
          titulo={`Agência digital em ${SEDE.cidade} e região.`}
          apoio={`Sites, sistemas, logo, identidade visual e Google Meu Negócio feitos pela OutBox, com sede em ${SEDE.cidade} (${SEDE.uf}). Atendemos por WhatsApp e videochamada empresas de Ourinhos, Bauru, Marília, Assis, de todo o Brasil e do exterior.`}
          ctas={[
            { texto: "Falar sobre meu projeto", href: `${ROTA_REGIAO}#formulario`, principal: true, rastreio: "regiao" },
            { texto: "Ver os serviços", href: "/servicos" },
          ]}
          lado={<Rota />}
        />

        <Secao rotulo="Serviços" titulo="O que a OutBox faz pelas empresas da região.">
          <ul className="grid border-t border-white/8 md:grid-cols-2 md:gap-x-10">
            {CATALOGO.map((item) => (
              <li key={item.slug} className="border-b border-white/8">
                <Link
                  href={rotaServico(item)}
                  className="group flex min-h-[76px] items-center justify-between gap-5 py-4 transition-colors"
                >
                  <span>
                    <span className="block font-display text-[18px] text-white transition-colors group-hover:text-[var(--color-brand-soft)]">
                      {item.nome}
                    </span>
                    <span className="mt-1 block text-[14.5px] leading-snug text-[var(--color-fg-muted)]">{RESUMO[item.slug]}</span>
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-[var(--color-fg-subtle)] transition-colors group-hover:text-[var(--color-brand)]"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Secao>

        <Secao rotulo="Atendimento" titulo="Como funciona, de qualquer cidade.">
          <Etapas itens={ETAPAS} />
          <NotaNeutra>
            A sede da OutBox em Santa Cruz do Rio Pardo não recebe atendimento presencial: todo o atendimento é por WhatsApp e videochamada.
          </NotaNeutra>
        </Secao>

        <Secao rotulo="Sede" titulo={`A OutBox fica em ${SEDE.cidade}.`}>
          <Revelar>
            <MapaOutBox />
          </Revelar>
        </Secao>

        <Faq
          items={FAQ}
          rotulo="Perguntas frequentes"
          titulo="O que as empresas da região perguntam."
          texto="Se a sua dúvida não estiver aqui, conte no formulário abaixo."
          animarTitulo={false}
        />

        <BlocoFormulario
          rotulo={`${SEDE.cidade} e região`}
          titulo="Conte o que a sua empresa precisa."
          intro="A equipe da OutBox responde e marca uma conversa por vídeo, se fizer sentido para o seu projeto."
        >
          <FormularioLead jornada="projeto" campos={CAMPOS} botao="Falar sobre meu projeto" />
        </BlocoFormulario>
      </main>

      <Footer />
      <WhatsAppFloat contexto="Atendimento em Santa Cruz do Rio Pardo e região" />
    </>
  );
}
