import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/header";
import { RecipeCard } from "@/app/dashboard/recipe-card";
import Link from "next/link";

export default async function MyRecipesPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Ensure profile exists
  const { ensureProfileExists } = await import("@/lib/profiles");
  try {
    await ensureProfileExists(user.id);
  } catch (error) {
    console.error("Error ensuring profile exists:", error);
  }

  // Fetch user's profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Fetch user's recipes
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recipes:", error);
  }

  // Type assertion for recipes
  type Recipe = {
    id: string;
    user_id: string;
    title: string;
    ingredients: string;
    instructions: string;
    cooking_time: number | null;
    difficulty: string | null;
    category: string;
    created_at: string;
    updated_at: string;
  };
  
  const typedRecipes = (recipes as Recipe[]) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            My Recipes
          </h1>
          <Link
            href="/recipes/new"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Add Recipe
          </Link>
        </div>

        {typedRecipes && typedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {typedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                profile={profile || null}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
              You haven&apos;t created any recipes yet.
            </p>
            <Link
              href="/recipes/new"
              className="inline-block rounded-md bg-orange-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
            >
              Create Your First Recipe
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}