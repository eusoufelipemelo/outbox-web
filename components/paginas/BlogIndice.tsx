import type { Metadata } from "next";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { PostCard } from "@/components/site/BlogSection";
import { getPublishedPosts } from "@/lib/blog";
import RevealTitle from "@/components/ui/reveal-title";
import AboutFelipe from "@/components/site/AboutFelipe";
import { getT } from "@/lib/i18n/server";
import { localizarPost } from "@/lib/i18n/blog";
import { alternates } from "@/lib/i18n/meta";
import { traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";

export function metadataBlog(locale: Locale): Metadata {
  return {
    title: "Blog",
    description: traduzir(
      DICIONARIOS[locale],
      "Conteúdo sobre performance, SEO, GEO, branding e tecnologia para empresas que querem crescer no digital.",
    ),
    alternates: alternates(locale, "/blog"),
  };
}

export default async function BlogIndice() {
  const { t, locale } = getT();
  const { posts: originais } = await getPublishedPosts();
  const posts = originais.map((p) => localizarPost(p, locale));

  return (
    <>
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        <section className="relative overflow-hidden pt-40 pb-16 md:pt-48">
          <div className="container-outbox relative z-10 text-center">
            <span className="pill reveal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              {t("Blog da OutBox")}
            </span>
            <RevealTitle
              as="h1"
              className="mx-auto mt-7 max-w-[18ch] font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.04] text-white"
            >
              {t("Ideias que fazem a sua marca crescer.")}
            </RevealTitle>
            <p className="reveal mx-auto mt-6 max-w-[58ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)]">
              {t("Performance, SEO, GEO, branding e tecnologia explicados sem jargão, do jeito que a gente conversa com os nossos clientes.")}
            </p>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="container-outbox">
            {posts.length === 0 ? (
              <p className="py-20 text-center text-[var(--color-fg-muted)]">
                {t("Ainda não publicamos nada por aqui. Volte em breve.")}
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

        {/* Quem está por trás: vai em toda página da OutBox */}
        <AboutFelipe />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
