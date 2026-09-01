import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Regras de uso do site da OutBox Group: conteúdo, propriedade intelectual, responsabilidades e limites.",
  alternates: { canonical: "/termos" },
};

export default function Termos() {
  return (
    <LegalPage
      titulo="Termos de Uso"
      resumo="As regras para usar este site. Ao navegar por aqui, você concorda com o que está escrito abaixo."
    >
      <h2>1. Quem somos</h2>
      <p>
        Este site é mantido pela {SITE.name}, inscrita no CNPJ {SITE.cnpj}, com
        sede em {SITE.city}. Contato: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>2. O que este site é</h2>
      <p>
        Um canal institucional. Aqui apresentamos nossos serviços, publicamos
        conteúdo no blog e recebemos contatos de quem tem interesse em contratar.
        O site não é loja virtual e não processa pagamentos.
      </p>

      <h2>3. Uso permitido</h2>
      <p>Você pode navegar, ler, compartilhar os links e entrar em contato. Não é permitido:</p>
      <ul>
        <li>Copiar textos, imagens ou código para republicar como se fossem seus;</li>
        <li>Usar robôs para extrair conteúdo em massa ou sobrecarregar o servidor;</li>
        <li>Tentar acessar áreas restritas, como o painel administrativo;</li>
        <li>Enviar pelo formulário conteúdo ilegal, ofensivo ou de terceiros sem autorização.</li>
      </ul>

      <h2>4. Propriedade intelectual</h2>
      <p>
        A marca OutBox, o logotipo, os textos, o design, as fotos e o código deste
        site pertencem à {SITE.name} ou são usados sob licença. Os trabalhos
        exibidos no portfólio pertencem aos respectivos clientes e aparecem aqui
        apenas como referência do serviço prestado.
      </p>
      <p>
        Você pode citar trechos do blog desde que indique a autoria e coloque link
        para a página original.
      </p>

      <h2>5. Conteúdo do blog</h2>
      <p>
        Os artigos têm caráter informativo e refletem a nossa opinião no momento
        da publicação. Não substituem consultoria específica para o seu caso, e
        podem ficar desatualizados conforme a tecnologia muda.
      </p>

      <h2>6. Disponibilidade</h2>
      <p>
        Trabalhamos para manter o site sempre no ar, mas ele pode ficar
        indisponível por manutenção, atualização ou falha de terceiros. Não
        garantimos funcionamento ininterrupto nem isento de erros.
      </p>

      <h2>7. Links para outros sites</h2>
      <p>
        Alguns links levam a sites de terceiros, como redes sociais e projetos de
        clientes. Não temos controle sobre esses conteúdos e não respondemos por
        eles.
      </p>

      <h2>8. Orçamentos e propostas</h2>
      <p>
        Os valores citados no site, quando existirem, são referências de partida.
        A proposta válida é sempre a enviada por escrito, com escopo e prazo
        definidos.
      </p>

      <h2>9. Limitação de responsabilidade</h2>
      <p>
        Na medida permitida por lei, não respondemos por danos indiretos
        decorrentes do uso ou da impossibilidade de uso do site, nem por decisões
        tomadas apenas com base no conteúdo publicado aqui.
      </p>

      <h2>10. Privacidade</h2>
      <p>
        O tratamento de dados pessoais está descrito na{" "}
        <Link href="/privacidade">Política de Privacidade</Link> e na página{" "}
        <Link href="/lgpd">LGPD e seus direitos</Link>.
      </p>

      <h2>11. Mudanças nestes termos</h2>
      <p>
        Podemos atualizar este documento. A data no topo indica a versão vigente,
        e o uso do site após a mudança significa concordância com a nova versão.
      </p>

      <h2>12. Foro e lei aplicável</h2>
      <p>
        Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da
        comarca de Santa Cruz do Rio Pardo, São Paulo, para resolver qualquer
        questão, com renúncia a qualquer outro.
      </p>
    </LegalPage>
  );
}
