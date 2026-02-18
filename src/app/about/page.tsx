import { SiteShell } from "@/components/layout/site-shell";

export default function AboutPage() {
  return (
    <SiteShell>
      <article className="prose prose-invert max-w-2xl">
        <h1 className="point text-4xl font-semibold tracking-tight">About Codingship</h1>
        <p className="text-subtle">Codingship blends Google Labs-like discovery with an OpenAI-inspired visual system. Services are opened in-site via secure embeds with smart fallback.</p>
      </article>
    </SiteShell>
  );
}
