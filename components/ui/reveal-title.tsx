"use client";

import { createElement, useEffect, useRef, useState, type JSX } from "react";

type Props = {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Fração do elemento visível para disparar. */
  threshold?: number;
};

/**
 * Título que revela palavra a palavra quando entra na tela.
 *
 * O título existe no HTML desde o servidor (o Google e as IAs leem sem rodar
 * JavaScript). A animação é só CSS, com opacidade e deslocamento, que rodam na
 * GPU. As palavras só ficam escondidas quando o JavaScript está ativo (classe
 * `js` no <html>), então uma falha de script nunca deixa o título invisível.
 * O texto fica uma vez só no DOM (palavras em <span>, sem cópia escondida).
 */
export default function RevealTitle({ children, as = "h2", className, threshold = 0.25 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visto, setVisto] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisto(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisto(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  let i = 0;
  const partes = children.split(/(\s+)/).map((p, k) =>
    p.trim() ? (
      <span key={k} className="rt-palavra" style={{ "--i": i++ } as React.CSSProperties}>
        {p}
      </span>
    ) : (
      p
    ),
  );

  return createElement(
    as,
    { ref, className: `rt ${className ?? ""}`, "data-visto": visto ? "" : undefined },
    ...partes,
  );
}
