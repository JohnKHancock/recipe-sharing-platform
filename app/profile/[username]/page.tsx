import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/header";
import Link from "next/link";
import { RecipeCard } from "@/app/dashboard/recipe-card";
import type { Profile } from "@/lib/types/database";

export const dynamic = 'force-dynamic';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const supabase = await createClient();

  // Fetch profile by username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  type ProfileData = {
    id: string;
    username: string;
    full_name: string;
    email: string | null;
    bio: string | null;
    created_at: string;
    updated_at: string;
  };
  
  const typedProfile = profile as ProfileData;

  // Fetch user's recipes
  const { data: recipes, error: recipesError } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", typedProfile.id)
    .order("created_at", { ascending: false });

  if (recipesError) {
    console.error("Error fetching recipes:", recipesError);
  }

  // Type assertion for recipes
  type Recipe = {
    id: string;
    user_id: string;
    title: string;
    ingredients: string;
    instructions: string;
    cooking_time: number | null;
    difficulty: "Easy" | "Medium" | "Hard" | null;
    category: string;
    created_at: string;
    updated_at: string;
  };
  
  const typedRecipes = (recipes as Recipe[]) || [];

  // Get current user to check if viewing own profile
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwnProfile = user?.id === typedProfile.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {/* Profile Header */}
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
                {typedProfile.full_name}
              </h1>
              <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                @{typedProfile.username}
              </p>
              {typedProfile.bio && (
                <p className="mt-3 text-base text-gray-700 dark:text-gray-300">
                  {typedProfile.bio}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                Joined {new Date(typedProfile.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            {isOwnProfile && (
              <Link
                href="/me/profile"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Edit Profile
              </Link>
            )}
          </div>
        </div>

        {/* Recipes Section */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-50">
            Recipes ({typedRecipes?.length || 0})
          </h2>

          {typedRecipes && typedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {typedRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  profile={typedProfile as Profile}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {isOwnProfile
                  ? "You haven't shared any recipes yet."
                  : "This user hasn't shared any recipes yet."}
              </p>
              {isOwnProfile && (
                <Link
                  href="/recipes/new"
                  className="mt-4 inline-block rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                >
                  Create Your First Recipe
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

