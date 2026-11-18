import Obrigado, { metadataObrigado } from "@/components/paginas/Obrigado";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/obrigado">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataObrigado(lang) : {};
}

export default async function Page({ params, searchParams }: PageProps<"/[lang]/obrigado">) {
  const { lang } = await params;
  const { origem } = await searchParams;
  if (ehIdioma(lang)) setLocale(lang);
  return <Obrigado origem={typeof origem === "string" ? origem : undefined} />;
}
