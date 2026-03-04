import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  setCartOpen,
  removeFromCart,
  updateCart,
} from "@/features/cart/cartSlice";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { CartItem } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteCartItemFromDB, useUpdateCartItemFromDB } from "@/app/hooks/cart";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";

export const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { isOpen, items } = useAppSelector((state) => state.cart);
  const { mutate: deleteItem } = useDeleteCartItemFromDB();
  const { mutate: updateItem } = useUpdateCartItemFromDB();

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + (item.product?.price ?? 0) * item.quantity,
    0,
  );

  const handleDeleteCartItem = (item: CartItem) => {
    setLoadingItemId(item.id);
    dispatch(removeFromCart(item));
    if (isSignedIn) {
      deleteItem(item, {
        onSettled: () => setLoadingItemId(null),
        onError: () => {
          dispatch(updateCart(item));
          toast.error("Failed to remove item. Please try again.");
        },
      });
    } else {
      setLoadingItemId(null);
    }
  };

  const handleUpdateCartItem = (item: CartItem, quantity: number) => {
    setLoadingItemId(item.id);
    dispatch(updateCart({ ...item, quantity }));
    if (isSignedIn) {
      if (quantity === 0) {
        deleteItem(item, {
          onSettled: () => setLoadingItemId(null),
          onError: () => {
            dispatch(updateCart(item));
            toast.error("Failed to remove item. Please try again.");
          },
        });
      } else {
        updateItem(
          { item, quantity },
          {
            onSettled: () => setLoadingItemId(null),
            onError: () => {
              dispatch(updateCart(item));
              toast.error("Failed to update item quantity. Please try again.");
            },
          },
        );
      }
    } else {
      setLoadingItemId(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => dispatch(setCartOpen(open))}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">
            Shopping Bag
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
          <>
            <div className="flex-1 overflow-y-auto py-4">
              {/* #4 — AnimatePresence so items animate out on delete */}
              <AnimatePresence initial={false}>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product?.id}-${item.size}-${item.color}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      className="flex gap-4"
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product?.image}
                          alt={item.product?.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium text-sm">
                              {item.product?.name}
                            </h4>
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
                            disabled={loadingItemId === item.id}
                            onClick={() => handleDeleteCartItem(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            {/* #1 — show trash icon when quantity is 1 */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={loadingItemId === item.id}
                              onClick={() =>
                                item.quantity === 1
                                  ? handleDeleteCartItem(item)
                                  : handleUpdateCartItem(
                                      item,
                                      item.quantity - 1,
                                    )
                              }
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="h-3 w-3 text-destructive" />
                              ) : (
                                <Minus className="h-3 w-3" />
                              )}
                            </Button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              disabled={loadingItemId === item.id}
                              onClick={() =>
                                handleUpdateCartItem(item, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="font-semibold">
                            {formatPrice(
                              (item.product?.price ?? 0) * item.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p className="font-display text-lg">{formatPrice(subtotal)}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  dispatch(setCartOpen(false));
                  navigate("/checkout");
                }}
              >
                Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => dispatch(setCartOpen(false))}
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
