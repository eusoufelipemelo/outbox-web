/**
 * Camada de atmosfera do site.
 * Fica fixa atrás de tudo: preto puro com glows quentes muito amplos
 * sangrando das bordas, mais grade sutil, grão e vinheta.
 */
export default function Ambience() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base preta */}
      <div className="absolute inset-0 bg-black" />

      {/* Grade discreta, some nas bordas */}
      <div className="bg-grid absolute inset-0 opacity-60" />

      {/* Glows ambientes: grandes, quentes e de baixíssima opacidade */}
      <div className="ambient ambient--top" />
      <div className="ambient ambient--right" />
      <div className="ambient ambient--left" />
      <div className="ambient ambient--bottom" />

      {/* Vinheta que fecha os cantos */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_40%,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
    </div>
  );
}
