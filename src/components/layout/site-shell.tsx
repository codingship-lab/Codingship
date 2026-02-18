import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUserRole } from "@/lib/auth";

export async function SiteShell({ children }: { children: ReactNode }) {
  const role = await getCurrentUserRole();

  return (
    <div className="min-h-screen">
      <SiteHeader isAdmin={role === "admin"} />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
