import { Logo } from "@/components/layout/Logo";
import { legalLinks, offices, site, socials } from "@/data/site";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass =
  "rounded-sm underline-offset-4 hover:underline hover:decoration-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Footer() {
  return (
    <footer className="bg-neutral-800 px-4 pt-16 pb-10 text-white sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-8">
          <Logo inverted />
          <div className="grid gap-6 sm:grid-cols-2">
            {offices.map((office) => (
              <address key={office.slug} className="not-italic text-neutral-100">
                {office.street}
                <br />
                {office.postalCode} {office.city} ({office.province})
              </address>
            ))}
          </div>
        </div>

        <nav aria-label="Social">
          <ul className="flex flex-col gap-3">
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <ul className="flex flex-col gap-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.newTab ? "_blank" : undefined}
                  rel={link.newTab ? "noopener noreferrer" : undefined}
                  className={linkClass}
                >
                  {link.label}
                  {link.newTab && <span className="sr-only"> (PDF, opens in a new tab)</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-16 max-w-6xl border-t border-neutral-600 pt-6 text-sm text-neutral-100">
        © <CopyrightYear /> {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
