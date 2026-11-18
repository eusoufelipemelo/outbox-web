import Mentoria, { metadataMentoria } from "@/components/paginas/Mentoria";

export const metadata = metadataMentoria("grupo", "pt");

export default function Page() {
  return <Mentoria pagina="grupo" />;
}
