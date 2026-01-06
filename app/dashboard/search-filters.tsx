"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
] as const;

const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

export function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("q") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    searchParams.get("difficulty") || "All"
  );
  const [maxCookingTime, setMaxCookingTime] = useState(
    searchParams.get("maxTime") || ""
  );

  function updateSearchParams(
    q: string,
    category: string,
    difficulty: string,
    maxTime: string
  ) {
    const params = new URLSearchParams();

    if (q.trim()) {
      params.set("q", q.trim());
    }
    if (category && category !== "All") {
      params.set("category", category);
    }
    if (difficulty && difficulty !== "All") {
      params.set("difficulty", difficulty);
    }
    if (maxTime) {
      params.set("maxTime", maxTime);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/dashboard?${queryString}` : "/dashboard";

    startTransition(() => {
      router.push(newUrl);
    });
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateSearchParams(
      searchQuery,
      selectedCategory,
      selectedDifficulty,
      maxCookingTime
    );
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    updateSearchParams(
      searchQuery,
      newCategory,
      selectedDifficulty,
      maxCookingTime
    );
  }

  function handleDifficultyChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newDifficulty = e.target.value;
    setSelectedDifficulty(newDifficulty);
    updateSearchParams(
      searchQuery,
      selectedCategory,
      newDifficulty,
      maxCookingTime
    );
  }

  function handleMaxTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newMaxTime = e.target.value;
    setMaxCookingTime(newMaxTime);
    updateSearchParams(
      searchQuery,
      selectedCategory,
      selectedDifficulty,
      newMaxTime
    );
  }

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setMaxCookingTime("");
    startTransition(() => {
      router.push("/dashboard");
    });
  }

  const hasActiveFilters =
    searchQuery.trim() ||
    selectedCategory !== "All" ||
    selectedDifficulty !== "All" ||
    maxCookingTime !== "";

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes by title or ingredients..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 pr-24 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-500"
            disabled={isPending}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-medium text-orange-600 hover:text-orange-700 disabled:opacity-50 dark:text-orange-400 dark:hover:text-orange-300"
          >
            {isPending ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="category-filter"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category:
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={isPending}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="difficulty-filter"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Difficulty:
          </label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={handleDifficultyChange}
            disabled={isPending}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>

        {/* Cooking Time Filter */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="time-filter"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Max Time:
          </label>
          <select
            id="time-filter"
            value={maxCookingTime}
            onChange={handleMaxTimeChange}
            disabled={isPending}
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
          >
            <option value="">Any</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
            <option value="120">2 hours</option>
            <option value="180">3+ hours</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            disabled={isPending}
            className="ml-auto rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">Active filters:</span>{" "}
          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 dark:bg-orange-900/20">
              Search: &quot;{searchQuery.trim()}&quot;
            </span>
          )}{" "}
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 dark:bg-orange-900/20">
              {selectedCategory}
            </span>
          )}{" "}
          {selectedDifficulty !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 dark:bg-orange-900/20">
              {selectedDifficulty}
            </span>
          )}{" "}
          {maxCookingTime && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-1 dark:bg-orange-900/20">
              ≤{maxCookingTime} min
            </span>
          )}
        </div>
      )}
    </div>
  );
}
