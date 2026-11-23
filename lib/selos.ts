import { SITE } from "@/lib/site";

/**
 * Selos de entrega: notas MEDIDAS no site da OutBox, com data e link para
 * qualquer pessoa conferir. Nada aqui pode ser estimado ou arredondado para
 * cima. Ao medir de novo (pagespeed.web.dev, celular e computador), atualizar
 * MEDIDO_EM e as notas. Se alguma cair, o selo mostra a nota real.
 *
 * A nota do Perfil da Empresa no Google entra aqui quando houver avaliações
 * (em 23/11/2026 o Perfil ainda não tinha nenhuma).
 */

export const MEDIDO_EM = "2026-11-23";

/** Abre uma medição nova, ao vivo, da página inicial. */
export const LINK_PAGESPEED = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(`${SITE.url}/`)}`;

export type Selo = {
  id: string;
  /** O que aparece no centro do selo. */
  nota: string;
  /** Linha pequena abaixo da nota, dentro do selo. */
  sobNota: string;
  /** Quanto do anel interno fica preenchido (0 a 1). */
  preenchido: number;
  /** Quem mediu (vai no anel de texto do selo). */
  fonte: string;
  titulo: string;
  texto: string;
  link: { rotulo: string; href: string; externo: boolean };
};

export const SELOS: Selo[] = [
  {
    id: "velocidade",
    nota: "98",
    sobNota: "100 no computador",
    preenchido: 0.98,
    fonte: "PageSpeed Insights",
    titulo: "Velocidade",
    texto: "98 no celular e 100 no computador no PageSpeed Insights, a medição oficial do Google.",
    link: { rotulo: "Medir agora", href: LINK_PAGESPEED, externo: true },
  },
  {
    id: "acessibilidade",
    nota: "100",
    sobNota: "acessibilidade",
    preenchido: 1,
    fonte: "PageSpeed Insights",
    titulo: "Acessibilidade",
    texto: "Contraste no padrão WCAG AA, textos alternativos nas imagens e nome em todos os botões e links.",
    link: { rotulo: "Medir agora", href: LINK_PAGESPEED, externo: true },
  },
  {
    id: "seo",
    nota: "100",
    sobNota: "SEO e boas práticas",
    preenchido: 1,
    fonte: "PageSpeed Insights",
    titulo: "SEO e boas práticas",
    texto: "Página que o Google lê sem esforço, dados estruturados da empresa e 100 também em boas práticas de segurança.",
    link: { rotulo: "Medir agora", href: LINK_PAGESPEED, externo: true },
  },
  {
    id: "ia",
    nota: "3/3",
    sobNota: "navegação agêntica",
    preenchido: 1,
    fonte: "PageSpeed Insights",
    titulo: "Pronto para IAs",
    texto: "Nota máxima na navegação agêntica do PageSpeed: agentes de IA leem e navegam o site. O resumo para elas fica no llms.txt.",
    link: { rotulo: "Ver o llms.txt", href: "/llms.txt", externo: true },
  },
  {
    id: "lgpd",
    nota: "1",
    sobNota: "clique para recusar",
    preenchido: 1,
    fonte: "LGPD, Lei 13.709/2018",
    titulo: "Cookies dentro da LGPD",
    texto: "Recusar custa o mesmo clique que aceitar. Sem rastreamento e sem publicidade, só o essencial para o site funcionar.",
    link: { rotulo: "Ver a política de cookies", href: "/cookies", externo: false },
  },
];
