import { SiteShell } from "@/components/layout/site-shell";
import { LoginForm } from "@/components/login-form";

export default async function LoginPage() {
  return (
    <SiteShell>
      <LoginForm />
    </SiteShell>
  );
}
