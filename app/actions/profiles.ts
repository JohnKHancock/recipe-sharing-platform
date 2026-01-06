"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update your profile" };
  }

  // Extract form data
  const username = formData.get("username") as string;
  const full_name = formData.get("full_name") as string;
  const bio = formData.get("bio") as string | null;

  // Validate required fields
  if (!username || !full_name) {
    return { error: "Username and full name are required" };
  }

  // Check if username is already taken by another user
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", username)
    .single();

  if (existingProfile && existingProfile.id !== user.id) {
    return { error: "Username is already taken" };
  }

  // Update profile
  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      full_name,
      bio: bio || null,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error);
    return { error: error.message };
  }

  revalidatePath("/me/profile");
  revalidatePath("/dashboard");
  revalidatePath(`/profile/${username}`);
  return { success: true };
}

