import type { Metadata } from "next";
import Proposta from "@/components/proposta-gmn/Proposta";
import { SITE } from "@/lib/site";

const titulo = "Seu cliente já procurou pelo seu serviço hoje. Ele só não encontrou você.";
const descricao =
  "A busca mudou duas vezes: o mapa do Google e as respostas de inteligência artificial. Veja o que está em jogo e simule quanto vale um cliente novo para a sua empresa.";

export const metadata: Metadata = {
  title: "Perfil no Google e site com IA",
  description: descricao,
  alternates: { canonical: `${SITE.url}/proposta-gmn` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${SITE.url}/proposta-gmn`,
    siteName: SITE.name,
    title: titulo,
    description: descricao,
    images: [
      {
        url: "/proposta-gmn-og.png",
        width: 1200,
        height: 630,
        alt: "Proposta da OutBox: Perfil da Empresa no Google e site construído com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/proposta-gmn-og.png"],
  },
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Proposta />;
}
