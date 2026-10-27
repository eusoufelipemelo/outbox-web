"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe, Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/client";
import { caminhoBase, localizar, LOCALES, NOME_IDIOMA, SIGLA_IDIOMA, temTraducao, type Locale } from "@/lib/i18n/config";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#processo", label: "Processo" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#depoimentos", label: "Clientes" },
  { href: "/google-empresas", label: "Google Empresas" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [idiomasAberto, setIdiomasAberto] = useState(false);
  const pathname = usePathname();
  const { t, href: h, locale } = useI18n();
  const base = caminhoBase(pathname);
  /** Página atual, para marcar o item do menu (as âncoras da home não contam). */
  const atual = (href: string) =>
    !href.includes("#") && (base === href || base.startsWith(`${href}/`));
  /** O seletor só aparece nas páginas que existem nos quatro idiomas. */
  const mostraIdiomas = temTraducao(base);
  const linkIdioma = (l: Locale) => localizar(l, base);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header data-nav className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          aria-label={t("Navegação principal")}
          className={`container-outbox flex items-center justify-between gap-4 rounded-full border py-2.5 pl-5 pr-2.5 transition-all duration-500 ${
            scrolled
              ? "border-white/12 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-white/8 bg-black/35 backdrop-blur-md"
          }`}
          style={{ paddingInline: undefined }}
        >
          <Link
            href={h("/")}
            className="flex min-h-11 shrink-0 items-center gap-2.5"
            aria-label={t("OutBox Group, ir para o início")}
          >
            <Image
              src="/brand/outbox-horizontal-branco.svg"
              alt="OutBox Soluções Digitais"
              width={138}
              height={34}
              className="h-[30px] w-auto md:h-[34px]"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={h(l.href)}
                  aria-current={atual(l.href) ? "page" : undefined}
                  className={`cursor-pointer whitespace-nowrap rounded-full px-2 py-2 text-[14px] transition-colors duration-200 hover:text-white xl:px-3.5 xl:text-[14.5px] ${
                    atual(l.href) ? "text-white" : "text-white/70"
                  }`}
                >
                  {t(l.label)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {mostraIdiomas && (
              <div
                className="relative hidden lg:block"
                onMouseLeave={() => setIdiomasAberto(false)}
              >
                <button
                  type="button"
                  onClick={() => setIdiomasAberto((v) => !v)}
                  aria-expanded={idiomasAberto}
                  aria-haspopup="true"
                  aria-label={t("Idioma: {idioma}", { idioma: NOME_IDIOMA[locale] })}
                  className="flex h-11 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[13.5px] font-medium text-white/75 transition-colors hover:text-white"
                >
                  <Globe className="h-4 w-4" strokeWidth={2} aria-hidden />
                  {SIGLA_IDIOMA[locale]}
                </button>
                {idiomasAberto && (
                  <ul className="absolute right-0 top-full z-10 min-w-[160px] rounded-2xl border border-white/12 bg-black/90 p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                    {LOCALES.map((l) => (
                      <li key={l}>
                        <a
                          href={linkIdioma(l)}
                          hrefLang={l}
                          lang={l}
                          aria-current={l === locale ? "true" : undefined}
                          className={`flex min-h-10 items-center justify-between gap-3 rounded-xl px-3 text-[14px] transition-colors hover:bg-white/8 ${
                            l === locale ? "text-[var(--color-brand)]" : "text-white/85"
                          }`}
                        >
                          {NOME_IDIOMA[l]}
                          <span className="text-[11.5px] text-white/40">{SIGLA_IDIOMA[l]}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            <Link
              href={h("/#contato")}
              className="borda-viva group hidden cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full bg-white py-2 pl-2 pr-4 text-[14.5px] font-medium text-black transition-all duration-300 hover:bg-white/90 sm:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2.4} />
              </span>
              {t("Começar projeto")}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t("Fechar menu") : t("Abrir menu")}
              aria-expanded={open}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 text-white transition-colors hover:bg-white/8 lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu mobile */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-black/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col justify-center gap-2 px-8 py-24">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={h(l.href)}
              onClick={() => setOpen(false)}
              aria-current={atual(l.href) ? "page" : undefined}
              className={`border-b border-white/8 py-5 font-display text-3xl transition-colors hover:text-[var(--color-brand)] ${
                atual(l.href) ? "text-[var(--color-brand)]" : "text-white"
              }`}
              style={{
                transitionDelay: open ? `${i * 50}ms` : "0ms",
              }}
            >
              {t(l.label)}
            </Link>
          ))}
          <Link
            href={h("/#contato")}
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-4 font-medium text-white"
          >
            {t("Começar projeto")}
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          {mostraIdiomas && (
            <nav aria-label={t("Idioma")} className="mt-8 grid grid-cols-4 gap-2">
              {LOCALES.map((l) => (
                <a
                  key={l}
                  href={linkIdioma(l)}
                  hrefLang={l}
                  lang={l}
                  aria-label={NOME_IDIOMA[l]}
                  aria-current={l === locale ? "true" : undefined}
                  className={`flex min-h-12 items-center justify-center rounded-full border text-[14px] font-medium ${
                    l === locale
                      ? "border-[var(--color-brand)] text-[var(--color-brand)]"
                      : "border-white/12 text-white/80"
                  }`}
                >
                  {SIGLA_IDIOMA[l]}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
