/**
 * Os onze serviços da OutBox (briefing de 18/11/2026, seção 05), na ordem e
 * nos grupos do menu. A página de cada um vive em /servicos/<slug>; o Perfil
 * da Empresa no Google mantém a página que já existia, /google-empresas.
 */

export const GRUPOS = ["Presença Digital", "Marca", "Operação e Tecnologia", "Vendas"] as const;
export type Grupo = (typeof GRUPOS)[number];

export const CATALOGO = [
  { slug: "sites", nome: "Sites Profissionais", grupo: "Presença Digital" },
  { slug: "sites-com-blog", nome: "Sites + Blog", grupo: "Presença Digital" },
  { slug: "gestao-de-blog", nome: "Gestão de Blog", grupo: "Presença Digital" },
  { slug: "google-empresas", nome: "Perfil da Empresa no Google", grupo: "Presença Digital", rota: "/google-empresas" },
  { slug: "landing-pages", nome: "Landing Pages", grupo: "Vendas" },
  { slug: "identidade-visual", nome: "Identidade Visual", grupo: "Marca" },
  { slug: "apresentacoes-comerciais", nome: "Apresentações Comerciais", grupo: "Marca" },
  { slug: "sistemas-personalizados", nome: "Sistemas Personalizados", grupo: "Operação e Tecnologia" },
  { slug: "micro-saas", nome: "Micro SaaS", grupo: "Operação e Tecnologia" },
  { slug: "gestao-ecommerce", nome: "Gestão de E-commerce", grupo: "Vendas" },
  { slug: "gestao-marketplaces", nome: "Gestão de Marketplaces", grupo: "Vendas" },
] as const satisfies readonly { slug: string; nome: string; grupo: Grupo; rota?: string }[];

export type ItemCatalogo = (typeof CATALOGO)[number];

export function rotaServico(item: { slug: string; rota?: string }) {
  return item.rota ?? `/servicos/${item.slug}`;
}

/** Opções do campo "serviço de interesse" dos formulários. */
export const OPCOES_SERVICO = [...CATALOGO.map((c) => c.nome), "Mais de um serviço / ainda não sei"];
