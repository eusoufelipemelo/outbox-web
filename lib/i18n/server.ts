import "server-only";
import { cache } from "react";
import { localizar, traduzir, type Locale, type Vars } from "./config";
import { DICIONARIOS } from "./dicionarios";

/** Idioma da renderização atual. As páginas de /en, /es e /ca chamam setLocale no topo. */
const estado = cache(() => ({ locale: "pt" as Locale }));

export function setLocale(locale: Locale) {
  estado().locale = locale;
}

export function getLocale(): Locale {
  return estado().locale;
}

/** t() e href() para componentes de servidor. */
export function getT() {
  const locale = getLocale();
  const dict = DICIONARIOS[locale];
  return {
    locale,
    t: (pt: string, vars?: Vars) => traduzir(dict, pt, vars),
    href: (h: string) => localizar(locale, h),
  };
}
