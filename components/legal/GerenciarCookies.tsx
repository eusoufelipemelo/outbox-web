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
        className="flex cursor-pointer items-center gap-2.5 rounded-full border border-[var(--color-breu)]/25 px-5 py-3 text-[14.5px] font-medium text-[var(--color-breu)] transition-colors duration-300 hover:border-[var(--color-brand)]/50"
      >
        <Settings2 className="h-4 w-4 text-[var(--color-brand)]" />
        Rever minha escolha
      </button>
      {escolha && (
        <span className="text-[13.5px] text-[var(--color-cinza)]">
          Escolha atual:{" "}
          <strong className="text-[var(--color-breu)]">
            {escolha === "aceito" ? "aceito" : "recusado"}
          </strong>
        </span>
      )}
    </span>
  );
}
