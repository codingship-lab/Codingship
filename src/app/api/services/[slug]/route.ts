import { NextResponse } from "next/server";
import { getPublishedServiceBySlug } from "@/lib/services";

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getPublishedServiceBySlug(slug);
  if (!service) {
    return NextResponse.json(
      { error: { code: "NOT_FOUND", message: "Service not found" } },
      { status: 404 }
    );
  }
  return NextResponse.json({ data: service });
}
