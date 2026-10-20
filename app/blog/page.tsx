import type { Metadata } from "next";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { PostCard } from "@/components/site/BlogSection";
import { getPublishedPosts } from "@/lib/blog";
import TopoPagina from "@/components/site/TopoPagina";
import AboutFelipe from "@/components/site/AboutFelipe";

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
    <div className="sitev">
      <ScrollEffects />
      <Navbar />

      <main>
        <TopoPagina
          palavra="BLOG"
          esquerda="Blog da OutBox"
          titulo="Ideias que fazem a sua marca crescer."
          texto="Performance, SEO, GEO, branding e tecnologia explicados sem jargão, do jeito que a gente conversa com os nossos clientes."
        />

        <section className="bg-[var(--color-creme)] pb-24 md:pb-32">
          <div className="container-outbox">
            {posts.length === 0 ? (
              <p className="py-20 text-center text-[var(--color-cinza)]">
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

        {/* Quem está por trás: vai em toda página da OutBox */}
        <AboutFelipe />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
