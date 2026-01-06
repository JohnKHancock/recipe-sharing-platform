import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Header } from "@/app/components/header";
import { EditRecipeForm } from "./edit-recipe-form";

interface EditRecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  // Fetch recipe
  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !recipe) {
    notFound();
  }

  // Verify ownership
  if (recipe.user_id !== user.id) {
    redirect(`/recipes/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            Edit Recipe
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Update your recipe details
          </p>
        </div>

        <EditRecipeForm recipe={recipe} />
      </main>
    </div>
  );
}

