/* Conteúdo da proposta. Texto vive aqui para ser editado sem tocar em componente.
   Regra dura desta peça: nenhum número de mercado inventado. Onde há número, ou
   ele é fato estrutural observável (o mapa mostra três fichas), ou sai da conta
   que o próprio cliente faz no simulador. */

import { SITE, whatsappLink } from "@/lib/site";

export const AGENCIA = {
  nome: SITE.name,
  site: SITE.url,
  siteRotulo: "outboxgroup.com.br",
  whats: whatsappLink("Perfil da Empresa no Google"),
  whatsSite: whatsappLink("Site novo com SEO e GEO"),
  whatsRotulo: SITE.phoneDisplay,
  email: SITE.email,
  instagram: SITE.instagramBrandHandle,
};

export const CAPA = {
  selo: "Proposta em aberto",
  titulo: "Seu cliente já procurou pelo seu serviço hoje.",
  destaque: "Ele só não encontrou você.",
  linha:
    "A busca mudou duas vezes nos últimos anos: primeiro para o mapa do Google, agora para as respostas de inteligência artificial. Quem não está estruturado nas duas fica de fora das duas.",
  cta: "Ver o que está em jogo",
};

/* o que aparece na janela do hero, alternando */
export const BUSCA_DEMO = {
  termo: "melhor [seu serviço] perto de mim",
  google: [
    { nome: "Concorrente A", nota: "4,8", avaliacoes: "212 avaliações", tag: "Aberto agora" },
    { nome: "Concorrente B", nota: "4,6", avaliacoes: "158 avaliações", tag: "Aberto agora" },
    { nome: "Concorrente C", nota: "4,5", avaliacoes: "97 avaliações", tag: "Fecha às 18h" },
  ],
  ia: {
    pergunta: "Qual a melhor empresa de [seu serviço] aqui na região?",
    resposta:
      "Pelas informações públicas mais recentes, três empresas se destacam na sua região:",
    citadas: ["Concorrente A", "Concorrente B", "Concorrente C"],
    rodape: "Fontes: perfis do Google, sites das empresas e avaliações recentes.",
  },
  ausente: "Sua empresa",
};

export const DUAS_BUSCAS = {
  titulo: "Duas buscas. O mesmo cliente.",
  linha:
    "Ele não mudou de necessidade, mudou de porta de entrada. Hoje entra pelas duas, e decide na primeira que responde bem.",
  blocos: [
    {
      id: "google",
      rotulo: "Busca no Google",
      titulo: "O mapa decide antes do site",
      texto:
        "Quando alguém procura um serviço local, o Google mostra primeiro o bloco do mapa. São três fichas visíveis. Para ver a quarta é preciso clicar em mais uma vez, e quase ninguém clica.",
      pontos: [
        "Três posições visíveis, e só",
        "Nota, número de avaliações e horário aparecem antes do nome",
        "Sem ficha ativa, você não disputa essa tela",
      ],
    },
    {
      id: "ia",
      rotulo: "Busca em inteligência artificial",
      titulo: "A IA responde citando fontes",
      texto:
        "Quando a pergunta vai para uma IA, ela não devolve dez links. Devolve uma resposta curta com poucos nomes e diz de onde tirou. Se a sua empresa não tem informação pública consistente, ela não entra na lista.",
      pontos: [
        "Poucos nomes citados, não uma página de resultados",
        "A IA cruza site, ficha do Google e avaliações",
        "Informação desencontrada derruba a citação",
      ],
    },
  ],
};

