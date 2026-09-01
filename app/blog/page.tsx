import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { PostCard } from "@/components/site/BlogSection";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo sobre performance, SEO, GEO, branding e tecnologia para empresas que querem crescer no digital.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const { posts } = await getPublishedPosts();

  return (
    <>
      <ScrollEffects />
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-40 pb-16 md:pt-48">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-grid absolute inset-0" />
            <div className="glow glow--brand absolute -top-32 left-1/2 h-[520px] w-[620px] -translate-x-1/2" />
          </div>

          <div className="container-outbox relative z-10 text-center">
            <span className="pill reveal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              Blog da OutBox
            </span>
            <h1 className="reveal-words mx-auto mt-7 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04] text-white">
              Ideias que fazem a sua marca crescer.
            </h1>
            <p className="reveal mx-auto mt-6 max-w-[58ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)]">
              Performance, SEO, GEO, branding e tecnologia explicados sem
              jargão, do jeito que a gente conversa com os nossos clientes.
            </p>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="container-outbox">
            {posts.length === 0 ? (
              <p className="py-20 text-center text-[var(--color-fg-muted)]">
                Ainda não publicamos nada por aqui. Volte em breve.
              </p>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <PostCard key={post.id} post={post} delay={(i % 3) * 90} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
