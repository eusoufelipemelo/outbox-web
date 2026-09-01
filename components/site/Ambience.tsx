/**
 * Atmosfera do site: malha orgânica fluida sobre preto.
 * Dois territórios de cor, como na referência aprovada:
 *  - ardósia fria descendo do topo/esquerda
 *  - âmbar quente da marca dominando a direita
 * Tudo muito borrado, com bordas orgânicas, fixo atrás do conteúdo.
 */
export default function Ambience() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* Malha de cor */}
      <div className="mesh">
        <span className="mesh__blob mesh__blob--slate-a" />
        <span className="mesh__blob mesh__blob--slate-b" />
        <span className="mesh__blob mesh__blob--slate-c" />
        <span className="mesh__blob mesh__blob--amber-a" />
        <span className="mesh__blob mesh__blob--amber-b" />
        <span className="mesh__blob mesh__blob--amber-c" />
      </div>

      {/* Escurece o miolo para o texto respirar */}
      <div className="mesh__center-shade" />

      {/* Vinheta suave só nos cantos extremos */}
      <div className="mesh__vignette" />
    </div>
  );
}
