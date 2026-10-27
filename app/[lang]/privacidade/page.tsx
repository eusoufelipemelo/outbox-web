import LegalPage from "@/components/legal/LegalPage";
import HtmlLegal, { metadataLegal } from "@/components/legal/HtmlLegal";
import { DOCS_LEGAIS } from "@/lib/legal";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataLegal("privacidade", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/privacidade">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return (
    <LegalPage titulo={DOCS_LEGAIS.privacidade.titulo} resumo={DOCS_LEGAIS.privacidade.resumo}>
      <HtmlLegal doc="privacidade" />
    </LegalPage>
  );
}
