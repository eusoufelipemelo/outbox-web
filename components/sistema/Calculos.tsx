"use client";

import { useState } from "react";
import { ARGUMENTAR, PRECO } from "./conteudo";
import { Caixa, Sub } from "./base";
import { cn, reais } from "./util";

const SEMANAS_NO_MES = 4.33;

/* Faixas marginais idênticas às do sistema de consultores. Se a regra mudar lá,
   muda aqui, senão o material passa a ensinar uma conta que não é a que paga. */
const FAIXAS: { ate: number; taxa: number }[] = [
  { ate: 5000, taxa: 0.08 },
  { ate: 15000, taxa: 0.1 },
  { ate: 30000, taxa: 0.12 },
  { ate: Infinity, taxa: 0.2 },
];
const REGUA_FIXO = 20000;
const VALOR_FIXO = 2000;

function comissaoMarginal(volume: number) {
  let anterior = 0;
  let total = 0;
  for (const f of FAIXAS) {
    total += Math.max(0, Math.min(volume, f.ate) - anterior) * f.taxa;
    anterior = f.ate;
    if (volume <= f.ate) break;
  }
  return total;
}
function taxaMarginal(volume: number) {
  for (const f of FAIXAS) if (volume <= f.ate) return f.taxa;
  return FAIXAS[FAIXAS.length - 1].taxa;
}

function Faixa({
  id,
  rotulo,
  ajuda,
  valor,
  min,
  max,
  passo = 1,
  sufixo,
  aoMudar,
  escuro = false,
}: {
  id: string;
  rotulo: string;
  ajuda?: string;
  valor: number;
  min: number;
  max: number;
  passo?: number;
  sufixo: string;
  aoMudar: (v: number) => void;
  escuro?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className={cn("block text-[14.5px] font-semibold", escuro ? "text-white" : "text-corpo")}>
        {rotulo}
      </label>
      {ajuda && <p className={cn("mt-1 text-[13px]", escuro ? "text-white/55" : "text-mudo")}>{ajuda}</p>}
      <div className="mt-3 flex items-center gap-4">
        <output
          htmlFor={id}
          className={cn(
            "shrink-0 text-[26px] leading-none font-bold tracking-[-.03em] tabular-nums",
            escuro ? "text-white" : "text-tinta"
          )}
        >
          {valor.toLocaleString("pt-BR")}
          <span className={cn("ml-1.5 text-[13px] font-medium", escuro ? "text-white/55" : "text-mudo")}>{sufixo}</span>
        </output>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={passo}
          value={valor}
          onChange={(e) => aoMudar(Number(e.target.value))}
          className={cn("h-11 flex-1 cursor-pointer accent-[#f15532]", escuro && "accent-[#f15532]")}
        />
      </div>
    </div>
  );
}

