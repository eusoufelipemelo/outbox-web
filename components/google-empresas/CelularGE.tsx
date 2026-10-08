"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { MapPin, MessageCircle, Sparkles, Star, TrendingUp, UserCheck } from "lucide-react";
import s from "./vantagens.module.css";

/* Celular laranja com a jornada do cliente em três cenas, em loop:
   1. a busca no Google, com a empresa em primeiro no mapa;
   2. a pergunta para uma IA, que cita a empresa como fonte;
   3. o contato chegando no WhatsApp.
   A cada cena, blocos saltam da tela para a frente do aparelho.
   Tudo em CSS; aqui só pausamos o loop quando o palco sai da tela. */

type Bloco = {
  cena: 1 | 2 | 3;
  texto: string;
  icone: ReactNode;
  forte?: boolean;
  /** Lado do aparelho e altura em relação a ele. */
  lado: "e" | "d";
  topo: string;
  /** De onde o bloco nasce: deslocamento até o centro da tela. */
  dx: string;
  dy: string;
  atraso: number;
};

const ic = "h-4 w-4";
const BLOCOS: Bloco[] = [
  { cena: 1, texto: "1º no mapa da região", icone: <MapPin className={ic} />, forte: true, lado: "e", topo: "17%", dx: "120px", dy: "110px", atraso: 0.5 },
  { cena: 1, texto: "Perfil ativo e completo", icone: <Star className={ic} />, lado: "d", topo: "47%", dx: "-120px", dy: "-20px", atraso: 0.9 },
  { cena: 2, texto: "Citada como fonte pela IA", icone: <Sparkles className={ic} />, forte: true, lado: "d", topo: "15%", dx: "-120px", dy: "120px", atraso: 0.6 },
  { cena: 2, texto: "Resposta com o seu nome", icone: <TrendingUp className={ic} />, lado: "e", topo: "58%", dx: "120px", dy: "-60px", atraso: 1 },
  { cena: 3, texto: "Novo contato no WhatsApp", icone: <MessageCircle className={ic} />, forte: true, lado: "e", topo: "30%", dx: "120px", dy: "60px", atraso: 0.5 },
  { cena: 3, texto: "Cliente já chega decidido", icone: <UserCheck className={ic} />, lado: "d", topo: "64%", dx: "-120px", dy: "-80px", atraso: 0.9 },
];

export default function CelularGE() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([e]) => {
        el.dataset.pausado = e.isIntersecting ? "0" : "1";
      },
      { rootMargin: "120px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={s.palco}
      role="img"
      aria-label="Animação de um celular laranja: a empresa aparece em primeiro no mapa do Google, é citada como fonte por uma inteligência artificial e recebe um novo contato no WhatsApp."
    >
      <div className={s.halo} aria-hidden />

      <div className={s.cena3d} aria-hidden>
        <div className={s.moldura}>
          <div className={s.vidro}>
            <div className={s.tela}>
              <div className={s.ilha} />
              <div className={s.statusBar}>
                <span>9:41</span>
                <span>●●● ▮</span>
              </div>

              {/* Cena 1: Google */}
              <div className={`${s.cena} ${s.cena1}`}>
                <div className={s.app}>
                  <span className={s.appPonto} /> Google
                </div>
                <div className={s.busca}>
                  <span className={s.digitando}>melhor opção perto de mim</span>
                  <span className={s.cursor} />
                </div>
                <div className={s.mapa}>
                  <span className={s.pino} style={{ left: "18%", top: "58%" }} />
                  <span className={s.pino} style={{ left: "72%", top: "26%" }} />
                  <span className={s.pino} style={{ left: "80%", top: "66%" }} />
                  <span className={`${s.pino} ${s.pinoMeu}`} style={{ left: "46%", top: "34%" }} />
                </div>
                <div className={`${s.resultado} ${s.resultadoMeu}`}>
                  <span className={s.resultadoNome}>Sua empresa</span>
                  <span className={s.estrelas}>★★★★★</span>
                  <span className={s.acoes}>
                    <span>Ligar</span>
                    <span>Rotas</span>
                    <span>Site</span>
                  </span>
                </div>
                <div className={s.resultado}>
                  <span className={s.barra} style={{ width: "62%" }} />
                  <span className={s.barra} style={{ width: "40%" }} />
                </div>
                <div className={s.resultado}>
                  <span className={s.barra} style={{ width: "54%" }} />
                  <span className={s.barra} style={{ width: "34%" }} />
                </div>
              </div>

              {/* Cena 2: IA */}
              <div className={`${s.cena} ${s.cena2}`}>
                <div className={s.app}>
                  <span className={s.appPonto} /> Assistente de IA
                </div>
                <div className={s.balaoEu}>Qual empresa você recomenda aqui na minha cidade?</div>
                <div className={s.balaoIa}>
                  <span className={s.pontinhos}>
                    <i />
                    <i />
                    <i />
                  </span>
                  <p style={{ marginTop: 6 }}>
                    Recomendo a <strong>Sua empresa</strong>. Ela explica no blog como funciona o
                    serviço, quanto tempo leva e o que está incluso.
                  </p>
                  <span className={s.fonte}>↗ seusite.com.br/blog</span>
                </div>
                <div className={s.balaoEu}>Como falo com eles?</div>
                <div className={s.balaoIa}>
                  Pelo WhatsApp do <strong>perfil no Google</strong>, com atendimento no mesmo dia.
                </div>
              </div>

              {/* Cena 3: contato */}
              <div className={`${s.cena} ${s.cena3}`}>
                <div className={s.notificacao}>
                  <span className={s.notificacaoIcone}>W</span>
                  <span>
                    <b>WhatsApp</b>
                    <br />
                    Olá! Vi vocês no Google e quero um orçamento.
                  </span>
                </div>
                <div className={s.resultado}>
                  <span className={s.resultadoNome}>Origem do contato</span>
                  <span style={{ color: "rgba(255,255,255,.7)" }}>Perfil da Empresa no Google</span>
                </div>
                <div className={s.resultado}>
                  <span className={s.resultadoNome}>Leu antes de chamar</span>
                  <span style={{ color: "rgba(255,255,255,.7)" }}>Artigo do seu blog</span>
                </div>
                <div className={s.novoCliente}>
                  <span className={s.check}>✓</span>
                  <b style={{ fontSize: "1.15em" }}>Novo cliente</b>
                  <span style={{ color: "rgba(255,255,255,.7)" }}>chegou pelo Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {BLOCOS.map((b) => (
          <span
            key={b.texto}
            data-cena={b.cena}
            data-lado={b.lado}
            className={`${s.bloco} ${b.forte ? s.blocoForte : ""}`}
            style={
              {
                top: b.topo,
                "--dx": b.dx,
                "--dy": b.dy,
                "--atraso": `calc(var(--ciclo) / 3 * ${b.cena - 1} + ${b.atraso}s)`,
              } as CSSProperties
            }
          >
            <span className={s.blocoIcone}>{b.icone}</span>
            {b.texto}
          </span>
        ))}
      </div>

      <div className={s.legendas} aria-hidden>
        <span className={s.legenda}>No Google</span>
        <span className={s.legenda}>Nas IAs</span>
        <span className={s.legenda}>No WhatsApp</span>
      </div>
    </div>
  );
}
