/**
 * Material de estudo dos consultores: Sistema Sob Medida e Micro SaaS.
 *
 * Regra que vale para o arquivo inteiro: nada de número inventado. Preço,
 * porte, comissão e desconto saem da tabela real do sistema de consultores.
 * O que é argumento está escrito como argumento, não como estatística.
 */

export const CAPA = {
  selo: "Material de estudo · Consultores OutBox",
  titulo: "Sistema sob medida e Micro SaaS",
  destaque: "O produto que muda o tamanho da sua venda.",
  linha:
    "Um site bom resolve a vitrine. Um sistema resolve a operação, e por isso vale de seis a vinte vezes mais. Este material existe para você entender o produto, reconhecer a oportunidade numa conversa comum e sustentar o argumento até o fim.",
  tempo: "Leitura de 20 minutos",
  modulos: "11 módulos e uma autoavaliação",
};

/* Os números da capa saem todos da tabela real, nada de estimativa. */
export const CONTEXTO = [
  { valor: "R$ 19.000", rotulo: "menor preço de tabela de um sistema", nota: "pequena empresa" },
  { valor: "R$ 1.880", rotulo: "sua comissão nessa venda", nota: "começando o mês do zero" },
  { valor: "R$ 130.000", rotulo: "teto de tabela", nota: "indústria" },
];

export const INDICE = [
  { n: 1, id: "produto", nome: "O que estamos vendendo" },
  { n: 2, id: "agora", nome: "Por que agora, e não daqui a dois anos" },
  { n: 3, id: "dentro", nome: "Como funciona por dentro" },
  { n: 4, id: "quem", nome: "Quem compra, e como reconhecer" },
  { n: 5, id: "abordar", nome: "Como abordar" },
  { n: 6, id: "argumentar", nome: "Como argumentar" },
  { n: 7, id: "demonstrar", nome: "Como demonstrar" },
  { n: 8, id: "objecoes", nome: "As objeções e o que responder" },
  { n: 9, id: "preco", nome: "Preço, prazo e quanto você ganha" },
  { n: 10, id: "saas", nome: "Micro SaaS" },
  { n: 11, id: "erros", nome: "Os erros que matam a venda" },
  { n: 12, id: "prova", nome: "Autoavaliação" },
];

/* ---------------- 01 ---------------- */
export const PRODUTO = {
  rotulo: "Módulo 1",
  titulo: "O que estamos vendendo",
  linha:
    "Antes de vender, separe três coisas que o cliente confunde o tempo todo. A venda começa a andar no instante em que ele entende em qual das três está.",
  colunas: ["Software de prateleira", "Sistema sob medida", "Micro SaaS"],
  linhas: [
    {
      pergunta: "Quem se adapta a quem",
      valores: [
        "A empresa se adapta ao software",
        "O software se adapta à empresa",
        "O mercado se adapta ao produto do cliente",
      ],
    },
    {
      pergunta: "De quem é",
      valores: [
        "Da empresa que vendeu",
        "Do cliente, é dele para sempre",
        "Do cliente, e ele passa a vender para outros",
      ],
    },
    {
      pergunta: "Como paga",
      valores: [
        "Mensalidade por usuário, sem fim",
        "Investimento uma vez",
        "Investimento uma vez, depois ele é quem recebe",
      ],
    },
    {
      pergunta: "O que acontece quando cresce",
      valores: [
        "A conta sobe junto",
        "A conta não muda",
        "A receita dele sobe",
      ],
    },
    {
      pergunta: "Quando vale",
      valores: [
        "O processo é comum e o preço é baixo",
        "O processo é o diferencial da empresa",
        "O problema dele é o problema do setor inteiro",
      ],
    },
  ],
  fecho:
    "A frase que resume e que você pode usar na conversa: software de prateleira é aluguel de uma roupa que quase serve. Sistema sob medida é roupa feita para o corpo da empresa, e ela fica com a peça.",
};

