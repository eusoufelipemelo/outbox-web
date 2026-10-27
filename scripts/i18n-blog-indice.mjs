// Gera lib/i18n/blog/indice.ts a partir das traduções em lib/i18n/blog/<idioma>/<slug>.json.
// Rode depois de acrescentar ou trocar a tradução de um artigo: node scripts/i18n-blog-indice.mjs
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BASE = join(process.cwd(), "lib/i18n/blog");
const IDIOMAS = ["en", "es", "ca"];
const imports = [];
const mapa = [];
let n = 0;
for (const l of IDIOMAS) {
  const dir = join(BASE, l);
  const arquivos = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".json")).sort() : [];
  const itens = arquivos.map((f) => {
    const id = `${l}_${n++}`;
    imports.push(`import ${id} from "./${l}/${f}";`);
    return `    ${JSON.stringify(f.replace(/\.json$/, ""))}: ${id},`;
  });
  mapa.push(`  ${l}: {\n${itens.join("\n")}\n  },`);
}
const cabecalho = `/* Gerado por scripts/i18n-blog-indice.mjs: não editar à mão. */
import type { CmsFaq } from "@/lib/outbox-cms";
${imports.join("\n")}

export type PostTraduzido = {
  title?: string;
  excerpt?: string | null;
  category?: string | null;
  content?: string;
  answer_summary?: string | null;
  key_takeaways?: string[];
  faq?: CmsFaq[];
  author_credentials?: string | null;
  author_bio?: string | null;
  cover_alt?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
};

export const TRADUCOES_BLOG: Record<string, Record<string, PostTraduzido>> = {
${mapa.join("\n")}
};
`;
writeFileSync(join(BASE, "indice.ts"), cabecalho);
console.log(`indice.ts: ${n} artigos traduzidos`);
