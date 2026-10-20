import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { LEGAL_LINKS, SITE, whatsappLink } from "@/lib/site";

const NAVEGAR = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#processo", label: "Processo" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#depoimentos", label: "Clientes" },
  { href: "/google-empresas", label: "Google Empresas" },
  { href: "/blog", label: "Blog" },
  { href: "/#contato", label: "Contato" },
];

const linkCls =
  "inline-flex min-h-10 items-center text-[15px] text-white/85 transition-colors duration-200 hover:text-[var(--color-brand)]";

/* Rodapé preto do layout v3, com a assinatura gigante recortada embaixo. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tema-breu relative overflow-hidden bg-[var(--color-breu)] pt-20 text-white">
      <div className="container-outbox">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[380px]">
            <Image
              src="/brand/outbox-horizontal-branco.svg"
              alt="OutBox Soluções Digitais"
              width={210}
              height={52}
              className="h-[48px] w-auto"
            />
            <p className="mt-5 text-[15px] leading-relaxed text-[#a1a1a1]">
              Sistemas, sites, marcas e apresentações que colocam a sua empresa na frente. Feito com
              estratégia, tecnologia e capricho.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="text-[17px] font-semibold">Vamos tirar o seu projeto do papel?</p>
            <Link href="/#contato" className="v3-btn">
              Começar projeto
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-10 md:grid-cols-4">
          <nav aria-label="Rodapé">
            <h2 className="text-[15px] font-medium text-[#a1a1a1]">Navegar</h2>
            <ul className="mt-3">
              {NAVEGAR.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Documentos legais">
            <h2 className="text-[15px] font-medium text-[#a1a1a1]">Documentos</h2>
            <ul className="mt-3">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[15px] font-medium text-[#a1a1a1]">Redes</h2>
            <ul className="mt-3">
              <li>
                <a href={SITE.instagramBrand} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Instagram {SITE.instagramBrandHandle}
                </a>
              </li>
              <li>
                <a href={SITE.instagramPersonal} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Instagram {SITE.instagramPersonalHandle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[15px] font-medium text-[#a1a1a1]">Fale com a gente</h2>
            <ul className="mt-3 flex flex-col">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${linkCls} gap-3`}>
                  <Phone className="h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkCls} gap-3 break-all`}>
                  <Mail className="h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                  {SITE.email}
                </a>
              </li>
              <li className="flex min-h-10 items-center gap-3 text-[15px] text-white/85">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--color-brand)]" aria-hidden />
                {SITE.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 py-6 text-[13.5px] text-[#a1a1a1] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. Todos os direitos reservados. CNPJ {SITE.cnpj}
          </p>
          <p>
            Desenvolvido por{" "}
            <a href={SITE.url} className="inline-flex min-h-10 items-center text-white transition-colors hover:text-[var(--color-brand)]">
              OutBox Group
            </a>
          </p>
        </div>
      </div>

      {/* Assinatura gigante, cortada pela borda de baixo como na referência */}
      <div aria-hidden className="container-outbox -mb-[3.2%] mt-2">
        <div className="v3-assinatura aspect-[3661/858] w-full" />
      </div>
    </footer>
  );
}
