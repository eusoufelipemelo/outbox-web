"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bold,
  Check,
  Eye,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Quote,
  Save,
  Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Post } from "@/lib/blog";

type Props = { post?: Post };

/** Gera um slug limpo a partir do título. */
function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

const TOOLS = [
  { cmd: "bold", icon: Bold, label: "Negrito" },
  { cmd: "italic", icon: Italic, label: "Itálico" },
  { cmd: "formatBlock:h2", icon: Heading2, label: "Título 2" },
  { cmd: "formatBlock:h3", icon: Heading3, label: "Título 3" },
  { cmd: "insertUnorderedList", icon: List, label: "Lista" },
  { cmd: "insertOrderedList", icon: ListOrdered, label: "Lista numerada" },
  { cmd: "formatBlock:blockquote", icon: Quote, label: "Citação" },
] as const;

export default function PostEditor({ post }: Props) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Felipe Melo");
  const [coverUrl, setCoverUrl] = useState(post?.cover_url ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft"
  );

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "ok" | "error";
    text: string;
  } | null>(null);

  // Carrega o conteúdo salvo dentro do editor
  useEffect(() => {
    if (editorRef.current && post?.content) {
      editorRef.current.innerHTML = post.content;
    }
  }, [post?.content]);

  useEffect(() => {
    if (!slugTouched) setSlug(slugify(title));
  }, [title, slugTouched]);

  function exec(command: string) {
    const [cmd, value] = command.split(":");
    editorRef.current?.focus();
    document.execCommand(cmd, false, value);
  }

  function addLink() {
    const url = window.prompt("Endereço do link (https://...)");
    if (!url) return;
    editorRef.current?.focus();
    document.execCommand("createLink", false, url);
  }

  async function uploadImage(file: File, into: "cover" | "content") {
    const supabase = createClient();
    setUploading(true);
    setFeedback(null);

    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage
      .from("blog")
      .upload(path, file, { cacheControl: "31536000", upsert: false });

    if (error) {
      setUploading(false);
      setFeedback({
        type: "error",
        text: "Não consegui subir a imagem. Confira se o bucket 'blog' existe no Supabase.",
      });
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog").getPublicUrl(path);

    if (into === "cover") {
      setCoverUrl(publicUrl);
    } else {
      editorRef.current?.focus();
      document.execCommand("insertImage", false, publicUrl);
    }
    setUploading(false);
  }

  async function save(nextStatus?: "draft" | "published") {
    const finalStatus = nextStatus ?? status;

    if (!title.trim()) {
      setFeedback({ type: "error", text: "O post precisa de um título." });
      return;
    }
    if (!slug.trim()) {
      setFeedback({ type: "error", text: "O post precisa de um endereço (slug)." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const supabase = createClient();
    const content = editorRef.current?.innerHTML ?? "";
    const words = content.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length;

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim() || null,
      content,
      cover_url: coverUrl || null,
      category: category.trim() || null,
      author: author.trim() || null,
      read_minutes: Math.max(1, Math.round(words / 200)),
      status: finalStatus,
      published_at:
        finalStatus === "published"
          ? post?.published_at ?? new Date().toISOString()
          : null,
      updated_at: new Date().toISOString(),
    };

    const query = post?.id
      ? supabase.from("posts").update(payload).eq("id", post.id)
      : supabase.from("posts").insert(payload);

    const { error } = await query;
    setSaving(false);

    if (error) {
      setFeedback({
        type: "error",
        text:
          error.code === "23505"
            ? "Já existe um post com esse endereço. Troque o slug."
            : `Não consegui salvar: ${error.message}`,
      });
      return;
    }

    setStatus(finalStatus);
    setFeedback({
      type: "ok",
      text:
        finalStatus === "published"
          ? "Post publicado. Já está no ar."
          : "Rascunho salvo.",
    });

    router.refresh();
    if (!post?.id) router.push("/admin");
  }

  async function remove() {
    if (!post?.id) return;
    if (!window.confirm("Excluir este post? Essa ação não tem volta.")) return;

    const supabase = createClient();
    await supabase.from("posts").delete().eq("id", post.id);
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* Coluna principal */}
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="title" className="mb-2 block text-[13.5px] font-medium">
            Título
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Um título que dá vontade de clicar"
            className="admin-input font-display text-[19px]"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="mb-2 block text-[13.5px] font-medium">
            Resumo{" "}
            <span style={{ color: "var(--a-subtle)" }}>
              (aparece na listagem e no Google)
            </span>
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Duas linhas explicando do que trata o artigo."
            className="admin-input resize-none"
          />
        </div>

        {/* Editor */}
        <div>
          <span className="mb-2 block text-[13.5px] font-medium">Conteúdo</span>
          <div
            className="flex flex-wrap items-center gap-1 rounded-t-xl border p-2"
            style={{
              borderColor: "var(--a-line)",
              background: "var(--a-elevated)",
            }}
          >
            {TOOLS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.cmd}
                  type="button"
                  onClick={() => exec(t.cmd)}
                  title={t.label}
                  aria-label={t.label}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-[var(--a-hover)]"
                  style={{ color: "var(--a-muted)" }}
                >
                  <Icon className="h-[17px] w-[17px]" />
                </button>
              );
            })}
            <button
              type="button"
              onClick={addLink}
              title="Inserir link"
              aria-label="Inserir link"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-[var(--a-hover)]"
              style={{ color: "var(--a-muted)" }}
            >
              <Link2 className="h-[17px] w-[17px]" />
            </button>

            <label
              title="Inserir imagem no texto"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-[var(--a-hover)]"
              style={{ color: "var(--a-muted)" }}
            >
              <ImagePlus className="h-[17px] w-[17px]" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(f, "content");
                  e.target.value = "";
                }}
              />
            </label>
          </div>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label="Conteúdo do post"
            data-placeholder="Escreva o artigo aqui..."
            className="admin-editor"
          />
        </div>
      </div>

      {/* Coluna lateral */}
      <aside className="flex flex-col gap-5">
        <div className="admin-panel p-5">
          <h2 className="font-display text-[16px] font-semibold">Publicação</h2>

          <div className="mt-4 flex items-center gap-2">
            <span
              className="rounded-full px-3 py-1.5 text-[12.5px] font-medium"
              style={
                status === "published"
                  ? {
                      background: "rgba(34,197,94,0.14)",
                      color: "#4ade80",
                    }
                  : { background: "var(--a-hover)", color: "var(--a-muted)" }
              }
            >
              {status === "published" ? "Publicado" : "Rascunho"}
            </span>
            {post?.slug && status === "published" && (
              <a
                href={`/blog/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-1.5 text-[13px] transition-colors hover:underline"
                style={{ color: "var(--a-brand)" }}
              >
                <Eye className="h-3.5 w-3.5" />
                Ver no site
              </a>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => save("published")}
              disabled={saving}
              className="admin-btn admin-btn--primary w-full"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {status === "published" ? "Atualizar publicação" : "Publicar agora"}
            </button>
            <button
              type="button"
              onClick={() => save("draft")}
              disabled={saving}
              className="admin-btn admin-btn--ghost w-full"
            >
              <Save className="h-4 w-4" />
              Salvar rascunho
            </button>
          </div>

          {feedback && (
            <p
              role="status"
              className="mt-4 rounded-xl px-3.5 py-2.5 text-[13px]"
              style={
                feedback.type === "ok"
                  ? {
                      background: "rgba(34,197,94,0.12)",
                      color: "#4ade80",
                    }
                  : { background: "rgba(239,68,68,0.12)", color: "#fca5a5" }
              }
            >
              {feedback.text}
            </p>
          )}
        </div>

        <div className="admin-panel p-5">
          <h2 className="font-display text-[16px] font-semibold">Detalhes</h2>

          <div className="mt-4 flex flex-col gap-4">
            <div>
              <label htmlFor="slug" className="mb-2 block text-[13px] font-medium">
                Endereço do post
              </label>
              <input
                id="slug"
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setSlug(slugify(e.target.value));
                }}
                className="admin-input text-[13.5px]"
              />
              <p className="mt-1.5 text-[12px]" style={{ color: "var(--a-subtle)" }}>
                /blog/{slug || "..."}
              </p>
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-[13px] font-medium"
              >
                Categoria
              </label>
              <input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="SEO e GEO, Branding, Performance..."
                className="admin-input text-[13.5px]"
              />
            </div>

            <div>
              <label htmlFor="author" className="mb-2 block text-[13px] font-medium">
                Autor
              </label>
              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="admin-input text-[13.5px]"
              />
            </div>
          </div>
        </div>

        <div className="admin-panel p-5">
          <h2 className="font-display text-[16px] font-semibold">Imagem de capa</h2>

          {coverUrl ? (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverUrl}
                alt="Capa do post"
                className="h-[150px] w-full rounded-xl object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverUrl("")}
                className="admin-btn admin-btn--ghost mt-3 w-full"
              >
                <Trash2 className="h-4 w-4" />
                Remover capa
              </button>
            </div>
          ) : (
            <label
              className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-9 transition-colors hover:bg-[var(--a-hover)]"
              style={{ borderColor: "var(--a-line-strong)" }}
            >
              {uploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ImagePlus
                  className="h-5 w-5"
                  style={{ color: "var(--a-muted)" }}
                />
              )}
              <span className="text-[13px]" style={{ color: "var(--a-muted)" }}>
                {uploading ? "Enviando..." : "Escolher imagem"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadImage(f, "cover");
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>

        {post?.id && (
          <button
            type="button"
            onClick={remove}
            className="admin-btn admin-btn--ghost w-full"
            style={{ color: "#f87171", borderColor: "rgba(248,113,113,0.35)" }}
          >
            <Trash2 className="h-4 w-4" />
            Excluir post
          </button>
        )}
      </aside>
    </div>
  );
}