/* ---------------- 02 ---------------- */
export const AGORA = {
  rotulo: "Módulo 2",
  titulo: "Por que agora, e não daqui a dois anos",
  linha:
    "Esse produto sempre existiu, só que era caro demais para a empresa média. Três coisas mudaram ao mesmo tempo, e é por isso que hoje ele cabe no orçamento de um cliente que antes só comprava site.",
  pontos: [
    {
      titulo: "Construir software ficou mais rápido",
      texto:
        "A inteligência artificial entrou no processo de desenvolvimento inteiro, da arquitetura ao código. O que consumia meses de equipe grande hoje sai em semanas. O que barateou não foi a qualidade, foi o tempo, e tempo era a maior parte da conta.",
    },
    {
      titulo: "A empresa média opera espalhada",
      texto:
        "Planilha para controlar, WhatsApp para combinar, caderno para o que não coube, e a cabeça de uma pessoa para o resto. Isso não é falta de tecnologia, é processo sem lugar para morar. Enquanto está espalhado, o dono não consegue delegar nem medir.",
    },
    {
      titulo: "O aluguel de software virou custo fixo crescente",
      texto:
        "Ferramenta pronta cobra por usuário, todo mês, para sempre. Quando a empresa contrata, a conta sobe. Quando o fornecedor reajusta, ela sobe de novo. E no dia em que o cliente para de pagar, ele fica sem nada, porque nunca foi dele.",
    },
  ],
  alerta: {
    titulo: "O limite que você respeita",
    texto:
      "Não vendemos substituição de ERP nem promessa de trocar tudo que a empresa usa. O sistema sob medida entra onde a ferramenta pronta não chega: no processo que é só daquela empresa. Prometer mais que isso derruba a venda na primeira reunião técnica.",
  },
};

/* ---------------- 03 ---------------- */
export const DENTRO = {
  rotulo: "Módulo 3",
  titulo: "Como funciona por dentro",
  linha:
    "Você não precisa saber programar. Precisa saber descrever o caminho, porque o cliente vai perguntar e a insegurança na resposta custa a venda. São cinco etapas, e todas estão no que a OutBox entrega.",
  etapas: [
    {
      n: 1,
      titulo: "Levantamento de requisitos",
      texto:
        "Conversa com quem faz o trabalho hoje, não só com o dono. Sai daqui a lista do que o sistema precisa resolver e, tão importante quanto, do que ele não vai fazer.",
    },
    {
      n: 2,
      titulo: "Telas desenhadas para o processo",
      texto:
        "Cada tela nasce de uma tarefa real da empresa. É o contrário do software pronto, onde a empresa é que precisa encaixar a rotina dela nas telas que já existem.",
    },
    {
      n: 3,
      titulo: "Controle de acesso por usuário",
      texto:
        "Cada pessoa vê o que é do trabalho dela. O vendedor não vê a margem, o financeiro não mexe no cadastro, o dono vê tudo. É isso que permite delegar sem abrir a empresa inteira.",
    },
    {
      n: 4,
      titulo: "Relatórios gerenciais",
      texto:
        "O número sai pronto do próprio uso, sem ninguém parar para montar planilha no fim do mês. Esse costuma ser o item que o dono mais valoriza e o que o consultor menos usa no argumento.",
    },
    {
      n: 5,
      titulo: "Implantação e suporte",
      texto:
        "O sistema entra no ar com acompanhamento, com a equipe usando de verdade. Sistema que ninguém usa é prejuízo para os dois lados, então a implantação faz parte do serviço.",
    },
  ],
  promessa: {
    sim: {
      titulo: "O que você promete",
      itens: [
        "Um sistema construído para o processo que ele descrever",
        "Cronograma aprovado antes de começar",
        "Telas, acessos por usuário e relatórios",
        "Acompanhamento na implantação",
        "O sistema é dele",
      ],
    },
    nao: {
      titulo: "O que você nunca promete",
      itens: [
        "Prazo de cabeça, sem o levantamento feito",
        "Funcionalidade nova no meio da conversa, para agradar",
        "Integração com um sistema de terceiro sem confirmar antes",
        "Substituir o ERP ou o contador da empresa",
        "Número de retorno, porque quem entrega é a operação dele",
      ],
    },
  },
};

