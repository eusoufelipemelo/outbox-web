"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  ArrowDown, CalendarClock, Check, CreditCard, FileSignature, Gift, MessageCircle, Plus, QrCode,
  RefreshCw,
} from "lucide-react";
import { Revelar } from "@/components/ui/revelar";
import {
  CLIENTE, COMODOS, CONDICOES, FAQ, LINKS, OUTBOX, PASSOS, VALIDADE, VALORES, type Comodo,
} from "./conteudo";
import s from "./proposta.module.css";

function cn(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const reais = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function Proposta() {
  return (
    <div className="bg-papel text-corpo">
      <Capa />
      <Planta />
      <Brinde />
      <Cronograma />
      <Simulador />
      <Investimento />
      <QuemSomos />
      <Duvidas />
      <Fechamento />
      <Rodape />
      <BarraCelular />
    </div>
  );
}

/* ---------- peças ---------- */

function Secao({ id, children, className }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn("px-5 py-20 sm:px-6 md:py-28", className)}>
      <div className="mx-auto w-full max-w-[1160px]">{children}</div>
    </section>
  );
}

function Titulo({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "font-display [word-spacing:0.08em] text-[clamp(30px,4.6vw,52px)] leading-[1.04] font-semibold tracking-[-0.02em] text-balance text-tinta",
        className
      )}
    >
      {children}
    </h2>
  );
}

function Texto({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("mt-5 max-w-[60ch] text-[18px] leading-[1.65] text-suave", className)}>{children}</p>;
}

function BotaoFechar({ children = "Quero fechar hoje", claro = false, className }: { children?: ReactNode; claro?: boolean; className?: string }) {
  return (
    <a
      href={LINKS.fechar}
      target="_blank"
      rel="noopener"
      className={cn(
        "inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2.5 rounded-full px-7 text-[16px] font-semibold transition-colors duration-200 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-marca",
        claro ? "bg-white text-tinta hover:bg-white/90" : cn("bg-marca text-white hover:bg-marca-tinta", s.pulso),
        className
      )}
    >
      <MessageCircle size={19} aria-hidden />
      {children}
    </a>
  );
}

function PlacaEssence({ tamanho = 44 }: { tamanho?: number }) {
  return (
    <Image
      src={CLIENTE.logo}
      alt={`Logo ${CLIENTE.escritorio}`}
      width={tamanho}
      height={tamanho}
      className="rounded-[10px]"
      style={{ width: tamanho, height: tamanho }}
    />
  );
}

/* ---------- capa ---------- */

function Capa() {
  return (
    <header className="relative overflow-hidden px-5 pt-6 pb-20 sm:px-6 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[380px] -right-[300px] size-[860px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(241,85,50,.14), rgba(241,85,50,0) 65%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1160px]">
        <nav className="flex items-center justify-between gap-4" aria-label="Marcas desta proposta">
          <img src="/brand/outbox-horizontal-preto.svg" alt="OutBox Soluções Digitais" className="h-[22px] w-auto sm:h-[26px]" />
          <div className="flex items-center gap-3">
            <span className="hidden text-[14px] text-mudo sm:inline">para</span>
            <PlacaEssence tamanho={42} />
          </div>
        </nav>

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="min-w-0">
            <p className="text-[15px] font-medium text-marca-tinta">
              Proposta para a arquiteta {CLIENTE.arquiteta}
            </p>
            <h1 className={cn("mt-5 font-display [word-spacing:0.08em] text-[clamp(40px,6.6vw,78px)] leading-[0.98] font-semibold tracking-[-0.025em] text-tinta", s.entrada)}>
              Quem procura arquiteta vai encontrar a Essence.
            </h1>
            <p className="mt-7 max-w-[52ch] text-[19px] leading-[1.62] text-suave">
              Perfil da Empresa no Google, site com blog e CMS próprio e artigos publicados todo mês.
              Com o briefing e os materiais em mãos, deixamos tudo pronto em {VALORES.diasParaEntregar} dias.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <BotaoFechar />
              <a
                href="#planta"
                className="inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2 rounded-full px-7 text-[16px] font-semibold text-corpo ring-1 ring-linha-forte transition-colors duration-200 hover:bg-elevado"
              >
                Ver o que está incluído
                <ArrowDown size={17} aria-hidden />
              </a>
            </div>
          </div>

          <PlacaObra />
        </div>
      </div>
    </header>
  );
}

