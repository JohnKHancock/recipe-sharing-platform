-- =====================================================
-- Fix Profile Creation Issue
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Add bio column if it doesn't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT;

-- Step 2: Add email column if it doesn't exist
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email TEXT;

-- Step 3: Create profiles for any existing users missing one
INSERT INTO public.profiles (id, username, full_name, email, bio)
SELECT 
  au.id,
  COALESCE(
    au.raw_user_meta_data->>'username',
    'user_' || substring(au.id::text from 1 for 8)
  ) as username,
  COALESCE(
    au.raw_user_meta_data->>'full_name',
    'User'
  ) as full_name,
  au.email,
  au.raw_user_meta_data->>'bio' as bio
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM public.profiles)
ON CONFLICT (id) DO NOTHING;

-- Step 4: Populate email for existing profiles
UPDATE public.profiles p
SET email = au.email
FROM auth.users au
WHERE p.id = au.id AND p.email IS NULL;

-- Step 5: Recreate the trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  generated_username TEXT;
  username_suffix INTEGER := 0;
BEGIN
  -- Use username from metadata if provided
  IF NEW.raw_user_meta_data->>'username' IS NOT NULL THEN
    generated_username := NEW.raw_user_meta_data->>'username';
  ELSE
    -- Generate unique username based on user ID
    generated_username := 'user_' || substring(NEW.id::text from 1 for 8);
    
    -- Ensure uniqueness by appending number if needed
    WHILE EXISTS(SELECT 1 FROM public.profiles WHERE username = generated_username) LOOP
      username_suffix := username_suffix + 1;
      generated_username := 'user_' || substring(NEW.id::text from 1 for 8) || '_' || username_suffix;
    END LOOP;
  END IF;
  
  INSERT INTO public.profiles (id, username, full_name, email, bio)
  VALUES (
    NEW.id,
    generated_username,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    NEW.raw_user_meta_data->>'bio'
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Drop and recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 7: Verify the trigger exists
SELECT 
  tgname as trigger_name,
  tgrelid::regclass as table_name,
  proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE tgname = 'on_auth_user_created';
