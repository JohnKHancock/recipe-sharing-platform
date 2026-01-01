# Supabase Setup Guide

This guide walks you through completing the Supabase setup in your Next.js project.

## ✅ What's Already Done

1. ✅ Supabase packages installed (`@supabase/supabase-js` and `@supabase/ssr`)
2. ✅ Database types created (`lib/types/database.ts` and `lib/supabase/types.ts`)
3. ✅ Supabase client utilities created:
   - `lib/supabase/client.ts` - Browser client (use in Client Components)
   - `lib/supabase/server.ts` - Server client (use in Server Components/Actions)
4. ✅ Authentication helpers created (`lib/auth.ts`)
5. ✅ Middleware set up for protected routes (`middleware.ts`)

## 📝 Step 1: Create Environment Variables

1. Create a `.env.local` file in the root of your project (same level as `package.json`)

2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. To get these values:
   - Go to your Supabase Dashboard
   - Navigate to **Settings** → **API**
   - Copy the **Project URL** and paste it as `NEXT_PUBLIC_SUPABASE_URL`
   - Copy the **anon/public** key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📝 Step 2: Verify Database Schema

Make sure your Supabase database matches the schema. If you haven't run the schema yet:

1. Go to Supabase Dashboard → **SQL Editor**
2. Copy the contents of `supabase/schema.sql`
3. Paste and run it

The schema should have:
- `profiles` table with: id, username, full_name, created_at, updated_at
- `recipes` table with: id, user_id, title, ingredients, instructions, cooking_time, difficulty, category, created_at, updated_at

## 📝 Step 3: Configure Auth Redirects

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add these redirect URLs:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: 
     - `http://localhost:3000/auth/callback`
     - `http://localhost:3000/**` (for production, replace with your domain)

## 🧪 Step 4: Test the Setup

Start your development server:

```bash
npm run dev
```

The middleware should now be protecting routes. Try accessing:
- `/recipes/new` - Should redirect to `/auth/sign-in` if not logged in
- `/auth/sign-in` - Should be accessible

## 📚 Usage Examples

### In Server Components

```typescript
import { createClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/auth";

export default async function MyServerComponent() {
  const profile = await getUserProfile();
  // or
  const supabase = await createClient();
  const { data: recipes } = await supabase.from("recipes").select("*");
}
```

### In Client Components

```typescript
"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function MyClientComponent() {
  const [recipes, setRecipes] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("recipes")
      .select("*")
      .then(({ data }) => setRecipes(data || []));
  }, []);

  return <div>{/* render recipes */}</div>;
}
```

### In Server Actions

```typescript
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createRecipe(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("recipes").insert({
    user_id: user.id,
    title: formData.get("title"),
    // ... other fields
  });

  if (error) throw error;
  revalidatePath("/");
}
```

## 🔐 Protected Routes

The middleware automatically protects these routes (requires authentication):
- `/recipes/new`
- `/recipes/edit/*`
- `/me/*`

Authenticated users are automatically redirected away from `/auth/sign-in` and `/auth/sign-up`.

## 🚀 Next Steps

Now you can:
1. Create authentication pages (`/app/auth/sign-in/page.tsx` and `/app/auth/sign-up/page.tsx`)
2. Create recipe pages that use the Supabase client
3. Start building your UI components that interact with the database

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after adding environment variables

### "User not authenticated" errors
- Check that RLS policies are set up correctly in Supabase
- Verify the user is logged in by checking `auth.users` table
- Ensure the profile was created automatically (check `profiles` table)

### Middleware not working
- Make sure `middleware.ts` is in the root of your project
- Check that the matcher pattern includes your routes
- Restart your dev server

