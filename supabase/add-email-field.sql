-- =====================================================
-- Add email field to profiles table
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add email column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email TEXT;

-- Populate email for existing profiles from auth.users
UPDATE public.profiles p
SET email = au.email
FROM auth.users au
WHERE p.id = au.id AND p.email IS NULL;

-- The email field is nullable by default, but we'll populate it from auth.users

