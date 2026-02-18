create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null,
  full_description text not null,
  embed_url text,
  external_url text,
  status text not null check (status in ('Beta','Live','Deprecated')),
  featured boolean not null default false,
  published boolean not null default false,
  logo_url text,
  card_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id)
);

create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique
);

create table if not exists public.service_tags (
  service_id uuid not null references public.services(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete cascade,
  primary key (service_id, tag_id)
);

create table if not exists public.roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin'))
);

alter table public.services enable row level security;
alter table public.tags enable row level security;
alter table public.service_tags enable row level security;
alter table public.roles enable row level security;

create policy "public read published services" on public.services
for select using (published = true);

create policy "public read tags" on public.tags
for select using (true);

create policy "public read service_tags" on public.service_tags
for select using (true);

create policy "users can read own role" on public.roles
for select using (auth.uid() = user_id);

create policy "admins can manage services" on public.services
for all using (
  exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role = 'admin')
)
with check (
  exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role = 'admin')
);

create policy "admins can manage tags" on public.tags
for all using (
  exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role = 'admin')
)
with check (
  exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role = 'admin')
);

create policy "admins can manage service tags" on public.service_tags
for all using (
  exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role = 'admin')
)
with check (
  exists (select 1 from public.roles r where r.user_id = auth.uid() and r.role = 'admin')
);
