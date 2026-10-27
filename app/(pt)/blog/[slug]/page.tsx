import BlogArtigo, { metadataArtigo } from "@/components/paginas/BlogArtigo";

export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return metadataArtigo(slug, "pt");
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  return <BlogArtigo slug={slug} />;
}
