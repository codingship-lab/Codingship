import { NextResponse } from "next/server";
import { listPublishedServices } from "@/lib/services";

export async function GET() {
  const services = await listPublishedServices();
  return NextResponse.json({ data: services });
}
