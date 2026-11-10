import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getPostBySlug } from "@/lib/blog";
import { caminhosDoArtigo, type Comentario } from "@/lib/comentarios";
import { enviarEmail, escapeHtml, moldura } from "@/lib/email";
import { localizar, traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { localizarPost } from "@/lib/i18n/blog";
import { SITE } from "@/lib/site";

/* Moderação pelo painel: aprovar, recusar, responder ou apagar.
   Usa a sessão de quem está logado (RLS: só usuário autenticado modera). */

type Acao = { id: string; acao: "aprovar" | "recusar" | "responder" | "apagar"; resposta?: string };

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Faça login de novo." }, { status: 401 });

  const { id, acao, resposta } = (await request.json()) as Acao;
  const { data: atual } = await supabase.from("comentarios").select("*").eq("id", id).maybeSingle();
  if (!atual) return NextResponse.json({ error: "Comentário não encontrado." }, { status: 404 });
  const c = atual as Comentario;
  const agora = new Date().toISOString();

  let mudanca: Partial<Comentario> | null = null;
  if (acao === "aprovar") mudanca = { status: "aprovado", aprovado_em: c.aprovado_em ?? agora };
  else if (acao === "recusar") mudanca = { status: "recusado" };
  else if (acao === "responder") {
    const texto = (resposta ?? "").trim();
    if (texto.length < 2) return NextResponse.json({ error: "Escreva a resposta." }, { status: 400 });
    // Responder já publica: ninguém responde uma dúvida para escondê-la.
    mudanca = { resposta: texto, respondido_em: agora, status: "aprovado", aprovado_em: c.aprovado_em ?? agora };
  }

  const { error } =
    acao === "apagar"
      ? await supabase.from("comentarios").delete().eq("id", id)
      : await supabase.from("comentarios").update(mudanca!).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  for (const caminho of caminhosDoArtigo(c.post_slug)) revalidatePath(caminho);

  // Quem perguntou recebe a resposta por e-mail, no idioma em que comentou.
  let avisado = false;
  if (acao === "responder") {
    try {
      avisado = await avisarResposta(c, mudanca!.resposta!);
    } catch {
      avisado = false;
    }
  }

  return NextResponse.json({ ok: true, avisado });
}

async function avisarResposta(c: Comentario, resposta: string) {
  const idioma: Locale = c.idioma ?? "pt";
  const t = (pt: string, vars?: Record<string, string>) => traduzir(DICIONARIOS[idioma], pt, vars);
  const original = await getPostBySlug(c.post_slug);
  const titulo = original ? localizarPost(original, idioma).title : c.post_slug;
  const link = `${SITE.url}${localizar(idioma, `/blog/${c.post_slug}`)}#comentarios`;

  return enviarEmail({
    para: c.email,
    responderPara: SITE.email,
    remetente: "OutBox Group",
    assunto: t("A OutBox respondeu o seu comentário em \"{artigo}\"", { artigo: titulo }),
    texto: `${t("Olá, {nome}!", { nome: c.nome })}\n\n${t("Você comentou:")}\n${c.texto}\n\n${t("Resposta da OutBox:")}\n${resposta}\n\n${link}`,
    html: moldura({
      titulo: t("Respondemos o seu comentário"),
      corpo: `<p style="margin:0 0 16px">${escapeHtml(t("Olá, {nome}!", { nome: c.nome }))}</p>
        <p style="margin:0 0 6px;color:#6b6f76;font-size:13px">${escapeHtml(t("Você comentou em \"{artigo}\":", { artigo: titulo }))}</p>
        <p style="margin:0 0 18px;padding:12px 14px;background:#f5f7f9;border-radius:10px;white-space:pre-wrap">${escapeHtml(c.texto)}</p>
        <p style="margin:0 0 6px;color:#6b6f76;font-size:13px">${escapeHtml(t("Resposta da OutBox:"))}</p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(resposta)}</p>`,
      botao: { texto: t("Ver no artigo"), href: link },
    }),
  });
}
