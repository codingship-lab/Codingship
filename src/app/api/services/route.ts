import { NextResponse } from "next/server";
import { mockServices } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: mockServices.filter((s) => s.published) });
}
