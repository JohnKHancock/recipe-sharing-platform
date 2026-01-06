import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Header } from "@/app/components/header";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { LikeButton } from "./like-button";
import { CommentsSection } from "./comments-section";
import type { CommentWithProfile, Profile } from "@/lib/types/database";

export const dynamic = 'force-dynamic';

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch recipe with profile
  const { data: recipe, error } = await supabase
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
    )
    .eq("id", id)
    .single();

  if (error || !recipe) {
    notFound();
  }

  type RecipeWithProfile = {
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
    profiles: {
      id: string;
      username: string;
      full_name: string;
    };
  };
  
  const typedRecipe = recipe as RecipeWithProfile;

  // Get current user for edit/delete buttons
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user?.id === typedRecipe.user_id;

  // Fetch likes count
  const { count: likeCount } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("recipe_id", id);

  // Check if current user has liked this recipe
  let isLiked = false;
  if (user) {
    const { data: userLike } = await supabase
      .from("likes")
      .select("id")
      .eq("recipe_id", id)
      .eq("user_id", user.id)
      .single();
    isLiked = !!userLike;
  }

  // Fetch comments with profiles
  const { data: comments } = await supabase
    .from("comments")
    .select(
      `
      *,
      profiles!inner (
        id,
        username,
        full_name
      )
    `
    )
    .eq("recipe_id", id)
    .order("created_at", { ascending: true });

  type CommentWithProfileData = {
    id: string;
    user_id: string;
    recipe_id: string;
    content: string;
    created_at: string;
    updated_at: string;
    profiles: {
      id: string;
      username: string;
      full_name: string;
    };
  };
  
  const commentsWithProfiles: CommentWithProfile[] = ((comments || []) as CommentWithProfileData[]).map((comment) => ({
    ...comment,
    profiles: {
      ...comment.profiles,
      email: null,
      bio: null,
      created_at: "",
      updated_at: "",
    } as Profile,
  }));
  const ingredients = typedRecipe.ingredients.split("\n").filter((line: string) => line.trim());
  const instructions = typedRecipe.instructions
    .split("\n")
    .filter((line: string) => line.trim());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header with Actions */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <Link
              href="/dashboard"
              className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
              {typedRecipe.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href={`/profile/${typedRecipe.profiles.username}`}
                className="hover:text-orange-600 dark:hover:text-orange-400"
              >
                by{" "}
                <span className="font-medium text-gray-900 dark:text-gray-50">
                  {typedRecipe.profiles.full_name || typedRecipe.profiles.username}
                </span>
              </Link>
              {typedRecipe.category && (
                <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                  {typedRecipe.category}
                </span>
              )}
              {typedRecipe.difficulty && (
                <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-gray-800">
                  {typedRecipe.difficulty}
                </span>
              )}
              {typedRecipe.cooking_time && (
                <span className="flex items-center gap-1">
                  <span>⏱️</span>
                  {typedRecipe.cooking_time} minutes
                </span>
              )}
              <LikeButton
                recipeId={id}
                initialLikeCount={likeCount || 0}
                initialIsLiked={isLiked}
              />
            </div>
          </div>

          {isOwner && (
            <div className="ml-4 flex gap-2">
              <Link
                href={`/recipes/${id}/edit`}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Edit
              </Link>
              <DeleteButton recipeId={id} recipeTitle={typedRecipe.title} />
            </div>
          )}
        </div>

        {/* Recipe Content */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Ingredients */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {ingredients.map((ingredient: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-600 dark:bg-orange-500" />
                  <span>{ingredient.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-50">
              Instructions
            </h2>
            <ol className="space-y-4">
              {instructions.map((instruction: string, index: number) => (
                <li
                  key={index}
                  className="flex gap-4 text-gray-700 dark:text-gray-300"
                >
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 text-sm font-semibold text-white dark:bg-orange-500">
                    {index + 1}
                  </span>
                  <span className="flex-1 pt-0.5">{instruction.trim()}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection
          recipeId={id}
          initialComments={commentsWithProfiles}
          currentUserId={user?.id || null}
          recipeOwnerId={typedRecipe.user_id}
        />
      </main>
    </div>
  );
}

