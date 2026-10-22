import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

const LINKS = [
  { href: "/#products", label: "Products" },
  { href: "/#plus", label: "Copper Plus" },
  { href: "/#privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background/95 sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-28 sm:w-44" />
        </Link>
        <div className="flex items-center gap-1 sm:gap-4">
          <nav
            aria-label="Main"
            className="flex items-center gap-2 whitespace-nowrap text-xs font-medium sm:gap-6 sm:text-sm"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
