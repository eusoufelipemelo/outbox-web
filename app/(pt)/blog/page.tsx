import BlogIndice, { metadataBlog } from "@/components/paginas/BlogIndice";

export const revalidate = 60;
export const metadata = metadataBlog("pt");

export default function Page() {
  return <BlogIndice />;
}
