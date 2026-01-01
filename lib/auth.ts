import { createClient } from "./supabase/server";

/**
 * Get the current authenticated user
 * Use in Server Components and Server Actions
 */
export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Get the current user's profile
 * Use in Server Components and Server Actions
 */
export async function getUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return profile;
}

/**
 * Check if user is authenticated
 * Use in Server Components and Server Actions
 */
export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
}

