import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { HTML_LANG, OG_LOCALE, localizar, traduzir, type Locale } from "./config";
import { DICIONARIOS } from "./dicionarios";

/** hreflang de um caminho que existe nos quatro idiomas. */
export function alternates(locale: Locale, caminhoPt: string): Metadata["alternates"] {
  const url = (l: Locale) => `${SITE.url}${localizar(l, caminhoPt) === "/" ? "" : localizar(l, caminhoPt)}`;
  return {
    canonical: url(locale),
    languages: {
      [HTML_LANG.pt]: url("pt"),
      [HTML_LANG.en]: url("en"),
      [HTML_LANG.es]: url("es"),
      [HTML_LANG.ca]: url("ca"),
      "x-default": url("pt"),
    },
  };
}

/** Metadados-base do site no idioma pedido (título, descrição, Open Graph). */
export function metadataBase(locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  const titulo = `${SITE.name}: ${t("Sites, Sistemas, Branding e Apresentações")}`;
  const descricao = t(SITE.description);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: titulo, template: `%s · ${SITE.name}` },
    description: descricao,
    keywords: [
      t("agência digital"),
      t("desenvolvimento de sistemas"),
      t("criação de sites"),
      "SEO",
      "GEO",
      "branding",
      t("apresentação de negócios"),
      "Santa Cruz do Rio Pardo",
    ],
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: Object.values(OG_LOCALE).filter((l) => l !== OG_LOCALE[locale]),
      url: `${SITE.url}${locale === "pt" ? "" : `/${locale}`}`,
      siteName: SITE.name,
      title: titulo,
      description: descricao,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: { card: "summary_large_image", title: titulo, description: descricao, images: ["/og.png"] },
    robots: { index: true, follow: true },
    alternates: alternates(locale, "/"),
  };
}
