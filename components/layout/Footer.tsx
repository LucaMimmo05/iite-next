import { Logo } from "@/components/layout/Logo";
import { legalLinks, offices, site, socials, type NavItem } from "@/data/site";

type LinkListProps = {
  label: string;
  links: NavItem[];
  note: string;
};

function LinkList({ label, links, note }: LinkListProps) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm underline-offset-4 hover:underline hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {link.label}
              <span className="sr-only"> ({note})</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-800 px-4 pt-16 pb-10 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-8">
          <Logo inverted />
          <div className="grid gap-6 sm:grid-cols-2">
            {offices.map(([street, city]) => (
              <address key={street} className="text-neutral-100 not-italic">
                {street}
                <br />
                {city}
              </address>
            ))}
          </div>
        </div>

        <LinkList label="Social" links={socials} note="opens in a new tab" />
        <LinkList label="Legal" links={legalLinks} note="PDF, opens in a new tab" />
      </div>

      <p className="mx-auto mt-16 max-w-6xl border-t border-neutral-600 pt-6 text-sm text-neutral-100">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
