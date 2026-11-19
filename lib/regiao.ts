import type { Locale } from "@/lib/i18n/config";

/**
 * SEO local e regional da OutBox: um lugar só para a sede e a região atendida.
 *
 * A sede fica em Santa Cruz do Rio Pardo (SP) e não recebe clientes: o
 * atendimento é por WhatsApp e videochamada. Por isso o site fala em "atender
 * empresas" da região, nunca em "visite nosso escritório".
 *
 * PENDENTE DE APROVAÇÃO: a lista de cidades abaixo foi montada pela proximidade
 * com a sede e pelo Google Trends (Ourinhos e Bauru aparecem entre as cidades
 * paulistas que mais buscam "criar site"). Basta editar aqui para mudar em todo
 * o site (títulos, dados estruturados, página regional e rodapé).
 */

export const SEDE = { cidade: "Santa Cruz do Rio Pardo", uf: "SP", estado: "São Paulo" } as const;

/** Rota da página regional (só em português: é busca local no Brasil). */
export const ROTA_REGIAO = "/agencia-digital-santa-cruz-do-rio-pardo";

/** Cidades atendidas, da mais próxima da sede para a mais distante. */
export const CIDADES = [
  { nome: "Santa Cruz do Rio Pardo", grupo: "Sede" },
  { nome: "Ourinhos", grupo: "Vizinhança" },
  { nome: "Ipaussu", grupo: "Vizinhança" },
  { nome: "Chavantes", grupo: "Vizinhança" },
  { nome: "Bernardino de Campos", grupo: "Vizinhança" },
  { nome: "Espírito Santo do Turvo", grupo: "Vizinhança" },
  { nome: "São Pedro do Turvo", grupo: "Vizinhança" },
  { nome: "Óleo", grupo: "Vizinhança" },
  { nome: "Piraju", grupo: "Vizinhança" },
  { nome: "Assis", grupo: "Polos da região" },
  { nome: "Marília", grupo: "Polos da região" },
  { nome: "Bauru", grupo: "Polos da região" },
  { nome: "Botucatu", grupo: "Polos da região" },
  { nome: "Avaré", grupo: "Polos da região" },
] as const;

/** As cidades que cabem numa frase (título, descrição, rodapé). */
export const CIDADES_PRINCIPAIS = ["Santa Cruz do Rio Pardo", "Ourinhos", "Bauru", "Marília", "Assis"] as const;

/** "Criação de sites para empresas" vira "… em Santa Cruz do Rio Pardo (SP)" em português. */
export function tituloLocal(titulo: string, locale: Locale) {
  return locale === "pt" ? `${titulo} em ${SEDE.cidade} (${SEDE.uf})` : titulo;
}

/** Acrescenta a região atendida ao fim da descrição, em português. */
export function descricaoLocal(descricao: string, locale: Locale) {
  if (locale !== "pt") return descricao;
  return `${descricao} Atendemos ${SEDE.cidade}, Ourinhos, Bauru, Marília e todo o Brasil.`;
}

/** areaServed do schema.org: as cidades, o estado e o país (atendimento online). */
export function areaServedJsonLd() {
  return [
    ...CIDADES.map((c) => ({
      "@type": "City",
      name: c.nome,
      containedInPlace: { "@type": "State", name: SEDE.estado },
    })),
    { "@type": "State", name: SEDE.estado },
    { "@type": "Country", name: "Brasil" },
  ];
}
