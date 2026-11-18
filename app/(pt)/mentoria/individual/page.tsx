import Mentoria, { metadataMentoria } from "@/components/paginas/Mentoria";

export const metadata = metadataMentoria("individual", "pt");

export default function Page() {
  return <Mentoria pagina="individual" />;
}
