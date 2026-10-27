import LegalPage from "@/components/legal/LegalPage";
import HtmlLegal, { metadataLegal } from "@/components/legal/HtmlLegal";
import { DOCS_LEGAIS } from "@/lib/legal";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/lgpd">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataLegal("lgpd", lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/lgpd">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return (
    <LegalPage titulo={DOCS_LEGAIS.lgpd.titulo} resumo={DOCS_LEGAIS.lgpd.resumo}>
      <HtmlLegal doc="lgpd" />
    </LegalPage>
  );
}
