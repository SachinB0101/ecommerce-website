import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { setCartOpen } from "@/features/cart/cartSlice";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.cart);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">
            Shopping Bag (WORKING)
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
