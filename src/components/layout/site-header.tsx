import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Codingship <span className="dot-pulse ml-2 inline-block h-2 w-2 rounded-full bg-accent" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className="rounded-xl px-3 py-2 text-sm hover:bg-panel">Home</Link>
          <Link href="/labs" className="rounded-xl px-3 py-2 text-sm hover:bg-panel">Labs</Link>
          <Link href="/about" className="rounded-xl px-3 py-2 text-sm hover:bg-panel">About</Link>
          <Link href="/login" className="rounded-xl px-3 py-2 text-sm hover:bg-panel">Login</Link>
          {isAdmin ? <Link href="/admin" className="rounded-xl px-3 py-2 text-sm hover:bg-panel">Admin</Link> : null}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
