import Mentoria, { metadataMentoria } from "@/components/paginas/Mentoria";

export const metadata = metadataMentoria("entrada", "pt");

export default function Page() {
  return <Mentoria pagina="entrada" />;
}
