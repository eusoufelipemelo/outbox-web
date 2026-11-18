import type { CampoLead } from "@/components/site/FormularioLead";

/* Mentorias de Felipe Melo para profissionais (briefing de 18/11/2026, seção 04).
   Produto educacional, separado da consultoria para empresários.
   PENDENTE DE APROVAÇÃO: preço, duração, número de encontros, datas e vagas.
   Até lá: individual por avaliação de perfil, grupo por lista de interesse. */

export const TEMAS_MENTORIA = [
  { titulo: "Posicionamento e público ideal", texto: "Definir a especialidade inicial e para quem você vai trabalhar." },
  {
    titulo: "Portfólio de serviços",
    texto: "Sites, marca, conteúdo, presença local, e-commerce e tecnologia, sem a promessa de ensinar todas as especialidades em profundidade.",
  },
  { titulo: "Oferta, escopo e preço", texto: "Como montar a oferta, delimitar o escopo, chegar ao preço e apresentar a proposta comercial." },
  { titulo: "Prospecção e conversa diagnóstica", texto: "Prospecção ética, a conversa que entende o cliente antes de vender e o relacionamento depois dela." },
  { titulo: "Projetos e qualidade de entrega", texto: "Briefing, organização de projetos, processos e o padrão de entrega." },
  { titulo: "Recorrência e crescimento", texto: "Retenção, serviços recorrentes, parcerias e o planejamento do próximo passo." },
] as const;

export const PUBLICO_MENTORIA = [
  "Designers",
  "Freelancers",
  "Profissionais de marketing",
  "Desenvolvedores",
  "Quem quer começar a prestar serviços digitais",
];

export const FAQ_MENTORIA = [
  {
    q: "É para iniciantes?",
    a: "Pode ser. Depende dos requisitos da turma ou da mentoria individual. O formulário pergunta o seu nível e os seus objetivos para avaliar se faz sentido.",
  },
  {
    q: "Vou aprender todas as ferramentas da OutBox?",
    a: "A proposta prioriza estratégia, serviços e processo. Ferramentas específicas dependem do programa publicado.",
  },
  {
    q: "Existe garantia de clientes ou de renda?",
    a: "Não. Os resultados dependem da sua atuação, da sua experiência, do mercado e da execução.",
  },
  {
    q: "Qual é o preço, a duração e o número de encontros?",
    a: "São informados quando a oferta estiver definida oficialmente. Na mentoria individual, depois da avaliação do seu perfil; na mentoria em grupo, para quem estiver na lista de interesse.",
  },
  {
    q: "Mentoria e consultoria são a mesma coisa?",
    a: "Não. A mentoria é para profissionais que querem aprender a prestar serviços digitais. A consultoria é um diagnóstico pago para empresários que querem uma análise da própria empresa.",
  },
] as const;

const EXPERIENCIA = ["Estou começando", "Já atuo com serviços digitais", "Tenho um negócio de serviços"];

export function camposMentoria(): CampoLead[] {
  return [
    { nome: "nome", rotulo: "Nome", tipo: "texto", obrigatorio: true, autoComplete: "name", meia: true },
    { nome: "area", rotulo: "Área de atuação", tipo: "texto", obrigatorio: true, placeholder: "Ex.: design, marketing, desenvolvimento", meia: true },
    { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", placeholder: "seu@email.com.br", meia: true },
    { nome: "telefone", rotulo: "WhatsApp", tipo: "tel", autoComplete: "tel", placeholder: "(00) 00000-0000", meia: true },
    { nome: "experiencia", rotulo: "Sua experiência", tipo: "opcoes", obrigatorio: true, opcoes: EXPERIENCIA },
    { nome: "desafio", rotulo: "Qual é o seu maior desafio hoje?", tipo: "area", obrigatorio: true },
  ];
}
