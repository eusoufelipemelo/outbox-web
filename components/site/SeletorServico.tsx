"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

type Opcao = { valor: string; rotulo: string };

/**
 * Lista de escolha com a cara do site. O <select> nativo abre o menu do
 * sistema (Mac, Windows), que não segue o visual da OutBox. Este segue o
 * padrão de listbox: abre com clique, Enter, espaço ou setas; navega com
 * setas, Home/End e pela primeira letra; fecha com Esc, Tab ou clique fora.
 */
export default function SeletorServico({
  id,
  name,
  opcoes,
  valor,
  aoMudar,
  placeholder,
  invalido = false,
}: {
  id: string;
  name: string;
  opcoes: Opcao[];
  valor: string;
  aoMudar: (valor: string) => void;
  placeholder: string;
  invalido?: boolean;
}) {
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const idLista = useId();
  const selecionado = opcoes.findIndex((o) => o.valor === valor);

  function abrir(indice = selecionado >= 0 ? selecionado : 0) {
    setAtivo(indice);
    setAberto(true);
  }

  function fechar(devolverFoco = true) {
    setAberto(false);
    if (devolverFoco) botao.current?.focus();
  }

  function escolher(indice: number) {
    aoMudar(opcoes[indice].valor);
    fechar();
  }

  // Ao abrir, o foco vai para a lista; a opção ativa fica sempre visível.
  useEffect(() => {
    if (aberto) lista.current?.focus();
  }, [aberto]);
  useEffect(() => {
    if (!aberto) return;
    lista.current?.querySelector<HTMLElement>(`[data-indice="${ativo}"]`)?.scrollIntoView({ block: "nearest" });
  }, [aberto, ativo]);

  // Clique fora fecha sem roubar o foco de onde a pessoa clicou.
  useEffect(() => {
    if (!aberto) return;
    const fora = (e: PointerEvent) => {
      if (!raiz.current?.contains(e.target as Node)) fechar(false);
    };
    document.addEventListener("pointerdown", fora);
    return () => document.removeEventListener("pointerdown", fora);
  }, [aberto]);

  function teclaNoBotao(e: KeyboardEvent<HTMLButtonElement>) {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      abrir(e.key === "ArrowUp" ? opcoes.length - 1 : undefined);
    }
  }

  function teclaNaLista(e: KeyboardEvent<HTMLUListElement>) {
    const ultimo = opcoes.length - 1;
    if (e.key === "ArrowDown") setAtivo((i) => Math.min(ultimo, i + 1));
    else if (e.key === "ArrowUp") setAtivo((i) => Math.max(0, i - 1));
    else if (e.key === "Home") setAtivo(0);
    else if (e.key === "End") setAtivo(ultimo);
    else if (e.key === "Enter" || e.key === " ") escolher(ativo);
    else if (e.key === "Escape") fechar();
    else if (e.key === "Tab") {
      setAberto(false);
      return;
    } else if (e.key.length === 1 && /\S/.test(e.key)) {
      // Pula para a próxima opção que começa com a letra digitada.
      const letra = e.key.toLocaleLowerCase();
      const ordem = [...opcoes.slice(ativo + 1), ...opcoes.slice(0, ativo + 1)];
      const alvo = ordem.find((o) => o.rotulo.toLocaleLowerCase().startsWith(letra));
      if (alvo) setAtivo(opcoes.indexOf(alvo));
    } else return;
    e.preventDefault();
  }

  return (
    <div ref={raiz} className="relative">
      <input type="hidden" name={name} value={valor} />
      <button
        ref={botao}
        id={id}
        type="button"
        onClick={() => (aberto ? fechar() : abrir())}
        onKeyDown={teclaNoBotao}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-controls={idLista}
        aria-invalid={invalido || undefined}
        className={`field flex cursor-pointer items-center justify-between gap-3 text-left ${
          invalido ? "!border-red-400/70" : ""
        } ${aberto ? "!border-[var(--color-brand)]" : ""}`}
      >
        <span className={`truncate ${selecionado >= 0 ? "text-white" : "text-[var(--color-fg-subtle)]"}`}>
          {selecionado >= 0 ? opcoes[selecionado].rotulo : placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={`h-5 w-5 shrink-0 text-[var(--color-fg-subtle)] transition-transform duration-200 ${
            aberto ? "rotate-180 text-[var(--color-brand)]" : ""
          }`}
        />
      </button>

      {aberto && (
        <ul
          ref={lista}
          id={idLista}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={id}
          aria-activedescendant={`${idLista}-${ativo}`}
          onKeyDown={teclaNaLista}
          className="seletor-lista absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-[320px] overflow-y-auto rounded-2xl border border-white/12 bg-[#141416] p-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.7)] outline-none"
        >
          {opcoes.map((o, i) => {
            const marcado = i === selecionado;
            return (
              <li
                key={o.valor}
                id={`${idLista}-${i}`}
                data-indice={i}
                role="option"
                aria-selected={marcado}
                onPointerMove={() => setAtivo(i)}
                onClick={() => escolher(i)}
                className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors duration-150 ${
                  i === ativo ? "bg-white/[0.07]" : ""
                } ${marcado ? "text-[var(--color-brand-soft)]" : "text-white/85"}`}
              >
                {o.rotulo}
                {marcado && <Check aria-hidden className="h-4 w-4 shrink-0 text-[var(--color-brand)]" strokeWidth={2.6} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
