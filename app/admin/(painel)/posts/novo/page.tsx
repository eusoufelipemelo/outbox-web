import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostEditor from "@/components/admin/PostEditor";

export default function NovoPostPage() {
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
        Novo post
      </h1>

      <PostEditor />
    </div>
  );
}
