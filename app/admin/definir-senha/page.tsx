"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function DefinirSenhaPage() {
  return (
    <Suspense fallback={null}>
      <DefinirSenhaForm />
    </Suspense>
  );
}

type Fase = "verificando" | "pronto" | "salvando" | "ok" | "erro";

function DefinirSenhaForm() {
  const params = useSearchParams();
  const router = useRouter();

  const [fase, setFase] = useState<Fase>("verificando");
  const [erro, setErro] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");

  // Troca o token do link por uma sessão temporária
  useEffect(() => {
    const token = params.get("token");

    if (!isSupabaseConfigured) {
      setFase("erro");
      setErro("As credenciais do Supabase não estão configuradas no servidor.");
      return;
    }

    (async () => {
      const supabase = createClient();

      // Já autenticado? Então é só trocar a senha.
      const { data: sessao } = await supabase.auth.getSession();
      if (sessao.session) {
        setFase("pronto");
        return;
      }

      if (!token) {
        setFase("erro");
        setErro("Link inválido ou incompleto. Peça um novo link de acesso.");
        return;
      }

      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "recovery",
      });

      if (error) {
        setFase("erro");
        setErro(
          "Este link expirou ou já foi usado. Peça um novo link de acesso."
        );
        return;
      }
      setFase("pronto");
    })();
  }, [params]);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha.length < 8) {
      setErro("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (senha !== confirma) {
      setErro("As duas senhas não são iguais.");
      return;
    }

    setFase("salvando");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: senha });

    if (error) {
      setFase("pronto");
      setErro("Não consegui salvar a senha. Tente novamente.");
      return;
    }

    setFase("ok");
    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1400);
  }

  return (
    <div className="admin" data-theme="dark">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-6">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="ambient ambient--top" />
        </div>

        <div className="admin-panel relative z-10 w-full max-w-[420px] p-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/brand/logo-mark.svg"
              alt=""
              width={46}
              height={46}
              className="h-[46px] w-[46px]"
            />
            <h1 className="mt-5 font-display text-[25px] font-semibold">
              Definir sua senha
            </h1>
            <p
              className="mt-2 text-[14.5px]"
              style={{ color: "var(--a-muted)" }}
            >
              Escolha a senha que você vai usar para entrar no painel.
            </p>
          </div>

          {fase === "verificando" && (
            <div className="mt-9 flex flex-col items-center gap-3 py-6">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-[14px]" style={{ color: "var(--a-muted)" }}>
                Validando seu link de acesso...
              </p>
            </div>
          )}

          {fase === "ok" && (
            <div className="mt-9 flex flex-col items-center gap-3 py-6 text-center">
              <ShieldCheck className="h-8 w-8" style={{ color: "#4ade80" }} />
              <p className="font-display text-[17px]">Senha definida!</p>
              <p className="text-[14px]" style={{ color: "var(--a-muted)" }}>
                Entrando no painel...
              </p>
            </div>
          )}

          {(fase === "pronto" || fase === "salvando") && (
            <form onSubmit={salvar} className="mt-8 flex flex-col gap-4">
              <div>
                <label
                  htmlFor="senha"
                  className="mb-2 block text-[13.5px] font-medium"
                >
                  Nova senha
                </label>
                <input
                  id="senha"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Mínimo de 8 caracteres"
                  className="admin-input"
                />
              </div>

              <div>
                <label
                  htmlFor="confirma"
                  className="mb-2 block text-[13.5px] font-medium"
                >
                  Repita a senha
                </label>
                <input
                  id="confirma"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirma}
                  onChange={(e) => setConfirma(e.target.value)}
                  placeholder="Digite de novo"
                  className="admin-input"
                />
              </div>

              {erro && (
                <p
                  role="alert"
                  className="rounded-xl px-4 py-3 text-[13.5px]"
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    color: "#fca5a5",
                  }}
                >
                  {erro}
                </p>
              )}

              <button
                type="submit"
                disabled={fase === "salvando"}
                className="admin-btn admin-btn--primary mt-1 w-full"
              >
                {fase === "salvando" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Salvar e entrar
                  </>
                )}
              </button>
            </form>
          )}

          {fase === "erro" && (
            <div className="mt-8">
              <p
                role="alert"
                className="rounded-xl px-4 py-3 text-[13.5px]"
                style={{ background: "rgba(239,68,68,0.1)", color: "#fca5a5" }}
              >
                {erro}
              </p>
              <a
                href="/admin/login"
                className="admin-btn admin-btn--ghost mt-4 w-full"
              >
                Voltar para o login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
