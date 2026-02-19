"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseBrowser } from "@/lib/supabase-browser";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const hasSupabaseEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return (
    <div className="mx-auto max-w-md rounded-xl3 border border-border bg-panel p-8">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <h1 className="point mb-6 text-3xl font-semibold">Login</h1>
      <div
        className="cf-turnstile mb-4"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
      <div className="space-y-3">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <Button
          className="w-full"
          onClick={async () => {
            if (!hasSupabaseEnv) {
              alert("Supabase env is not configured.");
              return;
            }

            const supabase = supabaseBrowser();
            if (!supabase) {
              alert("Supabase env is not configured.");
              return;
            }

            const { error } = await supabase.auth.signInWithOtp({
              email,
              options: {
                emailRedirectTo: `${window.location.origin}/api/auth/callback?next=/labs`
              }
            });
            if (error) {
              alert(error.message);
              return;
            }
            alert("Magic link sent");
          }}
        >
          Send magic link
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={async () => {
            if (!hasSupabaseEnv) {
              alert("Supabase env is not configured.");
              return;
            }

            const supabase = supabaseBrowser();
            if (!supabase) {
              alert("Supabase env is not configured.");
              return;
            }

            const { error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/labs` }
            });
            if (error) {
              alert(error.message);
            }
          }}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