/* ---------------- 04 ---------------- */
export const QUEM = {
  rotulo: "Módulo 4",
  titulo: "Quem compra, e como reconhecer",
  linha:
    "O cliente quase nunca diz que quer um sistema. Ele reclama de uma rotina. Estas sete frases aparecem em conversa comum e cada uma delas é uma porta aberta. Decore o que significam e a pergunta que vem depois.",
  sinais: [
    {
      fala: "Isso a gente controla numa planilha.",
      leitura: "Existe um processo importante sem dono e sem histórico. Planilha não registra quem mudou o quê.",
      pergunta: "Quantas pessoas mexem nessa planilha? E se ela sumisse hoje, o que a empresa perdia?",
    },
    {
      fala: "Só o Fulano sabe mexer nisso.",
      leitura: "O processo mora na cabeça de uma pessoa. É o risco mais caro que uma empresa pequena carrega.",
      pergunta: "E quando o Fulano tira férias, como vocês fazem?",
    },
    {
      fala: "Perdi o pedido, ficou no WhatsApp.",
      leitura: "A informação que gera dinheiro entra por um canal que não guarda nada de forma organizada.",
      pergunta: "Isso acontece quantas vezes por mês? Quanto vale um pedido médio de vocês?",
    },
    {
      fala: "Tenho que digitar a mesma coisa em dois lugares.",
      leitura: "Retrabalho puro, todo dia, e cada digitação é uma chance de erro.",
      pergunta: "Quanto tempo por dia isso toma da sua equipe?",
    },
    {
      fala: "No fim do mês eu paro tudo para fechar o relatório.",
      leitura: "O dono vira operador de planilha em vez de tomar decisão. Custo alto e invisível.",
      pergunta: "Quantos dias por mês isso consome? E o que você deixa de fazer nesses dias?",
    },
    {
      fala: "O sistema que a gente usa não faz do nosso jeito.",
      leitura: "Ele já paga por software e já sabe que a ferramenta pronta não resolve. Meio caminho andado.",
      pergunta: "O que exatamente ele não faz? Como vocês contornam isso hoje?",
    },
    {
      fala: "Pago por usuário e acabei de contratar mais gente.",
      leitura: "Ele está sentindo no bolso que crescer aumenta a conta. É o argumento do sob medida em forma de dor.",
      pergunta: "Quanto vocês pagam por mês hoje? E daqui a dois anos, com a equipe que você planeja?",
    },
  ],
  perfil: {
    titulo: "O cliente que fecha mais rápido",
    itens: [
      "Já paga por algum software e reclama dele",
      "Cresceu nos últimos dois anos e a rotina não acompanhou",
      "Tem um processo que é o diferencial dele, não algo comum do setor",
      "O dono ainda opera, e sabe exatamente onde dói",
      "Tem mais de uma pessoa tocando o mesmo processo",
    ],
  },
};

