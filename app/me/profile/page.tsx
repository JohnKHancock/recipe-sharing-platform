import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';
import { redirect } from "next/navigation";
import { Header } from "@/app/components/header";
import { ProfileForm } from "./profile-form";
import Link from "next/link";

export default async function MyProfilePage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Ensure profile exists (create if missing)
  const { ensureProfileExists } = await import("@/lib/profiles");
  let profile;
  
  try {
    const profileData = await ensureProfileExists(user.id);
    
    // Fetch full profile data
    const { data: fullProfile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error || !fullProfile) {
      console.error("Error fetching profile:", error);
      redirect("/dashboard");
    }
    
    profile = fullProfile;
  } catch (error) {
    console.error("Error ensuring profile exists:", error);
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            ← Back to Recipes
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            Edit Profile
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Update your profile information
          </p>
        </div>

        <ProfileForm profile={profile} />
      </main>
    </div>
  );
}
