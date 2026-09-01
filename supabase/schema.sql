-- ============================================================
-- OutBox Group — schema do blog e dos leads
-- Rode este arquivo no SQL Editor do Supabase (uma vez só).
-- ============================================================

-- ------------------------------------------------------------
-- 1) Tabela de posts do blog
-- ------------------------------------------------------------
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text,
  content       text,
  cover_url     text,
  category      text,
  author        text default 'Felipe Melo',
  read_minutes  int  default 3,
  status        text not null default 'draft' check (status in ('draft','published')),
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz
);

create index if not exists posts_status_published_idx
  on public.posts (status, published_at desc);

create index if not exists posts_slug_idx on public.posts (slug);

alter table public.posts enable row level security;

-- Qualquer visitante lê apenas o que está publicado
drop policy if exists "posts_publicos_sao_visiveis" on public.posts;
create policy "posts_publicos_sao_visiveis"
  on public.posts for select
  using (status = 'published');

-- Usuário autenticado (você) enxerga e gerencia tudo
drop policy if exists "admin_le_tudo" on public.posts;
create policy "admin_le_tudo"
  on public.posts for select
  to authenticated using (true);

drop policy if exists "admin_cria" on public.posts;
create policy "admin_cria"
  on public.posts for insert
  to authenticated with check (true);

drop policy if exists "admin_edita" on public.posts;
create policy "admin_edita"
  on public.posts for update
  to authenticated using (true) with check (true);

drop policy if exists "admin_apaga" on public.posts;
create policy "admin_apaga"
  on public.posts for delete
  to authenticated using (true);


-- ------------------------------------------------------------
-- 2) Tabela de leads do formulário
-- ------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  nome          text not null,
  email         text not null,
  servico       text not null,
  mensagem      text,
  videochamada  boolean not null default false,
  origem        text default 'site',
  created_at    timestamptz not null default now()
);

create index if not exists leads_created_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Ninguém lê os leads pelo navegador: só o painel autenticado.
-- A gravação acontece no servidor, com a service_role, que ignora RLS.
drop policy if exists "admin_le_leads" on public.leads;
create policy "admin_le_leads"
  on public.leads for select
  to authenticated using (true);


-- ------------------------------------------------------------
-- 3) Storage: bucket público para as imagens do blog
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;

drop policy if exists "blog_leitura_publica" on storage.objects;
create policy "blog_leitura_publica"
  on storage.objects for select
  using (bucket_id = 'blog');

drop policy if exists "blog_upload_autenticado" on storage.objects;
create policy "blog_upload_autenticado"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'blog');

drop policy if exists "blog_update_autenticado" on storage.objects;
create policy "blog_update_autenticado"
  on storage.objects for update
  to authenticated using (bucket_id = 'blog');

drop policy if exists "blog_delete_autenticado" on storage.objects;
create policy "blog_delete_autenticado"
  on storage.objects for delete
  to authenticated using (bucket_id = 'blog');


-- ------------------------------------------------------------
-- Pronto. Depois disso:
-- 1. Vá em Authentication > Users > Add user e crie o seu login
--    (felipe@outboxgroup.com.br + senha), marcando "Auto Confirm User".
-- 2. Em Authentication > Providers, deixe apenas E-mail ativo
--    e desligue "Enable sign ups" para ninguém mais criar conta.
-- ------------------------------------------------------------
