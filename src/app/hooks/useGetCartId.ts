import { supabase } from "@/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";

const getOrCreateUser = async (
  user: NonNullable<ReturnType<typeof useUser>["user"]>,
): Promise<string> => {
  const { data: existingUser, error } = await supabase
    .from("UsersTable")
    .select("id")
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (error) throw `This is the error - ${error}`;

  // console.log(existingUser)

  if (!existingUser) {
    console.log("A new user");
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

    console.log(`The cartId = ${cartId}`);

    if (insertErrorUser || insertErrorCart)
      throw `${insertErrorUser} and ${insertErrorCart} `;

    return cartId.id;
  } else {
    console.log("A existing user");
    const userId = existingUser.id;
    const { data: cartId, error } = await supabase
      .from("CartTable")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (error) throw error;

    console.log(`The cartId = ${cartId.id}`);
    return cartId.id;
  }
};

export const useGetCartId = (
  user: NonNullable<ReturnType<typeof useUser>["user"]>,
  option = {},
) => {
  // console.log(`inside useGetOrCreateUser - ${user}`);
  // const { user } = useUser();

  return useQuery({
    queryKey: ["user", user?.id],
    queryFn: async () => getOrCreateUser(user),
    ...option,
  });
};
