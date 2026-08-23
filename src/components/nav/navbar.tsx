import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links?: NavLink[];
  /** href of the link to mark as current. */
  activeHref?: string;
  className?: string;
}

const defaultLinks: NavLink[] = [
  { label: "Courses", href: "/courses" },
  { label: "My Learning", href: "/my-learning" },
];

export function Navbar({ links = defaultLinks, activeHref, className }: NavbarProps) {
  return (
    <nav
      aria-label="Main"
      className={cn("flex flex-wrap items-center gap-x-8 gap-y-4", className)}
    >
      <Link
        href="/"
        className="rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      >
        <Logo size={24} />
      </Link>
      <ul className="flex items-center gap-8">
        {links.map((link) => {
          const isActive = link.href === activeHref;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-xs text-body-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                  isActive
                    ? "text-primary-500"
                    : "text-neutral-900 hover:text-primary-500",
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
