/**
 * As jornadas de lead do site (briefing de 18/11/2026). Cada formulário diz
 * de qual jornada veio, e o lead chega no e-mail e na tabela "leads" com a
 * jornada, os campos extras e a origem do clique (UTM do vídeo).
 */

export const JORNADAS = {
  projeto: { rotulo: "Projeto OutBox", assunto: "Novo lead (projeto)" },
  consultoria: { rotulo: "Consultoria Estratégica Empresarial", assunto: "Consultoria" },
  "mentoria-individual": { rotulo: "Mentoria individual", assunto: "Mentoria individual" },
  "mentoria-grupo": { rotulo: "Lista de interesse: mentoria em grupo", assunto: "Lista da mentoria em grupo" },
} as const;

export type Jornada = keyof typeof JORNADAS;

export function ehJornada(v: unknown): v is Jornada {
  return typeof v === "string" && v in JORNADAS;
}

/** Parâmetros de campanha guardados na sessão e enviados com o lead. */
export const CHAVES_ORIGEM = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "pagina_entrada",
  "referrer",
] as const;

export type Origem = Partial<Record<(typeof CHAVES_ORIGEM)[number], string>>;

/** Limpa a origem vinda do navegador: só as chaves conhecidas, texto curto. */
export function limparOrigem(bruta: unknown): Origem {
  if (!bruta || typeof bruta !== "object") return {};
  const saida: Origem = {};
  for (const k of CHAVES_ORIGEM) {
    const v = (bruta as Record<string, unknown>)[k];
    if (typeof v === "string" && v.trim()) saida[k] = v.trim().slice(0, 200);
  }
  return saida;
}
