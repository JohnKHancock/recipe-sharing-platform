export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="space-y-6">
          {/* Title field skeleton */}
          <div>
            <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Select field skeleton */}
          <div>
            <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Two-column fields skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
            <div>
              <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-10 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* Textarea skeleton */}
          <div>
            <div className="mb-2 h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-32 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* Another textarea skeleton */}
          <div>
            <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-40 w-full animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Action buttons skeleton */}
      <div className="flex items-center justify-end gap-4">
        <div className="h-10 w-24 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
