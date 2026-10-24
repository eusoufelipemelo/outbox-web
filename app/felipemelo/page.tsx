import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import ContatoFM, { EscolherAssunto } from "@/components/felipemelo/ContatoFM";
import s from "@/components/felipemelo/fm.module.css";
import {
  FM,
  FM_CAMINHOS,
  FM_DEPOIMENTOS,
  FM_FRENTES,
  FM_MARCAS,
  FM_NUMEROS,
  fmWhatsapp,
} from "@/lib/felipemelo";

/* Página pessoal e contato comercial do Felipe Melo. Não usa o menu, o rodapé
   nem o botão flutuante do site da OutBox: é uma página própria. */

const TITULO = "Felipe Melo | Contato comercial, parcerias e patrocínio";
const DESCRICAO =
  "Felipe Melo, designer e estrategista de marca há 15 anos, fundador da OutBox Group. Contato direto para projetos de marketing digital, parcerias e patrocínio.";
const OG = "/felipemelo-og.png";

export const metadata: Metadata = {
  title: { absolute: TITULO },
  description: DESCRICAO,
  alternates: { canonical: "/felipemelo" },
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    url: FM.url,
    siteName: "Felipe Melo",
    title: TITULO,
    description: DESCRICAO,
    images: [{ url: OG, width: 1200, height: 630, alt: "Felipe Melo, designer e estrategista de marca" }],
  },
  twitter: { card: "summary_large_image", title: TITULO, description: DESCRICAO, images: [OG] },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: FM.url,
    mainEntity: {
      "@type": "Person",
      name: FM.nome,
      jobTitle: "Designer e estrategista de marca, fundador e diretor de criação da OutBox Group",
      image: "https://www.outboxgroup.com.br/img/felipemelo/felipe-laranja.jpg",
      email: `mailto:${FM.email}`,
      telephone: FM.telefoneE164,
      address: { "@type": "PostalAddress", addressLocality: "Santa Cruz do Rio Pardo", addressRegion: "SP", addressCountry: "BR" },
      worksFor: { "@type": "Organization", name: "OutBox Group", url: "https://www.outboxgroup.com.br" },
      sameAs: [FM.instagram],
      knowsAbout: FM_FRENTES.map((f) => f.titulo),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Contato comercial",
        telephone: FM.telefoneE164,
        email: FM.email,
        availableLanguage: "Portuguese",
      },
    },
  };
}

function IconeWhatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.4" />
    </svg>
  );
}

function IconeInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function FelipeMeloPage() {
  return (
    <div className={s.pagina}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />

      {/* Barra do topo, própria desta página */}
      <header className="border-b border-[#e4e4e4] bg-[#fbf9f8]/90 backdrop-blur-md md:sticky md:top-0 md:z-40">
        <div className={`${s.envelope} flex h-[72px] items-center justify-between gap-4`}>
          <a href="#topo" className="flex min-h-11 items-center gap-3 text-[17px] font-bold tracking-[-0.02em] text-black">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[13px] font-bold tracking-[-0.02em] text-white">
              FM
            </span>
            Felipe Melo
          </a>
          <nav aria-label="Seções" className="hidden items-center gap-7 text-[15.5px] text-[#1f1f1f] md:flex">
            <a href="#experiencia" className="inline-flex min-h-11 items-center hover:text-[#b8330f]">Experiência</a>
            <a href="#trabalhar-juntos" className="inline-flex min-h-11 items-center hover:text-[#b8330f]">Trabalhar juntos</a>
            <a href="#brasa-de-respeito" className="inline-flex min-h-11 items-center hover:text-[#b8330f]">Brasa de Respeito</a>
            <a href="#contato" className="inline-flex min-h-11 items-center hover:text-[#b8330f]">Contato</a>
          </nav>
          <a href={fmWhatsapp()} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnMarca} !min-h-11 !px-5 !text-[15px]`}>
            <IconeWhatsapp className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Chamar no WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      <main id="topo">
        {/* 1. Topo: o retrato é o protagonista, o nome entra em escala de título */}
        <section className="overflow-hidden pb-16 pt-8 md:pb-24 md:pt-12">
          <div className={`${s.envelope} grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16`}>
            <div className="order-2 lg:order-1">
              <h1 className={s.nome}>
                <span>Felipe</span> <span>Melo</span>
                <span className="sr-only">, designer e estrategista de marca</span>
              </h1>
              <p className="mt-6 max-w-[22ch] text-[clamp(1.5rem,2.5vw,2.15rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-black">
                Quinze anos construindo marcas que as pessoas lembram na hora de decidir.
              </p>
              <p className="mt-5 max-w-[50ch] text-[17.5px] leading-relaxed text-[#4a4340]">
                Designer, estrategista de marca e fundador da OutBox Group. Este é o meu contato
                direto para projetos de marketing digital, parcerias e patrocínio dos meus canais.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={fmWhatsapp()} target="_blank" rel="noopener noreferrer" className={`${s.btn} ${s.btnMarca}`}>
                  <IconeWhatsapp className="h-5 w-5" />
                  Chamar no WhatsApp
                </a>
                <a href="#contato" className={`${s.btn} ${s.btnLinha}`}>
                  Enviar uma proposta
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-[#4a4340]">
                <li>Fundador da OutBox Group</li>
                <li>{FM.cidade}</li>
                <li>Atendo todo o Brasil</li>
              </ul>
            </div>

            {/* Retrato grande */}
            <div className="relative order-1 lg:order-2">
              <div className={`${s.retrato} relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#c2340f] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] lg:aspect-auto lg:h-[min(84vh,800px)]`}>
                <Image
                  src="/img/felipemelo/felipe-laranja.jpg"
                  alt="Felipe Melo em retrato com fundo laranja"
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 640px"
                  className="object-cover object-[50%_22%]"
                />
              </div>
              <div className="absolute bottom-6 left-6 rounded-[20px] bg-black px-5 py-4 text-white shadow-xl md:bottom-8 md:left-8">
                <p className="text-[48px] font-bold leading-none tracking-[-0.04em] text-[#f15532]">15</p>
                <p className="mt-1 text-[15px] font-medium">anos de estrada</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Experiência */}
        <section id="experiencia" className="scroll-mt-20 border-y border-[#e4e4e4] bg-white py-20 md:py-28">
          <div className={s.envelope}>
            <h2 className={`${s.titulo} max-w-[18ch] text-[clamp(2.2rem,5vw,4rem)]`}>
              Uma estrada de quinze anos, contada em números.
            </h2>
            <dl className="mt-12 grid grid-cols-1 border-t border-black sm:grid-cols-3">
              {FM_NUMEROS.map((n, i) => (
                <div
                  key={n.rotulo}
                  className={`flex flex-col-reverse gap-2 border-b border-[#e4e4e4] py-7 sm:border-b-0 sm:py-9 ${i > 0 ? "sm:border-l sm:pl-8" : ""} ${i < 2 ? "sm:pr-8" : ""}`}
                >
                  <dt className="text-[16px] text-[#4a4340]">{n.rotulo}</dt>
                  <dd className="text-[clamp(3.6rem,8vw,6.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-black">
                    {n.valor}
                    <span className="text-[#f15532]">{n.sufixo === "anos" ? "" : n.sufixo}</span>
                    {n.sufixo === "anos" && (
                      <span className="ml-2 align-baseline text-[0.32em] font-semibold tracking-[-0.02em] text-[#b8330f]">anos</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <figure className="relative self-start overflow-hidden rounded-[24px] bg-[#0b1626]">
                <Image
                  src="/img/felipemelo/felipe-estudio.jpg"
                  alt="Felipe Melo de camisa preta, com a mão no queixo, em estúdio"
                  width={1300}
                  height={1614}
                  sizes="(max-width: 1024px) 92vw, 480px"
                  className="h-auto w-full"
                />
              </figure>

              <div>
                <div className="flex flex-col gap-5 text-[18px] leading-[1.7] text-[#1f1f1f]">
                  <p>
                    Meu nome é Felipe Melo. Sou designer e estrategista de marca, e passei os últimos
                    quinze anos ajudando empresas a parecerem tão boas por fora quanto já são por dentro.
                  </p>
                  <p>
                    Fundei a OutBox Group para entregar isso com método: marca, site, sistema e
                    apresentação pensados juntos, com estratégia por trás de cada peça. Eu participo de
                    cada projeto, do briefing à publicação.
                  </p>
                  <p>
                    Acredito em três coisas: projeto tem que ter dono, prazo tem que ser cumprido e
                    site bonito que não traz cliente é despesa, não investimento.
                  </p>
                </div>

                <h3 className="mt-12 text-[20px] font-bold tracking-[-0.02em] text-black">Onde eu atuo</h3>
                <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {FM_FRENTES.map((f) => (
                    <li key={f.titulo} className="border-t-2 border-[#f15532] pt-4">
                      <p className="text-[17px] font-semibold leading-snug text-black">{f.titulo}</p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-[#4a4340]">{f.texto}</p>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-12 text-[20px] font-bold tracking-[-0.02em] text-black">Marcas que já confiaram no meu trabalho</h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {FM_MARCAS.map((m) => (
                    <li key={m} className="rounded-full border border-[#e4e4e4] bg-[#fbf9f8] px-4 py-2.5 text-[15px] font-medium text-black">
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Como trabalhar juntos */}
        <section id="trabalhar-juntos" className="scroll-mt-20 py-20 md:py-28">
          <div className={s.envelope}>
            <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
              <h2 className={`${s.titulo} max-w-[14ch] text-[clamp(2.2rem,5vw,4rem)]`}>Como podemos trabalhar juntos</h2>
              <p className="max-w-[46ch] text-[17.5px] leading-relaxed text-[#4a4340]">
                Três caminhos, todos tratados direto comigo. Escolha o que tem a ver com você e a
                conversa já começa no assunto certo.
              </p>
            </div>

            <div className="mt-14 border-t border-black">
              {FM_CAMINHOS.map((c) => (
                <article key={c.titulo} className="grid gap-6 border-b border-[#e4e4e4] py-10 md:grid-cols-[1fr_1.1fr_auto] md:items-start md:gap-10">
                  <h3 className="text-[clamp(1.6rem,2.8vw,2.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-black">{c.titulo}</h3>
                  <div>
                    <p className="text-[17px] leading-relaxed text-[#1f1f1f]">{c.texto}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                      {c.itens.map((it) => (
                        <li key={it} className="flex items-center gap-2 text-[15px] font-medium text-[#4a4340]">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#f15532]" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <EscolherAssunto assunto={c.assunto}>Falar sobre isso</EscolherAssunto>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Brasa de Respeito */}
        <section id="brasa-de-respeito" className="scroll-mt-20 pb-20 md:pb-28">
          <div className={s.envelope}>
            <div className="overflow-hidden rounded-[28px] bg-white">
              <div className="relative">
                <Image
                  src="/img/felipemelo/brasa-entardecer.jpg"
                  alt="Churrasco na brasa e um violão em uma varanda ao entardecer, com o emblema do canal Brasa de Respeito"
                  width={1600}
                  height={640}
                  sizes="(max-width: 1240px) 100vw, 1160px"
                  className="h-[240px] w-full object-cover md:h-[380px]"
                />
              </div>
              <div className="grid gap-8 p-7 md:grid-cols-[1fr_auto] md:items-center md:gap-10 md:p-10">
                <div>
                  <h2 className={`${s.titulo} text-[clamp(1.9rem,3.6vw,2.8rem)]`}>Brasa de Respeito</h2>
                  <p className="mt-3 max-w-[58ch] text-[17px] leading-relaxed text-[#4a4340]">
                    Meu canal no YouTube, onde o fogo do churrasco encontra a boa música. Marcas que
                    combinam com esse universo podem estar nos episódios, num formato combinado direto
                    comigo.
                  </p>
                </div>
                <EscolherAssunto assunto="Patrocínio no canal Brasa de Respeito">Quero patrocinar</EscolherAssunto>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Depoimentos */}
        <section className="border-y border-[#e4e4e4] bg-white py-20 md:py-28">
          <div className={s.envelope}>
            <h2 className={`${s.titulo} max-w-[16ch] text-[clamp(2.2rem,5vw,4rem)]`}>O que dizem de quem trabalhou comigo</h2>
            <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              {(() => {
                const [primeiro, ...resto] = FM_DEPOIMENTOS;
                return (
                  <>
                    <figure className="border-l-4 border-[#f15532] pl-6 md:pl-8">
                      <blockquote className="text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold leading-[1.3] tracking-[-0.02em] text-black">
                        “{primeiro.quote}”
                      </blockquote>
                      <Autor d={primeiro} />
                    </figure>
                    <div className="flex flex-col gap-10">
                      {resto.map((d) => (
                        <figure key={d.name} className="border-t border-[#e4e4e4] pt-6">
                          <blockquote className="text-[17px] leading-relaxed text-[#1f1f1f]">“{d.quote}”</blockquote>
                          <Autor d={d} />
                        </figure>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* 6. Contato */}
        <section id="contato" className="scroll-mt-20 py-20 md:py-28">
          <div className={`${s.envelope} grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
            <div>
              <h2 className={`${s.titulo} max-w-[12ch] text-[clamp(2.4rem,5.5vw,4.4rem)]`}>Vamos conversar.</h2>
              <p className="mt-5 max-w-[44ch] text-[17.5px] leading-relaxed text-[#4a4340]">
                Projeto, parceria ou patrocínio: me conte a ideia. Quem responde sou eu, sem
                intermediário.
              </p>
              <ul className="mt-10 border-t border-black">
                <Canal href={fmWhatsapp()} externo icone={<IconeWhatsapp className="h-5 w-5" />} rotulo="WhatsApp" valor={FM.telefoneExibicao} />
                <Canal href={`tel:${FM.telefoneE164}`} icone={<Phone className="h-5 w-5" aria-hidden />} rotulo="Telefone" valor={FM.telefoneExibicao} />
                <Canal href={`mailto:${FM.email}`} icone={<Mail className="h-5 w-5" aria-hidden />} rotulo="E-mail" valor={FM.email} />
                <Canal href={FM.instagram} externo icone={<IconeInstagram className="h-5 w-5" />} rotulo="Instagram" valor={FM.instagramHandle} />
              </ul>
              <p className="mt-6 flex items-center gap-2 text-[15px] text-[#4a4340]">
                <MapPin className="h-4 w-4 text-[#b8330f]" aria-hidden />
                {FM.cidade}, atendendo todo o Brasil
              </p>
            </div>
            <ContatoFM />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e4e4e4]">
        <div className={`${s.envelope} flex flex-col gap-3 py-8 text-[14.5px] text-[#4a4340] sm:flex-row sm:items-center sm:justify-between`}>
          <p>© 2026 Felipe Melo. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por:{" "}
            <a href="https://www.outboxgroup.com.br" className="inline-flex min-h-11 items-center font-semibold text-black hover:text-[#b8330f]">
              OutBox Group
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Autor({ d }: { d: (typeof FM_DEPOIMENTOS)[number] }) {
  return (
    <figcaption className="mt-6 flex items-center gap-3">
      <Image src={d.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
      <span>
        <span className="block text-[16px] font-semibold text-black">{d.name}</span>
        <span className="block text-[14px] text-[#6b6b6b]">{d.role}</span>
      </span>
    </figcaption>
  );
}

function Canal({
  href,
  icone,
  rotulo,
  valor,
  externo,
}: {
  href: string;
  icone: React.ReactNode;
  rotulo: string;
  valor: string;
  externo?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex min-h-[72px] items-center gap-4 border-b border-[#e4e4e4] py-4"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fef2ed] text-[#b8330f] transition-colors group-hover:bg-[#f15532] group-hover:text-black">
          {icone}
        </span>
        <span className="flex-1">
          <span className="block text-[14px] text-[#6b6b6b]">{rotulo}</span>
          <span className="block break-all text-[18px] font-semibold tracking-[-0.01em] text-black">{valor}</span>
        </span>
        <ArrowUpRight className="h-5 w-5 text-[#6b6b6b] transition-colors group-hover:text-black" aria-hidden />
      </a>
    </li>
  );
}
