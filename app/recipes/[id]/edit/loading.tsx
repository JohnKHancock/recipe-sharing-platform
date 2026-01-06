import { Header } from "@/app/components/header";
import { FormSkeleton } from "@/app/components/skeletons";

export default function EditRecipeLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <div className="h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-2 h-5 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <FormSkeleton />
      </main>
    </div>
  );
}
