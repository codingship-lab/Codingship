import { NextResponse } from "next/server";
import { mockServices } from "@/lib/mock-data";

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const service = mockServices.find((s) => s.slug === params.slug);
  if (!service) return NextResponse.json({ error: { code: "NOT_FOUND", message: "Service not found" } }, { status: 404 });
  return NextResponse.json({ data: service });
}
