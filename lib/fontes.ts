import localFont from "next/font/local";

/**
 * Fontes servidas pelo próprio site (antes vinham do Fontshare e do Google
 * Fonts e travavam a primeira pintura). O next/font gera a fonte de reserva
 * com as mesmas medidas, então o texto não pula quando a fonte chega.
 */
export const clashDisplay = localFont({
  // O site usa a Clash só no peso 600 (.font-display): um arquivo de 15 KB.
  src: [{ path: "../app/fonts/ClashDisplay-600.woff2", weight: "600", style: "normal" }],
  variable: "--font-clash",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

/** Geist variável (300 a 700), só o conjunto latino: cobre português e inglês. */
export const geist = localFont({
  src: "../app/fonts/Geist-latin.woff2",
  weight: "300 700",
  style: "normal",
  variable: "--font-geist",
  display: "swap",
  fallback: ["system-ui", "Arial", "sans-serif"],
});
