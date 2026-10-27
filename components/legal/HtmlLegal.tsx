import type { Metadata } from "next";
import { Fragment } from "react";
import GerenciarCookies from "@/components/legal/GerenciarCookies";
import { DOCS_LEGAIS, type DocLegal } from "@/lib/legal";
import { localizar, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { alternates } from "@/lib/i18n/meta";
import { getLocale } from "@/lib/i18n/server";
import en from "@/lib/i18n/legal/en.json";
import es from "@/lib/i18n/legal/es.json";
import ca from "@/lib/i18n/legal/ca.json";

/* O texto dos documentos em português é JSX nas próprias páginas; nas outras
   línguas ele vem pronto em HTML (lib/i18n/legal/<idioma>.json). O marcador
   abaixo é onde entra o botão de rever a escolha de cookies. */
const HTML: Record<Exclude<Locale, "pt">, Partial<Record<DocLegal, string>>> = { en, es, ca };
const MARCADOR = "<div data-gerenciar-cookies></div>";

export function metadataLegal(doc: DocLegal, locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  return {
    title: t(DOCS_LEGAIS[doc].titulo),
    description: t(DOCS_LEGAIS[doc].descricao),
    alternates: alternates(locale, `/${doc}`),
  };
}

export default function HtmlLegal({ doc }: { doc: DocLegal }) {
  const locale = getLocale();
  if (locale === "pt") return null;
  const html = (HTML[locale][doc] ?? "").replace(/href="(\/[^"]*)"/g, (_, c: string) => `href="${localizar(locale, c)}"`);
  const partes = html.split(MARCADOR);
  return (
    <>
      {partes.map((parte, i) => (
        <Fragment key={i}>
          {i > 0 && <GerenciarCookies />}
          <div dangerouslySetInnerHTML={{ __html: parte }} />
        </Fragment>
      ))}
    </>
  );
}
