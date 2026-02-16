import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { to: "/products/women", label: "Women" },
    { to: "/products/men", label: "Men" },
    { to: "/products/accessories", label: "Accessories" },
    { to: "/products/home", label: "Home" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors hover:text-primary ${
              isActive ? "text-primary font-bold" : "text-muted-foreground"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};
export default Navbar;
