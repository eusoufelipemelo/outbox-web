import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { getPublishedPosts, formatDate, type Post } from "@/lib/blog";
import { Revelar } from "@/components/ui/revelar";

/* "Blog & Insights" da referência: o artigo mais recente em destaque,
   largo, e os dois seguintes embaixo. */
export default async function BlogSection() {
  const { posts } = await getPublishedPosts(3);
  if (posts.length === 0) return null;
  const [destaque, ...resto] = posts;

  return (
    <section id="blog" className="bg-[var(--color-creme)] py-24 md:py-32">
      <div className="container-outbox">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="v3-titulo max-w-[14ch]">O que a gente aprende, a gente compartilha.</h2>
          <div className="flex flex-col gap-4 md:items-end">
            <p className="v3-sub max-w-[36ch] md:text-right">Blog</p>
            <Link href="/blog" className="v3-btn self-start md:self-end">
              Ver todos os artigos
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </Link>
          </div>
        </div>

        <Revelar className="mt-12">
          <PostDestaque post={destaque} />
        </Revelar>

        {resto.length > 0 && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {resto.map((post, i) => (
              <PostCard key={post.id} post={post} delay={i * 80} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Capa({ post, sizes }: { post: Post; sizes: string }) {
  return post.cover_url ? (
    <Image
      src={post.cover_url}
      alt=""
      fill
      sizes={sizes}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
    />
  ) : (
    <div className="flex h-full items-center justify-center bg-[var(--color-brand)]">
      <Image src="/brand/outbox-simbolo-branco.svg" alt="" width={64} height={64} className="h-16 w-16 opacity-80" />
    </div>
  );
}

function Categoria({ post }: { post: Post }) {
  if (!post.category) return null;
  return (
    <span className="v3-chip absolute left-4 top-4 rounded-full bg-[#f5f2f0] px-3 py-1.5 !text-[12.5px]">
      {post.category}
    </span>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-3 text-[13px] text-[var(--color-cinza)]">
      <span>{formatDate(post.published_at)}</span>
      {post.read_minutes ? (
        <>
          <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--color-borda)]" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {post.read_minutes} min
          </span>
        </>
      ) : null}
    </div>
  );
}

function PostDestaque({ post }: { post: Post }) {
  return (
    <article className="group grid overflow-hidden rounded-[24px] bg-white p-2 md:grid-cols-[1.15fr_1fr]">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden rounded-[18px] md:aspect-auto md:min-h-[380px]" tabIndex={-1} aria-hidden>
        <Capa post={post} sizes="(max-width: 768px) 100vw, 620px" />
        <Categoria post={post} />
      </Link>
      <div className="flex flex-col p-5 md:p-8">
        <Meta post={post} />
        <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-[1.12] tracking-[-0.025em]">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[#b8330f]">
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-4 text-[15.5px] leading-relaxed text-[var(--color-cinza)]">{post.excerpt}</p>
        )}
        <Link href={`/blog/${post.slug}`} className="v3-btn mt-8 w-full md:mt-auto">
          Ler artigo
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  return (
    <Revelar atraso={delay / 1000}>
      <article className="group flex h-full flex-col rounded-[22px] bg-white p-2">
        <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden rounded-[16px]" tabIndex={-1} aria-hidden>
          <Capa post={post} sizes="(max-width: 768px) 100vw, 560px" />
          <Categoria post={post} />
        </Link>
        <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
          <h3 className="text-[19px] font-bold leading-snug tracking-[-0.015em]">
            <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[#b8330f]">
              {post.title}
            </Link>
          </h3>
          {post.excerpt && (
            <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[var(--color-cinza)]">{post.excerpt}</p>
          )}
          <div className="mt-5">
            <Meta post={post} />
          </div>
        </div>
      </article>
    </Revelar>
  );
}
