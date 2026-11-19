import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Minus } from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import { getT } from "@/lib/i18n/server";

/* Blocos das páginas de oferta (consultoria, mentorias, serviços, cases).
   Mesma linguagem da página do Google Empresas: pílula de rótulo, título em
   display, cards escuros e laranja só no que é ação. Todo texto chega em
   português e passa por t() aqui dentro. */

export const TITULO_SECAO =
  "font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white";

export type Cta = {
  texto: string;
  href: string;
  principal?: boolean;
  rastreio?: string;
};

export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <span className="pill">
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
      />
      {children}
    </span>
  );
}

export function Botoes({
  ctas,
  centro = false,
}: {
  ctas: Cta[];
  centro?: boolean;
}) {
  const { t, href } = getT();
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${centro ? "items-center justify-center" : "items-stretch sm:items-center"}`}
    >
      {ctas.map((c) =>
        c.principal ? (
          <Link
            key={c.texto}
            href={href(c.href)}
            data-cta={c.rastreio}
            className="borda-viva group flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-white py-2 pl-2 pr-6 text-[15px] font-medium text-black transition-shadow duration-300 hover:shadow-[0_14px_40px_rgba(255,255,255,0.16)]"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight
                className="h-4.5 w-4.5 text-white"
                strokeWidth={2.4}
                aria-hidden
              />
            </span>
            {t(c.texto)}
          </Link>
        ) : (
          <Link
            key={c.texto}
            href={href(c.href)}
            className="flex min-h-14 cursor-pointer items-center justify-center rounded-full border border-white/14 px-7 text-[15px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
          >
            {t(c.texto)}
          </Link>
        ),
      )}
    </div>
  );
}

export function Migalhas({
  itens,
}: {
  itens: { rotulo: string; href?: string }[];
}) {
  const { t, href } = getT();
  return (
    <nav aria-label={t("Você está em")} className="mb-7">
      <ol className="flex flex-wrap items-center gap-1 text-[13.5px] text-[var(--color-fg-muted)]">
        {itens.map((m, i) => (
          <li key={m.rotulo} className="flex items-center gap-1">
            {i > 0 && <ChevronRight aria-hidden className="h-3.5 w-3.5" />}
            {m.href ? (
              <Link
                href={href(m.href)}
                className="inline-flex min-h-11 items-center px-1 transition-colors hover:text-white"
              >
                {t(m.rotulo)}
              </Link>
            ) : (
              <span aria-current="page" className="px-1 text-white/85">
                {t(m.rotulo)}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type FocoImagem = "direita" | "centro";

/**
 * Fundo de foto do topo, no modelo da home. No celular a foto fica em cima e
 * se dissolve no fundo. No computador: com foco "direita" ela ocupa o topo
 * inteiro (a pessoa já está à direita na foto); com foco "centro" ela ocupa só
 * a direita do topo e se dissolve para a esquerda, para a pessoa do centro da
 * foto não ficar atrás do texto. Arquivos: `<imagem>-2400.webp` e `<imagem>-1200.webp`.
 */
export function FundoHero({
  imagem,
  foco = "direita",
  ancorarTopo = false,
}: {
  imagem: string;
  foco?: FocoImagem;
  /** Retrato já recortado com a cabeça logo abaixo do menu: alinha pelo topo. */
  ancorarTopo?: boolean;
}) {
  const centro = foco === "centro";
  const posicao = centro
    ? `object-center ${ancorarTopo ? "md:object-[50%_0%]" : "md:object-[50%_28%]"}`
    : `object-[82%_50%] ${ancorarTopo ? "md:object-[100%_0%]" : "md:object-[100%_32%]"}`;
  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[54svh] overflow-hidden [mask-image:linear-gradient(to_bottom,#000_55%,transparent_100%)] md:h-auto ${
          centro
            ? "md:inset-y-0 md:left-[42%] md:right-0 md:[mask-image:linear-gradient(to_right,transparent_0%,#000_30%)]"
            : "md:inset-0 md:[mask-image:none]"
        }`}
      >
        <div className="hero-bg h-full w-full">
          <picture>
            <source media="(max-width: 767px)" srcSet={`${imagem}-1200.webp`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${imagem}-2400.webp`}
              alt=""
              fetchPriority="high"
              decoding="async"
              className={`hero-bg__foto h-full w-full object-cover ${posicao}`}
            />
          </picture>
        </div>
      </div>
      {/* Sombras para o texto ler bem: lado esquerdo no computador, topo no celular */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[54svh] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,transparent_35%)] md:inset-0 md:h-auto ${
          centro
            ? "md:bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.82)_45%,rgba(0,0,0,0.3)_62%,transparent_72%)]"
            : "md:bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.8)_42%,rgba(0,0,0,0.35)_60%,transparent_80%)]"
        }`}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-black to-transparent md:block" />
    </>
  );
}

