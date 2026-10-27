import BlogArtigo, { metadataArtigo } from "@/components/paginas/BlogArtigo";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  return ehIdioma(lang) ? metadataArtigo(slug, lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <BlogArtigo slug={slug} />;
}
