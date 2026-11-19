import BlogArtigo, { metadataArtigo } from "@/components/paginas/BlogArtigo";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export const revalidate = 60;

// Nenhum artigo é gerado no build: cada um é montado na primeira visita e
// fica em cache (ISR), atualizado a cada 60 s ou na hora ao publicar no CMS.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  return ehIdioma(lang) ? metadataArtigo(slug, lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <BlogArtigo slug={slug} />;
}
