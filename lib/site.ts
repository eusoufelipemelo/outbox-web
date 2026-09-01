/**
 * Configuração central do site OutBox Group.
 * Todo dado de contato e link externo vive aqui.
 */

export const SITE = {
  name: "OutBox Group",
  url: "https://www.outboxgroup.com.br",
  description:
    "Especialistas em sistemas personalizados, sites de alta performance com SEO e GEO, branding e apresentações de negócios. Entregamos rápido, sem abrir mão do acabamento.",
  email: "felipe@outboxgroup.com.br",

  /** WhatsApp: (47) 9.9659-7775 */
  phoneDisplay: "(47) 9.9659-7775",
  phoneE164: "+5547996597775",
  whatsappNumber: "5547996597775",

  instagramBrand: "https://instagram.com/otbxgroup",
  instagramBrandHandle: "@otbxgroup",
  instagramPersonal: "https://instagram.com/eusoufelipemelo",
  instagramPersonalHandle: "@eusoufelipemelo",

  city: "Balneário Camboriú, SC",
} as const;

/** Mensagem que já vai escrita quando o lead abre o WhatsApp. */
export function whatsappLink(context?: string) {
  const base =
    "Olá, Felipe! Vim pelo site da OutBox e quero tirar meu projeto do papel.";
  const msg = context ? `${base}\n\nTenho interesse em: ${context}` : base;
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

/** Os quatro serviços que a OutBox vende hoje. */
export const SERVICES = [
  {
    slug: "sistemas",
    number: "01",
    name: "Sistemas Personalizados",
    tagline: "O software que a sua operação pede",
    description:
      "Sua empresa não cabe em uma planilha nem em um sistema genérico. Desenvolvemos a plataforma sob medida para o seu processo: painéis, cadastros, permissões por usuário, relatórios e automações que eliminam trabalho manual.",
    bullets: [
      "Painéis e dashboards em tempo real",
      "Controle de acesso por nível de usuário",
      "Automação de processos e relatórios",
      "Integrações com o que você já usa",
    ],
    outcome: "Menos retrabalho, mais controle e decisões com dado na mão.",
  },
  {
    slug: "sites",
    number: "02",
    name: "Sites com Performance, SEO, GEO e Blog",
    tagline: "Encontrado no Google e recomendado pelas IAs",
    description:
      "Site rápido, bonito e construído para ser achado. Otimizamos para SEO, que coloca você no Google, e para GEO, a camada nova que faz a sua marca ser lida e recomendada pelo ChatGPT, Gemini e demais inteligências artificiais. Com blog e painel administrativo próprio para você publicar sozinho.",
    bullets: [
      "Carregamento rápido e nota alta de performance",
      "SEO técnico e conteúdo estruturado",
      "GEO: presença nas respostas das IAs",
      "Blog com painel administrativo personalizado",
    ],
    outcome: "Mais visitantes qualificados chegando sem depender só de anúncio.",
  },
  {
    slug: "branding",
    number: "03",
    name: "Branding",
    tagline: "Uma marca que sustenta o seu preço",
    description:
      "Marca não é só o logo: é o que fica na cabeça do cliente antes de ele pedir orçamento. Construímos identidade visual completa, posicionamento e as regras de aplicação para a sua marca parecer grande em qualquer lugar que apareça.",
    bullets: [
      "Identidade visual e sistema de marca",
      "Posicionamento e território de comunicação",
      "Manual de marca com regras de uso",
      "Aplicações para social, apresentação e impresso",
    ],
    outcome: "Percepção de valor maior e menos briga por preço.",
  },
  {
    slug: "apresentacoes",
    number: "04",
    name: "Apresentações de Negócios via Link",
    tagline: "Sua proposta vira uma experiência, não um PDF",
    description:
      "Troque o arquivo pesado por um link. Apresentações de negócios em página web, abrindo em qualquer celular ou computador, que você atualiza em tempo real sem reenviar nada para o cliente. Mais liberdade de design e o controle da narrativa na sua mão.",
    bullets: [
      "Abre em qualquer dispositivo, sem baixar nada",
      "Atualização em tempo real pelo mesmo link",
      "Liberdade total de layout, vídeo e interação",
      "Visual alinhado à sua marca",
    ],
    outcome: "Uma apresentação que impressiona e fecha mais negócio.",
  },
] as const;

export type Service = (typeof SERVICES)[number];

/** Opções do campo "tipo de serviço" no formulário. */
export const SERVICE_OPTIONS = [
  "Sistemas Personalizados",
  "Site com Performance, SEO, GEO e Blog",
  "Branding",
  "Apresentação de Negócios via Link",
  "Mais de um serviço / não sei ainda",
] as const;

/** Etapas do processo de trabalho. */
export const PROCESS = [
  {
    step: "01",
    title: "Briefing e estratégia",
    text: "Entendemos seu negócio, seu cliente e o objetivo do projeto. Você recebe um roteiro claro do que será feito, sem promessa vaga.",
  },
  {
    step: "02",
    title: "Você entrega o material",
    text: "Textos, fotos, logo e informações. Este é o ponto que define a velocidade: com o material completo em mãos, o cronograma corre sem travas.",
  },
  {
    step: "03",
    title: "Criação e desenvolvimento",
    text: "Design e código acontecem juntos. Você acompanha por link e responde em cima do que já está de pé, não de um rascunho no papel.",
  },
  {
    step: "04",
    title: "Ajustes e publicação",
    text: "Refinamos os detalhes, testamos em todos os dispositivos e publicamos. Depois, seguimos por perto para o que vier.",
  },
] as const;

/** Comparativo: como a maioria trabalha x como a OutBox trabalha. */
export const COMPARISON = {
  others: [
    "Template repetido que você já viu em outro lugar",
    "Site bonito que ninguém encontra no Google",
    "Invisível para o ChatGPT e para as IAs",
    "Cada post novo depende de um orçamento",
    "Prazo indefinido, resposta a conta-gotas",
    "Proposta em PDF pesado e desatualizado",
  ],
  outbox: [
    "Projeto desenhado do zero para a sua marca",
    "Construído para performance e SEO desde a base",
    "Otimizado com GEO para as IAs te indicarem",
    "Painel próprio: você publica quando quiser",
    "Material na mão, prazo curto e combinado",
    "Apresentação em link, atualizada em tempo real",
  ],
} as const;

/** Depoimentos reais de clientes. */
export const TESTIMONIALS = [
  {
    quote:
      "Trabalhar com essa equipe foi como ter uma arma secreta. Eles pegaram nossas ideias dispersas e as transformaram em uma estratégia que grita 'uau!'. Nossos clientes não param de elogiar!",
    name: "Jônas Pastore",
    role: "Fundador, Casa46 e Escola de Planejados",
    avatar: "/img/av-jonas.png",
  },
  {
    quote:
      "Finalmente, uma agência que fala a nossa língua! Eles entenderam a nossa visão melhor do que nós e a concretizaram de uma forma que superou as expectativas. Recomendo 10/10!",
    name: "Nicoli Cercal Ferreira",
    role: "Head, Escola de Planejados",
    avatar: "/img/av-nicoli.png",
  },
  {
    quote:
      "Entrei com grandes expectativas, e eles me surpreenderam completamente. Da estratégia à execução, cada detalhe foi impecável. Estou dizendo a todos que conheço: contratem eles!",
    name: "Patrícia Fontanive",
    role: "Founder e Diretora Criativa, Couros do Valleh",
    avatar: "/img/av-patricia.png",
  },
  {
    quote:
      "Nossa marca passou de um sussurro a um rugido. A criatividade e a expertise da equipe fizeram toda a diferença. Estamos sendo notados como nunca antes!",
    name: "Dr. Fabrício Sanches",
    role: "Médico Pneumologista",
    avatar: "/img/av-fabricio.png",
  },
  {
    quote:
      "Eles nos fizeram sentir como se fôssemos o cliente mais importante deles. A atenção aos detalhes, as respostas rápidas e as ideias inovadoras foram de primeira.",
    name: "Dr. Alexandre Paz",
    role: "Médico Pediatra, Clínica Paz Pediatria",
    avatar: "/img/av-alexandre.png",
  },
  {
    quote:
      "Nossa presença online passou do zero a um sucesso num piscar de olhos. A equipe tornou o processo tão fluido que quase me esqueci que estava trabalhando em um projeto grande!",
    name: "Dra. Michelle Sanches",
    role: "Médica Cardiopediatra",
    avatar: "/img/av-michelle.png",
  },
] as const;

/** Perguntas frequentes. */
export const FAQ = [
  {
    q: "Qual é o prazo de entrega?",
    a: "Depende do escopo, mas o nosso diferencial é a velocidade: assim que todo o material é entregue (textos, fotos, logo e informações), o projeto corre sem travas. Sites costumam sair em poucas semanas e apresentações em poucos dias. O cronograma é combinado antes de começar.",
  },
  {
    q: "O que é GEO e por que isso importa agora?",
    a: "GEO é a otimização para os motores generativos, ou seja, para as inteligências artificiais. Hoje muita gente não pesquisa mais só no Google: pergunta ao ChatGPT, ao Gemini ou à Meta AI. Sites em estrutura antiga não são lidos por essas ferramentas e ficam de fora da recomendação. Construímos para os dois mundos: buscas tradicionais e respostas de IA.",
  },
  {
    q: "Eu consigo publicar no blog sozinho?",
    a: "Sim. Todo site que fazemos com blog vem com um painel administrativo personalizado, feito na identidade da sua marca. Você entra, escreve, sobe as imagens e publica. O post aparece no site na hora, sem depender da gente.",
  },
  {
    q: "Vocês atendem empresas de fora de Balneário Camboriú?",
    a: "Atendemos o Brasil inteiro. Todo o processo funciona por videochamada, WhatsApp e link de acompanhamento, então a distância não muda a qualidade nem o prazo.",
  },
  {
    q: "Como funciona a apresentação de negócios via link?",
    a: "Em vez de um PDF pesado, sua apresentação vira uma página web com endereço próprio. Abre em qualquer celular ou computador, sem baixar nada, e você pode atualizar o conteúdo a qualquer momento sem precisar reenviar o arquivo para o cliente.",
  },
  {
    q: "E depois que o projeto vai ao ar?",
    a: "Continuamos por perto. Oferecemos hospedagem, manutenção e suporte para o seu projeto seguir no ar com segurança e desempenho. Você não fica sozinho depois da entrega.",
  },
] as const;
