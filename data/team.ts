import type { StaticImageData } from "next/image";
import sambathImg from "@/public/images/people/sambath-piazza.jpg";

export type TeamMember = {
  slug: string;
  name: string;
  degree?: string;     
  role: string;
  quote?: string;      
  image?: { src: StaticImageData; alt: string };
};

export const team = [
  {
    slug: "sambath-piazza",
    name: "Sambath Piazza",
    role: "Founder & CEO",
    quote:
      "As Founder and CEO of Institute Itech, I lead the company's strategic vision by combining technological expertise, cybersecurity knowledge, and entrepreneurial drive.",
    image: { src: sambathImg, alt: "Portrait of Sambath Piazza, Founder and CEO of Institute Itech" },
  },
  { slug: "michela-garon", name: "Michela Garon", degree: "PhD", role: "Program Lead PM" },
  { slug: "federica-franza", name: "Federica Franza", degree: "PhD", role: "Neuroimaging Specialist" },
  { slug: "edoardo-mariucci", name: "Edoardo Mariucci", degree: "BSc", role: "Frontend Developer" },
  { slug: "federica-fuselli", name: "Federica Fuselli", degree: "MSc", role: "Clinical Manager" },
  { slug: "sara-pido", name: "Sara Pidò", degree: "PhD", role: "AI Manager" },
  { slug: "leonardo-spitoni", name: "Leonardo Spitoni", degree: "MSc", role: "Neuroimaging Specialist" },
  { slug: "simone-mattioli", name: "Simone Mattioli", degree: "BSc", role: "Backend Developer" },
] satisfies TeamMember[];
