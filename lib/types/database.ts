// Database types based on Supabase schema

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  id: string;
  user_id: string;
  title: string;
  ingredients: string;
  instructions: string;
  cooking_time: number | null;
  difficulty: "Easy" | "Medium" | "Hard" | null;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeWithProfile extends Recipe {
  profiles: Profile;
}

// Type for creating a new recipe (omits auto-generated fields)
export type RecipeInsert = Omit<
  Recipe,
  "id" | "created_at" | "updated_at"
>;

// Type for updating a recipe (all fields optional except id)
export type RecipeUpdate = Partial<Omit<Recipe, "id" | "user_id" | "created_at" | "updated_at">>;

// Type for creating/updating a profile (omits auto-generated fields)
export type ProfileUpdate = Partial<Omit<Profile, "id" | "created_at" | "updated_at">>;

