"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Recipe, Profile } from "@/lib/types/database";

interface RecipeCardProps {
  recipe: Recipe;
  profile: Profile | null;
}

export function RecipeCard({ recipe, profile }: RecipeCardProps) {
  const router = useRouter();

  function handleCardClick() {
    router.push(`/recipes/${recipe.id}`);
  }

  return (
    <article
      onClick={handleCardClick}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Recipe Image Placeholder */}
      <div className="relative h-48 w-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20">
        <div className="flex h-full items-center justify-center">
          <span className="text-4xl">🍳</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600 dark:text-gray-50 dark:group-hover:text-orange-400">
          {recipe.title}
        </h3>

        {/* Ingredients preview */}
        <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {recipe.ingredients.split("\n").slice(0, 2).join(", ")}
          {recipe.ingredients.split("\n").length > 2 && "..."}
        </p>

        <div className="mt-auto space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            {recipe.cooking_time && (
              <span className="flex items-center gap-1">
                <span>⏱️</span>
                {recipe.cooking_time}m
              </span>
            )}
            {recipe.category && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
                {recipe.category}
              </span>
            )}
            {recipe.difficulty && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
                {recipe.difficulty}
              </span>
            )}
          </div>

          {profile && (
            <Link
              href={`/profile/${profile.username}`}
              className="pt-2 text-xs text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400"
              onClick={(e) => e.stopPropagation()}
            >
              by{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {profile.full_name || profile.username}
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

