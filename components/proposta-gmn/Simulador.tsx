"use client";

import { useMemo, useState } from "react";
import { AGENCIA, SIMULADOR } from "./conteudo";
import { Botao, Linha, Rotulo, Titulo } from "./base";

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/* A conta é feita ao contrário de propósito: em vez de prometer volume de
   contato, parte do ticket e da taxa de fechamento do próprio cliente e mostra
   quantos clientes o serviço precisa trazer para se pagar. É matemática, não
   projeção de resultado. */
const MENSALIDADE = 900;
const IMPLANTACAO = 2000;

export function Simulador() {
  const [ticket, setTicket] = useState(1200);
  const [fecha, setFecha] = useState(4);
  const [novos, setNovos] = useState(8);

  const conta = useMemo(() => {
    const valorContato = ticket * (fecha / 10);
    const equilibrioMes = valorContato > 0 ? MENSALIDADE / valorContato : 0;
    const primeiroAno = IMPLANTACAO + MENSALIDADE * 12;
    const equilibrioAno = valorContato > 0 ? primeiroAno / (valorContato * 12) : 0;
    const receitaMes = novos * valorContato;
    const receitaAno = receitaMes * 12;
    const sobraAno = receitaAno - primeiroAno;
    return { valorContato, equilibrioMes, equilibrioAno, receitaMes, receitaAno, sobraAno, primeiroAno };
  }, [ticket, fecha, novos]);

  return (
    <section id="simulador" className="bg-tinta px-6 py-24 text-white md:py-32">
      <div className="mx-auto w-full max-w-[1180px]">
        <Rotulo escuro>{SIMULADOR.selo}</Rotulo>
        <Titulo className="mt-6 text-white">{SIMULADOR.titulo}</Titulo>
        <Linha className="text-white/64">{SIMULADOR.linha}</Linha>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          {/* entradas */}
          <div className="flex flex-col gap-7 rounded-[24px] bg-white/[.045] p-7 ring-1 ring-white/12 md:p-9">
            <Campo
              rotulo="Quanto vale, em média, um cliente para você"
              dica="Ticket médio de uma venda ou de um serviço fechado"
            >
              <div className="flex items-center gap-3 rounded-[10px] bg-white/8 px-4 ring-1 ring-white/15 focus-within:ring-marca">
                <span className="text-[17px] font-semibold text-white/50">R$</span>
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={ticket}
                  onChange={(e) => setTicket(Math.max(0, Number(e.target.value)))}
                  className="min-h-[52px] w-full bg-transparent text-[22px] font-semibold text-white outline-none"
                  aria-label="Ticket médio em reais"
                />
              </div>
            </Campo>

            <Campo
              rotulo="De cada 10 pessoas que entram em contato, quantas fecham"
              dica={`Hoje você fecha ${fecha} de cada 10`}
            >
              <Faixa valor={fecha} min={1} max={10} passo={1} onChange={setFecha} sufixo=" de 10" />
            </Campo>

            <Campo
              rotulo="Quantos contatos novos por mês você quer simular"
              dica="Use o número que você acha realista para a sua região"
            >
              <Faixa valor={novos} min={1} max={40} passo={1} onChange={setNovos} sufixo=" por mês" />
            </Campo>

            <p className="border-t border-white/12 pt-5 text-[13.5px] leading-[1.6] text-white/45">
              {SIMULADOR.aviso}
            </p>
          </div>

          {/* resultado */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[24px] bg-marca p-7 md:p-9">
              <p className="text-[15px] font-semibold tracking-[.1em] text-white/75 uppercase">
                Cada contato novo vale para você
              </p>
              <p className="mt-2 font-sans text-[clamp(44px,6vw,68px)] leading-[1.02] font-bold tracking-[-.038em] tabular-nums">
                {brl(conta.valorContato)}
              </p>
              <p className="mt-3 max-w-[46ch] text-[16px] leading-[1.55] text-white/85">
                É o seu ticket de {brl(ticket)} multiplicado pela sua taxa de fechamento de {fecha} em 10.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Cartao
                rotulo="A mensalidade se paga com"
                valor={`${Math.max(1, Math.ceil(conta.equilibrioMes))}`}
                unidade={Math.ceil(conta.equilibrioMes) === 1 ? "cliente por mês" : "clientes por mês"}
                nota={`Operação de ${brl(MENSALIDADE)} por mês`}
              />
              <Cartao
                rotulo="O primeiro ano inteiro se paga com"
                valor={`${Math.max(1, Math.ceil(conta.equilibrioAno))}`}
                unidade={Math.ceil(conta.equilibrioAno) === 1 ? "cliente por mês" : "clientes por mês"}
                nota={`Implantação mais 12 meses: ${brl(conta.primeiroAno)}`}
              />
            </div>

            <div className="rounded-[24px] bg-white/[.045] p-7 ring-1 ring-white/12 md:p-9">
              <p className="text-[15px] font-semibold tracking-[.1em] text-white/55 uppercase">
                No cenário que você marcou
              </p>
              <p className="mt-4 text-[19px] leading-[1.6] text-white/85">
                Com <strong className="font-semibold text-white">{novos} contatos novos por mês</strong>, o ano fecha em{" "}
                <strong className="font-semibold text-marca-clara">{brl(conta.receitaAno)}</strong> de receita nova.
              </p>
              <BarraComparativa receita={conta.receitaAno} custo={conta.primeiroAno} />
              <p className="mt-5 text-[16px] leading-[1.6] text-white/70">
                {conta.sobraAno > 0 ? (
                  <>
                    Depois de descontar o investimento do primeiro ano, sobram{" "}
                    <strong className="font-semibold text-white">{brl(conta.sobraAno)}</strong>.
                  </>
                ) : (
                  <>
                    Nesse cenário o investimento ainda não se paga no primeiro ano. Suba o número de contatos ou
                    confira se o ticket está certo.
                  </>
                )}
              </p>
            </div>

            <Botao href={AGENCIA.whats} variante="claro" className="w-full">
              Quero esses números na minha empresa
            </Botao>
          </div>
        </div>
      </div>
    </section>
  );
}

function Campo({ rotulo, dica, children }: { rotulo: string; dica: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[16px] font-semibold text-white">{rotulo}</span>
      <span className="mt-1 block text-[13.5px] text-white/45">{dica}</span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function Faixa({
  valor,
  min,
  max,
  passo,
  onChange,
  sufixo,
}: {
  valor: number;
  min: number;
  max: number;
  passo: number;
  onChange: (v: number) => void;
  sufixo: string;
}) {
  const pct = ((valor - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-sans text-[34px] leading-none font-bold tracking-[-.03em] text-white">{valor}</span>
        <span className="text-[15px] text-white/50">{sufixo}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={passo}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-11 w-full cursor-pointer appearance-none bg-transparent
          [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full
          [&::-webkit-slider-thumb]:mt-[-9px] [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
          [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(0,0,0,.4)]
          [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0
          [&::-moz-range-thumb]:bg-white"
        style={{
          background: `linear-gradient(90deg, #f15532 ${pct}%, rgba(255,255,255,.16) ${pct}%)`,
          borderRadius: 999,
          height: 8,
        }}
      />
    </div>
  );
}

function Cartao({ rotulo, valor, unidade, nota }: { rotulo: string; valor: string; unidade: string; nota: string }) {
  return (
    <div className="rounded-[20px] bg-white/[.045] p-6 ring-1 ring-white/12">
      <p className="text-[14px] leading-[1.45] text-white/55">{rotulo}</p>
      <p className="mt-2 font-sans text-[46px] leading-none font-bold tracking-[-.035em] text-marca-clara">{valor}</p>
      <p className="mt-1 text-[16px] font-medium text-white">{unidade}</p>
      <p className="mt-3 text-[13px] text-white/40">{nota}</p>
    </div>
  );
}

function BarraComparativa({ receita, custo }: { receita: number; custo: number }) {
  const total = Math.max(receita, custo) || 1;
  const linhas = [
    { nome: "Receita nova no ano", v: receita, cor: "bg-marca" },
    { nome: "Investimento no ano", v: custo, cor: "bg-white/25" },
  ];
  return (
    <div className="mt-6 flex flex-col gap-4">
      {linhas.map((l) => (
        <div key={l.nome}>
          <div className="flex items-baseline justify-between gap-3 text-[14px]">
            <span className="text-white/60">{l.nome}</span>
            <span className="font-semibold text-white tabular-nums">{brl(l.v)}</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            {/* largura real, com transição: acompanha o slider e nunca fica vazia */}
            <div
              className={`h-full rounded-full ${l.cor} transition-[width] duration-700 ease-out`}
              style={{ width: `${Math.min(100, (l.v / total) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
