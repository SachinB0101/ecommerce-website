import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/supabaseClient";
import type { RealtimeChannel } from "@supabase/supabase-js";

export const useCartRealtime = (cartId: string | null | undefined) => {
  const queryClient = useQueryClient();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!cartId) return;

    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channel = supabase
      .channel(`cart:${cartId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // INSERT | UPDATE | DELETE
          schema: "public",
          table: "CartItemsTable",
          filter: `cart_id=eq.${cartId}`, // only this user's cart rows
        },
        () => {
          // Invalidate the cart query — React Query will refetch,
          // then useUserDataSync dispatches setCart() to Redux
          queryClient.invalidateQueries({
            queryKey: ["cart", cartId],
          });
        },
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error(`[CartRealtime] Channel error for cart: ${cartId}`);
        }
      });

    channelRef.current = channel;

    // Cleanup on unmount or cartId change
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [cartId, queryClient]);
};
