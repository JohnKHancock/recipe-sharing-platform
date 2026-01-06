"use client";

import { useState, useTransition } from "react";
import { toggleLike } from "@/app/actions/likes";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  recipeId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

export function LikeButton({
  recipeId,
  initialLikeCount,
  initialIsLiked,
}: LikeButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  async function handleToggleLike() {
    startTransition(async () => {
      const result = await toggleLike(recipeId);

      if (result?.error) {
        // Could show error toast here
        console.error("Error toggling like:", result.error);
        return;
      }

      // Update local state optimistically
      if (result?.liked) {
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setLikeCount((prev) => Math.max(0, prev - 1));
        setIsLiked(false);
      }

      // Refresh to get latest data
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleToggleLike}
      disabled={isPending}
      className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 ${
        isLiked
          ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      }`}
      aria-label={isLiked ? "Unlike this recipe" : "Like this recipe"}
    >
      <svg
        className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  );
}
