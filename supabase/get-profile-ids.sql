-- =====================================================
-- Helper Query: Get Profile IDs
-- Run this first to see what user IDs actually exist
-- =====================================================

SELECT 
  id,
  username,
  email,
  full_name
FROM public.profiles
ORDER BY username;

-- Copy the IDs from the results and update the seed-recipes.sql file