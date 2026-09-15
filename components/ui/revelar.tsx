"use client";

import { useEffect, useRef, type ReactNode } from "react";

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* Liga a animação de entrada de um bloco. Não controla visibilidade: quem
   controla é o CSS, e lá o padrão é visível. Ver .rev em globals.css.

   Duas travas contra a piscada, porque a animação começa em opacidade zero:

   1. A margem é POSITIVA embaixo, então o gatilho acontece enquanto o bloco
      ainda está abaixo da dobra e a animação corre enquanto ele sobe.
   2. Mesmo assim, se a rolagem foi rápida e o bloco já apareceu, ele fica
      visível SEM animar. Apagar algo que o visitante já está lendo é
      exatamente o que a tela inteira lê como piscada.

   A classe entra direto no elemento em vez de passar por estado do React: o
   ciclo de renderização atrasa a classe em relação à decisão, e nesse intervalo
   a página já rolou mais um pedaço. Aqui decisão e efeito são a mesma tarefa. */
function useAnimarAoEntrar(
  ref: React.RefObject<HTMLElement | null>,
  classe: string,
  margem = "0px 0px 18% 0px"
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (el.getBoundingClientRect().top >= window.innerHeight * 0.82) {
          el.classList.add(classe);
        }
      },
      { rootMargin: margem }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, classe, margem]);
}

export function Revelar({
  children,
  atraso = 0,
  className,
}: {
  children: ReactNode;
  atraso?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useAnimarAoEntrar(ref, "rev--entra");
  return (
    <div
      ref={ref}
      className={cn("rev", className)}
      style={atraso ? { animationDelay: `${atraso}s` } : undefined}
    >
      {children}
    </div>
  );
}

/* Bloco cujos filhos diretos entram em cascata. O CSS mantém tudo visível
   por padrão; a classe só acrescenta a animação quando o bloco chega na tela. */
export function Cascata({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useAnimarAoEntrar(ref, "casca--entra");
  return (
    <div ref={ref} className={cn("casca", className)}>
      {Array.isArray(children)
        ? children.map((c, i) => (
            <div key={i} style={{ "--i": i } as React.CSSProperties}>
              {c}
            </div>
          ))
        : children}
    </div>
  );
}

/* Manchete que se monta palavra a palavra. O texto é sempre texto de verdade:
   sem JS, as palavras aparecem normalmente, só sem a cascata. */
export function Palavras({
  texto,
  className,
  destaque,
}: {
  texto: string;
  className?: string;
  destaque?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useAnimarAoEntrar(ref, "palavras--entra", "0px 0px 16% 0px");
  const partes = texto.split(" ");
  const iniDestaque = destaque ? partes.length - destaque.split(" ").length : -1;
  return (
    <span ref={ref} className={cn("palavras", className)}>
      {partes.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ "--i": i } as React.CSSProperties}
          className={destaque && i >= iniDestaque ? "text-marca" : undefined}
        >
          {w}
          {i < partes.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

