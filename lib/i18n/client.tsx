"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { localizar, traduzir, type Dict, type Locale, type Vars } from "./config";

const Contexto = createContext<{ locale: Locale; dict: Dict }>({ locale: "pt", dict: {} });

export function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Dict; children: ReactNode }) {
  const valor = useMemo(() => ({ locale, dict }), [locale, dict]);
  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

/** t() e href() para componentes de cliente. */
export function useI18n() {
  const { locale, dict } = useContext(Contexto);
  return useMemo(
    () => ({
      locale,
      t: (pt: string, vars?: Vars) => traduzir(dict, pt, vars),
      href: (h: string) => localizar(locale, h),
    }),
    [locale, dict],
  );
}
