import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/header";
import { RecipeCard } from "./recipe-card";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Fetch recipes with profiles using the foreign key relationship
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select(`
      *,
      profiles!inner (
        id,
        username,
        full_name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            Recipe Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Discover recipes shared by our community
          </p>
        </div>

        {recipes && recipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                profile={recipe.profiles}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No recipes yet. Be the first to share a recipe!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

