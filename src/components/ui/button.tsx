import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant = "default", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" | "vivid" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "border-accent bg-accent text-white hover:opacity-90",
        variant === "outline" && "border-border bg-transparent hover:bg-panel",
        variant === "ghost" && "border-transparent hover:bg-panel",
        variant === "vivid" && "border-vivid bg-vivid text-black hover:opacity-90",
        className
      )}
      {...props}
    />
  );
}
