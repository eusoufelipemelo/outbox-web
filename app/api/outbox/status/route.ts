import { OUTBOX_DOMAIN } from "@/lib/outbox-cms";

export const dynamic = "force-dynamic";

/** Usado pelo "Testar conexão" do OutBox CMS. */
export function GET() {
  return Response.json({ outbox: true, blog: "/blog", domain: OUTBOX_DOMAIN }, { headers: { "cache-control": "no-store" } });
}
