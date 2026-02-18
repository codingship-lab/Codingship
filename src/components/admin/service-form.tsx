"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/utils";

const serviceSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  short_description: z.string().min(8),
  full_description: z.string().min(16),
  embed_url: z.string().url().or(z.literal("")),
  external_url: z.string().url().or(z.literal("")),
  status: z.enum(["Beta", "Live", "Deprecated"]),
  featured: z.boolean(),
  published: z.boolean(),
  embed_policy: z.enum(["allow", "deny"])
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export function ServiceForm() {
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: "", slug: "", short_description: "", full_description: "", embed_url: "", external_url: "", status: "Beta", featured: false, published: false, embed_policy: "allow" }
  });

  const name = form.watch("name");
  useEffect(() => {
    if (!form.getValues("slug")) form.setValue("slug", slugify(name));
  }, [name, form]);

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        });
        if (!res.ok) alert("Failed to save service");
        else alert("Saved");
      })}
    >
      <Input placeholder="Service name" {...form.register("name")} />
      <Input placeholder="slug" {...form.register("slug")} />
      <Input placeholder="short description" {...form.register("short_description")} />
      <textarea className="min-h-28 w-full rounded-2xl border border-border bg-panel px-4 py-3" placeholder="full markdown description" {...form.register("full_description")} />
      <Input placeholder="embed_url" {...form.register("embed_url")} />
      <Input placeholder="external_url" {...form.register("external_url")} />
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" {...form.register("featured")} /> Featured</label>
        <label className="flex items-center gap-2"><input type="checkbox" {...form.register("published")} /> Published</label>
      </div>
      <Button type="submit">Save service</Button>
    </form>
  );
}
