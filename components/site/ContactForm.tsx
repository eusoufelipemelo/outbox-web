"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Video } from "lucide-react";
import { SERVICE_OPTIONS, SITE, whatsappLink } from "@/lib/site";
import RevealTitle from "@/components/ui/reveal-title";

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [videoCall, setVideoCall] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setStatus("sending");
    setMessage("");

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, videochamada: videoCall }),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json?.error ?? "Falha ao enviar");

      setStatus("ok");
      setMessage(
        "Recebemos a sua mensagem. Em breve o Felipe entra em contato com você."
      );
      form.reset();
      setVideoCall(false);
    } catch {
      setStatus("error");
      setMessage(
        "Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp."
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
              Vamos conversar
            </span>

            <RevealTitle
              as="h2"
              className="mt-6 max-w-[16ch] font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] text-white"
            >
              Conte o que você precisa. A gente responde rápido.
            </RevealTitle>

            <p className="mt-5 max-w-[46ch] leading-relaxed text-[var(--color-fg-muted)]">
              Preencha o formulário e diga qual serviço faz sentido para o seu
              momento. Se preferir conversar olho no olho, marque a opção de
              videochamada que a gente agenda.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5">
              {[
                "Resposta rápida, sem enrolação",
                "Orçamento sob medida para o seu escopo",
                "Sem compromisso de fechar nada",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-[14.5px] text-white/85"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/15">
                    <Check
                      className="h-3 w-3 text-[var(--color-brand)]"
                      strokeWidth={3}
                    />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-9 border-t border-white/8 pt-6">
              <p className="text-[13px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
                Prefere ir direto ao ponto?
              </p>
              <a
                href={whatsappLink()}
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
                Nome <span className="text-[var(--color-brand)]">*</span>
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                E-mail <span className="text-[var(--color-brand)]">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="seu@email.com.br"
                className="field"
              />
            </div>

            <div>
              <label
                htmlFor="servico"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                Tipo de serviço{" "}
                <span className="text-[var(--color-brand)]">*</span>
              </label>
              <select
                id="servico"
                name="servico"
                required
                defaultValue=""
                className="field cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236e6e77%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12"
              >
                <option value="" disabled className="bg-[#121214]">
                  Selecione o serviço
                </option>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-[#121214]">
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="mb-2 block text-[13.5px] font-medium text-white/80"
              >
                Conte um pouco do projeto{" "}
                <span className="text-[var(--color-fg-subtle)]">(opcional)</span>
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                placeholder="O que você precisa resolver?"
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
                  Quero marcar uma videochamada
                </span>
                <span className="mt-0.5 block text-[13px] text-[var(--color-fg-subtle)]">
                  A gente entra em contato para combinar o melhor horário.
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
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem
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
              Seus dados vão direto para a nossa equipe. Sem spam, sem lista de
              e-mail.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
