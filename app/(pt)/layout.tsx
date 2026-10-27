import type { Metadata, Viewport } from "next";
import "../globals.css";
import Documento from "@/components/site/Documento";
import { metadataBase } from "@/lib/i18n/meta";

export const metadata: Metadata = metadataBase("pt");

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Documento locale="pt">{children}</Documento>;
}
