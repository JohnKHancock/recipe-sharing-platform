import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/header";
import { RecipeCard } from "@/app/dashboard/recipe-card";
import Link from "next/link";

export default async function SavedRecipesPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Fetch recipes that the user has liked
  // Join recipes with likes table and profiles
  const { data: likedRecipes, error } = await supabase
    .from("likes")
    .select(
      `
      recipe_id,
      created_at,
      recipes!inner (
        *,
        profiles!inner (
          id,
          username,
          full_name
        )
      )
    `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved recipes:", error);
  }

  // Extract recipes from the joined data
  const recipes =
    likedRecipes?.map((like) => ({
      ...like.recipes,
      profiles: like.recipes.profiles,
    })) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            My Saved Recipes
          </h1>
          <Link
            href="/dashboard"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Browse Recipes
          </Link>
        </div>

        {recipes && recipes.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {recipes.length} saved recipe{recipes.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  profile={recipe.profiles}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
              You haven&apos;t saved any recipes yet.
            </p>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-500">
              Like recipes to save them here for easy access later.
            </p>
            <Link
              href="/dashboard"
              className="inline-block rounded-md bg-orange-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
