import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import ReadBeacon from "@/components/site/ReadBeacon";
import Footer from "@/components/site/Footer";
import AboutFelipe from "@/components/site/AboutFelipe";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { getPostBySlug, formatDate } from "@/lib/blog";
import { OUTBOX_API, OUTBOX_DOMAIN } from "@/lib/outbox-cms";
import { SITE, whatsappLink } from "@/lib/site";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  const description = post.cms?.seo_description ?? post.excerpt ?? undefined;
  return {
    title: post.cms?.seo_title ?? post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.cms?.seo_title ?? post.title,
      description,
      publishedTime: post.published_at ?? undefined,
      authors: post.author ? [post.author] : undefined,
      images: post.cover_url ? [{ url: post.cover_url }] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const cms = post.cms;
  const fallbackJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: { "@type": "Person", name: post.author ?? "Felipe Melo" },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}`,
    image: post.cover_url ?? undefined,
  };

  return (
    <div className="sitev">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cms?.json_ld ?? fallbackJsonLd).replace(/</g, "\\u003c") }}
      />
      {cms ? <ReadBeacon endpoint={`${OUTBOX_API}/posts/${encodeURIComponent(post.slug)}/view?site=${OUTBOX_DOMAIN}`} /> : null}
      <ScrollEffects />
      <Navbar />

      <main>
        <article className="relative bg-[var(--color-creme)] pb-24 pt-32 md:pt-40">

          <div className="container-outbox relative z-10">
            <Link
              href="/blog"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[14.5px] text-[var(--color-cinza)] transition-colors hover:text-[var(--color-acao)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o blog
            </Link>

            <header className="mx-auto mt-10 max-w-[760px]">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--color-cinza)]">
                {post.category && (
                  <span className="rounded-full border border-[var(--color-brand)]/35 bg-[var(--color-brand)]/10 px-3 py-1.5 text-[#b8330f]">
                    {post.category}
                  </span>
                )}
                <span>{formatDate(post.published_at)}</span>
                {post.read_minutes ? (
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.read_minutes} min de leitura
                  </span>
                ) : null}
              </div>

              <h1 className="mt-6 font-bold tracking-[-0.025em] text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.06] text-[var(--color-breu)]">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-5 text-lg leading-relaxed text-[var(--color-cinza)]">
                  {post.excerpt}
                </p>
              )}

              {post.author && (
                <p className="mt-7 border-t border-[var(--color-borda)] pt-6 text-[14.5px] text-[var(--color-cinza)]">
                  Por{" "}
                  <span className="font-medium text-[var(--color-breu)]">{post.author}</span>
                  {cms?.author_credentials ? <span>, {cms.author_credentials}</span> : null}
                  {post.updated_at && post.updated_at !== post.published_at ? (
                    <span className="block mt-1 text-[13px] text-[var(--color-cinza)]">
                      Atualizado em <time dateTime={post.updated_at}>{formatDate(post.updated_at)}</time>
                    </span>
                  ) : null}
                </p>
              )}
            </header>

            {post.cover_url && (
              <div className="relative mx-auto mt-12 h-[300px] max-w-[900px] overflow-hidden rounded-[var(--radius-xl2)] border border-[var(--color-borda)] md:h-[440px]">
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
                  aria-label="Resposta rápida"
                  className="mb-10 rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/35 bg-[var(--color-brand)]/[0.07] p-6 md:p-7"
                >
                  <p className="text-[13px] font-medium text-[#b8330f]">Resposta rápida</p>
                  <p className="mt-2 text-[17px] leading-relaxed text-[var(--color-breu)]">{cms.answer_summary}</p>
                </section>
              ) : null}

              {cms && cms.key_takeaways.length > 0 ? (
                <section aria-labelledby="pontos" className="mb-10 rounded-[var(--radius-xl2)] border border-[var(--color-borda)] bg-white p-6 md:p-7">
                  <h2 id="pontos" className="font-bold tracking-[-0.025em] text-xl text-[var(--color-breu)]">Pontos principais</h2>
                  <ul className="mt-4 space-y-2.5">
                    {cms.key_takeaways.map((t, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed text-[var(--color-cinza)]">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {post.content ? (
                <div
                  className="prose prose-v3 max-w-none prose-headings:font-bold tracking-[-0.025em] prose-a:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="rounded-[var(--radius-xl2)] border border-[var(--color-borda)] bg-white p-8 text-center">
                  <p className="text-[var(--color-cinza)]">
                    Este artigo é um exemplo de como os posts vão aparecer. Ele
                    some assim que o primeiro conteúdo real for publicado pelo
                    painel.
                  </p>
                </div>
              )}

              {cms && cms.faq.length > 0 ? (
                <section aria-labelledby="faq" className="mt-14">
                  <h2 id="faq" className="font-bold tracking-[-0.025em] text-[clamp(1.4rem,3vw,1.9rem)] text-[var(--color-breu)]">Perguntas frequentes</h2>
                  <div className="mt-6 divide-y divide-[var(--color-borda)] rounded-[var(--radius-xl2)] border border-[var(--color-borda)]">
                    {cms.faq.map((f, i) => (
                      <details key={i} className="group px-6 py-5">
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-[var(--color-breu)]">
                          <span>{f.question}</span>
                          <span aria-hidden className="mt-0.5 text-[#b8330f] transition-transform group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-3 leading-relaxed text-[var(--color-cinza)]">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {cms && cms.sources.length > 0 ? (
                <section aria-labelledby="fontes" className="mt-12">
                  <h2 id="fontes" className="font-bold tracking-[-0.025em] text-lg text-[var(--color-breu)]">Fontes</h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14.5px] text-[var(--color-cinza)]">
                    {cms.sources.map((src, i) => (
                      <li key={i}>
                        <a href={src.url} target="_blank" rel="nofollow noopener noreferrer" className="underline underline-offset-4 hover:text-[var(--color-acao)]">
                          {src.title}
                        </a>
                        {src.publisher ? <span>, {src.publisher}</span> : null}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {cms?.author_bio && post.author ? (
                <section aria-label="Sobre o autor" className="mt-12 rounded-[var(--radius-xl2)] border border-[var(--color-borda)] bg-white p-6">
                  <p className="font-medium text-[var(--color-breu)]">{post.author}</p>
                  {cms.author_credentials ? <p className="text-[13.5px] text-[var(--color-cinza)]">{cms.author_credentials}</p> : null}
                  <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--color-cinza)]">{cms.author_bio}</p>
                </section>
              ) : null}
            </div>

            {/* Chamada para ação */}
            <aside className="mx-auto mt-16 max-w-[760px]">
              <div className="rounded-[24px] bg-[var(--color-breu)] p-8 text-center text-white md:p-10">
                <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight tracking-[-0.025em]">
                  Quer um site que traz cliente, e não só elogio?
                </h2>
                <p className="mx-auto mt-4 max-w-[46ch] leading-relaxed text-[#a1a1a1]">
                  A gente cuida da estratégia, do design e da tecnologia. Você cuida do seu negócio.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link href="/#contato" className="v3-btn">
                    Falar com a OutBox
                  </Link>
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn--contorno">
                    Chamar no WhatsApp
                  </a>
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
    </div>
  );
}
