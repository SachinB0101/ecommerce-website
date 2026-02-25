import { Link } from "react-router-dom";

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
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MODIQUE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
