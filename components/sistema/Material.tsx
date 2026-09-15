import { AlertTriangle, ArrowRight, Check, Minus, MoveRight } from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import { whatsappLink } from "@/lib/site";
import { Indice } from "./Indice";
import { CustoAtual, Comissao } from "./Calculos";
import { Quiz } from "./Quiz";
import { Botao, Caixa, Fala, Modulo, Sub } from "./base";
import { cn } from "./util";
import {
  ABORDAR, AGORA, ARGUMENTAR, CAPA, CONTEXTO, DEMONSTRAR, DENTRO, ERROS,
  FECHAMENTO, INDICE, OBJECOES, PRECO, PRODUTO, PROVA, QUEM, SAAS,
} from "./conteudo";

export default function Material() {
  return (
    <div className="bg-papel">
      <Indice />
      <main className="lg:pl-[248px]">
        <Capa />
        <Um />
        <Dois />
        <Tres />
        <Quatro />
        <Cinco />
        <Seis />
        <Sete />
        <Oito />
        <Nove />
        <Dez />
        <Onze />
        <Doze />
        <Fim />
      </main>
    </div>
  );
}

function Capa() {
  return (
    <header className="border-b border-linha bg-superficie px-5 pt-14 pb-16 sm:px-7 md:pt-20 md:pb-20">
      <div className="mx-auto w-full max-w-[760px]">
        <span className="text-[12.5px] font-semibold tracking-[0.16em] text-marca-tinta uppercase">{CAPA.selo}</span>
        <h1 className="mt-4 font-sans text-[38px] leading-[1.03] font-bold tracking-[-0.038em] text-tinta sm:text-[52px]">
          {CAPA.titulo}
          <br />
          <span className="text-marca">{CAPA.destaque}</span>
        </h1>
        <p className="mt-6 max-w-[58ch] text-[18px] leading-[1.62] text-suave">{CAPA.linha}</p>
        <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-mudo">
          <span>{CAPA.tempo}</span>
          <span aria-hidden>·</span>
          <span>{CAPA.modulos}</span>
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[18px] bg-linha ring-1 ring-linha sm:grid-cols-3">
          {CONTEXTO.map((c) => (
            <div key={c.rotulo} className="bg-superficie px-5 py-6">
              <p className="text-[27px] leading-none font-bold tracking-[-.035em] text-marca-tinta tabular-nums">{c.valor}</p>
              <p className="mt-2.5 text-[14.5px] leading-[1.4] font-semibold text-corpo">{c.rotulo}</p>
              <p className="mt-1 text-[13px] text-mudo">{c.nota}</p>
            </div>
          ))}
        </div>

        <nav aria-label="Conteúdo do material" className="mt-12">
          <p className="text-[12.5px] font-semibold tracking-[0.16em] text-mudo uppercase">O caminho completo</p>
          <ol className="mt-4 grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {INDICE.map((m) => (
              <li key={m.id}>
                <a
                  href={`#${m.id}`}
                  className="flex cursor-pointer items-baseline gap-3 border-b border-linha py-3 text-[16px] text-corpo transition-colors duration-200 hover:text-marca-tinta focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none"
                >
                  <span className="w-5 shrink-0 text-[13px] text-mudo tabular-nums">{m.n}</span>
                  <span className="flex-1">{m.nome}</span>
                  <MoveRight size={15} className="shrink-0 text-linha-forte" aria-hidden />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </header>
  );
}

