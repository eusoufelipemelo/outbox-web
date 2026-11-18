"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { evento, registrarOrigem } from "@/lib/rastreio";

/** Guarda a origem da visita e registra os cliques em WhatsApp e nos CTAs das ofertas, no site inteiro. */
export default function Atribuicao() {
  const pathname = usePathname();

  useEffect(() => {
    registrarOrigem();
  }, [pathname]);

  useEffect(() => {
    const clique = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (a && /wa\.me|api\.whatsapp\.com/.test(a.href)) evento("click_whatsapp", { pagina: window.location.pathname });
      // CTA principal das ofertas: marcado com data-cta="<oferta>".
      const cta = (e.target as HTMLElement | null)?.closest?.<HTMLElement>("[data-cta]");
      if (cta) evento("click_primary_cta", { oferta: cta.dataset.cta, pagina: window.location.pathname });
    };
    document.addEventListener("click", clique, { capture: true });
    return () => document.removeEventListener("click", clique, { capture: true });
  }, []);

  return null;
}
