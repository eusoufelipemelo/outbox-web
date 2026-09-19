import { OUTBOX_API, OUTBOX_DOMAIN, OUTBOX_TAG } from "@/lib/outbox-cms";
import { SITE } from "@/lib/site";

/** Resumo do site para IAs (llmstxt.org), gerado pelo OutBox CMS. */
export async function GET() {
  try {
    const res = await fetch(`${OUTBOX_API}/llms.txt?site=${OUTBOX_DOMAIN}`, {
      next: { tags: [OUTBOX_TAG], revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (res.ok) return new Response(await res.text(), { headers: { "content-type": "text/plain; charset=utf-8" } });
  } catch {
    // cai no resumo local
  }
  const body = `# ${SITE.name}\n\n> ${SITE.description}\n\n## Links\n\n- [Site](${SITE.url})\n- [Blog](${SITE.url}/blog)\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
