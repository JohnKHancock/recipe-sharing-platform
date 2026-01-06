# Fix Profile Creation Issue

## Problem
Profiles are not being automatically created in the Supabase `profiles` table when users sign up.

## Solution

### Step 1: Run the Fix SQL Script

1. Open your Supabase project dashboard
2. Go to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open `supabase/fix-profiles.sql` and copy the entire contents
5. Paste into the SQL Editor
6. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

This script will:
- Create profiles for any existing users that are missing one
- Recreate the trigger function with better error handling
- Recreate the trigger to ensure it's active
- Verify the trigger exists

### Step 2: Verify the Trigger

Run this query in the SQL Editor to verify the trigger is set up:

```sql
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_auth_user_created';
```

You should see one row with the trigger details.

### Step 3: Check Existing Users

To see if any existing users are missing profiles:

```sql
SELECT 
  au.id,
  au.email,
  au.raw_user_meta_data->>'username' as username_from_metadata,
  au.raw_user_meta_data->>'full_name' as full_name_from_metadata,
  CASE WHEN p.id IS NULL THEN 'MISSING PROFILE' ELSE 'OK' END as profile_status
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
ORDER BY au.created_at DESC;
```

### Step 4: Test New Signups

After running the fix script:
1. Sign up a new user
2. Check the `profiles` table in Supabase to confirm the profile was created
3. The app-level fallback (`ensureProfileExists`) will also create profiles if the trigger fails

## Why This Happens

The database trigger (`on_auth_user_created`) should automatically create a profile when a user signs up. However, triggers can sometimes fail or not be set up correctly. The app now has a fallback mechanism that creates profiles if they don't exist during signup and signin.

## Additional Notes

- The trigger function uses `SECURITY DEFINER` which allows it to bypass RLS policies
- The app-level `ensureProfileExists` function respects RLS policies (users can only create their own profile)
- Both mechanisms work together to ensure profiles are always created

