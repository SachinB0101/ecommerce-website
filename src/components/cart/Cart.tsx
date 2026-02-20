import { useAppSelector, useAppDispatch } from "@/app/hooks/useRedux";
import {
  setCartOpen,
  removeFromCart,
  updateCart,
} from "@/features/cart/cartSlice";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { products } from "@/data/products";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useGetCartItems } from "@/app/hooks/useGetCartItems";
import InitializingScreen from "../loading/InitializingScreen";
import ErrorPage from "@/pages/ErrorPage";

export function Cart() {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();

  const { cartId, items, isOpen } = useAppSelector((state) => state.cart);

  //Have to setup the auth + supabase to get the products from database

  // const cartItemsWithProducts = items.map((item) => ({
  //   ...item,
  //   product: products.find((p) => p.id === item.productId)!,
  // }));

  // const subtotal = cartItemsWithProducts.reduce(
  //   (sum, item) => sum + item.product.price * item.quantity,
  //   0,
  // );

  const subtotal = 1000; //dummy

  //working on the logic of guest cart and user cart
  const { data, isLoading, isError } = useGetCartItems(cartId);

  if (isLoading) {
    return <InitializingScreen />;
  }

  if (isError) {
    return<ErrorPage />;
  }

  const handleCheckout = () => {
    if (isSignedIn) {
      dispatch(setCartOpen(false));
      navigate("/checkout");
    } else {
      // User will be prompted to sign in via protected route
      dispatch(setCartOpen(false));
      navigate("/checkout");
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
              <div className="space-y-4">
                "hello"
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p className="font-display text-lg">{formatPrice(subtotal)}</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Button className="w-full" size="lg" onClick={handleCheckout}>
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
}
