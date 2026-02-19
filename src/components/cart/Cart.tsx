import { useAppSelector, useAppDispatch } from "@/app/hooks/useRedux";
import {
  setCartOpen,
} from "@/features/cart/cartSlice";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Cart() {

  const { items, isOpen } = useAppSelector((state) => state.cart);


  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">
            Shopping Bag
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
