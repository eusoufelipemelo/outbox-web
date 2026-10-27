import GoogleEmpresas, { metadataGoogleEmpresas } from "@/components/paginas/GoogleEmpresas";

export const metadata = metadataGoogleEmpresas("pt");

export default function Page() {
  return <GoogleEmpresas />;
}
