import Mentoria, { metadataMentoria } from "@/components/paginas/Mentoria";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/mentoria/grupo">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataMentoria("grupo", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/mentoria/grupo">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <Mentoria pagina="grupo" />;
}
