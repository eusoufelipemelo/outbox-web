import LegalPage from "@/components/legal/LegalPage";
import HtmlLegal, { metadataLegal } from "@/components/legal/HtmlLegal";
import { DOCS_LEGAIS } from "@/lib/legal";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/termos">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataLegal("termos", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/termos">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return (
    <LegalPage titulo={DOCS_LEGAIS.termos.titulo} resumo={DOCS_LEGAIS.termos.resumo}>
      <HtmlLegal doc="termos" />
    </LegalPage>
  );
}
