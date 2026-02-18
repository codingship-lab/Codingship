# Codingship

Production-oriented AI Labs catalog (Google Labs-like IA) with OpenAI-ish minimal UI language.

## Project structure

- `src/app` — Next.js App Router pages (`/`, `/labs`, `/labs/[slug]`, `/about`, `/login`, `/admin`).
- `src/components` — UI primitives and feature components.
- `src/lib` — typed models, config, API helpers.
- `src/app/api` — local API routes for services/admin/upload/auth callback.
- `worker/src/index.ts` — Cloudflare Worker API (Hono) for production backend.
- `db/001_init.sql` — Supabase schema + RLS policies.
- `wrangler.toml` — Worker deploy config + KV binding.

## Local run

1. Copy env:
   ```bash
   cp .env.example .env.local
   ```
2. Install deps and run frontend:
   ```bash
   npm install
   npm run dev
   ```
3. Run worker (optional local backend):
   ```bash
   npm run worker:dev
   ```

## Deploy

### Cloudflare Pages (frontend)
1. Connect repository in Cloudflare Pages.
2. Build command: `npm run build`, output: `.next` (via Next on Pages adapter if used) or standard Next deployment target.
3. Set public env vars from `.env.example`.

### Cloudflare Worker (backend)
1. Create KV namespace for rate limiting.
2. Update `wrangler.toml` KV id and vars.
3. Set secrets:
   ```bash
   wrangler secret put SUPABASE_SERVICE_ROLE_KEY
   wrangler secret put TURNSTILE_SECRET_KEY
   ```
4. Deploy:
   ```bash
   npm run worker:deploy
   ```

## Supabase setup

1. Run SQL from `db/001_init.sql` in SQL editor.
2. Insert first admin role:
   ```sql
   insert into public.roles(user_id, role) values ('<auth_user_uuid>', 'admin');
   ```
3. Configure Auth providers:
   - Email magic link
   - Google OAuth

## Turnstile + Rate limit

- Render Turnstile widget on `/login` and include tokens in admin mutating requests.
- Worker enforces per-IP rate limit (`30 req/min`) via KV in `/api/admin/*`.

## Notes

- Embeds are rendered inside `/labs/[slug]` with `iframe sandbox`.
- If embed fails or domain is not allowlisted, an in-site fallback card is shown with external open action.
