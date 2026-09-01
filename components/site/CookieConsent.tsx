"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const CHAVE = "outbox-cookies";
export const EVENTO_ABRIR = "outbox:abrir-cookies";

type Escolha = "aceito" | "recusado";

/**
 * Aviso de cookies.
 * Recusar custa exatamente o mesmo que aceitar: mesmo tamanho, mesma
 * hierarquia e um clique só, como a LGPD espera.
 */
export default function CookieConsent() {
  const [visivel, setVisivel] = useState(false);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    let salvo: string | null = null;
    try {
      salvo = localStorage.getItem(CHAVE);
    } catch {
      // Navegador bloqueando armazenamento: mostra o aviso mesmo assim.
    }
    if (!salvo) {
      const t = setTimeout(() => setVisivel(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const abrir = () => {
      setSaindo(false);
      setVisivel(true);
    };
    window.addEventListener(EVENTO_ABRIR, abrir);
    return () => window.removeEventListener(EVENTO_ABRIR, abrir);
  }, []);

  function decidir(escolha: Escolha) {
    try {
      localStorage.setItem(CHAVE, escolha);
      localStorage.setItem(`${CHAVE}-em`, new Date().toISOString());
    } catch {
      // Sem armazenamento disponível: apenas fecha o aviso.
    }
    setSaindo(true);
    setTimeout(() => setVisivel(false), 320);
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso sobre cookies"
      className={`fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-[560px] rounded-[var(--radius-xl2)] border border-white/12 bg-[#0c0c0f]/97 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 md:right-6 md:left-auto md:mx-0 ${
        saindo
          ? "pointer-events-none translate-y-3 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <button
        type="button"
        onClick={() => decidir("recusado")}
        aria-label="Fechar e recusar cookies opcionais"
        className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/8 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3.5">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
          <Cookie className="h-[18px] w-[18px] text-[var(--color-brand)]" />
        </span>
        <div className="min-w-0 pr-6">
          <p className="font-display text-[16.5px] text-white">
            Um aviso rápido sobre cookies
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-fg-muted)]">
            Este site usa o mínimo: nada de rastreamento e nada de publicidade.
            Guardamos apenas o essencial para o site funcionar e a sua escolha
            aqui. Detalhes na{" "}
            <Link
              href="/cookies"
              className="text-[var(--color-brand)] underline underline-offset-2 hover:text-[var(--color-brand-soft)]"
            >
              Política de Cookies
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => decidir("aceito")}
          className="cursor-pointer rounded-full bg-[var(--color-brand)] px-5 py-3 text-[14.5px] font-medium text-white transition-all duration-300 hover:bg-[var(--color-brand-deep)]"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => decidir("recusado")}
          className="cursor-pointer rounded-full border border-white/16 px-5 py-3 text-[14.5px] font-medium text-white transition-colors duration-300 hover:border-white/32 hover:bg-white/5"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}
