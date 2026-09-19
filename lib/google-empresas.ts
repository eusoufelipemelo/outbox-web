/**
 * Conteúdo da página /google-empresas.
 * O texto e os planos vivem aqui para que a página e o JSON-LD leiam a mesma
 * fonte: mudou o preço aqui, mudou na tela e nos dados estruturados.
 */

import { whatsappLink } from "@/lib/site";

export const GE_ROTA = "/google-empresas";
export const GE_CONTEXTO = "Google Empresas";

/** Link do WhatsApp com a mensagem já dizendo de onde a pessoa veio. */
export function geWhatsapp(detalhe?: string) {
  return whatsappLink(detalhe ? `${GE_CONTEXTO}, ${detalhe}` : GE_CONTEXTO);
}

export const GE_PROBLEMAS = [
  {
    titulo: "Perfil parado",
    texto:
      "A última publicação no Perfil da Empresa foi há meses. Quem pesquisa vê uma empresa sem sinal de vida, e o Google também.",
  },
  {
    titulo: "Site sem conteúdo novo",
    texto:
      "O site diz o que você faz, mas não responde nenhuma dúvida do cliente. Sem página que responda, não há o que o Google mostrar nem o que uma IA citar.",
  },
  {
    titulo: "O concorrente aparece primeiro",
    texto:
      "Ninguém compara dez empresas antes de chamar. A pessoa clica em quem respondeu a pergunta dela, e quem respondeu fica com o cliente.",
  },
] as const;

export const GE_PASSOS = [
  {
    numero: "01",
    titulo: "Pauta do mês",
    texto:
      "Planejamos os temas a partir do seu nicho e da sua cidade: as perguntas que o seu cliente faz antes de comprar.",
  },
  {
    numero: "02",
    titulo: "Artigo com SEO e GEO",
    texto:
      "Cada artigo traz resposta direta logo no início, perguntas frequentes e fontes reais, no formato que o Google e as IAs conseguem ler e citar.",
  },
  {
    numero: "03",
    titulo: "Publicação no seu site",
    texto:
      "O artigo vai para o blog do seu site, com título, descrição e dados estruturados configurados para a busca.",
  },
  {
    numero: "04",
    titulo: "Resumo no Perfil da Empresa",
    texto:
      "Publicamos um resumo do artigo no seu Perfil da Empresa no Google, com link para a leitura completa no site.",
  },
] as const;

/** Itens que todos os planos têm. */
export const GE_ITENS_COMUNS = [
  "Artigos com SEO e GEO",
  "Publicação no blog do seu site",
  "Resumo no Perfil da Empresa no Google",
  "Pautas planejadas para o seu nicho",
] as const;

/** Itens que só o Plano Autoridade tem. */
export const GE_ITENS_AUTORIDADE = [
  "SEO local para a sua cidade",
  "Capa personalizada em cada artigo",
  "Relatório mensal de leituras",
  "Prioridade na produção",
] as const;

export type Plano = {
  id: "essencial" | "crescimento" | "autoridade";
  nome: string;
  artigos: number;
  preco: number;
  /** Valor por artigo já arredondado, como é apresentado ao cliente. */
  porArtigo: number;
  destaque: boolean;
  resumo: string;
};

/**
 * Ordem de exibição no desktop: o Autoridade fica no centro. No celular ele
 * sobe para o primeiro lugar (ver PlanosGE).
 */
export const GE_PLANOS: Plano[] = [
  {
    id: "essencial",
    nome: "Plano Essencial",
    artigos: 4,
    preco: 900,
    porArtigo: 225,
    destaque: false,
    resumo: "Um artigo por semana para tirar o site e o perfil da inércia.",
  },
  {
    id: "autoridade",
    nome: "Plano Autoridade",
    artigos: 10,
    preco: 1590,
    porArtigo: 159,
    destaque: true,
    resumo:
      "Volume para cobrir as perguntas do seu mercado e virar referência na sua cidade.",
  },
  {
    id: "crescimento",
    nome: "Plano Crescimento",
    artigos: 6,
    preco: 1390,
    porArtigo: 232,
    destaque: false,
    resumo: "Mais temas por mês para ganhar espaço nas buscas mais disputadas.",
  },
];

export const GE_CONDICOES = {
  contrato: "Contrato mínimo de 6 meses, renovável por igual período.",
  pagamento:
    "Pagamento no Pix ou no cartão de crédito. No cartão, o valor total do contrato em até 6x, com os juros da operadora.",
} as const;

export const GE_FAQ = [
  {
    q: "Preciso ter um site para contratar?",
    a: "Não. Se você ainda não tem site, a OutBox cria um com blog e painel próprio para receber os artigos. Se já tem, a gente adapta o que existe. O site é orçado à parte, porque o escopo muda de empresa para empresa.",
  },
  {
    q: "Em quanto tempo aparecem os resultados?",
    a: "Não existe posição garantida nem prazo exato, e desconfie de quem promete. SEO é construção contínua: cada artigo é uma página nova que o Google pode mostrar e que as IAs podem citar, e o efeito se soma mês a mês. É por isso que o contrato mínimo é de 6 meses.",
  },
  {
    q: "Quem escreve os artigos?",
    a: "A equipe da OutBox. Usamos inteligência artificial como apoio na pesquisa e no rascunho, e todo artigo passa por revisão humana antes de ir ao ar: informação conferida, fontes reais e o tom da sua empresa.",
  },
  {
    q: "Posso trocar de plano?",
    a: "Pode, de um mês para o outro, tanto para subir quanto para descer. Você avisa e a mudança vale a partir do mês seguinte.",
  },
  {
    q: "Tem fidelidade?",
    // FIDELIDADE: a combinar. Felipe define a regra de saída antes do fim do
    // contrato (multa, aviso prévio) e esta resposta é ajustada. Até lá ela
    // afirma só o que já está decidido: o mínimo de 6 meses.
    a: "O contrato mínimo é de 6 meses, renovável por igual período. As condições para encerrar antes do fim são combinadas com você na assinatura.",
  },
] as const;

export function formatarReais(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