/* --------- Módulo 6: quanto custa continuar como está --------- */
export function CustoAtual() {
  const [pessoas, setPessoas] = useState(3);
  const [horas, setHoras] = useState(5);
  const [custoHora, setCustoHora] = useState(28);
  const [investimento, setInvestimento] = useState(19000);

  const c = ARGUMENTAR.simulador.campos;
  const mensal = pessoas * horas * SEMANAS_NO_MES * custoHora;
  const anual = mensal * 12;
  const meses = mensal > 0 ? investimento / mensal : 0;
  const tresAnos = anual * 3 - investimento;

  return (
    <Caixa className="mt-8 !p-0">
      <div className="border-b border-linha px-6 py-6 sm:px-7">
        <span className="text-[12.5px] font-semibold tracking-[0.14em] text-marca-tinta uppercase">
          {ARGUMENTAR.simulador.rotulo}
        </span>
        <Sub>
          <span className="mt-2 block">{ARGUMENTAR.simulador.titulo}</span>
        </Sub>
        <p className="mt-3 max-w-[58ch] text-[15.5px] leading-[1.6] text-suave">{ARGUMENTAR.simulador.linha}</p>
      </div>

      <div className="flex flex-col gap-7 px-6 py-7 sm:px-7">
        <Faixa id="ca-pessoas" rotulo={c.pessoas.rotulo} ajuda={c.pessoas.ajuda} valor={pessoas} min={1} max={30} sufixo="pessoas" aoMudar={setPessoas} />
        <Faixa id="ca-horas" rotulo={c.horas.rotulo} ajuda={c.horas.ajuda} valor={horas} min={1} max={25} sufixo="horas" aoMudar={setHoras} />
        <Faixa id="ca-custo" rotulo={c.custo.rotulo} ajuda={c.custo.ajuda} valor={custoHora} min={15} max={150} passo={1} sufixo="reais por hora" aoMudar={setCustoHora} />

        <div>
          <span className="block text-[14.5px] font-semibold text-corpo">{c.investimento.rotulo}</span>
          <p className="mt-1 text-[13px] text-mudo">{c.investimento.ajuda}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRECO.tabela.portes.map((p) => {
              const v = Number(p.valor.replace(/\D/g, ""));
              const on = v === investimento;
              return (
                <button
                  key={p.nome}
                  type="button"
                  onClick={() => setInvestimento(v)}
                  aria-pressed={on}
                  className={cn(
                    "min-h-[44px] cursor-pointer rounded-[10px] px-4 text-[14px] font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none",
                    on ? "bg-tinta text-white" : "bg-elevado text-suave hover:bg-linha"
                  )}
                >
                  {p.valor}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-linha bg-elevado px-6 py-7 sm:px-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] text-mudo uppercase">Custo do jeito atual</p>
            <p className="mt-2 text-[34px] leading-none font-bold tracking-[-.035em] text-tinta tabular-nums">
              {reais(mensal)}
              <span className="ml-1.5 text-[15px] font-medium text-mudo">por mês</span>
            </p>
            <p className="mt-1.5 text-[15px] text-suave">{reais(anual)} por ano, todo ano</p>
          </div>
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] text-marca-tinta uppercase">O sistema se paga em</p>
            <p className="mt-2 text-[34px] leading-none font-bold tracking-[-.035em] text-marca-tinta tabular-nums">
              {meses < 1 ? "menos de 1" : meses.toFixed(1).replace(".", ",")}
              <span className="ml-1.5 text-[15px] font-medium text-[#8a4b33]">
                {meses < 1 || meses === 1 ? "mês" : "meses"}
              </span>
            </p>
            <p className="mt-1.5 text-[15px] text-suave">Investimento de {reais(investimento)}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[14px] bg-tinta px-5 py-5 text-white">
          <p className="text-[15px] leading-[1.6] text-white/75">
            Em três anos, continuar como está custa{" "}
            <strong className="font-bold text-white">{reais(anual * 3)}</strong>. Com o sistema, a mesma empresa
            economiza <strong className="font-bold text-[#ff8f6e]">{reais(Math.max(0, tresAnos))}</strong>, já
            descontado o investimento.
          </p>
        </div>

        <p className="mt-5 text-[13.5px] leading-[1.55] text-mudo">{ARGUMENTAR.simulador.nota}</p>
      </div>
    </Caixa>
  );
}

/* --------- Módulo 9: quanto entra para o consultor --------- */
export function Comissao() {
  const [venda, setVenda] = useState(19000);
  const [jaVendido, setJaVendido] = useState(0);

  const volumeAntes = jaVendido;
  const volumeDepois = jaVendido + venda;
  const ganho = comissaoMarginal(volumeDepois) - comissaoMarginal(volumeAntes);
  const taxa = taxaMarginal(volumeDepois);
  const bateuFixo = volumeDepois >= REGUA_FIXO;
  const faltaFixo = Math.max(0, REGUA_FIXO - volumeDepois);
  const pctFixo = Math.min(100, (volumeDepois / REGUA_FIXO) * 100);
  const total = ganho + (bateuFixo ? VALOR_FIXO : 0);

  return (
    <div className="mt-8 rounded-[18px] bg-white/6 ring-1 ring-white/12">
      <div className="flex flex-col gap-7 px-6 py-7 sm:px-7">
        <div>
          <span className="block text-[14.5px] font-semibold text-white">Valor do sistema que você vai vender</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {PRECO.tabela.portes.map((p) => {
              const v = Number(p.valor.replace(/\D/g, ""));
              const on = v === venda;
              return (
                <button
                  key={p.nome}
                  type="button"
                  onClick={() => setVenda(v)}
                  aria-pressed={on}
                  className={cn(
                    "min-h-[44px] cursor-pointer rounded-[10px] px-4 text-[14px] font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none",
                    on ? "bg-marca text-white" : "bg-white/10 text-white/70 hover:bg-white/16"
                  )}
                >
                  {p.valor}
                </button>
              );
            })}
          </div>
        </div>
        <Faixa
          id="cm-ja"
          rotulo="Quanto você já tinha vendido neste mês"
          ajuda="só vendas com pagamento confirmado contam"
          valor={jaVendido}
          min={0}
          max={40000}
          passo={1000}
          sufixo="reais"
          aoMudar={setJaVendido}
          escuro
        />
      </div>

      <div className="border-t border-white/12 px-6 py-7 sm:px-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] text-white/50 uppercase">Comissão desta venda</p>
            <p className="mt-2 text-[34px] leading-none font-bold tracking-[-.035em] text-white tabular-nums">
              {reais(ganho)}
            </p>
            <p className="mt-1.5 text-[15px] text-white/60">
              Você termina o mês na faixa de {(taxa * 100).toFixed(0)}%
            </p>
          </div>
          <div>
            <p className="text-[13px] font-semibold tracking-[0.12em] text-[#ff8f6e] uppercase">Fixo do Consultor</p>
            <p className="mt-2 text-[34px] leading-none font-bold tracking-[-.035em] text-[#ff8f6e] tabular-nums">
              {bateuFixo ? reais(VALOR_FIXO) : reais(0)}
            </p>
            <p className="mt-1.5 text-[15px] text-white/60">
              {bateuFixo ? "Régua de R$ 20.000 alcançada" : `Faltam ${reais(faltaFixo)} para a régua`}
            </p>
          </div>
        </div>

        <div className="mt-6" aria-hidden>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <i
              className={cn("block h-full rounded-full transition-[width] duration-300", bateuFixo ? "bg-[#ff8f6e]" : "bg-white/35")}
              style={{ width: pctFixo + "%" }}
            />
          </div>
        </div>

        <div className="mt-6 rounded-[14px] bg-marca px-5 py-5">
          <p className="text-[13px] font-semibold tracking-[0.12em] text-white/80 uppercase">Entra no seu fechamento</p>
          <p className="mt-1.5 text-[38px] leading-none font-bold tracking-[-.035em] text-white tabular-nums">
            {reais(total)}
          </p>
        </div>

        <p className="mt-5 text-[13.5px] leading-[1.55] text-white/50">{PRECO.comissao.nota}</p>
      </div>
    </div>
  );
}
