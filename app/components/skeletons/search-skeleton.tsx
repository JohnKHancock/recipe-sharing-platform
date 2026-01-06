export function SearchFiltersSkeleton() {
  return (
    <div className="mb-8 space-y-4">
      {/* Search bar skeleton */}
      <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

      {/* Filters skeleton */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
