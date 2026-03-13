import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { to: "/categories/women", label: "Women" },
    { to: "/categories/men", label: "Men" },
    { to: "/categories/accessories", label: "Accessories" },
    { to: "/categories/home", label: "Home" },
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
