import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

type Env = {
  APP_ORIGIN: string;
  TURNSTILE_SECRET_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  R2_BUCKET_NAME: string;
  RATE_LIMIT_KV: KVNamespace;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", async (c, next) => {
  await next();
  c.header("X-Content-Type-Options", "nosniff");
  c.header("Referrer-Policy", "strict-origin-when-cross-origin");
  c.header("X-Frame-Options", "SAMEORIGIN");
  c.header("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
});

app.use("/api/*", cors({ origin: (origin, c) => (origin === c.env.APP_ORIGIN ? origin : "") }));

const serviceSchema = z.object({
  name: z.string(),
  slug: z.string(),
  short_description: z.string(),
  full_description: z.string(),
  status: z.enum(["Beta", "Live", "Deprecated"]),
  featured: z.boolean(),
  published: z.boolean(),
  embed_url: z.string().nullable().optional(),
  external_url: z.string().nullable().optional(),
  embed_policy: z.enum(["allow", "deny"]) 
});

async function rateLimit(c: any, keySuffix: string) {
  const ip = c.req.header("cf-connecting-ip") ?? "unknown";
  const key = `rate:${ip}:${keySuffix}:${Math.floor(Date.now() / 60000)}`;
  const count = Number((await c.env.RATE_LIMIT_KV.get(key)) ?? "0");
  if (count > 30) return false;
  await c.env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 120 });
  return true;
}

function err(code: string, message: string, status = 400) {
  return new Response(JSON.stringify({ error: { code, message } }), { status, headers: { "Content-Type": "application/json" } });
}

app.get("/api/services", (c) => c.json({ data: [] }));
app.get("/api/services/:slug", (c) => c.json({ data: null, slug: c.req.param("slug") }));

app.post("/api/admin/services", async (c) => {
  if (!(await rateLimit(c, "admin"))) return err("RATE_LIMITED", "Too many requests", 429);
  const payload = await c.req.json();
  const parsed = serviceSchema.safeParse(payload);
  if (!parsed.success) return err("VALIDATION_ERROR", parsed.error.message);
  return c.json({ data: parsed.data, audit: { created_at: new Date().toISOString() } }, 201);
});

app.put("/api/admin/services/:id", async (c) => {
  if (!(await rateLimit(c, "admin"))) return err("RATE_LIMITED", "Too many requests", 429);
  return c.json({ data: { id: c.req.param("id") } });
});

app.delete("/api/admin/services/:id", async (c) => {
  if (!(await rateLimit(c, "admin"))) return err("RATE_LIMITED", "Too many requests", 429);
  return c.json({ data: { id: c.req.param("id"), deleted: true } });
});

app.post("/api/admin/upload-url", async (c) => {
  if (!(await rateLimit(c, "upload"))) return err("RATE_LIMITED", "Too many requests", 429);
  return c.json({ data: { key: `services/${crypto.randomUUID()}.png`, uploadUrl: "https://signed-url.example" } });
});

export default app;
