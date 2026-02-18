export const EMBED_ALLOWED_DOMAINS = (process.env.NEXT_PUBLIC_EMBED_ALLOWLIST ?? "").split(",").map((d) => d.trim()).filter(Boolean);
export const APP_ORIGIN = process.env.APP_ORIGIN ?? "http://localhost:3000";
