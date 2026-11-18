import { createAdminClient } from "@/lib/supabase/server";
import { LOCALES, type Locale } from "@/lib/i18n/config";

/** O que o site mostra de um comentário aprovado (o e-mail nunca sai do servidor). */
export type ComentarioPublico = {
  id: string;
  nome: string;
  texto: string;
  resposta: string | null;
  respondido_em: string | null;
  created_at: string;
};

export type Comentario = ComentarioPublico & {
  post_slug: string;
  idioma: Locale;
  email: string;
  status: "pendente" | "aprovado" | "recusado";
  aprovado_em: string | null;
};

export const LIMITES = { nome: [2, 80], texto: [3, 2000] } as const;

/**
 * Comentários aprovados de um artigo, do mais antigo para o mais novo.
 * Devolve null quando os comentários não estão disponíveis (sem banco ou
 * sem a tabela criada): a seção inteira some, em vez de oferecer um
 * formulário que não teria onde gravar.
 */
export async function comentariosAprovados(slug: string): Promise<ComentarioPublico[] | null> {
  const admin = createAdminClient();
  if (!admin) return null;
  const { data, error } = await admin
    .from("comentarios")
    .select("id, nome, texto, resposta, respondido_em, created_at")
    .eq("post_slug", slug)
    .eq("status", "aprovado")
    .order("created_at", { ascending: true });
  if (error || !data) return null;
  return data as ComentarioPublico[];
}

/** Caminhos do artigo nos quatro idiomas, para atualizar a página quando um comentário muda. */
export function caminhosDoArtigo(slug: string) {
  return LOCALES.map((l) => (l === "pt" ? `/blog/${slug}` : `/${l}/blog/${slug}`));
}
