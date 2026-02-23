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

  if (error) throw `This is the error - ${error}`;

  if (!existingUser) {
    const { data: newUser, error: insertErrorUser } = await supabase
      .from("UsersTable")
      .insert({
        clerk_user_id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.primaryEmailAddress?.emailAddress,
      })
      .select("id")
      .single();

    const { data: cartId, error: insertErrorCart } = await supabase
      .from("CartTable")
      .insert({
        user_id: newUser?.id,
      })
      .select("id")
      .single();

    if (insertErrorUser || insertErrorCart)
      throw `${insertErrorUser} and ${insertErrorCart} `;

    return cartId.id;
  } else {
    const userId = existingUser.id;
    const { data: cartId, error } = await supabase
      .from("CartTable")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    return cartId.id;
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
