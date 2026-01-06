"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }

  // Ensure profile exists after sign-in
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    try {
      const { ensureProfileExists } = await import("@/lib/profiles");
      await ensureProfileExists(user.id);
    } catch (profileError) {
      console.error("Error ensuring profile exists:", profileError);
      // Continue anyway - profile might exist
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: formData.get("full_name") as string,
        username: formData.get("username") as string,
      },
    },
  };

  const { error, data: signUpData } = await supabase.auth.signUp(data);

  if (error) {
    return { error: error.message };
  }

  // Ensure profile is created immediately after signup
  // The trigger should handle this, but we'll also ensure it in the app
  if (signUpData.user) {
    try {
      const { ensureProfileExists } = await import("@/lib/profiles");
      await ensureProfileExists(signUpData.user.id);
    } catch (profileError) {
      console.error("Error ensuring profile exists after signup:", profileError);
      // Continue - profile might be created by trigger
    }
  }

  revalidatePath("/", "layout");
  redirect("/auth/sign-in?message=Check your email to confirm your account");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

