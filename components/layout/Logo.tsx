import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/public/brand/logo-icon.svg";
import logoText from "@/public/brand/logo-text.svg";
import { site } from "@/data/site";

type LogoProps = {
  inverted?: boolean;
};

export function Logo({ inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${
        inverted ? "focus-visible:outline-white" : "focus-visible:outline-neutral-800"
      }`}
    >
      <Image src={logoText} alt="" className={`h-4 w-auto ${inverted ? "invert" : ""}`} />
      <Image src={logoIcon} alt="" className={`h-5 w-auto ${inverted ? "invert" : ""}`} />
      <span className="sr-only">{site.name}, home</span>
    </Link>
  );
}