export const DIAGNOSTICO = {
  titulo: "Onde a sua empresa está agora",
  linha: "Três situações, três urgências diferentes. Provavelmente uma delas é a sua.",
  casos: [
    {
      nivel: "critico",
      etiqueta: "Situação crítica",
      titulo: "Sem site e sem ficha no Google",
      texto:
        "Para o Google e para as IAs a sua empresa é um espaço em branco. Quem procura pelo seu serviço encontra apenas os concorrentes, e a decisão acontece sem você estar na mesa.",
      acao: "Precisa dos dois, e começa hoje",
    },
    {
      nivel: "atencao",
      etiqueta: "Perdendo terreno",
      titulo: "Tem ficha no Google, mas parada",
      texto:
        "Ficha criada e abandonada envelhece rápido. Post some em cerca de sete dias, pergunta sem resposta fica pública, avaliação negativa sem réplica vira a primeira coisa que o cliente lê.",
      acao: "Precisa de manutenção mensal",
    },
    {
      nivel: "atencao",
      etiqueta: "Tecnologia vencida",
      titulo: "Tem site, mas da geração anterior",
      texto:
        "Site feito para ser bonito não é a mesma coisa que site feito para ser lido por máquina. Sem estrutura de dados, a IA não consegue extrair o que você faz, onde atende e por quanto.",
      acao: "Precisa ser reconstruído",
    },
  ],
};

export const FATORES = {
  titulo: "O que o Google olha para escolher quem aparece",
  linha:
    "O próprio Google publica os três critérios do resultado local. Nenhum deles se resolve sozinho.",
  itens: [
    {
      nome: "Relevância",
      controla: true,
      texto:
        "O quanto a sua ficha responde exatamente ao que foi procurado. Categoria certa, serviços descritos, atributos preenchidos.",
    },
    {
      nome: "Distância",
      controla: false,
      texto:
        "A que distância você está de quem procurou. É o endereço, e não muda. Por isso o jogo se decide nos outros dois.",
    },
    {
      nome: "Destaque",
      controla: true,
      texto:
        "O quanto a sua empresa é conhecida dentro e fora da internet. Avaliações, respostas, presença no site e menções contam aqui.",
    },
  ],
  fecho: "Dois dos três dependem de trabalho, não de sorte. É exatamente onde a gente entra.",
  nota: "Fonte: critérios de classificação local publicados pelo próprio Google. O Google não divulga o peso de cada um, então aqui não há porcentagem inventada.",
};

export const GEO = {
  selo: "A parte que quase ninguém está fazendo",
  titulo: "SEO faz o Google achar. GEO faz a IA citar.",
  linha:
    "São dois trabalhos diferentes sobre o mesmo negócio. Um prepara a sua empresa para ser encontrada numa lista de links. O outro prepara para ser citada dentro de uma resposta.",
  colunas: [
    {
      sigla: "SEO",
      nome: "Otimização para buscadores",
      pergunta: "Como o Google te encontra",
      itens: [
        "Palavras que o cliente realmente digita",
        "Velocidade e leitura no celular",
        "Endereço, horário e telefone conferindo em todo lugar",
        "Páginas por serviço e por cidade atendida",
      ],
    },
    {
      sigla: "GEO",
      nome: "Otimização para IAs generativas",
      pergunta: "Como a IA entende e te cita",
      itens: [
        "Dados estruturados que a máquina lê sem adivinhar",
        "Respostas diretas às perguntas que o cliente faz",
        "Informação idêntica no site, na ficha e nas avaliações",
        "Conteúdo que a IA consegue resumir sem distorcer",
      ],
    },
  ],
  fecho:
    "Fazer só o primeiro é chegar bem preparado para a busca de ontem. Na OutBox os dois saem juntos, porque hoje a mesma pessoa usa os dois caminhos no mesmo dia.",
};

