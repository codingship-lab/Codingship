import { supabaseServer } from "@/lib/supabase";

export async function getCurrentUserRole() {
  const supabase = supabaseServer();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  return data?.role ?? null;
}

export async function requireAdminRole() {
  const role = await getCurrentUserRole();
  return role === "admin";
}
