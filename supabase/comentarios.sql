-- ============================================================
-- Comentários e dúvidas nos artigos do blog (10/11/2026)
-- Rode uma vez no SQL Editor do Supabase de produção.
-- Moderado: o comentário nasce "pendente" e só aparece no artigo
-- depois que alguém do painel aprova. O e-mail nunca é público.
-- ============================================================

create table if not exists public.comentarios (
  id             uuid primary key default gen_random_uuid(),
  post_slug      text not null,
  idioma         text not null default 'pt' check (idioma in ('pt','en','es','ca')),
  nome           text not null check (char_length(nome) between 2 and 80),
  email          text not null,
  texto          text not null check (char_length(texto) between 3 and 2000),
  status         text not null default 'pendente' check (status in ('pendente','aprovado','recusado')),
  resposta       text,
  respondido_em  timestamptz,
  aprovado_em    timestamptz,
  created_at     timestamptz not null default now()
);

create index if not exists comentarios_post_idx
  on public.comentarios (post_slug, status, created_at);
create index if not exists comentarios_status_idx
  on public.comentarios (status, created_at desc);

alter table public.comentarios enable row level security;

-- Visitante não lê nem grava direto: o site grava e lê pelo servidor
-- (service_role) e só entrega nome, texto e resposta dos aprovados.
-- O painel (usuário autenticado) vê e modera tudo.
drop policy if exists "admin_le_comentarios" on public.comentarios;
create policy "admin_le_comentarios"
  on public.comentarios for select
  to authenticated using (true);

drop policy if exists "admin_modera_comentarios" on public.comentarios;
create policy "admin_modera_comentarios"
  on public.comentarios for update
  to authenticated using (true) with check (true);

drop policy if exists "admin_apaga_comentarios" on public.comentarios;
create policy "admin_apaga_comentarios"
  on public.comentarios for delete
  to authenticated using (true);

notify pgrst, 'reload schema';
