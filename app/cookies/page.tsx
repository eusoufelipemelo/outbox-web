import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import GerenciarCookies from "@/components/legal/GerenciarCookies";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "O que este site guarda no seu navegador, para que serve cada item e como mudar a sua escolha a qualquer momento.",
  alternates: { canonical: "/cookies" },
};

export default function Cookies() {
  return (
    <LegalPage
      titulo="Política de Cookies"
      resumo="Este site usa muito pouca coisa no seu navegador, e nada disso serve para rastrear você pela internet. Abaixo está a lista completa."
    >
      <h2>1. O que são cookies</h2>
      <p>
        Cookies são arquivos pequenos que um site guarda no seu navegador para
        lembrar de alguma coisa. Existe também o armazenamento local, que funciona
        de forma parecida. Tratamos os dois aqui.
      </p>

      <h2>2. O que usamos hoje</h2>
      <p>
        Sendo direto: <strong>este site não usa cookies de publicidade nem de
        rastreamento</strong>. Não temos pixel de rede social, não temos
        ferramenta de análise de audiência e não montamos perfil de navegação.
      </p>
      <p>A lista completa do que é guardado no seu navegador:</p>

      <h3>Essenciais (sempre ativos)</h3>
      <ul>
        <li>
          <strong>Sessão do painel administrativo</strong>: cookie criado pelo
          Supabase apenas quando alguém da OutBox faz login em /admin. Se você é
          visitante, esse cookie nunca é criado no seu navegador.
        </li>
        <li>
          <strong>Sua escolha sobre cookies</strong>: guardamos no armazenamento
          local do navegador se você aceitou ou recusou, justamente para não
          perguntar de novo a cada visita. Fica só no seu aparelho.
        </li>
      </ul>

      <h3>Preferências</h3>
      <ul>
        <li>
          <strong>Tema do painel</strong>: lembra se o administrador escolheu modo
          claro ou escuro. Também fica só no aparelho de quem usa o painel.
        </li>
      </ul>

      <h3>Análise e marketing</h3>
      <p>
        Nenhum no momento. Se um dia passarmos a usar, esta página será atualizada
        antes, e a ferramenta só será carregada se você aceitar.
      </p>

      <h2>3. Serviços externos</h2>
      <p>
        As fontes do site são carregadas do Google Fonts e do Fontshare, e as
        imagens do blog vêm do Supabase. Esses serviços recebem o seu endereço de
        IP por serem requisições de rede, o que acontece em qualquer site que use
        recursos externos. Eles não instalam cookies de rastreamento por meio do
        nosso site.
      </p>

      <h2>4. Como mudar a sua escolha</h2>
      <p>
        Você pode rever a sua decisão quando quiser, sem custo e sem burocracia. É
        só usar o botão abaixo.
      </p>
      <GerenciarCookies />
      <p>
        Você também pode apagar cookies e dados de site diretamente nas
        configurações do seu navegador. Bloquear os itens essenciais não afeta a
        navegação pública, apenas o acesso ao painel administrativo.
      </p>

      <h2>5. Documentos relacionados</h2>
      <p>
        Veja também a <Link href="/privacidade">Política de Privacidade</Link> e a
        página <Link href="/lgpd">LGPD e seus direitos</Link>.
      </p>

      <h2>6. Dúvidas</h2>
      <p>
        Fale com a gente em <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalPage>
  );
}
