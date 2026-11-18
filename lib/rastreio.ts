"use client";

import { CHAVES_ORIGEM, type Origem } from "@/lib/leads";

/* Atribuição e eventos do site.

   ORIGEM: a primeira visita com UTM (ex.: link do Reels) fica guardada na
   sessão do navegador e vai junto com o lead quando a pessoa envia um
   formulário. Nada sai do navegador antes disso.

   EVENTOS: são empurrados para window.dataLayer, o padrão que o Google Tag
   Manager e o GA4 leem. Hoje o site NÃO tem nenhuma dessas ferramentas
   instaladas: os eventos ficam prontos e só passam a ser medidos quando uma
   for instalada. E só são registrados para quem aceitou os cookies. */

const CHAVE = "outbox-origem";
const CHAVE_COOKIES = "outbox-cookies";

export type NomeEvento =
  | "view_offer"
  | "click_primary_cta"
  | "form_start"
  | "generate_lead"
  | "click_whatsapp"
  | "view_case";

/** Lê a URL atual e guarda a origem da visita (a UTM mais recente vence). */
export function registrarOrigem() {
  try {
    const url = new URL(window.location.href);
    const atual = obterOrigem();
    const temUtm = CHAVES_ORIGEM.some((k) => k.startsWith("utm_") && url.searchParams.get(k));
    if (!temUtm && Object.keys(atual).length > 0) return;
    const origem: Origem = {};
    for (const k of CHAVES_ORIGEM) {
      const v = url.searchParams.get(k);
      if (v) origem[k] = v.slice(0, 200);
    }
    origem.pagina_entrada = url.pathname;
    if (document.referrer && !document.referrer.startsWith(url.origin)) origem.referrer = document.referrer.slice(0, 200);
    sessionStorage.setItem(CHAVE, JSON.stringify(origem));
  } catch {
    // Navegador sem armazenamento: o lead segue sem origem.
  }
}

export function obterOrigem(): Origem {
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE) ?? "{}") as Origem;
  } catch {
    return {};
  }
}

export function evento(nome: NomeEvento, params: Record<string, string | number | undefined> = {}) {
  try {
    if (localStorage.getItem(CHAVE_COOKIES) !== "aceito") return;
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event: nome, ...params });
  } catch {
    // sem armazenamento ou bloqueado: não registra
  }
}
