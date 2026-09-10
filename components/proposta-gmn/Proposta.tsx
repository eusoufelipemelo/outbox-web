"use client";

import {
  AlertTriangle, ArrowRight, BarChart3, Braces, Check, FileText, Layers, Link2,
  MessageSquareText, Minus, Search, ShieldCheck, X, Zap,
} from "lucide-react";
import Image from "next/image";
import {
  AGENCIA, ASSINATURA, BLOG, COMECO, DIAGNOSTICO, DUAS_BUSCAS, ESCOPO, FAQ, FATORES,
  FECHAMENTO, GEO, INVESTIMENTO, MENSAL, PROVA, SITE_IA,
} from "./conteudo";
import { Botao, Linha, Revelar, Rotulo, Secao, Titulo, cn } from "./base";
import { Hero } from "./Hero";
import { Simulador } from "./Simulador";

export default function Proposta() {
  return (
    <>
      <Hero />
      <DuasBuscas />
      <Diagnostico />
      <Fatores />
      <Geo />
      <SiteIA />
      <Blog />
      <Simulador />
      <Mensal />
      <Escopo />
      <Investimento />
      <Comeco />
      <Prova />
      <Faq />
      <Assinatura />
      <Fechamento />
    </>
  );
}

function DuasBuscas() {
  return (
    <Secao fundo="branco">
      <Revelar>
        <Titulo className="text-tinta">{DUAS_BUSCAS.titulo}</Titulo>
        <Linha>{DUAS_BUSCAS.linha}</Linha>
      </Revelar>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {DUAS_BUSCAS.blocos.map((b, i) => (
          <Revelar key={b.id} atraso={i * 0.08}>
            <article className="h-full rounded-[24px] bg-papel p-8 ring-1 ring-linha md:p-10">
              <span className="text-[13px] font-semibold tracking-[.15em] text-marca-tinta uppercase">{b.rotulo}</span>
              <h3 className="mt-4 font-sans text-[27px] leading-[1.16] font-bold tracking-[-.028em] text-tinta">
                {b.titulo}
              </h3>
              <p className="mt-4 text-[17px] leading-[1.62] text-suave">{b.texto}</p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-linha pt-6">
                {b.pontos.map((p) => (
                  <li key={p} className="flex gap-3 text-[16px] leading-[1.5] text-corpo">
                    <Check size={19} className="mt-0.5 shrink-0 text-marca" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}

function Diagnostico() {
  return (
    <Secao>
      <Revelar>
        <Titulo className="text-tinta">{DIAGNOSTICO.titulo}</Titulo>
        <Linha>{DIAGNOSTICO.linha}</Linha>
      </Revelar>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {DIAGNOSTICO.casos.map((c, i) => (
          <Revelar key={c.titulo} atraso={i * 0.08}>
            <article
              className={cn(
                "flex h-full flex-col rounded-[24px] bg-superficie p-8 ring-1",
                c.nivel === "critico" ? "ring-[#f1553255]" : "ring-linha"
              )}
            >
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[12.5px] font-semibold",
                  c.nivel === "critico" ? "bg-marca-tenue text-marca-tinta" : "bg-elevado text-mudo"
                )}
              >
                <AlertTriangle size={13} />
                {c.etiqueta}
              </span>
              <h3 className="mt-5 font-sans text-[23px] leading-[1.18] font-bold tracking-[-.026em] text-tinta">
                {c.titulo}
              </h3>
              <p className="mt-3.5 grow text-[16.5px] leading-[1.6] text-suave">{c.texto}</p>
              <p className="mt-6 border-t border-linha pt-5 text-[15.5px] font-semibold text-marca-tinta">{c.acao}</p>
            </article>
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}

function Fatores() {
  return (
    <Secao fundo="branco">
      <Revelar>
        <Titulo className="text-tinta">{FATORES.titulo}</Titulo>
        <Linha>{FATORES.linha}</Linha>
      </Revelar>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {FATORES.itens.map((f, i) => (
          <Revelar key={f.nome} atraso={i * 0.1}>
            <article
              className={cn(
                "flex h-full flex-col rounded-[24px] p-8",
                f.controla ? "bg-tinta text-white" : "bg-papel ring-1 ring-linha"
              )}
            >
              <h3
                className={cn(
                  "font-sans text-[27px] leading-[1.1] font-bold tracking-[-.028em]",
                  f.controla ? "text-white" : "text-tinta"
                )}
              >
                {f.nome}
              </h3>
              <p className={cn("mt-4 grow text-[16.5px] leading-[1.6]", f.controla ? "text-white/70" : "text-suave")}>
                {f.texto}
              </p>
              <span
                className={cn(
                  "mt-7 inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold",
                  f.controla ? "bg-marca text-white" : "bg-elevado text-mudo"
                )}
              >
                {f.controla ? <Check size={14} /> : <Minus size={14} />}
                {f.controla ? "Você controla" : "Você não controla"}
              </span>
            </article>
          </Revelar>
        ))}
      </div>
      <Revelar atraso={0.18}>
        <p className="mt-10 max-w-[62ch] text-[19px] leading-[1.6] font-medium text-tinta">{FATORES.fecho}</p>
        <p className="mt-8 border-t border-linha pt-6 text-[14px] text-mudo">{FATORES.nota}</p>
      </Revelar>
    </Secao>
  );
}

function Geo() {
  return (
    <Secao fundo="tenue">
      <Revelar>
        <Rotulo>{GEO.selo}</Rotulo>
        <Titulo className="mt-6 text-tinta">{GEO.titulo}</Titulo>
        <Linha>{GEO.linha}</Linha>
      </Revelar>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {GEO.colunas.map((c, i) => (
          <Revelar key={c.sigla} atraso={i * 0.08}>
            <article className="h-full rounded-[24px] bg-superficie p-8 ring-1 ring-[#f1553233] md:p-10">
              <div className="flex items-baseline gap-3">
                <span className="font-sans text-[46px] leading-none font-bold tracking-[-.035em] tracking-[-.03em] text-marca">
                  {c.sigla}
                </span>
                <span className="text-[15px] text-mudo">{c.nome}</span>
              </div>
              <p className="mt-5 text-[18px] font-semibold text-tinta">{c.pergunta}</p>
              <ul className="mt-5 flex flex-col gap-3.5 border-t border-linha pt-6">
                {c.itens.map((it) => (
                  <li key={it} className="flex gap-3 text-[16.5px] leading-[1.52] text-suave">
                    <Check size={19} className="mt-0.5 shrink-0 text-marca" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </Revelar>
        ))}
      </div>
      <Revelar atraso={0.16}>
        <p className="mt-10 max-w-[68ch] text-[18px] leading-[1.62] font-medium text-tinta">{GEO.fecho}</p>
      </Revelar>
    </Secao>
  );
}

const ICONES_SITE = {
  codigo: Braces,
  raio: Zap,
  camadas: Layers,
  conversa: MessageSquareText,
  elo: Link2,
  medir: BarChart3,
} as const;

function SiteIA() {
  return (
    <Secao>
      {/* abertura em duas colunas: o argumento à esquerda, e à direita o painel
          que mostra o argumento acontecendo. A seção era só texto em coluna. */}
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Revelar>
          <Titulo className="text-tinta">{SITE_IA.titulo}</Titulo>
          <Linha>{SITE_IA.linha}</Linha>
        </Revelar>

        <Revelar atraso={0.1}>
          <div className="rounded-[24px] bg-tinta p-3 shadow-[0_28px_70px_rgba(20,14,10,.16)]">
            <div className="flex items-start gap-2.5 px-4 py-3.5">
              <span className="mt-[7px] size-2 shrink-0 rounded-full bg-marca" />
              <span className="text-[13.5px] font-semibold tracking-[.13em] text-white/55 uppercase">
                {SITE_IA.painel.titulo}
              </span>
            </div>
            <div className="rounded-[16px] bg-white/[.04] p-2 ring-1 ring-white/10">
              {SITE_IA.painel.linhas.map((l, i) => (
                <div
                  key={l.campo}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3.5",
                    i > 0 && "border-t border-white/8"
                  )}
                >
                  <span className="min-w-0 text-[15px] text-white/72 sm:text-[15.5px]">{l.campo}</span>
                  <span className="flex shrink-0 items-center gap-2 text-[13.5px] font-semibold text-marca-clara sm:text-[14px]">
                    {l.valor}
                    <Check size={15} className="text-marca" />
                  </span>
                </div>
              ))}
            </div>
            <p className="px-4 py-4 text-[14.5px] leading-[1.55] text-white/62">{SITE_IA.painel.rodape}</p>
          </div>
        </Revelar>
      </div>

      {/* os seis pontos, agora como cartões com ícone em vez de texto solto */}
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SITE_IA.itens.map((it, i) => {
          const Icone = ICONES_SITE[it.icone as keyof typeof ICONES_SITE];
          return (
            <Revelar key={it.titulo} atraso={(i % 3) * 0.07}>
              <article className="flex h-full flex-col rounded-[20px] bg-superficie p-7 ring-1 ring-linha transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(20,14,10,.07)]">
                <span className="grid size-11 place-items-center rounded-[13px] bg-marca-tenue text-marca ring-1 ring-[#f1553233]">
                  <Icone size={21} strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-[18.5px] leading-[1.3] font-bold tracking-[-.02em] text-tinta">
                  {it.titulo}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-suave">{it.texto}</p>
              </article>
            </Revelar>
          );
        })}
      </div>
    </Secao>
  );
}

function Blog() {
  return (
    <Secao fundo="branco">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <Revelar>
          <Rotulo>{BLOG.selo}</Rotulo>
          <Titulo className="mt-6 text-tinta">{BLOG.titulo}</Titulo>
          <Linha>{BLOG.linha}</Linha>

          <div className="mt-10 flex flex-col gap-7 border-t border-linha pt-8">
            {BLOG.motores.map((m) => (
              <div key={m.sigla}>
                <h3 className="text-[18px] font-bold tracking-[-.02em] text-marca-tinta">{m.sigla}</h3>
                <p className="mt-2.5 text-[16.5px] leading-[1.6] text-suave">{m.texto}</p>
              </div>
            ))}
          </div>
        </Revelar>

        {/* as perguntas que só um blog responde, cada uma virando uma porta */}
        <Revelar atraso={0.1}>
          <div className="rounded-[24px] bg-papel p-7 ring-1 ring-linha md:p-9">
            <div className="flex flex-col gap-2.5">
              {BLOG.perguntas.map((q) => (
                <div
                  key={q}
                  className="flex min-w-0 items-center gap-3 rounded-full bg-superficie px-4 py-3.5 ring-1 ring-linha sm:px-5"
                >
                  <Search size={16} className="shrink-0 text-mudo" />
                  <span className="min-w-0 truncate text-[15px] text-corpo sm:text-[15.5px]">{q}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex items-start gap-3.5 border-t border-linha pt-7">
              <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-marca-tenue text-marca ring-1 ring-[#f1553233]">
                <FileText size={19} strokeWidth={1.7} />
              </span>
              <p className="text-[16px] leading-[1.55] font-medium text-tinta">{BLOG.legenda}</p>
            </div>
          </div>
        </Revelar>
      </div>

      <Revelar atraso={0.16}>
        <p className="mt-12 max-w-[70ch] border-t border-linha pt-8 text-[18px] leading-[1.62] font-medium text-tinta">
          {BLOG.fecho}
        </p>
      </Revelar>
    </Secao>
  );
}

function Mensal() {
  return (
    <Secao fundo="branco">
      <Revelar>
        <Titulo className="text-tinta">{MENSAL.titulo}</Titulo>
        <Linha>{MENSAL.linha}</Linha>
      </Revelar>
      <div className="mt-12 overflow-hidden rounded-[24px] ring-1 ring-linha">
        {MENSAL.ciclo.map((c, i) => (
          <Revelar key={c.texto} atraso={i * 0.05}>
            <div
              className={cn(
                "flex flex-col gap-1.5 bg-papel px-7 py-6 sm:flex-row sm:items-center sm:gap-7",
                i > 0 && "border-t border-linha"
              )}
            >
              <span className="w-[128px] shrink-0 text-[13px] font-semibold tracking-[.13em] text-marca-tinta uppercase">
                {c.mes}
              </span>
              <span className="text-[17px] leading-[1.5] text-corpo">{c.texto}</span>
            </div>
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}

function Escopo() {
  return (
    <Secao>
      <Revelar>
        <Titulo className="text-tinta">{ESCOPO.titulo}</Titulo>
      </Revelar>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[ESCOPO.nosso, ESCOPO.seu].map((col, i) => (
          <Revelar key={col.titulo} atraso={i * 0.08}>
            <article className="h-full rounded-[24px] bg-superficie p-8 ring-1 ring-linha md:p-10">
              <h3 className="font-sans text-[25px] leading-[1.1] font-bold tracking-[-.028em] text-tinta">
                {col.titulo}
              </h3>
              <ul className="mt-6 flex flex-col gap-3.5">
                {col.itens.map((it) => (
                  <li key={it} className="flex gap-3 text-[16.5px] leading-[1.52] text-suave">
                    <Check size={19} className="mt-0.5 shrink-0 text-marca" />
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          </Revelar>
        ))}
      </div>
      <Revelar atraso={0.14}>
        <div className="mt-5 flex flex-col gap-3 rounded-[24px] bg-elevado p-8 ring-1 ring-linha-forte md:flex-row md:items-start md:gap-6 md:p-10">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-superficie text-mudo ring-1 ring-linha">
            <X size={20} />
          </span>
          <div>
            <h3 className="text-[19px] font-semibold text-tinta">{ESCOPO.nunca.titulo}</h3>
            <p className="mt-2.5 max-w-[74ch] text-[16.5px] leading-[1.6] text-suave">{ESCOPO.nunca.texto}</p>
          </div>
        </div>
      </Revelar>
    </Secao>
  );
}

function Investimento() {
  const { gmn, site, blog } = INVESTIMENTO;
  return (
    <Secao id="investimento" fundo="branco">
      <Revelar>
        <Titulo className="text-tinta">{INVESTIMENTO.titulo}</Titulo>
        <Linha>{INVESTIMENTO.linha}</Linha>
      </Revelar>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Revelar>
          <article className="flex h-full flex-col rounded-[24px] bg-tinta p-8 text-white md:p-10">
            <span className="text-[13px] font-semibold tracking-[.15em] text-[#ff8666] uppercase">{gmn.subtitulo}</span>
            <h3 className="mt-3 font-sans text-[30px] leading-[1.14] font-bold tracking-[-.03em]">{gmn.nome}</h3>
            <div className="mt-8 flex flex-col gap-5 border-y border-white/12 py-8">
              <div>
                <p className="text-[14.5px] text-white/55">{gmn.setup.rotulo}</p>
                <p className="mt-1 font-sans text-[44px] leading-none font-bold tracking-[-.036em]">{gmn.setup.valor}</p>
              </div>
              <div>
                <p className="text-[14.5px] text-white/55">{gmn.mensal.rotulo}</p>
                <p className="mt-1 flex items-baseline gap-2 font-sans text-[44px] leading-none font-bold tracking-[-.036em] text-marca-clara">
                  {gmn.mensal.valor}
                  <span className="font-sans text-[16px] font-medium text-white/55">{gmn.mensal.periodo}</span>
                </p>
              </div>
            </div>
            <ul className="mt-7 flex grow flex-col gap-3">
              {gmn.condicoes.map((c) => (
                <li key={c} className="flex gap-3 text-[15.5px] leading-[1.5] text-white/72">
                  <Minus size={17} className="mt-1 shrink-0 text-white/30" />
                  {c}
                </li>
              ))}
            </ul>
            <Botao href={AGENCIA.whats} className="mt-9 w-full">
              {gmn.cta} <ArrowRight size={17} />
            </Botao>
          </article>
        </Revelar>

        <Revelar atraso={0.08}>
          <article className="flex h-full flex-col rounded-[24px] bg-papel p-8 ring-1 ring-linha md:p-10">
            <span className="text-[13px] font-semibold tracking-[.15em] text-marca-tinta uppercase">{site.subtitulo}</span>
            <h3 className="mt-3 font-sans text-[30px] leading-[1.14] font-bold tracking-[-.03em] text-tinta">{site.nome}</h3>
            <p className="mt-8 border-t border-linha pt-8 text-[17px] leading-[1.6] text-suave">{site.texto}</p>
            <ul className="mt-7 flex grow flex-col gap-3.5">
              {site.lista.map((l) => (
                <li key={l} className="flex gap-3 text-[16.5px] leading-[1.52] text-suave">
                  <Check size={19} className="mt-0.5 shrink-0 text-marca" />
                  {l}
                </li>
              ))}
            </ul>
            <Botao href={AGENCIA.whatsSite} variante="contorno" className="mt-9 w-full">
              {site.cta} <ArrowRight size={17} />
            </Botao>
          </article>
        </Revelar>
      </div>

      {/* o blog tem três faixas de volume, então ganha bloco próprio em vez de
          disputar espaço num cartão ao lado dos outros dois */}
      <Revelar atraso={0.12}>
        <div className="mt-5 rounded-[24px] bg-papel p-8 ring-1 ring-linha md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-[13px] font-semibold tracking-[.15em] text-marca-tinta uppercase">{blog.subtitulo}</span>
              <h3 className="mt-3 font-sans text-[30px] leading-[1.14] font-bold tracking-[-.03em] text-tinta">{blog.nome}</h3>
            </div>
            <p className="max-w-[46ch] text-[16.5px] leading-[1.55] text-suave">{blog.linha}</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {blog.planos.map((pl) => (
              <div key={pl.qtd} className="rounded-[20px] bg-superficie p-7 ring-1 ring-linha">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-sans text-[44px] leading-none font-bold tracking-[-.038em] text-tinta">{pl.qtd}</span>
                  <span className="text-[15.5px] font-medium text-mudo">{pl.unidade}</span>
                </div>
                <div className="mt-6 border-t border-linha pt-6">
                  <p className="font-sans text-[32px] leading-none font-bold tracking-[-.034em] text-marca">{pl.valor}</p>
                  <p className="mt-1.5 text-[14.5px] text-mudo">{pl.periodo}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-4 rounded-[20px] bg-elevado p-7 ring-1 ring-linha-forte md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[18px] font-bold tracking-[-.02em] text-tinta">{blog.personalizado.titulo}</p>
              <p className="mt-1.5 max-w-[62ch] text-[16px] leading-[1.55] text-suave">{blog.personalizado.texto}</p>
            </div>
            <Botao href={AGENCIA.whats} variante="contorno" className="w-full shrink-0 text-center md:w-auto md:whitespace-nowrap">
              {blog.personalizado.cta}
            </Botao>
          </div>

          <div className="mt-8 grid gap-8 border-t border-linha pt-8 md:grid-cols-2 md:gap-12">
            <div>
              <h4 className="text-[19px] font-bold tracking-[-.02em] text-tinta">{blog.incluso.titulo}</h4>
              <ul className="mt-5 flex flex-col gap-3">
                {blog.incluso.itens.map((i) => (
                  <li key={i} className="flex gap-3 text-[16.5px] leading-[1.5] text-suave">
                    <Check size={19} className="mt-0.5 shrink-0 text-marca" />
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[16px] leading-[1.58] font-medium text-tinta">{blog.incluso.nota}</p>
            </div>

            <div className="rounded-[20px] bg-superficie p-7 ring-1 ring-[#f1553244]">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-marca-tenue text-marca-tinta">
                  <ShieldCheck size={18} strokeWidth={1.8} />
                </span>
                <h4 className="text-[18px] font-bold tracking-[-.02em] text-tinta">{blog.garantia.titulo}</h4>
              </div>
              <p className="mt-4 text-[16.5px] leading-[1.6] text-suave">{blog.garantia.texto}</p>
            </div>
          </div>

          <Botao href={AGENCIA.whats} className="mt-8 w-full md:w-auto md:px-10">
            {blog.cta} <ArrowRight size={17} />
          </Botao>
        </div>
      </Revelar>
    </Secao>
  );
}

function Comeco() {
  return (
    <Secao>
      <Revelar>
        <Titulo className="text-tinta">{COMECO.titulo}</Titulo>
      </Revelar>
      <ol className="mt-12 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {COMECO.passos.map((p, i) => (
          <Revelar key={p.n} atraso={(i % 3) * 0.07}>
            <li className="flex gap-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-marca-tenue font-sans text-[17px] font-bold text-marca-tinta ring-1 ring-[#f1553244]">
                {p.n}
              </span>
              <div>
                <h3 className="text-[19px] leading-[1.3] font-semibold text-tinta">{p.titulo}</h3>
                <p className="mt-2.5 text-[16.5px] leading-[1.58] text-suave">{p.texto}</p>
              </div>
            </li>
          </Revelar>
        ))}
      </ol>
    </Secao>
  );
}

function Faq() {
  return (
    <Secao fundo="branco">
      <Revelar>
        <Titulo className="text-tinta">{FAQ.titulo}</Titulo>
      </Revelar>
      <div className="mt-12 overflow-hidden rounded-[24px] ring-1 ring-linha">
        {FAQ.itens.map((f, i) => (
          <details key={f.p} className={cn("group bg-papel", i > 0 && "border-t border-linha")}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-7 py-6 text-[18px] font-semibold text-tinta [&::-webkit-details-marker]:hidden">
              {f.p}
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-superficie text-mudo ring-1 ring-linha transition-transform duration-200 group-open:rotate-45">
                <span className="text-[19px] leading-none">+</span>
              </span>
            </summary>
            <p className="max-w-[76ch] px-7 pb-7 text-[16.5px] leading-[1.62] text-suave">{f.r}</p>
          </details>
        ))}
      </div>
    </Secao>
  );
}

function Prova() {
  return (
    <Secao fundo="tenue">
      <Revelar>
        <Rotulo>{PROVA.selo}</Rotulo>
        <Titulo className="mt-6 text-tinta">{PROVA.titulo}</Titulo>
      </Revelar>
      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
        {PROVA.depoimentos.map((d, i) => (
          <Revelar key={d.nome} atraso={i * 0.08}>
            <figure className="flex h-full flex-col rounded-[24px] bg-superficie p-8 ring-1 ring-[#f1553226]">
              <blockquote className="grow text-[17px] leading-[1.6] text-corpo">{d.texto}</blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-linha pt-6">
                <Image
                  src={d.foto}
                  alt={d.nome}
                  width={52}
                  height={52}
                  className="size-13 shrink-0 rounded-full object-cover ring-1 ring-linha"
                />
                <div className="min-w-0">
                  <p className="text-[16px] font-bold tracking-[-.015em] text-tinta">{d.nome}</p>
                  <p className="mt-0.5 text-[14px] leading-[1.4] text-mudo">{d.cargo}</p>
                </div>
              </figcaption>
            </figure>
          </Revelar>
        ))}
      </div>
    </Secao>
  );
}

function Assinatura() {
  return (
    <Secao fundo="branco">
      <Revelar>
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[auto_1fr] md:gap-14">
          <div className="relative mx-auto w-[220px] shrink-0 md:mx-0 md:w-[260px]">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[28px] bg-marca-tenue"
            />
            <Image
              src={ASSINATURA.foto}
              alt={ASSINATURA.nome}
              width={520}
              height={646}
              className="relative w-full rounded-[24px] object-cover"
            />
          </div>
          <div>
            <Rotulo>{ASSINATURA.selo}</Rotulo>
            <p className="mt-6 text-[21px] leading-[1.55] font-medium text-tinta md:text-[23px]">
              {ASSINATURA.texto}
            </p>
            <p className="mt-5 max-w-[60ch] text-[17.5px] leading-[1.62] text-suave">{ASSINATURA.texto2}</p>
            <div className="mt-8 border-t border-linha pt-6">
              <p className="text-[18px] font-bold tracking-[-.02em] text-tinta">{ASSINATURA.nome}</p>
              <p className="mt-1 text-[15.5px] text-mudo">{ASSINATURA.cargo}</p>
            </div>
          </div>
        </div>
      </Revelar>
    </Secao>
  );
}

function Fechamento() {
  return (
    <footer className="relative overflow-hidden bg-tinta px-6 py-24 text-white md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[300px] left-1/2 size-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(241,85,50,.26), rgba(241,85,50,0) 66%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1180px]">
        <Revelar>
          <Titulo className="max-w-[18ch] text-white">{FECHAMENTO.titulo}</Titulo>
          <p className="mt-5 max-w-[58ch] text-[19px] leading-[1.62] text-white/64">{FECHAMENTO.linha}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Botao href={AGENCIA.whats}>
              {FECHAMENTO.cta} <ArrowRight size={17} />
            </Botao>
            <a
              href={AGENCIA.whats}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-[52px] items-center justify-center rounded-[10px] px-7 text-[16px] font-semibold text-white no-underline ring-1 ring-white/25 transition-colors duration-200 hover:bg-white/8"
            >
              {FECHAMENTO.secundario}
            </a>
          </div>
        </Revelar>

        <div className="mt-20 flex flex-col gap-6 border-t border-white/12 pt-9 md:flex-row md:items-center md:justify-between">
          <img src="/brand/logo-outbox-white.svg" alt={AGENCIA.nome} className="h-[24px] w-auto" />
          <div className="flex flex-col gap-1.5 text-[15px] text-white/55 md:items-end">
            <span>
              {AGENCIA.whatsRotulo} · {AGENCIA.email}
            </span>
            <span>
              Desenvolvido por:{" "}
              <a href={AGENCIA.site} target="_blank" rel="noopener" className="font-medium text-marca-clara no-underline hover:text-white">
                OutBox Group
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
