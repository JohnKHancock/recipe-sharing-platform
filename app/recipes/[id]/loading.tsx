import { Header } from "@/app/components/header";
import { RecipeDetailSkeleton } from "@/app/components/skeletons";

export default function RecipeDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <RecipeDetailSkeleton />
      </main>
    </div>
  );
}
