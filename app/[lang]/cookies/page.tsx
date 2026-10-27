import LegalPage from "@/components/legal/LegalPage";
import HtmlLegal, { metadataLegal } from "@/components/legal/HtmlLegal";
import { DOCS_LEGAIS } from "@/lib/legal";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/cookies">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataLegal("cookies", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/cookies">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return (
    <LegalPage titulo={DOCS_LEGAIS.cookies.titulo} resumo={DOCS_LEGAIS.cookies.resumo}>
      <HtmlLegal doc="cookies" />
    </LegalPage>
  );
}
