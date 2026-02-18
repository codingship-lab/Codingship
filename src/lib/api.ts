import { Service } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export async function getServices(params?: Record<string, string>) {
  const qs = params ? `?${new URLSearchParams(params).toString()}` : "";
  const res = await fetch(`${API_BASE}/services${qs}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load services");
  return (await res.json()) as { data: Service[] };
}

export async function getServiceBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/services/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load service");
  return (await res.json()) as { data: Service };
}
