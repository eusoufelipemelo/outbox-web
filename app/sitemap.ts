import type { MetadataRoute } from "next";
import { LEGAL_LINKS, SITE } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";
import { HTML_LANG, LOCALES, localizar } from "@/lib/i18n/config";
import { SERVICOS } from "@/lib/servicos";
import { ROTA_REGIAO } from "@/lib/regiao";

export const revalidate = 3600;

const url = (caminho: string) => `${SITE.url}${caminho === "/" ? "" : caminho}`;

/** As quatro versões de um caminho, com hreflang entre elas. */
function emTodosIdiomas(
  caminhoPt: string,
  extra: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], url(localizar(l, caminhoPt))]));
  return LOCALES.map((l) => ({ url: url(localizar(l, caminhoPt)), alternates: { languages }, ...extra }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, isDemo } = await getPublishedPosts();
  const agora = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    ...emTodosIdiomas("/", { lastModified: agora, changeFrequency: "monthly", priority: 1 }),
    ...emTodosIdiomas("/google-empresas", { lastModified: agora, changeFrequency: "monthly", priority: 0.9 }),
    ...emTodosIdiomas("/consultoria-empresarial", { lastModified: agora, changeFrequency: "monthly", priority: 0.9 }),
    ...emTodosIdiomas("/servicos", { lastModified: agora, changeFrequency: "monthly", priority: 0.9 }),
    ...SERVICOS.flatMap((s) =>
      emTodosIdiomas(`/servicos/${s.slug}`, { lastModified: agora, changeFrequency: "monthly", priority: 0.8 }),
    ),
    ...emTodosIdiomas("/mentoria", { lastModified: agora, changeFrequency: "monthly", priority: 0.8 }),
    ...emTodosIdiomas("/mentoria/individual", { lastModified: agora, changeFrequency: "monthly", priority: 0.7 }),
    ...emTodosIdiomas("/mentoria/grupo", { lastModified: agora, changeFrequency: "monthly", priority: 0.7 }),
    ...emTodosIdiomas("/cases", { lastModified: agora, changeFrequency: "monthly", priority: 0.7 }),
    { url: `${SITE.url}/felipemelo`, lastModified: agora, changeFrequency: "monthly", priority: 0.8 },
    // Página regional (SEO local): só em português.
    { url: `${SITE.url}${ROTA_REGIAO}`, lastModified: agora, changeFrequency: "monthly", priority: 0.9 },
    ...emTodosIdiomas("/blog", { lastModified: agora, changeFrequency: "weekly", priority: 0.8 }),
    ...LEGAL_LINKS.flatMap((l) =>
      emTodosIdiomas(l.href, { lastModified: agora, changeFrequency: "yearly", priority: 0.3 }),
    ),
  ];

  if (isDemo) return staticRoutes;

  return [
    ...staticRoutes,
    ...posts.flatMap((p) =>
      emTodosIdiomas(`/blog/${p.slug}`, {
        lastModified: new Date(p.updated_at ?? p.published_at ?? p.created_at),
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
  ];
}
