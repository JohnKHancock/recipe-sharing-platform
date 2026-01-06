import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/app/components/header";
import { RecipeForm } from "./recipe-form";

export default async function NewRecipePage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 md:text-4xl">
            Create New Recipe
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share your favorite recipe with the community
          </p>
        </div>

        <RecipeForm />
      </main>
    </div>
  );
}