/* ---------------- 05 ---------------- */
export const ABORDAR = {
  rotulo: "Módulo 5",
  titulo: "Como abordar",
  linha:
    "Não abra falando de sistema. Abra falando da rotina dele. Quem fala em software primeiro recebe um preço como resposta, e preço sem dor construída é sempre caro.",
  roteiro: {
    titulo: "O roteiro de diagnóstico, na ordem",
    passos: [
      { n: 1, texto: "Me conta como funciona o dia a dia de vocês, do pedido até a entrega." },
      { n: 2, texto: "Qual parte desse caminho mais trava?" },
      { n: 3, texto: "Como vocês controlam isso hoje?" },
      { n: 4, texto: "Quem mexe nesse controle? Quantas pessoas?" },
      { n: 5, texto: "O que acontece quando alguém erra ou esquece?" },
      { n: 6, texto: "Quanto tempo por semana isso toma da equipe?" },
      { n: 7, texto: "Se isso funcionasse sozinho, o que você faria com esse tempo?" },
    ],
    nota:
      "A sétima pergunta é a mais importante e quase ninguém faz. Ela troca o assunto de custo para ganho, e é o cliente que responde, não você.",
  },
  scripts: [
    {
      contexto: "Abordagem fria, empresa que você não conhece",
      texto:
        "Oi, [nome], tudo bem? Aqui é o [seu nome], da OutBox. A gente desenvolve sistema sob medida para empresa que já cresceu além da planilha. Não vou te empurrar nada agora: queria só 15 minutos para entender como vocês controlam [processo do setor dele] hoje. Se eu não enxergar nada que valha a pena, eu mesmo te falo e a gente encerra.",
    },
    {
      contexto: "Cliente que já comprou site com você",
      texto:
        "[nome], o site está rodando e resolvendo a parte de fora. Fiquei pensando na parte de dentro: você comentou que controla [processo] na planilha. Hoje a gente desenvolve sistema sob medida para exatamente esse tipo de coisa, e ficou muito mais acessível do que era há dois anos. Vale eu te mostrar como funciona?",
    },
    {
      contexto: "Indicação",
      texto:
        "Oi, [nome]. O [quem indicou] me passou seu contato. Ele comentou que vocês estão com dificuldade em [processo]. A gente desenvolve sistema feito para o processo da empresa, não pacote pronto. Se fizer sentido, marco 20 minutos só para entender o seu caso e te dizer com honestidade se é o momento.",
    },
    {
      contexto: "Quando ele responde que já tem um sistema",
      texto:
        "Que bom, então você já sabe o valor de ter as coisas organizadas. Pergunta honesta: tem alguma parte da rotina de vocês que esse sistema não cobre e que acabou voltando para a planilha ou para o WhatsApp? É exatamente aí que a gente entra, sem mexer no que já funciona.",
    },
  ],
};

/* ---------------- 06 ---------------- */
export const ARGUMENTAR = {
  rotulo: "Módulo 6",
  titulo: "Como argumentar",
  linha:
    "Existe um erro que derruba quase toda venda de sistema: comparar o preço com o de um software pronto. Nunca compare com o que ele pagaria. Compare com o que ele já paga sem perceber.",
  metodo: [
    {
      n: 1,
      titulo: "Some o custo de continuar como está",
      texto:
        "Horas da equipe gastas no retrabalho, erros que viram prejuízo, pedido perdido, o dono fechando planilha em vez de vender. Esse custo já existe, todo mês, e ninguém lança na contabilidade.",
    },
    {
      n: 2,
      titulo: "Ponha o investimento ao lado, não na frente",
      texto:
        "O sistema é um valor uma vez. O custo de continuar como está é todo ano, e cresce junto com a empresa. Quando os dois números aparecem lado a lado, a conversa deixa de ser sobre preço.",
    },
    {
      n: 3,
      titulo: "Mostre em quantos meses vira lucro",
      texto:
        "Divida o investimento pelo custo mensal do jeito atual. O resultado é o mês em que ele passa a ganhar. É a única conta que importa, e ela é feita com os números que ele mesmo te deu.",
    },
    {
      n: 4,
      titulo: "Feche com o que ele falou na sétima pergunta",
      texto:
        "Volte na resposta dele sobre o que faria com o tempo livre. Esse é o argumento que você não precisou inventar, e é o único que ele não consegue rebater.",
    },
  ],
  simulador: {
    rotulo: "Faça a conta com ele, na frente dele",
    titulo: "Quanto custa continuar como está",
    linha:
      "Preencha com os números que o cliente te deu na conversa. Nada aqui é estimativa da OutBox: tudo sai do que ele respondeu. Se ele discordar do resultado, é porque discorda do próprio número, e aí é só corrigir junto.",
    campos: {
      pessoas: { rotulo: "Pessoas envolvidas no processo", ajuda: "quantas mexem nisso hoje" },
      horas: { rotulo: "Horas por semana perdidas, por pessoa", ajuda: "retrabalho, digitar duas vezes, procurar informação" },
      custo: { rotulo: "Custo médio da hora dessa equipe", ajuda: "salário mais encargos, dividido pelas horas do mês" },
      investimento: { rotulo: "Investimento no sistema", ajuda: "valor de tabela conforme o porte" },
    },
    nota:
      "A conta considera 4,33 semanas por mês. Ela mede só o tempo da equipe: erro, pedido perdido e decisão atrasada ficam de fora, o que deixa o resultado conservador de propósito. Diga isso ao cliente, porque aumenta a confiança no número.",
  },
};

