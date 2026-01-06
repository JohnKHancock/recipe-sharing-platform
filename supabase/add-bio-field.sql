-- =====================================================
-- Add bio field to profiles table
-- Run this in Supabase SQL Editor
-- =====================================================

-- Add bio column to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT;

-- The bio field is already nullable by default, so no need to set NULL explicitly
-- You can verify with: SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'bio';

