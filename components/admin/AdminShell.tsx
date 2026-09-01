"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  FileText,
  Inbox,
  LogOut,
  Moon,
  PenSquare,
  Sun,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Posts", icon: FileText, exact: true },
  { href: "/admin/posts/novo", label: "Novo post", icon: PenSquare },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export default function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("outbox-admin-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("outbox-admin-theme", theme);
  }, [theme]);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin" data-theme={theme}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Barra lateral */}
        <aside
          className="shrink-0 border-b lg:min-h-screen lg:w-[258px] lg:border-b-0 lg:border-r"
          style={{ borderColor: "var(--a-line)", background: "var(--a-panel)" }}
        >
          <div className="flex h-full flex-col p-5">
            <Link href="/admin" className="flex items-center gap-2.5 px-1 py-1">
              <Image
                src="/brand/logo-mark.svg"
                alt=""
                width={30}
                height={30}
                className="h-[30px] w-[30px]"
              />
              <span className="flex flex-col leading-none">
                <span className="font-display text-[17px] font-semibold">
                  OutBox
                </span>
                <span
                  className="mt-1 text-[11px] uppercase tracking-widest"
                  style={{ color: "var(--a-subtle)" }}
                >
                  Painel
                </span>
              </span>
            </Link>

            <nav className="mt-8 flex flex-1 flex-col gap-1">
              {NAV.map((item) => {
                const active = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] transition-colors duration-200"
                    style={{
                      background: active ? "var(--a-brand)" : "transparent",
                      color: active ? "#fff" : "var(--a-muted)",
                    }}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div
              className="mt-6 flex flex-col gap-1 border-t pt-4"
              style={{ borderColor: "var(--a-line)" }}
            >
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] transition-colors duration-200 hover:bg-[var(--a-hover)]"
                style={{ color: "var(--a-muted)" }}
              >
                <ExternalLink className="h-[18px] w-[18px]" />
                Ver o site
              </a>

              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] transition-colors duration-200 hover:bg-[var(--a-hover)]"
                style={{ color: "var(--a-muted)" }}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-[18px] w-[18px]" />
                    Modo claro
                  </>
                ) : (
                  <>
                    <Moon className="h-[18px] w-[18px]" />
                    Modo escuro
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={signOut}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14.5px] transition-colors duration-200 hover:bg-[var(--a-hover)]"
                style={{ color: "var(--a-muted)" }}
              >
                <LogOut className="h-[18px] w-[18px]" />
                Sair
              </button>

              {email && (
                <p
                  className="mt-2 truncate px-3.5 text-[12px]"
                  style={{ color: "var(--a-subtle)" }}
                  title={email}
                >
                  {email}
                </p>
              )}
            </div>
          </div>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