/* ---------------- 07 ---------------- */
export const DEMONSTRAR = {
  rotulo: "Módulo 7",
  titulo: "Como demonstrar",
  linha:
    "Demonstração de sistema não é mostrar tela bonita. É provar que a OutBox já fez isso antes e que o processo dele cabe aqui.",
  provas: [
    {
      titulo: "O sistema que você usa todo dia",
      texto:
        "O painel onde você lança venda, acompanha comissão e emite contrato foi desenvolvido pela OutBox. É a prova mais forte que você tem, porque você é usuário dele e consegue mostrar na hora, do seu celular.",
    },
    {
      titulo: "Mostre o processo dele, não o seu",
      texto:
        "Pegue o que ele descreveu no diagnóstico e desenhe em voz alta: esta tela seria o pedido entrando, esta o acompanhamento, esta o relatório que hoje você monta na mão. Ele precisa se ver dentro do sistema antes de comprar.",
    },
    {
      titulo: "Use o acesso por usuário como virada",
      texto:
        "Pergunte quem hoje não pode ver certa informação. Mostre que o sistema resolve isso por perfil de acesso. É o momento em que o dono entende que vai conseguir delegar.",
    },
    {
      titulo: "Peça material ao Felipe antes da reunião",
      texto:
        "Se a reunião for grande, avise com antecedência. Existe material de apoio e casos que podem ser mostrados conforme o setor do cliente. Chegar sem preparo numa reunião de sistema é queimar a oportunidade inteira.",
    },
  ],
  cuidado:
    "Nunca mostre o sistema de um cliente para outro cliente sem autorização. Processo de empresa é informação sensível, e a confiança que você quebra ali não volta.",
};

/* ---------------- 08 ---------------- */
export const OBJECOES = {
  rotulo: "Módulo 8",
  titulo: "As objeções e o que responder",
  linha:
    "Objeção não é o fim da conversa, é o cliente pedindo um motivo para continuar. Estas são as oito que mais aparecem. Leia a resposta e adapte ao seu jeito de falar, porque decorado soa falso.",
  itens: [
    {
      objecao: "Está caro.",
      resposta:
        "Caro comparado com o quê? Se a gente comparar com uma mensalidade, parece. Vamos comparar com o que essa rotina custa hoje: você me disse que [n] pessoas perdem [x] horas por semana. Só isso já dá [valor] por ano, todo ano. O sistema é uma vez.",
      cuidado: "Nunca dê desconto antes de fazer essa conta. Desconto cedo transforma o produto em commodity.",
    },
    {
      objecao: "Já tenho um sistema.",
      resposta:
        "Ótimo, então não vamos mexer no que funciona. Me diz uma coisa: tem alguma parte da rotina que esse sistema não cobre e que voltou para a planilha ou para o WhatsApp? É só aí que a gente entra.",
      cuidado: "Não ataque o fornecedor atual. Quem escolheu aquele sistema foi ele.",
    },
    {
      objecao: "E se eu perder tudo o que tenho hoje?",
      resposta:
        "O levantamento começa exatamente por aí: o que existe hoje e o que precisa continuar existindo. Nada entra no ar sem a empresa estar usando junto, com acompanhamento na implantação.",
      cuidado: "Não prometa migração de dados de um sistema de terceiro sem confirmar antes. Anote e leve.",
    },
    {
      objecao: "E se vocês sumirem?",
      resposta:
        "Pergunta justa, e é o contrário do que acontece com software alugado: lá, se você para de pagar, fica sem nada, porque o sistema nunca foi seu. Aqui o sistema é da sua empresa.",
      cuidado: "Não invente garantia contratual que você não conhece. Se ele quiser cláusula específica, leve ao Felipe.",
    },
    {
      objecao: "Minha equipe não vai saber usar.",
      resposta:
        "Essa é a diferença do sob medida: as telas nascem da rotina que eles já fazem, no lugar de obrigar todo mundo a aprender a lógica de um software genérico. E a implantação é acompanhada, não é entregar e sumir.",
      cuidado: "Se ele insistir, peça para conversar com quem vai usar. Resistência de equipe se resolve ouvindo a equipe.",
    },
    {
      objecao: "Depois eu vejo isso, agora não é o momento.",
      resposta:
        "Entendo. Só quero deixar um número com você antes de sair: esperar seis meses custa [valor do cálculo]. Não é urgência minha, é o que a sua própria conta mostrou. Quando quiser retomar, é só me chamar.",
      cuidado: "Aceite o não com elegância e marque retorno com data. Pressão aqui queima o contato para sempre.",
    },
    {
      objecao: "Meu sobrinho faz mais barato.",
      resposta:
        "Pode ser que faça mesmo. A pergunta é o que acontece quando ele arrumar emprego ou quando o sistema precisar crescer. A gente trabalha com levantamento, cronograma aprovado e implantação acompanhada, e a empresa não fica dependendo de uma pessoa só.",
      cuidado: "Zero ironia. Muitas vezes o sobrinho existe e é querido na família.",
    },
    {
      objecao: "Quanto tempo demora?",
      resposta:
        "O prazo sai do cronograma aprovado, depois do levantamento, e não antes. Prefiro te dar uma data que a gente cumpre do que um número agora que vira frustração depois.",
      cuidado: "Nunca chute prazo. Prazo chutado é a principal fonte de problema em projeto de sistema.",
    },
  ],
};

