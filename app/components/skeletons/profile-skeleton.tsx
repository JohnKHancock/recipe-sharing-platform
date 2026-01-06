export function ProfileSkeleton() {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-4">
          {/* Name skeleton */}
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          {/* Username skeleton */}
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          {/* Bio skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Join date skeleton */}
          <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Edit button skeleton */}
        <div className="h-10 w-28 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
