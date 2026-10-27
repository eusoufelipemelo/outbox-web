"use client";

import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { EVENTO_ABRIR } from "@/components/site/CookieConsent";

const CHAVE = "outbox-cookies";

/** Botão que reabre o aviso de cookies e mostra a escolha atual. */
export default function GerenciarCookies() {
  const [escolha, setEscolha] = useState<string | null>(null);

  useEffect(() => {
    try {
      setEscolha(localStorage.getItem(CHAVE));
    } catch {
      setEscolha(null);
    }
  }, []);

  return (
    <span className="not-prose my-6 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(EVENTO_ABRIR))}
        className="flex cursor-pointer items-center gap-2.5 rounded-full border border-white/16 px-5 py-3 text-[14.5px] font-medium text-white transition-colors duration-300 hover:border-[var(--color-brand)]/50"
      >
        <Settings2 className="h-4 w-4 text-[var(--color-brand)]" />
        Rever minha escolha
      </button>
      {escolha && (
        <span className="text-[13.5px] text-[var(--color-fg-subtle)]">
          Escolha atual:{" "}
          <strong className="text-white">
            {escolha === "aceito" ? "aceito" : "recusado"}
          </strong>
        </span>
      )}
    </span>
  );
}
