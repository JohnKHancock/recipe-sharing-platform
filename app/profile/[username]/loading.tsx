import { Header } from "@/app/components/header";
import { ProfileSkeleton, RecipeCardGridSkeleton } from "@/app/components/skeletons";

export default function ProfilePageLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <ProfileSkeleton />

        <div className="mb-6 h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <RecipeCardGridSkeleton count={6} />
      </main>
    </div>
  );
}
