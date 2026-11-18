"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";
import { evento, obterOrigem } from "@/lib/rastreio";
import type { Jornada } from "@/lib/leads";
import SeletorServico from "@/components/site/SeletorServico";

/* Formulário único das jornadas de lead. Cada página passa os próprios campos
   (em português: o rótulo é a chave de tradução e também o nome que aparece
   no e-mail). Nome, e-mail, WhatsApp e empresa vão para os campos fixos do
   lead; o resto segue em "campos". */

export type CampoLead = {
  nome: string;
  rotulo: string;
  tipo: "texto" | "email" | "tel" | "url" | "area" | "seletor" | "opcoes";
  obrigatorio?: boolean;
  placeholder?: string;
  ajuda?: string;
  autoComplete?: string;
  opcoes?: string[];
  /** Ocupa meia linha no computador. */
  meia?: boolean;
};

const FIXOS = ["nome", "email", "telefone", "empresa", "servico", "mensagem", "videochamada"];

export default function FormularioLead({
  jornada,
  campos,
  servicoPadrao,
  botao,
  aviso,
}: {
  jornada: Jornada;
  campos: CampoLead[];
  /** Valor de "serviço" quando o formulário não pergunta (ex.: consultoria). */
  servicoPadrao?: string;
  botao: string;
  /** Frase curta acima do botão (ex.: "Entrar na lista não confirma vaga"). */
  aviso?: string;
}) {
  const { t, href, locale } = useI18n();
  const router = useRouter();
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [escolhas, setEscolhas] = useState<Record<string, string>>({});
  const [faltando, setFaltando] = useState<string | null>(null);
  const comecou = useRef(false);

  function comecar() {
    if (comecou.current) return;
    comecou.current = true;
    evento("form_start", { jornada });
  }

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const semEscolha = campos.find((c) => (c.tipo === "seletor" || c.tipo === "opcoes") && c.obrigatorio && !escolhas[c.nome]);
    if (semEscolha) {
      setFaltando(semEscolha.nome);
      document.getElementById(`lead-${semEscolha.nome}`)?.focus();
      return;
    }

    setEnviando(true);
    setErro("");
    const dados = new FormData(form);
    const valor = (nome: string) => String(dados.get(nome) ?? escolhas[nome] ?? "").trim();
    const extras: Record<string, string> = {};
    for (const c of campos) {
      if (FIXOS.includes(c.nome)) continue;
      const v = c.tipo === "seletor" || c.tipo === "opcoes" ? escolhas[c.nome] ?? "" : valor(c.nome);
      if (v) extras[c.rotulo] = v;
    }

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jornada,
          nome: valor("nome"),
          email: valor("email"),
          telefone: valor("telefone"),
          empresa: valor("empresa"),
          servico: escolhas.servico || servicoPadrao || "",
          mensagem: valor("mensagem"),
          videochamada: escolhas.videochamada === "Videochamada",
          campos: extras,
          visita: obterOrigem(),
          pagina: window.location.pathname,
          consentimento: dados.get("consentimento") === "sim",
          novidades: dados.get("novidades") === "sim",
          idioma: locale,
          website: valor("website"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? "Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp.");
      evento("generate_lead", { jornada });
      router.push(href(`/obrigado?origem=${jornada}`));
    } catch (err) {
      setErro(t(err instanceof Error ? err.message : "Não conseguimos enviar agora. Tente novamente ou fale direto no WhatsApp."));
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} onFocus={comecar} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {campos.map((c) => {
          const id = `lead-${c.nome}`;
          const largura = c.meia ? "" : "sm:col-span-2";
          const rotulo = (
            <span className="mb-2 block text-[13.5px] font-medium text-white/80">
              {t(c.rotulo)} {c.obrigatorio ? <span className="text-[var(--color-brand)]">*</span> : <span className="text-[var(--color-fg-subtle)]">{t("(opcional)")}</span>}
            </span>
          );
          const ajuda = c.ajuda && <p id={`${id}-ajuda`} className="mt-1.5 text-[12.5px] text-[var(--color-fg-subtle)]">{t(c.ajuda)}</p>;

          if (c.tipo === "seletor") {
            return (
              <div key={c.nome} className={largura}>
                <label htmlFor={id}>{rotulo}</label>
                <SeletorServico
                  id={id}
                  name={c.nome}
                  opcoes={(c.opcoes ?? []).map((o) => ({ valor: o, rotulo: t(o) }))}
                  valor={escolhas[c.nome] ?? ""}
                  aoMudar={(v) => {
                    setEscolhas((s) => ({ ...s, [c.nome]: v }));
                    setFaltando(null);
                  }}
                  placeholder={t(c.placeholder ?? "Selecione")}
                  invalido={faltando === c.nome}
                />
                {faltando === c.nome && <p role="alert" className="mt-2 text-[13px] text-red-300">{t("Escolha uma opção para continuar.")}</p>}
                {ajuda}
              </div>
            );
          }

          if (c.tipo === "opcoes") {
            return (
              <fieldset key={c.nome} className={largura}>
                <legend className="contents">{rotulo}</legend>
                <div role="radiogroup" id={id} tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                  {(c.opcoes ?? []).map((o) => {
                    const ativo = escolhas[c.nome] === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        role="radio"
                        aria-checked={ativo}
                        onClick={() => {
                          setEscolhas((s) => ({ ...s, [c.nome]: o }));
                          setFaltando(null);
                        }}
                        className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[14px] transition-colors duration-200 ${
                          ativo
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)]/12 text-white"
                            : "border-white/12 text-white/75 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {ativo && <Check className="h-3.5 w-3.5 text-[var(--color-brand)]" strokeWidth={3} aria-hidden />}
                        {t(o)}
                      </button>
                    );
                  })}
                </div>
                {faltando === c.nome && <p role="alert" className="mt-2 text-[13px] text-red-300">{t("Escolha uma opção para continuar.")}</p>}
                {ajuda}
              </fieldset>
            );
          }

          const comum = {
            id,
            name: c.nome,
            required: c.obrigatorio,
            placeholder: c.placeholder ? t(c.placeholder) : undefined,
            autoComplete: c.autoComplete,
            "aria-describedby": c.ajuda ? `${id}-ajuda` : undefined,
            className: c.tipo === "area" ? "field resize-y" : "field",
          };
          return (
            <div key={c.nome} className={largura}>
              <label htmlFor={id}>{rotulo}</label>
              {c.tipo === "area" ? (
                <textarea {...comum} rows={4} maxLength={1500} />
              ) : (
                <input {...comum} type={c.tipo === "texto" ? "text" : c.tipo} maxLength={c.tipo === "url" ? 300 : 160} />
              )}
              {ajuda}
            </div>
          );
        })}
      </div>

      {/* Isca para robôs */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-white/85">
          <input type="checkbox" name="consentimento" value="sim" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand)]" />
          <span>
            {t("Concordo que a OutBox use estes dados para responder à minha solicitação, conforme a")}{" "}
            <Link href={href("/privacidade")} className="underline underline-offset-4 hover:text-white">
              {t("Política de Privacidade")}
            </Link>
            . <span className="text-[var(--color-brand)]">*</span>
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-[var(--color-fg-muted)]">
          <input type="checkbox" name="novidades" value="sim" className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand)]" />
          <span>{t("Quero receber novidades sobre serviços e mentorias (opcional).")}</span>
        </label>
      </div>

      {aviso && <p className="text-[13.5px] leading-relaxed text-[var(--color-fg-subtle)]">{t(aviso)}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="group flex min-h-14 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[var(--color-brand)] px-6 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[var(--color-brand-deep)] hover:shadow-[0_14px_40px_rgba(241,85,50,0.35)] disabled:opacity-60"
      >
        {enviando ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden />
            {t("Enviando...")}
          </>
        ) : (
          <>
            {t(botao)}
            <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.4} aria-hidden />
          </>
        )}
      </button>

      {erro && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[14px] text-red-300">
          {erro}
        </p>
      )}
    </form>
  );
}
