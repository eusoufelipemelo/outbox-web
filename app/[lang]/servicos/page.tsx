import Catalogo, { metadataCatalogo } from "@/components/paginas/Catalogo";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/servicos">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataCatalogo(lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/servicos">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <Catalogo />;
}
