import Home from "@/components/paginas/Home";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <Home />;
}