/* A "placa de obra" da proposta: logo da cliente cotada como numa prancha. */
function PlacaObra() {
  return (
    <div className={cn("relative mx-auto w-full max-w-[460px] pt-8 pl-8", s.prancha)}>
      {/* cotas */}
      <div aria-hidden className="absolute top-2 right-0 left-8 flex items-center gap-2 text-[12px] text-mudo">
        <span className="h-px flex-1 bg-linha-forte" />
        <span>3 dias</span>
        <span className="h-px flex-1 bg-linha-forte" />
      </div>
      <div aria-hidden className="absolute top-8 bottom-24 left-2 flex flex-col items-center gap-2 text-[12px] text-mudo">
        <span className="w-px flex-1 bg-linha-forte" />
        <span className="[writing-mode:vertical-rl] rotate-180">6 meses</span>
        <span className="w-px flex-1 bg-linha-forte" />
      </div>

      <div className="overflow-hidden rounded-[22px] bg-superficie shadow-[0_30px_80px_rgba(60,30,15,.16)] ring-1 ring-linha">
        <div style={{ background: CLIENTE.cor }}>
          <Image
            src={CLIENTE.logo}
            alt={`${CLIENTE.escritorio}, escritório da arquiteta ${CLIENTE.arquiteta}`}
            width={560}
            height={560}
            priority
            className="mx-auto aspect-[4/3] w-full object-cover"
            sizes="(max-width: 1024px) 90vw, 430px"
          />
        </div>
        <dl className="grid grid-cols-2 gap-px bg-linha">
          <div className="bg-superficie p-5">
            <dt className="text-[13px] text-mudo">Implantação</dt>
            <dd className="mt-1 font-display [word-spacing:0.08em] text-[26px] font-semibold text-tinta">{reais(VALORES.implantacao)}</dd>
          </div>
          <div className="bg-superficie p-5">
            <dt className="text-[13px] text-mudo">Por mês</dt>
            <dd className="mt-1 font-display [word-spacing:0.08em] text-[26px] font-semibold text-tinta">{reais(VALORES.mensal)}</dd>
          </div>
          <div className="col-span-2 flex items-center justify-between gap-3 bg-marca-tenue p-5">
            <dt className="text-[14.5px] font-medium text-marca-tinta">Site de {reais(VALORES.site)}</dt>
            <dd className="rounded-full bg-marca px-3.5 py-1.5 text-[13.5px] font-semibold text-white">de brinde</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ---------- planta interativa ---------- */

/* ty: altura do rótulo, escolhida para não cruzar os arcos das portas */
type Sala = { id: Comodo["id"]; x: number; y: number; w: number; h: number; ty: number };
const SALAS: Sala[] = [
  { id: "sala", x: 30, y: 40, w: 340, h: 220, ty: 150 },
  { id: "biblioteca", x: 370, y: 40, w: 240, h: 190, ty: 140 },
  { id: "atelie", x: 370, y: 230, w: 240, h: 190, ty: 308 },
  { id: "fachada", x: 30, y: 260, w: 340, h: 160, ty: 318 },
];

function Planta() {
  const [ativo, setAtivo] = useState<Comodo["id"]>("sala");
  const ref = useRef<HTMLDivElement>(null);
  const [desenhar, setDesenhar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDesenhar(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const comodo = COMODOS.find((c) => c.id === ativo)!;

  return (
    <Secao id="planta" className="bg-superficie">
      <div className="max-w-[720px]">
        <Titulo>A planta do projeto digital da Essence.</Titulo>
        <Texto>
          Cada cômodo é uma entrega. Toque em um deles para ver o que a gente constrói ali e quando fica pronto.
        </Texto>
      </div>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        <div ref={ref} className={cn("rounded-[24px] bg-papel p-3 ring-1 ring-linha sm:p-6", desenhar && s.desenha)}>
          <svg viewBox="0 0 640 450" className="block h-auto w-full" role="group" aria-label="Planta com as quatro entregas">
            {/* cota superior */}
            <g className="text-mudo" stroke="currentColor" strokeWidth="1.2">
              <line x1="30" y1="16" x2="610" y2="16" />
              <line x1="30" y1="9" x2="30" y2="23" />
              <line x1="610" y1="9" x2="610" y2="23" />
            </g>
            <rect x="232" y="6" width="176" height="20" fill="var(--color-papel)" />
            <text x="320" y="21" textAnchor="middle" className="fill-mudo" fontSize="14">
              Essence Arquitetura
            </text>

            {SALAS.map((sala) => {
              const c = COMODOS.find((k) => k.id === sala.id)!;
              const on = sala.id === ativo;
              return (
                <g
                  key={sala.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${c.nome}: ${c.entrega}`}
                  onClick={() => setAtivo(sala.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setAtivo(sala.id);
                    }
                  }}
                  className={cn("cursor-pointer outline-none", s.comodo)}
                >
                  <rect
                    x={sala.x}
                    y={sala.y}
                    width={sala.w}
                    height={sala.h}
                    className={cn("transition-[fill] duration-300", on ? "fill-marca-tenue" : "fill-transparent", s.piso)}
                  />
                  <text
                    x={sala.x + sala.w / 2}
                    y={sala.ty - 6}
                    textAnchor="middle"
                    fontSize="15"
                    className={on ? "fill-marca-tinta" : "fill-mudo"}
                  >
                    {c.nome}
                  </text>
                  <text
                    x={sala.x + sala.w / 2}
                    y={sala.ty + 20}
                    textAnchor="middle"
                    fontSize={sala.w > 300 ? 23 : 20}
                    fontWeight="600"
                    className={cn("font-display", on ? "fill-marca-tinta" : "fill-tinta")}
                  >
                    {c.entrega.replace(" (brinde)", "")}
                  </text>
                </g>
              );
            })}

            {/* paredes: desenhadas por cima dos pisos, com vãos de porta */}
            <g fill="none" stroke="var(--color-tinta)" strokeLinecap="square" pointerEvents="none">
              <path pathLength={1} className={s.traco} strokeWidth="7"
                d="M290 420 H30 V40 H610 V420 H350" />
              <path pathLength={1} className={s.traco} strokeWidth="4" d="M370 40 V120 M370 175 V355 M370 395 V420" />
              <path pathLength={1} className={s.traco} strokeWidth="4" d="M30 260 H245 M305 260 H370" />
              <path pathLength={1} className={s.traco} strokeWidth="4" d="M370 230 H465 M520 230 H610" />
            </g>
            {/* portas: folha + arco de abertura */}
            <g fill="none" stroke="var(--color-mudo)" strokeWidth="1.5" pointerEvents="none" className={s.porta}>
              <path d="M290 420 A60 60 0 0 1 350 360" strokeDasharray="4 5" />
              <line x1="350" y1="420" x2="350" y2="360" />
              <path d="M370 175 A55 55 0 0 1 425 120" strokeDasharray="4 5" />
              <line x1="370" y1="120" x2="425" y2="120" />
              <path d="M245 260 A60 60 0 0 1 305 200" strokeDasharray="4 5" />
              <line x1="305" y1="260" x2="305" y2="200" />
              <path d="M520 230 A55 55 0 0 0 465 285" strokeDasharray="4 5" />
              <line x1="465" y1="230" x2="465" y2="285" />
              <path d="M370 395 A40 40 0 0 0 410 355" strokeDasharray="4 5" />
              <line x1="370" y1="355" x2="410" y2="355" />
            </g>
            <text x="320" y="442" textAnchor="middle" fontSize="13" className="fill-mudo">
              entrada do cliente
            </text>
          </svg>
        </div>

        <div className="lg:sticky lg:top-8">
          {/* no celular os nomes na planta ficam pequenos: estes botões são o controle principal */}
          <div className="grid grid-cols-2 gap-2 lg:hidden" role="tablist" aria-label="Entregas">
            {COMODOS.map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={c.id === ativo}
                onClick={() => setAtivo(c.id)}
                className={cn(
                  "min-h-[48px] cursor-pointer rounded-[12px] px-3 text-left text-[14.5px] font-semibold transition-colors duration-200",
                  c.id === ativo ? "bg-tinta text-white" : "bg-papel text-corpo ring-1 ring-linha"
                )}
              >
                {c.entrega.replace(" (brinde)", "")}
              </button>
            ))}
          </div>

          <article key={comodo.id} className={cn("mt-4 rounded-[24px] bg-papel p-7 ring-1 ring-linha lg:mt-0 md:p-9", s.troca)} aria-live="polite">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-marca-tenue px-3 py-1.5 text-[13px] font-semibold text-marca-tinta">
                {comodo.quando}
              </span>
              <span className="text-[14px] text-mudo">{comodo.nome}</span>
            </div>
            <h3 className="mt-5 font-display [word-spacing:0.08em] text-[28px] leading-[1.1] font-semibold text-tinta">{comodo.entrega}</h3>
            <p className="mt-4 text-[17px] leading-[1.65] text-suave">{comodo.texto}</p>
            <ul className="mt-6 flex flex-col gap-3 border-t border-linha pt-6">
              {comodo.itens.map((i) => (
                <li key={i} className="flex gap-3 text-[16px] leading-[1.5] text-corpo">
                  <Check size={19} className="mt-0.5 shrink-0 text-marca" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </Secao>
  );
}

/* ---------- brinde ---------- */

function Brinde() {
  const ref = useRef<HTMLDivElement>(null);
  const [riscar, setRiscar] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRiscar(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Secao>
      <div className="grid items-center gap-10 rounded-[28px] bg-tinta p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto] lg:gap-16 lg:p-16">
        <div>
          <Gift size={30} className="text-[#ff8666]" aria-hidden />
          <h2 className="mt-6 font-display [word-spacing:0.08em] text-[clamp(30px,4.4vw,50px)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance">
            O site da Essence entra de brinde, com custo zero.
          </h2>
          <p className="mt-5 max-w-[54ch] text-[18px] leading-[1.65] text-white/75">
            Um site como esse custa {reais(VALORES.site)} na OutBox. Fechando esta proposta, ele vem junto com a
            implantação e você não paga nada por ele. Condição válida para assinatura até {VALIDADE.texto}.
          </p>
        </div>
        <div ref={ref} className={cn("text-left lg:text-right", riscar && s.riscado)}>
          <p className="text-[15px] text-white/60">Valor do site</p>
          <p className={cn("relative mt-1 inline-block font-display [word-spacing:0.08em] text-[44px] font-semibold text-white/55 sm:text-[56px]", s.risco)}>
            {reais(VALORES.site)}
          </p>
          <p className="mt-2 font-display [word-spacing:0.08em] text-[72px] leading-none font-semibold text-[#ff8666] sm:text-[96px]">R$ 0</p>
        </div>
      </div>
    </Secao>
  );
}

/* ---------- cronograma ---------- */

function Cronograma() {
  return (
    <Secao className="bg-superficie">
      <div className="max-w-[720px]">
        <Titulo>Do sim ao ar em 3 dias.</Titulo>
        <Texto>
          A implantação já tem processo pronto. O que define o prazo é a chegada do briefing e dos materiais: quanto
          antes você fechar, antes a Essence aparece.
        </Texto>
      </div>
      <ol className="mt-12 grid gap-4 md:grid-cols-4">
        {PASSOS.map((p, i) => (
          <li key={p.titulo}>
            <Revelar atraso={i * 0.07} className="h-full">
              <div className="flex h-full flex-col rounded-[20px] bg-papel p-6 ring-1 ring-linha">
                <span className="flex size-10 items-center justify-center rounded-full bg-tinta font-display [word-spacing:0.08em] text-[16px] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-[19px] leading-[1.25] font-semibold text-tinta">{p.titulo}</h3>
                <p className="mt-2.5 text-[15.5px] leading-[1.6] text-suave">{p.texto}</p>
              </div>
            </Revelar>
          </li>
        ))}
      </ol>
    </Secao>
  );
}

/* ---------- simulador de espera ---------- */

function somaDias(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function primeiraMensalidade(fechamento: Date) {
  const d = somaDias(fechamento, VALORES.diasAteCobrar);
  const venc = new Date(d.getFullYear(), d.getMonth(), VALORES.diaVencimento);
  if (d.getDate() > VALORES.diaVencimento) venc.setMonth(venc.getMonth() + 1);
  return venc;
}

const dataCurta = (d: Date) => d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });

function Simulador() {
  const [espera, setEspera] = useState(0);
  // a data vem do navegador depois de montar, para não divergir do HTML do servidor
  const [hoje, setHoje] = useState<Date | null>(null);
  useEffect(() => setHoje(new Date()), []);

  const fecha = hoje ? somaDias(hoje, espera) : null;
  const noAr = fecha ? somaDias(fecha, VALORES.diasParaEntregar) : null;
  const artigosPerdidos = Math.floor(espera / 7);

  return (
    <Secao>
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Titulo>Quanto custa deixar para depois?</Titulo>
          <Texto>
            Arraste e veja o que muda se a Essence começar daqui a alguns dias. Enquanto isso, quem procura arquiteta
            no Google encontra outro escritório.
          </Texto>
        </div>

        <div className="rounded-[24px] bg-superficie p-6 shadow-[0_24px_60px_rgba(60,30,15,.08)] ring-1 ring-linha sm:p-9">
          <label htmlFor="espera" className="flex items-baseline justify-between gap-4 text-[16px] font-medium text-tinta">
            Dias até fechar
            <span className="font-display [word-spacing:0.08em] text-[34px] font-semibold text-marca-tinta">{espera === 0 ? "hoje" : espera}</span>
          </label>
          <input
            id="espera"
            type="range"
            min={0}
            max={30}
            value={espera}
            onChange={(e) => setEspera(Number(e.target.value))}
            className={cn("mt-4 w-full cursor-pointer", s.regua)}
            style={{ "--p": `${(espera / 30) * 100}%` } as React.CSSProperties}
          />
          <div className="mt-1 flex justify-between text-[13px] text-mudo">
            <span>hoje</span>
            <span>30 dias</span>
          </div>

          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[16px] bg-papel p-5 ring-1 ring-linha">
              <dt className="flex items-center gap-2 text-[14px] text-mudo">
                <CalendarClock size={16} aria-hidden /> Essence no ar
              </dt>
              <dd className="mt-1.5 text-[19px] font-semibold text-tinta">{noAr ? dataCurta(noAr) : "…"}</dd>
            </div>
            <div className="rounded-[16px] bg-papel p-5 ring-1 ring-linha">
              <dt className="flex items-center gap-2 text-[14px] text-mudo">
                <CreditCard size={16} aria-hidden /> 1ª mensalidade até
              </dt>
              <dd className="mt-1.5 text-[19px] font-semibold text-tinta">{fecha ? dataCurta(primeiraMensalidade(fecha)) : "…"}</dd>
            </div>
            <div
              className={cn(
                "rounded-[16px] p-5 transition-colors duration-300 sm:col-span-2",
                espera === 0 ? "bg-marca-tenue" : "bg-tinta text-white"
              )}
            >
              <dd className="text-[17px] leading-[1.5] font-medium" aria-live="polite">
                {espera === 0
                  ? "Fechando hoje, você ganha o site de brinde e a Essence começa a aparecer ainda esta semana."
                  : `${espera} ${espera === 1 ? "dia" : "dias"} a mais sem a Essence no Google${
                      artigosPerdidos > 0
                        ? ` e ${artigosPerdidos} ${artigosPerdidos === 1 ? "artigo que já estaria publicado" : "artigos que já estariam publicados"}`
                        : ""
                    }.`}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Secao>
  );
}

/* ---------- investimento ---------- */

function Investimento() {
  const [forma, setForma] = useState<"pix" | "cartao">("pix");
  const totalMensal = VALORES.mensal * VALORES.meses;

  return (
    <Secao id="investimento" className="bg-superficie">
      <div className="max-w-[720px]">
        <Titulo>O investimento.</Titulo>
        <Texto>
          O único valor no fechamento é a implantação. A mensalidade só começa 30 dias depois, quando o trabalho já
          está rodando.
        </Texto>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <div className="flex flex-col rounded-[24px] bg-papel p-7 ring-2 ring-tinta md:p-9">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[19px] font-semibold text-tinta">Implantação e configuração</h3>
            <span className="shrink-0 whitespace-nowrap text-[14px] text-mudo">uma vez</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-1.5 rounded-full bg-elevado p-1.5" role="radiogroup" aria-label="Forma de pagamento">
            {(
              [
                { id: "pix", nome: "Pix", icone: QrCode },
                { id: "cartao", nome: "Cartão", icone: CreditCard },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                role="radio"
                aria-checked={forma === f.id}
                onClick={() => setForma(f.id)}
                className={cn(
                  "flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-full text-[15px] font-semibold transition-colors duration-200",
                  forma === f.id ? "bg-superficie text-tinta shadow-[0_2px_10px_rgba(0,0,0,.08)]" : "text-mudo hover:text-corpo"
                )}
              >
                <f.icone size={17} aria-hidden />
                {f.nome}
              </button>
            ))}
          </div>
          <div key={forma} className={cn("mt-7", s.troca)}>
            {forma === "pix" ? (
              <>
                <p className="font-display [word-spacing:0.08em] text-[56px] leading-none font-semibold text-tinta">{reais(VALORES.implantacao)}</p>
                <p className="mt-3 text-[16px] text-suave">À vista no Pix, no ato da assinatura do contrato.</p>
              </>
            ) : (
              <>
                <p className="font-display [word-spacing:0.08em] text-[56px] leading-none font-semibold text-tinta">
                  <span className="text-[30px]">até </span>12x
                </p>
                <p className="mt-3 text-[16px] text-suave">
                  No cartão de crédito sobre {reais(VALORES.implantacao)}, com os juros da operadora.
                </p>
              </>
            )}
          </div>
          <ul className="mt-7 flex flex-col gap-3 border-t border-linha pt-6">
            {[
              "Criação ou ajuste do Perfil da Empresa no Google",
              "Configuração do blog e do CMS da Essence",
              "Automação dos artigos e das publicações no Google",
              `Site completo (${reais(VALORES.site)}) de brinde`,
            ].map((i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[1.5] text-corpo">
                <Check size={19} className="mt-0.5 shrink-0 text-marca" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col rounded-[24px] bg-papel p-7 ring-1 ring-linha md:p-9">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[19px] font-semibold text-tinta">Plano inicial: CMS e Google Empresas</h3>
          </div>
          <p className="mt-8 font-display [word-spacing:0.08em] text-[56px] leading-none font-semibold text-tinta">
            {reais(VALORES.mensal)}
            <span className="text-[22px] text-mudo">/mês</span>
          </p>
          <p className="mt-3 text-[16px] text-suave">
            Contrato de {VALORES.meses} meses. Primeira cobrança 30 dias após o fechamento, vencimento até o dia{" "}
            {VALORES.diaVencimento}.
          </p>
          <ul className="mt-7 flex flex-col gap-3 border-t border-linha pt-6">
            {[
              "4 artigos por mês com SEO e GEO",
              "Publicação automática no blog da Essence",
              "Resumo de cada artigo no Perfil do Google",
              "CMS, hospedagem e suporte direto com o Felipe",
            ].map((i) => (
              <li key={i} className="flex gap-3 text-[16px] leading-[1.5] text-corpo">
                <Check size={19} className="mt-0.5 shrink-0 text-marca" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* resumo do contrato */}
      <div className="mt-5 overflow-hidden rounded-[24px] ring-1 ring-linha">
        <table className="w-full text-left text-[15.5px]">
          <caption className="sr-only">Resumo do contrato inicial</caption>
          <tbody className="divide-y divide-linha bg-papel">
            <tr>
              <th scope="row" className="px-5 py-4 font-normal text-suave sm:px-8">Implantação</th>
              <td className="px-5 py-4 text-right font-semibold text-tinta sm:px-8">{reais(VALORES.implantacao)}</td>
            </tr>
            <tr>
              <th scope="row" className="px-5 py-4 font-normal text-suave sm:px-8">
                {VALORES.meses} mensalidades de {reais(VALORES.mensal)}
              </th>
              <td className="px-5 py-4 text-right font-semibold text-tinta sm:px-8">{reais(totalMensal)}</td>
            </tr>
            <tr>
              <th scope="row" className="px-5 py-4 font-normal text-suave sm:px-8">Site da Essence</th>
              <td className="whitespace-nowrap px-5 py-4 text-right sm:px-8">
                <s className="mr-2 text-mudo">{reais(VALORES.site)}</s>
                <span className="font-semibold text-marca-tinta">R$ 0</span>
              </td>
            </tr>
            <tr className="bg-tinta text-white">
              <th scope="row" className="px-5 py-5 font-semibold sm:px-8">Investimento total em 6 meses</th>
              <td className="px-5 py-5 text-right font-display [word-spacing:0.08em] text-[22px] font-semibold sm:px-8">
                {reais(VALORES.implantacao + totalMensal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-7 sm:grid-cols-2">
        {CONDICOES.map((c, i) => {
          const Icone = [FileSignature, CalendarClock, RefreshCw, Gift][i];
          return (
            <div key={c.titulo} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] bg-marca-tenue text-marca-tinta">
                <Icone size={20} aria-hidden />
              </span>
              <div>
                <h3 className="text-[17px] font-semibold text-tinta">{c.titulo}</h3>
                <p className="mt-1.5 text-[15.5px] leading-[1.6] text-suave">{c.texto}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Secao>
  );
}

/* ---------- quem é a OutBox ---------- */

function QuemSomos() {
  return (
    <Secao>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <div className="overflow-hidden rounded-[24px] ring-1 ring-linha">
            <Image
              src={OUTBOX.felipe.foto}
              alt={`${OUTBOX.felipe.nome}, ${OUTBOX.felipe.cargo}`}
              width={1128}
              height={1400}
              className="aspect-[4/4.4] w-full object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 420px"
            />
          </div>
          <p className="mt-5 text-[17px] leading-[1.6] text-corpo">“{OUTBOX.felipe.texto}”</p>
          <p className="mt-3 text-[15px] text-mudo">
            {OUTBOX.felipe.nome}, {OUTBOX.felipe.cargo}
          </p>
        </div>

        <div>
          <img src="/brand/outbox-horizontal-preto.svg" alt="OutBox Soluções Digitais" className="h-[28px] w-auto" />
          <Titulo className="mt-7">Quem vai cuidar da Essence.</Titulo>
          <Texto>{OUTBOX.texto}</Texto>

          <dl className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {OUTBOX.fatos.map((f) => (
              <div key={f.valor} className="rounded-[16px] bg-superficie p-5 ring-1 ring-linha">
                <dt className="font-display [word-spacing:0.08em] text-[24px] font-semibold text-tinta">{f.valor}</dt>
                <dd className="mt-1 text-[14px] text-mudo">{f.rotulo}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-4">
            {OUTBOX.depoimentos.map((d) => (
              <figure key={d.name} className="flex gap-4 rounded-[18px] bg-superficie p-5 ring-1 ring-linha">
                <Image src={d.avatar} alt="" width={48} height={48} className="size-12 shrink-0 rounded-full object-cover" />
                <div>
                  <blockquote className="text-[15.5px] leading-[1.6] text-corpo">“{d.quote}”</blockquote>
                  <figcaption className="mt-2.5 text-[14px] text-mudo">
                    <span className="font-semibold text-tinta">{d.name}</span>, {d.role}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Secao>
  );
}

/* ---------- dúvidas ---------- */

function Duvidas() {
  return (
    <Secao className="bg-superficie">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <Titulo>Antes de fechar.</Titulo>
          <Texto>Se ficou alguma dúvida fora daqui, o Felipe responde no WhatsApp.</Texto>
          <a
            href={LINKS.duvida}
            target="_blank"
            rel="noopener"
            className="mt-7 inline-flex min-h-[48px] cursor-pointer items-center gap-2 rounded-full px-6 text-[15.5px] font-semibold text-corpo ring-1 ring-linha-forte transition-colors duration-200 hover:bg-elevado"
          >
            <MessageCircle size={18} aria-hidden />
            Mandar uma dúvida
          </a>
        </div>
        <div className="flex flex-col gap-3">
          {FAQ.map((f) => (
            <details key={f.q} className={cn("group rounded-[18px] bg-papel ring-1 ring-linha", s.faq)}>
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[17px] font-semibold text-tinta">
                {f.q}
                <Plus size={20} className="shrink-0 text-marca transition-transform duration-300 group-open:rotate-45" aria-hidden />
              </summary>
              <p className="px-6 pb-6 text-[16px] leading-[1.65] text-suave">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Secao>
  );
}

/* ---------- fechamento ---------- */

function useContagem(limiteIso: string) {
  const [resto, setResto] = useState<number | null>(null);
  useEffect(() => {
    const fim = new Date(`${limiteIso}T23:59:59-03:00`).getTime();
    const tique = () => setResto(Math.max(0, fim - Date.now()));
    tique();
    const t = setInterval(tique, 1000);
    return () => clearInterval(t);
  }, [limiteIso]);
  return resto;
}

function Fechamento() {
  const resto = useContagem(VALIDADE.iso);
  const partes =
    resto === null
      ? null
      : [
          { v: Math.floor(resto / 86400000), r: "dias" },
          { v: Math.floor((resto / 3600000) % 24), r: "horas" },
          { v: Math.floor((resto / 60000) % 60), r: "min" },
          { v: Math.floor((resto / 1000) % 60), r: "seg" },
        ];

  return (
    <Secao>
      <div className="relative overflow-hidden rounded-[28px] bg-marca px-6 py-14 text-center text-white sm:px-12 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[300px] left-1/2 size-[700px] -translate-x-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,.22), rgba(255,255,255,0) 65%)" }}
        />
        <div className="relative">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-white/15 py-2 pr-4 pl-2">
            <PlacaEssence tamanho={34} />
            <span className="text-[14.5px] font-medium">{CLIENTE.escritorio}</span>
          </div>
          <h2 className="mx-auto mt-7 max-w-[17ch] font-display [word-spacing:0.08em] text-[clamp(32px,5.4vw,60px)] leading-[1.02] font-semibold tracking-[-0.02em] text-balance">
            {CLIENTE.primeiroNome}, vamos colocar a Essence no ar esta semana?
          </h2>
          <p className="mx-auto mt-5 max-w-[50ch] text-[18px] leading-[1.6] text-white/90">
            Feche hoje, mande o briefing e os materiais, e em {VALORES.diasParaEntregar} dias está tudo pronto. O site de
            brinde vale até {VALIDADE.texto}.
          </p>

          {partes && (
            <div className="mx-auto mt-8 grid max-w-[400px] grid-cols-4 gap-2" aria-label="Tempo restante para o brinde">
              {partes.map((p) => (
                <div key={p.r} className="rounded-[14px] bg-white/15 py-3">
                  <span className="block font-display [word-spacing:0.08em] text-[28px] leading-none font-semibold tabular-nums">
                    {String(p.v).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block text-[12.5px] text-white/80">{p.r}</span>
                </div>
              ))}
            </div>
          )}

          <BotaoFechar claro className="mt-9 w-full sm:w-auto">
            Quero fechar agora
          </BotaoFechar>
        </div>
      </div>
    </Secao>
  );
}

function Rodape() {
  return (
    <footer className="border-t border-linha px-5 pt-10 pb-28 sm:px-6 md:pb-10">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-3 text-[14px] text-mudo sm:flex-row sm:items-center sm:justify-between">
        <p>Proposta preparada para {CLIENTE.escritorio} em 20/10/2026.</p>
        <p>
          Desenvolvido por:{" "}
          <a href="https://outboxgroup.com.br" target="_blank" rel="noopener" className="font-semibold text-tinta underline-offset-4 hover:underline">
            OutBox Soluções Digitais
          </a>
        </p>
      </div>
    </footer>
  );
}

/* Barra fixa no celular: o botão de fechar fica sempre a um toque. */
function BarraCelular() {
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    const f = () => setMostrar(window.scrollY > 520);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-superficie px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden",
        mostrar ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] text-mudo">Implantação {reais(VALORES.implantacao)}</p>
          <p className="truncate text-[14.5px] font-semibold text-tinta">Site de brinde até {VALIDADE.texto.slice(0, 5)}</p>
        </div>
        <a
          href={LINKS.fechar}
          target="_blank"
          rel="noopener"
          className="inline-flex min-h-[48px] shrink-0 cursor-pointer items-center gap-2 rounded-full bg-marca px-5 text-[15px] font-semibold text-white"
        >
          <MessageCircle size={18} aria-hidden />
          Fechar hoje
        </a>
      </div>
    </div>
  );
}
