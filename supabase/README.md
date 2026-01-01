# Supabase Database Setup Guide

This guide will help you set up the RecipeShare database in Supabase.

## Prerequisites

- A Supabase project created
- Authentication enabled (email/password)
- Access to the Supabase SQL Editor

## Setup Steps

### 1. Run the Schema SQL

1. Open your Supabase project dashboard
2. Go to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql`
5. Paste into the SQL Editor
6. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

This will create:
- ✅ `profiles` table
- ✅ `recipes` table
- ✅ All indexes for performance
- ✅ RLS policies for security
- ✅ Triggers for auto-creating profiles and updating timestamps

### 2. Verify Setup

Run these queries in the SQL Editor to verify everything is set up correctly:

```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'recipes')
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'recipes');

-- Check indexes
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'recipes');
```

## Database Schema Overview

### Tables

1. **profiles**
   - `id` (UUID, primary key, references auth.users)
   - `username` (TEXT, unique, required)
   - `full_name` (TEXT, optional)
   - `created_at` (TIMESTAMPTZ)
   - `updated_at` (TIMESTAMPTZ)
   - Automatically created when a user signs up (via trigger)

2. **recipes**
   - `id` (UUID, primary key)
   - `user_id` (UUID, references profiles.id)
   - `title` (TEXT, required)
   - `ingredients` (TEXT, required)
   - `instructions` (TEXT, required)
   - `cooking_time` (INTEGER, optional - minutes)
   - `difficulty` (TEXT, optional - Easy/Medium/Hard)
   - `category` (TEXT, optional)
   - `created_at` (TIMESTAMPTZ)
   - `updated_at` (TIMESTAMPTZ)

### Key Features

- **Row Level Security (RLS)**: Both tables have RLS enabled with appropriate policies
- **Automatic Timestamps**: `created_at` and `updated_at` are automatically managed
- **Indexes**: Optimized for common queries (user lookups, sorting, filtering by category/difficulty)
- **Data Integrity**: Foreign keys with CASCADE deletes

## Security Notes

- Profiles are viewable by everyone, but only users can update their own profile
- Recipes are viewable by everyone (public by default)
- Only authenticated users can create recipes
- Only recipe owners can update or delete their recipes

## Testing the Setup

### Test Profile Creation

1. Go to **Authentication** → **Users** in Supabase Dashboard
2. Click **Add user** → **Create new user**
3. Create a test user with email and password
4. Verify a profile was automatically created:
   ```sql
   SELECT * FROM public.profiles 
   ORDER BY created_at DESC 
   LIMIT 1;
   ```

### Test Recipe Creation

```sql
-- First, get a user_id from profiles
SELECT id, username FROM public.profiles LIMIT 1;

-- Then insert a test recipe (replace user_id with actual ID)
INSERT INTO public.recipes (
  user_id, 
  title, 
  ingredients, 
  instructions, 
  cooking_time, 
  difficulty, 
  category
) VALUES (
  'your-user-id-here',
  'Test Recipe',
  'Ingredient 1, Ingredient 2',
  'Step 1. Do this. Step 2. Do that.',
  30,
  'Easy',
  'Dinner'
);
```

## Next Steps

After setting up the database:

1. Install Supabase client libraries:
```bash
npm install @supabase/supabase-js @supabase/ssr
```

2. Create environment variables (`.env.local`):
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Create Supabase client utilities in your Next.js app

## Troubleshooting

### Issue: Trigger not creating profiles

If profiles aren't being created automatically:
- Check that the trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
- Verify the function exists: `SELECT * FROM pg_proc WHERE proname = 'handle_new_user';`
- Manually create profile if needed:
  ```sql
  INSERT INTO public.profiles (id, username)
  SELECT id, 'user_' || substring(id::text from 1 for 8)
  FROM auth.users
  WHERE id NOT IN (SELECT id FROM public.profiles);
  ```

### Issue: RLS blocking queries

- Ensure you're authenticated when testing protected routes
- Check that your RLS policies match your use case
- Use Supabase Dashboard > Authentication > Users to test with different users
- Test as anonymous user: `SET ROLE anon;` then run your query

### Issue: Username uniqueness violation

The trigger handles this automatically, but if you see errors:
- The trigger generates unique usernames by appending numbers if needed
- You can manually set usernames when creating users via the Auth API
