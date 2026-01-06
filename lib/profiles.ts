import { createClient } from "./supabase/server";

/**
 * Ensure a profile exists for the current user
 * Creates one if it doesn't exist
 */
export async function ensureProfileExists(userId: string) {
  const supabase = await createClient();

  // Check if profile exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", userId)
    .single();

  if (existingProfile) {
    return existingProfile;
  }

  // Profile doesn't exist, create it
  // Get user metadata from auth
  const { data: { user: authUser } } = await supabase.auth.getUser();
  
  const generatedUsername = `user_${userId.substring(0, 8)}`;
  const username = authUser?.user_metadata?.username || generatedUsername;
  const full_name = authUser?.user_metadata?.full_name || "User";
  const email = authUser?.email || null;
  const bio = authUser?.user_metadata?.bio || null;

  // Try to insert profile with username from metadata
  let usernameSuffix = 0;
  let uniqueUsername = username;

  // If generated username, ensure uniqueness
  if (username === generatedUsername) {
    // Check if username already exists
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", uniqueUsername)
      .single();

    if (existingUsername) {
      // Username exists, add suffix
      usernameSuffix = 1;
      uniqueUsername = `${generatedUsername}_${usernameSuffix}`;

      // Find unique username
      while (true) {
        const { data: checkUsername } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", uniqueUsername)
          .single();

        if (!checkUsername) {
          break; // Found unique username
        }

        usernameSuffix++;
        uniqueUsername = `${generatedUsername}_${usernameSuffix}`;
      }
    }
  } else {
    // Username from metadata - check if it's already taken
    const { data: existingUsername } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (existingUsername) {
      // Username is taken, use generated one
      uniqueUsername = generatedUsername;
      usernameSuffix = 1;
      uniqueUsername = `${generatedUsername}_${usernameSuffix}`;

      // Find unique username
      while (true) {
        const { data: checkUsername } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", uniqueUsername)
          .single();

        if (!checkUsername) {
          break;
        }

        usernameSuffix++;
        uniqueUsername = `${generatedUsername}_${usernameSuffix}`;
      }
    }
  }

  // Insert the profile
  const { data: newProfile, error: insertError } = await (supabase
    .from("profiles") as any)
    .insert({
      id: userId,
      username: uniqueUsername,
      full_name: full_name,
      email: email,
      bio: bio,
    })
    .select()
    .single();

  if (insertError) {
    // If the error is that the profile already exists, fetch and return it
    if (insertError.code === '23505' || insertError.message?.includes('duplicate')) {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      
      if (existingProfile) {
        return existingProfile;
      }
    }
    
    console.error("Error creating profile:", insertError);
    console.error("Profile insert details:", { userId, uniqueUsername, full_name });
    throw insertError;
  }

  return newProfile;
}
