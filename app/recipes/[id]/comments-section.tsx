"use client";

import { useState, useTransition, useEffect } from "react";
import { createComment } from "@/app/actions/comments";
import { CommentItem } from "./comment-item";
import type { CommentWithProfile } from "@/lib/types/database";
import { useRouter } from "next/navigation";

interface CommentsSectionProps {
  recipeId: string;
  initialComments: CommentWithProfile[];
  currentUserId: string | null;
  recipeOwnerId: string;
}

export function CommentsSection({
  recipeId,
  initialComments,
  currentUserId,
  recipeOwnerId,
}: CommentsSectionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Sync comments state with props when they change (after router.refresh())
  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!commentText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    if (!currentUserId) {
      setError("You must be logged in to comment");
      return;
    }

    startTransition(async () => {
      const result = await createComment(recipeId, commentText);

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Clear form and refresh to get the new comment with profile data
      setCommentText("");
      router.refresh();
    });
  }

  function handleCommentDeleted(commentId: string) {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    router.refresh();
  }

  function handleCommentUpdated(updatedComment: CommentWithProfile) {
    setComments((prev) =>
      prev.map((c) => (c.id === updatedComment.id ? updatedComment : c))
    );
    router.refresh();
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-50">
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      {currentUserId ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows={4}
              disabled={isPending}
              className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500"
            />
            {error && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={isPending || !commentText.trim()}
                className="rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                {isPending ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please{" "}
            <a
              href="/auth/sign-in"
              className="font-medium text-orange-600 hover:text-orange-500 dark:text-orange-400"
            >
              sign in
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUserId}
              recipeOwnerId={recipeOwnerId}
              onDeleted={handleCommentDeleted}
              onUpdated={handleCommentUpdated}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}
    </div>
  );
}
