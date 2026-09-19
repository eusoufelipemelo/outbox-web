import { getIndexNowKey } from "@/lib/outbox-cms";

/** Serve /<chave>.txt (via rewrite) para o IndexNow confirmar que o site é nosso. */
export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const expected = await getIndexNowKey();
  if (!expected || key !== expected) return new Response("Not found", { status: 404 });
  return new Response(expected, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
