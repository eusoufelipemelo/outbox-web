import Link from "next/link";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import { getT } from "@/lib/i18n/server";

/** Home: bloco pequeno das mentorias. A home não vira página de curso. */
export default function MentoriaHome() {
  const { t, href } = getT();
  return (
    <section className="relative py-10">
      <div className="container-outbox">
        <Revelar>
          <div className="flex flex-col gap-6 rounded-[var(--radius-xl2)] border border-white/10 bg-white/[0.025] p-7 md:flex-row md:items-center md:justify-between md:p-9">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)]/14">
                <GraduationCap className="h-5 w-5 text-[var(--color-brand)]" aria-hidden />
              </span>
              <div>
                <p className="font-display text-[20px] text-white">{t("Para profissionais: mentorias com Felipe")}</p>
                <p className="mt-1.5 max-w-[60ch] text-[15px] leading-relaxed text-[var(--color-fg-muted)]">
                  {t("Para quem quer aprender a construir, vender e organizar serviços digitais. Individual ou em grupo.")}
                </p>
              </div>
            </div>
            <Link
              href={href("/mentoria")}
              data-cta="home-mentoria"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-white/16 px-6 text-[15px] text-white transition-colors hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/10"
            >
              {t("Conhecer as mentorias")}
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </Link>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
