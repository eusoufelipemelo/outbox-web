import { SITE } from "@/lib/site";
import { localizar, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";

/** Dados estruturados das páginas de oferta: só o que é verdade na página. */
export function jsonLdOferta({
  locale,
  caminho,
  nome,
  descricao,
  migalhas,
  faq,
  tipo = "Service",
}: {
  locale: Locale;
  caminho: string;
  nome: string;
  descricao: string;
  migalhas: { rotulo: string; href?: string }[];
  faq?: readonly { q: string; a: string }[];
  tipo?: "Service" | "WebPage";
}) {
  const t = (pt: string) => traduzir(DICIONARIOS[locale], pt);
  const url = (c: string) => `${SITE.url}${localizar(locale, c) === "/" ? "" : localizar(locale, c)}`;
  const grafo: Record<string, unknown>[] = [
    {
      "@type": tipo,
      "@id": `${url(caminho)}#oferta`,
      name: t(nome),
      description: t(descricao),
      url: url(caminho),
      ...(tipo === "Service"
        ? {
            provider: { "@type": "ProfessionalService", name: SITE.name, url: SITE.url },
            areaServed: { "@type": "Country", name: "Brasil" },
          }
        : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: migalhas.map((m, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t(m.rotulo),
        item: url(m.href ?? caminho),
      })),
    },
  ];
  if (faq?.length) {
    grafo.push({
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: t(f.q), acceptedAnswer: { "@type": "Answer", text: t(f.a) } })),
    });
  }
  return { "@context": "https://schema.org", "@graph": grafo };
}
