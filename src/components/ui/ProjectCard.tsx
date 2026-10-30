import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { categoryLabels, statusLabels } from "@/data/projects";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  tall = false,
  priority = false,
}: {
  project: Project;
  /** Format vertical pour casser le rythme de la grille éditoriale. */
  tall?: boolean;
  priority?: boolean;
}) {
  return (
    <article className="group relative">
      <div
        className={cn(
          "themed relative overflow-hidden rounded-sm border border-line bg-raised",
          tall ? "aspect-[4/5]" : "aspect-[4/3]",
        )}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.045] group-focus-within:scale-[1.045]">
          <ProjectCover
            project={project}
            priority={priority}
            sizes="(min-width: 768px) 55vw, 92vw"
          />
        </div>
        <span
          aria-hidden
          className="absolute bottom-4 right-4 flex size-14 translate-y-2 items-center justify-center rounded-full bg-accent text-accent-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
        >
          <ArrowUpRight className="size-6" />
        </span>
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span>{categoryLabels[project.category]}</span>
          {project.year && <span>{project.year}</span>}
          <span className="themed rounded-full border border-line px-2.5 py-0.5 text-xs">
            {project.placeholder
              ? "Emplacement réservé"
              : statusLabels[project.status]}
          </span>
        </div>

        <h3 className="display-lg mt-2 text-3xl md:text-4xl">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent transition-colors duration-300"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 max-w-[52ch] text-muted">{project.summary}</p>

        {project.technologies.length > 0 && (
          <p className="mt-3 text-sm text-muted">
            <span className="sr-only">Technologies : </span>
            {project.technologies.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}
