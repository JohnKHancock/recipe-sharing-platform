"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteRecipe } from "@/app/actions/recipes";
import { DeleteConfirmationDialog } from "@/app/components/delete-confirmation-dialog";

interface DeleteButtonProps {
  recipeId: string;
  recipeTitle: string;
}

export function DeleteButton({ recipeId, recipeTitle }: DeleteButtonProps) {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteRecipe(recipeId);

    if (result?.error) {
      setIsDeleting(false);
      setShowDialog(false);
      // Redirect with error toast
      router.push(`/recipes/${recipeId}?toast=${encodeURIComponent(result.error)}&type=error`);
      router.refresh();
      return;
    }

    // Success - redirect happens in server action, but we'll refresh to ensure the redirect takes effect
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="rounded-md border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-700 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-red-900/20"
      >
        Delete
      </button>
      {showDialog && (
        <DeleteConfirmationDialog
          itemName={recipeTitle}
          onConfirm={handleDelete}
          onCancel={() => setShowDialog(false)}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}