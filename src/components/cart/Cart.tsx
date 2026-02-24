import { useGetCartProducts } from "@/app/hooks/useGetCartProducts";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { setCartOpen } from "@/features/cart/cartSlice";
import { useAuth, useUser } from "@clerk/clerk-react";
import DisplayCartSheetProducts from "./DisplayCartSheetProducts";

export const Cart = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const { cartId, items, isOpen } = useAppSelector((state) => state.cart);
  const { data: cartItemsWithProducts, isError } = useGetCartProducts(
    cartId,
    items,
    {
      enabled: !!user?.id && !!isSignedIn,
    },
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent
        aria-describedby={undefined}
        className="flex flex-col w-full sm:max-w-lg"
      >
        {isError ? (
          <SheetHeader>
            <SheetTitle className="font-display text-2xl">Error</SheetTitle>
          </SheetHeader>
        ) : (
          <DisplayCartSheetProducts
            cartItemsWithProducts={cartItemsWithProducts}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
