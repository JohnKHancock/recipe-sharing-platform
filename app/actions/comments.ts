"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type CommentSelect = { user_id: string; recipe_id: string };

export async function createComment(recipeId: string, content: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to comment on a recipe" };
  }

  // Validate content
  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return { error: "Comment content cannot be empty" };
  }

  if (trimmedContent.length > 5000) {
    return { error: "Comment must be less than 5000 characters" };
  }

  // Check if recipe exists
  const { data: recipe } = await supabase
    .from("recipes")
    .select("id")
    .eq("id", recipeId)
    .single();

  if (!recipe) {
    return { error: "Recipe not found" };
  }

  // Insert comment
  const { data, error } = await supabase
    .from("comments")
    .insert({
      user_id: user.id,
      recipe_id: recipeId,
      content: trimmedContent,
    } as any)
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    return { error: error.message };
  }

  revalidatePath(`/recipes/${recipeId}`);
  return { success: true, data };
}

export async function updateComment(commentId: string, content: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a comment" };
  }

  // Validate content
  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return { error: "Comment content cannot be empty" };
  }

  if (trimmedContent.length > 5000) {
    return { error: "Comment must be less than 5000 characters" };
  }

  // Verify comment ownership
  const { data: existingComment } = await supabase
    .from("comments")
    .select("user_id, recipe_id")
    .eq("id", commentId)
    .single();
  
  const comment = existingComment as CommentSelect | null;

  if (!comment) {
    return { error: "Comment not found" };
  }

  if (comment.user_id !== user.id) {
    return { error: "You don't have permission to edit this comment" };
  }

  // Update comment
  const { data, error } = (supabase
    .from("comments") as any)
    .update({
      content: trimmedContent,
    })
    .eq("id", commentId)
    .select()
    .single();

  if (error) {
    console.error("Error updating comment:", error);
    return { error: error.message };
  }

  revalidatePath(`/recipes/${comment.recipe_id}`);
  return { success: true, data };
}

export async function deleteComment(commentId: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete a comment" };
  }

  // Verify comment ownership/recipe ownership and get recipe_id for revalidation
  const { data: existingComment } = await supabase
    .from("comments")
    .select("user_id, recipe_id")
    .eq("id", commentId)
    .single();
  
  const comment = existingComment as CommentSelect | null;

  if (!comment) {
    return { error: "Comment not found" };
  }

  // Check if user is the comment owner
  const isCommentOwner = comment.user_id === user.id;

  // Check if user is the recipe owner
  const { data: recipe } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", comment.recipe_id)
    .single();

  type RecipeSelect = { user_id: string };
  const recipeData = recipe as RecipeSelect | null;
  const isRecipeOwner = recipeData?.user_id === user.id;

  // Allow deletion if user is either comment owner or recipe owner
  if (!isCommentOwner && !isRecipeOwner) {
    return { error: "You don't have permission to delete this comment" };
  }

  // Delete comment
  const { error } = await supabase.from("comments").delete().eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    return { error: error.message };
  }

  revalidatePath(`/recipes/${comment.recipe_id}`);
  return { success: true };
}
