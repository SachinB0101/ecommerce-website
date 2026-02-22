import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { User, ShoppingBag, Package, Heart } from "lucide-react";
import { setCartOpen } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useRedux";

const Header = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl font-bold tracking-tight">
            MODERN SHOP
          </span>
        </Link>
        <Navbar />
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex relative"
            >
              <Link to="/wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden md:flex"
            >
              <Link to="/orders">
                <Package className="h-5 w-5" />
              </Link>
            </Button>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Profile"
                  labelIcon={<User className="h-4 w-4" />}
                  href="/profile"
                />
                <UserButton.Link
                  label="Order History"
                  labelIcon={<Package className="h-4 w-4" />}
                  href="/orders"
                />
                <UserButton.Link
                  label="Wishlist"
                  labelIcon={<Heart className="h-4 w-4" />}
                  href="/wishlist"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              dispatch(setCartOpen(true));
            }}
            className="relative"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
