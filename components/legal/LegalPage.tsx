import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import WhatsAppFloat from "@/components/site/WhatsAppFloat";
import ScrollEffects from "@/components/ui/ScrollEffects";
import { LEGAL_LINKS, SITE } from "@/lib/site";

export const ATUALIZADO_EM = "1º de setembro de 2026";

export default function LegalPage({
  titulo,
  resumo,
  children,
}: {
  titulo: string;
  resumo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sitev">
      <ScrollEffects />
      <Navbar />

      <main>
        <article className="relative bg-[var(--color-creme)] pb-24 pt-32 md:pt-40">
          <div className="container-outbox relative z-10">
            <Link
              href="/"
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-[14.5px] text-[var(--color-cinza)] transition-colors hover:text-[#b8330f]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para o site
            </Link>

            <header className="mt-10 max-w-[760px]">
              <span className="pill">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]"
                />
                Documento legal
              </span>
              <h1 className="mt-6 font-bold tracking-[-0.025em] text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.06] text-[var(--color-breu)]">
                {titulo}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-cinza)]">
                {resumo}
              </p>
              <p className="mt-6 border-t border-[var(--color-borda)] pt-5 text-[13.5px] text-[var(--color-cinza)]">
                Última atualização: {ATUALIZADO_EM}
              </p>
            </header>

            <div className="prose prose-v3 mt-12 max-w-[760px] prose-headings:font-bold tracking-[-0.025em] prose-h2:mt-12 prose-h2:text-[1.5rem] prose-h3:text-[1.15rem] prose-a:text-[#b8330f] prose-a:underline-offset-4 prose-li:marker:text-[var(--color-brand)]">
              {children}
            </div>

            {/* Identificação do responsável */}
            <aside className="mt-14 max-w-[760px] rounded-[var(--radius-xl2)] border border-[var(--color-borda)] bg-white p-7">
              <h2 className="font-bold tracking-[-0.025em] text-[19px] text-[var(--color-breu)]">
                Quem é o responsável
              </h2>
              <dl className="mt-4 grid gap-3 text-[14.5px] sm:grid-cols-2">
                <div>
                  <dt className="text-[var(--color-cinza)]">Razão social</dt>
                  <dd className="text-[var(--color-breu)]">{SITE.name}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-cinza)]">CNPJ</dt>
                  <dd className="text-[var(--color-breu)]">{SITE.cnpj}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-cinza)]">Endereço</dt>
                  <dd className="text-[var(--color-breu)]">{SITE.city}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-cinza)]">
                    Contato do encarregado
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-[#b8330f] hover:underline"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>

            {/* Outros documentos */}
            <nav
              aria-label="Outros documentos"
              className="mt-8 flex max-w-[760px] flex-wrap gap-2.5"
            >
              {LEGAL_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="cursor-pointer rounded-full border border-[var(--color-borda)] px-4 py-2.5 text-[13.5px] text-[var(--color-breu)] transition-colors duration-300 hover:border-[var(--color-brand)]/50 hover:text-[#b8330f]"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
