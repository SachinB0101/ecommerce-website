import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import type { User } from "@clerk/clerk-react";

const getOrCreateUser = async (user: User): Promise<string> => {
  const { data, error } = await supabase
    .from("UsersTable")
    .select("id")
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (error) throw error;

  if (!data) {
    const { data: newUser, error: insertError } = await supabase
      .from("UsersTable")
      .insert({
        clerk_user_id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
      })
      .select("id")
      .single();

    if (insertError) throw insertError;
    return newUser.id;
  }

  return data.id;
};

export const useGetOrCreateUser = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: () => getOrCreateUser(user!),
    enabled: !!user?.id && isLoaded && !!isSignedIn,
  });
};
