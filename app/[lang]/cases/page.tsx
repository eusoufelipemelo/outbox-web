import Cases, { metadataCases } from "@/components/paginas/Cases";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/cases">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataCases(lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/cases">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <Cases />;
}
