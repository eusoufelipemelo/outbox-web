import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { LEGAL_LINKS, SITE, whatsappLink } from "@/lib/site";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 pt-20 pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow glow--brand absolute -bottom-52 left-1/2 h-[520px] w-[720px] -translate-x-1/2 opacity-70" />
      </div>

      <div className="container-outbox relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <Image
              src="/brand/logo-outbox-white.svg"
              alt="OutBox Group"
              width={200}
              height={52}
              className="h-[42px] w-auto"
            />
            <p className="mt-6 max-w-[38ch] leading-relaxed text-[var(--color-fg-muted)]">
              Sistemas, sites, marcas e apresentações que colocam a sua empresa
              na frente. Feito com estratégia, tecnologia e capricho.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href={SITE.instagramBrand}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram da OutBox Group, ${SITE.instagramBrandHandle}`}
                className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-white/12 px-4 py-2.5 text-[13.5px] text-white/80 transition-colors duration-300 hover:border-[var(--color-brand)]/50 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4 text-[var(--color-brand)]" />
                {SITE.instagramBrandHandle}
              </a>
              <a
                href={SITE.instagramPersonal}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram do Felipe Melo, ${SITE.instagramPersonalHandle}`}
                className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-white/12 px-4 py-2.5 text-[13.5px] text-white/80 transition-colors duration-300 hover:border-[var(--color-brand)]/50 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4 text-[var(--color-brand)]" />
                {SITE.instagramPersonalHandle}
              </a>
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label="Rodapé">
            <h2 className="font-display text-[15px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
              Navegar
            </h2>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                { href: "/#servicos", label: "Serviços" },
                { href: "/#processo", label: "Processo" },
                { href: "/#sobre", label: "Sobre" },
                { href: "/#depoimentos", label: "Clientes" },
                { href: "/blog", label: "Blog" },
                { href: "/#contato", label: "Contato" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="cursor-pointer text-[15px] text-[var(--color-fg-muted)] transition-colors duration-200 hover:text-[var(--color-brand)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <h2 className="font-display text-[15px] uppercase tracking-widest text-[var(--color-fg-subtle)]">
              Contato
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex cursor-pointer items-start gap-3 text-[15px] text-[var(--color-fg-muted)] transition-colors duration-200 hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex cursor-pointer items-start gap-3 break-all text-[15px] text-[var(--color-fg-muted)] transition-colors duration-200 hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-[15px] text-[var(--color-fg-muted)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-brand)]" />
                {SITE.city}
              </li>
            </ul>

            <Link
              href="/#contato"
              className="group mt-7 inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-white px-5 py-3 text-[14.5px] font-medium text-black transition-all duration-300 hover:shadow-[0_12px_30px_rgba(255,255,255,0.14)]"
            >
              Começar projeto
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.4}
              />
            </Link>
          </div>
        </div>

        {/* Links legais */}
        <nav
          aria-label="Documentos legais"
          className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/8 pt-8 text-[13.5px]"
        >
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="cursor-pointer text-[var(--color-fg-muted)] transition-colors duration-200 hover:text-[var(--color-brand)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-[13.5px] text-[var(--color-fg-subtle)] sm:flex-row">
          <p className="text-center sm:text-left">
            © {year} {SITE.name}. Todos os direitos reservados.
            <br className="sm:hidden" />
            <span className="sm:ml-2">CNPJ {SITE.cnpj}</span>
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href={SITE.url}
              className="cursor-pointer text-white/70 transition-colors hover:text-[var(--color-brand)]"
            >
              OutBox Group
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
