import BlogIndice, { metadataBlog } from "@/components/paginas/BlogIndice";
import { ehIdioma } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/server";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataBlog(lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]/blog">) {
  const { lang } = await params;
  if (ehIdioma(lang)) setLocale(lang);
  return <BlogIndice />;
}
