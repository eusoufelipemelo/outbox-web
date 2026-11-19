"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";

type Status = "idle" | "sending" | "ok" | "error";
const MAX = 2000;

/** Formulário de comentário do artigo. O comentário vai para aprovação antes de aparecer. */
export default function FormComentario({ slug }: { slug: string }) {
  const { t, href, locale } = useI18n();
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");
  const [texto, setTexto] = useState("");

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("sending");
    setErro("");
    const dados = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, slug, idioma: locale }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? "Não foi possível enviar agora.");
      setStatus("ok");
      setTexto("");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErro(t(err instanceof Error ? err.message : "Não foi possível enviar agora."));
    }
  }

  if (status === "ok") {
    return (
      <div role="status" aria-live="polite" className="mt-8 flex items-start gap-4 rounded-[var(--radius-xl2)] border border-[var(--color-brand)]/35 bg-[var(--color-brand)]/[0.07] p-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]">
          <Check className="h-4.5 w-4.5 text-white" strokeWidth={3} aria-hidden />
        </span>
        <div>
          <p className="font-medium text-white">{t("Recebemos o seu comentário.")}</p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
            {t("Ele aparece aqui assim que for aprovado. Se for uma dúvida, a resposta também chega no seu e-mail.")}
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 cursor-pointer text-[14px] text-[var(--color-brand-soft)] underline-offset-4 hover:underline"
          >
            {t("Escrever outro comentário")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="card-dark mt-8 flex flex-col gap-5 p-6 md:p-8">
      <div>
        <h3 className="font-display text-[19px] text-white">{t("Deixe o seu comentário ou dúvida")}</h3>
        <p className="mt-1.5 text-[14px] text-[var(--color-fg-subtle)]">
          {t("Os comentários passam por aprovação antes de aparecer no artigo.")}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-nome" className="mb-2 block text-[13.5px] font-medium text-white/80">
            {t("Nome")} <span className="text-[var(--color-brand)]">*</span>
          </label>
          <input id="c-nome" name="nome" required minLength={2} maxLength={80} autoComplete="name" className="field" placeholder={t("Como podemos te chamar?")} />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-[13.5px] font-medium text-white/80">
            {t("E-mail")} <span className="text-[var(--color-brand)]">*</span>
          </label>
          <input id="c-email" name="email" type="email" required maxLength={160} autoComplete="email" aria-describedby="c-email-dica" className="field" placeholder={t("seu@email.com.br")} />
          <p id="c-email-dica" className="mt-1.5 text-[12.5px] text-[var(--color-fg-subtle)]">
            {t("Não aparece no site. Só usamos para avisar quando respondermos.")}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="c-texto" className="mb-2 block text-[13.5px] font-medium text-white/80">
          {t("Comentário ou dúvida")} <span className="text-[var(--color-brand)]">*</span>
        </label>
        <textarea
          id="c-texto"
          name="texto"
          required
          minLength={3}
          maxLength={MAX}
          rows={4}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          aria-describedby="c-texto-conta"
          className="field resize-y"
          placeholder={t("Escreva aqui o que você achou ou o que ficou na dúvida.")}
        />
        <p id="c-texto-conta" className="mt-1.5 text-right text-[12.5px] text-[var(--color-fg-subtle)]">
          {texto.length}/{MAX}
        </p>
      </div>

      {/* Isca para robôs */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-relaxed text-[var(--color-fg-subtle)]">
          {t("Ao enviar, você concorda com a nossa")}{" "}
          <Link href={href("/privacidade")} className="underline underline-offset-4 hover:text-white">
            {t("Política de Privacidade")}
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex min-h-12 shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[var(--color-brand-cta)] px-6 py-3 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-[var(--color-brand-deep)] disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden />
              {t("Enviando...")}
            </>
          ) : (
            <>
              {t("Enviar comentário")}
              <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[14px] text-red-300">
          {erro}
        </p>
      )}
    </form>
  );
}
