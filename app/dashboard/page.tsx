import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/header";
import { RecipeCard } from "./recipe-card";
import { SearchFilters } from "./search-filters";
import { SearchFiltersSkeleton } from "@/app/components/skeletons";
import Link from "next/link";
import { Suspense } from "react";

interface DashboardPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    difficulty?: string;
    maxTime?: string;
  }>;
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Build query with filters
  let query = supabase
    .from("recipes")
    .select(
      `
      *,
      profiles!inner (
        id,
        username,
        full_name
      )
    `
    );

  // Apply text search (title and ingredients)
  if (params.q?.trim()) {
    const searchTerm = params.q.trim();
    // Search in both title and ingredients using OR condition
    // PostgREST syntax: column.ilike.pattern,column2.ilike.pattern
    query = query.or(
      `title.ilike.%${searchTerm}%,ingredients.ilike.%${searchTerm}%`
    );
  }

  // Apply category filter
  if (params.category && params.category !== "All") {
    query = query.eq("category", params.category);
  }

  // Apply difficulty filter
  if (params.difficulty && params.difficulty !== "All") {
    query = query.eq("difficulty", params.difficulty);
  }

  // Apply cooking time filter (less than or equal to)
  if (params.maxTime) {
    const maxTime = parseInt(params.maxTime, 10);
    if (!isNaN(maxTime)) {
      query = query.lte("cooking_time", maxTime);
    }
  }

  // Order by most recent
  query = query.order("created_at", { ascending: false });

  const { data: recipes, error } = await query;

  if (error) {
    console.error("Error fetching recipes:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            Recent Recipes
          </h1>
          <Link
            href="/recipes/new"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-500 dark:hover:bg-orange-600"
          >
            Add Recipe
          </Link>
        </div>

        {/* Search and Filters */}
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>

        {recipes && recipes.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Found {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}
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
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {params.q || params.category || params.difficulty || params.maxTime
                ? "No recipes found matching your search criteria. Try adjusting your filters."
                : "No recipes yet. Be the first to share a recipe!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

