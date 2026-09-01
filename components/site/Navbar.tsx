"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#processo", label: "Processo" },
  { href: "/#depoimentos", label: "Clientes" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <header className="fixed inset-x-0 top-4 z-50 px-4">
        <nav
          aria-label="Navegação principal"
          className={`container-outbox flex items-center justify-between gap-4 rounded-full border py-2.5 pl-5 pr-2.5 transition-all duration-500 ${
            scrolled
              ? "border-white/12 bg-black/70 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-white/8 bg-black/35 backdrop-blur-md"
          }`}
          style={{ paddingInline: undefined }}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="OutBox Group, ir para o início"
          >
            <Image
              src="/brand/logo-mark.svg"
              alt=""
              width={30}
              height={30}
              className="h-[30px] w-[30px]"
              priority
            />
            <span className="font-display text-[19px] leading-none text-white">
              OutBox
            </span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="cursor-pointer rounded-full px-3.5 py-2 text-[14.5px] text-white/70 transition-colors duration-200 hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/#contato"
              className="group hidden cursor-pointer items-center gap-2.5 rounded-full bg-white py-2 pl-2 pr-4 text-[14.5px] font-medium text-black transition-all duration-300 hover:bg-white/90 sm:flex"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand)] transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2.4} />
              </span>
              Começar projeto
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/12 text-white transition-colors hover:bg-white/8 md:hidden"
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
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/8 py-5 font-display text-3xl text-white transition-colors hover:text-[var(--color-brand)]"
              style={{
                transitionDelay: open ? `${i * 50}ms` : "0ms",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#contato"
            onClick={() => setOpen(false)}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand)] px-6 py-4 font-medium text-white"
          >
            Começar projeto
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
