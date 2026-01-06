"use client";

import { useState, useTransition } from "react";
import { updateComment, deleteComment } from "@/app/actions/comments";
import type { CommentWithProfile } from "@/lib/types/database";
import Link from "next/link";

interface CommentItemProps {
  comment: CommentWithProfile;
  currentUserId: string | null;
  recipeOwnerId: string;
  onDeleted: (commentId: string) => void;
  onUpdated: (comment: CommentWithProfile) => void;
}

export function CommentItem({
  comment,
  currentUserId,
  recipeOwnerId,
  onDeleted,
  onUpdated,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isCommentOwner = currentUserId === comment.user_id;
  const isRecipeOwner = currentUserId === recipeOwnerId;
  const canEdit = isCommentOwner; // Only comment owners can edit
  const canDelete = isCommentOwner || isRecipeOwner; // Comment owners or recipe owners can delete

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!editText.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    startTransition(async () => {
      const result = await updateComment(comment.id, editText);

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Update local state with the updated comment
      if (result?.data) {
        onUpdated({
          ...comment,
          content: result.data.content,
          updated_at: result.data.updated_at,
        });
      }
      setIsEditing(false);
    });
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    startTransition(async () => {
      const result = await deleteComment(comment.id);

      if (result?.error) {
        setError(result.error);
        return;
      }

      onDeleted(comment.id);
    });
  }

  function handleCancel() {
    setEditText(comment.content);
    setIsEditing(false);
    setError(null);
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <Link
              href={`/profile/${comment.profiles.username}`}
              className="font-semibold text-gray-900 hover:text-orange-600 dark:text-gray-50 dark:hover:text-orange-400"
            >
              {comment.profiles.full_name || comment.profiles.username}
            </Link>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(comment.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {comment.updated_at !== comment.created_at && (
                <span className="ml-1">(edited)</span>
              )}
            </span>
          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={4}
                disabled={isPending}
                className="w-full resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500"
              />
              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  type="submit"
                  disabled={isPending || !editText.trim()}
                  className="rounded-md bg-orange-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-orange-500 dark:hover:bg-orange-600"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {comment.content}
            </p>
          )}
        </div>

        {!isEditing && (canEdit || canDelete) && (
          <div className="ml-4 flex gap-2">
            {canEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              >
                Edit
              </button>
            )}
            {canDelete && (
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
