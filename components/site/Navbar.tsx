"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#processo", label: "Processo" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#depoimentos", label: "Clientes" },
  { href: "/google-empresas", label: "Google Empresas" },
  { href: "/blog", label: "Blog" },
];

/* Menu do layout v3: barra creme no topo, como na referência. Ao rolar,
   ganha fundo translúcido e uma linha fina embaixo para não se perder
   em cima das seções pretas e laranja. */
export default function Navbar() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  const atual = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => {
    const onScroll = () => setRolou(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          rolou || aberto
            ? "bg-[#f5f2f0]/88 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "bg-[#f5f2f0]"
        }`}
      >
        <nav
          aria-label="Navegação principal"
          className={`mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 transition-[height] duration-300 md:px-[30px] ${rolou ? "h-[76px]" : "h-[76px] lg:h-[104px]"}`}
        >
          <Link
            href="/"
            className="flex min-h-11 shrink-0 items-center"
            aria-label="OutBox Group, ir para o início"
          >
            <Image
              src="/brand/outbox-horizontal-preto.svg"
              alt="OutBox Soluções Digitais"
              width={130}
              height={32}
              className="h-[30px] w-auto lg:h-[36px]"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-2 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={atual(l.href) ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[16px] font-medium transition-colors duration-200 hover:text-[#b8330f] ${
                    atual(l.href) ? "text-[#b8330f]" : "text-[var(--color-breu)]"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link href="/#contato" className="v3-btn hidden !min-h-12 !px-6 !text-[16px] sm:inline-flex lg:!min-h-[52px] lg:!px-7">
              Começar projeto
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--color-borda)] bg-white text-[var(--color-breu)] lg:hidden"
            >
              {aberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Menu do celular */}
      <div
        className={`fixed inset-0 z-40 overflow-y-auto bg-[var(--color-creme)] transition-opacity duration-300 lg:hidden ${
          aberto ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col justify-center gap-1 px-6 pb-12 pt-28">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setAberto(false)}
              aria-current={atual(l.href) ? "page" : undefined}
              className={`border-b border-[var(--color-borda)] py-4 text-[30px] font-bold tracking-[-0.02em] transition-colors hover:text-[#b8330f] ${
                atual(l.href) ? "text-[#b8330f]" : "text-[var(--color-breu)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/#contato" onClick={() => setAberto(false)} className="v3-btn mt-8 !min-h-14">
            Começar projeto
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>
    </>
  );
}
