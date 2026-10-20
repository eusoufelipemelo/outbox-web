/* Elemento 3D da última seção (na referência, o objeto que gira acima do
   "Ready to Grow Your Brand?").
   PROVISÓRIO: o Felipe vai criar o 3D da logo da OutBox e mandar. Até lá,
   o símbolo oficial ganha volume com camadas de vidro laranja translúcido
   e gira em Y. Quando o arquivo chegar, é só trocar o conteúdo deste
   componente (vídeo com fundo transparente, GLB ou sequência de quadros). */

const SIMBOLO =
  "M845.429 0C1137.29 0.00297119 1248 128.377 1248 470.681V777.319C1248 1119.62 1137.29 1248 845.429 1248H402.571C110.707 1248 0 1117.84 0 777.319L-2.5944e-10 251.376H218.539V757.714C218.539 944.914 260.249 996.624 409.779 996.624H836.794C986.323 996.624 1028.03 944.914 1028.03 757.714V490.286C1028.03 303.086 986.323 251.376 836.794 251.376H218.539V0H845.429Z";

const CAMADAS = 24;
const PASSO = 2.2;

export default function Logo3D() {
  return (
    <div aria-hidden className="v3-3d mx-auto h-[240px] w-[240px] md:h-[340px] md:w-[340px]">
      {/* O que o vidro "refrata": brilho laranja atrás */}
      <div className="v3-3d__aura" />
      <div className="v3-3d__gira">
        {Array.from({ length: CAMADAS }, (_, i) => {
          const frente = i === CAMADAS - 1;
          const verso = i === 0;
          const z = (i - (CAMADAS - 1) / 2) * PASSO;
          return (
            <svg
              key={i}
              viewBox="-20 -20 1288 1288"
              className="v3-3d__camada"
              style={{ transform: `translateZ(${z}px)` }}
            >
              {frente || verso ? (
                <>
                  <defs>
                    <linearGradient id={`vidro-${i}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
                      <stop offset="28%" stopColor="#f5764e" stopOpacity="0.55" />
                      <stop offset="62%" stopColor="#f15532" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#b8330f" stopOpacity="0.55" />
                    </linearGradient>
                    <linearGradient id={`reflexo-${i}`} x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
                      <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.75" />
                      <stop offset="0.56" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                      <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        values="-1 0; 1 0; 1 0"
                        keyTimes="0; 0.55; 1"
                        dur="4.5s"
                        repeatCount="indefinite"
                      />
                    </linearGradient>
                  </defs>
                  <path d={SIMBOLO} fill={`url(#vidro-${i})`} stroke="#ffffff" strokeOpacity="0.85" strokeWidth="14" />
                  <path d={SIMBOLO} fill={`url(#reflexo-${i})`} />
                </>
              ) : (
                <path
                  d={SIMBOLO}
                  fill="#f15532"
                  fillOpacity={0.07}
                  stroke="#f5764e"
                  strokeOpacity={0.35}
                  strokeWidth="10"
                />
              )}
            </svg>
          );
        })}
      </div>
      <div className="v3-3d__sombra" />
    </div>
  );
}
