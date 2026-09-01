import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { getPostBySlug, formatDate } from "@/lib/blog";
import { SITE, whatsappLink } from "@/lib/site";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Artigo não encontrado" };

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt ?? undefined,
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

  const jsonLd = {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
              href="/blog"
              className="inline-flex cursor-pointer items-center gap-2 text-[14.5px] text-[var(--color-fg-muted)] transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o blog
            </Link>

            <header className="mx-auto mt-10 max-w-[760px]">
              <div className="flex flex-wrap items-center gap-3 text-[13px] text-[var(--color-fg-subtle)]">
                {post.category && (
                  <span className="rounded-full border border-[var(--color-brand)]/35 bg-[var(--color-brand)]/10 px-3 py-1.5 text-[var(--color-brand)]">
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
                  Por{" "}
                  <span className="font-medium text-white">{post.author}</span>
                </p>
              )}
            </header>

            {post.cover_url && (
              <div className="relative mx-auto mt-12 h-[300px] max-w-[900px] overflow-hidden rounded-[var(--radius-xl2)] border border-white/8 md:h-[440px]">
                <Image
                  src={post.cover_url}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 900px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="mx-auto mt-12 max-w-[760px]">
              {post.content ? (
                <div
                  className="prose prose-invert prose-outbox max-w-none prose-headings:font-display prose-a:underline-offset-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-8 text-center">
                  <p className="text-[var(--color-fg-muted)]">
                    Este artigo é um exemplo de como os posts vão aparecer. Ele
                    some assim que o primeiro conteúdo real for publicado pelo
                    painel.
                  </p>
                </div>
              )}
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
                    Quer um site que traz cliente, e não só elogio?
                  </h2>
                  <p className="mx-auto mt-4 max-w-[46ch] leading-relaxed text-[var(--color-fg-muted)]">
                    A gente cuida da estratégia, do design e da tecnologia. Você
                    cuida do seu negócio.
                  </p>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <Link
                      href="/#contato"
                      className="cursor-pointer rounded-full bg-[var(--color-brand)] px-6 py-3.5 text-[14.5px] font-medium text-white transition-all duration-300 hover:bg-[var(--color-brand-deep)]"
                    >
                      Falar com a OutBox
                    </Link>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer rounded-full border border-white/14 px-6 py-3.5 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
                    >
                      Chamar no WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
