import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, User, Users } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import AboutFelipe from "@/components/site/AboutFelipe";
import Faq from "@/components/site/Faq";
import VerOferta from "@/components/site/VerOferta";
import FormularioLead from "@/components/site/FormularioLead";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { Revelar } from "@/components/ui/revelar";
import { BlocoFormulario, Etapas, FaixaCta, ListaChecks, NotaNeutra, Rotulo, Secao, TITULO_SECAO, Topo } from "@/components/oferta/Blocos";
import { getT } from "@/lib/i18n/server";
import { alternates } from "@/lib/i18n/meta";
import { OG_LOCALE, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { jsonLdOferta } from "@/lib/jsonld";
import { FAQ_MENTORIA, PUBLICO_MENTORIA, TEMAS_MENTORIA, camposMentoria } from "@/lib/mentoria";
import { SITE } from "@/lib/site";

/* As três páginas de mentoria: /mentoria (entrada), /mentoria/individual e
   /mentoria/grupo. Mesmo esqueleto, mensagens e formulários próprios. */

export type PaginaMentoria = "entrada" | "individual" | "grupo";

const META: Record<PaginaMentoria, { caminho: string; titulo: string; descricao: string }> = {
  entrada: {
    caminho: "/mentoria",
    titulo: "Mentorias com Felipe Melo",
    descricao:
      "Mentoria individual e em grupo para designers, freelancers e profissionais de marketing que querem construir, vender e organizar serviços digitais com método.",
  },
  individual: {
    caminho: "/mentoria/individual",
    titulo: "Mentoria individual com Felipe Melo",
    descricao:
      "Orientação direta para analisar habilidades, posicionamento, ofertas e desafios de execução ou de captação de clientes, com objetivos definidos.",
  },
  grupo: {
    caminho: "/mentoria/grupo",
    titulo: "Mentoria em grupo com Felipe Melo",
    descricao:
      "Jornada coletiva para estruturar serviços digitais, aprender fundamentos comerciais e desenvolver processos de trabalho. Entre na lista de interesse da próxima turma.",
  },
};

const MIGALHAS: Record<PaginaMentoria, { rotulo: string; href?: string }[]> = {
  entrada: [{ rotulo: "Início", href: "/" }, { rotulo: "Mentorias" }],
  individual: [{ rotulo: "Início", href: "/" }, { rotulo: "Mentorias", href: "/mentoria" }, { rotulo: "Mentoria individual" }],
  grupo: [{ rotulo: "Início", href: "/" }, { rotulo: "Mentorias", href: "/mentoria" }, { rotulo: "Mentoria em grupo" }],
};

export function metadataMentoria(pagina: PaginaMentoria, locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  const m = META[pagina];
  return {
    title: t(m.titulo),
    description: t(m.descricao),
    alternates: alternates(locale, m.caminho),
    openGraph: { type: "website", locale: OG_LOCALE[locale], title: `${t(m.titulo)} · ${SITE.name}`, description: t(m.descricao) },
  };
}

function Formatos() {
  const { t, href } = getT();
  const cards = [
    {
      Icone: User,
      rotulo: "Mentoria individual",
      titulo: "Um caminho construído para o seu momento.",
      texto: "Orientação direta para analisar habilidades, posicionamento, ofertas e desafios de execução ou captação de clientes, com objetivos definidos e ações acompanháveis.",
      status: "Entrada por avaliação de perfil",
      cta: "Quero avaliar a mentoria individual",
      link: "/mentoria/individual",
    },
    {
      Icone: Users,
      rotulo: "Mentoria em grupo",
      titulo: "Aprenda com método e com a experiência de outros profissionais.",
      texto: "Uma jornada coletiva para estruturar serviços digitais, aprender fundamentos comerciais, analisar casos e desenvolver processos de trabalho.",
      status: "Lista de interesse aberta",
      cta: "Entrar na lista de interesse",
      link: "/mentoria/grupo",
    },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {cards.map((c, i) => (
        <Revelar key={c.link} atraso={i * 0.06} className="flex">
          <article className="card-dark flex w-full flex-col p-7 md:p-9">
            <div className="flex items-center justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand)]/14">
                <c.Icone className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-[12.5px] text-white/70">{t(c.status)}</span>
            </div>
            <p className="mt-6 text-[13px] font-medium text-[var(--color-brand-soft)]">{t(c.rotulo)}</p>
            <h3 className="mt-2 font-display text-[clamp(1.4rem,2.4vw,1.8rem)] leading-tight text-white">{t(c.titulo)}</h3>
            <p className="mt-4 flex-1 leading-relaxed text-[var(--color-fg-muted)]">{t(c.texto)}</p>
            <Link
              href={href(c.link)}
              data-cta={`mentoria-${c.link.split("/").pop()}`}
              className="group mt-8 inline-flex min-h-12 w-fit cursor-pointer items-center gap-2.5 rounded-full border border-white/16 px-6 py-3 text-[15px] text-white transition-colors duration-300 hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/10"
            >
              {t(c.cta)}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} aria-hidden />
            </Link>
          </article>
        </Revelar>
      ))}
    </div>
  );
}

