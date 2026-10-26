import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Mission } from "@/components/home/Mission";
import { Numbers } from "@/components/home/Numbers";
import { People } from "@/components/home/People";
import { Projects } from "@/components/home/Projects";

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Projects />
      <People />
      <Numbers />
      <Contact />
    </>
  );
}
