import Servico, { metadataServico, SLUGS_SERVICO } from "@/components/paginas/Servico";

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS_SERVICO.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  return metadataServico(slug, "pt");
}

export default async function Page({ params }: PageProps<"/servicos/[slug]">) {
  const { slug } = await params;
  return <Servico slug={slug} />;
}
