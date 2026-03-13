import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const linkStyle =
  "text-muted-foreground hover:text-foreground transition-colors";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "Women", to: "/categories/women" },
      { label: "Men", to: "/categories/men" },
      { label: "Accessories", to: "/categories/accessories" },
      { label: "Home", to: "/categories/home" },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Contact Us",
        to: "http://madebysachin.com.s3-website.ca-central-1.amazonaws.com/",
        external: true,
      },
      { label: "Shipping & Returns", to: "/shipping" },
      { label: "Size Guide", to: "/size-guide" },
      { label: "FAQs", to: "/faqs" },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About Us",
        to: "http://madebysachin.com.s3-website.ca-central-1.amazonaws.com/",
        external: true,
      },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
];

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">MODIQUE</h3>
            <p className="text-sm text-muted-foreground">
              Curated fashion and lifestyle products for the modern individual.
            </p>
          </div>
          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h4 className="font-medium mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.to}
                        className={linkStyle}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className={linkStyle}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="sm:hidden">
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold mb-1">MODIQUE</h3>
            <p className="text-sm text-muted-foreground">
              Curated fashion and lifestyle products for the modern individual.
            </p>
          </div>

          <div className="divide-y border-t border-b">
            {footerSections.map((section) => (
              <div key={section.title}>
                <button
                  onClick={() => toggle(section.title)}
                  className="flex items-center justify-between w-full py-4 text-sm font-medium"
                >
                  {section.title}
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                      openSection === section.title ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openSection === section.title && (
                  <ul className="pb-4 space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.to}
                            className={linkStyle}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link to={link.to} className={linkStyle}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MODIQUE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
