export type NavLink = {
  label: string;
  href: string;
};

export type Office = {
  slug: string;
  street: string;
  postalCode: string;
  city: string;
  province: string;
};

export type SocialName = "instagram" | "linkedin" | "facebook";

export type SocialLink = {
  name: SocialName;
  label: string;
  href: string;
};

export type LegalLink = NavLink & {
  newTab?: boolean;
};

export const site = {
  name: "Institute Itech",
  shortName: "IITE",
  url: "https://www.iite.eu",
  tagline:
    "Research and development institute, strategic consultancy, molding societies of tomorrow.",
  description:
    "Institute Itech is a Milan-based R&D institute building AI-driven platforms for neurodegenerative-disease research, urban environmental systems, and sustainable land management.",
};

export const mainNav = [
  { label: "Memoria™", href: "/memoria" },
  { label: "Oxyleaf™", href: "/oxyleaf" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/#contact" },
] satisfies NavLink[];

export const offices = [
  {
    slug: "piazza-vetra",
    street: "Piazza Vetra, 17",
    postalCode: "20123",
    city: "Milano",
    province: "MI",
  },
  {
    slug: "via-san-raffaele",
    street: "Via San Raffaele, 1",
    postalCode: "20121",
    city: "Milano",
    province: "MI",
  },
] satisfies Office[];

export const socials = [
  { name: "instagram", label: "Instagram", href: "https://www.instagram.com/iite.eu" },
  { name: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/instituteitech" },
  { name: "facebook", label: "Facebook", href: "https://www.facebook.com/institute.iite" },
] satisfies SocialLink[];

export const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy.pdf", newTab: true },
  { label: "Image Disclaimer", href: "/legal/image-disclaimer.pdf", newTab: true },
] satisfies LegalLink[];
