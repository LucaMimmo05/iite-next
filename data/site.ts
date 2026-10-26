export type NavItem = {
  label: string;
  href: string;
};

export const site = {
  name: "Institute Itech",
  title: "Institute Itech — R&D Institute, Milan",
  tagline: "Research and development institute, strategic consultancy, molding societies of tomorrow.",
  description:
    "Institute Itech is a Milan-based R&D institute building AI-driven platforms for neurodegenerative-disease research, urban environmental systems, and sustainable land management.",
};

export const mainNav: NavItem[] = [
  { label: "Mission", href: "/#mission" },
  { label: "Projects", href: "/#projects" },
  { label: "People", href: "/#people" },
  { label: "Contact", href: "/#contact" },
];

export const offices: string[][] = [
  ["Piazza Vetra, 17", "20123 Milano (MI)"],
  ["Via San Raffaele, 1", "20121 Milano (MI)"],
];

export const socials: NavItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/iite.eu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/instituteitech" },
  { label: "Facebook", href: "https://www.facebook.com/institute.iite" },
];

export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy.pdf" },
  { label: "Image Disclaimer", href: "/legal/image-disclaimer.pdf" },
];
