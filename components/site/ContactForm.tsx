"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { SITE, whatsappLink } from "@/lib/site";
import { OPCOES_SERVICO } from "@/lib/catalogo";
import FormularioLead, { type CampoLead } from "@/components/site/FormularioLead";
import RevealTitle from "@/components/ui/reveal-title";
import MapaOutBox from "@/components/site/MapaOutBox";
import { useI18n } from "@/lib/i18n/client";

/* Campos da jornada "projeto" (briefing de 18/11/2026, seção 08, rota 1). */
const CAMPOS: CampoLead[] = [
  { nome: "nome", rotulo: "Nome", tipo: "texto", obrigatorio: true, autoComplete: "name", placeholder: "Como podemos te chamar?", meia: true },
  { nome: "empresa", rotulo: "Empresa", tipo: "texto", autoComplete: "organization", meia: true },
  { nome: "email", rotulo: "E-mail", tipo: "email", obrigatorio: true, autoComplete: "email", placeholder: "seu@email.com.br", meia: true },
  { nome: "telefone", rotulo: "WhatsApp", tipo: "tel", autoComplete: "tel", placeholder: "(00) 00000-0000", meia: true },
  { nome: "segmento", rotulo: "Segmento", tipo: "texto", placeholder: "Ex.: móveis planejados, clínica, loja", meia: true },
  { nome: "site", rotulo: "Site atual", tipo: "url", placeholder: "https://", meia: true },
  { nome: "servico", rotulo: "Serviço de interesse", tipo: "seletor", obrigatorio: true, placeholder: "Selecione o serviço", opcoes: OPCOES_SERVICO },
  { nome: "mensagem", rotulo: "Qual é o objetivo do projeto?", tipo: "area", placeholder: "O que você precisa resolver?" },
  { nome: "videochamada", rotulo: "Como prefere a primeira conversa?", tipo: "opcoes", opcoes: ["WhatsApp ou e-mail", "Videochamada"] },
];

export default function ContactForm() {
  const { t, href } = useI18n();

  return (
    <section id="contato" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        <div className="card-dark grid gap-10 overflow-hidden p-8 md:p-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Copy */}
          <div className="reveal">
            <span className="pill">
              <span
                aria-hidden
                className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              {t("Vamos conversar")}
            </span>

            <RevealTitle
              as="h2"
              className="mt-6 max-w-[16ch] font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] text-white"
            >
              {t("Vamos entender o seu projeto.")}
            </RevealTitle>

            <p className="mt-5 max-w-[46ch] leading-relaxed text-[var(--color-fg-muted)]">
              {t("Conte o que a sua empresa precisa e a equipe da OutBox avalia o melhor próximo passo. Não é preciso saber qual serviço contratar antes de entrar em contato.")}
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {[
                "Resposta rápida, sem enrolação",
                "Orçamento sob medida para o seu escopo",
                "Sem compromisso de fechar nada",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[14.5px] text-white/85"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
                    <Check
                      className="h-3 w-3 text-[var(--color-brand)]"
                      strokeWidth={3}
                    />
                  </span>
                  {t(item)}
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-white/8 pt-6">
              <p className="text-[13px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
                {t("Prefere ir direto ao ponto?")}
              </p>
              <a
                href={whatsappLink(undefined, t)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex cursor-pointer items-center gap-2 font-display text-lg text-white transition-colors hover:text-[var(--color-brand)]"
              >
                {SITE.phoneDisplay}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Quem não quer contratar execução tem caminho próprio */}
            <div className="mt-7 flex flex-col gap-2.5 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
              <p>
                {t("É empresário e quer um diagnóstico da sua empresa?")}{" "}
                <Link href={href("/consultoria-empresarial")} className="text-white underline underline-offset-4 hover:text-[var(--color-brand)]">
                  {t("Conheça a consultoria")}
                </Link>
              </p>
              <p>
                {t("Quer aprender a prestar serviços digitais?")}{" "}
                <Link href={href("/mentoria")} className="text-white underline underline-offset-4 hover:text-[var(--color-brand)]">
                  {t("Conheça as mentorias")}
                </Link>
              </p>
            </div>
          </div>

          {/* Formulário: jornada "projeto" (contratar a OutBox) */}
          <div className="reveal rounded-[var(--radius-xl2)] border border-white/8 bg-black/40 p-6 md:p-8">
            <FormularioLead
              jornada="projeto"
              campos={CAMPOS}
              botao="Enviar mensagem"
            />
          </div>
        </div>

        <MapaOutBox />
      </div>
    </section>
  );
}
