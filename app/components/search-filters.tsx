"use client";

import { useState } from "react";

interface SearchFiltersProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: {
    cuisine?: string;
    category?: string;
    difficulty?: string;
  }) => void;
}

const cuisines = [
  "Italian",
  "Mexican",
  "Asian",
  "American",
  "Mediterranean",
  "Indian",
  "French",
  "Japanese",
];

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
];

const difficulties = ["Easy", "Medium", "Hard"];

export function SearchFilters({
  onSearchChange,
  onFilterChange,
}: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleCuisineChange = (cuisine: string) => {
    const value = cuisine === selectedCuisine ? "" : cuisine;
    setSelectedCuisine(value);
    onFilterChange({
      cuisine: value || undefined,
      category: selectedCategory || undefined,
      difficulty: selectedDifficulty || undefined,
    });
  };

  const handleCategoryChange = (category: string) => {
    const value = category === selectedCategory ? "" : category;
    setSelectedCategory(value);
    onFilterChange({
      cuisine: selectedCuisine || undefined,
      category: value || undefined,
      difficulty: selectedDifficulty || undefined,
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    const value = difficulty === selectedDifficulty ? "" : difficulty;
    setSelectedDifficulty(value);
    onFilterChange({
      cuisine: selectedCuisine || undefined,
      category: selectedCategory || undefined,
      difficulty: value || undefined,
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-sm placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder-gray-500 dark:focus:border-orange-400"
        />
        <svg
          className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Cuisine:
          </label>
          <select
            value={selectedCuisine}
            onChange={(e) => handleCuisineChange(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
          >
            <option value="">All</option>
            {cuisines.map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Difficulty:
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => handleDifficultyChange(e.target.value)}
            className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50"
          >
            <option value="">All</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

