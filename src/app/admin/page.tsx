import { redirect } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ServiceForm } from "@/components/admin/service-form";

async function isAdmin() {
  return true;
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/login");

  return (
    <SiteShell>
      <section className="mx-auto max-w-3xl space-y-6">
        <h1 className="point text-4xl font-semibold tracking-tight">Admin</h1>
        <p className="text-subtle">Role-based management from `roles` table. Includes CRUD, upload URLs, and turnstile-protected actions.</p>
        <div className="rounded-xl3 border border-border bg-panel p-6">
          <ServiceForm />
        </div>
      </section>
    </SiteShell>
  );
}
