import type { Dict, Locale } from "./config";
import en from "./dict/en.json";
import es from "./dict/es.json";
import ca from "./dict/ca.json";

/** Textos da interface (tudo menos os documentos legais e os artigos do blog). */
export const DICIONARIOS: Record<Locale, Dict> = { pt: {}, en, es, ca };
