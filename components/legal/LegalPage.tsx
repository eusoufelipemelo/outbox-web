import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Ambience from "@/components/site/Ambience";
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
    <>
      <Ambience />
      <ScrollEffects />
      <Navbar />

      <main>
        <article className="relative pt-36 pb-24 md:pt-44">
          <div className="container-outbox relative z-10">
            <Link
              href="/"
              className="inline-flex cursor-pointer items-center gap-2 text-[14.5px] text-[var(--color-fg-muted)] transition-colors hover:text-white"
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
              <h1 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.06] text-white">
                {titulo}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-fg-muted)]">
                {resumo}
              </p>
              <p className="mt-6 border-t border-white/8 pt-5 text-[13.5px] text-[var(--color-fg-subtle)]">
                Última atualização: {ATUALIZADO_EM}
              </p>
            </header>

            <div className="prose prose-invert prose-outbox mt-12 max-w-[760px] prose-headings:font-display prose-h2:mt-12 prose-h2:text-[1.5rem] prose-h3:text-[1.15rem] prose-a:text-[var(--color-brand)] prose-a:underline-offset-4 prose-li:marker:text-[var(--color-brand)]">
              {children}
            </div>

            {/* Identificação do responsável */}
            <aside className="mt-14 max-w-[760px] rounded-[var(--radius-xl2)] border border-white/10 bg-white/[0.03] p-7">
              <h2 className="font-display text-[19px] text-white">
                Quem é o responsável
              </h2>
              <dl className="mt-4 grid gap-3 text-[14.5px] sm:grid-cols-2">
                <div>
                  <dt className="text-[var(--color-fg-subtle)]">Razão social</dt>
                  <dd className="text-white">{SITE.name}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-fg-subtle)]">CNPJ</dt>
                  <dd className="text-white">{SITE.cnpj}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-fg-subtle)]">Endereço</dt>
                  <dd className="text-white">{SITE.city}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-fg-subtle)]">
                    Contato do encarregado
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-[var(--color-brand)] hover:underline"
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
                  className="cursor-pointer rounded-full border border-white/12 px-4 py-2.5 text-[13.5px] text-white/80 transition-colors duration-300 hover:border-[var(--color-brand)]/50 hover:text-white"
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
    </>
  );
}
