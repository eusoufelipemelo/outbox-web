import GoogleEmpresas, { metadataGoogleEmpresas } from "@/components/paginas/GoogleEmpresas";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/google-empresas">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataGoogleEmpresas(lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/google-empresas">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <GoogleEmpresas />;
}
