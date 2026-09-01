"use client";

import { useEffect } from "react";

/**
 * Efeitos globais de rolagem:
 * - revela elementos .reveal quando entram na tela
 * - quebra títulos .reveal-words em palavras com atraso encadeado
 * - alimenta a barra de progresso do topo
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    // Quebra os títulos em palavras
    document.querySelectorAll<HTMLElement>(".reveal-words").forEach((el) => {
      if (el.dataset.split === "1") return;
      el.dataset.split = "1";
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach((node) => {
        const parts = node.textContent?.split(/(\s+)/) ?? [];
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p.trim()) {
            frag.appendChild(document.createTextNode(p));
          } else {
            const span = document.createElement("span");
            span.className = "word";
            span.textContent = p;
            frag.appendChild(span);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      });
    });

    if (reduced) {
      document
        .querySelectorAll(".reveal, .reveal-words")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");

          if (el.classList.contains("reveal-words")) {
            el.querySelectorAll<HTMLElement>(".word").forEach((w, i) => {
              w.style.transitionDelay = `${i * 26}ms`;
            });
          }
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    document
      .querySelectorAll(".reveal, .reveal-words")
      .forEach((el) => io.observe(el));

    // Barra de progresso
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${h > 0 ? (window.scrollY / h) * 100 : 0}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 z-[60] h-[2px] w-0 bg-gradient-to-r from-[var(--color-brand)] to-[var(--color-brand-soft)]"
      id="scroll-progress"
    />
  );
}
