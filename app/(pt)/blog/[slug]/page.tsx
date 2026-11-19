import BlogArtigo, { metadataArtigo } from "@/components/paginas/BlogArtigo";

export const revalidate = 60;

// Nenhum artigo é gerado no build: cada um é montado na primeira visita e
// fica em cache (ISR), atualizado a cada 60 s ou na hora ao publicar no CMS.
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return metadataArtigo(slug, "pt");
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <BlogArtigo slug={slug} />;
}
