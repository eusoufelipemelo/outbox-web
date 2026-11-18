import type { Metadata } from "next";
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
import { BlocoFormulario, Escopo, Etapas, FaixaCta, ListaChecks, Rotulo, Secao, TITULO_SECAO, Topo } from "@/components/oferta/Blocos";
import { getT } from "@/lib/i18n/server";
import { alternates } from "@/lib/i18n/meta";
import { OG_LOCALE, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { jsonLdOferta } from "@/lib/jsonld";
import { SITE } from "@/lib/site";

/* Consultoria Estratégica Empresarial (briefing de 18/11/2026, seção 03).
   Produto PAGO e independente da execução: nenhum texto pode sugerir
   diagnóstico gratuito nem obrigação de contratar a OutBox. Preço, duração
   e número de reuniões: PENDENTE DE APROVAÇÃO, por isso "sob proposta". */

const CAMINHO = "/consultoria-empresarial";
const TITULO = "Consultoria Estratégica Empresarial";
const DESCRICAO =
  "Diagnóstico pago de presença digital, marca, jornada comercial e processos, com plano de ação de 30, 60 e 90 dias. Sem obrigação de contratar a OutBox.";

const MIGALHAS = [{ rotulo: "Início", href: "/" }, { rotulo: "Consultoria Empresarial" }];

const SINTOMAS = [
  "O site existe, mas não comunica o valor da empresa.",
  "O Perfil da Empresa no Google está desatualizado ou esquecido.",
  "Processos internos geram retrabalho e dependem de planilhas soltas.",
  "Os investimentos digitais não conversam entre si.",
];

const ETAPAS = [
  {
    titulo: "Investigação",
    texto: "Questionário prévio sobre objetivos e momento do negócio. Pedimos acesso só aos dados necessários e autorizados por você.",
  },
  {
    titulo: "Diagnóstico",
    texto: "Análise focada de presença digital, comunicação, marca, jornada comercial e dos processos que fazem parte do escopo contratado.",
  },
  {
    titulo: "Reunião estratégica",
    texto: "Felipe apresenta as observações, faz as perguntas que faltam e discute com você as oportunidades e as decisões prioritárias.",
  },
  {
    titulo: "Plano de ação",
    texto: "Documento com prioridades, impacto esperado, complexidade, próximos passos e horizonte de 30, 60 e 90 dias.",
  },
];

const ENTREGAVEIS = [
  "Briefing estruturado e diagnóstico escrito, com achados, hipóteses e as evidências disponíveis",
  "Mapa de oportunidades classificado em urgente, importante e evolução",
  "Recomendações e riscos de cada caminho",
  "Reunião de devolutiva com Felipe Melo",
  "Plano de ação de 30, 60 e 90 dias",
];

const NAO_INCLUI = [
  "Implementação, design ou código",
  "Anúncios e gestão mensal de canais",
  "Auditoria financeira, contábil ou jurídica",
  "Qualquer item fora do escopo combinado, salvo proposta específica",
];

const PARA_QUEM = [
  "Você tem um negócio em operação",
  "Sente que os investimentos digitais não estão conectados",
  "Tem dúvidas sobre por onde começar",
  "Quer priorizar melhorias antes de contratar fornecedores",
  "Precisa de uma análise externa para decidir com mais segurança",
];

const FAQ = [
  {
    q: "A consultoria é gratuita?",
    a: "Não. O diagnóstico estratégico é uma contratação própria. Uma conversa inicial breve pode ser feita só para verificar o escopo e se a consultoria faz sentido para o seu momento.",
  },
  {
    q: "Sou obrigado a contratar a OutBox depois?",
    a: "Não. As recomendações podem ser implementadas por você, pela sua equipe ou por outros fornecedores. Contratar a OutBox para executar é uma escolha separada.",
  },
  {
    q: "Vou receber um plano prático?",
    a: "Sim. O escopo inclui prioridades e recomendações documentadas, com um plano de 30, 60 e 90 dias, conforme o contrato.",
  },
  {
    q: "É uma consultoria para qualquer área da empresa?",
    a: "Não. O foco são marca, presença digital, tecnologia, processos e as oportunidades ligadas à experiência de Felipe. Outras áreas podem pedir especialistas externos.",
  },
  {
    q: "Qual é o preço e a duração?",
    a: "São informados em proposta, depois da conversa inicial, de acordo com a abrangência e as necessidades do negócio.",
  },
] as const;

const CAMPOS: CampoLead[] = [
  { nome: "nome", rotulo: "Nome", tipo: "texto", obrigatorio: true, autoComplete: "name", meia: true },
  { nome: "empresa", rotulo: "Empresa", tipo: "texto", obrigatorio: true, autoComplete: "organization", meia: true },
  { nome: "cargo", rotulo: "Cargo", tipo: "texto", obrigatorio: true, autoComplete: "organization-title", meia: true },
  { nome: "segmento", rotulo: "Segmento", tipo: "texto", obrigatorio: true, placeholder: "Ex.: móveis planejados, clínica, indústria", meia: true },
  { nome: "site", rotulo: "Site da empresa", tipo: "url", placeholder: "https://", meia: true },
  {
    nome: "porte",
    rotulo: "Tamanho da equipe",
    tipo: "seletor",
    placeholder: "Selecione",
    opcoes: ["Só eu", "De 2 a 10 pessoas", "De 11 a 50 pessoas", "Mais de 50 pessoas"],
    meia: true,
  },
  { nome: "dificuldade", rotulo: "Qual é a maior dificuldade hoje?", tipo: "area", obrigatorio: true },
  { nome: "objetivo", rotulo: "O que você quer resolver nos próximos 90 dias?", tipo: "area", obrigatorio: true },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", placeholder: "seu@email.com.br", meia: true },
  { nome: "telefone", rotulo: "WhatsApp", tipo: "tel", autoComplete: "tel", placeholder: "(00) 00000-0000", meia: true },
];

export function metadataConsultoria(locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  return {
    title: t(TITULO),
    description: t(DESCRICAO),
    alternates: alternates(locale, CAMINHO),
    openGraph: { type: "website", locale: OG_LOCALE[locale], title: `${t(TITULO)} · ${SITE.name}`, description: t(DESCRICAO) },
  };
}

export default function Consultoria() {
  const { t, locale } = getT();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdOferta({ locale, caminho: CAMINHO, nome: TITULO, descricao: DESCRICAO, migalhas: MIGALHAS, faq: FAQ })),
        }}
      />
      <VerOferta oferta="consultoria" />
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        <Topo
          migalhas={MIGALHAS}
          rotulo="Estratégia antes da execução"
          titulo={
            <>
              {t("Sua empresa precisa de mais investimento ou de")}{" "}
              <span className="text-brand-gradient">{t("decisões melhores")}</span>?
            </>
          }
          apoio="Com a Consultoria Estratégica de Felipe Melo, você recebe uma visão externa experiente sobre presença digital, posicionamento, oportunidades comerciais e processos que podem estar travando o crescimento."
          ctas={[
            { texto: "Quero conhecer a consultoria", href: `${CAMINHO}#formulario`, principal: true, rastreio: "consultoria" },
            { texto: "Ver como funciona", href: `${CAMINHO}#como-funciona` },
          ]}
          imagem="/img/consultoria/felipe-consultoria"
          focoImagem="centro"
          nota="Serviço pago, independente da contratação de projetos"
        />

        <Secao
          rotulo="O problema"
          titulo="Nem sempre a solução é contratar mais um serviço."
          texto="Antes de escolher uma ferramenta ou um fornecedor, vale identificar o problema real e definir prioridades. Muitas vezes o que trava o crescimento aparece em pontos assim:"
        >
          <ul className="grid gap-4 md:grid-cols-2">
            {SINTOMAS.map((s, i) => (
              <li key={s}>
                <Revelar atraso={i * 0.05} className="h-full">
                  <p className="card-dark h-full p-6 text-[16px] leading-relaxed text-white/90">{t(s)}</p>
                </Revelar>
              </li>
            ))}
          </ul>
        </Secao>

        <section className="relative py-16 md:py-24">
          <div className="container-outbox">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <Revelar>
                <Rotulo>{t("Por que Felipe")}</Rotulo>
                <h2 className={`mt-6 ${TITULO_SECAO}`}>{t("Uma análise independente, com experiência de mercado.")}</h2>
                <p className="mt-6 max-w-[58ch] text-[16.5px] leading-relaxed text-[var(--color-fg-muted)]">
                  {t("Felipe Melo trabalha há mais de 15 anos com marcas e soluções digitais. A consultoria transforma essa experiência em diagnóstico, recomendações e um plano de ação para apoiar as decisões da sua empresa.")}
                </p>
              </Revelar>
              <Revelar atraso={0.06}>
                <dl className="grid grid-cols-3 gap-3">
                  {[
                    ["15", "anos com marcas e soluções digitais"],
                    ["250+", "projetos entregues"],
                    ["500+", "clientes atendidos"],
                  ].map(([n, r]) => (
                    <div key={r} className="card-dark flex flex-col justify-between p-5">
                      <dt className="order-2 mt-2 text-[13px] leading-snug text-[var(--color-fg-muted)]">{t(r)}</dt>
                      <dd className="order-1 font-display text-[2rem] leading-none text-white">{n}</dd>
                    </div>
                  ))}
                </dl>
              </Revelar>
            </div>
          </div>
        </section>

        <Secao id="como-funciona" rotulo="Como funciona" titulo="Escopo e método em 4 etapas.">
          <Etapas itens={ETAPAS} />
        </Secao>

        <Secao rotulo="Entregáveis" titulo="O que você recebe, e o que fica de fora.">
          <Escopo inclui={ENTREGAVEIS} naoInclui={NAO_INCLUI} tituloInclui="Entregáveis" tituloNao="Não inclui" />
        </Secao>

        <section className="relative py-16 md:py-24">
          <div className="container-outbox">
            <Revelar>
              <div className="relative overflow-hidden rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/35 bg-gradient-to-br from-[var(--color-brand)]/[0.12] via-transparent to-transparent p-8 md:p-12">
                <div aria-hidden className="glow glow--brand absolute -right-24 -top-24 h-72 w-72" />
                <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                  <div>
                    <Rotulo>{t("Liberdade de escolha")}</Rotulo>
                    <h2 className={`mt-6 ${TITULO_SECAO}`}>{t("O plano é seu. A execução é uma escolha.")}</h2>
                    <p className="mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-white/85">
                      {t("Você pode aplicar as recomendações com a sua equipe, com outros fornecedores ou contratar a OutBox para executar as prioridades que fizerem sentido. A consultoria é um serviço remunerado e independente da contratação de projetos.")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
                    <p className="text-[13px] font-medium text-[var(--color-brand-soft)]">{t("Investimento e duração")}</p>
                    <p className="mt-2 font-display text-[22px] text-white">{t("Sob proposta")}</p>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                      {t("Definidos depois de uma conversa breve, que serve só para verificar escopo e adequação. O diagnóstico com recomendações é um serviço pago.")}
                    </p>
                  </div>
                </div>
              </div>
            </Revelar>
          </div>
        </section>

        <Secao rotulo="Para quem é" titulo="Esta consultoria é para você se:">
          <ListaChecks itens={PARA_QUEM} />
        </Secao>

        <AboutFelipe />

        <div id="perguntas">
          <Faq
            items={FAQ}
            rotulo="Perguntas frequentes"
            titulo="O que os empresários perguntam antes de contratar."
            texto="Se a sua dúvida não estiver aqui, conte no formulário abaixo e Felipe responde."
            animarTitulo={false}
          />
        </div>

        <BlocoFormulario
          rotulo="Solicitar informações"
          titulo="Solicite informações sobre a Consultoria Estratégica."
          intro="Explique o seu momento e os seus desafios. A conversa inicial verifica escopo e adequação; o diagnóstico com recomendações é um serviço pago."
        >
          <FormularioLead
            jornada="consultoria"
            servicoPadrao="Consultoria Estratégica Empresarial"
            campos={CAMPOS}
            botao="Solicitar informações sobre o Diagnóstico Estratégico"
          />
        </BlocoFormulario>

        <FaixaCta
          titulo="Decisões melhores começam com diagnóstico."
          texto="Conte brevemente o momento da sua empresa. Vamos avaliar o escopo e explicar como a consultoria funciona."
          ctas={[{ texto: "Solicitar informações", href: `${CAMINHO}#formulario`, principal: true, rastreio: "consultoria-final" }]}
        />
      </main>

      <Footer />
      <WhatsAppFloat contexto="Consultoria Estratégica Empresarial" />
    </>
  );
}
