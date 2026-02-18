import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ data: { uploadUrl: "https://example-r2-upload-url", key: "services/demo.png" } });
}