export const SITE_IA = {
  titulo: "O site novo não é o mesmo site mais bonito",
  linha:
    "Construímos com apoio de inteligência artificial no processo inteiro, da arquitetura ao texto. Isso muda o que sai do outro lado.",
  /* o painel mostra, em português, o que fica legível para a máquina quando o
     site é construído assim. É o argumento do GEO em forma visual. */
  painel: {
    titulo: "O que a máquina consegue ler",
    linhas: [
      { campo: "Tipo de negócio", valor: "declarado" },
      { campo: "Serviços prestados", valor: "um a um" },
      { campo: "Cidades atendidas", valor: "listadas" },
      { campo: "Horário de atendimento", valor: "estruturado" },
      { campo: "Telefone e WhatsApp", valor: "verificáveis" },
      { campo: "Avaliações", valor: "conectadas" },
    ],
    rodape: "Um site comum entrega isso como texto solto. A IA precisa adivinhar, e quando adivinha, erra ou pula.",
  },
  itens: [
    {
      icone: "codigo",
      titulo: "Estruturado para ser lido por máquina",
      texto:
        "Marcação de dados em cada página: que negócio é, onde atende, que serviços presta, qual horário. É isso que a IA lê antes de citar alguém.",
    },
    {
      icone: "raio",
      titulo: "Rápido de verdade, não rápido no papel",
      texto:
        "Página leve, sem construtor pesado por trás. Carregamento medido no celular, que é onde o seu cliente está.",
    },
    {
      icone: "camadas",
      titulo: "Uma página por serviço",
      texto:
        "Em vez de uma página só falando de tudo, cada serviço ganha a sua, com a pergunta que o cliente faz e a resposta que ele procura.",
    },
    {
      icone: "conversa",
      titulo: "Texto escrito para responder",
      texto:
        "Conteúdo em formato de pergunta e resposta, do jeito que a busca por voz e a IA consomem. Sem encher linguiça para parecer grande.",
    },
    {
      icone: "elo",
      titulo: "Ligado à sua ficha do Google",
      texto:
        "Site e perfil apontando um para o outro, com a mesma informação. Divergência entre os dois derruba a confiança dos dois.",
    },
    {
      icone: "medir",
      titulo: "Pronto para medir",
      texto:
        "Você passa a saber quantas pessoas ligaram, pediram rota ou chamaram no WhatsApp. Sem medição não existe decisão.",
    },
  ],
};

/* O blog fecha o raciocínio da página: o site é a obra, o blog é a operação,
   exatamente como implantação e manutenção no perfil do Google. Sem número de
   tráfego inventado: o argumento é o mecanismo, que é verificável. */
export const BLOG = {
  selo: "A operação do site",
  titulo: "Site parado envelhece igual ficha parada.",
  linha:
    "O site novo entra no ar respondendo o que você faz. Só que o cliente pergunta muito mais do que isso, e cada pergunta que você não responde é uma porta que o concorrente abre.",
  perguntas: [
    "quanto custa [seu serviço]",
    "qual a diferença entre [opção A] e [opção B]",
    "como escolher [seu serviço] na minha cidade",
    "vale a pena [seu serviço]",
    "quanto tempo demora [seu serviço]",
  ],
  legenda: "Cada uma dessas perguntas é um artigo. Cada artigo é uma porta de entrada nova.",
  motores: [
    {
      sigla: "No Google",
      texto:
        "Página de serviço disputa um punhado de termos. Artigo disputa as perguntas inteiras, que é como as pessoas realmente escrevem na busca. Mais páginas boas no ar, mais chances de aparecer.",
    },
    {
      sigla: "Nas IAs",
      texto:
        "A IA cita quem responde direto e com clareza. Um artigo que resolve a dúvida em texto organizado é exatamente o material que ela consegue resumir e atribuir a você.",
    },
  ],
  fecho:
    "É o mesmo princípio da manutenção do perfil no Google, aplicado ao site: constância vale mais que tamanho. Você escreve, ou a OutBox escreve por você.",
};

export const SIMULADOR = {
  selo: "Faça a conta com os seus números",
  titulo: "Quanto vale um cliente novo por semana",
  linha:
    "Não vamos prometer volume de contato. Vamos fazer a conta ao contrário: com o seu ticket e a sua taxa de fechamento, quantos clientes o serviço precisa trazer para se pagar.",
  aviso:
    "Simulação com os números que você digitou. Serve para dimensionar a decisão, não é promessa de resultado.",
};

