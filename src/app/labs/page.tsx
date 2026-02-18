import { SiteShell } from "@/components/layout/site-shell";
import { Catalog } from "@/components/labs/catalog";
import { getServices } from "@/lib/api";

export default async function LabsPage() {
  const { data } = await getServices();
  return (
    <SiteShell>
      <section className="space-y-8">
        <header>
          <h1 className="point text-4xl font-semibold tracking-tight">Labs</h1>
          <p className="mt-2 text-subtle">Browse featured, beta, and live AI services.</p>
        </header>
        <Catalog services={data} />
      </section>
    </SiteShell>
  );
}
