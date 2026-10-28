"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Video } from "lucide-react";
import { SERVICE_OPTIONS, SITE, whatsappLink } from "@/lib/site";
import RevealTitle from "@/components/ui/reveal-title";
import MapaOutBox from "@/components/site/MapaOutBox";
import SeletorServico from "@/components/site/SeletorServico";
import { useI18n } from "@/lib/i18n/client";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [videoCall, setVideoCall] = useState(false);
  const [servico, setServico] = useState("");
  const [servicoInvalido, setServicoInvalido] = useState(false);
  const { t, locale } = useI18n();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (!servico) {
      setServicoInvalido(true);
      document.getElementById("servico")?.focus();
      return;
    }

    setStatus("sending");
    setMessage("");

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, videochamada: videoCall, idioma: locale }),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json?.error ?? "Falha ao enviar");

      setStatus("ok");
      setMessage(
        t("Recebemos a sua mensagem. Em breve o Felipe entra em contato com você.")
      );
      form.reset();
      setServico("");
      setVideoCall(false);
    } catch {
      setStatus("error");
      setMessage(
        t("Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp.")
      );
    }
  }

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
              {t("Conte o que você precisa. A gente responde rápido.")}
            </RevealTitle>

            <p className="mt-5 max-w-[46ch] leading-relaxed text-[var(--color-fg-muted)]">
              {t("Preencha o formulário e diga qual serviço faz sentido para o seu momento. Se preferir conversar olho no olho, marque a opção de videochamada que a gente agenda.")}
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
          </div>

          {/* Formulário */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="reveal flex flex-col gap-4 rounded-[var(--radius-xl2)] border border-white/8 bg-black/40 p-6 md:p-8"
            style={{ transitionDelay: "120ms" }}
          >
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                {t("Nome")} <span className="text-[var(--color-brand)]">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                placeholder={t("Como podemos te chamar?")}
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                {t("E-mail")} <span className="text-[var(--color-brand)]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t("seu@email.com.br")}
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="servico"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                {t("Tipo de serviço")}{" "}
                <span className="text-[var(--color-brand)]">*</span>
              </label>
              {/* O valor enviado é sempre o nome em português: é o que chega no e-mail. */}
              <SeletorServico
                id="servico"
                name="servico"
                opcoes={SERVICE_OPTIONS.map((o) => ({ valor: o, rotulo: t(o) }))}
                valor={servico}
                aoMudar={(v) => {
                  setServico(v);
                  setServicoInvalido(false);
                }}
                placeholder={t("Selecione o serviço")}
                invalido={servicoInvalido}
              />
              {servicoInvalido && (
                <p role="alert" className="mt-2 text-[13px] text-red-300">
                  {t("Escolha o tipo de serviço para continuar.")}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                {t("Conte um pouco do projeto")}{" "}
                <span className="text-[var(--color-fg-subtle)]">{t("(opcional)")}</span>
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                placeholder={t("O que você precisa resolver?")}
                className="field resize-none"
              />
            </div>

            {/* Videochamada */}
            <button
              type="button"
              onClick={() => setVideoCall((v) => !v)}
              aria-pressed={videoCall}
              className={`flex cursor-pointer items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 ${
                videoCall
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all duration-300 ${
                  videoCall
                    ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                    : "border-white/25"
                }`}
              >
                {videoCall && (
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.2} />
                )}
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2 text-[14.5px] font-medium text-white">
                  <Video className="h-4 w-4 text-[var(--color-brand)]" />
                  {t("Quero marcar uma videochamada")}
                </span>
                <span className="mt-0.5 block text-[13px] text-[var(--color-fg-subtle)]">
                  {t("A gente entra em contato para combinar o melhor horário.")}
                </span>
              </span>
            </button>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group mt-1 flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[var(--color-brand)] px-6 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[var(--color-brand-deep)] hover:shadow-[0_14px_36px_rgba(241,85,50,0.32)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  {t("Enviando...")}
                </>
              ) : (
                <>
                  {t("Enviar mensagem")}
                  <ArrowUpRight
                    className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.4}
                  />
                </>
              )}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-xl border px-4 py-3 text-[14px] ${
                  status === "ok"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-red-500/30 bg-red-500/10 text-red-300"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-center text-[12.5px] leading-relaxed text-[var(--color-fg-subtle)]">
              {t("Seus dados vão direto para a nossa equipe. Sem spam, sem lista de e-mail.")}
            </p>
          </form>
        </div>

        <MapaOutBox />
      </div>
    </section>
  );
}
