import nodemailer from "nodemailer";

/** E-mail transacional pelo SMTP do site. Devolve false quando o SMTP não está configurado. */
export async function enviarEmail({
  para,
  assunto,
  html,
  texto,
  responderPara,
  remetente = "Site OutBox",
}: {
  para: string;
  assunto: string;
  html: string;
  texto: string;
  responderPara?: string;
  remetente?: string;
}) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  await transporter.sendMail({ from: `"${remetente}" <${user}>`, to: para, replyTo: responderPara, subject: assunto, text: texto, html });
  return true;
}

export function escapeHtml(valor: string) {
  return valor.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Moldura dos e-mails do site: faixa preta com o título, corpo branco e um botão laranja. */
export function moldura({ titulo, corpo, botao }: { titulo: string; corpo: string; botao?: { texto: string; href: string } }) {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;background:#f5f7f9;padding:28px">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e6e9ec">
      <div style="background:#0a0a0a;padding:22px 26px">
        <span style="color:#fff;font-size:18px;font-weight:600">${escapeHtml(titulo)}</span>
      </div>
      <div style="padding:24px 26px;color:#0a0a0a;font-size:15px;line-height:1.6">${corpo}</div>
      ${
        botao
          ? `<div style="padding:0 26px 26px"><a href="${escapeHtml(botao.href)}" style="display:inline-block;background:#F15532;color:#fff;text-decoration:none;padding:12px 22px;border-radius:99px;font-size:14px;font-weight:500">${escapeHtml(botao.texto)}</a></div>`
          : ""
      }
    </div>
  </div>`;
}