/* ---------------- 09 ---------------- */
export const PRECO = {
  rotulo: "Módulo 9",
  titulo: "Preço, prazo e quanto você ganha",
  linha:
    "O preço é de tabela e varia pelo porte do cliente, exatamente como nos outros produtos. O que muda no sistema é a ordem de grandeza, e é isso que faz uma única venda mudar o seu mês.",
  tabela: {
    titulo: "Sistemas Sob Medida, preço de tabela",
    portes: [
      { nome: "Pequena empresa", faixa: "Faturamento até R$ 4,8 mi por ano", valor: "R$ 19.000" },
      { nome: "Média empresa", faixa: "De R$ 4,8 mi a R$ 50 mi por ano", valor: "R$ 45.000" },
      { nome: "Grande empresa", faixa: "De R$ 50 mi a R$ 300 mi por ano", valor: "R$ 82.000" },
      { nome: "Indústria", faixa: "Acima de R$ 300 mi por ano ou setor industrial", valor: "R$ 130.000" },
    ],
  },
  condicoes: {
    titulo: "Condições",
    itens: [
      "Pagamento em Pix, cartão em até 12x ou boleto",
      "No cartão, os juros da operadora são repassados ao cliente",
      "No Pix à vista você pode conceder até 5% de desconto",
      "Orçamento a partir de R$ 15.000 libera a faixa maior de desconto comercial, até 10%",
      "Prazo de entrega conforme cronograma aprovado, nunca estimado na conversa",
      "Saque da comissão a partir de R$ 500 acumulados",
    ],
  },
  comissao: {
    rotulo: "Sua parte",
    titulo: "O que uma venda de sistema faz com o seu mês",
    linha:
      "A comissão é marginal e progressiva: cada faixa do seu volume no mês paga a taxa dela. Quanto maior a venda, maior a parte que cai na faixa de 20%. É por isso que um sistema não é uma venda grande, é uma venda de outra categoria.",
    faixas: [
      { ate: "Até R$ 5.000", taxa: "8%" },
      { ate: "De R$ 5.000 a R$ 15.000", taxa: "10%" },
      { ate: "De R$ 15.000 a R$ 30.000", taxa: "12%" },
      { ate: "Acima de R$ 30.000", taxa: "20%" },
    ],
    nota:
      "Some a isso o Fixo do Consultor: ao alcançar R$ 20.000 em vendas pagas no mês, entram R$ 2.000 no seu fechamento. Um único sistema de porte médio cobre a régua inteira e ainda sobra.",
  },
};

