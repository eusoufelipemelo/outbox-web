"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { FM_ASSUNTOS, type Assunto } from "@/lib/felipemelo";
import s from "./fm.module.css";

const EVENTO = "fm:assunto";

/** Botão que leva ao formulário já com o assunto escolhido. */
export function EscolherAssunto({ assunto, children }: { assunto: Assunto; children: ReactNode }) {
  return (
    <a
      href="#contato"
      onClick={() => window.dispatchEvent(new CustomEvent(EVENTO, { detail: assunto }))}
      className={`${s.btn} ${s.btnLinha} !min-h-11 !px-5 !text-[15px]`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
    </a>
  );
}

type Status = "idle" | "sending" | "ok" | "error";

export default function ContatoFM() {
  const [assunto, setAssunto] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const ouvir = (e: Event) => setAssunto((e as CustomEvent<string>).detail);
    window.addEventListener(EVENTO, ouvir);
    return () => window.removeEventListener(EVENTO, ouvir);
  }, []);

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
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, servico: dados.assunto, origem: "felipemelo" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? "Falha ao enviar");
      setStatus("ok");
      form.reset();
      setAssunto("");
    } catch {
      setStatus("error");
      setErro("A mensagem não foi enviada. Tente de novo ou chame no WhatsApp ao lado.");
    }
  }

  if (status === "ok") {
    return (
      <div role="status" aria-live="polite" className="flex h-full flex-col items-start justify-center rounded-[24px] bg-white p-8 md:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f15532]">
          <Check className="h-6 w-6 text-black" strokeWidth={3} aria-hidden />
        </span>
        <h3 className="mt-6 text-[26px] font-bold tracking-[-0.03em] text-black">Mensagem enviada.</h3>
        <p className="mt-3 max-w-[40ch] text-[16.5px] leading-relaxed text-[#4a4340]">
          Ela chegou no meu e-mail. Eu leio pessoalmente e respondo no endereço que você informou.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={`${s.btn} ${s.btnLinha} mt-8`}>
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4 rounded-[24px] bg-white p-6 md:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="fm-nome" rotulo="Seu nome" obrigatorio>
          <input id="fm-nome" name="nome" required autoComplete="name" className={s.campo} placeholder="Nome e sobrenome" />
        </Campo>
        <Campo id="fm-empresa" rotulo="Empresa ou marca">
          <input id="fm-empresa" name="empresa" autoComplete="organization" className={s.campo} placeholder="Opcional" />
        </Campo>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="fm-email" rotulo="E-mail" obrigatorio>
          <input id="fm-email" name="email" type="email" required autoComplete="email" className={s.campo} placeholder="voce@empresa.com.br" />
        </Campo>
        <Campo id="fm-tel" rotulo="WhatsApp">
          <input id="fm-tel" name="telefone" type="tel" autoComplete="tel" inputMode="tel" className={s.campo} placeholder="Opcional" />
        </Campo>
      </div>
      <Campo id="fm-assunto" rotulo="Assunto" obrigatorio>
        <select
          id="fm-assunto"
          name="assunto"
          required
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
          className={`${s.campo} cursor-pointer appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23000%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_16px_center] bg-no-repeat pr-12`}
        >
          <option value="" disabled>
            Escolha o assunto
          </option>
          {FM_ASSUNTOS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Campo>
      <Campo id="fm-msg" rotulo="Conte o que você tem em mente" obrigatorio>
        <textarea
          id="fm-msg"
          name="mensagem"
          required
          rows={4}
          className={`${s.campo} resize-none`}
          placeholder="O projeto, a parceria ou a ideia de patrocínio, e o prazo que você imagina."
        />
      </Campo>
      {/* Isca para robôs */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button type="submit" disabled={status === "sending"} className={`${s.btn} ${s.btnTinta} mt-1 w-full disabled:opacity-60`}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Enviando
          </>
        ) : (
          <>
            Enviar mensagem
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </>
        )}
      </button>
      {status === "error" && (
        <p role="alert" className="rounded-[12px] border-l-4 border-[#d93b2b] bg-[#fbf9f8] px-4 py-3 text-[15px] text-black">
          {erro}
        </p>
      )}
      <p className="text-[14px] leading-relaxed text-[#6b6b6b]">
        A mensagem chega direto no meu e-mail. Seus dados servem só para eu te responder.
      </p>
    </form>
  );
}

function Campo({ id, rotulo, obrigatorio, children }: { id: string; rotulo: string; obrigatorio?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[15px] font-semibold text-black">
        {rotulo}
        {obrigatorio && <span className="text-[#b8330f]"> *</span>}
      </label>
      {children}
    </div>
  );
}
