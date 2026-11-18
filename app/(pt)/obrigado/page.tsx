import Obrigado, { metadataObrigado } from "@/components/paginas/Obrigado";

export const metadata = metadataObrigado("pt");

export default async function Page({ searchParams }: PageProps<"/obrigado">) {
  const { origem } = await searchParams;
  return <Obrigado origem={typeof origem === "string" ? origem : undefined} />;
}
