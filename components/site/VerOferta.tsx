"use client";

import { useEffect } from "react";
import { evento, type NomeEvento } from "@/lib/rastreio";

/** Registra a visita a uma página de oferta (consultoria, mentoria, serviço ou case). */
export default function VerOferta({ oferta, nome = "view_offer" }: { oferta: string; nome?: NomeEvento }) {
  useEffect(() => {
    evento(nome, { oferta, pagina: window.location.pathname });
  }, [oferta, nome]);
  return null;
}
