import { cn } from "@/lib/utils";

export function Badge({ label, className }: { label: string; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full border border-border px-2.5 py-1 text-xs text-subtle", className)}>{label}</span>;
}
