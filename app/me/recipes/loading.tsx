import { Header } from "@/app/components/header";
import { RecipeCardGridSkeleton } from "@/app/components/skeletons";

export default function MyRecipesLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-10 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>

        <RecipeCardGridSkeleton count={6} />
      </main>
    </div>
  );
}
