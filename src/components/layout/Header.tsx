import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { User } from "lucide-react";

const Header = () => {
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
            <SignOutButton>Sign Out</SignOutButton>
          </SignedIn>
        </div>
      </div>
    </header>
  );
};
export default Header;
