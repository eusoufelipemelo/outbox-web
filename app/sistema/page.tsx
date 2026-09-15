import type { Metadata } from "next";
import Material from "@/components/sistema/Material";
import { SITE } from "@/lib/site";

const titulo = "Sistema sob medida e Micro SaaS: material de estudo dos consultores";
const descricao =
  "Como funciona, como vender e por que esse produto muda o tamanho da sua venda. Onze módulos, falas prontas, tratamento de objeções e autoavaliação.";

export const metadata: Metadata = {
  title: "Sistemas e Micro SaaS · Material do consultor",
  description: descricao,
  alternates: { canonical: `${SITE.url}/sistema` },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: `${SITE.url}/sistema`,
    siteName: SITE.name,
    title: titulo,
    description: descricao,
    images: [{ url: "/sistema-og.png", width: 1200, height: 630, alt: titulo }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: descricao, images: ["/sistema-og.png"] },
  /* material interno: fica fora da busca, como a proposta em aberto */
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Material />;
}
