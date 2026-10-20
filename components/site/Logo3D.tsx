/* Elemento 3D da última seção (na referência, o objeto que gira acima do
   "Ready to Grow Your Brand?").
   PROVISÓRIO: o Felipe vai criar o 3D da logo da OutBox e mandar. Até lá,
   o símbolo oficial ganha volume empilhando camadas em CSS e gira em Y.
   Quando o arquivo chegar, é só trocar o conteúdo deste componente
   (vídeo com fundo transparente, GLB com model-viewer ou sequência de quadros). */

const SIMBOLO =
  "M845.429 0C1137.29 0.00297119 1248 128.377 1248 470.681V777.319C1248 1119.62 1137.29 1248 845.429 1248H402.571C110.707 1248 0 1117.84 0 777.319L-2.5944e-10 251.376H218.539V757.714C218.539 944.914 260.249 996.624 409.779 996.624H836.794C986.323 996.624 1028.03 944.914 1028.03 757.714V490.286C1028.03 303.086 986.323 251.376 836.794 251.376H218.539V0H845.429Z";

const CAMADAS = 18;

export default function Logo3D() {
  return (
    <div aria-hidden className="v3-3d mx-auto h-[150px] w-[150px] md:h-[180px] md:w-[180px]">
      <div className="v3-3d__gira">
        {Array.from({ length: CAMADAS }, (_, i) => {
          const frente = i === CAMADAS - 1;
          const t = i / (CAMADAS - 1);
          return (
            <svg
              key={i}
              viewBox="0 0 1248 1248"
              className="v3-3d__camada"
              style={{ transform: `translateZ(${(i - CAMADAS / 2) * 1.6}px)` }}
            >
              {frente && (
                <defs>
                  <linearGradient id="v3-3d-frente" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f5764e" />
                    <stop offset="45%" stopColor="#f15532" />
                    <stop offset="100%" stopColor="#b8330f" />
                  </linearGradient>
                </defs>
              )}
              <path
                d={SIMBOLO}
                fill={frente ? "url(#v3-3d-frente)" : `rgb(${Math.round(92 + t * 92)}, ${Math.round(26 + t * 25)}, ${Math.round(8 + t * 7)})`}
              />
            </svg>
          );
        })}
      </div>
      <div className="v3-3d__sombra" />
    </div>
  );
}
