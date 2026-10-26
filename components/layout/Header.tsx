import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { mainNav } from "@/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-100 bg-neutral-50/90 px-4 backdrop-blur-md sm:px-8">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-sm py-2 font-medium decoration-brand-dark decoration-2 underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
