"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ExternalLink, Loader2, MessageCircle, Reply, Trash2, X } from "lucide-react";
import type { Comentario } from "@/lib/comentarios";
import { localizar, SIGLA_IDIOMA } from "@/lib/i18n/config";

type Aba = "pendente" | "aprovado" | "recusado";
const ABAS: { id: Aba; rotulo: string }[] = [
  { id: "pendente", rotulo: "Para aprovar" },
  { id: "aprovado", rotulo: "Publicados" },
  { id: "recusado", rotulo: "Recusados" },
];

export default function ModeracaoComentarios({
  comentarios,
  titulos,
}: {
  comentarios: Comentario[];
  titulos: Record<string, string>;
}) {
  const router = useRouter();
  const [aba, setAba] = useState<Aba>("pendente");
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [respondendo, setRespondendo] = useState<string | null>(null);
  const [rascunho, setRascunho] = useState("");
  const [aviso, setAviso] = useState<{ tipo: "ok" | "erro"; texto: string } | null>(null);

  const daAba = comentarios.filter((c) => c.status === aba);
  const conta = (a: Aba) => comentarios.filter((c) => c.status === a).length;

  async function agir(c: Comentario, acao: "aprovar" | "recusar" | "responder" | "apagar") {
    if (acao === "apagar" && !window.confirm(`Apagar de vez o comentário de ${c.nome}? Não dá para desfazer.`)) return;
    setOcupado(c.id);
    setAviso(null);
    try {
      const res = await fetch("/api/admin/comentarios", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: c.id, acao, resposta: acao === "responder" ? rascunho : undefined }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error ?? "Não foi possível salvar.");
      const textos = {
        aprovar: "Comentário publicado no artigo.",
        recusar: "Comentário recusado. Ele não aparece no artigo.",
        apagar: "Comentário apagado.",
        responder: json.avisado
          ? `Resposta publicada e enviada para ${c.email}.`
          : "Resposta publicada. O e-mail para a pessoa não saiu (confira o SMTP).",
      };
      setAviso({ tipo: "ok", texto: textos[acao] });
      setRespondendo(null);
      setRascunho("");
      router.refresh();
    } catch (e) {
      setAviso({ tipo: "erro", texto: e instanceof Error ? e.message : "Não foi possível salvar." });
    } finally {
      setOcupado(null);
    }
  }

  return (
    <>
      <div role="tablist" aria-label="Situação dos comentários" className="mt-8 flex flex-wrap gap-2">
        {ABAS.map((a) => (
          <button
            key={a.id}
            role="tab"
            type="button"
            aria-selected={aba === a.id}
            onClick={() => setAba(a.id)}
            className="admin-btn"
            style={
              aba === a.id
                ? { background: "var(--a-brand)", color: "#fff", borderColor: "var(--a-brand)" }
                : { background: "var(--a-hover)" }
            }
          >
            {a.rotulo} <span style={{ opacity: 0.75 }}>({conta(a.id)})</span>
          </button>
        ))}
      </div>

      {aviso && (
        <p
          role="status"
          className="mt-5 rounded-xl border px-4 py-3 text-[13.5px]"
          style={
            aviso.tipo === "ok"
              ? { borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)", color: "#6ee7b7" }
              : { borderColor: "rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.08)", color: "#fca5a5" }
          }
        >
          {aviso.texto}
        </p>
      )}

      {daAba.length === 0 ? (
        <div className="admin-panel mt-6 flex flex-col items-center px-6 py-16 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "var(--a-hover)" }}>
            <MessageCircle className="h-6 w-6" style={{ color: "var(--a-muted)" }} />
          </span>
          <h2 className="mt-5 font-display text-[19px] font-semibold">
            {aba === "pendente" ? "Nada para aprovar" : aba === "aprovado" ? "Nenhum comentário publicado" : "Nenhum recusado"}
          </h2>
          <p className="mt-2 max-w-[42ch] text-[14.5px]" style={{ color: "var(--a-muted)" }}>
            {aba === "pendente"
              ? "Quando alguém comentar num artigo, o comentário aparece aqui e chega no seu e-mail."
              : "Os comentários desta situação aparecem aqui."}
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {daAba.map((c) => {
            const link = `${localizar(c.idioma ?? "pt", `/blog/${c.post_slug}`)}#comentarios`;
            const carregando = ocupado === c.id;
            return (
              <article key={c.id} className="admin-panel p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-[17px] font-semibold">{c.nome}</h2>
                    <a href={`mailto:${c.email}`} className="text-[13.5px] hover:underline" style={{ color: "var(--a-brand)" }}>
                      {c.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[12.5px]" style={{ color: "var(--a-subtle)" }}>
                    <span className="rounded-full px-2.5 py-1" style={{ background: "var(--a-hover)" }}>
                      {SIGLA_IDIOMA[c.idioma ?? "pt"]}
                    </span>
                    {new Date(c.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                </div>

                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] hover:underline"
                  style={{ background: "var(--a-hover)", color: "var(--a-muted)" }}
                >
                  {titulos[c.post_slug] ?? c.post_slug}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <p className="mt-3 whitespace-pre-line text-[14.5px] leading-relaxed">{c.texto}</p>

                {c.resposta && respondendo !== c.id && (
                  <div className="mt-4 rounded-xl border-l-2 px-4 py-3" style={{ borderColor: "var(--a-brand)", background: "var(--a-hover)" }}>
                    <p className="text-[12.5px] font-medium" style={{ color: "var(--a-brand)" }}>
                      Sua resposta
                    </p>
                    <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed" style={{ color: "var(--a-muted)" }}>
                      {c.resposta}
                    </p>
                  </div>
                )}

                {respondendo === c.id && (
                  <div className="mt-4">
                    <label htmlFor={`r-${c.id}`} className="mb-1.5 block text-[13px] font-medium">
                      Resposta (vai para o artigo e para o e-mail de {c.nome})
                    </label>
                    <textarea
                      id={`r-${c.id}`}
                      className="admin-input resize-y"
                      rows={4}
                      value={rascunho}
                      onChange={(e) => setRascunho(e.target.value)}
                      autoFocus
                    />
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {respondendo === c.id ? (
                    <>
                      <button type="button" className="admin-btn admin-btn--primary" disabled={carregando || rascunho.trim().length < 2} onClick={() => agir(c, "responder")}>
                        {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Reply className="h-4 w-4" />}
                        Publicar resposta e avisar
                      </button>
                      <button type="button" className="admin-btn admin-btn--ghost" onClick={() => setRespondendo(null)}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      {c.status !== "aprovado" && (
                        <button type="button" className="admin-btn admin-btn--primary" disabled={carregando} onClick={() => agir(c, "aprovar")}>
                          {carregando ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                          Aprovar
                        </button>
                      )}
                      <button
                        type="button"
                        className="admin-btn admin-btn--ghost"
                        disabled={carregando}
                        onClick={() => {
                          setRespondendo(c.id);
                          setRascunho(c.resposta ?? "");
                        }}
                      >
                        <Reply className="h-4 w-4" />
                        {c.resposta ? "Editar resposta" : "Responder"}
                      </button>
                      {c.status !== "recusado" && (
                        <button type="button" className="admin-btn admin-btn--ghost" disabled={carregando} onClick={() => agir(c, "recusar")}>
                          <X className="h-4 w-4" />
                          {c.status === "aprovado" ? "Tirar do ar" : "Recusar"}
                        </button>
                      )}
                      <button type="button" className="admin-btn admin-btn--ghost" disabled={carregando} onClick={() => agir(c, "apagar")}>
                        <Trash2 className="h-4 w-4" />
                        Apagar
                      </button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