/* ---------------- 10 ---------------- */
export const SAAS = {
  rotulo: "Módulo 10",
  titulo: "Micro SaaS",
  linha:
    "É o mesmo trabalho de engenharia com um destino comercial diferente. No sistema sob medida, o cliente resolve o problema dele. No Micro SaaS, ele descobre que esse problema é do setor inteiro e passa a cobrar assinatura de quem tem a mesma dor.",
  virada: {
    titulo: "A pergunta que transforma um sistema em Micro SaaS",
    texto:
      "Depois que você entender o processo dele, pergunte: as outras empresas do seu ramo sofrem com isso também? Se a resposta for sim, e se ele já resolveu isso melhor que os concorrentes, existe produto ali. E produto tem receita recorrente, que é um assunto muito maior do que economia de tempo.",
  },
  qualifica: {
    titulo: "Como qualificar em cinco perguntas",
    itens: [
      "O problema se repete em outras empresas do mesmo ramo?",
      "Ele já resolveu isso de um jeito próprio, que dá orgulho de mostrar?",
      "Ele conhece essas outras empresas, ou tem como chegar nelas?",
      "Ele tem fôlego para tocar um produto além do negócio principal?",
      "Ele entende que assinatura exige atender cliente, e não só vender uma vez?",
    ],
    nota:
      "Se três ou mais forem sim, você tem uma oportunidade de Micro SaaS na mão. Se ele travar na quarta ou na quinta, o caminho certo é o sistema sob medida, e você segue firme por ele.",
  },
  ganhos: [
    {
      titulo: "Por que o cliente se interessa",
      texto:
        "Ele deixa de ter só um custo resolvido e passa a ter uma fonte de receita que não depende da capacidade de produção dele. É a diferença entre economizar e faturar.",
    },
    {
      titulo: "Por que interessa a você",
      texto:
        "É a conversa de maior valor que você pode ter com um cliente, e coloca você na mesa onde se decide o futuro da empresa dele, não na mesa de compras.",
    },
    {
      titulo: "Por que interessa ao mercado agora",
      texto:
        "Setores inteiros seguem operando em planilha porque nunca coube um software feito só para eles. Quem chega primeiro com uma ferramenta específica do ramo pega um mercado que ninguém disputou ainda.",
    },
  ],
  aviso: {
    titulo: "Micro SaaS não tem preço de tabela",
    texto:
      "Esse produto não está no catálogo com valor fechado, e não pode ser orçado por você na conversa. O escopo depende de quantos clientes ele quer atender, de cobrança recorrente, de níveis de acesso e de suporte. Qualifique com as cinco perguntas, registre as respostas e leve ao Felipe para o orçamento. Prometer número aqui é o jeito mais rápido de perder uma oportunidade grande.",
  },
};

/* ---------------- 11 ---------------- */
export const ERROS = {
  rotulo: "Módulo 11",
  titulo: "Os erros que matam a venda",
  linha: "Todos já aconteceram. Ler esta lista antes da reunião custa dois minutos e economiza um cliente.",
  itens: [
    { titulo: "Falar de sistema antes de entender a rotina", texto: "Você recebe um pedido de preço e perde o direito de construir o valor." },
    { titulo: "Chutar prazo", texto: "O prazo sai do cronograma aprovado. Chutar cria uma dívida que a entrega não paga." },
    { titulo: "Dar desconto antes da conta do custo atual", texto: "Descontar cedo ensina o cliente que o preço era inflado." },
    { titulo: "Prometer integração sem confirmar", texto: "Sistema de terceiro pode simplesmente não permitir. Anote o pedido e confirme antes." },
    { titulo: "Falar só com o dono", texto: "Quem opera é quem sabe onde dói, e é quem pode boicotar a implantação depois." },
    { titulo: "Vender sistema para quem precisa de planilha", texto: "Empresa com processo simples e barato não precisa disso. Dizer isso na hora certa constrói a confiança que traz a próxima venda." },
  ],
};

