"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createRecipe(formData: FormData) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a recipe" };
  }

  // Ensure profile exists (create if missing)
  const { ensureProfileExists } = await import("@/lib/profiles");
  try {
    await ensureProfileExists(user.id);
  } catch (error) {
    console.error("Error ensuring profile exists:", error);
    return { error: "Unable to create profile. Please try again." };
  }

  // Extract form data
  const title = formData.get("title") as string;
  const ingredients = formData.get("ingredients") as string;
  const instructions = formData.get("instructions") as string;
  const cooking_time = formData.get("cooking_time")
    ? parseInt(formData.get("cooking_time") as string)
    : null;
  const difficulty = formData.get("difficulty") as string | null;
  const category = formData.get("category") as string;

  // Validate required fields
  if (!title || !ingredients || !instructions || !category) {
    return { error: "Title, ingredients, instructions, and category are required" };
  }

  // Insert recipe
  const { data, error } = await (supabase
    .from("recipes") as any)
    .insert({
      user_id: user.id,
      title,
      ingredients,
      instructions,
      cooking_time,
      difficulty: difficulty || null,
      category,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating recipe:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/me/recipes");
  redirect(`/recipes/${data.id}?toast=${encodeURIComponent("Recipe created successfully")}&type=success`);
}

export async function updateRecipe(recipeId: string, formData: FormData) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a recipe" };
  }

  // Verify recipe ownership
  const { data: existingRecipe } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  type RecipeSelect = { user_id: string };
  const recipe = existingRecipe as RecipeSelect | null;

  if (!recipe) {
    return { error: "Recipe not found" };
  }

  if (recipe.user_id !== user.id) {
    return { error: "You don't have permission to edit this recipe" };
  }

  // Extract form data
  const title = formData.get("title") as string;
  const ingredients = formData.get("ingredients") as string;
  const instructions = formData.get("instructions") as string;
  const cooking_time = formData.get("cooking_time")
    ? parseInt(formData.get("cooking_time") as string)
    : null;
  const difficulty = formData.get("difficulty") as string | null;
  const category = formData.get("category") as string;

  // Validate required fields
  if (!title || !ingredients || !instructions || !category) {
    return { error: "Title, ingredients, instructions, and category are required" };
  }

  // Update recipe
  const { error } = await (supabase
    .from("recipes") as any)
    .update({
      title,
      ingredients,
      instructions,
      cooking_time,
      difficulty: difficulty || null,
      category,
    })
    .eq("id", recipeId);

  if (error) {
    console.error("Error updating recipe:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/me/recipes");
  revalidatePath(`/recipes/${recipeId}`);
  redirect(`/recipes/${recipeId}?toast=${encodeURIComponent("Recipe updated successfully")}&type=success`);
}

export async function deleteRecipe(recipeId: string) {
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete a recipe" };
  }

  // Verify recipe ownership
  const { data: existingRecipe } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .single();

  type RecipeSelect = { user_id: string };
  const recipe = existingRecipe as RecipeSelect | null;

  if (!recipe) {
    return { error: "Recipe not found" };
  }

  if (recipe.user_id !== user.id) {
    return { error: "You don't have permission to delete this recipe" };
  }

  // Delete recipe
  const { error } = await supabase.from("recipes").delete().eq("id", recipeId);

  if (error) {
    console.error("Error deleting recipe:", error);
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/me/recipes");
  redirect(`/dashboard?toast=${encodeURIComponent("Recipe deleted successfully")}&type=success`);
}

