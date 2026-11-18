import { Etapas, Botoes, Rotulo, TITULO_SECAO } from "@/components/oferta/Blocos";
import { Revelar } from "@/components/ui/revelar";
import { getT } from "@/lib/i18n/server";

/** Home: como Felipe diagnostica um negócio, com o caminho para a consultoria paga. */
export default function DiagnosticoHome() {
  const { t } = getT();
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-outbox">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Revelar className="max-w-[58ch]">
            <Rotulo>{t("Consultoria Estratégica Empresarial")}</Rotulo>
            <h2 className={`mt-6 ${TITULO_SECAO}`}>{t("Como Felipe diagnostica um negócio.")}</h2>
            <p className="mt-5 text-[16.5px] leading-relaxed text-[var(--color-fg-muted)]">
              {t("Antes de qualquer ferramenta, uma análise do que realmente trava a empresa. É um serviço pago e independente: o plano é seu, e você decide quem executa.")}
            </p>
          </Revelar>
          <Revelar atraso={0.06}>
            <Botoes ctas={[{ texto: "Conhecer a consultoria", href: "/consultoria-empresarial", principal: true, rastreio: "home-consultoria" }]} />
          </Revelar>
        </div>
        <div className="mt-12">
          <Etapas
            itens={[
              { titulo: "Investigação", texto: "Objetivos, momento do negócio e só os dados que você autorizar." },
              { titulo: "Diagnóstico", texto: "Presença digital, marca, jornada comercial e processos." },
              { titulo: "Reunião estratégica", texto: "Observações, oportunidades e decisões prioritárias, com Felipe." },
              { titulo: "Plano de ação", texto: "Prioridades e próximos passos para 30, 60 e 90 dias." },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
