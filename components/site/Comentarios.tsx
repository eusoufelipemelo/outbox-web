import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { comentariosAprovados } from "@/lib/comentarios";
import { INTL } from "@/lib/i18n/config";
import { getT } from "@/lib/i18n/server";
import FormComentario from "@/components/site/FormComentario";

/** Comentários e dúvidas no fim de cada artigo. Só aparecem os aprovados no painel. */
export default async function Comentarios({ slug }: { slug: string }) {
  const { t, locale } = getT();
  const lista = await comentariosAprovados(slug);
  const data = (v: string) =>
    new Date(v).toLocaleDateString(INTL[locale], { day: "2-digit", month: "long", year: "numeric" });

  return (
    <section id="comentarios" aria-labelledby="comentarios-titulo" className="mx-auto mt-16 max-w-[760px] scroll-mt-28">
      <h2 id="comentarios-titulo" className="flex items-center gap-3 font-display text-[clamp(1.4rem,3vw,1.9rem)] text-white">
        <MessageCircle className="h-6 w-6 text-[var(--color-brand)]" aria-hidden />
        {t("Comentários e dúvidas")}
        {lista.length > 0 && <span className="text-[var(--color-fg-subtle)]">({lista.length})</span>}
      </h2>

      {lista.length === 0 ? (
        <p className="mt-4 leading-relaxed text-[var(--color-fg-muted)]">
          {t("Ninguém comentou ainda. Tire a sua dúvida ou conte como é aí na sua empresa.")}
        </p>
      ) : (
        <ol className="mt-8 flex flex-col gap-4">
          {lista.map((c) => (
            <li key={c.id} className="rounded-[var(--radius-xl2)] border border-white/8 bg-white/[0.02] p-6">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/8 font-display text-[15px] text-white"
                >
                  {c.nome.trim().charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-medium text-white">{c.nome}</p>
                  <p className="text-[13px] text-[var(--color-fg-subtle)]">
                    <time dateTime={c.created_at}>{data(c.created_at)}</time>
                  </p>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-white/85">{c.texto}</p>

              {c.resposta && (
                <div className="mt-5 rounded-2xl border-l-2 border-[var(--color-brand)] bg-[var(--color-brand)]/[0.06] p-5">
                  <p className="flex items-center gap-2.5 text-[14px] font-medium text-white">
                    <Image src="/brand/outbox-simbolo.svg" alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                    {t("Resposta da OutBox")}
                  </p>
                  <p className="mt-2.5 whitespace-pre-line leading-relaxed text-[var(--color-fg-muted)]">{c.resposta}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      )}

      <FormComentario slug={slug} />
    </section>
  );
}
