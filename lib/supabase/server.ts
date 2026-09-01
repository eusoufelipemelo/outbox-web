import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Cliente para Server Components e Route Handlers (respeita a sessão do usuário). */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Chamado de um Server Component: o middleware cuida da renovação.
        }
      },
    },
  });
}

/**
 * Cliente administrativo (ignora RLS). Use apenas no servidor,
 * em rotas protegidas, nunca no navegador.
 */
export function createAdminClient() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) return null;

  return createServerClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    cookies: { getAll: () => [], setAll: () => {} },
  });
}
