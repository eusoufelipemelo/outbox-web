import { SITE, TESTIMONIALS } from "@/lib/site";

/* Proposta da Essence Arquitetura (arq. Deborah Medeiros).
   Valores e condições combinados com o Felipe em 20/10/2026. */

export const CLIENTE = {
  escritorio: "Essence Arquitetura",
  arquiteta: "Deborah Medeiros",
  primeiroNome: "Deborah",
  logo: "/img/essence-logo.jpg",
  /** fundo da logo, usado para emendar a placa com a página */
  cor: "#985230",
};

/** Data limite para o site de brinde. Ajustar se a proposta for reenviada. */
export const VALIDADE = { iso: "2026-10-23", texto: "23/10/2026" };

export const VALORES = {
  implantacao: 2000,
  mensal: 900,
  meses: 6,
  site: 4500,
  diasParaEntregar: 3,
  diasAteCobrar: 30,
  diaVencimento: 10,
};

function whats(msg: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export const LINKS = {
  fechar: whats(
    "Olá, Felipe! Aqui é a Deborah, da Essence Arquitetura. Li a proposta e quero fechar hoje. Pode me mandar o contrato e o briefing?"
  ),
  duvida: whats(
    "Olá, Felipe! Aqui é a Deborah, da Essence Arquitetura. Li a proposta e tenho uma dúvida antes de fechar:"
  ),
};

export type Comodo = {
  id: "fachada" | "sala" | "biblioteca" | "atelie";
  nome: string;
  entrega: string;
  quando: string;
  texto: string;
  itens: string[];
};

/* A planta do projeto: cada cômodo é uma entrega. */
export const COMODOS: Comodo[] = [
  {
    id: "fachada",
    nome: "Hall de entrada",
    entrega: "Perfil da Empresa no Google",
    quando: "Na implantação",
    texto:
      "É a porta por onde o cliente chega quando procura arquiteta no Google ou no Maps. Criamos o perfil da Essence ou ajustamos o que já existe, para ele aparecer completo e confiável.",
    itens: [
      "Criação ou revisão completa do perfil",
      "Categorias, serviços, área de atendimento e horários",
      "Fotos de projetos e link para o site e o WhatsApp",
      "Publicações automáticas a cada artigo novo",
    ],
  },
  {
    id: "sala",
    nome: "Sala principal",
    entrega: "Site da Essence (brinde)",
    quando: "Pronto em 3 dias",
    texto:
      "O lugar onde o cliente decide te chamar. Um site com a identidade da Essence, feito para mostrar o seu trabalho e transformar visita em conversa no WhatsApp.",
    itens: [
      "Portfólio de projetos e páginas de serviços",
      "Rápido no celular, com SEO técnico e GEO para as IAs",
      "Botão de WhatsApp em todos os pontos de decisão",
      "Páginas legais, aviso de cookies e prévia bonita ao compartilhar",
    ],
  },
  {
    id: "biblioteca",
    nome: "Biblioteca",
    entrega: "Blog com CMS próprio",
    quando: "Na implantação",
    texto:
      "Um painel na identidade da Essence onde os artigos entram sozinhos. Se quiser publicar algo seu, você entra, escreve e publica, sem depender de ninguém.",
    itens: [
      "Painel de administração com seu acesso",
      "Automação dos artigos direto no blog",
      "Imagens otimizadas automaticamente",
      "Cada artigo vira uma página nova para o Google encontrar",
    ],
  },
  {
    id: "atelie",
    nome: "Ateliê",
    entrega: "4 artigos por mês",
    quando: "Todo mês",
    texto:
      "Conteúdo que responde o que o seu cliente pergunta antes de contratar uma arquiteta. Escrito para o Google mostrar e para o ChatGPT e o Gemini citarem a Essence.",
    itens: [
      "Pautas planejadas para arquitetura e interiores",
      "Artigos com SEO e GEO, publicados no blog",
      "Resumo de cada artigo no Perfil do Google",
      "Um artigo por semana, sem você precisar lembrar",
    ],
  },
];

export const PASSOS = [
  {
    titulo: "Assinatura e implantação",
    texto: "Você assina o contrato e faz o pagamento da implantação. No mesmo dia recebe o link do briefing.",
  },
  {
    titulo: "Briefing e materiais",
    texto: "Você responde o briefing e envia logo, fotos dos projetos e textos que já tiver. É o único passo que depende de você.",
  },
  {
    titulo: "Tudo no ar em 3 dias",
    texto: "Site, blog, CMS e Perfil do Google prontos em até 3 dias depois do envio. Você revisa e a gente publica.",
  },
  {
    titulo: "Primeira mensalidade",
    texto: "Só 30 dias depois do fechamento, com vencimento até o dia 10. Os artigos já estão rodando.",
  },
];

export const CONDICOES = [
  {
    titulo: "Implantação, paga uma única vez",
    texto: "No ato da assinatura do contrato. Pix à vista ou cartão de crédito em até 12x, com os juros da operadora.",
  },
  {
    titulo: "Mensalidade só depois de 30 dias",
    texto: "A primeira cobrança acontece 30 dias após o fechamento. Daí em diante, vence sempre até o dia 10 de cada mês.",
  },
  {
    titulo: "Contrato de 6 meses",
    texto:
      "Renovação automática por igual período. Se não quiser continuar, basta avisar com 30 dias de antecedência.",
  },
  {
    titulo: "Site sem custo",
    texto: "O site de R$ 4.500 entra de brinde no fechamento desta proposta. Você não paga nada por ele.",
  },
];

export const OUTBOX = {
  texto:
    "A OutBox é uma agência de tecnologia que cria sites, sistemas e presença no Google para escritórios e profissionais que vivem de reputação. Nosso CMS publica os artigos de vários clientes todos os meses, e a implantação já tem processo testado: por isso o prazo de 3 dias é real.",
  fatos: [
    { valor: "3 dias", rotulo: "do briefing ao ar" },
    { valor: "CNPJ", rotulo: SITE.cnpj },
    { valor: "1 pessoa", rotulo: "te atende do começo ao fim" },
  ],
  depoimentos: TESTIMONIALS.filter((t) =>
    ["Dra. Michelle Sanches", "Jônas Pastore", "Patrícia Fontanive"].includes(t.name)
  ),
  felipe: {
    foto: "/img/felipe-retrato.jpg",
    nome: "Felipe Melo",
    cargo: "Fundador da OutBox",
    texto:
      "Deborah, quem cuida da Essence sou eu. A dúvida que chegar no WhatsApp cai comigo, não numa central de atendimento.",
  },
};

export const FAQ = [
  {
    q: "Eu já tenho Perfil no Google. Perco o que já tenho?",
    a: "Não. Avaliações, fotos e histórico continuam. A gente revisa o perfil, completa o que falta e liga ele ao site e aos artigos.",
  },
  {
    q: "E se eu não tiver todas as fotos dos projetos agora?",
    a: "Começamos com o que você tiver. O site sai em 3 dias e você acrescenta projetos depois pelo próprio painel, quando quiser.",
  },
  {
    q: "O site fica meu?",
    a: "Sim. O domínio, os textos, as fotos e os artigos publicados são da Essence.",
  },
  {
    q: "Quem escreve os artigos? Eu preciso aprovar?",
    a: "A OutBox planeja as pautas e produz os artigos sobre arquitetura e interiores. Se quiser revisar antes de publicar, é só pedir e combinamos o fluxo.",
  },
  {
    q: "Por que começar já?",
    a: "Porque cada artigo é uma página nova que o Google leva semanas para reconhecer. Quem começa antes chega antes na frente, e o site de brinde vale só para o fechamento desta proposta.",
  },
];
