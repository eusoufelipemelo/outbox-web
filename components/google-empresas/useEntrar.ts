"use client";

import { useEffect, useRef } from "react";

/* Acrescenta a classe de entrada quando o bloco chega na tela.
   O conteúdo já nasce no estado final: se o observador não rodar, nada some.
   Se o bloco já estiver visível no instante do gatilho, não anima. */
export function useEntrar<T extends HTMLElement>(classe: string) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        if (e.boundingClientRect.top >= window.innerHeight * 0.82) el.classList.add(classe);
      },
      { rootMargin: "0px 0px 18% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [classe]);
  return ref;
}
