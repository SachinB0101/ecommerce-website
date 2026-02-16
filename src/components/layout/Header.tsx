import { Link, Links } from "react-router-dom";
import Navbar from "../navbar/Navbar";


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
        <div className="flex items-center space-x-4"></div>
      </div>
    </header>
  );
};
export default Header;
