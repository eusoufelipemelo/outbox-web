import type { Metadata } from "next";
import Proposta from "@/components/proposta-essence/Proposta";
import { SITE } from "@/lib/site";

const rota = "/proposta-essence-arquitetura";
const titulo = "Proposta para a Essence Arquitetura";
const descricao =
  "Perfil da Empresa no Google, site com blog e CMS próprio e artigos todo mês. Tudo pronto em 3 dias depois do briefing, com o site de R$ 4.500 de brinde.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  alternates: { canonical: `${SITE.url}${rota}` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE.url}${rota}`,
    siteName: SITE.name,
    title: `${titulo} | OutBox`,
    description: descricao,
    images: [
      {
        url: "/proposta-essence-og.jpg",
        width: 1200,
        height: 630,
        alt: "Proposta da OutBox para a Essence Arquitetura, da arquiteta Deborah Medeiros",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${titulo} | OutBox`,
    description: descricao,
    images: ["/proposta-essence-og.jpg"],
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Proposta />;
}
