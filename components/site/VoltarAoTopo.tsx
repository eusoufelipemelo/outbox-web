"use client";

import type { ReactNode } from "react";

/** Sobe a página até o topo, suave (ou direto, para quem pediu menos movimento). */
export default function VoltarAoTopo({ rotulo, children }: { rotulo: string; children: ReactNode }) {
  function subir() {
    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: menosMovimento ? "auto" : "smooth" });
    // O foco do teclado acompanha: vai para o logo do menu, sem puxar a rolagem.
    document.querySelector<HTMLElement>("header[data-nav] a")?.focus({ preventScroll: true });
  }

  return (
    <button
      type="button"
      onClick={subir}
      aria-label={rotulo}
      title={rotulo}
      className="block cursor-pointer rounded-xl transition-opacity duration-300 hover:opacity-80"
    >
      {children}
    </button>
  );
}