export const MENSAL = {
  titulo: "Implantação é obra. Manutenção é operação.",
  linha:
    "A implantação resolve de uma vez o que estava errado. O que mantém a ficha viva é o mês a mês, porque o Google não para e o concorrente também não.",
  ciclo: [
    { mes: "Toda semana", texto: "Publicação de novidade na ficha, que expira em cerca de sete dias" },
    { mes: "Todo dia útil", texto: "Resposta a avaliação nova, positiva ou negativa" },
    { mes: "Toda semana", texto: "Perguntas do público respondidas antes que um estranho responda" },
    { mes: "Todo mês", texto: "Fotos novas publicadas a partir do material que você envia" },
    { mes: "Todo mês", texto: "Revisão de categoria, serviços e atributos conforme o Google muda" },
    { mes: "Todo mês", texto: "Relatório do que aconteceu: ligações, rotas, cliques e avaliações" },
  ],
};

export const ESCOPO = {
  titulo: "O que é nosso e o que é seu",
  nosso: {
    titulo: "A OutBox faz",
    itens: [
      "Criação ou recuperação da ficha e a verificação junto ao Google",
      "Categoria, serviços, atributos e área de atendimento",
      "Calendário de publicações e a publicação em si",
      "Resposta a avaliações e perguntas, no seu tom",
      "Roteiro do que fotografar, com enquadramento e formato",
      "Curadoria, renomeação e publicação do material que você envia",
      "Relatório mensal com o que mudou",
    ],
  },
  seu: {
    titulo: "Você faz",
    itens: [
      "Acesso ao perfil ou autorização para criar",
      "Confirmação de horário, endereço e serviços",
      "Fotos e vídeos do seu negócio, seguindo o roteiro que entregamos",
      "Aviso quando algo mudar na operação",
    ],
  },
  nunca: {
    titulo: "A OutBox não faz",
    texto:
      "Não prestamos serviço de captação externa. Fotografia, filmagem e produção de imagem são feitas e entregues por você. Entregamos o roteiro, a orientação e a curadoria do que chegar.",
  },
};

export const INVESTIMENTO = {
  titulo: "O investimento",
  linha: "Três serviços independentes. Você contrata o que fizer sentido agora e acrescenta o resto quando quiser.",
  gmn: {
    nome: "Perfil da Empresa no Google",
    subtitulo: "Implantação e operação mensal",
    setup: { rotulo: "Implantação, uma vez", valor: "R$ 2.000" },
    mensal: { rotulo: "Operação mensal", valor: "R$ 900", periodo: "por mês" },
    condicoes: [
      "Implantação à vista no Pix ou em até 12x no cartão, com os juros da operadora",
      "Mensalidade paga por Pix",
      "Contrato mínimo de 6 meses",
      "Renovação automática por igual período",
      "Para não renovar, basta avisar por escrito com 30 dias de antecedência",
    ],
    cta: "Quero começar pelo Google",
  },
  site: {
    nome: "Site novo, construído com IA",
    subtitulo: "Escopo e prazo sob medida",
    texto:
      "O valor depende do tamanho: quantos serviços, quantas cidades atendidas, se há loja, catálogo ou agendamento. Por isso não sai de tabela.",
    lista: [
      "Levantamento do seu negócio e dos termos que o cliente usa",
      "Arquitetura de páginas por serviço",
      "Redação e dados estruturados para SEO e GEO",
      "Publicação, medição e ligação com a ficha do Google",
    ],
    cta: "Quero uma cotação do site",
  },
  blog: {
    nome: "Blog no seu site",
    subtitulo: "Conteúdo mensal, escrito e publicado pela OutBox",
    linha:
      "Escolha o ritmo de publicação. Quanto mais constante, mais perguntas do seu cliente ficam respondidas no seu domínio.",
    planos: [
      { qtd: "4", unidade: "artigos por mês", valor: "R$ 1.200", periodo: "por mês, no Pix" },
      { qtd: "8", unidade: "artigos por mês", valor: "R$ 1.500", periodo: "por mês, no Pix" },
      { qtd: "12", unidade: "artigos por mês", valor: "R$ 1.800", periodo: "por mês, no Pix" },
    ],
    personalizado: {
      titulo: "Precisa de mais que 12 por mês?",
      texto: "Aí o plano é montado sob medida para o seu volume. Fale com a gente e fazemos o orçamento.",
      cta: "Falar sobre um plano personalizado",
    },
    incluso: {
      titulo: "Cada artigo sai pronto, do começo ao fim",
      itens: [
        "Título e subtítulo",
        "Conteúdo escrito por inteiro",
        "Imagens genéricas escolhidas conforme o assunto",
        "Publicação no seu site",
      ],
      nota: "Tudo desenvolvido seguindo o que o Google e as IAs pedem para aproveitar melhor o conteúdo. Você não escreve uma linha nem escolhe uma imagem.",
    },
    garantia: {
      titulo: "O que garantimos, e o que não dá para garantir",
      texto:
        "Garantimos o trabalho entregue: a quantidade de artigos combinada, no padrão que o Google e as IAs pedem, publicados no seu site dentro do mês. O que ninguém consegue garantir é o retorno exato, porque busca não é uma conta fechada. Quem promete número certo está vendendo outra coisa.",
    },
    cta: "Quero o blog rodando",
  },
};

