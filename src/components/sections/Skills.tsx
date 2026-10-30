import {
  CodeXml,
  Film,
  LayoutDashboard,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import type { SkillIconName, SkillLevel } from "@/types";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<SkillIconName, typeof CodeXml> = {
  code: CodeXml,
  smartphone: Smartphone,
  film: Film,
  sparkles: Sparkles,
  layout: LayoutDashboard,
};

const levelLabels: Record<SkillLevel, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export function Skills() {
  return (
    <section id="competences" className="border-y border-line bg-raised/50 themed">
      <div className="mx-auto max-w-[88rem] px-5 py-28 md:px-8 md:py-40">
        <SectionHeading
          title="Ce que je fais, et avec quoi."
          intro="Cinq domaines que je pratique, des outils web au motion design. Les niveaux ne sont indiqués que lorsqu'ils sont validés."
        />

        <div className="mt-16 grid gap-x-10 gap-y-14 md:mt-24 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = icons[cat.icon];
            return (
              <Reveal
                key={cat.id}
                delay={(i % 3) * 0.07}
                className={i === 0 ? "xl:col-span-2" : ""}
              >
                <article className="themed border-t border-line-strong pt-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <div>
                      <h3 className="display-lg text-2xl md:text-[1.7rem]">
                        {cat.title}
                      </h3>
                      <p className="mt-1 max-w-[40ch] text-[0.95rem] text-muted">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="themed inline-flex min-h-9 items-center gap-2 rounded-full border border-line px-4 text-[0.92rem] transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {skill.name}
                        {skill.level && (
                          <span className="text-xs text-muted">
                            {levelLabels[skill.level]}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
