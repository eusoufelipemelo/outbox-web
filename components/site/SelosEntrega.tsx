import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import RevealTitle from "@/components/ui/reveal-title";
import { getT } from "@/lib/i18n/server";
import { INTL } from "@/lib/i18n/config";
import { MEDIDO_EM, SELOS, type Selo } from "@/lib/selos";

/**
 * Selos de entrega: as notas medidas no próprio site, cada uma com a data
 * da medição e um link para conferir ao vivo. Tudo existe no HTML do
 * servidor e nada depende de animação para aparecer.
 */

function Carimbo({
  selo,
  anel,
  nota,
  sobNota,
}: {
  selo: Selo;
  anel: string;
  nota: string;
  sobNota: string;
}) {
  const R_TEXTO = 84; // círculo onde corre o texto do anel
  const R_ARCO = 62; // anel da nota, no estilo do Lighthouse
  const volta = 2 * Math.PI * R_ARCO;
  const id = `selo-anel-${selo.id}`;
  const notaLonga = nota.length > 2;

  return (
    <svg
      viewBox="0 0 200 200"
      className="selo-carimbo h-auto w-full"
      aria-hidden
      focusable="false"
    >
      <defs>
        <path
          id={id}
          d={`M 100,100 m -${R_TEXTO},0 a ${R_TEXTO},${R_TEXTO} 0 1,1 ${R_TEXTO * 2},0 a ${R_TEXTO},${R_TEXTO} 0 1,1 -${R_TEXTO * 2},0`}
        />
      </defs>

      {/* Bordas do carimbo */}
      <circle
        cx="100"
        cy="100"
        r="97"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="1"
      />
      <circle
        cx="100"
        cy="100"
        r="72"
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
      />

      {/* Texto que corre pelo anel */}
      <g className="selo-giro">
        <text fill="rgba(255,255,255,0.62)" fontSize="10.5" letterSpacing="0.6">
          <textPath
            href={`#${id}`}
            textLength={2 * Math.PI * R_TEXTO - 6}
            lengthAdjust="spacing"
          >
            {anel}
          </textPath>
        </text>
      </g>

      {/* Anel da nota */}
      <circle
        cx="100"
        cy="100"
        r={R_ARCO}
        fill="none"
        stroke="rgba(241,85,50,0.16)"
        strokeWidth="5"
      />
      <circle
        cx="100"
        cy="100"
        r={R_ARCO}
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={volta}
        strokeDashoffset={volta * (1 - selo.preenchido)}
        transform="rotate(-90 100 100)"
      />

      {/* Nota */}
      <text
        x="100"
        y={sobNota ? 104 : 112}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={notaLonga ? 38 : 44}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {nota}
      </text>
      <text
        x="100"
        y="126"
        textAnchor="middle"
        fill="rgba(255,255,255,0.66)"
        fontSize="11"
      >
        {sobNota}
      </text>
    </svg>
  );
}

export default function SelosEntrega() {
  const { t, href, locale } = getT();
  const data = new Intl.DateTimeFormat(INTL[locale], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${MEDIDO_EM}T12:00:00Z`));

  return (
    <section id="selos" className="relative overflow-hidden py-24 md:py-32">
      <div className="container-outbox relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <span className="pill">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
              />
              {t("Selos de entrega")}
            </span>
            <RevealTitle
              as="h2"
              className="mt-6 max-w-[20ch] font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.07] text-white"
            >
              {t("Medimos o nosso site com a mesma régua que usamos no seu.")}
            </RevealTitle>
          </div>
          <p className="max-w-[52ch] leading-relaxed text-[var(--color-fg-muted)]">
            {t(
              "São as ferramentas oficiais do Google e as regras da LGPD. Todo site da OutBox passa por essas medições antes de ir ao ar. Cada selo tem a data e um link para você conferir agora, com o resultado ao vivo.",
            )}
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {SELOS.map((s) => {
            const anel = `${t("Selo de entrega OutBox")} • ${t(s.fonte)} • ${data} •`;
            const destino = s.link.externo ? s.link.href : href(s.link.href);
            return (
              <li
                key={s.id}
                className={`selo card-dark group grid grid-cols-[88px_minmax(0,1fr)] items-start gap-4 p-5 sm:items-center sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-7 sm:p-7 md:last:col-span-2 ${s.id === "lgpd" ? "lg:grid-cols-[150px_minmax(0,1fr)_auto]" : ""}`}
              >
                <Carimbo
                  selo={s}
                  anel={anel}
                  nota={s.nota}
                  sobNota={t(s.sobNota)}
                />
                <div className="min-w-0">
                  <h3 className="font-display text-[19px] leading-snug text-white">
                    {t(s.titulo)}
                  </h3>
                  <p className="mt-2 max-w-[48ch] text-[14.5px] leading-relaxed text-[var(--color-fg-muted)]">
                    {t(s.texto)}
                  </p>
                  <div className="mt-2 -ml-0.5">
                    {s.link.externo ? (
                      <a
                        href={destino}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[14px] font-medium text-[var(--color-brand-soft)] transition-colors duration-200 hover:text-white"
                      >
                        {t(s.link.rotulo)}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                        <span className="sr-only">
                          {t("(abre em outra aba)")}
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={destino}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-[14px] font-medium text-[var(--color-brand-soft)] transition-colors duration-200 hover:text-white"
                      >
                        {t(s.link.rotulo)}
                        <ArrowUpRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </div>
                {s.id === "lgpd" && (
                  // Os dois botões do aviso de cookies, do mesmo tamanho: é o que o selo prova.
                  <div aria-hidden className="hidden gap-2.5 pr-2 lg:grid lg:grid-cols-2">
                    <span className="rounded-full bg-[var(--color-brand-cta)] px-7 py-3 text-center text-[14.5px] font-medium text-white">
                      {t("Aceitar")}
                    </span>
                    <span className="rounded-full border border-white/16 px-7 py-3 text-center text-[14.5px] font-medium text-white">
                      {t("Recusar")}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-[13.5px] leading-relaxed text-[var(--color-fg-subtle)]">
          {t("Medido na página inicial em")} {data}.{" "}
          {t(
            "A nota de velocidade varia um pouco a cada teste, conforme a rede e o servidor no momento da medição.",
          )}
        </p>
      </div>
    </section>
  );
}
