"use client";

import { useState } from "react";
import { SearchFilters } from "./search-filters";

export function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    cuisine?: string;
    category?: string;
    difficulty?: string;
  }>({});

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-8">
        <SearchFilters
          onSearchChange={setSearchQuery}
          onFilterChange={setFilters}
        />
      </div>

      {/* Empty State */}
      <div className="py-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          No recipes yet. Be the first to share a recipe!
        </p>
      </div>
    </>
  );
}

