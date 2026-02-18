import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <SiteShell>
      <section className="max-w-3xl py-14">
        <h1 className="point mb-6 text-5xl font-semibold tracking-tight sm:text-6xl">Build with AI services that feel human.</h1>
        <p className="mb-8 text-lg text-subtle">Codingship is a calm, production-ready Labs showcase: discover, compare, and launch experiments without leaving your workspace.</p>
        <div className="flex gap-3">
          <Link href="/labs"><Button>Explore Labs</Button></Link>
          <Link href="/about"><Button variant="outline">About</Button></Link>
        </div>
      </section>
    </SiteShell>
  );
}
