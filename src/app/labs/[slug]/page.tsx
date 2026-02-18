import { marked } from "marked";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmbedPanel } from "@/components/labs/embed-panel";
import { getServiceBySlug, getServices } from "@/lib/api";

export default async function ServiceDetailsPage({ params }: { params: { slug: string } }) {
  const { data: service } = await getServiceBySlug(params.slug);
  const { data: services } = await getServices();
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <SiteShell>
      <article className="space-y-8">
        <header className="space-y-4">
          <div className="flex gap-2">
            <Badge label={service.status} />
            {service.featured ? <Badge label="Featured" className="border-vivid text-vivid" /> : null}
          </div>
          <h1 className="point text-4xl font-semibold tracking-tight">{service.name}</h1>
          <p className="max-w-3xl text-subtle">{service.short_description}</p>
          <Button>Try now</Button>
        </header>

        <EmbedPanel embedUrl={service.embed_url} externalUrl={service.external_url} />

        <section>
          <h2 className="mb-4 text-2xl font-semibold">About / Use cases / Examples</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(service.full_description) }} />
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-semibold">Related services</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/labs/${item.slug}`} className="rounded-xl2 border border-border bg-panel p-4">
                <h3 className="font-medium">{item.name}</h3>
                <p className="mt-2 text-sm text-subtle">{item.short_description}</p>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
