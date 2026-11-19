import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { HTML_LANG, OG_LOCALE, localizar, traduzir, type Locale } from "./config";
import { DICIONARIOS } from "./dicionarios";
import { CIDADES_PRINCIPAIS, SEDE, descricaoLocal } from "@/lib/regiao";

/** hreflang de um caminho que existe nos quatro idiomas. */
export function alternates(locale: Locale, caminhoPt: string): Metadata["alternates"] {
  const url = (l: Locale) => `${SITE.url}${localizar(l, caminhoPt) === "/" ? "" : localizar(l, caminhoPt)}`;
  return {
    canonical: url(locale),
    languages: {
      [HTML_LANG.pt]: url("pt"),
      [HTML_LANG.en]: url("en"),
      "x-default": url("pt"),
    },
  };
}

/** Metadados-base do site no idioma pedido (título, descrição, Open Graph). */
export function metadataBase(locale: Locale): Metadata {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  // Em português o título leva o serviço mais buscado e a cidade da sede (SEO local).
  const titulo =
    locale === "pt"
      ? `${SITE.name}: Criação de Sites, Sistemas e Identidade Visual em ${SEDE.cidade} (${SEDE.uf})`
      : `${SITE.name}: ${t("Sites, Sistemas, Branding e Apresentações")}`;
  const descricao = descricaoLocal(t(SITE.description), locale);
  return {
    metadataBase: new URL(SITE.url),
    title: { default: titulo, template: `%s · ${SITE.name}` },
    description: descricao,
    keywords:
      locale === "pt"
        ? [
            // Termos com volume no Google Trends (SP, 12 meses, nov/2026) + região.
            "criação de sites",
            "site para empresa",
            "desenvolvimento de sistemas",
            "sistema de gestão para empresa",
            "criação de logo",
            "identidade visual",
            "Google Meu Negócio",
            "SEO",
            "GEO",
            "agência digital",
            ...CIDADES_PRINCIPAIS.map((c) => `agência digital em ${c}`),
          ]
        : [t("agência digital"), t("desenvolvimento de sistemas"), t("criação de sites"), "SEO", "GEO", "branding", t("apresentação de negócios")],
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
