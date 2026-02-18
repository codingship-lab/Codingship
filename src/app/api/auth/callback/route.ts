import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect(new URL("/labs", process.env.APP_ORIGIN ?? "http://localhost:3000"));
}
