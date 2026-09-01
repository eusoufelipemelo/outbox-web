import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  cover_url: string | null;
  category: string | null;
  author: string | null;
  read_minutes: number | null;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
};

/**
 * Posts de demonstração usados enquanto o Supabase não está conectado
 * ou quando a tabela ainda está vazia. Some assim que houver posts reais.
 */
export const DEMO_POSTS: Post[] = [
  {
    id: "demo-1",
    slug: "geo-como-aparecer-nas-respostas-das-ias",
    title: "GEO: como fazer sua empresa aparecer nas respostas do ChatGPT",
    excerpt:
      "O Google deixou de ser a única porta de entrada. Entenda o que é GEO, por que ele virou tão importante quanto o SEO e o que muda na prática no seu site.",
    content: null,
    cover_url: null,
    category: "SEO e GEO",
    author: "Felipe Melo",
    read_minutes: 6,
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "demo-2",
    slug: "quanto-a-lentidao-do-site-custa",
    title: "Quanto a lentidão do seu site custa por mês",
    excerpt:
      "Cada segundo a mais de carregamento derruba conversão. Veja como medir a performance do seu site e o que costuma estar pesando sem você perceber.",
    content: null,
    cover_url: null,
    category: "Performance",
    author: "Felipe Melo",
    read_minutes: 5,
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: null,
  },
  {
    id: "demo-3",
    slug: "apresentacao-em-link-x-pdf",
    title: "Por que trocamos o PDF pela apresentação em link",
    excerpt:
      "Arquivo pesado, versão desatualizada e zero controle sobre o que o cliente vê. A apresentação em link resolve os três problemas de uma vez.",
    content: null,
    cover_url: null,
    category: "Apresentações",
    author: "Felipe Melo",
    read_minutes: 4,
    status: "published",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: null,
  },
];

/** Lista os posts publicados. Cai nos posts de demonstração se não houver nada. */
export async function getPublishedPosts(limit?: number): Promise<{
  posts: Post[];
  isDemo: boolean;
}> {
  if (!isSupabaseConfigured) {
    return { posts: limit ? DEMO_POSTS.slice(0, limit) : DEMO_POSTS, isDemo: true };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return {
        posts: limit ? DEMO_POSTS.slice(0, limit) : DEMO_POSTS,
        isDemo: true,
      };
    }
    return { posts: data as Post[], isDemo: false };
  } catch {
    return {
      posts: limit ? DEMO_POSTS.slice(0, limit) : DEMO_POSTS,
      isDemo: true,
    };
  }
}

/** Busca um post publicado pelo slug. */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isSupabaseConfigured) {
    return DEMO_POSTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return DEMO_POSTS.find((p) => p.slug === slug) ?? null;
    return data as Post;
  } catch {
    return DEMO_POSTS.find((p) => p.slug === slug) ?? null;
  }
}

/** Data no formato brasileiro. */
export function formatDate(value: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/** Estimativa de tempo de leitura a partir do conteúdo. */
export function estimateReadMinutes(content: string | null) {
  if (!content) return 3;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
