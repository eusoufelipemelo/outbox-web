import type { MetadataRoute } from "next";
import { LEGAL_LINKS, SITE } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, isDemo } = await getPublishedPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    {
      url: `${SITE.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...LEGAL_LINKS.map((l) => ({
      url: `${SITE.url}${l.href}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  if (isDemo) return staticRoutes;

  return [
    ...staticRoutes,
    ...posts.map((p) => ({
      url: `${SITE.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.published_at ?? p.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
