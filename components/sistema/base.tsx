"use client";

import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "./util";

export { cn, reais } from "./util";

/* Um módulo do material. O número fica grande na margem porque aqui ele
   significa alguma coisa: é uma sequência de estudo, não enfeite de seção. */
export function Modulo({
  id,
  rotulo,
  titulo,
  linha,
  children,
  fundo = "papel",
}: {
  id: string;
  rotulo: string;
  titulo: string;
  linha?: string;
  children: ReactNode;
  fundo?: "papel" | "branco" | "tenue" | "escuro";
}) {
  const fundos = {
    papel: "bg-papel text-corpo",
    branco: "bg-superficie text-corpo",
    tenue: "bg-marca-tenue text-corpo",
    escuro: "bg-tinta text-white",
  };
  const escuro = fundo === "escuro";
  return (
    <section id={id} className={cn("scroll-mt-24 px-5 py-16 sm:px-7 md:py-24", fundos[fundo])}>
      <div className="mx-auto w-full max-w-[760px]">
        <header className="mb-10">
          <span
            className={cn(
              "text-[12.5px] font-semibold tracking-[0.16em] uppercase",
              escuro ? "text-[#ff8f6e]" : "text-marca-tinta"
            )}
          >
            {rotulo}
          </span>
          <h2
            className={cn(
              "mt-3 font-sans text-[30px] leading-[1.1] font-bold tracking-[-0.03em] sm:text-[38px]",
              escuro ? "text-white" : "text-tinta"
            )}
          >
            {titulo}
          </h2>
          {linha && (
            <p
              className={cn(
                "mt-5 max-w-[62ch] text-[17px] leading-[1.65]",
                escuro ? "text-white/72" : "text-suave"
              )}
            >
              {linha}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Sub({ children, escuro = false }: { children: ReactNode; escuro?: boolean }) {
  return (
    <h3
      className={cn(
        "font-sans text-[20px] leading-[1.25] font-bold tracking-[-0.02em]",
        escuro ? "text-white" : "text-tinta"
      )}
    >
      {children}
    </h3>
  );
}

/* O fundo vem por prop, nunca por className. Sobrescrever a cor por fora
   deixa o resultado na mão da ordem do CSS, e foi assim que uma caixa escura
   virou caixa clara com texto branco por cima, ilegível. */
export function Caixa({
  children,
  className,
  tom = "branco",
}: {
  children: ReactNode;
  className?: string;
  tom?: "branco" | "papel" | "elevado" | "escuro";
}) {
  const tons = {
    branco: "bg-superficie ring-1 ring-linha",
    papel: "bg-papel ring-1 ring-linha",
    elevado: "bg-elevado",
    escuro: "bg-tinta",
  };
  return <div className={cn("rounded-[18px] p-6", tons[tom], className)}>{children}</div>;
}

/* Fala pronta para o consultor usar. O botão de copiar existe porque o uso
   real é no celular, minutos antes da ligação. */
export function Fala({ contexto, texto }: { contexto: string; texto: string }) {
  const [copiado, setCopiado] = useState(false);
  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  };
  return (
    <figure className="overflow-hidden rounded-[18px] bg-superficie ring-1 ring-linha">
      <figcaption className="flex items-center justify-between gap-3 border-b border-linha bg-elevado px-5 py-3">
        <span className="text-[13px] font-semibold text-suave">{contexto}</span>
        <button
          type="button"
          onClick={copiar}
          aria-label={`Copiar a fala: ${contexto}`}
          className="flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-[9px] px-3 text-[13px] font-semibold text-marca-tinta transition-colors duration-200 hover:bg-marca-tenue focus-visible:ring-2 focus-visible:ring-marca focus-visible:outline-none"
        >
          {copiado ? <Check size={15} /> : <Copy size={15} />}
          {copiado ? "Copiado" : "Copiar"}
        </button>
      </figcaption>
      <blockquote className="border-l-[3px] border-marca px-5 py-5 text-[16.5px] leading-[1.68] text-corpo">
        {texto}
      </blockquote>
    </figure>
  );
}

export function Botao({
  href,
  children,
  variante = "marca",
  className,
}: {
  href: string;
  children: ReactNode;
  variante?: "marca" | "claro";
  className?: string;
}) {
  const v = {
    marca: "bg-marca text-white hover:bg-marca-clara",
    claro: "bg-white text-tinta hover:bg-white/90",
  };
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener" : undefined}
      className={cn(
        "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[11px] px-7 text-[16px] font-semibold no-underline transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-marca focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[.98]",
        v[variante],
        className
      )}
    >
      {children}
    </a>
  );
}