/**
 * Topo da página: migalhas, rótulo, H1, apoio e os CTAs. `lado` é o visual da
 * direita (opcional). `imagem` vira o fundo do topo, no modelo da home: a cena
 * à direita e o texto à esquerda no computador; no celular, a imagem em cima e
 * o texto embaixo. Espera dois arquivos: `<imagem>-2400.webp` e `<imagem>-1200.webp`.
 */
export function Topo({
  migalhas,
  rotulo,
  titulo,
  apoio,
  ctas,
  lado,
  imagem,
  focoImagem = "direita",
  ancorarTopo = false,
  nota,
}: {
  migalhas: { rotulo: string; href?: string }[];
  rotulo: string;
  titulo: ReactNode;
  apoio: string;
  ctas: Cta[];
  lado?: ReactNode;
  imagem?: string;
  /** Onde está a pessoa na foto: "direita" (fundo inteiro) ou "centro" (a foto ocupa a direita do topo). */
  focoImagem?: FocoImagem;
  /** Repassa ao FundoHero: foto alinhada pelo topo. */
  ancorarTopo?: boolean;
  /** Selo curto abaixo dos botões. */
  nota?: string;
}) {
  const { t } = getT();
  return (
    <section
      className={`relative overflow-hidden pb-16 md:pb-24 ${
        imagem
          ? "pt-[44svh] md:flex md:min-h-[min(100svh,960px)] md:items-center md:pt-[120px]"
          : "pt-36 md:pt-44"
      }`}
    >
      {imagem ? (
        <FundoHero imagem={imagem} foco={focoImagem} ancorarTopo={ancorarTopo} />
      ) : (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="glow glow--brand absolute -top-40 left-[30%] h-[480px] w-[640px] -translate-x-1/2" />
        </div>
      )}
      <div
        className={`container-outbox relative z-10 w-full ${lado ? "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]" : ""}`}
      >
        <div className={lado ? "" : imagem ? "max-w-[640px] xl:max-w-[700px]" : "max-w-[860px]"}>
          <Migalhas itens={migalhas} />
          <Revelar>
            <Rotulo>{t(rotulo)}</Rotulo>
          </Revelar>
          <Revelar atraso={0.05}>
            <h1
              className={
                imagem
                  ? "mt-8 font-display text-[clamp(2.4rem,5.2vw,4.4rem)] leading-[1.03] text-white text-balance"
                  : "mt-7 max-w-[20ch] font-display text-[clamp(2.3rem,5.6vw,4.2rem)] leading-[1.04] text-white"
              }
            >
              {titulo}
            </h1>
          </Revelar>
          <Revelar atraso={0.1}>
            <p
              className={
                imagem
                  ? "mt-7 max-w-[52ch] text-[17px] leading-relaxed text-white/80 md:text-lg"
                  : "mt-7 max-w-[60ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)] md:text-lg"
              }
            >
              {t(apoio)}
            </p>
          </Revelar>
          <Revelar atraso={0.15} className="mt-10">
            <Botoes ctas={ctas} />
          </Revelar>
          {nota && (
            <Revelar atraso={0.2}>
              <p className="mt-6 inline-flex rounded-full border border-white/12 bg-black/50 px-4 py-2 text-[13px] text-white/80 backdrop-blur-sm">{t(nota)}</p>
            </Revelar>
          )}
        </div>
        {lado && <Revelar atraso={0.1}>{lado}</Revelar>}
      </div>
    </section>
  );
}

