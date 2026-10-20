"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Loader2, Video } from "lucide-react";
import { SERVICE_OPTIONS, SITE, whatsappLink } from "@/lib/site";
import Logo3D from "@/components/site/Logo3D";

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
    <section id="contato" className="scroll-mt-16 bg-[var(--color-creme)] pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="container-outbox">
        {/* Elemento 3D + chamada, como o "Ready to Grow Your Brand?" da referência */}
        <div className="mx-auto max-w-[720px] text-center">
          <Logo3D />
          <h2 className="v3-titulo mt-14">Conte o que você precisa. A gente responde rápido.</h2>
          <p className="v3-sub mx-auto mt-5 max-w-[56ch] !text-[16.5px]">
            Preencha o formulário e diga qual serviço faz sentido para o seu momento. Se preferir
            conversar olho no olho, marque a opção de videochamada que a gente agenda.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1000px] items-start gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col gap-8 rounded-[24px] bg-[var(--color-breu)] p-7 text-white md:p-9 lg:sticky lg:top-28">
            <ul className="flex flex-col gap-4">
              {[
                "Resposta rápida, sem enrolação",
                "Orçamento sob medida para o seu escopo",
                "Sem compromisso de fechar nada",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-snug">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
                    <Check className="h-3.5 w-3.5 text-[var(--color-breu)]" strokeWidth={3.2} aria-hidden />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="border-t border-white/12 pt-6">
              <p className="text-[14px] text-[#a1a1a1]">Prefere ir direto ao ponto?</p>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 text-[22px] font-bold tracking-[-0.01em] transition-colors hover:text-[var(--color-brand)]"
              >
                {SITE.phoneDisplay}
                <ArrowUpRight className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 rounded-[24px] bg-white p-6 md:p-8">
            <div>
              <label htmlFor="nome" className="mb-2 block text-[14.5px] font-semibold">
                Nome <span className="text-[var(--color-acao)]">*</span>
              </label>
              <input id="nome" name="nome" type="text" required autoComplete="name" placeholder="Como podemos te chamar?" className="v3-campo" />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-[14.5px] font-semibold">
                E-mail <span className="text-[var(--color-acao)]">*</span>
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" placeholder="seu@email.com.br" className="v3-campo" />
            </div>

            <div>
              <label htmlFor="servico" className="mb-2 block text-[14.5px] font-semibold">
                Tipo de serviço <span className="text-[var(--color-acao)]">*</span>
              </label>
              <select
                id="servico"
                name="servico"
                required
                defaultValue=""
                className="v3-campo cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230a0a0a%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12"
              >
                <option value="" disabled>
                  Selecione o serviço
                </option>
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mensagem" className="mb-2 block text-[14.5px] font-semibold">
                Conte um pouco do projeto <span className="font-normal text-[var(--color-cinza)]">(opcional)</span>
              </label>
              <textarea id="mensagem" name="mensagem" rows={3} placeholder="O que você precisa resolver?" className="v3-campo resize-none" />
            </div>

            <button
              type="button"
              onClick={() => setVideoCall((v) => !v)}
              aria-pressed={videoCall}
              className={`flex cursor-pointer items-center gap-3.5 rounded-[14px] border p-4 text-left transition-colors duration-300 ${
                videoCall ? "border-[var(--color-acao)] bg-[#fdeee9]" : "border-[var(--color-borda)] hover:border-[#c9c2b6]"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors duration-300 ${
                  videoCall ? "border-[var(--color-acao)] bg-[var(--color-acao)]" : "border-[#c9c2b6]"
                }`}
              >
                {videoCall && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3.2} aria-hidden />}
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-2 text-[15px] font-semibold">
                  <Video className="h-4 w-4 text-[var(--color-acao)]" aria-hidden />
                  Quero marcar uma videochamada
                </span>
                <span className="mt-0.5 block text-[13.5px] text-[var(--color-cinza)]">
                  A gente entra em contato para combinar o melhor horário.
                </span>
              </span>
            </button>

            <button type="submit" disabled={status === "sending"} className="v3-btn mt-1 w-full !min-h-[54px] disabled:cursor-not-allowed disabled:opacity-60">
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar mensagem
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </>
              )}
            </button>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-[12px] px-4 py-3 text-[14.5px] ${
                  status === "ok" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-center text-[13px] leading-relaxed text-[var(--color-cinza)]">
              Seus dados vão direto para a nossa equipe. Sem spam, sem lista de e-mail.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
