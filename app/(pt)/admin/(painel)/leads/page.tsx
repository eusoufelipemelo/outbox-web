import { Inbox, Video } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  nome: string;
  email: string;
  servico: string;
  mensagem: string | null;
  videochamada: boolean;
  created_at: string;
};

export default async function LeadsPage() {
  let leads: Lead[] = [];
  let dbError: string | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) dbError = error.message;
    else leads = (data ?? []) as Lead[];
  } else {
    dbError = "Credenciais do Supabase ainda não configuradas.";
  }

  return (
    <div>
      <header>
        <h1 className="font-display text-[28px] font-semibold">Leads</h1>
        <p className="mt-1.5 text-[14.5px]" style={{ color: "var(--a-muted)" }}>
          Contatos que chegaram pelo formulário do site.
        </p>
      </header>

      {dbError && (
        <div
          className="mt-6 rounded-xl border px-4 py-3.5 text-[13.5px]"
          style={{
            borderColor: "rgba(251,191,36,0.3)",
            background: "rgba(251,191,36,0.08)",
            color: "#fcd34d",
          }}
        >
          {dbError}
        </div>
      )}

      {leads.length === 0 ? (
        <div className="admin-panel mt-8 flex flex-col items-center px-6 py-16 text-center">
          <span
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ background: "var(--a-hover)" }}
          >
            <Inbox className="h-6 w-6" style={{ color: "var(--a-muted)" }} />
          </span>
          <h2 className="mt-5 font-display text-[19px] font-semibold">
            Nenhum contato ainda
          </h2>
          <p
            className="mt-2 max-w-[40ch] text-[14.5px]"
            style={{ color: "var(--a-muted)" }}
          >
            Assim que alguém preencher o formulário do site, o contato aparece
            aqui e também chega no seu e-mail.
          </p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-3">
          {leads.map((lead) => (
            <article key={lead.id} className="admin-panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-[17px] font-semibold">
                    {lead.nome}
                  </h2>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-[13.5px] hover:underline"
                    style={{ color: "var(--a-brand)" }}
                  >
                    {lead.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {lead.videochamada && (
                    <span
                      className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium"
                      style={{
                        background: "rgba(241,85,50,0.14)",
                        color: "var(--a-brand)",
                      }}
                    >
                      <Video className="h-3.5 w-3.5" />
                      Quer videochamada
                    </span>
                  )}
                  <span
                    className="text-[12.5px]"
                    style={{ color: "var(--a-subtle)" }}
                  >
                    {new Date(lead.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <p
                className="mt-3 inline-block rounded-full px-3 py-1.5 text-[12.5px]"
                style={{ background: "var(--a-hover)", color: "var(--a-muted)" }}
              >
                {lead.servico}
              </p>

              {lead.mensagem && (
                <p
                  className="mt-3 text-[14.5px] leading-relaxed"
                  style={{ color: "var(--a-muted)" }}
                >
                  {lead.mensagem}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
