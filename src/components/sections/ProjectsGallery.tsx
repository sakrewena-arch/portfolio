"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project, ProjectCategory } from "@/types";
import { categoryLabels } from "@/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "all" | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: categoryLabels.web },
  { id: "applications", label: categoryLabels.applications },
  { id: "motion", label: categoryLabels.motion },
  { id: "ia", label: categoryLabels.ia },
  { id: "branding", label: categoryLabels.branding },
];

/** Rythme éditorial : largeurs alternées, format vertical sur les cartes étroites. */
const spans = [
  "md:col-span-7",
  "md:col-span-5 md:mt-28",
  "md:col-span-5",
  "md:col-span-7 md:mt-28",
];

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");
  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);
  const count = (f: Filter) =>
    f === "all" ? projects.length : projects.filter((p) => p.category === f).length;

  return (
    <div>
      <div
        role="group"
        aria-label="Filtrer les projets par catégorie"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      >
        {filters.map((f) => {
          const selected = active === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(f.id)}
              className={cn(
                "themed inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-5 text-[0.95rem] transition-colors duration-300 cursor-pointer",
                selected
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line text-muted hover:border-fg hover:text-fg",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "text-xs tabular-nums",
                  selected ? "opacity-70" : "opacity-60",
                )}
              >
                {count(f.id)}
              </span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-12 md:mt-16">
        {visible.length === 0 ? (
          <p className="max-w-[44ch] py-16 text-lg text-muted">
            Aucun projet dans cette catégorie pour l&apos;instant. Choisis « Tous
            les projets » pour voir l&apos;ensemble.
          </p>
        ) : (
          <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-12">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                  className={spans[i % spans.length]}
                >
                  <ProjectCard
                    project={project}
                    tall={i % 4 === 1 || i % 4 === 2}
                    priority={i < 2}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
