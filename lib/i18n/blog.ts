import type { Post } from "@/lib/blog";
import type { Locale } from "./config";
import { localizar } from "./config";
import { TRADUCOES_BLOG, type PostTraduzido } from "./blog/indice";

/**
 * Troca os campos do artigo pela tradução guardada em lib/i18n/blog/<idioma>/<slug>.json.
 * Artigo sem tradução segue em português, marcado com traduzido=false.
 */
export function localizarPost(post: Post, locale: Locale): Post {
  if (locale === "pt") return post;
  const tr: PostTraduzido | undefined = TRADUCOES_BLOG[locale]?.[post.slug];
  if (!tr) return { ...post, traduzido: false };
  return {
    ...post,
    traduzido: true,
    title: tr.title ?? post.title,
    excerpt: tr.excerpt ?? post.excerpt,
    category: tr.category ?? post.category,
    content: tr.content ? linksNoIdioma(tr.content, locale) : post.content,
    cms: post.cms && {
      ...post.cms,
      answer_summary: tr.answer_summary ?? post.cms.answer_summary,
      key_takeaways: tr.key_takeaways ?? post.cms.key_takeaways,
      faq: tr.faq ?? post.cms.faq,
      author_credentials: tr.author_credentials ?? post.cms.author_credentials,
      author_bio: tr.author_bio ?? post.cms.author_bio,
      cover_alt: tr.cover_alt ?? post.cms.cover_alt,
      seo_title: tr.seo_title ?? post.cms.seo_title,
      seo_description: tr.seo_description ?? post.cms.seo_description,
    },
  };
}

/** Links internos do artigo apontam para a versão no mesmo idioma. */
function linksNoIdioma(html: string, locale: Locale) {
  return html.replace(/href="(?:https:\/\/(?:www\.)?outboxgroup\.com\.br)?(\/[^"]*)"/g, (m, caminho: string) => {
    const novo = localizar(locale, caminho);
    return novo === caminho ? m : `href="${novo}"`;
  });
}
