import { sections } from "@/data/site";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      {sections.about && <About />}
      {sections.skills && <Skills />}
      {sections.projects && <Projects />}
      {sections.experiences && <Experience />}
      {sections.services && <Services />}
      {sections.contact && <Contact />}
    </>
  );
}
