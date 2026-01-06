export function RecipeCardSkeleton() {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Image placeholder skeleton */}
      <div className="relative h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />

      <div className="flex flex-1 flex-col p-4">
        {/* Title skeleton */}
        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        {/* Description skeleton */}
        <div className="mb-3 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="mt-auto space-y-2">
          {/* Tags skeleton */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Author skeleton */}
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </article>
  );
}

export function RecipeCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  );
}