export const COMECO = {
  titulo: "Como começa",
  passos: [
    { n: 1, titulo: "Conversa de 20 minutos", texto: "Você conta o que faz e para quem. Conferimos o que já existe no Google em nome da sua empresa." },
    { n: 2, titulo: "Diagnóstico da sua ficha", texto: "Mostramos o que está preenchido, o que está errado e o que está faltando, com print do que aparece hoje." },
    { n: 3, titulo: "Aceite e acessos", texto: "Com o aceite, pedimos o acesso ao perfil ou fazemos a criação e a verificação." },
    { n: 4, titulo: "Implantação", texto: "A ficha vai ao ar completa. É a obra: acontece uma vez e resolve a base." },
    { n: 5, titulo: "Operação mensal", texto: "Entra o ciclo de publicação, resposta e medição, com relatório no fim de cada mês." },
  ],
};

export const FAQ = {
  titulo: "Perguntas que sempre aparecem",
  itens: [
    {
      p: "Já tenho a ficha criada. Ainda preciso da implantação?",
      r: "Na maioria dos casos sim, e costuma ser o caso mais rápido. Ficha criada raramente está completa: falta categoria secundária, serviços descritos, atributos e área de atendimento. A implantação corrige a base antes de a operação mensal começar.",
    },
    {
      p: "Em quanto tempo eu vejo resultado?",
      r: "A ficha melhora de aparência na primeira semana. O movimento de ligações e rotas responde ao longo dos primeiros meses, e é isso que o relatório mensal mostra. Quem promete resultado imediato está vendendo outra coisa.",
    },
    {
      p: "Por que o contrato é de seis meses?",
      r: "Porque abaixo disso não dá para medir. Publicação, resposta e avaliação são acúmulo: o efeito aparece na constância. Seis meses é o menor prazo em que a conta faz sentido para você, não só para nós.",
    },
    {
      p: "Vocês fazem as fotos do meu negócio?",
      r: "Não. A OutBox não presta serviço de captação externa. Entregamos o roteiro do que fotografar, com enquadramento e formato, e você produz. O que chegar, a gente organiza e publica.",
    },
    {
      p: "Preciso do site para contratar o Google?",
      r: "Não, são serviços independentes. Mas os dois juntos rendem mais: a ficha aponta para o site, o site confirma a ficha, e é essa consistência que a IA lê para decidir se cita você.",
    },
    {
      p: "E se eu quiser sair?",
      r: "Basta avisar por escrito com 30 dias de antecedência antes do fim do período. Sem multa e sem retenção. O perfil é da sua empresa e continua com você.",
    },
  ],
};

export const FECHAMENTO = {
  titulo: "A busca de amanhã já começou.",
  linha:
    "Cada semana sem ficha ativa e sem site estruturado é uma semana em que o cliente encontrou outro. Não dá para recuperar busca que já aconteceu.",
  cta: "Falar com a OutBox agora",
  secundario: "Quero uma cotação do site",
};
