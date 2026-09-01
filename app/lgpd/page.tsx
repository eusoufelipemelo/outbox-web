import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "LGPD e seus direitos",
  description:
    "Quais direitos a Lei Geral de Proteção de Dados garante a você e como exercê-los junto à OutBox Group.",
  alternates: { canonical: "/lgpd" },
};

const DIREITOS = [
  ["Confirmação e acesso", "Saber se tratamos algum dado seu e receber uma cópia."],
  ["Correção", "Corrigir dados incompletos, desatualizados ou errados."],
  ["Anonimização ou bloqueio", "Pedir que dados desnecessários ou tratados fora da lei sejam anonimizados ou bloqueados."],
  ["Eliminação", "Pedir que apaguemos seus dados, respeitados os prazos que a lei nos obriga a manter."],
  ["Portabilidade", "Receber seus dados em formato que possa ser levado a outro fornecedor."],
  ["Informação sobre compartilhamento", "Saber com quem compartilhamos seus dados. No nosso caso, apenas os fornecedores citados na Política de Privacidade."],
  ["Revogação do consentimento", "Retirar uma autorização dada antes, quando o tratamento se apoiar em consentimento."],
  ["Revisão de decisão automatizada", "Pedir revisão humana de decisão tomada só por máquina. Hoje não tomamos nenhuma decisão desse tipo."],
];

export default function Lgpd() {
  return (
    <LegalPage
      titulo="LGPD e seus direitos"
      resumo="A Lei Geral de Proteção de Dados garante que você mande nos seus próprios dados. Esta página explica quais são os seus direitos e como exercê-los com a gente."
    >
      <h2>1. Nosso compromisso</h2>
      <p>
        A {SITE.name} trata dados pessoais seguindo a Lei 13.709/2018. Coletamos o
        mínimo necessário, usamos apenas para o que foi informado e não vendemos
        dados para ninguém.
      </p>

      <h2>2. Quais dados tratamos</h2>
      <p>
        Do site, apenas o que você preenche no formulário de contato: nome,
        e-mail, serviço de interesse, mensagem opcional e a marcação de interesse
        em videochamada. O detalhamento completo está na{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>3. Seus direitos</h2>
      <p>Você pode exercer, a qualquer momento e sem custo:</p>
      <ul>
        {DIREITOS.map(([titulo, texto]) => (
          <li key={titulo}>
            <strong>{titulo}:</strong> {texto}
          </li>
        ))}
      </ul>

      <h2>4. Como exercer</h2>
      <p>
        Envie um e-mail para <a href={`mailto:${SITE.email}`}>{SITE.email}</a> com
        o assunto <strong>&ldquo;LGPD&rdquo;</strong>, dizendo qual direito quer
        exercer. Para proteger você, podemos pedir alguma informação que confirme
        a sua identidade antes de atender ao pedido.
      </p>
      <p>
        <strong>Prazo de resposta:</strong> até 15 dias, conforme a lei. Se o
        pedido for complexo, avisamos e explicamos o motivo.
      </p>

      <h2>5. Encarregado pelos dados</h2>
      <p>
        O encarregado (DPO) é <strong>Felipe Melo</strong>, e o canal de contato é{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>6. Incidentes de segurança</h2>
      <p>
        Se acontecer um incidente que possa gerar risco relevante a você,
        comunicamos os titulares afetados e a Autoridade Nacional de Proteção de
        Dados nos prazos previstos em lei.
      </p>

      <h2>7. Se você não ficar satisfeito</h2>
      <p>
        Fale com a gente primeiro: quase sempre resolvemos rápido. Se ainda assim
        entender que seus direitos não foram respeitados, você pode registrar
        reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD).
      </p>
    </LegalPage>
  );
}
