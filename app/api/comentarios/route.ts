import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { getPostBySlug } from "@/lib/blog";
import { LIMITES } from "@/lib/comentarios";
import { enviarEmail, escapeHtml, moldura } from "@/lib/email";
import { LOCALES, localizar, type Locale } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";

/* Comentário novo num artigo. Nasce "pendente": só aparece depois que o
   painel aprova. As mensagens de erro saem em português e o formulário
   traduz pelo dicionário. */

const RATE = new Map<string, { count: number; reset: number }>();

/** 4 comentários a cada 10 minutos por IP. */
function rateLimited(ip: string) {
  const agora = Date.now();
  const entrada = RATE.get(ip);
  if (!entrada || agora > entrada.reset) {
    RATE.set(ip, { count: 1, reset: agora + 10 * 60 * 1000 });
    return false;
  }
  entrada.count += 1;
  return entrada.count > 4;
}

const erro = (mensagem: string, status = 400) => NextResponse.json({ error: mensagem }, { status });

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "desconhecido";
    if (rateLimited(ip)) return erro("Muitas tentativas. Aguarde alguns minutos.", 429);

    const body = (await request.json()) as Record<string, unknown>;
    // Campo isca: robô preenche, gente não vê. Responde ok para não ensinar o robô.
    if (typeof body.website === "string" && body.website) return NextResponse.json({ ok: true });

    const slug = String(body.slug ?? "").trim();
    const nome = String(body.nome ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const texto = String(body.texto ?? "").trim();
    const idioma: Locale = (LOCALES as readonly string[]).includes(String(body.idioma)) ? (body.idioma as Locale) : "pt";

    if (nome.length < LIMITES.nome[0] || nome.length > LIMITES.nome[1]) return erro("Escreva o seu nome.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) return erro("E-mail inválido.");
    if (texto.length < LIMITES.texto[0] || texto.length > LIMITES.texto[1]) return erro("Escreva o seu comentário.");
    // Comentário com muitos links é quase sempre propaganda.
    if ((texto.match(/https?:\/\/|www\./gi) ?? []).length > 2) return erro("Comentários com muitos links não são aceitos.");

    const post = await getPostBySlug(slug);
    if (!post) return erro("Artigo não encontrado.", 404);

    const admin = createAdminClient();
    if (!admin) return erro("Os comentários ainda não estão configurados no servidor.", 503);
    const { error } = await admin.from("comentarios").insert({ post_slug: slug, idioma, nome, email, texto });
    if (error) return erro("Não foi possível enviar agora.", 500);

    // Aviso para a equipe moderar. Falha no e-mail não desfaz o comentário.
    try {
      const artigo = `${SITE.url}${localizar(idioma, `/blog/${slug}`)}`;
      await enviarEmail({
        para: SITE.email,
        responderPara: `"${nome}" <${email}>`,
        assunto: `Novo comentário para aprovar: ${post.title}`,
        texto: `${nome} (${email}) comentou em "${post.title}" (${idioma}):\n\n${texto}\n\nAprovar ou responder: ${SITE.url}/admin/comentarios\nArtigo: ${artigo}`,
        html: moldura({
          titulo: "Novo comentário para aprovar",
          corpo: `<p style="margin:0 0 6px;color:#6b6f76;font-size:13px">Artigo</p>
            <p style="margin:0 0 18px"><a href="${escapeHtml(artigo)}" style="color:#0a0a0a">${escapeHtml(post.title)}</a></p>
            <p style="margin:0 0 6px;color:#6b6f76;font-size:13px">${escapeHtml(nome)} · ${escapeHtml(email)} · ${idioma.toUpperCase()}</p>
            <p style="margin:0;white-space:pre-wrap">${escapeHtml(texto)}</p>`,
          botao: { texto: "Aprovar ou responder no painel", href: `${SITE.url}/admin/comentarios` },
        }),
      });
    } catch {
      // segue
    }

    return NextResponse.json({ ok: true });
  } catch {
    return erro("Não foi possível enviar agora.", 500);
  }
}
