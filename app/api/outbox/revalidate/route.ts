import { revalidatePath, revalidateTag } from "next/cache";
import { OUTBOX_TAG } from "@/lib/outbox-cms";

/**
 * Aviso do OutBox CMS a cada publicação, atualização ou remoção de artigo.
 * Só expira o cache: o conteúdo é sempre relido do CMS, então não há o que falsificar.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  if (raw.length > 2_000_000) return Response.json({ ok: false }, { status: 413 });
  let slug = "";
  let event = req.headers.get("x-outbox-event") ?? "";
  try {
    const body = JSON.parse(raw) as { event?: string; post?: { slug?: string } | null };
    event = body.event ?? event;
    slug = typeof body.post?.slug === "string" ? body.post.slug : "";
  } catch {
    // corpo inválido: ainda assim só expira o cache
  }
  if (event === "test") return Response.json({ ok: true, event, message: "Blog OutBox conectado." });

  revalidateTag(OUTBOX_TAG, { expire: 0 });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (/^[a-z0-9-]{1,120}$/.test(slug)) revalidatePath(`/blog/${slug}`);
  return Response.json({ ok: true, event });
}
