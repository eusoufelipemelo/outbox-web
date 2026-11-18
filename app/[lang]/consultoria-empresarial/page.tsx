import Consultoria, { metadataConsultoria } from "@/components/paginas/Consultoria";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/consultoria-empresarial">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataConsultoria(lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/consultoria-empresarial">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <Consultoria />;
}
