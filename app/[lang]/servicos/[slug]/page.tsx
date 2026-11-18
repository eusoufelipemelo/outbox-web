import Servico, { metadataServico, SLUGS_SERVICO } from "@/components/paginas/Servico";
import { ehIdioma, OUTROS_IDIOMAS } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return OUTROS_IDIOMAS.flatMap((lang) => SLUGS_SERVICO.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/servicos/[slug]">) {
  const { lang, slug } = await params;
  return ehIdioma(lang) ? metadataServico(slug, lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/servicos/[slug]">) {
  const { lang, slug } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <Servico slug={slug} />;
}