/* ---------------- 12 ---------------- */
export const PROVA = {
  rotulo: "Autoavaliação",
  titulo: "Você está pronto para a reunião?",
  linha:
    "Seis perguntas do próprio material. Não vale consultar. Se errar alguma, volte no módulo indicado antes de marcar a conversa com o cliente.",
  questoes: [
    {
      pergunta: "O cliente diz que já tem um sistema. Qual é a melhor reação?",
      opcoes: [
        "Mostrar por que o sistema dele é ultrapassado",
        "Perguntar que parte da rotina voltou para a planilha ou o WhatsApp",
        "Oferecer desconto para ele trocar",
      ],
      certa: 1,
      porque:
        "Atacar o fornecedor atual é atacar a escolha dele. A pergunta encontra a brecha real sem criar defesa.",
      modulo: "Módulo 8",
    },
    {
      pergunta: "Com o que você compara o preço do sistema?",
      opcoes: [
        "Com o preço de um software pronto",
        "Com o que o concorrente da OutBox cobraria",
        "Com o custo de continuar do jeito que está hoje",
      ],
      certa: 2,
      porque:
        "Comparar com mensalidade faz o sistema parecer caro. O custo atual já existe, é dele, e cresce todo ano.",
      modulo: "Módulo 6",
    },
    {
      pergunta: "O cliente pergunta quanto tempo demora. O que você responde?",
      opcoes: [
        "Uma estimativa aproximada, para não deixar ele sem resposta",
        "Que o prazo sai do cronograma aprovado, depois do levantamento",
        "O mesmo prazo do último projeto parecido",
      ],
      certa: 1,
      porque: "Prazo chutado é a principal fonte de problema em projeto de sistema, e a frustração cai no seu colo.",
      modulo: "Módulo 3",
    },
    {
      pergunta: "Qual destas frases do cliente indica oportunidade mais madura?",
      opcoes: [
        "Nunca pensei em informatizar isso",
        "Pago por usuário e acabei de contratar mais gente",
        "Acho que meu site precisa de uma atualização",
      ],
      certa: 1,
      porque:
        "Ele já paga por software, já sente o custo crescendo e já entende o valor. Falta só mostrar o caminho contrário.",
      modulo: "Módulo 4",
    },
    {
      pergunta: "Quando uma oportunidade vira Micro SaaS?",
      opcoes: [
        "Quando o cliente tem orçamento alto",
        "Quando o problema dele se repete nas outras empresas do ramo",
        "Quando o sistema precisa funcionar no celular",
      ],
      certa: 1,
      porque: "O que cria o produto é o problema ser do setor, não da empresa. Aí existe alguém para assinar.",
      modulo: "Módulo 10",
    },
    {
      pergunta: "Você pode fechar um Micro SaaS pelo preço de tabela?",
      opcoes: [
        "Sim, usa a tabela de sistemas pelo porte",
        "Não, qualifica, registra e leva ao Felipe para orçamento",
        "Sim, desde que aplique o desconto máximo",
      ],
      certa: 1,
      porque:
        "Micro SaaS não tem valor fechado no catálogo. O escopo depende de recorrência, acessos e suporte.",
      modulo: "Módulo 10",
    },
  ],
  resultados: {
    alto: { titulo: "Pode marcar a reunião", texto: "Você domina o argumento. Leve o roteiro de diagnóstico impresso mesmo assim, porque na hora a gente esquece." },
    medio: { titulo: "Quase lá", texto: "Revise os módulos indicados nas questões que você errou e refaça a autoavaliação antes de abordar." },
    baixo: { titulo: "Volte ao material", texto: "Leia de novo do módulo 4 ao 8, que é onde mora a venda. Sem isso, a conversa vira pedido de preço." },
  },
};

export const FECHAMENTO = {
  titulo: "O próximo passo é uma conversa, não uma proposta",
  linha:
    "Escolha um cliente da sua carteira que já comprou site e que você sabe que controla algo em planilha. Rode o roteiro de diagnóstico do módulo 5 com ele nesta semana, sem falar em preço. Traga as respostas e a gente monta a proposta junto.",
  botao: "Falar com o Felipe",
  contexto: "Vim pelo material de estudo de Sistemas e quero levar uma oportunidade.",
};
