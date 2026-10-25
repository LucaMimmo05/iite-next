import { Logo } from "@/components/layout/Logo";
import { legalLinks, offices, site, socials } from "@/data/site";

async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass =
  "rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white px-4 py-12 text-sm sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-6">
          <Logo />
          <div className="grid gap-6 sm:grid-cols-2">
            {offices.map((office) => (
              <address key={office.slug} className="not-italic uppercase">
                {office.street}
                <br />
                {office.postalCode} {office.city}, {office.province}
              </address>
            ))}
          </div>
        </div>

        <nav aria-label="Social">
          <ul className="flex flex-col gap-3 uppercase">
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

      <p className="mx-auto mt-12 max-w-6xl text-neutral-600">
        © <CopyrightYear /> {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
