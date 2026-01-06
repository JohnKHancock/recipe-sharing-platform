"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleLike(recipeId: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to like a recipe" };
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

  // Check if user has already liked this recipe
  const { data: existingLike } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("recipe_id", recipeId)
    .single();

  type LikeSelect = { id: string };
  const like = existingLike as LikeSelect | null;

  if (like) {
    // Unlike: delete the like
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("id", like.id);

    if (error) {
      console.error("Error unliking recipe:", error);
      return { error: error.message };
    }

    revalidatePath(`/recipes/${recipeId}`);
    revalidatePath("/dashboard");
    return { success: true, liked: false };
  } else {
    // Like: insert a new like
    const { error } = await (supabase
      .from("likes") as any)
      .insert({
        user_id: user.id,
        recipe_id: recipeId,
      });

    if (error) {
      console.error("Error liking recipe:", error);
      return { error: error.message };
    }

    revalidatePath(`/recipes/${recipeId}`);
    revalidatePath("/dashboard");
    return { success: true, liked: true };
  }
}
