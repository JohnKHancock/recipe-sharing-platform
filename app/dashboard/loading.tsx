import { Header } from "@/app/components/header";
import { RecipeCardGridSkeleton, SearchFiltersSkeleton } from "@/app/components/skeletons";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
        </div>

        <SearchFiltersSkeleton />

        <div className="mb-4 h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <RecipeCardGridSkeleton count={6} />
      </main>
    </div>
  );
}
