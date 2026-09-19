/**
 * Artigos publicados pelo OutBox CMS (cms.outboxgroup.com.br) para este site.
 * O CMS reconhece o site pelo domínio — não há chave nem variável para configurar.
 * A cada publicação o CMS chama /api/outbox/revalidate e o blog atualiza na hora.
 */

export const OUTBOX_API = (process.env.OUTBOX_API_URL || "https://cms.outboxgroup.com.br/api/v1").replace(/\/+$/, "");
export const OUTBOX_DOMAIN = "outboxgroup.com.br";
export const OUTBOX_TAG = "outbox-posts";

export type CmsFaq = { question: string; answer: string };
export type CmsSource = { title: string; url: string; publisher?: string | null };

export type CmsPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  content_html: string;
  cover_url: string | null;
  cover_alt: string | null;
  category: string | null;
  author: string | null;
  author_credentials: string | null;
  author_bio: string | null;
  reading_minutes: number | null;
  published_at: string | null;
  updated_at: string | null;
  answer_summary: string | null;
  key_takeaways: string[];
  faq: CmsFaq[];
  sources: CmsSource[];
  seo_title: string | null;
  seo_description: string | null;
  json_ld: unknown;
};

type Raw = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : null);

async function get(path: string, params: Record<string, string> = {}): Promise<Raw | null> {
  const url = new URL(`${OUTBOX_API}${path}`);
  url.searchParams.set("site", OUTBOX_DOMAIN);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  try {
    const res = await fetch(url, {
      headers: { accept: "application/json" },
      next: { tags: [OUTBOX_TAG], revalidate: 60 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return (await res.json()) as Raw;
  } catch {
    return null;
  }
}

function toPost(r: Raw): CmsPost {
  const cover = (r.cover_image ?? null) as { url?: string; alt?: string } | null;
  const profile = (r.author_profile ?? null) as { name?: string; credentials?: string; bio?: string } | null;
  const seo = (r.seo ?? {}) as { title?: string; description?: string };
  return {
    slug: String(r.slug),
    title: String(r.title ?? ""),
    excerpt: str(r.excerpt),
    content_html: typeof r.content_html === "string" ? r.content_html : "",
    cover_url: str(cover?.url),
    cover_alt: str(cover?.alt),
    category: str(r.category),
    author: str(profile?.name) ?? str(r.author),
    author_credentials: str(profile?.credentials),
    author_bio: str(profile?.bio),
    reading_minutes: typeof r.reading_minutes === "number" ? r.reading_minutes : null,
    published_at: str(r.published_at),
    updated_at: str(r.updated_at),
    answer_summary: str(r.answer_summary),
    key_takeaways: Array.isArray(r.key_takeaways) ? r.key_takeaways.filter((t): t is string => typeof t === "string") : [],
    faq: Array.isArray(r.faq) ? (r.faq as CmsFaq[]).filter((f) => f?.question && f?.answer) : [],
    sources: Array.isArray(r.sources) ? (r.sources as CmsSource[]).filter((s) => s?.url && s?.title) : [],
    seo_title: str(seo.title),
    seo_description: str(seo.description),
    json_ld: r.json_ld ?? null,
  };
}

/** Lista (resumo) dos artigos no ar. Vazio se o CMS não responder. */
export async function listCmsPosts(): Promise<CmsPost[]> {
  const body = await get("/posts", { per_page: "50" });
  const data = Array.isArray(body?.data) ? (body!.data as Raw[]) : [];
  return data.map(toPost);
}

/** Artigo completo pelo slug, ou null. */
export async function getCmsPost(slug: string): Promise<CmsPost | null> {
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return null;
  const body = await get(`/posts/${slug}`);
  return body && typeof body.slug === "string" ? toPost(body) : null;
}

/** Chave do IndexNow do site (para servir /<chave>.txt). */
export async function getIndexNowKey(): Promise<string | null> {
  const body = await get("/site");
  return str(body?.indexnow_key);
}
