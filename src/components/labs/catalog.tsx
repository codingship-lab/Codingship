"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Service } from "@/lib/types";
import { ServiceCard } from "@/components/labs/service-card";
import { Button } from "@/components/ui/button";

export function Catalog({ services }: { services: Service[] }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"Featured" | "Newest">("Featured");
  const [activeTag, setActiveTag] = useState<string>("all");

  const tags = useMemo(() => ["all", ...new Set(services.flatMap((s) => s.tags.map((t) => t.slug)))], [services]);

  const filtered = useMemo(() => {
    return [...services]
      .filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.short_description.toLowerCase().includes(query.toLowerCase()))
      .filter((s) => activeTag === "all" || s.tags.some((t) => t.slug === activeTag))
      .sort((a, b) => {
        if (sort === "Featured") return Number(b.featured) - Number(a.featured);
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [services, query, sort, activeTag]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-xl3 border border-border bg-panel p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-subtle" />
          <Input className="pl-9" placeholder="Search experiments" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(["Featured", "Newest"] as const).map((item) => (
            <Button key={item} variant={sort === item ? "default" : "outline"} onClick={() => setSort(item)}>{item}</Button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Button key={tag} variant={activeTag === tag ? "default" : "outline"} onClick={() => setActiveTag(tag)}>
            {tag}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </div>
  );
}
