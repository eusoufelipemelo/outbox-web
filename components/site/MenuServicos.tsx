"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";
import { CATALOGO, GRUPOS, rotaServico } from "@/lib/catalogo";

/** Submenu "Serviços" do computador: os onze serviços em quatro grupos. */
export function MenuServicos({ ativo }: { ativo: boolean }) {
  const { t, href } = useI18n();
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  const espera = useRef<ReturnType<typeof setTimeout> | null>(null);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => setAberto(false), [pathname]);

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
    };
    document.addEventListener("keydown", tecla);
    return () => document.removeEventListener("keydown", tecla);
  }, [aberto]);

  const entrar = () => {
    if (espera.current) clearTimeout(espera.current);
    setAberto(true);
  };
  const sair = () => {
    espera.current = setTimeout(() => setAberto(false), 160);
  };

  return (
    <div onMouseEnter={entrar} onMouseLeave={sair} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setAberto(false)}>
      <button
        ref={botao}
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="menu-servicos"
        className={`flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[14px] transition-colors duration-200 hover:text-white xl:px-3.5 xl:text-[14.5px] ${
          ativo || aberto ? "text-white" : "text-white/70"
        }`}
      >
        {t("Serviços")}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${aberto ? "rotate-180" : ""}`} aria-hidden />
      </button>

      <div
        id="menu-servicos"
        hidden={!aberto}
        className="absolute inset-x-0 top-[calc(100%+10px)] z-20 rounded-[24px] border border-white/12 bg-[#0c0c0f] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.6)]"
      >
        <div className="grid grid-cols-4 gap-6">
          {GRUPOS.map((g) => (
            <div key={g}>
              <p className="text-[12.5px] font-medium text-[var(--color-brand-soft)]">{t(g)}</p>
              <ul className="mt-3 flex flex-col">
                {CATALOGO.filter((c) => c.grupo === g).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={href(rotaServico(c))}
                      className="flex min-h-10 items-center rounded-lg px-2 -mx-2 text-[14.5px] text-white/85 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {t(c.nome)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-5">
          <Link href={href("/servicos")} className="inline-flex items-center gap-2 text-[14.5px] font-medium text-white hover:text-[var(--color-brand-soft)]">
            {t("Ver todos os serviços")}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </Link>
          <p className="text-[13.5px] text-[var(--color-fg-muted)]">
            {t("Não sabe o que contratar?")}{" "}
            <Link href={href("/consultoria-empresarial")} className="text-white underline underline-offset-4 hover:text-[var(--color-brand-soft)]">
              {t("Conheça a consultoria")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/** Serviços no menu do celular: abre e fecha no próprio menu, sem outra tela. */
export function ServicosMobile({ aoNavegar }: { aoNavegar: () => void }) {
  const { t, href } = useI18n();
  const [aberto, setAberto] = useState(false);
  return (
    <div className="border-b border-white/8">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-controls="servicos-mobile"
        className="flex w-full cursor-pointer items-center justify-between py-5 font-display text-3xl text-white"
      >
        {t("Serviços")}
        <ChevronDown className={`h-6 w-6 transition-transform duration-200 ${aberto ? "rotate-180 text-[var(--color-brand)]" : ""}`} aria-hidden />
      </button>
      <div id="servicos-mobile" hidden={!aberto} className="pb-5">
        {GRUPOS.map((g) => (
          <div key={g} className="mt-3 first:mt-0">
            <p className="text-[12.5px] font-medium text-[var(--color-brand-soft)]">{t(g)}</p>
            <ul className="mt-1">
              {CATALOGO.filter((c) => c.grupo === g).map((c) => (
                <li key={c.slug}>
                  <Link href={href(rotaServico(c))} onClick={aoNavegar} className="flex min-h-11 items-center text-[17px] text-white/85">
                    {t(c.nome)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <Link href={href("/servicos")} onClick={aoNavegar} className="mt-4 inline-flex min-h-11 items-center gap-2 text-[16px] font-medium text-white">
          {t("Ver todos os serviços")}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
