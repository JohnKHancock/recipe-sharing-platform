# Authentication Testing Guide

This guide will help you test the authentication flow in RecipeShare.

## Prerequisites

1. ✅ Supabase project created
2. ✅ Database schema run (tables created)
3. ✅ `.env.local` file configured with Supabase credentials
4. ✅ Development server running: `npm run dev`

## Testing Checklist

### 1. Start the Development Server

```bash
cd recipe-sharing-platform
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 2. Test Sign-Up Flow

#### Steps:
1. Click **"Sign Up"** button in the header (or navigate to `/auth/sign-up`)
2. Fill in the form:
   - **Full Name**: e.g., "John Doe"
   - **Username**: e.g., "johndoe" (must be unique)
   - **Email**: e.g., "john@example.com"
   - **Password**: At least 6 characters, e.g., "password123"
3. Click **"Sign up"** button

#### Expected Results:
- ✅ Form submits successfully
- ✅ Redirects to sign-in page with message: "Check your email to confirm your account"
- ✅ User account created in Supabase Auth
- ✅ Profile automatically created in `profiles` table (check in Supabase Dashboard)

#### Verify in Supabase Dashboard:
1. Go to **Authentication** → **Users**
2. You should see the new user
3. Go to **Table Editor** → **profiles**
4. You should see a profile with the username and full_name you entered

#### Common Issues:
- **"User already registered"**: Email already exists, use a different email
- **"Username already taken"**: The trigger should handle this, but if it fails, try a different username
- **No profile created**: Check that the trigger `on_auth_user_created` exists in your database

### 3. Test Sign-In Flow

#### Steps:
1. Navigate to `/auth/sign-in` (or click "Sign In" in header)
2. Enter the email and password you used to sign up
3. Click **"Sign in"** button

#### Expected Results:
- ✅ Successful sign-in
- ✅ Redirects to homepage (`/`)
- ✅ Header updates to show:
  - "Create Recipe" link
  - "Favorites" link
  - "Sign Out" button
- ✅ No more "Sign In" / "Sign Up" buttons visible

#### Verify Authentication State:
- Check browser DevTools → Application → Cookies
- You should see Supabase auth cookies (sb-*)
- The `UserMenu` component should show authenticated state

#### Common Issues:
- **"Invalid login credentials"**: 
  - Double-check email and password
  - If you just signed up, you may need to confirm email (check Supabase Auth settings)
- **Redirects to sign-in page**: Check middleware configuration
- **Header not updating**: Check browser console for errors

### 4. Test Sign-Out Flow

#### Steps:
1. While signed in, click **"Sign Out"** button in header
2. Observe the behavior

#### Expected Results:
- ✅ User is signed out
- ✅ Redirects to homepage
- ✅ Header updates to show:
  - "Sign In" link
  - "Sign Up" button
- ✅ Protected routes are no longer accessible

#### Verify Sign-Out:
- Check browser DevTools → Application → Cookies
- Supabase auth cookies should be removed/cleared
- Try accessing `/recipes/new` - should redirect to `/auth/sign-in`

### 5. Test Protected Routes

#### Steps:
1. While **signed out**, try to navigate to:
   - `/recipes/new`
   - `/me/favorites`
2. While **signed in**, try to navigate to:
   - `/auth/sign-in`
   - `/auth/sign-up`

#### Expected Results:
- ✅ Signed out users are redirected to `/auth/sign-in` when accessing protected routes
- ✅ Signed in users are redirected to `/` when accessing auth pages

### 6. Test Error Handling

#### Invalid Sign-In:
1. Try signing in with:
   - Wrong email
   - Wrong password
   - Non-existent user

#### Expected Results:
- ✅ Error message displayed in red box
- ✅ Form remains on page (no redirect)
- ✅ Error message is user-friendly

#### Invalid Sign-Up:
1. Try signing up with:
   - Email that already exists
   - Password less than 6 characters (client-side validation)
   - Missing required fields

#### Expected Results:
- ✅ Appropriate error messages displayed
- ✅ Form validation works (required fields, min length)
- ✅ Server errors (like duplicate email) are shown

### 7. Test Profile Creation

After signing up, verify the profile was created correctly:

#### In Supabase Dashboard:
1. Go to **Table Editor** → **profiles**
2. Find your user's profile (by email/user_id)
3. Verify:
   - ✅ `username` matches what you entered
   - ✅ `full_name` matches what you entered
   - ✅ `id` matches the user's auth.users.id
   - ✅ `created_at` and `updated_at` are set

#### Using SQL (Optional):
```sql
-- View all profiles
SELECT * FROM public.profiles;

-- View profile for a specific user
SELECT p.*, u.email 
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'your-email@example.com';
```

## Troubleshooting

### Issue: "Email already registered"
- **Solution**: Use a different email or delete the user from Supabase Dashboard → Authentication → Users

### Issue: Profile not created automatically
- **Check trigger exists**:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```
- **Check function exists**:
  ```sql
  SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
  ```
- **Manually create profile** (if needed):
  ```sql
  INSERT INTO public.profiles (id, username, full_name)
  SELECT id, 'user_' || substring(id::text from 1 for 8), 'User'
  FROM auth.users
  WHERE id NOT IN (SELECT id FROM public.profiles);
  ```

### Issue: Can't sign in after sign up
- **Check email confirmation**: By default, Supabase may require email confirmation
- **Disable email confirmation** (for testing): 
  - Supabase Dashboard → Authentication → Settings → Auth Providers → Email
  - Toggle "Confirm email" OFF (for development only!)
- Or check your email for confirmation link

### Issue: Middleware not working
- **Check middleware.ts exists** in project root
- **Check matcher pattern** includes your routes
- **Restart dev server** after changes

### Issue: Environment variables not loaded
- **Check .env.local exists** in project root (same level as package.json)
- **Restart dev server** after adding/changing .env.local
- **Verify format**: No quotes around values, no trailing spaces

### Issue: Cookies not being set
- **Check browser console** for errors
- **Check Supabase URL configuration**:
  - Supabase Dashboard → Authentication → URL Configuration
  - Site URL should include `http://localhost:3000`
  - Redirect URLs should include `http://localhost:3000/**`

## Quick Test Script

Here's a quick manual test sequence:

1. ✅ Visit homepage → See "Sign In" / "Sign Up" buttons
2. ✅ Click "Sign Up" → Fill form → Submit
3. ✅ Verify redirect to sign-in page
4. ✅ Click "Sign In" → Enter credentials → Submit
5. ✅ Verify redirect to homepage with authenticated header
6. ✅ Click "Sign Out" → Verify redirect and header update
7. ✅ Try accessing `/recipes/new` while signed out → Verify redirect to sign-in

## Next Steps

Once authentication is working:
- ✅ Test creating a recipe (requires authentication)
- ✅ Test user profiles
- ✅ Test recipe ownership and permissions

Happy testing! 🎉

