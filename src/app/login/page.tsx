"use client";

import { useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseBrowser } from "@/lib/supabase";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const [email, setEmail] = useState("");

  return (
    <SiteShell>
      <div className="mx-auto max-w-md rounded-xl3 border border-border bg-panel p-8">
        <h1 className="point mb-6 text-3xl font-semibold">Login</h1>
        <div className="mb-4" id="turnstile-widget" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
        <div className="space-y-3">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          <Button
            className="w-full"
            onClick={async () => {
              await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/api/auth/callback` } });
              alert("Magic link sent");
            }}
          >
            Send magic link
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={async () => {
              await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/api/auth/callback` } });
            }}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
