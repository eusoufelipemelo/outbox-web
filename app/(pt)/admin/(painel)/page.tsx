import Link from "next/link";
import { FileText, PenSquare, Plus } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  let posts: Post[] = [];
  let dbError: string | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) dbError = error.message;
    else posts = (data ?? []) as Post[];
  } else {
    dbError = "Credenciais do Supabase ainda não configuradas.";
  }

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.length - published;

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-semibold">Posts</h1>
          <p className="mt-1.5 text-[14.5px]" style={{ color: "var(--a-muted)" }}>
            {posts.length} no total · {published} publicados · {drafts} rascunhos
          </p>
        </div>
        <Link href="/admin/posts/novo" className="admin-btn admin-btn--primary">
          <Plus className="h-4 w-4" />
          Novo post
        </Link>
      </header>

      {dbError && (
        <div
          className="mt-6 rounded-xl border px-4 py-3.5 text-[13.5px]"
          style={{
            borderColor: "rgba(251,191,36,0.3)",
            background: "rgba(251,191,36,0.08)",
            color: "#fcd34d",
          }}
        >
          {dbError} Rode o script SQL em <code>supabase/schema.sql</code> e
          preencha as variáveis de ambiente para ativar o painel.
        </div>
      )}

      {posts.length === 0 ? (
        <div className="admin-panel mt-8 flex flex-col items-center px-6 py-16 text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--a-hover)" }}
          >
            <FileText className="h-6 w-6" style={{ color: "var(--a-muted)" }} />
          </span>
          <h2 className="mt-5 font-display text-[19px] font-semibold">
            Nenhum post por aqui ainda
          </h2>
          <p
            className="mt-2 max-w-[42ch] text-[14.5px]"
            style={{ color: "var(--a-muted)" }}
          >
            Escreva o primeiro artigo do blog. Assim que publicar, ele aparece no
            site na hora.
          </p>
          <Link
            href="/admin/posts/novo"
            className="admin-btn admin-btn--primary mt-6"
          >
            <PenSquare className="h-4 w-4" />
            Escrever o primeiro post
          </Link>
        </div>
      ) : (
        <div className="admin-panel mt-8 overflow-hidden">
          <ul>
            {posts.map((post, i) => (
              <li
                key={post.id}
                style={{
                  borderTop: i === 0 ? "none" : "1px solid var(--a-line)",
                }}
              >
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="flex cursor-pointer items-center gap-4 px-5 py-4 transition-colors hover:bg-[var(--a-hover)]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[16px] font-medium">
                      {post.title}
                    </span>
                    <span
                      className="mt-1 block text-[12.5px]"
                      style={{ color: "var(--a-subtle)" }}
                    >
                      /blog/{post.slug}
                      {post.published_at
                        ? ` · ${formatDate(post.published_at)}`
                        : ""}
                    </span>
                  </span>

                  {post.category && (
                    <span
                      className="hidden rounded-full px-3 py-1.5 text-[12px] sm:block"
                      style={{
                        background: "var(--a-hover)",
                        color: "var(--a-muted)",
                      }}
                    >
                      {post.category}
                    </span>
                  )}

                  <span
                    className="shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium"
                    style={
                      post.status === "published"
                        ? {
                            background: "rgba(34,197,94,0.14)",
                            color: "#4ade80",
                          }
                        : {
                            background: "var(--a-hover)",
                            color: "var(--a-muted)",
                          }
                    }
                  >
                    {post.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
