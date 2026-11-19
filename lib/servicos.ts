/**
 * Conteúdo das páginas /servicos/<slug> (briefing de 18/11/2026, seção 05).
 * Um modelo para todas: problema, o que inclui e o que não inclui,
 * benefícios com limites, processo, responsabilidades do cliente, FAQ.
 *
 * PENDENTE DE REVISÃO DO FELIPE: escopos, inclusões e exclusões são uma
 * proposta editorial a partir do briefing. Nenhum preço, prazo fechado,
 * resultado ou depoimento foi inventado.
 */

import { CATALOGO } from "@/lib/catalogo";

export type Servico = {
  slug: string;
  titulo: string;
  apoio: string;
  problema: { titulo: string; texto: string; sintomas: string[] };
  inclui: string[];
  naoInclui: string[];
  beneficios: { titulo: string; texto: string };
  beneficiosLista: string[];
  limite: string;
  processo: { titulo: string; texto: string }[];
  cliente: string[];
  faq: { q: string; a: string }[];
  relacionados: string[];
  seo: { titulo: string; descricao: string };
};

export const SERVICOS: Servico[] = [
  {
    slug: "sites",
    titulo: "Seu site precisa explicar o seu valor e facilitar novos negócios.",
    apoio:
      "Site profissional com clareza, performance e experiência mobile: feito para o cliente entender o que você faz, confiar e entrar em contato.",
    problema: {
      titulo: "Um site bonito que não explica nada não vende.",
      texto: "O visitante decide em poucos segundos se fica. Se a página não deixa claro o que a empresa faz, para quem e qual é o próximo passo, ele volta para a busca.",
      sintomas: [
        "O site é lento no celular",
        "As pessoas chegam e perguntam o que já deveria estar escrito",
        "Ninguém entra em contato pelo site",
      ],
    },
    inclui: [
      "Estrutura de páginas e textos organizados a partir do briefing",
      "Design próprio, alinhado à identidade da marca",
      "Versão para celular pensada desde o começo",
      "SEO técnico de base: títulos, descrições, velocidade e dados estruturados",
      "Formulário e botões de contato ligados ao WhatsApp e ao e-mail",
      "Publicação e configuração do domínio",
    ],
    naoInclui: [
      "Produção de fotos e vídeos (o material é fornecido por você)",
      "Gestão de anúncios pagos",
      "Produção recorrente de conteúdo, que é o serviço de Gestão de Blog",
    ],
    beneficios: { titulo: "O que um site bem feito ajuda a fazer", texto: "Um site claro e rápido facilita a decisão de quem já chegou até você." },
    beneficiosLista: [
      "Apresentar a empresa com a mesma qualidade do que ela entrega",
      "Reduzir dúvidas repetidas no atendimento",
      "Dar um destino profissional para anúncios, perfis e indicações",
      "Servir de base para SEO e para conteúdo no futuro",
    ],
    limite: "Um site melhora a forma como a empresa se apresenta. Não garante posição no Google nem um número de contatos: isso depende do mercado, da concorrência e do que é feito depois da publicação.",
    processo: [
      { titulo: "Briefing", texto: "Entendemos o negócio, o público e o objetivo do site." },
      { titulo: "Estrutura e textos", texto: "Definimos as páginas e o que cada uma precisa dizer." },
      { titulo: "Design e desenvolvimento", texto: "Você acompanha por link e aprova o que já está de pé." },
      { titulo: "Publicação", texto: "Testes no celular e no computador, domínio configurado e site no ar." },
    ],
    cliente: [
      "Enviar textos, fotos, logo e informações da empresa",
      "Dar acesso ao domínio e às contas necessárias",
      "Revisar e aprovar cada etapa dentro do prazo combinado",
    ],
    faq: [
      { q: "Quanto tempo leva?", a: "Depende do tamanho do site. O ponto que mais define o prazo é a entrega do material: com tudo em mãos, o cronograma corre sem travas." },
      { q: "Eu consigo editar o site depois?", a: "Depende do escopo combinado. Quando o site tem blog, ele vem com painel para você publicar sozinho." },
      { q: "Vocês fazem hospedagem e manutenção?", a: "Sim, como serviço à parte, para o site seguir no ar com segurança e desempenho." },
    ],
    relacionados: ["sites-com-blog", "landing-pages", "identidade-visual"],
    seo: {
      titulo: "Criação de sites para empresas",
      descricao: "Site profissional com clareza, performance e experiência mobile, para explicar o valor da sua empresa e facilitar novos negócios.",
    },
  },
  {
    slug: "sites-com-blog",
    titulo: "Sua presença digital não precisa parar na publicação.",
    apoio: "Site e conteúdo útil conectados: o site apresenta a empresa, o blog responde as perguntas de quem ainda está pesquisando.",
    problema: {
      titulo: "De uma presença institucional a uma biblioteca de respostas.",
      texto: "Antes de chamar, o cliente pesquisa. Se o seu site não responde as dúvidas dele, outra empresa responde. O blog transforma essas perguntas em páginas que trabalham por você.",
      sintomas: [
        "O site está parado desde que foi publicado",
        "Os clientes chegam com dúvidas que se repetem",
        "A empresa não aparece quando alguém pesquisa o assunto",
      ],
    },
    inclui: [
      "Tudo do site profissional",
      "Blog integrado, com painel administrativo próprio para publicar",
      "Estrutura de categorias e links internos",
      "Artigos preparados para SEO e para leitura por ferramentas de IA",
      "Orientação para as primeiras pautas",
    ],
    naoInclui: [
      "Produção mensal de artigos, que é o serviço de Gestão de Blog",
      "Gestão de anúncios pagos",
      "Produção de fotos e vídeos",
    ],
    beneficios: { titulo: "Por que site e blog juntos", texto: "Estratégia, conteúdo útil e melhoria contínua, sem garantir posições." },
    beneficiosLista: [
      "Cada artigo é uma nova página que pode ser encontrada",
      "Conteúdo bem estruturado facilita a leitura por buscadores e por pesquisas com IA",
      "Respostas publicadas ajudam o cliente a chegar mais decidido",
      "Você publica quando quiser, sem depender de orçamento a cada post",
    ],
    limite: "Conteúdo útil e bem estruturado pode ampliar as oportunidades de descoberta, mas não existe posição garantida nem prazo exato para aparecer.",
    processo: [
      { titulo: "Briefing e pautas", texto: "Entendemos o negócio e as perguntas que o seu cliente faz." },
      { titulo: "Site e blog", texto: "Estrutura, design e desenvolvimento, com o painel de publicação." },
      { titulo: "Primeiros conteúdos", texto: "Organização das categorias e orientação das primeiras pautas." },
      { titulo: "Publicação e treinamento", texto: "Site no ar e você pronto para publicar sozinho." },
    ],
    cliente: [
      "Enviar o material da empresa",
      "Compartilhar as dúvidas mais comuns dos clientes",
      "Manter a publicação, sozinho ou com a Gestão de Blog",
    ],
    faq: [
      { q: "Preciso saber escrever para ter um blog?", a: "Não necessariamente. Você pode publicar sozinho pelo painel ou contratar a Gestão de Blog para a OutBox produzir os artigos." },
      { q: "O blog garante que eu apareça no Google?", a: "Não. Ele aumenta as páginas que podem ser encontradas e ajuda a responder o seu cliente, mas posição depende de concorrência, qualidade e tempo." },
      { q: "Posso começar só com o site e colocar o blog depois?", a: "Pode. Quando isso estiver no plano, o site já nasce preparado para receber o blog." },
    ],
    relacionados: ["gestao-de-blog", "sites", "google-empresas"],
    seo: {
      titulo: "Site com blog e painel de publicação",
      descricao: "Site profissional com blog integrado e painel próprio: a empresa apresentada e as dúvidas do cliente respondidas em páginas que trabalham por você.",
    },
  },
  {
    slug: "gestao-de-blog",
    titulo: "Transforme as dúvidas do cliente em conteúdo planejado, publicado e acompanhado.",
    apoio: "Publicar é só uma etapa. Gerir é criar consistência: pauta, pesquisa, revisão, publicação, links internos e análise.",
    problema: {
      titulo: "Blog sem gestão vira blog abandonado.",
      texto: "Começar é fácil. Difícil é manter o ritmo, escolher temas que importam e ligar cada artigo ao objetivo do negócio. Sem isso, o blog para no terceiro post.",
      sintomas: [
        "O último artigo foi publicado há meses",
        "Os temas são escolhidos no improviso",
        "Ninguém sabe se o conteúdo traz algum resultado",
      ],
    },
    inclui: [
      "Planejamento editorial com temas ligados ao seu negócio",
      "Pesquisa das perguntas que o seu cliente faz",
      "Produção e revisão dos artigos",
      "Publicação, com links internos entre os conteúdos",
      "Acompanhamento do desempenho e ajuste das pautas",
    ],
    naoInclui: [
      "Criação do site ou do blog, quando eles ainda não existem",
      "Gestão de redes sociais e de anúncios",
      "Produção de vídeos",
    ],
    beneficios: { titulo: "O que a gestão contínua traz", texto: "Consistência, foco nos temas certos e conteúdo conectado aos objetivos da empresa." },
    beneficiosLista: [
      "Ritmo de publicação que não depende da sua agenda",
      "Temas escolhidos pelo que o cliente pesquisa",
      "Conteúdo pensado para buscadores e para pesquisas com IA",
      "Uma biblioteca de respostas que cresce todo mês",
    ],
    limite: "A gestão melhora a consistência e a qualidade do conteúdo. Visibilidade e número de visitas dependem de concorrência, tema e tempo, e não são garantidos.",
    processo: [
      { titulo: "Diagnóstico do blog", texto: "O que já existe, o que funciona e o que falta." },
      { titulo: "Plano editorial", texto: "Temas, prioridades e ritmo de publicação." },
      { titulo: "Produção e publicação", texto: "Artigos escritos, revisados e publicados." },
      { titulo: "Acompanhamento", texto: "Leitura dos resultados e ajuste das próximas pautas." },
    ],
    cliente: [
      "Dar acesso ao painel do blog",
      "Validar temas sensíveis ou técnicos do seu negócio",
      "Compartilhar novidades, serviços e dúvidas que chegam no atendimento",
    ],
    faq: [
      { q: "Funciona com o blog que eu já tenho?", a: "Na maioria dos casos, sim. Avaliamos a plataforma atual no começo. Se ela travar o trabalho, mostramos as alternativas." },
      { q: "Quantos artigos por mês?", a: "O volume é definido na proposta, de acordo com o seu mercado e o objetivo. No Perfil da Empresa no Google, os planos já têm volumes fixos." },
      { q: "Quem escreve os artigos?", a: "A equipe da OutBox, a partir das informações do seu negócio. Temas técnicos passam pela sua validação." },
    ],
    relacionados: ["sites-com-blog", "google-empresas", "sites"],
    seo: {
      titulo: "Gestão de blog para empresas",
      descricao: "Planejamento editorial, produção, revisão, publicação e acompanhamento de artigos para manter o blog da sua empresa ativo e conectado ao negócio.",
    },
  },
  {
    slug: "landing-pages",
    titulo: "Uma página focada em uma oferta e em uma ação clara.",
    apoio: "Landing page para campanha, lançamento ou serviço específico: tudo na página leva a pessoa para um único próximo passo.",
    problema: {
      titulo: "Quando a página fala de tudo, a pessoa não faz nada.",
      texto: "Mandar o tráfego de um anúncio ou de um vídeo para a home do site dispersa a atenção. A landing page conta uma história só e termina em uma ação só.",
      sintomas: [
        "Os anúncios levam para uma página genérica",
        "A oferta não está explicada em lugar nenhum",
        "Não dá para saber de onde vieram os contatos",
      ],
    },
    inclui: [
      "Estrutura e texto voltados para uma única oferta",
      "Design próprio, alinhado à marca",
      "Versão para celular como prioridade",
      "Formulário ou botão de WhatsApp com identificação da origem",
      "Publicação e configuração",
    ],
    naoInclui: [
      "Gestão das campanhas de anúncios",
      "Produção de fotos e vídeos",
      "Integração com ferramentas que você ainda não usa, salvo proposta específica",
    ],
    beneficios: { titulo: "Para que serve uma landing page", texto: "Foco, clareza e medição de uma oferta específica." },
    beneficiosLista: [
      "Mensagem alinhada ao anúncio ou ao vídeo que trouxe a pessoa",
      "Um único objetivo, sem distrações",
      "Origem do contato registrada para medir a campanha",
      "Pode ser criada e testada sem mexer no site principal",
    ],
    limite: "A página organiza a oferta e facilita a ação. O resultado também depende da oferta, do público e do tráfego que chega até ela.",
    processo: [
      { titulo: "Oferta e público", texto: "O que está sendo oferecido, para quem e qual é a ação esperada." },
      { titulo: "Texto e estrutura", texto: "A história da página, do problema ao próximo passo." },
      { titulo: "Design e desenvolvimento", texto: "Página pronta para o celular, com acompanhamento por link." },
      { titulo: "Publicação", texto: "Testes, origem do contato configurada e página no ar." },
    ],
    cliente: [
      "Definir a oferta, as condições e o prazo",
      "Enviar o material de marca e as imagens",
      "Aprovar o texto antes da publicação",
    ],
    faq: [
      { q: "Qual é a diferença entre landing page e site?", a: "O site apresenta a empresa inteira. A landing page foca em uma oferta e em uma ação. Muitas empresas usam os dois." },
      { q: "Vocês fazem os anúncios?", a: "A landing page não inclui gestão de anúncios. Ela é o destino que prepara a campanha para converter melhor." },
      { q: "Dá para saber quantas pessoas vieram de cada vídeo?", a: "A página registra a origem informada no link (UTM) junto com cada contato. Medir visitas exige uma ferramenta de análise instalada." },
    ],
    relacionados: ["sites", "apresentacoes-comerciais", "identidade-visual"],
    seo: {
      titulo: "Criação de landing page",
      descricao: "Landing page focada em uma oferta e em uma ação clara, pronta para celular e com a origem de cada contato registrada.",
    },
  },
  {
    slug: "identidade-visual",
    titulo: "Sua marca precisa transmitir o valor que a sua empresa entrega.",
    apoio: "Identidade visual completa, posicionamento e regras de aplicação para a marca parecer do tamanho do que a empresa já é.",
    problema: {
      titulo: "Marca fraca puxa o preço para baixo.",
      texto: "Quando a marca parece amadora, o cliente compara pelo preço. Quando ela transmite cuidado e consistência, a conversa começa pelo valor.",
      sintomas: [
        "Cada material sai com uma cara diferente",
        "O logo não funciona em tamanho pequeno ou em fundo escuro",
        "A marca não acompanhou a evolução da empresa",
      ],
    },
    inclui: [
      "Estudo de posicionamento e de território de comunicação",
      "Logo e versões de uso",
      "Paleta de cores e tipografia",
      "Manual de marca com regras de aplicação",
      "Aplicações principais combinadas no escopo",
    ],
    naoInclui: [
      "Registro da marca no INPI",
      "Impressão e produção de materiais",
      "Gestão de redes sociais",
    ],
    beneficios: { titulo: "O que uma marca consistente faz pela empresa", texto: "Percepção de valor e coerência em todos os pontos de contato." },
    beneficiosLista: [
      "Presença coerente no site, nas redes e no material impresso",
      "Regras claras para qualquer fornecedor aplicar a marca",
      "Base para comunicar um posicionamento mais forte",
      "Menos retrabalho a cada nova peça",
    ],
    limite: "A identidade visual muda como a empresa é percebida. Ela trabalha junto com o atendimento, o produto e o preço, e não substitui nenhum deles.",
    processo: [
      { titulo: "Imersão", texto: "Negócio, público, concorrência e o que a marca precisa dizer." },
      { titulo: "Conceito", texto: "Posicionamento e direção visual." },
      { titulo: "Criação", texto: "Logo, cores, tipografia e aplicações." },
      { titulo: "Manual", texto: "Regras de uso entregues para a empresa e os fornecedores." },
    ],
    cliente: [
      "Participar da imersão inicial",
      "Dar feedback objetivo em cada rodada",
      "Aplicar o manual nos materiais da empresa",
    ],
    faq: [
      { q: "Vocês fazem só o logo?", a: "O foco é a identidade completa, porque o logo sozinho não garante consistência. Escopos menores podem ser avaliados." },
      { q: "Posso atualizar a marca sem perder o que já construí?", a: "Pode. Uma evolução de marca preserva os elementos reconhecidos e corrige o que limita a empresa." },
      { q: "Recebo os arquivos editáveis?", a: "Os arquivos finais e as versões de uso são entregues conforme o escopo combinado." },
    ],
    relacionados: ["apresentacoes-comerciais", "sites", "landing-pages"],
    seo: {
      titulo: "Criação de logo e identidade visual",
      descricao: "Criação de logo, identidade visual completa, posicionamento e manual de marca para a sua empresa transmitir o valor que entrega, em todos os pontos de contato.",
    },
  },
  {
    slug: "apresentacoes-comerciais",
    titulo: "Sua proposta comercial pode ser uma experiência por link, não um PDF estático.",
    apoio: "Apresentações de negócios em página web: abrem em qualquer celular ou computador e são atualizadas sem reenviar nada para o cliente.",
    problema: {
      titulo: "O PDF pesado trava a venda.",
      texto: "Arquivo grande que não abre no celular, versão desatualizada circulando e nenhuma liberdade de design. A apresentação por link resolve os três.",
      sintomas: [
        "O cliente reclama que o arquivo não abre",
        "Circulam versões antigas da proposta",
        "A apresentação não reflete a qualidade da empresa",
      ],
    },
    inclui: [
      "Roteiro da apresentação com narrativa de venda",
      "Design alinhado à marca",
      "Página web com endereço próprio",
      "Versão pensada para o celular",
      "Ajustes de conteúdo conforme o escopo",
    ],
    naoInclui: [
      "Produção de vídeos e fotos",
      "Treinamento de vendas",
      "Atualizações contínuas fora do escopo combinado",
    ],
    beneficios: { titulo: "Por que uma apresentação por link", texto: "Liberdade de design, atualização em tempo real e controle da narrativa." },
    beneficiosLista: [
      "Abre em qualquer dispositivo, sem baixar nada",
      "Atualização no mesmo link, sem reenviar",
      "Vídeo, interação e layout livre",
      "Visual alinhado à marca",
    ],
    limite: "A apresentação melhora a forma como a proposta é recebida. O fechamento continua dependendo da oferta, do preço e da conversa comercial.",
    processo: [
      { titulo: "Briefing", texto: "Objetivo, público e a mensagem central." },
      { titulo: "Roteiro", texto: "A sequência que leva o cliente até a decisão." },
      { titulo: "Design e desenvolvimento", texto: "Página web com acompanhamento por link." },
      { titulo: "Publicação", texto: "Link pronto para enviar e apresentar." },
    ],
    cliente: [
      "Enviar o conteúdo da proposta e os números que podem ser mostrados",
      "Aprovar o roteiro",
      "Informar o que pode ser público e o que é confidencial",
    ],
    faq: [
      { q: "Funciona para apresentar em evento ou palco?", a: "Funciona. A apresentação pode ser preparada para telão, computador e celular." },
      { q: "Consigo atualizar sozinho?", a: "Depende do escopo. As atualizações podem ser feitas pela OutBox ou previstas em um painel." },
      { q: "O cliente precisa instalar alguma coisa?", a: "Não. É um link que abre no navegador." },
    ],
    relacionados: ["identidade-visual", "landing-pages", "sites"],
    seo: {
      titulo: "Apresentação comercial por link",
      descricao: "Apresentações de negócios em página web, que abrem em qualquer dispositivo e são atualizadas no mesmo link, sem reenviar PDF.",
    },
  },
  {
    slug: "sistemas-personalizados",
    titulo: "Sua operação não precisa depender de planilhas desconectadas e retrabalho.",
    apoio: "O software precisa se adaptar à sua operação. Entendemos os processos antes de propor o desenvolvimento.",
    problema: {
      titulo: "Planilha demais vira gargalo.",
      texto: "Dados espalhados, informação repetida em vários lugares e ninguém com a visão do todo. A operação cresce, mas o controle não acompanha.",
      sintomas: [
        "A mesma informação é digitada em vários lugares",
        "Os relatórios dependem de uma pessoa",
        "Não há controle de quem acessa o quê",
      ],
    },
    inclui: [
      "Levantamento dos processos e das regras do negócio",
      "Desenho das telas e dos fluxos",
      "Desenvolvimento com controle de acesso por usuário",
      "Painéis e relatórios combinados no escopo",
      "Automações e integrações avaliadas caso a caso",
      "Publicação e acompanhamento inicial",
    ],
    naoInclui: [
      "Integrações com sistemas que não oferecem acesso, salvo avaliação técnica",
      "Migração de dados fora do escopo combinado",
      "Suporte contínuo, que é contratado à parte",
    ],
    beneficios: { titulo: "O que um sistema sob medida resolve", texto: "Menos retrabalho, mais controle e decisões com dado na mão." },
    beneficiosLista: [
      "Informação em um lugar só",
      "Permissões por nível de usuário",
      "Relatórios sem montar planilha",
      "Processos que seguem a regra da sua empresa",
    ],
    limite: "Um sistema organiza a operação que existe. Processos que ainda não estão definidos precisam ser definidos antes, e isso faz parte do levantamento.",
    processo: [
      { titulo: "Levantamento", texto: "Como a operação funciona hoje e onde estão os gargalos." },
      { titulo: "Desenho", texto: "Telas, fluxos e prioridades da primeira versão." },
      { titulo: "Desenvolvimento", texto: "Entregas por etapa, acompanhadas por link." },
      { titulo: "Implantação", texto: "Publicação, treinamento e ajustes do começo." },
    ],
    cliente: [
      "Indicar quem conhece cada processo",
      "Validar as regras do negócio",
      "Testar as entregas e dar retorno no prazo",
    ],
    faq: [
      { q: "Por que não usar um sistema pronto?", a: "Às vezes um sistema pronto resolve, e nesse caso dizemos isso. O sob medida faz sentido quando a operação tem regras que os prontos não cobrem." },
      { q: "Quanto custa?", a: "Depende do escopo. O valor sai da proposta, depois do levantamento." },
      { q: "O sistema funciona no celular?", a: "Sim. As telas são pensadas para o computador e para o celular, conforme o uso de cada uma." },
    ],
    relacionados: ["micro-saas", "gestao-ecommerce", "sites"],
    seo: {
      titulo: "Desenvolvimento de sistemas para empresas",
      descricao: "Sistemas de gestão sob medida para tirar a operação das planilhas: processos mapeados, controle de acesso, painéis, relatórios e automações.",
    },
  },
  {
    slug: "micro-saas",
    titulo: "Transforme um problema recorrente validado em um software com proposta clara.",
    apoio: "Uma ideia só vira produto quando resolve um problema real. Da validação à primeira versão, com escopo definido.",
    problema: {
      titulo: "Ideia boa não basta.",
      texto: "Muita gente desenvolve antes de validar e descobre tarde que o problema não era tão importante para quem paga. Um Micro SaaS começa pelo problema, não pela tela.",
      sintomas: [
        "Você resolve o mesmo problema para vários clientes, à mão",
        "Existe uma ideia de software, mas nenhum teste com usuários",
        "O escopo da ideia não para de crescer",
      ],
    },
    inclui: [
      "Definição do problema e do público",
      "Escopo da primeira versão, enxuto",
      "Desenho e desenvolvimento do software",
      "Login, planos e área do cliente conforme o escopo",
      "Publicação da primeira versão e aprendizado com os primeiros usuários",
    ],
    naoInclui: [
      "Garantia de vendas ou de assinantes",
      "Marketing e aquisição de clientes",
      "Evoluções fora do escopo da primeira versão, salvo proposta específica",
    ],
    beneficios: { titulo: "Por que começar pequeno", texto: "Escopo definido, foco em uma necessidade recorrente e aprendizado com usuários." },
    beneficiosLista: [
      "Primeira versão no ar mais cedo",
      "Decisões baseadas no uso real",
      "Investimento proporcional ao que já foi validado",
      "Base técnica para crescer depois",
    ],
    limite: "A OutBox desenvolve o produto. Mercado, preço e venda são decisões do dono do produto, e não existe garantia de receita.",
    processo: [
      { titulo: "Problema", texto: "Quem tem a dor, com que frequência e quanto ela custa." },
      { titulo: "Escopo", texto: "O mínimo que resolve o problema de verdade." },
      { titulo: "Desenvolvimento", texto: "Primeira versão em etapas acompanhadas." },
      { titulo: "Lançamento e aprendizado", texto: "Primeiros usuários e ajustes a partir do uso." },
    ],
    cliente: [
      "Trazer o conhecimento do problema e do público",
      "Participar das decisões de escopo",
      "Conduzir a venda e o relacionamento com os usuários",
    ],
    faq: [
      { q: "O que é um Micro SaaS?", a: "Um software por assinatura, focado em um problema específico de um público específico." },
      { q: "Preciso ter clientes antes de começar?", a: "Não é obrigatório, mas ter pessoas com o problema para testar a primeira versão faz muita diferença." },
      { q: "Quem fica com o código?", a: "As condições de propriedade são definidas no contrato." },
    ],
    relacionados: ["sistemas-personalizados", "landing-pages", "sites"],
    seo: {
      titulo: "Desenvolvimento de Micro SaaS",
      descricao: "Da validação à primeira versão: desenvolvimento de Micro SaaS com escopo definido, focado em um problema recorrente e no aprendizado com usuários.",
    },
  },
  {
    slug: "gestao-ecommerce",
    titulo: "Uma loja virtual precisa de gestão, não apenas de uma vitrine.",
    apoio: "Catálogo, navegação, experiência de compra, estoque e indicadores acompanhados, respeitando a plataforma e o escopo contratado.",
    problema: {
      titulo: "Loja virtual não é apenas catálogo.",
      texto: "Colocar a loja no ar é o começo. O que faz ela vender é a gestão do dia a dia: produtos bem cadastrados, compra sem atrito e números acompanhados.",
      sintomas: [
        "Produtos com cadastro incompleto ou desatualizado",
        "Muita visita e pouca compra",
        "Ninguém olha os indicadores da loja",
      ],
    },
    inclui: [
      "Organização do catálogo e dos cadastros",
      "Revisão da navegação e da experiência de compra",
      "Acompanhamento de estoque e de indicadores combinados",
      "Identificação de oportunidades de conversão",
      "Relatório periódico de acompanhamento",
    ],
    naoInclui: [
      "Atendimento ao cliente final e logística",
      "Gestão de anúncios pagos, salvo proposta específica",
      "Troca de plataforma, que é avaliada como projeto à parte",
    ],
    beneficios: { titulo: "O que a gestão contínua traz", texto: "Uma loja cuidada todo mês, com decisões apoiadas em números." },
    beneficiosLista: [
      "Catálogo organizado e confiável",
      "Menos atrito no caminho até a compra",
      "Indicadores acompanhados com regularidade",
      "Prioridades claras para cada mês",
    ],
    limite: "A gestão melhora a operação da loja. Vendas também dependem de preço, estoque, demanda e investimento em tráfego.",
    processo: [
      { titulo: "Diagnóstico da loja", texto: "Plataforma, catálogo, jornada de compra e números atuais." },
      { titulo: "Plano de ação", texto: "Prioridades e rotina de acompanhamento." },
      { titulo: "Gestão contínua", texto: "Execução mensal dentro do escopo." },
      { titulo: "Relatório", texto: "Leitura dos indicadores e próximos passos." },
    ],
    cliente: [
      "Dar acesso à plataforma e aos relatórios",
      "Manter preços, estoque e políticas atualizados",
      "Cuidar do atendimento e da entrega",
    ],
    faq: [
      { q: "Funciona com qualquer plataforma?", a: "Avaliamos a sua plataforma no diagnóstico. O escopo respeita o que ela permite." },
      { q: "Vocês criam a loja do zero?", a: "A criação pode ser avaliada como projeto. A gestão parte de uma loja que já está no ar." },
      { q: "Há meta de faturamento?", a: "Não prometemos faturamento. Definimos indicadores para acompanhar e melhorar." },
    ],
    relacionados: ["gestao-marketplaces", "landing-pages", "sistemas-personalizados"],
    seo: {
      titulo: "Gestão de e-commerce",
      descricao: "Gestão de loja virtual: catálogo, navegação, experiência de compra, estoque e indicadores acompanhados, respeitando a sua plataforma.",
    },
  },
  {
    slug: "gestao-marketplaces",
    titulo: "Vendas em marketplaces exigem operação, margem e acompanhamento.",
    apoio: "Faturamento sem margem não basta. Acompanhamento de anúncios, custos, logística, reputação, estoque e desempenho comercial.",
    problema: {
      titulo: "Vender muito não é o mesmo que ganhar dinheiro.",
      texto: "Taxas, frete, devoluções e anúncios desorganizados corroem a margem. Sem acompanhamento, a operação cresce e o lucro some.",
      sintomas: [
        "Você não sabe a margem real de cada produto",
        "Os anúncios estão incompletos ou desatualizados",
        "A reputação da conta oscila sem explicação",
      ],
    },
    inclui: [
      "Organização e revisão dos anúncios",
      "Acompanhamento de custos, taxas e margem",
      "Monitoramento de reputação e de estoque",
      "Leitura do desempenho comercial",
      "Relatório periódico com prioridades",
    ],
    naoInclui: [
      "Logística, embalagem e envio",
      "Atendimento ao comprador",
      "Gestão de anúncios pagos dentro dos marketplaces, salvo proposta específica",
    ],
    beneficios: { titulo: "O que o acompanhamento traz", texto: "Decisões mais eficientes, com margem e reputação no centro." },
    beneficiosLista: [
      "Visão da margem por produto",
      "Anúncios completos e organizados",
      "Reputação monitorada",
      "Prioridades mensais claras",
    ],
    limite: "O acompanhamento apoia as decisões da operação. Regras, taxas e algoritmos dos marketplaces mudam e fogem do controle de qualquer gestão.",
    processo: [
      { titulo: "Diagnóstico das contas", texto: "Anúncios, custos, reputação e números atuais." },
      { titulo: "Plano de ação", texto: "O que corrigir primeiro e a rotina de acompanhamento." },
      { titulo: "Gestão contínua", texto: "Execução mensal dentro do escopo." },
      { titulo: "Relatório", texto: "Margem, desempenho e próximos passos." },
    ],
    cliente: [
      "Dar acesso às contas dos marketplaces",
      "Informar custos, prazos e políticas da operação",
      "Cuidar da logística e do atendimento",
    ],
    faq: [
      { q: "Quais marketplaces?", a: "Os principais do mercado brasileiro são avaliados no diagnóstico, de acordo com onde a sua empresa já vende ou quer vender." },
      { q: "Vocês fazem o envio dos produtos?", a: "Não. A logística continua com a sua empresa." },
      { q: "Vocês garantem mais vendas?", a: "Não. O foco é operação, margem e acompanhamento para decisões mais eficientes." },
    ],
    relacionados: ["gestao-ecommerce", "sistemas-personalizados", "landing-pages"],
    seo: {
      titulo: "Gestão de marketplaces",
      descricao: "Acompanhamento de anúncios, custos, margem, logística, reputação e desempenho para a sua operação em marketplaces.",
    },
  },
];

export function servicoPorSlug(slug: string) {
  return SERVICOS.find((s) => s.slug === slug);
}

export function nomeServico(slug: string) {
  return CATALOGO.find((c) => c.slug === slug)?.nome ?? slug;
}
