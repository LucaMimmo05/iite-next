import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/public/brand/logo-icon.svg";
import logoText from "@/public/brand/logo-text.svg";
import { site } from "@/data/site";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <Image src={logoText} alt="" className="h-4 w-auto" />
      <Image src={logoIcon} alt="" className="h-5 w-auto" />
      <span className="sr-only">{site.name}, home</span>
    </Link>
  );
}
