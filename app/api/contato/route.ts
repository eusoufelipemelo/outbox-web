import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type Payload = {
  nome?: string;
  email?: string;
  servico?: string;
  mensagem?: string;
  videochamada?: boolean;
  /** Campo isca contra robôs: se vier preenchido, é spam. */
  website?: string;
};

const RATE = new Map<string, { count: number; reset: number }>();

/** Limite simples: 5 envios a cada 10 minutos por IP. */
function rateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const entry = RATE.get(ip);

  if (!entry || now > entry.reset) {
    RATE.set(ip, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "desconhecido";

    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Muitas tentativas. Aguarde alguns minutos." },
        { status: 429 }
      );
    }

    const body = (await request.json()) as Payload;

    // Armadilha para robôs
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const nome = (body.nome ?? "").trim();
    const email = (body.email ?? "").trim();
    const servico = (body.servico ?? "").trim();
    const mensagem = (body.mensagem ?? "").trim();
    const videochamada = Boolean(body.videochamada);

    if (!nome || !email || !servico) {
      return NextResponse.json(
        { error: "Preencha nome, e-mail e tipo de serviço." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    let saved = false;
    let mailed = false;

    // 1) Guarda o lead no Supabase para nada se perder
    try {
      const admin = createAdminClient();
      if (admin) {
        const { error } = await admin.from("leads").insert({
          nome,
          email,
          servico,
          mensagem: mensagem || null,
          videochamada,
          origem: "site",
        });
        saved = !error;
      }
    } catch {
      // Segue para o e-mail mesmo se o banco falhar
    }

    // 2) Envia o e-mail para o Felipe
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      const port = Number(process.env.SMTP_PORT ?? 587);
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      const linhas = [
        ["Nome", nome],
        ["E-mail", email],
        ["Serviço", servico],
        ["Videochamada", videochamada ? "Sim, quer agendar" : "Não"],
        ["Mensagem", mensagem || "(não informada)"],
      ];

      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#f5f7f9;padding:28px">
          <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e6e9ec">
            <div style="background:#0a0a0a;padding:22px 26px">
              <span style="color:#fff;font-size:18px;font-weight:600">Novo contato pelo site</span>
              ${
                videochamada
                  ? '<span style="display:inline-block;margin-left:10px;background:#F15532;color:#fff;font-size:12px;padding:4px 10px;border-radius:99px">Quer videochamada</span>'
                  : ""
              }
            </div>
            <table style="width:100%;border-collapse:collapse">
              ${linhas
                .map(
                  ([k, v]) => `
                <tr>
                  <td style="padding:14px 26px;border-bottom:1px solid #eef1f4;color:#6b6f76;font-size:13px;width:130px;vertical-align:top">${k}</td>
                  <td style="padding:14px 26px;border-bottom:1px solid #eef1f4;color:#0a0a0a;font-size:15px">${escapeHtml(
                    String(v)
                  ).replace(/\n/g, "<br/>")}</td>
                </tr>`
                )
                .join("")}
            </table>
            <div style="padding:20px 26px;background:#fafbfc">
              <a href="mailto:${escapeHtml(email)}"
                 style="display:inline-block;background:#F15532;color:#fff;text-decoration:none;padding:12px 22px;border-radius:99px;font-size:14px;font-weight:500">
                Responder para ${escapeHtml(nome)}
              </a>
            </div>
          </div>
        </div>`;

      await transporter.sendMail({
        from: `"Site OutBox" <${user}>`,
        to: SITE.email,
        replyTo: `"${nome}" <${email}>`,
        subject: `Novo lead: ${nome} · ${servico}${
          videochamada ? " · quer videochamada" : ""
        }`,
        text: linhas.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html,
      });

      mailed = true;
    }

    if (!saved && !mailed) {
      return NextResponse.json(
        {
          error:
            "O envio ainda não está configurado no servidor. Fale com a gente pelo WhatsApp.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, saved, mailed });
  } catch {
    return NextResponse.json(
      { error: "Não foi possível enviar agora." },
      { status: 500 }
    );
  }
}
