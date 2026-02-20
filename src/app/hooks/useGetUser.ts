import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

export const useGetUser = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: async (): Promise<string | null> => {
      const { data, error } = await supabase
        .from("UsersTable")
        .select("id")
        .eq("clerk_user_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        console.log("new user!!!");
        const { data: newUser, error: insertError } = await supabase
          .from("UsersTable")
          .insert({
            clerk_user_id: user!.id,
            first_name: user!.firstName,
            last_name: user!.lastName,
            email: user!.primaryEmailAddress?.emailAddress,
          })
          .select("id")
          .single();

        if (insertError) throw insertError;

        return newUser.id;
      }

      console.log("old user");
      return data.id;
    },
    enabled: !!user?.id && isLoaded && !!isSignedIn, 
  });
};