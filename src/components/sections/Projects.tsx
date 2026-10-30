import { getVisibleProjects } from "@/lib/server";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGallery } from "@/components/sections/ProjectsGallery";

export function Projects() {
  const projects = getVisibleProjects();
  if (projects.length === 0) return null;
  return (
    <section id="projets" className="mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
      <SectionHeading
        title="Projets"
        intro="Des projets personnels, des prototypes et des réalisations. Chaque fiche indique son état réel."
      />
      <div className="mt-14 md:mt-20">
        <ProjectsGallery projects={projects} />
      </div>
    </section>
  );
}
