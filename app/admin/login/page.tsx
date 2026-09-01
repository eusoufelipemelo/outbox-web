"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isSupabaseConfigured) {
      setError(
        "As credenciais do Supabase ainda não foram configuradas no servidor."
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (authError) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push(params.get("next") ?? "/admin");
    router.refresh();
  }

  return (
    <div className="admin" data-theme="dark">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="glow glow--brand absolute left-1/2 top-1/4 h-[460px] w-[560px] -translate-x-1/2" />
        </div>

        <div className="admin-panel relative z-10 w-full max-w-[400px] p-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/brand/logo-mark.svg"
              alt=""
              width={46}
              height={46}
              className="h-[46px] w-[46px]"
            />
            <h1 className="mt-5 font-display text-[26px] font-semibold">
              Painel OutBox
            </h1>
            <p
              className="mt-2 text-[14.5px]"
              style={{ color: "var(--a-muted)" }}
            >
              Entre para gerenciar o blog e os leads.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13.5px] font-medium"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="felipe@outboxgroup.com.br"
                className="admin-input"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[13.5px] font-medium"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="admin-input"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl border px-4 py-3 text-[13.5px]"
                style={{
                  borderColor: "rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.1)",
                  color: "#fca5a5",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="admin-btn admin-btn--primary mt-1 w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Entrar
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
