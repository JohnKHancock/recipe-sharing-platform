"use client";

import { useState, useMemo } from "react";
import { RecipeCard } from "./recipe-card";
import { SearchFilters } from "./search-filters";

// Mock data - will be replaced with Supabase queries later
const mockRecipes = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description:
      "A timeless Italian pizza with fresh mozzarella, tomato sauce, and basil leaves. Perfect for a cozy dinner at home.",
    coverImageUrl: undefined,
    prepMinutes: 20,
    cookMinutes: 15,
    servings: 4,
    cuisine: "Italian",
    category: "Dinner",
    difficulty: "Easy",
    tags: ["pizza", "italian", "vegetarian"],
    author: {
      username: "chef_maria",
      displayName: "Maria Rossi",
    },
  },
  {
    id: "2",
    title: "Chocolate Chip Cookies",
    description:
      "Soft and chewy cookies loaded with chocolate chips. A family favorite that's perfect for any occasion.",
    coverImageUrl: undefined,
    prepMinutes: 15,
    cookMinutes: 12,
    servings: 24,
    cuisine: "American",
    category: "Dessert",
    difficulty: "Easy",
    tags: ["cookies", "dessert", "sweet"],
    author: {
      username: "baker_john",
      displayName: "John Baker",
    },
  },
  {
    id: "3",
    title: "Chicken Tikka Masala",
    description:
      "Creamy and aromatic Indian curry with tender chicken pieces. Serve with basmati rice or naan bread.",
    coverImageUrl: undefined,
    prepMinutes: 30,
    cookMinutes: 40,
    servings: 6,
    cuisine: "Indian",
    category: "Dinner",
    difficulty: "Medium",
    tags: ["curry", "indian", "chicken"],
    author: {
      username: "spice_master",
      displayName: "Amit Patel",
    },
  },
  {
    id: "4",
    title: "Avocado Toast with Poached Eggs",
    description:
      "A healthy and delicious breakfast option with creamy avocado and perfectly poached eggs on sourdough toast.",
    coverImageUrl: undefined,
    prepMinutes: 10,
    cookMinutes: 5,
    servings: 2,
    cuisine: "Mediterranean",
    category: "Breakfast",
    difficulty: "Easy",
    tags: ["breakfast", "healthy", "eggs"],
    author: {
      username: "healthy_eats",
      displayName: "Sarah Green",
    },
  },
  {
    id: "5",
    title: "Beef Bulgogi",
    description:
      "Korean marinated beef that's sweet, savory, and incredibly tender. Best served with rice and kimchi.",
    coverImageUrl: undefined,
    prepMinutes: 20,
    cookMinutes: 15,
    servings: 4,
    cuisine: "Asian",
    category: "Dinner",
    difficulty: "Medium",
    tags: ["korean", "beef", "marinated"],
    author: {
      username: "kimchi_lover",
      displayName: "Ji-hoon Kim",
    },
  },
  {
    id: "6",
    title: "Classic French Onion Soup",
    description:
      "Rich and comforting soup with caramelized onions, beef broth, and melted Gruyère cheese.",
    coverImageUrl: undefined,
    prepMinutes: 15,
    cookMinutes: 60,
    servings: 4,
    cuisine: "French",
    category: "Lunch",
    difficulty: "Medium",
    tags: ["soup", "french", "comfort-food"],
    author: {
      username: "paris_chef",
      displayName: "Pierre Dubois",
    },
  },
];

export function HomeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<{
    cuisine?: string;
    category?: string;
    difficulty?: string;
  }>({});

  const filteredRecipes = useMemo(() => {
    return mockRecipes.filter((recipe) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          recipe.title.toLowerCase().includes(query) ||
          recipe.description?.toLowerCase().includes(query) ||
          recipe.tags?.some((tag) => tag.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Cuisine filter
      if (filters.cuisine && recipe.cuisine !== filters.cuisine) {
        return false;
      }

      // Category filter
      if (filters.category && recipe.category !== filters.category) {
        return false;
      }

      // Difficulty filter
      if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-8">
        <SearchFilters
          onSearchChange={setSearchQuery}
          onFilterChange={setFilters}
        />
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            No recipes found. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </>
  );
}

