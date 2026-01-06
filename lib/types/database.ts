// Database types based on Supabase schema

export interface Profile {
  id: string;
  username: string;
  full_name: string;
  email: string | null;
  bio: string | null;
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

export interface Like {
  id: string;
  user_id: string;
  recipe_id: string;
  created_at: string;
}

export interface Comment {
  id: string;
  user_id: string;
  recipe_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface RecipeWithProfile extends Recipe {
  profiles: Profile;
}

export interface CommentWithProfile extends Comment {
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

// Type for creating a new comment (omits auto-generated fields)
export type CommentInsert = Omit<
  Comment,
  "id" | "created_at" | "updated_at"
>;

// Type for updating a comment (all fields optional except id)
export type CommentUpdate = Partial<Omit<Comment, "id" | "user_id" | "recipe_id" | "created_at" | "updated_at">>;