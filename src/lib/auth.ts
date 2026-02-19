import { supabaseServer } from "@/lib/supabase-server";

export async function getCurrentUserRole() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }

  const supabase = await supabaseServer();
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data, error: roleError } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (roleError) return null;

  return data?.role ?? null;
}

export async function requireAdminRole() {
  const role = await getCurrentUserRole();
  return role === "admin";
}