/** Seção com rótulo, título e texto de abertura. */
export function Secao({
  id,
  rotulo,
  titulo,
  texto,
  children,
  centro = false,
  className = "",
}: {
  id?: string;
  rotulo?: string;
  titulo: string;
  texto?: string;
  children?: ReactNode;
  centro?: boolean;
  className?: string;
}) {
  const { t } = getT();
  return (
    <section
      id={id}
      className={`relative scroll-mt-28 py-16 md:py-24 ${className}`}
    >
      <div className="container-outbox">
        <Revelar
          className={
            centro ? "mx-auto max-w-[56ch] text-center" : "max-w-[58ch]"
          }
        >
          {rotulo && <Rotulo>{t(rotulo)}</Rotulo>}
          <h2 className={`${rotulo ? "mt-6" : ""} ${TITULO_SECAO}`}>
            {t(titulo)}
          </h2>
          {texto && (
            <p className="mt-5 text-[16.5px] leading-relaxed text-[var(--color-fg-muted)]">
              {t(texto)}
            </p>
          )}
        </Revelar>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}

/** Etapas numeradas: só para conteúdo que é de fato uma sequência. */
export function Etapas({
  itens,
}: {
  itens: { titulo: string; texto: string }[];
}) {
  const { t } = getT();
  const colunas =
    itens.length >= 4
      ? "lg:grid-cols-4"
      : itens.length === 3
        ? "lg:grid-cols-3"
        : "lg:grid-cols-2";
  return (
    <ol className={`grid gap-5 md:grid-cols-2 ${colunas}`}>
      {itens.map((e, i) => (
        <li key={e.titulo} className="flex">
          <Revelar atraso={i * 0.06} className="flex w-full">
            <article className="card-dark group relative w-full overflow-hidden p-7">
              <div
                aria-hidden
                className="absolute -right-5 -top-8 font-display text-[6rem] leading-none text-white/[0.045] transition-colors duration-500 group-hover:text-[var(--color-brand)]/12"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative z-10">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-brand)]/35 font-display text-[15px] text-[var(--color-brand)]">
                  <span className="sr-only">{t("Etapa")} </span>
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-[19px] leading-snug text-white">
                  {t(e.titulo)}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                  {t(e.texto)}
                </p>
              </div>
            </article>
          </Revelar>
        </li>
      ))}
    </ol>
  );
}

/** Lista com check laranja. */
export function ListaChecks({
  itens,
  colunas = 2,
}: {
  itens: string[];
  colunas?: 1 | 2;
}) {
  const { t } = getT();
  return (
    <ul className={`grid gap-3.5 ${colunas === 2 ? "sm:grid-cols-2" : ""}`}>
      {itens.map((i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-[15.5px] leading-relaxed text-white/90"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
            <Check
              className="h-3.5 w-3.5 text-[var(--color-brand)]"
              strokeWidth={3}
              aria-hidden
            />
          </span>
          {t(i)}
        </li>
      ))}
    </ul>
  );
}

/** O que está e o que não está no escopo, lado a lado. */
export function Escopo({
  inclui,
  naoInclui,
  tituloInclui = "O que está incluído",
  tituloNao = "O que não está incluído",
}: {
  inclui: string[];
  naoInclui: string[];
  tituloInclui?: string;
  tituloNao?: string;
}) {
  const { t } = getT();
  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
      <Revelar className="flex">
        <div className="w-full rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/35 bg-gradient-to-b from-[var(--color-brand)]/10 to-transparent p-7 md:p-9">
          <h3 className="font-display text-[21px] text-white">
            {t(tituloInclui)}
          </h3>
          <div className="mt-6">
            <ListaChecks itens={inclui} colunas={1} />
          </div>
        </div>
      </Revelar>
      <Revelar atraso={0.06} className="flex">
        <div className="w-full rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-7 md:p-9">
          <h3 className="font-display text-[21px] text-white/70">
            {t(tituloNao)}
          </h3>
          <ul className="mt-6 flex flex-col gap-3.5">
            {naoInclui.map((i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--color-fg-muted)]"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12">
                  <Minus
                    className="h-3.5 w-3.5 text-white/45"
                    strokeWidth={2.6}
                    aria-hidden
                  />
                </span>
                {t(i)}
              </li>
            ))}
          </ul>
        </div>
      </Revelar>
    </div>
  );
}

/** Bloco do formulário: título e introdução à esquerda, formulário à direita. */
export function BlocoFormulario({
  id = "formulario",
  rotulo,
  titulo,
  intro,
  children,
  lado,
}: {
  id?: string;
  rotulo: string;
  titulo: string;
  intro: string;
  children: ReactNode;
  lado?: ReactNode;
}) {
  const { t } = getT();
  return (
    <section id={id} className="relative scroll-mt-24 py-16 md:py-24">
      <div className="container-outbox">
        <div className="card-dark grid gap-10 p-7 md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Rotulo>{t(rotulo)}</Rotulo>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] leading-[1.08] text-white">
              {t(titulo)}
            </h2>
            <p className="mt-5 max-w-[46ch] leading-relaxed text-[var(--color-fg-muted)]">
              {t(intro)}
            </p>
            {lado}
          </div>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Faixa de chamada final. */
export function FaixaCta({
  titulo,
  texto,
  ctas,
}: {
  titulo: string;
  texto: string;
  ctas: Cta[];
}) {
  const { t } = getT();
  return (
    <section className="relative pb-24 md:pb-32">
      <div className="container-outbox">
        <Revelar>
          <div className="card-dark relative overflow-hidden p-8 text-center md:p-14">
            <div
              aria-hidden
              className="glow glow--brand absolute -right-24 -top-24 h-80 w-80"
            />
            <div
              aria-hidden
              className="glow glow--warm absolute -bottom-32 -left-24 h-80 w-80"
            />
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="max-w-[22ch] font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.08] text-white">
                {t(titulo)}
              </h2>
              <p className="mt-5 max-w-[54ch] leading-relaxed text-[var(--color-fg-muted)]">
                {t(texto)}
              </p>
              <div className="mt-8">
                <Botoes ctas={ctas} centro />
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}

/** Aviso de conteúdo que depende de decisão comercial. Aparece igual para o visitante: discreto e honesto. */
export function NotaNeutra({ children }: { children: string }) {
  const { t } = getT();
  return (
    <p className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[14.5px] leading-relaxed text-white/80">
      {t(children)}
    </p>
  );
}
