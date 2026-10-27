/**
 * Idiomas do site. O português fica na raiz (/, /blog...) e os outros
 * ganham prefixo (/en, /es, /ca). O texto em português é a própria chave
 * do dicionário: t("Começar projeto") devolve a tradução, ou o próprio
 * português quando ela ainda não existe.
 */

export const LOCALES = ["pt", "en", "es", "ca"] as const;
export type Locale = (typeof LOCALES)[number];

/** Os idiomas com prefixo na URL. */
export const OUTROS_IDIOMAS = ["en", "es", "ca"] as const;
export type OutroIdioma = (typeof OUTROS_IDIOMAS)[number];

export const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es", ca: "ca" };
export const OG_LOCALE: Record<Locale, string> = { pt: "pt_BR", en: "en_US", es: "es_ES", ca: "ca_ES" };
export const NOME_IDIOMA: Record<Locale, string> = { pt: "Português", en: "English", es: "Español", ca: "Català" };
export const SIGLA_IDIOMA: Record<Locale, string> = { pt: "PT", en: "EN", es: "ES", ca: "CA" };
/** Locale para datas e números. */
export const INTL: Record<Locale, string> = { pt: "pt-BR", en: "en-US", es: "es-ES", ca: "ca-ES" };

export type Dict = Record<string, string>;
export type Vars = Record<string, string | number>;

export function ehIdioma(v: string): v is OutroIdioma {
  return (OUTROS_IDIOMAS as readonly string[]).includes(v);
}

/** Caminhos que existem nos quatro idiomas. Os demais (propostas, /felipemelo...) são só em português. */
const TRADUZIDOS = ["/blog", "/google-empresas", "/privacidade", "/termos", "/cookies", "/lgpd"];

export function temTraducao(caminhoPt: string) {
  const p = caminhoPt.split(/[?#]/)[0] || "/";
  return p === "/" || TRADUZIDOS.some((t) => p === t || p.startsWith(`${t}/`));
}

/** Leva um link interno para o idioma atual: "/#contato" vira "/en#contato". */
export function localizar(locale: Locale, href: string): string {
  if (locale === "pt" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (!temTraducao(href)) return href;
  if (href === "/") return `/${locale}`;
  if (href.startsWith("/#") || href.startsWith("/?")) return `/${locale}${href.slice(1)}`;
  return `/${locale}${href}`;
}

/** Tira o prefixo de idioma do caminho: "/en/blog" vira "/blog". */
export function caminhoBase(pathname: string): string {
  const m = pathname.match(/^\/(en|es|ca)(?=\/|$)/);
  if (!m) return pathname || "/";
  return pathname.slice(m[0].length) || "/";
}

export function aplicar(texto: string, vars?: Vars) {
  if (!vars) return texto;
  return texto.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

export function traduzir(dict: Dict | undefined, pt: string, vars?: Vars) {
  if (process.env.I18N_COLETA && typeof window === "undefined") coletar(pt);
  return aplicar((dict && dict[pt]) || pt, vars);
}

/* Só no build de coleta (I18N_COLETA=arquivo): grava cada texto pedido a t()
   para o script de tradução saber o que falta. Fora disso não faz nada. */
function coletar(pt: string) {
  if (!pt || !/[A-Za-zÀ-ú]/.test(pt)) return;
  const fs = (process as unknown as { getBuiltinModule?: (m: string) => { appendFileSync: (f: string, d: string) => void } })
    .getBuiltinModule?.("fs");
  fs?.appendFileSync(process.env.I18N_COLETA as string, JSON.stringify(pt) + "\n");
}
