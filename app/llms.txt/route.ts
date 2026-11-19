import { OUTBOX_API, OUTBOX_DOMAIN, OUTBOX_TAG } from "@/lib/outbox-cms";
import { SITE } from "@/lib/site";
import { CIDADES, ROTA_REGIAO } from "@/lib/regiao";

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
  const links = [
    ["Site", ""],
    ["Serviços da OutBox", "/servicos"],
    ["Consultoria Estratégica Empresarial (diagnóstico pago, sem obrigação de contratar a OutBox)", "/consultoria-empresarial"],
    ["Mentorias com Felipe Melo para profissionais de serviços digitais", "/mentoria"],
    ["Google Empresas (Google Meu Negócio): artigos com SEO e GEO todo mês", "/google-empresas"],
    ["Agência digital em Santa Cruz do Rio Pardo (SP) e região: Ourinhos, Bauru, Marília, Assis", ROTA_REGIAO],
    ["Cases e clientes", "/cases"],
    ["Blog", "/blog"],
  ];
  const sede = `Sede: ${SITE.endereco.rua}, ${SITE.endereco.bairro}, ${SITE.endereco.cidade} (sem atendimento presencial; atendimento por WhatsApp e videochamada). Atende ${CIDADES.map((c) => c.nome).join(", ")} e todo o Brasil.`;
  const body = `# ${SITE.name}\n\n> ${SITE.description}\n\n${sede}\n\n## Links\n\n${links.map(([n, c]) => `- [${n}](${SITE.url}${c})`).join("\n")}\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
