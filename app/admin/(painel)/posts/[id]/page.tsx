import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PostEditor from "@/components/admin/PostEditor";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Post } from "@/lib/blog";

export const dynamic = "force-dynamic";

export default async function EditarPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!isSupabaseConfigured) notFound();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex cursor-pointer items-center gap-2 text-[14px] transition-colors hover:underline"
        style={{ color: "var(--a-muted)" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para os posts
      </Link>

      <h1 className="mt-5 mb-8 font-display text-[28px] font-semibold">
        Editar post
      </h1>

      <PostEditor post={data as Post} />
    </div>
  );
}
