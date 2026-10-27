import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import ReadBeacon from "@/components/site/ReadBeacon";
import Footer from "@/components/site/Footer";
import AboutFelipe from "@/components/site/AboutFelipe";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { getPostBySlug, formatDate } from "@/lib/blog";
import { OUTBOX_API, OUTBOX_DOMAIN } from "@/lib/outbox-cms";
import { SITE, whatsappLink } from "@/lib/site";
import { getT } from "@/lib/i18n/server";
import { localizarPost } from "@/lib/i18n/blog";
import { alternates } from "@/lib/i18n/meta";
import { localizar, traduzir, OG_LOCALE, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";

export async function metadataArtigo(slug: string, locale: Locale): Promise<Metadata> {
  const original = await getPostBySlug(slug);
  if (!original) return { title: traduzir(DICIONARIOS[locale], "Artigo não encontrado") };
  const post = localizarPost(original, locale);

  const description = post.cms?.seo_description ?? post.excerpt ?? undefined;
  return {
    title: post.cms?.seo_title ?? post.title,
    description,
    alternates: alternates(locale, `/blog/${post.slug}`),
    openGraph: {
      type: "article",
      locale: OG_LOCALE[locale],
      title: post.cms?.seo_title ?? post.title,
      description,
      publishedTime: post.published_at ?? undefined,
      authors: post.author ? [post.author] : undefined,
      images: post.cover_url ? [{ url: post.cover_url }] : undefined,
    },
  };
}

export default async function BlogArtigo({ slug }: { slug: string }) {
  const { t, href, locale } = getT();
  const original = await getPostBySlug(slug);
  if (!original) notFound();
  const post = localizarPost(original, locale);

  const cms = post.cms;
  const fallbackJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    inLanguage: locale === "pt" ? "pt-BR" : locale,
    description: post.excerpt ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: { "@type": "Person", name: post.author ?? "Felipe Melo" },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}${localizar(locale, `/blog/${post.slug}`)}`,
    image: post.cover_url ?? undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify((locale === "pt" && cms?.json_ld) || fallbackJsonLd).replace(/</g, "\\u003c") }}
      />
      {cms ? <ReadBeacon endpoint={`${OUTBOX_API}/posts/${encodeURIComponent(post.slug)}/view?site=${OUTBOX_DOMAIN}`} /> : null}
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        <article className="relative overflow-hidden pt-36 pb-24 md:pt-44">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="glow glow--brand absolute -top-40 left-1/2 h-[480px] w-[620px] -translate-x-1/2" />
          </div>

          <div className="container-outbox relative z-10">
            <Link
              href={href("/blog")}
              className="inline-flex cursor-pointer items-center gap-2 text-[14.5px] text-[var(--color-fg-muted)] transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("Voltar para o blog")}
            </Link>

            <header className="mx-auto mt-10 max-w-[760px]">
              {locale !== "pt" && !post.traduzido && (
                <p lang={locale} className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[14.5px] text-[var(--color-fg-muted)]">
                  {t("Este artigo ainda está disponível só em português.")}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--color-fg-subtle)]">
                {post.category && (
                  <span className="rounded-full border border-[var(--color-brand)]/35 bg-[var(--color-brand)]/10 px-3 py-1.5 text-[var(--color-brand)]">
                    {post.category}
                  </span>
                )}
                <span>{formatDate(post.published_at, locale)}</span>
                {post.read_minutes ? (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {t("{n} min de leitura", { n: post.read_minutes })}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] text-white">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-5 text-lg leading-relaxed text-[var(--color-fg-muted)]">
                  {post.excerpt}
                </p>
              )}

              {post.author && (
                <p className="mt-7 border-t border-white/8 pt-6 text-[14.5px] text-[var(--color-fg-muted)]">
                  {t("Por")}{" "}
                  <span className="font-medium text-white">{post.author}</span>
                  {cms?.author_credentials ? <span>, {cms.author_credentials}</span> : null}
                  {post.updated_at && post.updated_at !== post.published_at ? (
                    <span className="block mt-1 text-[13px] text-[var(--color-fg-subtle)]">
                      {t("Atualizado em")} <time dateTime={post.updated_at}>{formatDate(post.updated_at, locale)}</time>
                    </span>
                  ) : null}
                </p>
              )}
            </header>

            {post.cover_url && (
              <div className="relative mx-auto mt-12 h-[300px] max-w-[900px] overflow-hidden rounded-[var(--radius-xl2)] border border-white/8 md:h-[440px]">
                <Image
                  src={post.cover_url}
                  alt={cms?.cover_alt ?? ""}
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="mx-auto mt-12 max-w-[760px]">
              {cms?.answer_summary ? (
                <section
                  aria-label={t("Resposta rápida")}
                  className="mb-10 rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/35 bg-[var(--color-brand)]/[0.07] p-6 md:p-7"
                >
                  <p className="text-[13px] font-medium text-[var(--color-brand)]">{t("Resposta rápida")}</p>
                  <p className="mt-2 text-[17px] leading-relaxed text-white">{cms.answer_summary}</p>
                </section>
              ) : null}

              {cms && cms.key_takeaways.length > 0 ? (
                <section aria-labelledby="pontos" className="mb-10 rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-6 md:p-7">
                  <h2 id="pontos" className="font-display text-xl text-white">{t("Pontos principais")}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {cms.key_takeaways.map((ponto, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed text-[var(--color-fg-muted)]">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {post.content ? (
                <div
                  className="prose prose-invert prose-outbox max-w-none prose-headings:font-display prose-a:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-8 text-center">
                  <p className="text-[var(--color-fg-muted)]">
                    {t("Este artigo é um exemplo de como os posts vão aparecer. Ele some assim que o primeiro conteúdo real for publicado pelo painel.")}
                  </p>
                </div>
              )}

              {cms && cms.faq.length > 0 ? (
                <section aria-labelledby="faq" className="mt-14">
                  <h2 id="faq" className="font-display text-[clamp(1.4rem,3vw,1.9rem)] text-white">{t("Perguntas frequentes")}</h2>
                  <div className="mt-6 divide-y divide-white/8 rounded-[var(--radius-xl2)] border border-white/8">
                    {cms.faq.map((f, i) => (
                      <details key={i} className="group px-6 py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-white">
                          <span>{f.question}</span>
                          <span aria-hidden className="mt-0.5 text-[var(--color-brand)] transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-3 leading-relaxed text-[var(--color-fg-muted)]">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {cms && cms.sources.length > 0 ? (
                <section aria-labelledby="fontes" className="mt-12">
                  <h2 id="fontes" className="font-display text-lg text-white">{t("Fontes")}</h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14.5px] text-[var(--color-fg-muted)]">
                    {cms.sources.map((src, i) => (
                      <li key={i}>
                        <a href={src.url} target="_blank" rel="nofollow noopener noreferrer" className="underline underline-offset-4 hover:text-white">
                          {src.title}
                        </a>
                        {src.publisher ? <span>, {src.publisher}</span> : null}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {cms?.author_bio && post.author ? (
                <section aria-label={t("Sobre o autor")} className="mt-12 rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-6">
                  <p className="font-medium text-white">{post.author}</p>
                  {cms.author_credentials ? <p className="text-[13.5px] text-[var(--color-fg-subtle)]">{cms.author_credentials}</p> : null}
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">{cms.author_bio}</p>
                </section>
              ) : null}
            </div>

            {/* Chamada para ação */}
            <aside className="mx-auto mt-16 max-w-[760px]">
              <div className="card-dark relative overflow-hidden p-8 text-center md:p-10">
                <div
                  aria-hidden
                  className="glow glow--brand absolute -right-20 -top-20 h-60 w-60"
                />
                <div className="relative z-10">
                  <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-tight text-white">
                    {t("Quer um site que traz cliente, e não só elogio?")}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[46ch] leading-relaxed text-[var(--color-fg-muted)]">
                    {t("A gente cuida da estratégia, do design e da tecnologia. Você cuida do seu negócio.")}
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link
                      href={href("/#contato")}
                      className="cursor-pointer rounded-full bg-[var(--color-brand)] px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-300 hover:bg-[var(--color-brand-deep)]"
                    >
                      {t("Falar com a OutBox")}
                    </Link>
                    <a
                      href={whatsappLink(undefined, t)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer rounded-full border border-white/14 px-6 py-3.5 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
                    >
                      {t("Chamar no WhatsApp")}
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Quem está por trás: vai em toda página da OutBox */}
        <AboutFelipe />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
