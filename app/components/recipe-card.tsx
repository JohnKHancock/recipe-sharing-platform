import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: string;
  title: string;
  description?: string;
  coverImageUrl?: string;
  prepMinutes?: number;
  cookMinutes?: number;
  servings?: number;
  cuisine?: string;
  difficulty?: string;
  tags?: string[];
  author: {
    username: string;
    displayName?: string;
  };
}

export function RecipeCard({
  id,
  title,
  description,
  coverImageUrl,
  prepMinutes,
  cookMinutes,
  servings,
  cuisine,
  difficulty,
  tags,
  author,
}: RecipeCardProps) {
  const totalTime = (prepMinutes || 0) + (cookMinutes || 0);

  return (
    <Link href={`/recipes/${id}`}>
      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
        {coverImageUrl ? (
          <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={coverImageUrl}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="relative h-48 w-full bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20">
            <div className="flex h-full items-center justify-center">
              <span className="text-4xl">🍳</span>
            </div>
          </div>
        )}

        <div className="flex flex-1 flex-col p-4">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-orange-600 dark:text-gray-50 dark:group-hover:text-orange-400">
            {title}
          </h3>

          {description && (
            <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}

          <div className="mt-auto space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              {totalTime > 0 && (
                <span className="flex items-center gap-1">
                  <span>⏱️</span>
                  {totalTime}m
                </span>
              )}
              {servings && (
                <span className="flex items-center gap-1">
                  <span>🍽️</span>
                  {servings} servings
                </span>
              )}
              {cuisine && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
                  {cuisine}
                </span>
              )}
              {difficulty && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 dark:bg-gray-800">
                  {difficulty}
                </span>
              )}
            </div>

            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-orange-600 dark:text-orange-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
              by{" "}
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {author.displayName || author.username}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