function Temas() {
  const { t } = getT();
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {TEMAS_MENTORIA.map((tema, i) => (
        <li key={tema.titulo}>
          <Revelar atraso={i * 0.04} className="h-full">
            <article className="card-dark h-full p-6">
              <h3 className="font-display text-[18px] leading-snug text-white">{t(tema.titulo)}</h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">{t(tema.texto)}</p>
            </article>
          </Revelar>
        </li>
      ))}
    </ul>
  );
}

function NaoEConsultoria() {
  const { t, href } = getT();
  return (
    <section className="relative py-10">
      <div className="container-outbox">
        <Revelar>
          <div className="flex flex-col gap-4 rounded-[var(--radius-xl2)] border border-white/10 bg-white/[0.025] p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <p className="max-w-[62ch] leading-relaxed text-white/85">
              {t("A mentoria trata do seu desenvolvimento profissional. Se você é empresário e quer uma análise da sua própria empresa, o caminho é a Consultoria Estratégica Empresarial.")}
            </p>
            <Link
              href={href("/consultoria-empresarial")}
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-white/16 px-6 text-[15px] text-white/85 transition-colors hover:border-white/30 hover:text-white"
            >
              {t("Conhecer a consultoria")}
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

export default function Mentoria({ pagina }: { pagina: PaginaMentoria }) {
  const { t, locale } = getT();
  const m = META[pagina];
  const jsonLd = jsonLdOferta({ locale, caminho: m.caminho, nome: m.titulo, descricao: m.descricao, migalhas: MIGALHAS[pagina], faq: FAQ_MENTORIA });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VerOferta oferta={`mentoria-${pagina}`} />
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        {pagina === "entrada" && (
          <>
            <Topo
              migalhas={MIGALHAS.entrada}
              rotulo="Aprenda o que existe por trás de uma operação digital"
              titulo={
                <>
                  {t("De habilidades soltas a serviços com")}{" "}
                  <span className="text-brand-gradient">{t("posicionamento, processo e proposta de valor")}</span>.
                </>
              }
              apoio="Com Felipe Melo, fundador da OutBox, conheça a lógica de construir, apresentar, vender e organizar serviços digitais com método e responsabilidade."
              ctas={[
                { texto: "Conhecer formatos de mentoria", href: "/mentoria#formatos", principal: true, rastreio: "mentoria" },
                { texto: "Ver os temas", href: "/mentoria#temas" },
              ]}
            />
            <Secao
              rotulo="O que você desenvolve"
              titulo="Competências que você aplica no trabalho, não promessa de faturamento."
              texto="Como escolher serviços e nichos, organizar uma oferta, conduzir um diagnóstico comercial, apresentar propostas, estruturar entregas, definir processos e evoluir profissionalmente."
            >
              <div className="flex flex-wrap gap-2">
                {PUBLICO_MENTORIA.map((p) => (
                  <span key={p} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[14px] text-white/80">
                    {t(p)}
                  </span>
                ))}
              </div>
            </Secao>
            <Secao id="formatos" rotulo="Formatos" titulo="Duas formas de aprender com Felipe.">
              <Formatos />
            </Secao>
            <Secao id="temas" rotulo="Temas" titulo="O que a mentoria trabalha." texto="Proposta de conteúdo. O programa final de cada formato é apresentado antes da contratação.">
              <Temas />
            </Secao>
            <NaoEConsultoria />
          </>
        )}

        {pagina === "individual" && (
          <>
            <Topo
              migalhas={MIGALHAS.individual}
              rotulo="Mentoria individual"
              titulo={
                <>
                  {t("Um caminho construído para")} <span className="text-brand-gradient">{t("o seu momento")}</span>.
                </>
              }
              apoio="Mentoria individual para analisar habilidades, posicionamento, ofertas e desafios de execução ou de captação de clientes. Orientação direta, objetivos definidos e ações acompanháveis."
              ctas={[
                { texto: "Quero avaliar a mentoria individual", href: "/mentoria/individual#formulario", principal: true, rastreio: "mentoria-individual" },
                { texto: "Ver os temas", href: "/mentoria/individual#temas" },
              ]}
            />
            <Secao rotulo="Como funciona" titulo="Da avaliação ao acompanhamento.">
              <Etapas
                itens={[
                  { titulo: "Você conta o seu momento", texto: "Pelo formulário, com a sua área, a sua experiência e o seu maior desafio." },
                  { titulo: "Avaliação do perfil", texto: "Felipe avalia se a mentoria individual faz sentido para o que você precisa agora." },
                  { titulo: "Objetivos definidos", texto: "Se fizer sentido, vocês combinam os objetivos, o formato e o investimento antes de começar." },
                  { titulo: "Encontros e ações", texto: "Orientação direta, com ações acompanháveis entre um encontro e outro." },
                ]}
              />
              <NotaNeutra>Valor, duração e número de encontros são informados depois da avaliação do seu perfil.</NotaNeutra>
            </Secao>
            <Secao rotulo="Para quem é" titulo="Para quem quer transformar habilidade em serviço.">
              <ListaChecks
                itens={[
                  "Você já tem uma habilidade e quer transformá-la em serviço",
                  "Você presta serviços, mas sente que falta método",
                  "Você quer revisar posicionamento, oferta e preço",
                  "Você quer organizar projetos e entregas",
                ]}
              />
            </Secao>
            <Secao id="temas" rotulo="Temas" titulo="O que pode entrar na sua mentoria." texto="Os temas são escolhidos de acordo com o seu momento.">
              <Temas />
            </Secao>
          </>
        )}

        {pagina === "grupo" && (
          <>
            <Topo
              migalhas={MIGALHAS.grupo}
              rotulo="Mentoria em grupo · lista de interesse"
              titulo={
                <>
                  {t("Aprenda com método e com")} <span className="text-brand-gradient">{t("a experiência de outros profissionais")}</span>.
                </>
              }
              apoio="Uma jornada coletiva para estruturar serviços digitais, aprender fundamentos comerciais, analisar casos e desenvolver processos de trabalho."
              ctas={[
                { texto: "Entrar na lista de interesse da próxima turma", href: "/mentoria/grupo#formulario", principal: true, rastreio: "mentoria-grupo" },
                { texto: "Ver os temas", href: "/mentoria/grupo#temas" },
              ]}
            />
            <section className="relative pb-6">
              <div className="container-outbox">
                <Revelar>
                  <div className="grid gap-6 rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/[0.06] p-7 md:grid-cols-[auto_1fr] md:items-center md:p-9">
                    <Rotulo>{t("Situação da turma")}</Rotulo>
                    <p className="leading-relaxed text-white/85">
                      {t("A lista de interesse está aberta. Ainda não há data, número de vagas nem preço definidos. Quem estiver na lista recebe as informações da turma primeiro, assim que forem definidas.")}
                    </p>
                  </div>
                </Revelar>
              </div>
            </section>
            <Secao rotulo="Como vai funcionar" titulo="Uma jornada coletiva, com método.">
              <ListaChecks
                itens={[
                  "Fundamentos comerciais para prestar serviços digitais",
                  "Estrutura de oferta, escopo e proposta",
                  "Análise de casos com o grupo",
                  "Processos de trabalho e de entrega",
                ]}
              />
            </Secao>
            <Secao id="temas" rotulo="Temas" titulo="O que a turma vai trabalhar." texto="Proposta de conteúdo. O programa da turma é apresentado antes da inscrição.">
              <Temas />
            </Secao>
          </>
        )}

        <AboutFelipe />

        <div id="perguntas">
          <Faq
            items={FAQ_MENTORIA}
            rotulo="Perguntas frequentes"
            titulo="Dúvidas sobre as mentorias."
            texto="Não encontrou a sua dúvida? Escreva no formulário que Felipe responde."
            animarTitulo={false}
          />
        </div>

        {pagina === "entrada" ? (
          <FaixaCta
            titulo="Escolha o formato que combina com o seu momento."
            texto="A individual começa por uma avaliação do seu perfil. A em grupo começa pela lista de interesse da próxima turma."
            ctas={[
              { texto: "Mentoria individual", href: "/mentoria/individual", principal: true, rastreio: "mentoria-individual-final" },
              { texto: "Mentoria em grupo", href: "/mentoria/grupo" },
            ]}
          />
        ) : (
          <BlocoFormulario
            rotulo={pagina === "individual" ? "Avaliação de perfil" : "Lista de interesse"}
            titulo="Quero aprender o método."
            intro={
              pagina === "individual"
                ? "Conte o seu nível de experiência e o que deseja desenvolver. Felipe avalia se a mentoria individual faz sentido para o seu momento."
                : "Conte o seu nível de experiência e o que deseja desenvolver. Você recebe as informações da turma assim que forem definidas."
            }
          >
            <FormularioLead
              jornada={pagina === "individual" ? "mentoria-individual" : "mentoria-grupo"}
              servicoPadrao={pagina === "individual" ? "Mentoria individual" : "Mentoria em grupo"}
              campos={camposMentoria()}
              botao={pagina === "individual" ? "Quero avaliar a mentoria individual" : "Entrar na lista de interesse"}
              aviso={
                pagina === "individual"
                  ? "Enviar o formulário não confirma vaga nem constitui contratação."
                  : "Entrar na lista de interesse não confirma vaga nem constitui contratação."
              }
            />
          </BlocoFormulario>
        )}
        {pagina !== "entrada" && <NaoEConsultoria />}
      </main>

      <Footer />
      <WhatsAppFloat contexto={pagina === "entrada" ? "Mentorias" : META[pagina].titulo} />
    </>
  );
}
