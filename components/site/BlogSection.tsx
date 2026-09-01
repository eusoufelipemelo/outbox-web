import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { getPublishedPosts, formatDate, type Post } from "@/lib/blog";

export default async function BlogSection() {
  const { posts } = await getPublishedPosts(3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[40ch]">
            <span className="pill reveal">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              Blog
            </span>
            <h2 className="reveal-words mt-6 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white">
              O que a gente aprende, a gente compartilha.
            </h2>
          </div>

          <Link
            href="/blog"
            className="reveal group flex cursor-pointer items-center gap-2.5 rounded-full border border-white/14 px-5 py-3 text-[14.5px] text-white/85 transition-colors duration-300 hover:border-white/30 hover:text-white"
          >
            Ver todos os artigos
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  return (
    <article
      className="reveal card-dark group flex flex-col overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-1 flex-col">
        <div className="relative h-[190px] overflow-hidden bg-gradient-to-br from-white/8 to-transparent">
          {post.cover_url ? (
            <Image
              src={post.cover_url}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={54}
                height={54}
                className="h-[54px] w-[54px] opacity-25 transition-opacity duration-500 group-hover:opacity-45"
              />
            </div>
          )}
          {post.category && (
            <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1.5 text-[11.5px] font-medium tracking-wide text-white backdrop-blur-sm">
              {post.category}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[19px] leading-snug text-white transition-colors duration-300 group-hover:text-[var(--color-brand)]">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
              {post.excerpt}
            </p>
          )}
          <div className="mt-6 flex items-center gap-3 text-[12.5px] text-[var(--color-fg-subtle)]">
            <span>{formatDate(post.published_at)}</span>
            {post.read_minutes ? (
              <>
                <span aria-hidden className="h-1 w-1 rounded-full bg-white/20" />
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.read_minutes} min
                </span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
