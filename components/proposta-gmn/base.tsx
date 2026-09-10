"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function cn(...c: (string | false | undefined)[]) {
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

export function Secao({
  id,
  children,
  className,
  fundo = "papel",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  fundo?: "papel" | "branco" | "escuro" | "tenue";
}) {
  const fundos = {
    papel: "bg-papel",
    branco: "bg-superficie",
    tenue: "bg-marca-tenue",
    escuro: "bg-tinta text-white",
  };
  return (
    <section id={id} className={cn("px-6 py-24 md:py-32", fundos[fundo], className)}>
      <div className="mx-auto w-full max-w-[1180px]">{children}</div>
    </section>
  );
}

export function Rotulo({ children, escuro = false }: { children: ReactNode; escuro?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.14em] uppercase",
        escuro
          ? "bg-white/10 text-[#ff8666] ring-1 ring-white/20"
          : "bg-marca-tenue text-marca-tinta ring-1 ring-[#f1553255]"
      )}
    >
      <span className="size-1.5 rounded-full bg-marca" />
      {children}
    </span>
  );
}

export function Titulo({
  children,
  className,
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-sans font-bold tracking-[-0.038em] text-balance",
        Tag === "h1" ? "text-[clamp(38px,6.4vw,74px)] leading-[1.02]" : "text-[clamp(30px,4.4vw,50px)] leading-[1.06]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Linha({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("mt-5 max-w-[62ch] text-[19px] leading-[1.62] text-suave", className)}>{children}</p>
  );
}

/* barra de medidor usada nos fatores de ranqueamento */
export function Botao({
  href,
  children,
  variante = "marca",
  className,
}: {
  href: string;
  children: ReactNode;
  variante?: "marca" | "contorno" | "claro";
  className?: string;
}) {
  const v = {
    marca:
      "bg-marca text-white shadow-[0_12px_32px_rgba(241,85,50,.28)] hover:bg-marca-clara active:scale-[.97]",
    contorno: "bg-transparent text-corpo ring-1 ring-linha-forte hover:bg-elevado active:scale-[.97]",
    claro: "bg-white text-tinta hover:bg-white/90 active:scale-[.97]",
  };
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener" : undefined}
      className={cn(
        "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[10px] px-7 text-[16px] font-semibold no-underline transition-all duration-200",
        v[variante],
        className
      )}
    >
      {children}
    </a>
  );
}
