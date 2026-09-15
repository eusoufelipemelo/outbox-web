/* Utilitários puros, sem "use client": são usados tanto pelos componentes de
   servidor quanto pelos de cliente, e exportar isso de um módulo cliente faz o
   build quebrar na pré-renderização. */
export function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/** Formata em reais sem centavos, que é como o consultor fala o número. */
export function reais(v: number) {
  return "R$ " + Math.round(v).toLocaleString("pt-BR");
}