/* --------------------------------- 01 --------------------------------- */
function Um() {
  return (
    <Modulo id="produto" rotulo={PRODUTO.rotulo} titulo={PRODUTO.titulo} linha={PRODUTO.linha}>
      <Revelar>
        {/* no computador é tabela de verdade; no celular vira bloco por linha,
            porque tabela de três colunas em 375px não se lê */}
        <div className="hidden overflow-hidden rounded-[18px] ring-1 ring-linha md:block">
          <table className="w-full border-collapse bg-superficie text-left">
            <thead>
              <tr>
                <th scope="col" className="w-[22%] border-b border-linha px-4 py-4" />
                {PRODUTO.colunas.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={cn(
                      "border-b border-linha px-4 py-4 text-[14.5px] font-bold tracking-[-.01em]",
                      i === 1 ? "bg-marca-tenue text-marca-tinta" : "text-tinta"
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUTO.linhas.map((l) => (
                <tr key={l.pergunta}>
                  <th scope="row" className="border-b border-linha px-4 py-4 align-top text-[14px] font-semibold text-mudo">
                    {l.pergunta}
                  </th>
                  {l.valores.map((v, i) => (
                    <td
                      key={v}
                      className={cn(
                        "border-b border-linha px-4 py-4 align-top text-[15px] leading-[1.5]",
                        i === 1 ? "bg-marca-tenue font-semibold text-corpo" : "text-suave"
                      )}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          {PRODUTO.linhas.map((l) => (
            <Caixa key={l.pergunta}>
              <p className="text-[13px] font-semibold tracking-[0.1em] text-mudo uppercase">{l.pergunta}</p>
              <dl className="mt-3 flex flex-col gap-3">
                {l.valores.map((v, i) => (
                  <div key={v} className={cn("rounded-[11px] px-3.5 py-3", i === 1 ? "bg-marca-tenue" : "bg-elevado")}>
                    <dt className={cn("text-[12.5px] font-bold", i === 1 ? "text-marca-tinta" : "text-mudo")}>
                      {PRODUTO.colunas[i]}
                    </dt>
                    <dd className={cn("mt-1 text-[15px] leading-[1.45]", i === 1 ? "font-semibold text-corpo" : "text-suave")}>
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Caixa>
          ))}
        </div>
      </Revelar>

      <Revelar>
        <p className="mt-8 border-l-[3px] border-marca pl-5 text-[17px] leading-[1.6] text-corpo">{PRODUTO.fecho}</p>
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 02 --------------------------------- */
function Dois() {
  return (
    <Modulo id="agora" rotulo={AGORA.rotulo} titulo={AGORA.titulo} linha={AGORA.linha} fundo="branco">
      <div className="flex flex-col gap-5">
        {AGORA.pontos.map((p, i) => (
          <Revelar key={p.titulo} atraso={i * 0.06}>
            <Caixa tom="papel">
              <Sub>{p.titulo}</Sub>
              <p className="mt-3 text-[16.5px] leading-[1.65] text-suave">{p.texto}</p>
            </Caixa>
          </Revelar>
        ))}
      </div>
      <Revelar>
        <Aviso titulo={AGORA.alerta.titulo} texto={AGORA.alerta.texto} />
      </Revelar>
    </Modulo>
  );
}

function Aviso({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <div className="mt-8 flex gap-4 rounded-[16px] bg-marca-tenue px-5 py-5 ring-1 ring-[#f1553233]">
      <AlertTriangle size={20} className="mt-0.5 shrink-0 text-marca-tinta" aria-hidden />
      <div>
        <p className="text-[15.5px] font-bold text-marca-tinta">{titulo}</p>
        <p className="mt-1.5 text-[15.5px] leading-[1.6] text-[#7a4630]">{texto}</p>
      </div>
    </div>
  );
}

/* --------------------------------- 03 --------------------------------- */
function Tres() {
  return (
    <Modulo id="dentro" rotulo={DENTRO.rotulo} titulo={DENTRO.titulo} linha={DENTRO.linha}>
      <ol className="flex flex-col">
        {DENTRO.etapas.map((e, i) => (
          <Revelar key={e.n} atraso={i * 0.05}>
            <li className="flex gap-5 border-t border-linha py-6 first:border-t-0 first:pt-0">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-tinta text-[14px] font-bold text-white tabular-nums">
                {e.n}
              </span>
              <div className="min-w-0">
                <Sub>{e.titulo}</Sub>
                <p className="mt-2 text-[16.5px] leading-[1.65] text-suave">{e.texto}</p>
              </div>
            </li>
          </Revelar>
        ))}
      </ol>

      <Revelar>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Caixa>
            <p className="flex items-center gap-2 text-[15.5px] font-bold text-tinta">
              <Check size={18} className="text-marca" aria-hidden />
              {DENTRO.promessa.sim.titulo}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {DENTRO.promessa.sim.itens.map((t) => (
                <li key={t} className="flex gap-2.5 text-[15.5px] leading-[1.5] text-suave">
                  <Check size={17} className="mt-0.5 shrink-0 text-marca" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Caixa>
          <Caixa tom="elevado">
            <p className="flex items-center gap-2 text-[15.5px] font-bold text-tinta">
              <Minus size={18} className="text-mudo" aria-hidden />
              {DENTRO.promessa.nao.titulo}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {DENTRO.promessa.nao.itens.map((t) => (
                <li key={t} className="flex gap-2.5 text-[15.5px] leading-[1.5] text-suave">
                  <Minus size={17} className="mt-0.5 shrink-0 text-linha-forte" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Caixa>
        </div>
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 04 --------------------------------- */
function Quatro() {
  return (
    <Modulo id="quem" rotulo={QUEM.rotulo} titulo={QUEM.titulo} linha={QUEM.linha} fundo="branco">
      <div className="flex flex-col gap-4">
        {QUEM.sinais.map((s, i) => (
          <Revelar key={s.fala} atraso={i * 0.04}>
            <article className="rounded-[18px] bg-papel p-6 ring-1 ring-linha">
              <p className="border-l-[3px] border-marca pl-4 text-[18px] leading-[1.45] font-semibold text-tinta">
                “{s.fala}”
              </p>
              <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[12.5px] font-semibold tracking-[0.1em] text-mudo uppercase">O que significa</dt>
                  <dd className="mt-1.5 text-[15.5px] leading-[1.55] text-suave">{s.leitura}</dd>
                </div>
                <div>
                  <dt className="text-[12.5px] font-semibold tracking-[0.1em] text-marca-tinta uppercase">Você pergunta</dt>
                  <dd className="mt-1.5 text-[15.5px] leading-[1.55] font-semibold text-corpo">{s.pergunta}</dd>
                </div>
              </dl>
            </article>
          </Revelar>
        ))}
      </div>

      <Revelar>
        <Caixa tom="escuro" className="mt-8">
          <Sub escuro>{QUEM.perfil.titulo}</Sub>
          <ul className="mt-4 flex flex-col gap-2.5">
            {QUEM.perfil.itens.map((t) => (
              <li key={t} className="flex gap-2.5 text-[15.5px] leading-[1.5] text-white/72">
                <Check size={17} className="mt-0.5 shrink-0 text-[#ff8f6e]" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </Caixa>
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 05 --------------------------------- */
function Cinco() {
  return (
    <Modulo id="abordar" rotulo={ABORDAR.rotulo} titulo={ABORDAR.titulo} linha={ABORDAR.linha}>
      <Revelar>
        <Caixa>
          <Sub>{ABORDAR.roteiro.titulo}</Sub>
          <ol className="mt-5 flex flex-col gap-3.5">
            {ABORDAR.roteiro.passos.map((p) => (
              <li key={p.n} className="flex gap-3.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-marca-tenue text-[13px] font-bold text-marca-tinta tabular-nums">
                  {p.n}
                </span>
                <span className="text-[16.5px] leading-[1.5] text-corpo">{p.texto}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-linha pt-5 text-[15.5px] leading-[1.6] text-suave">{ABORDAR.roteiro.nota}</p>
        </Caixa>
      </Revelar>

      <p className="mt-10 mb-5 text-[12.5px] font-semibold tracking-[0.16em] text-mudo uppercase">
        Falas prontas, copie e adapte
      </p>
      <div className="flex flex-col gap-4">
        {ABORDAR.scripts.map((s, i) => (
          <Revelar key={s.contexto} atraso={i * 0.05}>
            <Fala contexto={s.contexto} texto={s.texto} />
          </Revelar>
        ))}
      </div>
    </Modulo>
  );
}

/* --------------------------------- 06 --------------------------------- */
function Seis() {
  return (
    <Modulo id="argumentar" rotulo={ARGUMENTAR.rotulo} titulo={ARGUMENTAR.titulo} linha={ARGUMENTAR.linha} fundo="branco">
      <ol className="flex flex-col">
        {ARGUMENTAR.metodo.map((m, i) => (
          <Revelar key={m.n} atraso={i * 0.05}>
            <li className="flex gap-5 border-t border-linha py-6 first:border-t-0 first:pt-0">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-marca-tinta text-[14px] font-bold text-white tabular-nums">
                {m.n}
              </span>
              <div className="min-w-0">
                <Sub>{m.titulo}</Sub>
                <p className="mt-2 text-[16.5px] leading-[1.65] text-suave">{m.texto}</p>
              </div>
            </li>
          </Revelar>
        ))}
      </ol>
      <Revelar>
        <CustoAtual />
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 07 --------------------------------- */
function Sete() {
  return (
    <Modulo id="demonstrar" rotulo={DEMONSTRAR.rotulo} titulo={DEMONSTRAR.titulo} linha={DEMONSTRAR.linha}>
      <div className="grid gap-5 md:grid-cols-2">
        {DEMONSTRAR.provas.map((p, i) => (
          <Revelar key={p.titulo} atraso={i * 0.05}>
            <Caixa className="h-full">
              <Sub>{p.titulo}</Sub>
              <p className="mt-3 text-[16px] leading-[1.6] text-suave">{p.texto}</p>
            </Caixa>
          </Revelar>
        ))}
      </div>
      <Revelar>
        <Aviso titulo="Regra que não se quebra" texto={DEMONSTRAR.cuidado} />
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 08 --------------------------------- */
function Oito() {
  return (
    <Modulo id="objecoes" rotulo={OBJECOES.rotulo} titulo={OBJECOES.titulo} linha={OBJECOES.linha} fundo="branco">
      <div className="flex flex-col gap-4">
        {OBJECOES.itens.map((o, i) => (
          <Revelar key={o.objecao} atraso={i * 0.03}>
            <article className="overflow-hidden rounded-[18px] bg-papel ring-1 ring-linha">
              <p className="border-b border-linha bg-elevado px-5 py-4 text-[17px] font-bold tracking-[-.01em] text-tinta">
                “{o.objecao}”
              </p>
              <div className="px-5 py-5">
                <p className="text-[12.5px] font-semibold tracking-[0.1em] text-marca-tinta uppercase">Você responde</p>
                <p className="mt-2 text-[16.5px] leading-[1.62] text-corpo">{o.resposta}</p>
                <p className="mt-4 flex gap-2.5 border-t border-linha pt-4 text-[14.5px] leading-[1.5] text-mudo">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden />
                  {o.cuidado}
                </p>
              </div>
            </article>
          </Revelar>
        ))}
      </div>
    </Modulo>
  );
}

/* --------------------------------- 09 --------------------------------- */
function Nove() {
  return (
    <Modulo id="preco" rotulo={PRECO.rotulo} titulo={PRECO.titulo} linha={PRECO.linha}>
      <Revelar>
        <div className="overflow-hidden rounded-[18px] bg-superficie ring-1 ring-linha">
          <p className="border-b border-linha bg-elevado px-5 py-4 text-[15px] font-bold text-tinta">
            {PRECO.tabela.titulo}
          </p>
          <ul>
            {PRECO.tabela.portes.map((p) => (
              <li
                key={p.nome}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-linha px-5 py-4 last:border-b-0"
              >
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-tinta">{p.nome}</p>
                  <p className="mt-0.5 text-[13.5px] text-mudo">{p.faixa}</p>
                </div>
                <p className="text-[22px] leading-none font-bold tracking-[-.03em] text-marca-tinta tabular-nums">
                  {p.valor}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Revelar>

      <Revelar>
        <Caixa tom="elevado" className="mt-5">
          <p className="text-[15px] font-bold text-tinta">{PRECO.condicoes.titulo}</p>
          <ul className="mt-3.5 flex flex-col gap-2.5">
            {PRECO.condicoes.itens.map((t) => (
              <li key={t} className="flex gap-2.5 text-[15.5px] leading-[1.5] text-suave">
                <Check size={17} className="mt-0.5 shrink-0 text-marca" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </Caixa>
      </Revelar>

      <Revelar>
        <div className="mt-12 rounded-[22px] bg-tinta px-5 py-8 sm:px-8">
          <span className="text-[12.5px] font-semibold tracking-[0.16em] text-[#ff8f6e] uppercase">
            {PRECO.comissao.rotulo}
          </span>
          <h3 className="mt-3 font-sans text-[26px] leading-[1.15] font-bold tracking-[-.028em] text-white sm:text-[32px]">
            {PRECO.comissao.titulo}
          </h3>
          <p className="mt-4 max-w-[58ch] text-[16.5px] leading-[1.62] text-white/70">{PRECO.comissao.linha}</p>

          <ul className="mt-7 grid gap-px overflow-hidden rounded-[14px] bg-white/10 sm:grid-cols-4">
            {PRECO.comissao.faixas.map((f) => (
              <li key={f.ate} className="bg-tinta px-4 py-4">
                <p className="text-[24px] leading-none font-bold tracking-[-.03em] text-white tabular-nums">{f.taxa}</p>
                <p className="mt-2 text-[13.5px] leading-[1.35] text-white/55">{f.ate}</p>
              </li>
            ))}
          </ul>

          <Comissao />
        </div>
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 10 --------------------------------- */
function Dez() {
  return (
    <Modulo id="saas" rotulo={SAAS.rotulo} titulo={SAAS.titulo} linha={SAAS.linha} fundo="tenue">
      <Revelar>
        <div className="rounded-[18px] bg-superficie p-6 ring-1 ring-[#f1553226]">
          <Sub>{SAAS.virada.titulo}</Sub>
          <p className="mt-3 text-[17px] leading-[1.62] text-corpo">{SAAS.virada.texto}</p>
        </div>
      </Revelar>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {SAAS.ganhos.map((g, i) => (
          <Revelar key={g.titulo} atraso={i * 0.05}>
            <div className="h-full rounded-[18px] bg-superficie p-6 ring-1 ring-[#f1553226]">
              <p className="text-[15.5px] font-bold text-tinta">{g.titulo}</p>
              <p className="mt-2.5 text-[15.5px] leading-[1.6] text-suave">{g.texto}</p>
            </div>
          </Revelar>
        ))}
      </div>

      <Revelar>
        <div className="mt-5 rounded-[18px] bg-superficie p-6 ring-1 ring-[#f1553226]">
          <Sub>{SAAS.qualifica.titulo}</Sub>
          <ol className="mt-4 flex flex-col gap-3">
            {SAAS.qualifica.itens.map((t, i) => (
              <li key={t} className="flex gap-3.5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-marca-tenue text-[13px] font-bold text-marca-tinta tabular-nums">
                  {i + 1}
                </span>
                <span className="text-[16.5px] leading-[1.5] text-corpo">{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-linha pt-4 text-[15.5px] leading-[1.6] text-suave">{SAAS.qualifica.nota}</p>
        </div>
      </Revelar>

      <Revelar>
        <div className="mt-8 flex gap-4 rounded-[16px] bg-tinta px-5 py-5">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-[#ff8f6e]" aria-hidden />
          <div>
            <p className="text-[15.5px] font-bold text-white">{SAAS.aviso.titulo}</p>
            <p className="mt-1.5 text-[15.5px] leading-[1.6] text-white/70">{SAAS.aviso.texto}</p>
          </div>
        </div>
      </Revelar>
    </Modulo>
  );
}

/* --------------------------------- 11 --------------------------------- */
function Onze() {
  return (
    <Modulo id="erros" rotulo={ERROS.rotulo} titulo={ERROS.titulo} linha={ERROS.linha}>
      <div className="grid gap-4 md:grid-cols-2">
        {ERROS.itens.map((e, i) => (
          <Revelar key={e.titulo} atraso={i * 0.04}>
            <Caixa className="h-full">
              <p className="text-[16px] font-bold text-tinta">{e.titulo}</p>
              <p className="mt-2 text-[15.5px] leading-[1.55] text-suave">{e.texto}</p>
            </Caixa>
          </Revelar>
        ))}
      </div>
    </Modulo>
  );
}

/* --------------------------------- 12 --------------------------------- */
function Doze() {
  return (
    <Modulo id="prova" rotulo={PROVA.rotulo} titulo={PROVA.titulo} linha={PROVA.linha} fundo="escuro">
      <Quiz />
    </Modulo>
  );
}

function Fim() {
  return (
    <footer className="border-t border-linha bg-superficie px-5 py-16 sm:px-7 md:py-20">
      <div className="mx-auto w-full max-w-[760px]">
        <h2 className="font-sans text-[28px] leading-[1.12] font-bold tracking-[-.03em] text-tinta sm:text-[34px]">
          {FECHAMENTO.titulo}
        </h2>
        <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.65] text-suave">{FECHAMENTO.linha}</p>
        <div className="mt-8">
          <Botao href={whatsappLink(FECHAMENTO.contexto)}>
            {FECHAMENTO.botao}
            <ArrowRight size={17} />
          </Botao>
        </div>
        <p className="mt-12 border-t border-linha pt-6 text-[13.5px] leading-[1.6] text-mudo">
          Material interno de formação dos consultores OutBox. Os valores e as regras de comissão são os da tabela
          vigente no sistema de consultores. Não envie este link para clientes.
        </p>
      </div>
    </footer>
  );
}
