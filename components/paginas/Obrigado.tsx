import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Ambience from "@/components/site/Ambience";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { getT } from "@/lib/i18n/server";
import { traduzir, type Locale } from "@/lib/i18n/config";
import { DICIONARIOS } from "@/lib/i18n/dicionarios";
import { ehJornada, type Jornada } from "@/lib/leads";

/** Confirmação depois de qualquer formulário de jornada. Fora do Google (noindex). */

const MENSAGENS: Record<Jornada | "padrao", { titulo: string; texto: string }> = {
  projeto: {
    titulo: "Recebemos o seu pedido.",
    texto: "A equipe da OutBox vai avaliar o melhor próximo passo e responder pelo canal que você informou.",
  },
  consultoria: {
    titulo: "Recebemos o seu interesse na consultoria.",
    texto: "Felipe vai ler o que você contou e responder para combinar a conversa inicial, que serve para verificar escopo e adequação.",
  },
  "mentoria-individual": {
    titulo: "Recebemos o seu pedido de avaliação.",
    texto: "Felipe vai avaliar o seu perfil e responder com os próximos passos da mentoria individual.",
  },
  "mentoria-grupo": {
    titulo: "Você está na lista de interesse.",
    texto: "Quando a próxima turma tiver data, vagas e valor definidos, você recebe as informações antes de todo mundo.",
  },
  padrao: {
    titulo: "Recebemos o seu interesse.",
    texto: "Suas informações foram enviadas.",
  },
};

export function metadataObrigado(locale: Locale): Metadata {
  return { title: traduzir(DICIONARIOS[locale], "Recebemos o seu interesse."), robots: { index: false, follow: false } };
}

export default function Obrigado({ origem }: { origem?: string }) {
  const { t, href } = getT();
  const m = MENSAGENS[ehJornada(origem) ? origem : "padrao"];
  const links = [
    { rotulo: "Ler o blog", href: "/blog" },
    { rotulo: "Conhecer os serviços", href: "/#servicos" },
    { rotulo: "Voltar ao início", href: "/" },
  ];

  return (
    <>
      <Ambience />
      <Navbar />
      <main>
        <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="glow glow--brand absolute -top-40 left-1/2 h-[480px] w-[640px] -translate-x-1/2" />
          </div>
          <div className="container-outbox relative z-10 flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)] shadow-[0_18px_50px_rgba(241,85,50,0.45)]">
              <Check className="h-8 w-8 text-white" strokeWidth={3} aria-hidden />
            </span>
            <h1 className="mt-8 max-w-[18ch] font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-white">{t(m.titulo)}</h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-relaxed text-[var(--color-fg-muted)]">{t(m.texto)}</p>
            <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-[var(--color-fg-subtle)]">
              {t("Em breve entraremos em contato pelo canal informado, conforme a disponibilidade de atendimento. Enquanto isso, você pode explorar outros conteúdos da OutBox.")}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={href(l.href)}
                  className="group flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/14 px-6 text-[15px] text-white/85 transition-colors hover:border-white/30 hover:text-white"
                >
                  {t(l.rotulo)}
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
