/** Os quatro documentos legais: título, resumo e descrição, os mesmos em todas as versões. */
export const DOCS_LEGAIS = {
  privacidade: {
    titulo: "Política de Privacidade",
    resumo:
      "Aqui está, em português claro, o que fazemos com os dados que você nos envia pelo site. Sem letra miúda e sem termos que ninguém entende.",
    descricao:
      "Como a OutBox Group coleta, usa, guarda e protege os dados pessoais de quem entra em contato pelo site.",
  },
  termos: {
    titulo: "Termos de Uso",
    resumo: "As regras para usar este site. Ao navegar por aqui, você concorda com o que está escrito abaixo.",
    descricao: "Regras de uso do site da OutBox Group: conteúdo, propriedade intelectual, responsabilidades e limites.",
  },
  cookies: {
    titulo: "Política de Cookies",
    resumo:
      "Este site usa muito pouca coisa no seu navegador, e nada disso serve para rastrear você pela internet. Abaixo está a lista completa.",
    descricao:
      "O que este site guarda no seu navegador, para que serve cada item e como mudar a sua escolha a qualquer momento.",
  },
  lgpd: {
    titulo: "LGPD e seus direitos",
    resumo:
      "A Lei Geral de Proteção de Dados garante que você mande nos seus próprios dados. Esta página explica quais são os seus direitos e como exercê-los com a gente.",
    descricao:
      "Quais direitos a Lei Geral de Proteção de Dados garante a você e como exercê-los junto à OutBox Group.",
  },
} as const;

export type DocLegal = keyof typeof DOCS_LEGAIS;
