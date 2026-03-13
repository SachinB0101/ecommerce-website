import { useUser } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Address } from "@/types";
import { supabase } from "@/supabaseClient";

const updateAddress = async (address: Address): Promise<Address> => {
  const { data, error } = await supabase
    .from("AddressesTable")
    .update({
      fullName: address.fullName,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
    })
    .eq("id", address.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

export const useUpdateAddress = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses", user?.id] });
    },
  });
};