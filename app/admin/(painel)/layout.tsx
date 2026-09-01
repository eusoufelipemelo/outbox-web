import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let email: string | null = null;

  if (isSupabaseConfigured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? null;
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
