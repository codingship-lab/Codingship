import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminRole } from "@/lib/auth";

const schema = z.object({
  name: z.string(),
  slug: z.string(),
  short_description: z.string(),
  full_description: z.string(),
  embed_url: z.string().optional(),
  external_url: z.string().optional(),
  status: z.enum(["Beta", "Live", "Deprecated"]),
  featured: z.boolean(),
  published: z.boolean(),
  embed_policy: z.enum(["allow", "deny"])
});

export async function POST(req: Request) {
  const isAdmin = await requireAdminRole();
  if (!isAdmin) {
    return NextResponse.json(
      { error: { code: "FORBIDDEN", message: "Admin role required" } },
      { status: 403 }
    );
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "VALIDATION_ERROR", message: parsed.error.message } },
      { status: 400 }
    );
  }

  return NextResponse.json({ data: parsed.data, message: "Created" }, { status: 201 });
}
