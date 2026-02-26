import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

const getOrCreateUser = async (
  user?: NonNullable<ReturnType<typeof useUser>["user"]> | null,
): Promise<string> => {
  const { data: existingUser, error } = await supabase
    .from("UsersTable")
    .select("id")
    .eq("clerk_user_id", user!.id)
    .maybeSingle();

  if (error) throw error;

  if (!existingUser) {
    // New user — create user row
    const { data: newUser, error: insertErrorUser } = await supabase
      .from("UsersTable")
      .insert({
        clerk_user_id: user!.id,
        first_name: user!.firstName,
        last_name: user!.lastName,
        email: user!.primaryEmailAddress?.emailAddress,
      })
      .select("id")
      .single();

    if (insertErrorUser) throw insertErrorUser; 

    // Then create cart row
    const { data: newCart, error: insertErrorCart } = await supabase
      .from("CartTable")
      .insert({ user_id: newUser.id })
      .select("id")
      .single();

    if (insertErrorCart) throw insertErrorCart; 

    return newCart.id;
  } else {
    // Existing user — find their cart
    const { data: cartRow, error: cartError } = await supabase
      .from("CartTable")
      .select("id")
      .eq("user_id", existingUser.id)
      .maybeSingle();

    if (cartError) throw cartError;

    if (!cartRow) {
      // Defensive: user exists but cart was never created (current broken state)
      const { data: newCart, error: insertError } = await supabase
        .from("CartTable")
        .insert({ user_id: existingUser.id })
        .select("id")
        .single();
      if (insertError) throw insertError;
      return newCart.id;
    }

    return cartRow.id;
  }
};

export const useGetCartId = (
  user?: NonNullable<ReturnType<typeof useUser>["user"]> | null,
  option = {},
) => {
  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => getOrCreateUser(user),
    ...option,
  });
};
