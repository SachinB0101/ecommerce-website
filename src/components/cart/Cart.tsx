import { useGetCartProducts } from "@/app/hooks/useGetCartProducts";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  removeFromCart,
  setCartOpen,
  updateCart,
} from "@/features/cart/cartSlice";
import { useAuth, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const Cart = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const { cartId, items, isOpen } = useAppSelector((state) => state.cart);
  const {
    data: cartItemsWithProducts,
    isLoading,
    isError,
  } = useGetCartProducts(cartId, items, {
    enabled: !!user?.id && !!isSignedIn,
  });

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent
        aria-describedby={undefined}
        className="flex flex-col w-full sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">
            {isError ? "Error" : isLoading ? "Loading..." : "Shopping Bag"}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Your bag is empty</p>
              <Button onClick={() => dispatch(setCartOpen(false))}>
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto py-4">
            <div className="space-y-4">
              {cartItemsWithProducts?.map((item, index) => (
                <motion.div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={item.image ?? ""}
                      alt={item.name ?? ""}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.size && item.color && <span> • </span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            dispatch(
                              updateCart({
                                ...item,
                                quantity: item.quantity - 1,
                              }),
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            dispatch(
                              updateCart({
                                ...item,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-semibold">
                        {formatPrice((item.price ?? 0) * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};