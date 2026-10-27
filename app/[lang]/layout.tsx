import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import Documento from "@/components/site/Documento";
import { ehIdioma, OUTROS_IDIOMAS } from "@/lib/i18n/config";
import { metadataBase } from "@/lib/i18n/meta";
import { setLocale } from "@/lib/i18n/server";

export const dynamicParams = false;

export function generateStaticParams() {
  return OUTROS_IDIOMAS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return ehIdioma(lang) ? metadataBase(lang) : {};
}

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default async function LayoutIdioma({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!ehIdioma(lang)) notFound();
  setLocale(lang);
  return <Documento locale={lang}>{children}</Documento>;
}
