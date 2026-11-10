import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getPublishedPosts } from "@/lib/blog";
import type { Comentario } from "@/lib/comentarios";
import ModeracaoComentarios from "@/components/admin/ModeracaoComentarios";

export const dynamic = "force-dynamic";

export default async function ComentariosPage() {
  let comentarios: Comentario[] = [];
  let dbError: string | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("comentarios")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) dbError = error.message;
    else comentarios = (data ?? []) as Comentario[];
  } else {
    dbError = "Credenciais do Supabase ainda não configuradas.";
  }

  // Título de cada artigo, para o card mostrar onde a pessoa comentou.
  const { posts } = await getPublishedPosts();
  const titulos = Object.fromEntries(posts.map((p) => [p.slug, p.title]));

  return (
    <div>
      <header>
        <h1 className="font-display text-[28px] font-semibold">Comentários</h1>
        <p className="mt-1.5 text-[14.5px]" style={{ color: "var(--a-muted)" }}>
          Comentários e dúvidas dos artigos. Só aparecem no blog depois de aprovados; responder já aprova e avisa a
          pessoa por e-mail.
        </p>
      </header>

      {dbError && (
        <div
          className="mt-6 rounded-xl border px-4 py-3.5 text-[13.5px]"
          style={{ borderColor: "rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.08)", color: "#fcd34d" }}
        >
          {dbError}
        </div>
      )}

      <ModeracaoComentarios comentarios={comentarios} titulos={titulos} />
    </div>
  );
}
