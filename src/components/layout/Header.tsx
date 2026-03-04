import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useClerk,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import {
  User,
  ShoppingBag,
  Package,
  Heart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { clearCart, setCartOpen } from "@/features/cart/cartSlice";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/app/hooks/core";

const Header = () => {
  const dispatch = useAppDispatch();
  const { signOut } = useClerk();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navLinks = [
    { to: "/products/women", label: "Women" },
    { to: "/products/men", label: "Men" },
    { to: "/products/accessories", label: "Accessories" },
    { to: "/products/home", label: "Home" },
  ];

  const handleSignOut = async () => {
    console.log("signout");
    dispatch(clearCart());
    localStorage.clear();
    await signOut();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl font-bold tracking-tight">
            MODIQUE
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
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                  userButtonPopoverActionButton__signOut: "hidden",
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
                <UserButton.Action
                  label="sign Out"
                  labelIcon={<LogOut className="h-4 w-4" />}
                  onClick={handleSignOut}
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

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <nav className="container flex flex-col space-y-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Link
                  to="/profile"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="text-sm font-medium transition-colors hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders
                </Link>
              </SignedIn>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
