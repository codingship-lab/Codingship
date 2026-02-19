import { NextResponse } from "next/server";
import { requireAdminRole } from "@/lib/auth";

export async function POST() {
  const isAdmin = await requireAdminRole();
  if (!isAdmin) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Admin role required" } },
      { status: 403 }
    );
  }

  return NextResponse.json({
    data: { uploadUrl: "https://example-r2-upload-url", key: "services/demo.png" }
  });
}
