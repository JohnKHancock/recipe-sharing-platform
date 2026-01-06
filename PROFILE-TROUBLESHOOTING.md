# Profile Troubleshooting Guide

If profiles are not being created automatically, follow these steps:

## Step 1: Verify Database Trigger Exists

Run this query in Supabase SQL Editor:

```sql
-- Check if trigger exists
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Check if function exists
SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
```

If either returns no results, re-run the `schema.sql` file in Supabase SQL Editor.

## Step 2: Manually Create Missing Profiles

If you have users without profiles, run this query:

```sql
-- Create profiles for all users missing one
INSERT INTO public.profiles (id, username, full_name)
SELECT 
  au.id,
  COALESCE(
    au.raw_user_meta_data->>'username',
    'user_' || substring(au.id::text from 1 for 8)
  ) as username,
  COALESCE(
    au.raw_user_meta_data->>'full_name',
    'User'
  ) as full_name
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM public.profiles);
```

## Step 3: Check RLS Policies

Ensure the INSERT policy allows profile creation:

```sql
-- Check existing policies
SELECT * FROM pg_policies WHERE tablename = 'profiles';

-- The INSERT policy should allow: WITH CHECK (auth.uid() = id)
```

## Step 4: Verify Trigger Permissions

The trigger function uses `SECURITY DEFINER`, which should allow it to bypass RLS. If profiles still aren't being created:

1. Check Supabase logs for errors
2. Verify the trigger is enabled: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
3. The trigger should fire `AFTER INSERT` on `auth.users`

## Step 5: Application Fallback

The application now includes a fallback mechanism (`ensureProfileExists`) that:
- Checks if a profile exists when needed
- Creates one automatically if missing
- Handles username uniqueness

This should work even if the database trigger fails.

## Common Issues

### Issue: "Profile not found" when creating recipes
- **Solution**: The app now automatically creates profiles when needed. Try creating a recipe again.

### Issue: "My Profile" doesn't navigate
- **Solution**: The app now ensures profiles exist before showing the page. Refresh and try again.

### Issue: Trigger not firing
- **Possible causes**:
  - Trigger not created
  - RLS blocking the INSERT
  - Function permissions issue
- **Solution**: Use the manual profile creation query above, and verify trigger exists.

