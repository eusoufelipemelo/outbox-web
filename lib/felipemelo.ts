/**
 * Conteúdo da página /felipemelo: a página pessoal e o contato comercial do
 * Felipe Melo. Fica fora do menu e do rodapé do site da OutBox de propósito.
 * Todo número aqui é fato já publicado no site; nada inventado.
 */

export const FM = {
  nome: "Felipe Melo",
  url: "https://www.outboxgroup.com.br/felipemelo",
  email: "felipe@outboxgroup.com.br",
  telefoneExibicao: "(14) 9.9764-6257",
  telefoneE164: "+5514997646257",
  whatsapp: "5514997646257",
  instagram: "https://instagram.com/eusoufelipemelo",
  instagramHandle: "@eusoufelipemelo",
  cidade: "Santa Cruz do Rio Pardo, SP",
} as const;

export function fmWhatsapp(assunto?: string) {
  const base = "Olá, Felipe! Vim pela sua página e quero falar sobre um contato comercial.";
  const msg = assunto ? `${base}\n\nAssunto: ${assunto}` : base;
  return `https://wa.me/${FM.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/** Os três números que resumem a estrada, todos já publicados no site da OutBox. */
export const FM_NUMEROS = [
  { valor: "15", sufixo: "anos", rotulo: "criando marcas e presença digital" },
  { valor: "250", sufixo: "+", rotulo: "projetos entregues" },
  { valor: "500", sufixo: "+", rotulo: "clientes atendidos" },
] as const;

/** O que ele faz, nas palavras de quem contrata. */
export const FM_FRENTES = [
  {
    titulo: "Estratégia e identidade de marca",
    texto: "Posicionamento, identidade visual e as regras para a marca parecer grande em qualquer lugar.",
  },
  {
    titulo: "Sites que aparecem no Google e nas IAs",
    texto: "Páginas rápidas, com SEO e GEO, pensadas para trazer cliente e não só elogio.",
  },
  {
    titulo: "Sistemas sob medida",
    texto: "Plataformas que tiram a operação da planilha: painéis, permissões e automações.",
  },
  {
    titulo: "Apresentações de negócios e eventos",
    texto: "Propostas e palcos em link, com narrativa de venda, para quem precisa convencer de pé.",
  },
] as const;

export const FM_MARCAS = [
  "Casa46",
  "Escola de Planejados",
  "Master Revolution",
  "Couros do Valleh",
  "Clínica Paz Pediatria",
] as const;

/** Assuntos do contato comercial: o mesmo texto vai para o formulário e para o e-mail. */
export const FM_ASSUNTOS = [
  "Projeto de marketing digital",
  "Parceria comercial",
  "Patrocínio no canal Brasa de Respeito",
  "Outro assunto",
] as const;
export type Assunto = (typeof FM_ASSUNTOS)[number];

export const FM_CAMINHOS: { assunto: Assunto; titulo: string; texto: string; itens: string[] }[] = [
  {
    assunto: "Projeto de marketing digital",
    titulo: "Projetos de marketing digital",
    texto:
      "Para empresas que querem marca, site, sistema ou apresentação com estratégia por trás. Eu conduzo pessoalmente, com a estrutura da OutBox Group.",
    itens: ["Branding e posicionamento", "Sites com SEO e GEO", "Sistemas e automações", "Apresentações em link"],
  },
  {
    assunto: "Parceria comercial",
    titulo: "Parcerias",
    texto:
      "Para agências, produtores, mentores e empresas que querem somar forças em projetos, conteúdos e eventos.",
    itens: ["Projetos em conjunto", "Programa de indicação", "Conteúdo em parceria", "Eventos e lançamentos"],
  },
  {
    assunto: "Patrocínio no canal Brasa de Respeito",
    titulo: "Patrocínio e presença de marca",
    texto:
      "Para marcas que querem aparecer no canal Brasa de Respeito no YouTube. O formato é combinado caso a caso, para fazer sentido para a sua marca e para quem assiste.",
    itens: ["Sua marca nos episódios", "Formato combinado caso a caso", "Conversa direta comigo"],
  },
];

/** Depoimentos reais de clientes, os mesmos publicados no site da OutBox. */
export const FM_DEPOIMENTOS = [
  {
    quote:
      "Trabalhar com essa equipe foi como ter uma arma secreta. Eles pegaram nossas ideias dispersas e as transformaram em uma estratégia que grita 'uau!'. Nossos clientes não param de elogiar!",
    name: "Jônas Pastore",
    role: "Fundador, Casa46 e Escola de Planejados",
    avatar: "/img/av-jonas.png",
  },
  {
    quote:
      "Entrei com grandes expectativas, e eles me surpreenderam completamente. Da estratégia à execução, cada detalhe foi impecável.",
    name: "Patrícia Fontanive",
    role: "Founder e Diretora Criativa, Couros do Valleh",
    avatar: "/img/av-patricia.png",
  },
  {
    quote:
      "Eles nos fizeram sentir como se fôssemos o cliente mais importante deles. A atenção aos detalhes, as respostas rápidas e as ideias inovadoras foram de primeira.",
    name: "Dr. Alexandre Paz",
    role: "Médico Pediatra, Clínica Paz Pediatria",
    avatar: "/img/av-alexandre.png",
  },
] as const;
