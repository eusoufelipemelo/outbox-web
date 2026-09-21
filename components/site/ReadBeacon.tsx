"use client";

import { useEffect } from "react";

/**
 * Avisa o OutBox CMS que alguém está lendo este artigo: um sinal ao abrir e outro a cada minuto
 * enquanto a aba fica visível. É o que alimenta o "Leituras ao vivo" do painel.
 */
export default function ReadBeacon({ endpoint }: { endpoint: string }) {
  useEffect(() => {
    let alive = true;
    const ping = () => {
      if (!alive || document.visibilityState !== "visible") return;
      void fetch(endpoint, { method: "POST", keepalive: true, cache: "no-store" }).catch(() => {});
    };
    ping();
    const id = setInterval(ping, 60_000);
    document.addEventListener("visibilitychange", ping);
    return () => {
      alive = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", ping);
    };
  }, [endpoint]);
  return null;
}
