/**
 * Atmosfera do site: malha orgânica sobre preto, como na referência aprovada
 * (ardósia fria no alto à esquerda, âmbar da marca à direita). É uma imagem
 * pronta da malha, fixa atrás do conteúdo (ver .ambiente no globals.css).
 */
export default function Ambience() {
  return <div aria-hidden className="ambiente pointer-events-none fixed inset-0 z-0" />;
}
