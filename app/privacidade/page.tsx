import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a OutBox Group coleta, usa, guarda e protege os dados pessoais de quem entra em contato pelo site.",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <LegalPage
      titulo="Política de Privacidade"
      resumo="Aqui está, em português claro, o que fazemos com os dados que você nos envia pelo site. Sem letra miúda e sem termos que ninguém entende."
    >
      <h2>1. O que esta política cobre</h2>
      <p>
        Este documento vale para o site {SITE.url.replace("https://", "")} e para
        os dados que chegam até nós por ele. Se você contratar um projeto, a
        relação passa a ser regida também pelo contrato assinado entre as partes.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <p>Coletamos apenas o que você digita no formulário de contato:</p>
      <ul>
        <li>
          <strong>Nome</strong> e <strong>e-mail</strong>, para conseguir
          responder você;
        </li>
        <li>
          <strong>Tipo de serviço</strong> de interesse, para entender o seu
          pedido;
        </li>
        <li>
          <strong>Mensagem</strong>, se você optar por escrever uma (campo
          opcional);
        </li>
        <li>
          <strong>Preferência por videochamada</strong>, quando você marca essa
          opção.
        </li>
      </ul>
      <p>
        Também registramos temporariamente o endereço de IP de quem envia o
        formulário, apenas para limitar envios automatizados e evitar spam. Esse
        registro fica na memória do servidor e não é guardado em banco de dados.
      </p>
      <p>
        <strong>Não pedimos</strong> CPF, dados bancários, dados de cartão nem
        qualquer dado sensível. Se você escrever esse tipo de informação no campo
        de mensagem por conta própria, pedimos que evite.
      </p>

      <h2>3. Para que usamos</h2>
      <ul>
        <li>Responder ao seu contato e conversar sobre o projeto;</li>
        <li>Preparar orçamento e proposta, quando for o caso;</li>
        <li>Agendar uma videochamada, se você pediu.</li>
      </ul>
      <p>
        Não usamos seus dados para publicidade, não montamos perfil de
        comportamento e <strong>não vendemos nem alugamos</strong> seus dados
        para ninguém.
      </p>

      <h2>4. Base legal</h2>
      <p>
        Tratamos os dados do formulário com base no{" "}
        <strong>procedimento preliminar relacionado a contrato</strong>, previsto
        no artigo 7º, inciso V, da Lei Geral de Proteção de Dados (Lei
        13.709/2018). Em outras palavras: você nos procurou para falar de um
        possível serviço, e precisamos dos seus dados para responder.
      </p>

      <h2>5. Onde os dados ficam</h2>
      <p>
        As mensagens enviadas pelo formulário são guardadas em banco de dados
        hospedado no <strong>Supabase</strong> e também encaminhadas por e-mail
        para {SITE.email}. O site é hospedado em servidor próprio administrado
        pela OutBox Group.
      </p>
      <p>
        Esses fornecedores podem processar os dados fora do Brasil. A
        transferência acontece de forma protegida por conexão criptografada e
        limitada ao necessário para o serviço funcionar.
      </p>

      <h2>6. Quem tem acesso</h2>
      <p>
        Apenas a equipe da OutBox Group, por meio de painel protegido por login e
        senha. Não compartilhamos seus dados com terceiros, exceto se houver
        exigência legal ou ordem judicial.
      </p>

      <h2>7. Por quanto tempo guardamos</h2>
      <ul>
        <li>
          <strong>Contatos que não viraram projeto:</strong> até 24 meses, para
          o caso de você retomar a conversa;
        </li>
        <li>
          <strong>Contatos que viraram projeto:</strong> pelo prazo do contrato e
          pelo período exigido pela legislação fiscal;
        </li>
        <li>
          <strong>A qualquer momento:</strong> se você pedir a exclusão, apagamos
          antes desses prazos, salvo o que a lei nos obrigue a manter.
        </li>
      </ul>

      <h2>8. Segurança</h2>
      <p>
        O site roda sobre HTTPS com certificado válido. O acesso ao painel
        administrativo exige autenticação, e o banco de dados usa regras de
        segurança que impedem leitura pública dos contatos. Nenhum sistema é
        infalível, mas trabalhamos para reduzir riscos ao mínimo.
      </p>

      <h2>9. Seus direitos</h2>
      <p>
        Você pode pedir confirmação, acesso, correção, anonimização, portabilidade
        ou exclusão dos seus dados, além de revogar consentimento. Explicamos como
        exercer cada um deles na página{" "}
        <Link href="/lgpd">LGPD e seus direitos</Link>.
      </p>

      <h2>10. Cookies</h2>
      <p>
        O uso de cookies e de armazenamento local está detalhado na{" "}
        <Link href="/cookies">Política de Cookies</Link>.
      </p>

      <h2>11. Mudanças nesta política</h2>
      <p>
        Se mudarmos algo relevante, atualizamos a data no topo desta página. Vale
        sempre a versão publicada aqui.
      </p>

      <h2>12. Fale com a gente</h2>
      <p>
        Dúvida, pedido ou reclamação sobre dados pessoais:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Respondemos em até 15
        dias.
      </p>
    </LegalPage>
  );
}
