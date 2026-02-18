import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="group h-full transition hover:-translate-y-0.5 hover:border-accent/50">
      <div className="mb-4 flex items-center justify-between">
        <Badge label={service.status} className={service.status === "Live" ? "border-accent text-accent" : ""} />
        {service.featured ? <Badge label="Featured" className="border-vivid text-vivid" /> : null}
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight">{service.name}</h3>
      <p className="mb-5 text-sm text-subtle">{service.short_description}</p>
      <div className="flex flex-wrap gap-2 pb-4">
        {service.tags.map((tag) => (
          <Badge key={tag.id} label={`• ${tag.name}`} />
        ))}
      </div>
      <Link href={`/labs/${service.slug}`} className="inline-flex items-center gap-1 text-sm text-accent">
        Learn more <ArrowUpRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
